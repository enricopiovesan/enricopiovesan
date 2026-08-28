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

`GET https://<project>.deno.dev/?lat=&lon=&radius=` → OpenSky `/states/all` over
a bounding box, remapped to the ADSBExchange v2 shape (`{ "ac": [ ... ] }`) the
client already parses. Falls back to `adsb.lol`. `?debug=1` adds an upstream
trace. Total failure → `200 { "ac": [] }` so the hero just shows no planes.
45 s in-memory cache.

## Deploy

1. Sign in at <https://dash.deno.com> with GitHub (no card).
2. **New Project** → **Deploy from GitHub** → this repo, or use the CLI:
   ```bash
   deno install -gArf jsr:@deno/deployctl
   cd enricopiovesan.com/deno
   deployctl deploy --project=<project> planes-proxy.ts
   ```
3. Note the URL it prints, e.g. `https://<project>.deno.dev`.
4. In `../src/assets/hero-topo.js`, set `PLANES_API` to that URL.
5. Optional, in the project's **Settings → Environment Variables**:
   - `OPENSKY_CLIENT_ID` / `OPENSKY_CLIENT_SECRET` — free OpenSky account →
     Account → API client. Raises the daily limit from ~400 to 4000.
   - `AIRPLANES_LIVE_KEY` — if airplanes.live grants access; it then becomes the
     primary source. Sent as the `api-auth` header.

## Verify

```bash
curl -s "https://<project>.deno.dev/?debug=1" | head -c 400
```

Expect `{"ac":[{...}],"now":...,"total":N,"_debug":[{"src":"opensky","status":200,...}]}`.

## Local run

```bash
deno run --allow-net --allow-env planes-proxy.ts
# then: curl -s "http://localhost:8000/?debug=1" | head -c 400
```
