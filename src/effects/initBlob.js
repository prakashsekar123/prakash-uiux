// Ported 1:1 from the original inline <script> (squishy draggable orange blob on the hero canvas).
export default function initBlob(cv) {
var cleanups = [], raf = 0;
(function () {
  var ctx = cv.getContext('2d'), W, H, dpr, bgGrad, stars;
  function buildBG() {
    bgGrad = ctx.createRadialGradient(W * 0.72, H * 0.28, 0, W * 0.72, H * 0.28, Math.max(W, H) * 0.85);
    bgGrad.addColorStop(0, '#2a1407');
    bgGrad.addColorStop(.45, '#140a05');
    bgGrad.addColorStop(1, '#000');
    var n = Math.round((W * H) / 14000);
    stars = [];
    for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .3, p: Math.random() * 6.28, s: Math.random() * .6 + .3 });
  }
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildBG();
  }
  window.addEventListener('resize', resize); cleanups.push(function () { window.removeEventListener('resize', resize); }); resize();

  var R = Math.max(44, Math.min(62, Math.min(W, H) * 0.12)), N = 32, SUB = 4;
  var reduceM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L1 = 2 * R * Math.sin(Math.PI / N), L2 = 2 * R * Math.sin(2 * Math.PI / N), A0 = Math.PI * R * R;
  var P = [];
  for (var i = 0; i < N; i++) {
    var a = i / N * Math.PI * 2;
    P.push({ x: (W > 760 ? W * 0.68 : W / 2) + Math.cos(a) * R, y: (W > 760 ? H * 0.42 : H * 0.28) + Math.sin(a) * R, vx: 0, vy: 0 });
  }
  var mouse = { x: W * 0.7, y: H * 0.5, has: false, down: false };
  var grab = null, idleSince = 0;
  var target = { x: W / 2, y: H / 2, until: 0 };
  var cen = { x: W / 2, y: H / 2, vx: 0, vy: 0 };
  var eye = { ox: 0, oy: 0, cx: 1, cy: 0 };

  function over(x, y) { var dx = x - cen.x, dy = y - cen.y; return dx * dx + dy * dy < R * R * 1.8; }
  function nearest(x, y) {
    var b = 0, bd = 1e9;
    for (var i = 0; i < N; i++) { var d = Math.hypot(P[i].x - x, P[i].y - y); if (d < bd) { bd = d; b = i; } }
    return b;
  }
  cv.addEventListener('pointermove', function (e) {
    mouse.x = e.offsetX; mouse.y = e.offsetY; mouse.has = true;
    if (!mouse.down) cv.className = over(mouse.x, mouse.y) ? 'grab' : '';
  });
  cv.addEventListener('pointerdown', function (e) {
    mouse.x = e.offsetX; mouse.y = e.offsetY; mouse.has = true;
    if (over(mouse.x, mouse.y)) {
      mouse.down = true; cv.setPointerCapture(e.pointerId);
      var g = nearest(mouse.x, mouse.y);
      grab = { i: g, dx: P[g].x - mouse.x, dy: P[g].y - mouse.y };
      cv.className = 'grabbing';
    }
  });
  function release() {
    if (!mouse.down) return;
    mouse.down = false; grab = null; idleSince = performance.now();
    cv.className = over(mouse.x, mouse.y) ? 'grab' : '';
  }
  cv.addEventListener('pointerup', release);
  cv.addEventListener('pointercancel', release);

  function step(t, now) {
    var cx = 0, cy = 0, i, p;
    for (i = 0; i < N; i++) { cx += P[i].x; cy += P[i].y; }
    cx /= N; cy /= N;
    var area = 0;
    for (i = 0; i < N; i++) { var q = P[(i + 1) % N]; area += P[i].x * q.y - q.x * P[i].y; }
    area = Math.abs(area) / 2;
    var breathe = reduceM ? 1 : 1 + Math.sin(t * 1.6) * 0.035;
    var press = 1.1 * (A0 * breathe - area) / A0;
    var F = [];
    for (i = 0; i < N; i++) F.push([0, 0]);

    for (i = 0; i < N; i++) {
      var a = P[i], b = P[(i + 1) % N], c2 = P[(i + 2) % N], pr = P[(i + N - 1) % N];
      var dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, f = 0.2 * (d - L1) / d;
      F[i][0] += dx * f; F[i][1] += dy * f; F[(i + 1) % N][0] -= dx * f; F[(i + 1) % N][1] -= dy * f;
      dx = c2.x - a.x; dy = c2.y - a.y; d = Math.hypot(dx, dy) || 1; f = 0.12 * (d - L2) / d;
      F[i][0] += dx * f; F[i][1] += dy * f; F[(i + 2) % N][0] -= dx * f; F[(i + 2) % N][1] -= dy * f;
      var tx = b.x - pr.x, ty = b.y - pr.y;
      F[i][0] += ty * press * 0.5; F[i][1] -= tx * press * 0.5;
    }

    if (grab) {
      for (i = 0; i < N; i++) {
        var di = Math.min(Math.abs(i - grab.i), N - Math.abs(i - grab.i));
        var w = di === 0 ? 0.3 : Math.max(0, 1 - di / 7) * 0.05 + 0.006;
        F[i][0] += (mouse.x + grab.dx - P[i].x) * w;
        F[i][1] += (mouse.y + grab.dy - P[i].y) * w;
      }
    } else if (!reduceM && (t * 1000 + 0) > 0) {
      var nowMs = performance.now();
      if (nowMs - idleSince > 1200 && nowMs > target.until) {
        var wide = W > 760;
        target.x = wide ? W * 0.5 + R * 1.5 + Math.random() * Math.max(10, W * 0.5 - R * 3.5) : R * 1.5 + Math.random() * Math.max(10, W - R * 3);
        target.y = R * 2 + Math.random() * Math.max(10, (wide ? H * 0.5 : H * 0.42) - R * 3);
        target.until = nowMs + 2200 + Math.random() * 2000;
      }
      if (nowMs - idleSince > 1200) {
        var tdx = target.x - cx, tdy = target.y - cy, td = Math.hypot(tdx, tdy) || 1;
        var ux = tdx / td, uy = tdy / td, mag = 0.05 * Math.min(td, 220) / 220;
        for (i = 0; i < N; i++) {
          var rx = P[i].x - cx, ry = P[i].y - cy, rl = Math.hypot(rx, ry) || 1;
          var lead = Math.max(0, (rx * ux + ry * uy) / rl);
          F[i][0] += ux * mag * (0.25 + lead * lead * 1.6);
          F[i][1] += uy * mag * (0.25 + lead * lead * 1.6);
        }
      }
    }

    for (i = 0; i < N; i++) {
      p = P[i];
      p.vx = (p.vx + F[i][0]) * 0.985; p.vy = (p.vy + F[i][1]) * 0.985;
      var s = Math.hypot(p.vx, p.vy); if (s > 32) { p.vx *= 32 / s; p.vy *= 32 / s; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 3) { p.x = 3; p.vx *= -0.35; p.vy *= 0.92; }
      if (p.x > W - 3) { p.x = W - 3; p.vx *= -0.35; p.vy *= 0.92; }
      if (p.y < 3) { p.y = 3; p.vy *= -0.35; p.vx *= 0.92; }
      if (p.y > H - 3) { p.y = H - 3; p.vy *= -0.35; p.vx *= 0.92; }
    }
  }

  var t0 = performance.now();
  function frame(now) {
    var t = (now - t0) / 1000, i, p;
    for (var k = 0; k < SUB; k++) step(t, now);

    var cx = 0, cy = 0, vx = 0, vy = 0;
    for (i = 0; i < N; i++) { p = P[i]; cx += p.x; cy += p.y; vx += p.vx; vy += p.vy; }
    cx /= N; cy /= N; vx /= N; vy /= N;
    var ax = vx - cen.vx, ay = vy - cen.vy;
    cen.x = cx; cen.y = cy; cen.vx = vx; cen.vy = vy;

    var sxx = 0, sxy = 0, syy = 0;
    for (i = 0; i < N; i++) { var dx = P[i].x - cx, dy = P[i].y - cy; sxx += dx * dx; sxy += dx * dy; syy += dy * dy; }
    sxx /= N; sxy /= N; syy /= N;
    var tr = (sxx + syy) / 2, df = Math.sqrt(((sxx - syy) / 2) * ((sxx - syy) / 2) + sxy * sxy);
    var ra = Math.sqrt(2 * (tr + df)), rb = Math.sqrt(2 * Math.max(1, tr - df));
    var th2 = Math.atan2(2 * sxy, sxx - syy), aniso = Math.min(1, (ra - rb) / R * 2.5);
    eye.cx += (Math.cos(th2) * aniso + 0.15 - eye.cx) * 0.2;
    eye.cy += (Math.sin(th2) * aniso - eye.cy) * 0.2;
    var th = 0.5 * Math.atan2(eye.cy, eye.cx);

    var lx = 0, ly = 0;
    if (mouse.has && !grab) { var mx = mouse.x - cx, my = mouse.y - cy, ml = Math.hypot(mx, my) || 1, k2 = Math.min(1, ml / 260); lx = mx / ml * k2 * R * 0.16; ly = my / ml * k2 * R * 0.16; }
    if (Math.hypot(vx, vy) > 1) { lx += vx * 0.5; ly += vy * 0.5; }
    lx -= ax * 4; ly -= ay * 4;
    var cl = Math.hypot(lx, ly), lim = R * 0.3; if (cl > lim) { lx *= lim / cl; ly *= lim / cl; }
    eye.ox += (lx - eye.ox) * 0.18; eye.oy += (ly - eye.oy) * 0.18;

    ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, W, H);
    for (var si = 0; si < stars.length; si++) {
      var st = stars[si], tw = reduceM ? st.s : st.s * (.6 + .4 * Math.sin(t * 1.2 + st.p));
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283);
      ctx.fillStyle = 'rgba(255,200,150,' + tw + ')'; ctx.fill();
    }
    ctx.beginPath();
    var m0x = (P[0].x + P[1].x) / 2, m0y = (P[0].y + P[1].y) / 2;
    ctx.moveTo(m0x, m0y);
    for (i = 1; i <= N; i++) {
      var a = P[i % N], b = P[(i + 1) % N];
      ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
    }
    ctx.closePath(); ctx.fillStyle = '#FF4B0A'; ctx.fill();

    var blink = Math.sin(t * 0.7 + 1) > 0.992 ? 0.12 : 1;
    var gap = ra * 0.3, ec = Math.cos(th), es = Math.sin(th);
    var rx = Math.max(R * 0.07, ra * 0.09), ry = Math.max(R * 0.05, rb * 0.11) * blink;
    for (var sg = -1; sg <= 1; sg += 2) {
      var ex = cx + ec * gap * sg + eye.ox, ey = cy + es * gap * sg + eye.oy - rb * 0.04;
      ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, th, 0, Math.PI * 2);
      ctx.fillStyle = '#000'; ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
})();
return function () {
  cancelAnimationFrame(raf);
  cleanups.forEach(function (f) { f(); });
};
}
