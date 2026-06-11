/* Topographic hero background — the real terrain around Golden, BC
   (Columbia Valley, Dogtooth Range, Van Horne Range; open elevation data,
   771–2938 m), with the Columbia and Kicking Horse rivers.

   - Terrain wash between the contour lines: translucent green where the
     ground is bare, translucent white (light blue in the light theme)
     where the seasonal snowline model says snow is holding.
   - Lit by the actual sun position in Golden (Mountain Time): warm low
     light at sunrise/sunset, cool faint moonlight at night.
   - The map drifts slowly east–west on a long loop so the Dogtooth side
     under the text comes into view; pointer adds a small depth parallax.
   - Static (no drift, no parallax) with reduced motion or coarse pointers.
   Everything renders to an offscreen canvas; the animation loop is a
   single drawImage blit per frame. */
(function () {
  var canvas = document.getElementById('hero-topo');
  if (!canvas) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var ctx = canvas.getContext('2d');
  var off = document.createElement('canvas');
  var octx = off.getContext('2d');
  var fill = document.createElement('canvas');   // low-res terrain wash
  var fctx = fill.getContext('2d');

  var DATA = null, GRID = null, SUN = null;
  /* Live overlay: real aircraft (ADS-B) + a modeled CPKC freight on the
     rail line, which follows the Kicking Horse and Columbia rivers here.
     Map cover: 160x64 cells x 470 m = 75.2 x 30.1 km centred on Golden. */
  var KM_W = 75.2, KM_H = 30.1;
  var GEO = { latTop: 51.4086, lonLeft: -117.4923, dLat: KM_H / 111.32, dLon: KM_W / (111.32 * Math.cos(51.3 * Math.PI / 180)) };
  var PLANES = [], RAIL = null, RAIL_LEN = 0, TRAIN_WB = true;
  var w = 0, h = 0, dpr = 1, margin = 24;        // parallax headroom
  var mx = 0, my = 0, tx = 0, ty = 0;            // pointer lerp
  var raf = null, settled = true, visible = true;

  /* Seasonal snowline (m): ~1700 on June 10, bare but the tops by
     mid-July, dustings return through fall, ~900 in deep winter. */
  var SNOW_ANCHORS = [
    [15, 900], [105, 1100], [135, 1450], [161, 1700], [182, 2100],
    [196, 2450], [227, 2800], [258, 2750], [288, 2200], [319, 1300], [349, 950]
  ];
  function snowline(doy) {
    var a = SNOW_ANCHORS, n = a.length;
    for (var i = 0; i < n; i++) {
      var p = a[i], q = a[(i + 1) % n];
      var d1 = q[0] + (i === n - 1 ? 365 : 0);
      var d = doy + (i === n - 1 && doy < p[0] ? 365 : 0);
      if (d >= p[0] && d <= d1) {
        return p[1] + (d - p[0]) / (d1 - p[0]) * (q[1] - p[1]);
      }
    }
    return a[0][1];
  }

  /* Local time in Golden (America/Edmonton) + day of year. */
  function goldenNow() {
    var parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Edmonton', hour12: false,
      month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'
    }).formatToParts(new Date());
    var g = {};
    parts.forEach(function (p) { g[p.type] = parseInt(p.value, 10); });
    var cum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    return { doy: cum[g.month - 1] + g.day, hour: (g.hour % 24) + g.minute / 60 };
  }

  /* Solar altitude/azimuth for 51.3 N. Az measured from south, +west. */
  function sunPosition(doy, hour) {
    var lat = 51.3 * Math.PI / 180;
    var decl = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (doy - 81) / 365);
    var ha = (hour - 13.1) * 15 * Math.PI / 180;  // solar noon ~13:06 MDT at 116.96 W
    var alt = Math.asin(Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(ha));
    var az = Math.atan2(Math.sin(ha), Math.cos(ha) * Math.sin(lat) - Math.tan(decl) * Math.cos(lat));
    return { alt: alt, az: az };
  }

  function isLight() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t === 'light';
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  function palette() {
    var light = isLight();
    var cs = getComputedStyle(document.documentElement);
    return {
      line: cs.getPropertyValue('--fg').trim() || (light ? '#001f3f' : '#f6f7ed'),
      lineA: light ? 0.09 : 0.08,
      lineAi: light ? 0.18 : 0.17,
      river: light ? '#2e6f9e' : '#7fb4d8',
      riverA: light ? 0.5 : 0.55,
      peakA: light ? 0.7 : 0.78,
      // terrain wash RGB
      snow: light ? [126, 168, 205] : [225, 236, 246],
      green: light ? [0, 128, 76] : [88, 142, 96],
      rock: light ? [60, 80, 100] : [150, 160, 175],
      washA: light ? 0.10 : 0.055,
      sunGlow: light ? [255, 178, 84] : [255, 188, 110],
      moonGlow: [150, 180, 230]
    };
  }

  /* ---- Terrain wash: elevation bands x sun hillshade on the low-res grid ---- */
  function renderFill() {
    if (!GRID) return;
    var p = palette();
    var gn = goldenNow();
    var snow = snowline(gn.doy);
    // Live correction: measured snow depth at the valley floor (785 m)
    if (WX && typeof WX.snow_depth === 'number') {
      if (WX.snow_depth > 0.05) snow = Math.min(snow, 900); // snow in town
      else snow += 150;                                     // bare valley: raise line
    }
    var sun = sunPosition(gn.doy, gn.hour);
    var gw = DATA.grid.w, gh = DATA.grid.h;
    var e0 = DATA.grid.e0, e1 = DATA.grid.e1;

    var day = sun.alt > -0.10;                     // includes civil twilight
    SUN = { alt: sun.alt, az: sun.az, day: day };
    var alt = day ? Math.max(sun.alt, 0.06) : 0.55;
    var az = day ? sun.az : 0;                     // moon: from the south
    // Light vector in map space: north is up (-y), south +y, west -x
    var lx = -Math.sin(az) * Math.cos(alt);
    var ly = Math.cos(az) * Math.cos(alt);
    var lz = Math.sin(alt);
    var dim = day ? Math.min(1, 0.35 + sun.alt * 2.2) : 0.38;
    var warm = day ? Math.max(0, 1 - sun.alt / 0.30) : 0; // low-sun warmth

    var img = fctx.createImageData(gw, gh);
    var d = img.data;
    var span = e1 - e0;
    var cell = 470;                                 // metres per grid cell
    for (var y = 0; y < gh; y++) {
      for (var x = 0; x < gw; x++) {
        var i = y * gw + x;
        var e = e0 + GRID[i] / 255 * span;
        var ex = e0 + GRID[y * gw + Math.min(x + 1, gw - 1)] / 255 * span;
        var ey = e0 + GRID[Math.min(y + 1, gh - 1) * gw + x] / 255 * span;
        // Normal from gradient (vertical exaggeration baked into cell size)
        var nx = (e - ex) / cell * 2.2, ny = (e - ey) / cell * 2.2, nz = 1;
        var nl = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
        var shade = Math.max(0, (nx * lx + ny * ly + nz * lz) * nl);

        var c = e >= snow ? p.snow : (e <= 2050 ? p.green : p.rock);
        // High shade contrast so the sun direction reads clearly
        var lum = dim * (0.2 + 1.15 * shade);
        var r = c[0] * lum, g = c[1] * lum, b = c[2] * lum;
        if (warm > 0 && shade > 0.15) {            // sunrise/sunset glow
          r += 85 * warm * shade; g += 26 * warm * shade;
        }
        if (!day) { b += 18; }                      // moonlight cools
        var o = i * 4;
        d[o] = r; d[o + 1] = g; d[o + 2] = b;
        d[o + 3] = Math.round(255 * p.washA * (0.3 + 1.2 * shade));
      }
    }
    fill.width = gw; fill.height = gh;
    fctx.putImageData(img, 0, 0);
  }

  /* ---- Offscreen scene: wash, contours, rivers, peaks ---- */
  function renderScene() {
    if (!DATA) return;
    var p = palette();
    var ow = w + margin * 2;
    off.width = Math.round(ow * dpr);
    off.height = Math.round(h * dpr);
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.clearRect(0, 0, ow, h);
    octx.lineJoin = 'round';
    octx.lineCap = 'round';

    // Cover the widest frame the drift can show
    var sy = Math.max(h, ow / DATA.aspect);
    var sx = sy * DATA.aspect;
    var ox = (ow - sx) / 2, oy = (h - sy) / 2;

    var span = (DATA.max - DATA.min) || 1;
    function depthOf(e) { return 0.25 + 0.75 * (e - DATA.min) / span; }

    // Terrain wash (bilinear upscale of the low-res raster)
    octx.imageSmoothingEnabled = true;
    octx.drawImage(fill, ox + mx * 6, oy + my * 4, sx, sy);

    // Directional glow so the sun (or moon) position reads at a glance.
    // Map is north-up: east = right, south = down.
    if (SUN) {
      var dirX = SUN.day ? -Math.sin(SUN.az) : 0;
      var elev = Math.max(0, Math.sin(Math.max(SUN.alt, 0)));
      var cx = ow * (0.5 + 0.44 * dirX);
      var cy = SUN.day ? h * (0.7 - 0.62 * elev) : h * 0.78;
      var radius = Math.max(ow, h) * 0.75;
      var gc = SUN.day ? p.sunGlow : p.moonGlow;
      // Overcast flattens the light: scale glow/disc by live cloud cover
      var cf = WX && typeof WX.cloud_cover === 'number' ? 1 - 0.7 * WX.cloud_cover / 100 : 1;
      var ga = (SUN.day ? (0.16 - 0.07 * elev) : 0.07) * cf;
      var grad = octx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, 'rgba(' + gc[0] + ',' + gc[1] + ',' + gc[2] + ',' + ga.toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(' + gc[0] + ',' + gc[1] + ',' + gc[2] + ',0)');
      octx.fillStyle = grad;
      octx.fillRect(0, 0, ow, h);

      // Sun disc (moon at night), color keyed to altitude:
      // horizon = deep red-orange, climbing = golden, high = near-white.
      var t = Math.min(1, Math.max(0, elev / 0.72));   // 0 horizon → 1 summer noon
      var dc = SUN.day
        ? [Math.round(255), Math.round(96 + 142 * t), Math.round(36 + 174 * t)]
        : [205, 218, 240];
      var dr = Math.max(ow, h) * (SUN.day ? 0.022 : 0.016);
      var da = (SUN.day ? (0.5 - 0.22 * t) : 0.3) * cf;
      var disc = octx.createRadialGradient(cx, cy, 0, cx, cy, dr * 3.2);
      disc.addColorStop(0, 'rgba(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ',' + da.toFixed(3) + ')');
      disc.addColorStop(0.28, 'rgba(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ',' + (da * 0.55).toFixed(3) + ')');
      disc.addColorStop(1, 'rgba(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ',0)');
      octx.fillStyle = disc;
      octx.beginPath();
      octx.arc(cx, cy, dr * 3.2, 0, Math.PI * 2);
      octx.fill();
    }

    // Contour lines: one constant color
    octx.strokeStyle = p.line;
    for (var i = 0; i < DATA.levels.length; i++) {
      var lv = DATA.levels[i];
      var depth = depthOf(lv.e);
      var dx = mx * 14 * depth, dy = my * 9 * depth;
      var isIndex = (lv.e % 1000 === 0);
      octx.globalAlpha = isIndex ? p.lineAi : p.lineA;
      octx.lineWidth = isIndex ? 1.1 : 0.7;
      octx.beginPath();
      for (var j = 0; j < lv.p.length; j++) {
        var line = lv.p[j];
        octx.moveTo(ox + line[0][0] * sx + dx, oy + line[0][1] * sy + dy);
        for (var k = 1; k < line.length; k++) {
          octx.lineTo(ox + line[k][0] * sx + dx, oy + line[k][1] * sy + dy);
        }
      }
      octx.stroke();
    }

    // Rivers: valley floor, lowest parallax depth
    var rdx = mx * 14 * 0.25, rdy = my * 9 * 0.25;
    octx.strokeStyle = p.river;
    octx.globalAlpha = p.riverA;
    octx.lineWidth = 1.4;
    octx.beginPath();
    var rivers = DATA.rivers || [];
    for (var r = 0; r < rivers.length; r++) {
      var rv = rivers[r];
      octx.moveTo(ox + rv[0][0] * sx + rdx, oy + rv[0][1] * sy + rdy);
      for (var q = 1; q < rv.length; q++) {
        octx.lineTo(ox + rv[q][0] * sx + rdx, oy + rv[q][1] * sy + rdy);
      }
    }
    octx.stroke();

    // Peaks: triangle + elevation
    var peaks = DATA.peaks || [];
    octx.font = '10px "IBM Plex Mono", monospace';
    octx.textBaseline = 'middle';
    octx.strokeStyle = p.line;
    octx.fillStyle = p.line;
    octx.lineWidth = 1.1;
    for (var u = 0; u < peaks.length; u++) {
      var pk = peaks[u];
      var dp2 = depthOf(pk[2]);
      var px = ox + pk[0] * sx + mx * 14 * dp2;
      var py = oy + pk[1] * sy + my * 9 * dp2;
      if (px < 8 || px > ow - 50 || py < 10 || py > h - 10) continue;
      octx.globalAlpha = p.peakA;
      octx.beginPath();
      octx.moveTo(px, py - 4.5);
      octx.lineTo(px + 4, py + 3);
      octx.lineTo(px - 4, py + 3);
      octx.closePath();
      octx.stroke();
      octx.globalAlpha = p.peakA * 0.9;
      octx.fillText(pk[2] + ' m', px + 8, py);
    }
    octx.globalAlpha = 1;
  }

  /* ---- Live overlay: rail line + aircraft ---- */
  function buildRail() {
    var rv = DATA.rivers || [];
    if (rv.length < 14) return;
    // CPKC's two lines into Golden: the main line up the Kicking Horse
    // canyon from the east, and the Windermere sub up the Columbia from
    // the south. One continuous route: east edge -> Golden -> south edge.
    var kh = rv[0], col = rv[13];
    var end = kh[kh.length - 1], bi = 0, bd = 1e9;
    for (var i = 0; i < col.length; i++) {
      var ddx = (col[i][0] - end[0]) * KM_W, ddy = (col[i][1] - end[1]) * KM_H;
      var dd = ddx * ddx + ddy * ddy;
      if (dd < bd) { bd = dd; bi = i; }
    }
    var pts = kh.slice();
    for (var j = bi; j >= 0; j--) {
      if (col[j][1] > 1.05) break;                  // clip past the bottom edge
      pts.push(col[j]);
    }
    // Resample at ~1.2 km so the line reads lean, not river-hugging
    RAIL = [{ x: pts[0][0], y: pts[0][1], d: 0 }];
    var d = 0, acc = 0;
    for (var k = 1; k < pts.length; k++) {
      var dx = (pts[k][0] - pts[k - 1][0]) * KM_W, dy = (pts[k][1] - pts[k - 1][1]) * KM_H;
      var seg = Math.sqrt(dx * dx + dy * dy);
      d += seg; acc += seg;
      if (acc >= 1.2 || k === pts.length - 1) {
        RAIL.push({ x: pts[k][0], y: pts[k][1], d: d });
        acc = 0;
      }
    }
    RAIL_LEN = d;
  }

  function railPoint(dist) {
    if (dist <= 0) return RAIL[0];
    if (dist >= RAIL_LEN) return RAIL[RAIL.length - 1];
    for (var i = 1; i < RAIL.length; i++) {
      if (RAIL[i].d >= dist) {
        var a = RAIL[i - 1], b = RAIL[i];
        var t = (dist - a.d) / ((b.d - a.d) || 1);
        return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      }
    }
    return RAIL[RAIL.length - 1];
  }

  function fetchPlanes() {
    if (document.hidden || !visible) return;
    fetch('https://api.airplanes.live/v2/point/51.2977/-116.9631/80')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var t0 = performance.now();
        PLANES = (d.ac || []).filter(function (a) {
          return typeof a.lat === 'number' && typeof a.lon === 'number';
        }).slice(0, 12).map(function (a) {
          var spd = (a.gs || 0) * 1.852 / 3600;      // knots -> km/s
          var tr = (a.track || 0) * Math.PI / 180;
          var alt = typeof a.alt_baro === 'number' ? a.alt_baro : null;
          var l2 = alt != null
            ? (alt >= 18000 ? 'FL' + Math.round(alt / 100) : Math.round(alt / 50) * 50 + ' ft')
            : '';
          if (a.baro_rate > 300) l2 += ' ↑';
          else if (a.baro_rate < -300) l2 += ' ↓';
          var l3 = Math.round(a.gs || 0) + ' kt' + (a.t ? ' · ' + a.t : '');
          return {
            nx: (a.lon - GEO.lonLeft) / GEO.dLon,
            ny: (GEO.latTop - a.lat) / GEO.dLat,
            vx: Math.sin(tr) * spd / KM_W,           // dead-reckon between fetches
            vy: -Math.cos(tr) * spd / KM_H,
            tr: tr, t0: t0,
            lines: [(a.flight || a.hex || '').trim(), l2, l3]
          };
        });
        blit();
      })
      .catch(function () { /* decorative only */ });
  }

  var WX = null, WIND_P = [], PRECIP = [], PARA = [];
  function fetchWeather() {
    if (document.hidden || !visible) return;
    fetch('https://api.open-meteo.com/v1/forecast?latitude=51.2977&longitude=-116.9631&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,rain,snowfall,cloud_cover,weather_code,snow_depth&timezone=America%2FEdmonton')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        WX = d.current || null;
        if (WX && typeof WX.temperature_2m === 'number') {
          var el = document.querySelector('.home-hero-coords');
          if (el) {
            var base = el.getAttribute('data-base') || el.textContent;
            el.setAttribute('data-base', base);
            el.textContent = base + ' · ' + Math.round(WX.temperature_2m) + '°C';
          }
        }
        if (DATA) rebuild();                       // apply cloud cover to the light
      })
      .catch(function () { /* decorative only */ });
  }

  function drawOverlay() {
    if (!DATA) return;
    var p = palette();
    var ow = w + margin * 2;
    var sy2 = Math.max(h, ow / DATA.aspect), sx2 = sy2 * DATA.aspect;
    var ox2 = (ow - sx2) / 2 - margin, oy2 = (h - sy2) / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Wind streaks: drift in the real wind direction, pace from speed.
    if (WX && WX.wind_speed_10m >= 5) {
      var wdir = (WX.wind_direction_10m + 180) * Math.PI / 180; // motion vector
      var wspd = Math.min(2.5, 0.3 + WX.wind_speed_10m / 25);   // px per tick
      var wvx = Math.sin(wdir) * wspd, wvy = -Math.cos(wdir) * wspd;
      if (!WIND_P.length) {
        for (var wi = 0; wi < 24; wi++) WIND_P.push({ x: Math.random() * w, y: Math.random() * h });
      }
      ctx.strokeStyle = p.line;
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var wj = 0; wj < WIND_P.length; wj++) {
        var wp = WIND_P[wj];
        wp.x += wvx; wp.y += wvy;
        if (wp.x < -10) wp.x += w + 20; if (wp.x > w + 10) wp.x -= w + 20;
        if (wp.y < -10) wp.y += h + 20; if (wp.y > h + 10) wp.y -= h + 20;
        ctx.moveTo(wp.x, wp.y);
        ctx.lineTo(wp.x - wvx * 7, wp.y - wvy * 7);
      }
      ctx.stroke();
    }

    // Precipitation: only when it is actually raining/snowing in Golden.
    if (WX && (WX.rain > 0 || WX.snowfall > 0)) {
      var snow = WX.snowfall > 0;
      var pvx = WX ? Math.sin((WX.wind_direction_10m + 180) * Math.PI / 180) * 0.4 : 0;
      if (!PRECIP.length) {
        for (var pi = 0; pi < 40; pi++) PRECIP.push({ x: Math.random() * w, y: Math.random() * h });
      }
      ctx.globalAlpha = snow ? 0.3 : 0.2;
      ctx.fillStyle = p.line;
      ctx.strokeStyle = p.line;
      if (!snow) ctx.beginPath();
      for (var pj = 0; pj < PRECIP.length; pj++) {
        var pp = PRECIP[pj];
        pp.x += pvx; pp.y += snow ? 0.45 : 3;
        if (pp.y > h + 4) { pp.y = -4; pp.x = Math.random() * w; }
        if (pp.x < -4) pp.x += w + 8; if (pp.x > w + 4) pp.x -= w + 8;
        if (snow) {
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.moveTo(pp.x, pp.y);
          ctx.lineTo(pp.x - pvx * 2, pp.y - 6);
        }
      }
      if (!snow) ctx.stroke();
    }

    // Golden Eagle Express gondola at Kicking Horse resort: line drawn
    // always; cabins shuttle only during real operating hours (modeled
    // from kickinghorseresort.com summer/winter schedules).
    (function () {
      var bnx = (-117.0481 - GEO.lonLeft) / GEO.dLon, bny = (GEO.latTop - 51.2735) / GEO.dLat;
      var tnx = (-117.0856 - GEO.lonLeft) / GEO.dLon, tny = (GEO.latTop - 51.2786) / GEO.dLat;
      var bX = ox2 + bnx * sx2 + mx * 14 * 0.25, bY = oy2 + bny * sy2 + my * 9 * 0.25;
      var tX = ox2 + tnx * sx2 + mx * 14 * 0.25, tY = oy2 + tny * sy2 + my * 9 * 0.25;
      var gc2 = isLight() ? '#5a3d8a' : '#b9a6e0';
      ctx.strokeStyle = gc2;
      ctx.fillStyle = gc2;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bX, bY); ctx.lineTo(tX, tY);
      ctx.stroke();
      var gn2 = goldenNow(), doy = gn2.doy, hr2 = gn2.hour, dow = new Date().getDay();
      var open = false, hours = '';
      if (doy >= 150 && doy <= 166 && (dow >= 5 || dow <= 1)) { open = hr2 >= 10 && hr2 < 15.5; hours = '10:00–15:30'; }
      else if (doy >= 170 && doy <= 250) { open = hr2 >= 10 && hr2 < 16.5; hours = '10:00–16:30'; }
      else if (doy >= 253 && doy <= 270 && (dow >= 4 || dow <= 1)) { open = hr2 >= 10 && hr2 < 15.5; hours = '10:00–15:30'; }
      else if (doy >= 346 || doy <= 102) { open = hr2 >= 9 && hr2 < 15.5; hours = '09:00–15:30'; }
      if (open) {
        var ph = (Date.now() / 1000 % 300) / 300;   // 5-min cycle
        var u1 = ph < 0.5 ? ph * 2 : 2 - ph * 2;    // cabin up, cabin down
        var u2 = 1 - u1;
        ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.arc(bX + (tX - bX) * u1, bY + (tY - bY) * u1, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(bX + (tX - bX) * u2, bY + (tY - bY) * u2, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 0.6;
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('KHMR · gondola', tX - 8, tY - 14);
      ctx.fillText(open ? 'open · ' + hours : 'closed', tX - 8, tY - 3);
    })();

    // Mount 7 paragliders: famous launch SE of town. Modeled — summer
    // afternoons in flyable weather, slow thermal circles drifting to the LZ.
    (function () {
      var gn3 = goldenNow();
      var flyable = gn3.doy >= 152 && gn3.doy <= 273 && gn3.hour >= 12 && gn3.hour < 18 &&
        (!WX || (WX.wind_speed_10m < 30 && !(WX.rain > 0)));
      if (!flyable) { PARA.length = 0; return; }
      var lnx = (-116.9426 - GEO.lonLeft) / GEO.dLon, lny = (GEO.latTop - 51.2628) / GEO.dLat;
      var znx = (-116.957 - GEO.lonLeft) / GEO.dLon, zny = (GEO.latTop - 51.287) / GEO.dLat;
      var lX = ox2 + lnx * sx2 + mx * 14 * 0.25, lY = oy2 + lny * sy2 + my * 9 * 0.25;
      var zX = ox2 + znx * sx2 + mx * 14 * 0.25, zY = oy2 + zny * sy2 + my * 9 * 0.25;
      if (!PARA.length) {
        PARA.push({ ang: 0, prog: 0, r: 5 });
        PARA.push({ ang: 2.5, prog: 0.45, r: 7 });
      }
      ctx.fillStyle = isLight() ? '#a04a10' : '#f0b070';
      for (var pg = 0; pg < PARA.length; pg++) {
        var g = PARA[pg];
        g.ang += 0.055; g.prog += 1 / 1920;          // ~4 min launch -> LZ
        if (g.prog > 1) { g.prog = 0; g.ang = Math.random() * 6; }
        var gx = lX + (zX - lX) * g.prog + Math.cos(g.ang) * g.r;
        var gy = lY + (zY - lY) * g.prog + Math.sin(g.ang) * g.r * 0.6;
        ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.arc(gx, gy, 1.3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 0.5;
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('Mt 7 · paragliders', lX + 8, lY + 12);
    })();

    // Railway: lean dashed line, corners rounded through midpoints.
    if (RAIL && RAIL_LEN) {
      var tc = isLight() ? '#7a4a06' : '#e0a84a';
      ctx.strokeStyle = tc;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      var rp0 = RAIL[0];
      ctx.moveTo(ox2 + rp0.x * sx2 + mx * 14 * 0.25, oy2 + rp0.y * sy2 + my * 9 * 0.25);
      for (var ri = 1; ri < RAIL.length - 1; ri++) {
        var ax = ox2 + RAIL[ri].x * sx2 + mx * 14 * 0.25, ay = oy2 + RAIL[ri].y * sy2 + my * 9 * 0.25;
        var bx2 = ox2 + RAIL[ri + 1].x * sx2 + mx * 14 * 0.25, by2 = oy2 + RAIL[ri + 1].y * sy2 + my * 9 * 0.25;
        ctx.quadraticCurveTo(ax, ay, (ax + bx2) / 2, (ay + by2) / 2);
      }
      var rpl = RAIL[RAIL.length - 1];
      ctx.lineTo(ox2 + rpl.x * sx2 + mx * 14 * 0.25, oy2 + rpl.y * sy2 + my * 9 * 0.25);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Freight trains: ~2.2 km at 90 km/h (~2x canyon freight pace).
    // Two opposing runs on offset schedules, with the same leader-line
    // data block treatment as the aircraft.
    if (RAIL && RAIL_LEN) {
      var v = 90 / 3600;
      var nowS = Date.now() / 1000;
      for (var ti = 0; ti < 2; ti++) {
        // Different speeds so the meeting point drifts along the route
        var tv = ti === 0 ? v : v * 1.27;
        var travel = RAIL_LEN / tv, period = travel + 120;
        var off = ti === 0 ? 0 : period * 0.5;
        var wb = ti === 0 ? TRAIN_WB : !TRAIN_WB;
        var es = (nowS + off) % period;
        if (es >= travel) continue;
        var headD = wb ? es * tv : RAIL_LEN - es * tv;
        var run = Math.floor((nowS + off) / period);
        // CPKC convention: westbounds odd, eastbounds even
        var num = (wb ? 101 : 102) + 2 * (run % 4);
        ctx.strokeStyle = tc;
        ctx.fillStyle = tc;
        ctx.globalAlpha = 0.75;
        ctx.lineWidth = 2;
        ctx.beginPath();
        var segs = 16, lenKm = 2.2, started = false;
        for (var i = 0; i <= segs; i++) {
          var dd = headD + (wb ? -1 : 1) * (i / segs) * lenKm;
          if (dd < 0 || dd > RAIL_LEN) continue;
          var pt = railPoint(dd);
          var X = ox2 + pt.x * sx2 + mx * 14 * 0.25, Y = oy2 + pt.y * sy2 + my * 9 * 0.25;
          if (!started) { ctx.moveTo(X, Y); started = true; } else ctx.lineTo(X, Y);
        }
        ctx.stroke();
        var hp = railPoint(headD);
        var hx = ox2 + hp.x * sx2 + mx * 14 * 0.25, hy = oy2 + hp.y * sy2 + my * 9 * 0.25;
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fill();
        if (hx > -10 && hx < w + 10 && hy > -10 && hy < h + 10) {
          var tflip = hx > w - 120;
          var tlx = hx + (tflip ? -14 : 14), tly = hy - 16;
          ctx.globalAlpha = 0.5;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(hx + (tflip ? -3 : 3), hy - 3);
          ctx.lineTo(tlx, tly);
          ctx.stroke();
          ctx.globalAlpha = 0.85;
          ctx.font = '9px "IBM Plex Mono", monospace';
          ctx.textBaseline = 'alphabetic';
          if (tflip) ctx.textAlign = 'right';
          ctx.fillText('CPKC ' + num, tlx + (tflip ? -4 : 4), tly - 12);
          ctx.fillText((wb ? 'WB' : 'EB') + ' · freight', tlx + (tflip ? -4 : 4), tly - 1);
          ctx.textAlign = 'left';
        }
      }
    }

    // Aircraft: silhouette rotated to track, leader line to a data block.
    if (PLANES.length) {
      var now = performance.now();
      var pc = isLight() ? '#2e6f9e' : '#9ec7e8';
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'alphabetic';
      ctx.lineWidth = 1;
      for (var q = 0; q < PLANES.length; q++) {
        var a = PLANES[q];
        var dt = (now - a.t0) / 1000;
        var nx = a.nx + a.vx * dt, ny = a.ny + a.vy * dt;
        // East-west stays exact; north-south compresses sharply past the
        // strip edges so corridor traffic off-map reads at the scope's rim.
        var u = ny - 0.5, au = Math.abs(u);
        if (au > 0.42) {
          var cu = 0.42 + (au - 0.42) / 12;
          ny = 0.5 + (u < 0 ? -1 : 1) * Math.min(cu, 0.47);
        }
        if (nx < -0.02 || nx > 1.02) continue;
        var X2 = ox2 + nx * sx2 + mx * 16, Y2 = oy2 + ny * sy2 + my * 10;

        ctx.save();
        ctx.translate(X2, Y2);
        ctx.rotate(a.tr);
        ctx.fillStyle = pc;
        ctx.globalAlpha = 0.95;
        ctx.beginPath();                             // airliner silhouette, nose up
        ctx.moveTo(0, -7);
        ctx.bezierCurveTo(1, -5.5, 1.1, -4, 1.1, -2.2);
        ctx.lineTo(7, 1); ctx.lineTo(7, 2.4); ctx.lineTo(1.1, 1.4);
        ctx.lineTo(1, 4.2); ctx.lineTo(3, 5.8); ctx.lineTo(3, 6.8); ctx.lineTo(0, 5.9);
        ctx.lineTo(-3, 6.8); ctx.lineTo(-3, 5.8); ctx.lineTo(-1, 4.2);
        ctx.lineTo(-1.1, 1.4); ctx.lineTo(-7, 2.4); ctx.lineTo(-7, 1); ctx.lineTo(-1.1, -2.2);
        ctx.bezierCurveTo(-1.1, -4, -1, -5.5, 0, -7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Leader + data block, flipped left near the right edge
        var flip = X2 > w - 130;
        var lx2 = X2 + (flip ? -16 : 16), ly2 = Y2 - 18;
        var tx2 = lx2 + (flip ? -4 : 4);
        ctx.strokeStyle = pc;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.moveTo(X2 + (flip ? -7 : 7), Y2 - 7);
        ctx.lineTo(lx2, ly2);
        ctx.stroke();
        ctx.fillStyle = pc;
        ctx.globalAlpha = 0.9;
        if (flip) ctx.textAlign = 'right';
        for (var li = 0; li < a.lines.length; li++) {
          if (a.lines[li]) ctx.fillText(a.lines[li], tx2, ly2 - 12 + li * 11);
        }
        ctx.textAlign = 'left';
      }
    }
    ctx.globalAlpha = 1;
  }

  function blit() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(off, -margin * dpr, 0);
    drawOverlay();
  }

  /* Animation only runs while the pointer parallax is settling. */
  function frame() {
    raf = null;
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    renderScene();
    blit();
    if (Math.abs(tx - mx) < 0.002 && Math.abs(ty - my) < 0.002) {
      settled = true;
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (settled && DATA && visible) {
      settled = false;
      if (!raf) raf = requestAnimationFrame(frame);
    }
  }
  function stop() {
    settled = true;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    renderFill();
    renderScene();
    blit();
  }

  function rebuild() {                              // theme change / sun tick
    if (!DATA) return;
    // CPKC-style directional running: westbound by day, eastbound otherwise
    var hr = goldenNow().hour;
    TRAIN_WB = hr >= 4 && hr < 16;
    renderFill();
    renderScene();
    blit();
  }

  function load() {
    fetch('/src/assets/golden-contours.json')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        DATA = d;
        var bin = atob(d.grid.b64);
        GRID = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) GRID[i] = bin.charCodeAt(i);
        buildRail();
        var hr = goldenNow().hour;
        TRAIN_WB = hr >= 4 && hr < 16;
        resize();
        canvas.style.opacity = '1';
        setInterval(function () { if (visible) rebuild(); }, 60000);
        fetchPlanes();
        setInterval(fetchPlanes, 60000);
        fetchWeather();
        setInterval(fetchWeather, 15 * 60 * 1000);
        if (!reduced) {
          // Overlay ticker: planes/train creep across the static scene.
          setInterval(function () {
            if (visible && !document.hidden) blit();
          }, 125);
        }
      })
      .catch(function () { /* decorative only */ });
  }

  if (finePointer && !reduced) {
    var hero = canvas.parentElement;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      start();
    }, { passive: true });
    hero.addEventListener('mouseleave', function () {
      tx = 0; ty = 0;
      start();
    }, { passive: true });
  }

  // Pause when the hero is offscreen or the tab is hidden
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas.parentElement);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else if (visible) {
      start();
      if (!WX) fetchWeather();
    }
  });

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 150);
  }, { passive: true });

  new MutationObserver(rebuild).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(load, { timeout: 1500 });
  } else {
    setTimeout(load, 300);
  }
})();
