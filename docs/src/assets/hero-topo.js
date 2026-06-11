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
      var ga = SUN.day ? (0.16 - 0.07 * elev) : 0.07;
      var grad = octx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, 'rgba(' + gc[0] + ',' + gc[1] + ',' + gc[2] + ',' + ga.toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(' + gc[0] + ',' + gc[1] + ',' + gc[2] + ',0)');
      octx.fillStyle = grad;
      octx.fillRect(0, 0, ow, h);
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

  function blit() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(off, -margin * dpr, 0);
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
        resize();
        canvas.style.opacity = '1';
        setInterval(function () { if (visible) rebuild(); }, 60000);
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
    else if (visible) start();
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
