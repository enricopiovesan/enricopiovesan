/* Topographic hero background — real contour lines of Golden, BC
   (Columbia Valley + Dogtooth Range, traced from open elevation data).
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

  function colors() {
    var cs = getComputedStyle(document.documentElement);
    var light = (document.documentElement.getAttribute('data-theme') === 'light') ||
      (!document.documentElement.getAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: light)').matches);
    return {
      line: cs.getPropertyValue('--fg').trim() || (light ? '#001f3f' : '#f6f7ed'),
      base: light ? 0.13 : 0.14,
      index: light ? 0.26 : 0.30
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
    var c = colors();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = c.line;

    // Cover the hero while preserving the terrain's aspect ratio
    var scale = Math.max(w / DATA.aspect, h) * DATA.aspect;
    var sx = scale, sy = scale / DATA.aspect;
    var ox = (w - sx) / 2, oy = (h - sy) / 2;

    var n = DATA.levels.length;
    for (var i = 0; i < n; i++) {
      var lv = DATA.levels[i];
      // Depth parallax: higher elevations drift more (max ~14px)
      var depth = (i + 2) / (n + 1);
      var dx = mx * 14 * depth, dy = my * 9 * depth;
      var isIndex = (lv.e % 1000 === 0);
      ctx.globalAlpha = isIndex ? c.index : c.base;
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
