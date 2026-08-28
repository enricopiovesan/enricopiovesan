/*
 * planes-proxy — ADS-B relay for the homepage hero, on Deno Deploy.
 *
 * The hero (src/assets/hero-topo.js) can't call a public ADS-B API directly:
 * airplanes.live returns 403, and the open forks (adsb.lol/adsb.fi) send no CORS
 * headers. A Cloudflare Worker doesn't work either — every free source blocks
 * Cloudflare's edge IPs (OpenSky 522, adsb.lol 429, adsb.fi 403). Deno Deploy's
 * egress is not on those block lists, so this runs there instead.
 *
 * Endpoint:  GET https://<project>.deno.dev/
 *   ?lat=&lon=&radius=   point + radius in nm (defaults: Golden, BC / 80 nm)
 *   ?debug=1             include an upstream trace in the response
 *
 * Response: ADSBExchange v2 shape ({ "ac": [ ... ] }) — exactly what the client
 * already parses. On total upstream failure: 200 with { "ac": [] } so the hero
 * simply shows no planes.
 *
 * Optional env vars (Deno Deploy → Settings → Environment Variables):
 *   OPENSKY_CLIENT_ID, OPENSKY_CLIENT_SECRET
 *     Free OpenSky account → API client. Raises the limit from ~400 to 4000
 *     requests/day. Without them the proxy calls OpenSky anonymously.
 *   AIRPLANES_LIVE_KEY
 *     If airplanes.live grants API access, set this and it becomes the primary
 *     source (unfiltered, faster refresh).
 */

const DEFAULTS = { lat: 51.2977, lon: -116.9631, radius: 80 };
const CACHE_MS = 45_000;
const UA = "enricopiovesan.com-hero/1.0 (+https://enricopiovesan.com; contact enrico.piovesan10@gmail.com)";

const CORS: Record<string, string> = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-max-age": "86400",
};

const KTS_PER_MS = 1.943844;
const FT_PER_M = 3.280840;
const FPM_PER_MS = 196.850394;
const NM_TO_DEG_LAT = 1 / 60;

type Plane = {
  hex: string; flight: string; t: string; lat: number; lon: number;
  gs: number; track: number; alt_baro: number | null; baro_rate: number;
};
type Trace = Record<string, unknown>[];

let cache: { key: string; at: number; body: string } | null = null;
let osToken: { value: string; exp: number } | null = null;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "GET") return new Response("method not allowed", { status: 405, headers: CORS });

  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";
  const lat = clamp(url.searchParams.get("lat"), DEFAULTS.lat, -90, 90);
  const lon = clamp(url.searchParams.get("lon"), DEFAULTS.lon, -180, 180);
  const radius = clamp(url.searchParams.get("radius"), DEFAULTS.radius, 1, 250);
  const key = `${lat}/${lon}/${radius}`;

  if (!debug && cache && cache.key === key && Date.now() - cache.at < CACHE_MS) {
    return json(cache.body);
  }

  const trace: Trace = [];
  let ac: Plane[] | null = null;
  if (Deno.env.get("AIRPLANES_LIVE_KEY")) ac = await fromAirplanesLive(lat, lon, radius, trace);
  if (!ac) ac = await fromOpenSky(lat, lon, radius, trace);
  if (!ac) ac = await fromOpenSky(lat, lon, radius, trace); // retry: OpenSky 5xx are often transient
  if (!ac) ac = await fromAdsbLol(lat, lon, radius, trace);

  const ok = ac != null;
  const payload: Record<string, unknown> = ok
    ? { ac, now: Date.now(), total: ac!.length }
    : { ac: [], msg: "proxy: all upstreams unavailable", now: Date.now(), total: 0 };
  if (debug) payload._debug = trace;

  const body = JSON.stringify(payload);
  if (ok && !debug) cache = { key, at: Date.now(), body };
  return json(body, ok ? 45 : 10);
});

function json(body: string, maxAge = 45) {
  return new Response(body, {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": `public, max-age=${maxAge}`, ...CORS },
  });
}

function bbox(lat: number, lon: number, radius: number) {
  const dLat = radius * NM_TO_DEG_LAT;
  const dLon = dLat / Math.max(0.2, Math.cos((lat * Math.PI) / 180));
  return { lamin: lat - dLat, lamax: lat + dLat, lomin: lon - dLon, lomax: lon + dLon };
}

async function openSkyToken(): Promise<string | null> {
  const id = Deno.env.get("OPENSKY_CLIENT_ID");
  const secret = Deno.env.get("OPENSKY_CLIENT_SECRET");
  if (!id || !secret) return null;
  if (osToken && Date.now() < osToken.exp) return osToken.value;
  const r = await fetch(
    "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "client_credentials", client_id: id, client_secret: secret }),
    },
  );
  if (!r.ok) return null;
  const d = await r.json();
  osToken = { value: d.access_token, exp: Date.now() + (d.expires_in ?? 1800) * 1000 - 60_000 };
  return osToken.value;
}

async function fromOpenSky(lat: number, lon: number, radius: number, trace: Trace): Promise<Plane[] | null> {
  const b = bbox(lat, lon, radius);
  const u = `https://opensky-network.org/api/states/all?lamin=${b.lamin.toFixed(4)}&lomin=${b.lomin.toFixed(4)}&lamax=${b.lamax.toFixed(4)}&lomax=${b.lomax.toFixed(4)}`;
  const t: Record<string, unknown> = { src: "opensky" };
  try {
    const token = await openSkyToken();
    t.auth = token ? "client" : "anon";
    const headers: Record<string, string> = { accept: "application/json", "user-agent": UA };
    if (token) headers.authorization = `Bearer ${token}`;
    const r = await fetch(u, { headers });
    t.status = r.status;
    t.rl = r.headers.get("x-rate-limit-remaining");
    if (!r.ok) { t.body = (await r.text()).slice(0, 160); trace.push(t); return null; }
    const d = await r.json();
    if (!d || !Array.isArray(d.states)) { t.note = "no states"; trace.push(t); return null; }
    // deno-lint-ignore no-explicit-any
    const ac: Plane[] = d.states
      .filter((s: any[]) => typeof s[6] === "number" && typeof s[5] === "number" && !s[8])
      .map((s: any[]) => {
        const baroM = s[7] != null ? s[7] : s[13];
        return {
          hex: s[0], flight: (s[1] || "").trim(), t: "", lat: s[6], lon: s[5],
          gs: s[9] != null ? s[9] * KTS_PER_MS : 0,
          track: s[10] != null ? s[10] : 0,
          alt_baro: baroM != null ? Math.round(baroM * FT_PER_M) : null,
          baro_rate: s[11] != null ? Math.round(s[11] * FPM_PER_MS) : 0,
        };
      });
    t.count = ac.length;
    trace.push(t);
    return ac;
  } catch (e) {
    t.error = String((e as Error)?.message ?? e);
    trace.push(t);
    return null;
  }
}

async function fromAdsbLol(lat: number, lon: number, radius: number, trace: Trace): Promise<Plane[] | null> {
  const u = `https://api.adsb.lol/v2/point/${lat}/${lon}/${radius}`;
  const t: Record<string, unknown> = { src: "adsb.lol" };
  try {
    const r = await fetch(u, { headers: { accept: "application/json", "user-agent": UA } });
    t.status = r.status;
    const ct = r.headers.get("content-type") || "";
    if (!r.ok || !ct.includes("json")) { t.body = (await r.text()).slice(0, 160); trace.push(t); return null; }
    const d = await r.json();
    const ac = Array.isArray(d?.ac) ? d.ac : null;
    t.count = ac ? ac.length : null;
    trace.push(t);
    return ac;
  } catch (e) {
    t.error = String((e as Error)?.message ?? e);
    trace.push(t);
    return null;
  }
}

async function fromAirplanesLive(lat: number, lon: number, radius: number, trace: Trace): Promise<Plane[] | null> {
  const u = `https://api.airplanes.live/v2/point/${lat}/${lon}/${radius}`;
  const t: Record<string, unknown> = { src: "airplanes.live" };
  try {
    const r = await fetch(u, {
      headers: { accept: "application/json", "user-agent": UA, "api-auth": Deno.env.get("AIRPLANES_LIVE_KEY")! },
    });
    t.status = r.status;
    const ct = r.headers.get("content-type") || "";
    if (!r.ok || !ct.includes("json")) { t.body = (await r.text()).slice(0, 160); trace.push(t); return null; }
    const d = await r.json();
    const ac = Array.isArray(d?.ac) ? d.ac : null;
    t.count = ac ? ac.length : null;
    trace.push(t);
    return ac;
  } catch (e) {
    t.error = String((e as Error)?.message ?? e);
    trace.push(t);
    return null;
  }
}

function clamp(raw: string | null, dflt: number, min: number, max: number): number {
  const n = parseFloat(raw ?? "");
  if (!Number.isFinite(n)) return dflt;
  return Math.min(max, Math.max(min, n));
}
