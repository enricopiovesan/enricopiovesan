# planes-proxy (Deno Deploy)

ADS-B relay for the homepage hero (`src/assets/hero-topo.js`).

## Why not something simpler

- **Direct browser fetch** — `api.airplanes.live` returns **403** now; the open
  forks (`adsb.lol`, `adsb.fi`) send **no CORS headers**. Can't call them from
  the page.
- **Cloudflare Worker** — every free source blocks Cloudflare's edge:
  OpenSky **522**, `adsb.lol` **429** (shared edge IP), `adsb.fi` **403**
  (it's Cloudflare-fronted). Tested and abandoned.
- **Deno Deploy** — its egress is not on those block lists. OpenSky answers
  normally. So the relay runs here.

## What it does

`GET https://planes-proxy.enricopiovesan.deno.net/?lat=&lon=&radius=` → OpenSky
`/states/all` over a bounding box, remapped to the ADSBExchange v2 shape
(`{ "ac": [ ... ] }`) the client already parses. Falls back to `adsb.lol`.
`?debug=1` adds an upstream trace. Total failure → `200 { "ac": [] }` so the hero
just shows no planes. 45 s in-memory cache.

## Deploy

Hosted at <https://console.deno.com> → org `enricopiovesan` → app `planes-proxy`,
linked to this GitHub repo. Config:

- **Entrypoint:** `enricopiovesan.com/deno/planes-proxy.ts`
- **Install / build / pre-deploy commands:** none
- **Production branch:** `main` (the console auto-deploys main on every push)
- **Environment variables:**
  - `OPENSKY_CLIENT_ID` / `OPENSKY_CLIENT_SECRET` — free OpenSky account →
    Account → API client. Raises the daily limit from ~400 to 4000.
  - `AIRPLANES_LIVE_KEY` — optional; if airplanes.live grants access it becomes
    the primary source, sent as the `api-auth` header.

`PLANES_API` in `../src/assets/hero-topo.js` and the `preconnect` in
`../src/layouts/home.njk` both point at `planes-proxy.enricopiovesan.deno.net`.

## Verify

```bash
curl -s "https://planes-proxy.enricopiovesan.deno.net/?debug=1" | head -c 400
```

Expect `{"ac":[{...}],"now":...,"total":N,"_debug":[{"src":"opensky","status":200,...}]}`.

## Local run

```bash
deno run --allow-net --allow-env planes-proxy.ts
# then: curl -s "http://localhost:8000/?debug=1" | head -c 400
```
