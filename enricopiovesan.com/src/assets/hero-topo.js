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
   single drawImage blit per frame.

   Live data (all fetches fail silent, gated on tab/hero visibility):
   - aircraft: api.airplanes.live, 80 nm around Golden, every 60 s
   - weather (temp/wind/precip/cloud/snow depth): api.open-meteo.com, 15 min
   - Hwy 1 events: api.open511.gov.bc.ca, 10 min
   - aurora Kp: services.swpc.noaa.gov, 30 min
   - ISS: api.wheretheiss.at, 5 min (15 s while overhead)
   - river discharge: api.weather.gc.ca hydrometric (08NA006, 08NA002), 60 min
   - precipitation radar: api.rainviewer.com tiles, 10 min
   - wildfires: BCWS ActiveFires (ArcGIS), 30 min
   Modeled (no live source): CPKC freight trains, KHMR gondola hours. */
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

  var DATA = null, GRID = null, SUN = null, MOON = null;
  /* Live overlay: real aircraft (ADS-B) + a modeled CPKC freight on the
     rail line, which follows the Kicking Horse and Columbia rivers here.
     Map cover: 160x64 cells x 470 m = 75.2 x 30.1 km centred on Golden. */
  // Map bounds calibrated by fitting the data's river geometry against the
  // real OSM river paths (mean residual ~20 m).
  var KM_W = 61.2, KM_H = 24.4;
  var GEO = { latTop: 51.3991, lonLeft: -117.4219, dLat: 0.2196, dLon: 0.8790 };
  var PLANES = [], RAIL = null, RAIL_LEN = 0, TRAIN_WB = true;
  // Trans-Canada Hwy 1 through the map: normalized [nx,ny] from OSM trunk ways.
  // Enters NW off-map-top, runs south to Golden, then east through Kicking Horse canyon.
  var HWY1 = [[0.409,-0.135],[0.413,-0.119],[0.417,-0.102],[0.423,-0.079],[0.429,-0.051],[0.434,-0.032],[0.446,0.017],[0.448,0.032],[0.45,0.049],[0.451,0.065],[0.454,0.081],[0.456,0.096],[0.456,0.112],[0.459,0.127],[0.462,0.147],[0.465,0.168],[0.469,0.184],[0.473,0.203],[0.477,0.219],[0.481,0.242],[0.487,0.28],[0.49,0.296],[0.495,0.316],[0.501,0.331],[0.507,0.346],[0.509,0.362],[0.51,0.378],[0.512,0.394],[0.516,0.41],[0.52,0.426],[0.521,0.443],[0.536,0.443],[0.55,0.448],[0.562,0.457],[0.578,0.459],[0.589,0.447],[0.6,0.437],[0.613,0.428],[0.627,0.434],[0.632,0.45],[0.64,0.464],[0.649,0.477],[0.658,0.492],[0.672,0.501],[0.682,0.516],[0.69,0.537],[0.699,0.55],[0.71,0.537],[0.726,0.538],[0.733,0.552],[0.743,0.564],[0.755,0.574],[0.766,0.59],[0.773,0.605],[0.781,0.619],[0.79,0.631],[0.805,0.638],[0.82,0.642],[0.831,0.654],[0.84,0.667],[0.848,0.681],[0.859,0.694],[0.868,0.712],[0.874,0.726]];
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

  /* Low-precision lunar position (Meeus-style, ~1 deg — fine for art).
     Same az convention as the sun: from south, +west. */
  function moonPosition(ms) {
    var d = (ms || Date.now()) / 86400000 - 10957.5; // days since J2000.0
    var rad = Math.PI / 180;
    var L = (218.316 + 13.176396 * d) * rad;
    var M = (134.963 + 13.064993 * d) * rad;
    var F = (93.272 + 13.229350 * d) * rad;
    var lon = L + 6.289 * rad * Math.sin(M);
    var lat = 5.128 * rad * Math.sin(F);
    var e = 23.439 * rad;
    var ra = Math.atan2(Math.sin(lon) * Math.cos(e) - Math.tan(lat) * Math.sin(e), Math.cos(lon));
    var dec = Math.asin(Math.sin(lat) * Math.cos(e) + Math.cos(lat) * Math.sin(e) * Math.sin(lon));
    var lst = (280.16 + 360.9856235 * d - 116.9631) * rad;
    var H = lst - ra;
    var phi = 51.3 * rad;
    var alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
    var az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
    var sunLon = (280.46 + 0.9856474 * d) * rad;
    var elong = (lon - sunLon) % (2 * Math.PI);
    if (elong < 0) elong += 2 * Math.PI;
    var ill = (1 - Math.cos(elong)) / 2;
    return { alt: alt, az: az, ill: ill, waxing: elong < Math.PI };
  }

  function moonPhaseName(m) {
    var pc = m.ill * 100;
    if (pc < 2) return 'new moon';
    if (pc > 98) return 'full moon';
    if (pc > 45 && pc < 55) return m.waxing ? 'first quarter' : 'last quarter';
    if (pc <= 45) return m.waxing ? 'waxing crescent' : 'waning crescent';
    return m.waxing ? 'waxing gibbous' : 'waning gibbous';
  }

  /* Next moonrise/moonset within 25 h, by scanning the ephemeris. */
  function moonTimes() {
    var now = Date.now(), step = 10 * 60 * 1000;
    var prev = moonPosition(now).alt, rise = null, set = null;
    for (var t = step; t <= 25 * 60 * 60 * 1000; t += step) {
      var a = moonPosition(now + t).alt;
      if (prev <= 0 && a > 0 && !rise) rise = now + t - step / 2;
      if (prev > 0 && a <= 0 && !set) set = now + t - step / 2;
      if (rise && set) break;
      prev = a;
    }
    function fmt(ms) {
      if (!ms) return '—';
      var g = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Edmonton', hour12: false, hour: '2-digit', minute: '2-digit' });
      return g.format(new Date(ms));
    }
    return { rise: fmt(rise), set: fmt(set) };
  }

  /* Alt/az for a fixed star (RA in hours, Dec in degrees), same az
     convention as sun/moon: from south, +west. */
  function starAltAz(raH, decD, ms) {
    var d = (ms || Date.now()) / 86400000 - 10957.5;
    var rad = Math.PI / 180;
    var lst = ((280.16 + 360.9856235 * d - 116.9631) % 360) * rad;
    var H = lst - raH * 15 * rad;
    var dec = decD * rad, phi = 51.3 * rad;
    var alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
    var az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
    return { alt: alt, az: az };
  }

  // Gemini: [RA h, Dec deg, bright] — Castor, Pollux, Alhena, Wasat,
  // Mebsuta, Mekbuda, Tejat, Propus, Alzirr
  var GEMINI = [
    [7.577, 31.89, 1], [7.755, 28.03, 1], [6.628, 16.40, 1],
    [7.335, 21.98, 0], [6.732, 25.13, 0], [7.069, 20.57, 0],
    [6.383, 22.51, 0], [6.248, 22.50, 0], [6.755, 12.90, 0]
  ];
  // Stick figure: the two twins
  var GEMINI_LINES = [[0, 4], [4, 6], [6, 7], [1, 3], [3, 5], [5, 2], [2, 8]];

  function fmtHour(hr) {
    var H = Math.floor(hr), M = Math.round((hr - H) * 60);
    if (M === 60) { H++; M = 0; }
    return (H < 10 ? '0' : '') + H + ':' + (M < 10 ? '0' : '') + M;
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
      snow: light ? [96, 150, 210] : [225, 236, 246],
      green: light ? [0, 128, 76] : [88, 142, 96],
      rock: light ? [60, 80, 100] : [150, 160, 175],
      washA: light ? 0.15 : 0.055,
      sunGlow: light ? [255, 178, 84] : [255, 188, 110],
      moonGlow: [150, 180, 230]
    };
  }

  /* ---- Terrain wash: elevation bands x sun hillshade on the low-res grid ---- */
  function renderFill() {
    if (!GRID) return;
    var p = palette();
    var lightT = isLight();
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
    // Sunrise/sunset from the same solar model (hour angle at alt = 0)
    var declr = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (gn.doy - 81) / 365);
    var latr = 51.3 * Math.PI / 180;
    var cosH0 = Math.max(-1, Math.min(1, -Math.tan(latr) * Math.tan(declr)));
    var hh = Math.acos(cosH0) * 180 / Math.PI / 15;
    SUN.rise = fmtHour(13.1 - hh);
    SUN.set = fmtHour(13.1 + hh);
    MOON = moonPosition();
    var moonUp = !day && MOON.alt > 0;
    var alt = day ? Math.max(sun.alt, 0.06) : (moonUp ? Math.max(MOON.alt, 0.2) : 0.55);
    var az = day ? sun.az : (moonUp ? MOON.az : 0); // real moon light at night
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
        // Snow wash reads stronger in the light theme so it stays blue
        var aBoost = (e >= snow && lightT) ? 1.6 : 1;
        d[o + 3] = Math.round(255 * p.washA * aBoost * (0.3 + 1.2 * shade));
      }
    }
    fill.width = gw; fill.height = gh;
    fctx.putImageData(img, 0, 0);
  }

  // Named summits (OSM coordinates/elevations): [lat, lon, ele, label, side]
  // side -1 puts the label left of the triangle to avoid cluster overlap.
  var PEAKS = [
    [51.37607, -116.69539, 2924, 'Deville', 1],
    [51.34060, -116.64860, 2892, 'King', 1],
    [51.29899, -117.22832, 2836, 'Moonraker', 1],
    [51.20830, -116.75000, 2722, 'Kapristo', 1],
    [51.32198, -117.19939, 2682, 'Dawn Mtn', 1],
    [51.29167, -116.70351, 2615, 'Hunter', 1],
    [51.25431, -116.85127, 2592, 'Mt 7', 1],
    [51.28374, -117.10063, 2504, 'Ozone', 1],
    [51.27773, -117.09247, 2443, 'Whitetooth', -1],
    [51.27327, -117.06963, 2408, 'T1', 1],
    [51.26980, -117.06422, 2385, 'T2', -1],
    [51.37580, -116.94860, 2340, 'Moberly', 1]
  ];

  /* Drop points closer than minKm so lines read lean, not jittery. */
  function simplifyLine(pts, minKm) {
    if (pts.length < 3) return pts;
    var out = [pts[0]];
    for (var i = 1; i < pts.length - 1; i++) {
      var lp = out[out.length - 1];
      var dx = (pts[i][0] - lp[0]) * KM_W, dy = (pts[i][1] - lp[1]) * KM_H;
      if (dx * dx + dy * dy >= minKm * minKm) out.push(pts[i]);
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  /* Trace a polyline with corners rounded through segment midpoints. */
  function traceSmooth(c2, pts, gox, goy, gsx, gsy, ddx, ddy) {
    var n = pts.length;
    c2.moveTo(gox + pts[0][0] * gsx + ddx, goy + pts[0][1] * gsy + ddy);
    for (var i = 1; i < n - 1; i++) {
      var ax = gox + pts[i][0] * gsx + ddx, ay = goy + pts[i][1] * gsy + ddy;
      var bx = gox + pts[i + 1][0] * gsx + ddx, by = goy + pts[i + 1][1] * gsy + ddy;
      c2.quadraticCurveTo(ax, ay, (ax + bx) / 2, (ay + by) / 2);
    }
    if (n > 1) c2.lineTo(gox + pts[n - 1][0] * gsx + ddx, goy + pts[n - 1][1] * gsy + ddy);
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

    // Live precipitation radar wash
    if (RADAR_CV) {
      octx.globalAlpha = 0.32;
      octx.drawImage(RADAR_CV, ox + mx * 6, oy + my * 4, sx, sy);
      octx.globalAlpha = 1;
    }

    // Directional glow so the sun (or moon) position reads at a glance.
    // Map is north-up: east = right, south = down.
    if (SUN) {
      var light2 = isLight();
      var moonUp2 = !SUN.day && MOON && MOON.alt > 0;
      var body = SUN.day ? SUN : (moonUp2 ? MOON : null);
      // Overcast flattens the light: scale glow/disc by live cloud cover
      var cf = WX && typeof WX.cloud_cover === 'number' ? 1 - 0.7 * WX.cloud_cover / 100 : 1;
      if (body) {
        var dirX = -Math.sin(body.az);
        var elev = Math.max(0, Math.sin(Math.max(body.alt, 0)));
        var cx = ow * (0.5 + 0.44 * dirX);
        var cy = h * (0.7 - 0.62 * elev);
        var radius = Math.max(ow, h) * 0.75;
        var gc = SUN.day ? p.sunGlow : p.moonGlow;
        var ga = (SUN.day ? (0.16 - 0.07 * elev) : 0.07) * cf;
        var grad = octx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, 'rgba(' + gc[0] + ',' + gc[1] + ',' + gc[2] + ',' + ga.toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(' + gc[0] + ',' + gc[1] + ',' + gc[2] + ',0)');
        octx.fillStyle = grad;
        octx.fillRect(0, 0, ow, h);

        // Disc color keyed to altitude. The light theme needs a deeper,
        // saturated amber — the near-white noon ramp vanishes on cream.
        var t = Math.min(1, Math.max(0, elev / 0.72)); // 0 horizon → 1 noon
        var dc = SUN.day
          ? (light2
            ? [Math.round(235 - 15 * t), Math.round(110 + 60 * t), Math.round(30 + 40 * t)]
            : [255, Math.round(96 + 142 * t), Math.round(36 + 174 * t)])
          : [205, 218, 240];
        var dr = Math.max(ow, h) * (SUN.day ? 0.022 : 0.016);
        var da = SUN.day ? Math.max((0.5 - 0.22 * t) * cf, light2 ? 0.4 : 0.18) : 0.3 * cf;
        var disc = octx.createRadialGradient(cx, cy, 0, cx, cy, dr * 3.2);
        disc.addColorStop(0, 'rgba(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ',' + da.toFixed(3) + ')');
        disc.addColorStop(0.28, 'rgba(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ',' + (da * 0.55).toFixed(3) + ')');
        disc.addColorStop(1, 'rgba(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ',0)');
        octx.fillStyle = disc;
        octx.beginPath();
        octx.arc(cx, cy, dr * 3.2, 0, Math.PI * 2);
        octx.fill();

        // Crisp glyph at the disc centre so the body reads even when the
        // soft gradient is muted by the text mask or cloud cover.
        octx.globalAlpha = 0.95;
        octx.fillStyle = 'rgb(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ')';
        octx.strokeStyle = octx.fillStyle;
        if (SUN.day) {
          octx.beginPath();
          octx.arc(cx, cy, 2.6, 0, Math.PI * 2);
          octx.fill();
          octx.lineWidth = 1;
          octx.beginPath();
          for (var rk = 0; rk < 8; rk++) {
            var ra2 = rk * Math.PI / 4;
            octx.moveTo(cx + Math.cos(ra2) * 4.2, cy + Math.sin(ra2) * 4.2);
            octx.lineTo(cx + Math.cos(ra2) * 6.4, cy + Math.sin(ra2) * 6.4);
          }
          octx.stroke();
        } else {
          octx.beginPath();
          octx.arc(cx, cy, 4, -Math.PI / 2, Math.PI / 2, false);
          octx.arc(cx - 1.7, cy, 3.1, Math.PI / 2, -Math.PI / 2, true);
          octx.closePath();
          octx.fill();
        }

        // Radar-style data block: sun gets rise/set, moon gets illumination
        var bflip = cx > ow - 140;
        var blx = cx + (bflip ? -18 : 18), bly = cy - 20;
        octx.strokeStyle = 'rgb(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ')';
        octx.fillStyle = 'rgb(' + dc[0] + ',' + dc[1] + ',' + dc[2] + ')';
        octx.globalAlpha = 0.55;
        octx.lineWidth = 1;
        octx.beginPath();
        octx.moveTo(cx + (bflip ? -8 : 8), cy - 8);
        octx.lineTo(blx, bly);
        octx.stroke();
        octx.globalAlpha = 0.85;
        octx.font = '9px "IBM Plex Mono", monospace';
        octx.textBaseline = 'alphabetic';
        if (bflip) octx.textAlign = 'right';
        var btx = blx + (bflip ? -4 : 4);
        if (SUN.day) {
          octx.fillText('sun', btx, bly - 12);
          octx.fillText('↑ ' + SUN.rise + ' · ↓ ' + SUN.set, btx, bly - 1);
        } else {
          var mt = moonTimes();
          octx.fillText('moon · ' + moonPhaseName(MOON), btx, bly - 23);
          octx.fillText(Math.round(MOON.ill * 100) + '% lit', btx, bly - 12);
          octx.fillText('↑ ' + mt.rise + ' · ↓ ' + mt.set, btx, bly - 1);
        }
        octx.textAlign = 'left';
        octx.globalAlpha = 1;
      }

      // Aurora: green wash along the northern (top) edge when the real
      // planetary Kp index says a storm is on and it is night in Golden.
      if (!SUN.day && KP >= 5) {
        var aa = Math.min(0.18, (KP - 4) * 0.05);
        var ag = octx.createLinearGradient(0, 0, 0, h * 0.28);
        ag.addColorStop(0, 'rgba(80,220,140,' + aa.toFixed(3) + ')');
        ag.addColorStop(1, 'rgba(80,220,140,0)');
        octx.fillStyle = ag;
        octx.fillRect(0, 0, ow, h * 0.28);
      }

      // Gemini, from its real star positions — drawn only at night while
      // the constellation is actually above the horizon (it sits next to
      // the sun in June/July, so it returns in late-summer pre-dawn skies).
      if (!SUN.day) {
        var gs = [], upCount = 0;
        for (var si = 0; si < GEMINI.length; si++) {
          var st = starAltAz(GEMINI[si][0], GEMINI[si][1]);
          var sup = st.alt > 0.02;
          if (sup) upCount++;
          gs.push({
            x: ow * (0.5 - 0.44 * Math.sin(st.az)),
            y: h * (0.7 - 0.62 * Math.max(0, Math.sin(st.alt))),
            up: sup, bright: GEMINI[si][2]
          });
        }
        if (upCount >= 6) {
          var sc = isLight() ? '#4a5a78' : '#cdd8ee';
          octx.strokeStyle = sc;
          octx.fillStyle = sc;
          octx.lineWidth = 0.7;
          octx.globalAlpha = 0.3;
          octx.beginPath();
          for (var li2 = 0; li2 < GEMINI_LINES.length; li2++) {
            var a3 = gs[GEMINI_LINES[li2][0]], b3 = gs[GEMINI_LINES[li2][1]];
            if (!a3.up || !b3.up) continue;
            octx.moveTo(a3.x, a3.y);
            octx.lineTo(b3.x, b3.y);
          }
          octx.stroke();
          for (var si2 = 0; si2 < gs.length; si2++) {
            if (!gs[si2].up) continue;
            octx.globalAlpha = gs[si2].bright ? 0.9 : 0.55;
            octx.beginPath();
            octx.arc(gs[si2].x, gs[si2].y, gs[si2].bright ? 1.5 : 0.9, 0, Math.PI * 2);
            octx.fill();
          }
          octx.globalAlpha = 0.5;
          octx.font = '9px "IBM Plex Mono", monospace';
          octx.textBaseline = 'alphabetic';
          octx.fillText('Gemini', gs[1].x + 8, gs[1].y - 6);
          octx.globalAlpha = 1;
        }
      }
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
        traceSmooth(octx, lv.p[j], ox, oy, sx, sy, dx, dy);
      }
      octx.stroke();
    }

    // Rivers: valley floor, lowest parallax depth
    var rdx = mx * 14 * 0.25, rdy = my * 9 * 0.25;
    octx.strokeStyle = p.river;
    octx.globalAlpha = p.riverA;
    // Kicking Horse (rivers[0]) and Columbia (rivers[13]) widths track the
    // real gauged discharge; everything else stays at the base width.
    var rivers = DATA.rivers || [];
    for (var r = 0; r < rivers.length; r++) {
      var rv = rivers[r];
      octx.lineWidth = r === 0 ? RIVER_LW.kh : (r === 13 ? RIVER_LW.col : 1.4);
      octx.beginPath();
      traceSmooth(octx, rv, ox, oy, sx, sy, rdx, rdy);
      octx.stroke();
    }

    // Peaks: triangle + name + elevation
    var peaks = DATA.peaks || [];
    octx.font = '9px "IBM Plex Mono", monospace';
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
      var plabel = (pk[3] ? pk[3] + ' · ' : '') + pk[2] + ' m';
      if (pk[4] === -1) {
        octx.textAlign = 'right';
        octx.fillText(plabel, px - 8, py);
        octx.textAlign = 'left';
      } else {
        octx.fillText(plabel, px + 8, py);
      }
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

  var WX = null, WIND_P = [], PRECIP = [], ROADEV = [], KP = 0;
  /* Precipitation radar (RainViewer composite): tiles re-projected onto
     the strip and washed over the terrain at low alpha. */
  var RADAR_CV = null;
  function fetchRadar() {
    if (document.hidden || !visible) return;
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var past = d.radar && d.radar.past;
        if (!past || !past.length) return;
        var path = d.host + past[past.length - 1].path;
        // z7 is RainViewer's max for this layer — higher zooms return a
        // "Zoom Level Not Supported" placeholder tile
        var z = 7, n = 128, W = 600, H = 240;
        function xf(lon) { return (lon + 180) / 360 * n; }
        function yf(lat) { return (1 - Math.asinh(Math.tan(lat * Math.PI / 180)) / Math.PI) / 2 * n; }
        function tileLat(y) { return Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI; }
        var lonR = GEO.lonLeft + GEO.dLon, latBot = GEO.latTop - GEO.dLat;
        var x0 = Math.floor(xf(GEO.lonLeft)), x1 = Math.floor(xf(lonR));
        var y0 = Math.floor(yf(GEO.latTop)), y1 = Math.floor(yf(latBot));
        var cv = document.createElement('canvas');
        cv.width = W; cv.height = H;
        var cx2 = cv.getContext('2d');
        var pending = 0, drew = false;
        function done() {
          if (--pending === 0 && drew) {
            // Palette 0 encodes dBZ as grayscale (v ~ (dBZ+32)*2).
            // Rain: green -> yellow -> red by intensity, like a weather app.
            // Snow (live Open-Meteo flag): blue ramp instead.
            var snowing = WX && WX.snowfall > 0;
            var id = cx2.getImageData(0, 0, W, H), q = id.data;
            for (var k = 0; k < q.length; k += 4) {
              if (q[k + 3] < 25) { q[k + 3] = 0; continue; }
              var v2 = q[k], c2;
              if (snowing) {                         // snow: pale violet ramp
                var ts = Math.min(1, v2 / 160);
                c2 = [205 - 70 * ts, 190 - 80 * ts, 235 - 30 * ts];
              } else if (v2 < 140) {                 // rain: cyan -> deep teal
                var tg = Math.min(1, v2 / 140);      // (green is the terrain's)
                c2 = [115 - 85 * tg, 205 - 110 * tg, 215 - 55 * tg];
              } else if (v2 < 160) c2 = [230, 205, 70];   // heavy
              else if (v2 < 180) c2 = [235, 140, 40];     // very heavy
              else c2 = [210, 50, 40];                    // severe
              q[k] = Math.round(c2[0]); q[k + 1] = Math.round(c2[1]); q[k + 2] = Math.round(c2[2]);
            }
            cx2.putImageData(id, 0, 0);
            RADAR_CV = cv;
            if (DATA) rebuild();
          }
        }
        for (var tx3 = x0; tx3 <= x1; tx3++) {
          for (var ty3 = y0; ty3 <= y1; ty3++) {
            (function (tx4, ty4) {
              pending++;
              var img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = function () {
                var west = tx4 / n * 360 - 180, east = (tx4 + 1) / n * 360 - 180;
                var top = tileLat(ty4), bot = tileLat(ty4 + 1);
                var dx = (west - GEO.lonLeft) / GEO.dLon * W;
                var dw = (east - west) / GEO.dLon * W;
                var dy = (GEO.latTop - top) / GEO.dLat * H;
                var dh = (top - bot) / GEO.dLat * H;
                cx2.drawImage(img, dx, dy, dw, dh);
                drew = true;
                done();
              };
              img.onerror = done;
              img.src = path + '/256/' + z + '/' + tx4 + '/' + ty4 + '/0/1_0.png';
            })(tx3, ty3);
          }
        }
      })
      .catch(function () { /* decorative only */ });
  }

  var FIRES = [];
  function fetchFires() {
    if (document.hidden || !visible) return;
    fetch('https://services6.arcgis.com/ubm4tcTYICKBpist/arcgis/rest/services/BCWS_ActiveFires_PublicView/FeatureServer/0/query?where=1%3D1&geometry=-117.5,51.1,-116.4,51.45&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=FIRE_STATUS&returnGeometry=true&f=geojson')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        FIRES = (d.features || []).map(function (f) {
          var c = f.geometry && f.geometry.coordinates;
          if (!c) return null;
          return {
            nx: (c[0] - GEO.lonLeft) / GEO.dLon,
            ny: (GEO.latTop - c[1]) / GEO.dLat,
            ooc: /out of control/i.test((f.properties || {}).FIRE_STATUS || '')
          };
        }).filter(function (f) {
          return f && f.nx > 0 && f.nx < 1 && f.ny > 0 && f.ny < 1;
        }).slice(0, 6);
      })
      .catch(function () { /* decorative only */ });
  }

  var RIVER_LW = { kh: 1.4, col: 1.4 };
  function fetchRivers() {
    if (document.hidden || !visible) return;
    // Median-flow baselines: Kicking Horse ~30 m3/s, Columbia ~110 m3/s
    function one(station, key, base) {
      fetch('https://api.weather.gc.ca/collections/hydrometric-realtime/items?STATION_NUMBER=' + station + '&limit=1&sortby=-DATETIME&f=json')
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var f = d.features && d.features[0];
          var q = f && f.properties && f.properties.DISCHARGE;
          if (typeof q === 'number' && q > 0) {
            RIVER_LW[key] = Math.min(3.2, Math.max(1, 1 + 0.9 * Math.log(q / base) / Math.LN10));
            if (DATA) rebuild();
          }
        })
        .catch(function () { /* decorative only */ });
    }
    one('08NA006', 'kh', 30);   // Kicking Horse at Golden
    one('08NA002', 'col', 110); // Columbia at Nicholson
  }

  var ISS = null, issPrev = null;
  function pollISS() {
    var near = false;
    if (document.hidden || !visible) {
      setTimeout(pollISS, 5 * 60 * 1000);
      return;
    }
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var dLon2 = d.longitude - (-116.9631);
        if (dLon2 > 180) dLon2 -= 360; if (dLon2 < -180) dLon2 += 360;
        near = Math.abs(d.latitude - 51.3) < 6 && Math.abs(dLon2) < 8;
        var fix = {
          nx: (d.longitude - GEO.lonLeft) / GEO.dLon,
          ny: (GEO.latTop - d.latitude) / GEO.dLat,
          t: d.timestamp
        };
        if (near && issPrev && fix.t > issPrev.t) {
          ISS = {
            nx: fix.nx, ny: fix.ny, t0: performance.now(),
            vx: (fix.nx - issPrev.nx) / (fix.t - issPrev.t),
            vy: (fix.ny - issPrev.ny) / (fix.t - issPrev.t)
          };
        } else if (!near) ISS = null;
        issPrev = fix;
      })
      .catch(function () { /* decorative only */ })
      .then(function () { setTimeout(pollISS, near ? 15000 : 5 * 60 * 1000); });
  }

  function fetchKp() {
    if (document.hidden || !visible) return;
    fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var last = d[d.length - 1];
        var kp = last && last.estimated_kp;
        if (typeof kp === 'number' && kp !== KP) { KP = kp; if (DATA) rebuild(); }
      })
      .catch(function () { /* decorative only */ });
  }
  function fetchRoads() {
    if (document.hidden || !visible) return;
    fetch('https://api.open511.gov.bc.ca/events?status=ACTIVE&bbox=-117.5,51.1,-116.4,51.45')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        ROADEV = (d.events || []).map(function (e) {
          var co = e.geography && e.geography.coordinates;
          if (!co) return null;
          var pt = e.geography.type === 'Point' ? co : co[0];
          if (!pt || typeof pt[0] !== 'number') return null;
          return {
            nx: (pt[0] - GEO.lonLeft) / GEO.dLon,
            ny: (GEO.latTop - pt[1]) / GEO.dLat,
            major: e.severity === 'MAJOR' || e.event_type === 'INCIDENT',
            label: (e.event_type || 'EVENT').toLowerCase()
          };
        }).filter(function (e) {
          return e && e.nx > 0 && e.nx < 1 && e.ny > 0 && e.ny < 1;
        }).sort(function (a, b) {
          return (b.major ? 1 : 0) - (a.major ? 1 : 0);
        }).slice(0, 3);
      })
      .catch(function () { /* decorative only */ });
  }
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
      var wspd = Math.min(0.9, 0.1 + WX.wind_speed_10m / 75);   // px per 40ms tick
      var wvx = Math.sin(wdir) * wspd, wvy = -Math.cos(wdir) * wspd;
      if (!WIND_P.length) {
        for (var wi = 0; wi < 64; wi++) WIND_P.push({ x: Math.random() * w, y: Math.random() * h });
      }
      ctx.strokeStyle = p.line;
      ctx.globalAlpha = 0.32;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (var wj = 0; wj < WIND_P.length; wj++) {
        var wp = WIND_P[wj];
        wp.x += wvx; wp.y += wvy;
        if (wp.x < -10) wp.x += w + 20; if (wp.x > w + 10) wp.x -= w + 20;
        if (wp.y < -10) wp.y += h + 20; if (wp.y > h + 10) wp.y -= h + 20;
        ctx.moveTo(wp.x, wp.y);
        ctx.lineTo(wp.x - wvx * 30, wp.y - wvy * 30);
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
        pp.x += pvx * 0.33; pp.y += snow ? 0.15 : 1;
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

    // Golden Eagle Express gondola (endpoints from OSM): station squares at
    // both ends; a circulating string of cabins runs only during real
    // operating hours (modeled from kickinghorseresort.com schedules).
    (function () {
      var bnx = (-117.04867 - GEO.lonLeft) / GEO.dLon, bny = (GEO.latTop - 51.29754) / GEO.dLat;
      var tnx = (-117.07763 - GEO.lonLeft) / GEO.dLon, tny = (GEO.latTop - 51.27516) / GEO.dLat;
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
      // Stations
      ctx.globalAlpha = 0.7;
      ctx.fillRect(bX - 2, bY - 2, 4, 4);
      ctx.fillRect(tX - 2, tY - 2, 4, 4);
      var gn2 = goldenNow(), doy = gn2.doy, hr2 = gn2.hour, dow = new Date().getDay();
      var open = false;
      if (doy >= 150 && doy <= 166 && (dow >= 5 || dow <= 1)) open = hr2 >= 10 && hr2 < 15.5;
      else if (doy >= 170 && doy <= 250) open = hr2 >= 10 && hr2 < 16.5;
      else if (doy >= 253 && doy <= 270 && (dow >= 4 || dow <= 1)) open = hr2 >= 10 && hr2 < 15.5;
      else if (doy >= 346 || doy <= 102) open = hr2 >= 9 && hr2 < 15.5;
      if (open) {
        // Circulating monocable: evenly spaced cabins, both directions on
        // slightly offset lines (~12 min base-to-top).
        var len = Math.sqrt((tX - bX) * (tX - bX) + (tY - bY) * (tY - bY)) || 1;
        var pxv = -(tY - bY) / len, pyv = (tX - bX) / len;  // perpendicular
        var ph = (Date.now() / 1000 % 720) / 720;
        var N = 5;
        ctx.globalAlpha = 0.85;
        for (var ci = 0; ci < N; ci++) {
          var uu = (ph + ci / N) % 1;
          ctx.beginPath();
          ctx.arc(bX + (tX - bX) * uu + pxv, bY + (tY - bY) * uu + pyv, 1.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(bX + (tX - bX) * (1 - uu) - pxv, bY + (tY - bY) * (1 - uu) - pyv, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    })();

    // Active wildfires (BC Wildfire Service): flame dot, pulsing red ring
    // when out of control.
    for (var fi2 = 0; fi2 < FIRES.length; fi2++) {
      var fr = FIRES[fi2];
      var fX = ox2 + fr.nx * sx2 + mx * 14 * 0.25, fY = oy2 + fr.ny * sy2 + my * 9 * 0.25;
      ctx.fillStyle = fr.ooc ? '#e03020' : '#e07a30';
      ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.arc(fX, fY, 2.4, 0, Math.PI * 2); ctx.fill();
      if (fr.ooc) {
        var pulse = 3.5 + 2.5 * Math.abs(Math.sin(Date.now() / 600));
        ctx.strokeStyle = '#e03020';
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(fX, fY, pulse, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'alphabetic';
      ctx.globalAlpha = 0.8;
      ctx.fillText('wildfire', fX + 7, fY - 4);
    }

    // Highway 1 events from DriveBC: warning triangles, red for closures/
    // incidents, quiet grey for construction.
    for (var rv2 = 0; rv2 < ROADEV.length; rv2++) {
      var ev = ROADEV[rv2];
      var eX = ox2 + ev.nx * sx2 + mx * 14 * 0.25, eY = oy2 + ev.ny * sy2 + my * 9 * 0.25;
      ctx.fillStyle = ev.major ? (isLight() ? '#b3261e' : '#ff8a80') : p.line;
      ctx.globalAlpha = ev.major ? 0.9 : 0.4;
      ctx.beginPath();
      ctx.moveTo(eX, eY - 4); ctx.lineTo(eX + 3.6, eY + 2.6); ctx.lineTo(eX - 3.6, eY + 2.6);
      ctx.closePath(); ctx.fill();
      if (ev.major) {
        ctx.font = '9px "IBM Plex Mono", monospace';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText('Hwy 1 · ' + ev.label, eX + 7, eY - 4);
      }
    }

    // Golden airport (CYGE): real field, no METAR/scheduled service —
    // static ident marker; any traffic shows via the ADS-B layer.
    (function () {
      var anx = (-116.9825 - GEO.lonLeft) / GEO.dLon, any2 = (GEO.latTop - 51.2992) / GEO.dLat;
      var aX = ox2 + anx * sx2 + mx * 14 * 0.25, aY = oy2 + any2 * sy2 + my * 9 * 0.25;
      ctx.strokeStyle = p.line;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(aX, aY, 3, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(aX - 4.5, aY); ctx.lineTo(aX + 4.5, aY);
      ctx.stroke();
      ctx.fillStyle = p.line;
      ctx.font = '8px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('CYGE', aX + 6, aY - 4);
    })();

    // Highway 1 polyline: smooth quadratic curves, green when clear, red near major DriveBC events.
    (function () {
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.setLineDash([]);

      function hX(nx) { return ox2 + nx * sx2 + mx * 14 * 0.25; }
      function hY(ny) { return oy2 + ny * sy2 + my * 9 * 0.25; }

      // Tag each point red if a major ROADEV is within 0.06 norm (~5 km)
      var tags = HWY1.map(function (p) {
        for (var rei = 0; rei < ROADEV.length; rei++) {
          var re = ROADEV[rei];
          var dx = p[0] - re.nx, dy = p[1] - re.ny;
          if (re.major && dx * dx + dy * dy < 0.06 * 0.06) return 'red';
        }
        return 'green';
      });

      // Draw smooth runs of consecutive same-color points
      function drawRun(pts, color, alpha) {
        if (pts.length < 2) return;
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(hX(pts[0][0]), hY(pts[0][1]));
        for (var i = 1; i < pts.length - 1; i++) {
          var ax = hX(pts[i][0]), ay = hY(pts[i][1]);
          var bx = hX(pts[i + 1][0]), by = hY(pts[i + 1][1]);
          ctx.quadraticCurveTo(ax, ay, (ax + bx) / 2, (ay + by) / 2);
        }
        ctx.lineTo(hX(pts[pts.length - 1][0]), hY(pts[pts.length - 1][1]));
        ctx.stroke();
      }

      var run = [HWY1[0]], runColor = tags[0];
      for (var hi = 1; hi < HWY1.length; hi++) {
        if (tags[hi] === runColor) {
          run.push(HWY1[hi]);
        } else {
          run.push(HWY1[hi]); // include shared endpoint for continuity
          var c = runColor === 'red' ? (isLight() ? '#b3261e' : '#ff5252') : (isLight() ? '#1a6b2e' : '#69f0ae');
          drawRun(run, c, runColor === 'red' ? 0.9 : 0.65);
          run = [HWY1[hi]];
          runColor = tags[hi];
        }
      }
      var fc = runColor === 'red' ? (isLight() ? '#b3261e' : '#ff5252') : (isLight() ? '#1a6b2e' : '#69f0ae');
      drawRun(run, fc, runColor === 'red' ? 0.9 : 0.65);
      ctx.setLineDash([]);
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
        ctx.globalAlpha = 0.55;
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
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fill();
        if (hx > -10 && hx < w + 10 && hy > -10 && hy < h + 10) {
          var tflip = hx > w - 120;
          var tlx = hx + (tflip ? -14 : 14), tly = hy - 16;
          ctx.globalAlpha = 0.35;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(hx + (tflip ? -3 : 3), hy - 3);
          ctx.lineTo(tlx, tly);
          ctx.stroke();
          ctx.globalAlpha = 0.6;
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
        var pinned = au > 0.42;
        if (pinned) {
          var cu = 0.42 + (au - 0.42) / 12;
          ny = 0.5 + (u < 0 ? -1 : 1) * Math.min(cu, 0.47);
        }
        if (nx < -0.02 || nx > 1.02) continue;
        var X2 = ox2 + nx * sx2 + mx * 16, Y2 = oy2 + ny * sy2 + my * 10;
        // The top 220px of the canvas is parallax headroom hidden above the
        // hero (see #hero-topo CSS) — keep rim-pinned targets below it.
        if (Y2 < 252) Y2 = 252;

        ctx.save();
        ctx.translate(X2, Y2);
        // Pinned targets slide along the rim, so point the glyph at the
        // apparent (horizontal) motion rather than the true track.
        ctx.rotate(pinned ? (a.vx >= 0 ? Math.PI / 2 : -Math.PI / 2) : a.tr);
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

    // ISS: bright streak when it is genuinely passing over the valley.
    if (ISS) {
      var idt = (performance.now() - ISS.t0) / 1000;
      var inx = ISS.nx + ISS.vx * idt, iny = ISS.ny + ISS.vy * idt;
      var iu = iny - 0.5, iau = Math.abs(iu);
      if (iau > 0.42) iny = 0.5 + (iu < 0 ? -1 : 1) * Math.min(0.42 + (iau - 0.42) / 12, 0.47);
      if (inx > -0.02 && inx < 1.02) {
        var iX = ox2 + inx * sx2, iY = oy2 + iny * sy2;
        if (iY < 252) iY = 252;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(iX, iY);
        ctx.lineTo(iX - ISS.vx * sx2 * 14, iY - ISS.vy * sy2 * 14);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(iX, iY, 2, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.8;
        ctx.font = '9px "IBM Plex Mono", monospace';
        ctx.fillText('ISS · 27,500 km/h', iX + 8, iY - 6);
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
        // Lean geometry: drop sub-scale jitter once, then the smooth
        // tracer rounds what remains.
        for (var li3 = 0; li3 < DATA.levels.length; li3++) {
          DATA.levels[li3].p = DATA.levels[li3].p.map(function (ln) { return simplifyLine(ln, 0.35); });
        }
        DATA.rivers = (DATA.rivers || []).map(function (rv2) { return simplifyLine(rv2, 0.6); });
        // Replace the unnamed elevation markers with the named summit set
        DATA.peaks = PEAKS.map(function (pk2) {
          return [(pk2[1] - GEO.lonLeft) / GEO.dLon, (GEO.latTop - pk2[0]) / GEO.dLat, pk2[2], pk2[3], pk2[4]];
        });
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
        fetchRoads();
        setInterval(fetchRoads, 10 * 60 * 1000);
        fetchKp();
        setInterval(fetchKp, 30 * 60 * 1000);
        fetchFires();
        setInterval(fetchFires, 30 * 60 * 1000);
        pollISS();
        fetchRivers();
        setInterval(fetchRivers, 60 * 60 * 1000);
        fetchRadar();
        setInterval(fetchRadar, 10 * 60 * 1000);
        if (!reduced) {
          // Overlay ticker: planes/train creep across the static scene.
          setInterval(function () {
            if (visible && !document.hidden && !raf) blit();
          }, 40);
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

  // Vertical scroll parallax: the map sinks slower than the text scrolls.
  if (!reduced) {
    var spTick = false;
    window.addEventListener('scroll', function () {
      if (spTick) return;
      spTick = true;
      requestAnimationFrame(function () {
        spTick = false;
        var py = Math.min(220, window.scrollY * 0.5);
        canvas.style.transform = 'translateX(-50%) translateY(' + py.toFixed(1) + 'px)';
      });
    }, { passive: true });
  }

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
