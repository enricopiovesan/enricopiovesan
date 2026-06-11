/* Topographic hero background — real contour lines of Golden, BC
   (Columbia Valley, Dogtooth Range, Van Horne Range; traced from open
   elevation data, 771–2938 m). Peaks marked with their elevation.
   Contours are tinted by a seasonal snowline model: snow holds on the
   high lines into early July, vegetation tints the lower lines.
   Subtle depth parallax on pointer move; static on touch / reduced motion. */
(function () {
  var canvas = document.getElementById('hero-topo');
  if (!canvas) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var ctx = canvas.getContext('2d');
  var DATA = null;
  var w = 0, h = 0, dpr = 1;
  var mx = 0, my = 0;        // current (lerped) pointer, -1..1 from hero center
  var tx = 0, ty = 0;        // target pointer
  var raf = null;
  var settled = true;

  /* Seasonal snowline for the Purcells around Golden (m).
     Anchors: deep winter ~900, ~1700 on June 10, bare except the very
     tops by mid-July, first dustings return through fall. */
  var SNOW_ANCHORS = [
    [15, 900], [105, 1100], [135, 1450], [161, 1700], [182, 2100],
    [196, 2450], [227, 2800], [258, 2750], [288, 2200], [319, 1300], [349, 950]
  ];
  function snowline() {
    var now = new Date();
    var doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
    var a = SNOW_ANCHORS, n = a.length;
    for (var i = 0; i < n; i++) {
      var p = a[i], q = a[(i + 1) % n];
      var d0 = p[0], d1 = q[0] + (i === n - 1 ? 365 : 0);
      var d = doy + (i === n - 1 && doy < d0 ? 365 : 0);
      if (d >= d0 && d <= d1) {
        var t = (d - d0) / (d1 - d0);
        return p[1] + t * (q[1] - p[1]);
      }
    }
    return a[0][1];
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
      rock: cs.getPropertyValue('--fg').trim() || (light ? '#001f3f' : '#f6f7ed'),
      snow: light ? '#6e9cc3' : '#dce9f5',
      veg:  light ? '#00804c' : '#74c365',
      rockA:  light ? 0.13 : 0.14,
      rockAi: light ? 0.26 : 0.30,
      snowA:  light ? 0.22 : 0.26,
      snowAi: light ? 0.38 : 0.46,
      vegA:   light ? 0.13 : 0.15,
      vegAi:  light ? 0.24 : 0.27,
      peak:   light ? 0.45 : 0.5
    };
  }

  function resize() {
    var r = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    draw();
  }

  function draw() {
    if (!DATA) return;
    var p = palette();
    var snow = snowline();
    var treeline = 2050;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Cover the hero while preserving the terrain's aspect ratio
    var sy = Math.max(h, w / DATA.aspect);
    var sx = sy * DATA.aspect;
    var ox = (w - sx) / 2, oy = (h - sy) / 2;

    var n = DATA.levels.length;
    var span = (DATA.max || 2900) - (DATA.min || 770) || 1;

    function depthOf(elev) {
      return 0.25 + 0.75 * (elev - DATA.min) / span;
    }

    for (var i = 0; i < n; i++) {
      var lv = DATA.levels[i];
      var depth = depthOf(lv.e);
      var dx = mx * 14 * depth, dy = my * 9 * depth;
      var isIndex = (lv.e % 1000 === 0);
      if (lv.e >= snow) {
        ctx.strokeStyle = p.snow;
        ctx.globalAlpha = isIndex ? p.snowAi : p.snowA;
      } else if (lv.e <= treeline) {
        ctx.strokeStyle = p.veg;
        ctx.globalAlpha = isIndex ? p.vegAi : p.vegA;
      } else {
        ctx.strokeStyle = p.rock;
        ctx.globalAlpha = isIndex ? p.rockAi : p.rockA;
      }
      ctx.lineWidth = isIndex ? 1.1 : 0.7;
      ctx.beginPath();
      for (var j = 0; j < lv.p.length; j++) {
        var line = lv.p[j];
        ctx.moveTo(ox + line[0][0] * sx + dx, oy + line[0][1] * sy + dy);
        for (var k = 1; k < line.length; k++) {
          ctx.lineTo(ox + line[k][0] * sx + dx, oy + line[k][1] * sy + dy);
        }
      }
      ctx.stroke();
    }

    // Peak markers: small triangle + elevation
    var peaks = DATA.peaks || [];
    ctx.font = '9px "IBM Plex Mono", monospace';
    ctx.textBaseline = 'middle';
    for (var q = 0; q < peaks.length; q++) {
      var pk = peaks[q];
      var depth2 = depthOf(pk[2]);
      var px = ox + pk[0] * sx + mx * 14 * depth2;
      var py = oy + pk[1] * sy + my * 9 * depth2;
      if (px < 8 || px > w - 40 || py < 10 || py > h - 10) continue;
      var snowy = pk[2] >= snow;
      ctx.strokeStyle = snowy ? p.snow : p.rock;
      ctx.fillStyle = snowy ? p.snow : p.rock;
      ctx.globalAlpha = p.peak;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py - 3.5);
      ctx.lineTo(px + 3.5, py + 2.5);
      ctx.lineTo(px - 3.5, py + 2.5);
      ctx.closePath();
      ctx.stroke();
      ctx.globalAlpha = p.peak * 0.85;
      ctx.fillText(pk[2] + ' m', px + 7, py);
    }
    ctx.globalAlpha = 1;
  }

  function tick() {
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    draw();
    if (Math.abs(tx - mx) < 0.002 && Math.abs(ty - my) < 0.002) {
      settled = true;
      raf = null;
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function wake() {
    if (settled) {
      settled = false;
      raf = requestAnimationFrame(tick);
    }
  }

  function load() {
    fetch('/src/assets/golden-contours.json')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        DATA = d;
        resize();
        canvas.style.opacity = '1';
      })
      .catch(function () { /* decorative only */ });
  }

  if (finePointer && !reduced) {
    var hero = canvas.parentElement;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      wake();
    }, { passive: true });
    hero.addEventListener('mouseleave', function () {
      tx = 0; ty = 0;
      wake();
    }, { passive: true });
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 150);
  }, { passive: true });

  new MutationObserver(draw).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(load, { timeout: 1500 });
  } else {
    setTimeout(load, 300);
  }
})();
