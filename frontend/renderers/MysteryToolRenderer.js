/* ================================================================
   ChemSim — Mystery Lab Interactive Tool Renderer

   Wide (720 x 330) realistic lab-bench canvas scenes for the
   Mystery Lab apparatus. Each apparatus is driven by a short
   sequence of click steps shown in the prompt bar underneath;
   finishing the sequence performs the test.

   Vanilla JS, no dependencies. All visual outcomes are derived
   from the existing observation text in mysteryData.js — no new
   chemistry is invented here.
   ================================================================ */

var MysteryToolRenderer = (function() {
  var W = 720, H = 330, BENCH = 256;

  var canvas = null, ctx = null, rafId = null, lastTs = 0;
  var test = null, meta = null, scene = null, anim = null, opts = null;

  /* ---------------- utils ---------------- */

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(t) { return t < 0 ? 0 : (t > 1 ? 1 : t); }
  function easeOut(t) { t = clamp01(t); return 1 - Math.pow(1 - t, 3); }
  function rnd(i) { var x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); }

  function setPrompt(text) {
    var el = document.getElementById('tool-prompt');
    if (el) el.textContent = text;
  }

  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function glassFill(ctx, x, w) {
    var g = ctx.createLinearGradient(x, 0, x + w, 0);
    g.addColorStop(0, 'rgba(150,185,215,0.35)');
    g.addColorStop(0.08, 'rgba(195,220,242,0.18)');
    g.addColorStop(0.25, 'rgba(235,248,255,0.07)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.03)');
    g.addColorStop(0.75, 'rgba(235,248,255,0.06)');
    g.addColorStop(0.92, 'rgba(195,220,242,0.15)');
    g.addColorStop(1, 'rgba(150,185,215,0.32)');
    return g;
  }

  function shadow(ctx, cx, cy, rx) {
    ctx.save();
    var g = ctx.createRadialGradient(cx, cy, 1, cx, cy, rx);
    g.addColorStop(0, 'rgba(0,0,0,0.35)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, rx * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function label(ctx, text, cx, y) {
    ctx.save();
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(235,240,250,0.72)';
    ctx.textAlign = 'center';
    ctx.fillText(text, cx, y);
    ctx.restore();
  }

  function promptRing(ctx, rect, time) {
    if (!rect) return;
    var pulse = 0.55 + 0.45 * Math.sin(time * 4);
    var cx = rect.x + rect.w / 2, cy = rect.y + rect.h / 2;
    var rx = Math.max(rect.w, rect.h) / 2 + 14;
    ctx.save();
    ctx.strokeStyle = 'rgba(255,213,79,' + (0.35 + 0.5 * pulse) + ')';
    ctx.lineWidth = 2 + pulse;
    ctx.setLineDash([7, 6]);
    ctx.lineDashOffset = -time * 22;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, rx * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,213,79,' + (0.10 * pulse) + ')';
    ctx.fill();
    ctx.restore();
  }

  /* ---------------- background ---------------- */

  function drawBackground() {
    var wall = ctx.createLinearGradient(0, 0, 0, BENCH);
    wall.addColorStop(0, '#dfe6ef');
    wall.addColorStop(0.55, '#eef2f7');
    wall.addColorStop(1, '#e2e8f1');
    ctx.fillStyle = wall;
    ctx.fillRect(0, 0, W, BENCH);

    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.lineWidth = 1;
    for (var x = 0; x <= W; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 176); ctx.stroke();
    }
    for (var y = 0; y <= 176; y += 44) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(120,140,165,0.28)';
    ctx.strokeRect(0, 0, W, 176);

    ctx.fillStyle = '#7a5a3a';
    ctx.fillRect(0, 30, W, 9);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(0, 30, W, 3);
    var bottleCols = ['#5b7fa6', '#7a6a9a', '#4f7a5b', '#a66a5b', '#5b7fa6', '#6a6a7a'];
    for (var i = 0; i < 7; i++) {
      var bx = 40 + i * 96, bh = 20 + rnd(i) * 8, bw = 16 + rnd(i + 9) * 6;
      ctx.fillStyle = bottleCols[i % bottleCols.length];
      ctx.globalAlpha = 0.55;
      rr(ctx, bx, 39 - bh, bw, bh, 3); ctx.fill();
      ctx.fillRect(bx + bw / 2 - 3, 39 - bh - 7, 6, 7);
      ctx.globalAlpha = 1;
    }

    var bench = ctx.createLinearGradient(0, BENCH, 0, H);
    bench.addColorStop(0, '#3a4048');
    bench.addColorStop(0.12, '#2c3138');
    bench.addColorStop(1, '#1b1f25');
    ctx.fillStyle = bench;
    ctx.fillRect(0, BENCH, W, H - BENCH);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(0, BENCH, W, 3);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, BENCH + 3, W, 6);

    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (var s = 0; s < 9; s++) {
      ctx.beginPath();
      ctx.moveTo(0, BENCH + 14 + s * 8);
      ctx.lineTo(W, BENCH + 14 + s * 8);
      ctx.stroke();
    }
  }

  /* ---------------- primitives ---------------- */

  function drawBeaker(cx, baseY, w, h, liq, frac, solid) {
    var x = cx - w / 2, top = baseY - h;
    shadow(ctx, cx, baseY + 3, w * 0.75);
    var liqTop = baseY - h * frac;
    if (frac > 0) {
      ctx.save();
      rr(ctx, x + 3, top + 6, w - 6, h - 8, 4);
      ctx.clip();
      var g = ctx.createLinearGradient(0, liqTop, 0, baseY);
      g.addColorStop(0, liq);
      g.addColorStop(1, liq);
      ctx.fillStyle = g;
      ctx.fillRect(x, liqTop, w, baseY - liqTop);
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.beginPath();
      ctx.ellipse(cx, liqTop, w / 2 - 3, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = glassFill(ctx, x, w);
    ctx.strokeStyle = 'rgba(70,105,145,0.6)';
    ctx.lineWidth = 2;
    rr(ctx, x, top, w, h, 5);
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x + 5, top + 10); ctx.lineTo(x + 4, baseY - 12);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(70,105,145,0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 3, top + 2); ctx.lineTo(x + w + 3, top + 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(55,85,120,0.4)';
    ctx.lineWidth = 1;
    for (var i = 1; i <= 3; i++) {
      var my = top + h * (i / 4);
      ctx.beginPath(); ctx.moveTo(x + w - 14, my); ctx.lineTo(x + w - 4, my); ctx.stroke();
    }
    if (solid) {
      ctx.fillStyle = solid;
      for (var s = 0; s < 7; s++) {
        var sx = cx - w / 2 + 12 + rnd(s) * (w - 24);
        ctx.beginPath();
        ctx.ellipse(sx, baseY - 5 - rnd(s + 3) * 4, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawTube(x, top, w, h, liq, frac) {
    var bot = top + h;
    if (frac > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bot - w / 2);
      ctx.arc(x + w / 2, bot - w / 2, w / 2, Math.PI, 0);
      ctx.lineTo(x + w, top);
      ctx.closePath();
      ctx.clip();
      var lt = bot - h * frac;
      ctx.fillStyle = liq;
      ctx.fillRect(x, lt, w, bot - lt);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.ellipse(x + w / 2, lt, w / 2 - 2, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = glassFill(ctx, x, w);
    ctx.strokeStyle = 'rgba(70,105,145,0.65)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bot - w / 2);
    ctx.arc(x + w / 2, bot - w / 2, w / 2, Math.PI, 0);
    ctx.lineTo(x + w, top);
    ctx.stroke();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + 3, top + 8); ctx.lineTo(x + 3, bot - 14); ctx.stroke();
    ctx.strokeStyle = 'rgba(70,105,145,0.65)';
    ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(x - 2, top); ctx.lineTo(x + w + 2, top); ctx.stroke();
  }

  function drawGasJar(cx, top, w, h) {
    var x = cx - w / 2;
    shadow(ctx, cx, top + h + 3, w * 0.7);
    ctx.fillStyle = glassFill(ctx, x, w);
    ctx.strokeStyle = 'rgba(70,105,145,0.6)';
    ctx.lineWidth = 2;
    rr(ctx, x, top, w, h, 4);
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x + 5, top + 12); ctx.lineTo(x + 4, top + h - 14); ctx.stroke();
    ctx.fillStyle = 'rgba(180,205,230,0.55)';
    rr(ctx, x - 4, top - 6, w + 8, 8, 3);
    ctx.fill();
    ctx.strokeStyle = 'rgba(70,105,145,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawBottle(cx, baseY, w, h, capColor, liqColor, text) {
    var x = cx - w / 2, top = baseY - h;
    shadow(ctx, cx, baseY + 3, w * 0.8);
    var neckW = w * 0.34, neckH = h * 0.2;
    ctx.fillStyle = glassFill(ctx, x, w);
    ctx.strokeStyle = 'rgba(70,105,145,0.6)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(cx - neckW / 2, top + 8);
    ctx.lineTo(cx - neckW / 2, top + neckH);
    ctx.lineTo(x + 2, top + neckH + 6);
    ctx.lineTo(x + 2, baseY - 5);
    ctx.quadraticCurveTo(x + 2, baseY, x + 8, baseY);
    ctx.lineTo(x + w - 8, baseY);
    ctx.quadraticCurveTo(x + w - 2, baseY, x + w - 2, baseY - 5);
    ctx.lineTo(x + w - 2, top + neckH + 6);
    ctx.lineTo(cx + neckW / 2, top + neckH);
    ctx.lineTo(cx + neckW / 2, top + 8);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    if (liqColor) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - neckW / 2, top + 8);
      ctx.lineTo(cx - neckW / 2, top + neckH);
      ctx.lineTo(x + 2, top + neckH + 6);
      ctx.lineTo(x + 2, baseY - 5);
      ctx.quadraticCurveTo(x + 2, baseY, x + 8, baseY);
      ctx.lineTo(x + w - 8, baseY);
      ctx.quadraticCurveTo(x + w - 2, baseY, x + w - 2, baseY - 5);
      ctx.lineTo(x + w - 2, top + neckH + 6);
      ctx.lineTo(cx + neckW / 2, top + neckH);
      ctx.lineTo(cx + neckW / 2, top + 8);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = liqColor;
      ctx.fillRect(x, top + neckH + 10, w, baseY - top - neckH - 10);
      ctx.restore();
    }
    ctx.fillStyle = capColor;
    rr(ctx, cx - neckW / 2 - 2, top, neckW + 4, 11, 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#c3c3c3';
    ctx.lineWidth = 0.6;
    var ly = baseY - 28;
    ctx.fillRect(x + 5, ly, w - 10, 20);
    ctx.strokeRect(x + 5, ly, w - 10, 20);
    ctx.fillStyle = '#2c2c2c';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, cx, ly + 13);
    ctx.textAlign = 'left';
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(x + 6, top + neckH + 12); ctx.lineTo(x + 5, baseY - 32); ctx.stroke();
  }

  function drawDropper(cx, ty, len, tilt, bulbSqueeze) {
    ctx.save();
    ctx.translate(cx, ty);
    ctx.rotate(tilt || 0);
    var bw = 16, bh = 12 + (bulbSqueeze ? -3 : 0);
    ctx.fillStyle = '#d9534f';
    ctx.beginPath();
    ctx.ellipse(0, -len - bh / 2, bw / 2, bh / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#b3423e';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(215,235,250,0.55)';
    ctx.strokeStyle = 'rgba(90,130,165,0.7)';
    ctx.lineWidth = 1.4;
    rr(ctx, -3.5, -len, 7, len, 3);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-2, 0); ctx.lineTo(0, 9); ctx.lineTo(2, 0);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawDrop(x, y, r) {
    ctx.fillStyle = 'rgba(120,185,235,0.75)';
    ctx.beginPath();
    ctx.moveTo(x, y - r * 1.4);
    ctx.quadraticCurveTo(x + r, y - r * 0.2, x, y + r);
    ctx.quadraticCurveTo(x - r, y - r * 0.2, x, y - r * 1.4);
    ctx.fill();
  }

  function drawBunsen(cx, baseY, lit, flameH, flameCol, glow) {
    shadow(ctx, cx, baseY + 3, 62);
    var g = ctx.createLinearGradient(cx - 55, 0, cx + 55, 0);
    g.addColorStop(0, '#4a4a4a'); g.addColorStop(0.4, '#8d8d8d');
    g.addColorStop(0.6, '#a8a8a8'); g.addColorStop(1, '#4a4a4a');
    ctx.fillStyle = g;
    rr(ctx, cx - 55, baseY - 12, 110, 12, 3);
    ctx.fill();
    ctx.fillStyle = g;
    rr(ctx, cx - 9, baseY - 78, 18, 68, 3);
    ctx.fill();
    ctx.fillStyle = '#5c5c5c';
    rr(ctx, cx - 12, baseY - 86, 24, 10, 2);
    ctx.fill();
    ctx.fillStyle = '#2f2f2f';
    rr(ctx, cx - 7, baseY - 104, 14, 20, 3);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(cx - 4, baseY - 76, 3, 62);

    if (lit && flameH > 1) {
      var topY = baseY - 104 - flameH;
      ctx.save();
      if (glow) {
        var gg = ctx.createRadialGradient(cx, topY + flameH * 0.5, 4, cx, topY + flameH * 0.5, flameH * 1.7);
        gg.addColorStop(0, glow);
        gg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gg;
        ctx.fillRect(cx - flameH * 2, topY - flameH, flameH * 4, flameH * 3);
      }
      var flick = 1 + Math.sin(performanceNow() * 0.02) * 0.05;
      ctx.beginPath();
      var fh = flameH * flick;
      ctx.moveTo(cx - 9, baseY - 104);
      ctx.bezierCurveTo(cx - 13, baseY - 104 - fh * 0.5, cx - 4, baseY - 104 - fh * 0.85, cx, baseY - 104 - fh);
      ctx.bezierCurveTo(cx + 4, baseY - 104 - fh * 0.85, cx + 13, baseY - 104 - fh * 0.5, cx + 9, baseY - 104);
      ctx.closePath();
      var fg = ctx.createLinearGradient(cx, baseY - 104, cx, baseY - 104 - fh);
      fg.addColorStop(0, flameCol.outer0);
      fg.addColorStop(0.55, flameCol.outer1);
      fg.addColorStop(1, flameCol.outer2);
      ctx.fillStyle = fg;
      ctx.fill();
      ctx.beginPath();
      var ih = fh * 0.55;
      ctx.moveTo(cx - 4, baseY - 104);
      ctx.bezierCurveTo(cx - 6, baseY - 104 - ih * 0.5, cx - 2, baseY - 104 - ih * 0.85, cx, baseY - 104 - ih);
      ctx.bezierCurveTo(cx + 2, baseY - 104 - ih * 0.85, cx + 6, baseY - 104 - ih * 0.5, cx + 4, baseY - 104);
      ctx.closePath();
      ctx.fillStyle = flameCol.inner;
      ctx.fill();
      ctx.restore();
    }
  }

  function drawWire(wx, wy, sampleCol) {
    ctx.save();
    ctx.strokeStyle = '#b9b9b9';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(wx + 9, wy, 9, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#9a9a9a';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(wx + 17, wy); ctx.lineTo(wx + 108, wy); ctx.stroke();
    var hg = ctx.createLinearGradient(wx + 108, wy - 7, wx + 108, wy + 7);
    hg.addColorStop(0, '#8a5a3a'); hg.addColorStop(0.5, '#b07a4f'); hg.addColorStop(1, '#6e452c');
    ctx.fillStyle = hg;
    rr(ctx, wx + 106, wy - 7, 52, 14, 6);
    ctx.fill();
    if (sampleCol) {
      ctx.fillStyle = sampleCol;
      ctx.beginPath(); ctx.arc(wx + 9, wy, 5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  function drawSplint(tipX, tipY, angle, lit) {
    ctx.save();
    ctx.translate(tipX, tipY);
    ctx.rotate(angle);
    var g = ctx.createLinearGradient(0, -3, 0, 3);
    g.addColorStop(0, '#d8b57a'); g.addColorStop(0.5, '#c9a05f'); g.addColorStop(1, '#a87f45');
    ctx.fillStyle = g;
    rr(ctx, 0, -3, 120, 6, 3);
    ctx.fill();
    ctx.fillStyle = '#3b2b1c';
    rr(ctx, -8, -3.5, 12, 7, 3);
    ctx.fill();
    if (lit) {
      var flick = 1 + Math.sin(performanceNow() * 0.02) * 0.08;
      ctx.beginPath();
      ctx.moveTo(-8, -3);
      ctx.bezierCurveTo(-16, -6 * flick, -22, -1, -20, 4);
      ctx.bezierCurveTo(-22, 10, -14, 13, -8, 8);
      ctx.closePath();
      var fg = ctx.createLinearGradient(-22, 0, -6, 0);
      fg.addColorStop(0, 'rgba(255,255,255,0.9)');
      fg.addColorStop(0.4, 'rgba(255,196,72,0.95)');
      fg.addColorStop(1, 'rgba(255,112,40,0.9)');
      ctx.fillStyle = fg;
      ctx.fill();
    }
    ctx.restore();
  }

  function drawWaftHand(cx, cy, phase, time) {
    ctx.save();
    var wob = Math.sin(time * 5) * (phase ? 5 : 0);
    ctx.translate(cx + wob, cy);
    ctx.rotate(-0.25 + (phase ? Math.sin(time * 5) * 0.1 : 0));
    ctx.fillStyle = '#e8b48c';
    ctx.strokeStyle = 'rgba(150,100,70,0.6)';
    ctx.lineWidth = 1.2;
    rr(ctx, -26, -14, 46, 30, 12);
    ctx.fill(); ctx.stroke();
    for (var f = 0; f < 4; f++) {
      rr(ctx, 16, -12 + f * 8, 26, 7, 3.5);
      ctx.fill(); ctx.stroke();
    }
    rr(ctx, -20, 12, 16, 22, 7);
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawLitmus(x, y, w, h, col, held) {
    ctx.save();
    if (held) {
      ctx.fillStyle = '#9a9a9a';
      rr(ctx, x + w - 4, y - 6, 26, h + 12, 4);
      ctx.fill();
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    var g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, col);
    g.addColorStop(1, col);
    ctx.fillStyle = g;
    rr(ctx, x, y, w, h, 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(x + 2, y + 2, w - 4, 2);
    ctx.restore();
  }

  function drawSpatula(x, y, tilt, solidCol) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt || 0);
    ctx.fillStyle = '#c9ccd2';
    ctx.strokeStyle = '#9aa0a8';
    ctx.lineWidth = 1;
    rr(ctx, -6, -4, 60, 7, 3);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-14, 0, 16, 8, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    if (solidCol) {
      ctx.fillStyle = solidCol;
      for (var i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.ellipse(-22 + rnd(i) * 16, -3 + rnd(i + 5) * 5, 3.5, 2.4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function performanceNow() {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  }

  /* ---------------- scene: flame test ---------------- */

  function flameScene() {
    var burnerCx = 360;
    var restWx = 452, restWy = 236;
    var actWx = 336, actWy = 142;
    var flameCol = meta.flameCol;

    return {
      hot: function(phase) {
        if (phase === 0) return { x: 336, y: 140, w: 50, h: 116 };
        if (phase === 2) return { x: 440, y: 218, w: 190, h: 44 };
        return null;
      },
      steps: [
        { prompt: '① Click the Bunsen barrel to turn on the gas and ignite a flame' },
        { prompt: 'Igniting a blue flame…', auto: 0.9 },
        { prompt: '② Click the platinum wire to hold the sample in the flame' },
        { prompt: 'Holding the wire in the flame — watch the colour…', auto: 2.0 },
        { prompt: '✓ Flame colour observed — test complete', auto: 0.8, finish: true }
      ],
      draw: function(time) {
        var lit = anim.phase >= 1;
        var grow = anim.phase >= 1 ? easeOut(anim.phaseT / 0.7) : 0;
        var coloured = anim.phase >= 3 && anim.phaseT > 1.1;
        var wp = anim.phase >= 3 ? easeOut(anim.phaseT / 0.7) : 0;
        var wx = lerp(restWx, actWx, wp), wy = lerp(restWy, actWy, wp);

        drawBunsen(burnerCx, BENCH, lit, 74 * grow, flameCol.base, coloured ? flameCol.glow : null);
        drawWire(wx, wy, anim.phase >= 3 && anim.phaseT > 1.1 ? flameCol.sampleDot : null);

        if (coloured) {
          var halo = ctx.createRadialGradient(burnerCx, 130, 6, burnerCx, 130, 90);
          halo.addColorStop(0, flameCol.glow);
          halo.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = halo;
          ctx.fillRect(burnerCx - 100, 30, 200, 200);
        }

        label(ctx, 'Bunsen burner', burnerCx, BENCH + 18);
        label(ctx, 'Platinum wire loop', 530, BENCH + 18);
        if (anim.phase >= 3 && anim.phaseT > 1.1) {
          ctx.save();
          ctx.font = 'bold 13px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = flameCol.badge;
          rr(ctx, burnerCx - 86, 44, 172, 30, 8);
          ctx.fill();
          ctx.fillStyle = '#16181d';
          ctx.fillText(meta.flameBadge, burnerCx, 64);
          ctx.restore();
        }
      }
    };
  }

  /* ---------------- scene: burning splint ---------------- */

  function splintScene() {
    var burnerCx = 150, jarCx = 500;
    var restTip = { x: 300, y: 236, a: 0 };
    var litTip = { x: 196, y: 150, a: -0.5 };
    var jarTip = { x: 470, y: 170, a: 0.35 };

    function tipAt() {
      if (anim.phase <= 1) {
        var p = anim.phase === 1 ? easeOut(anim.phaseT / 0.8) : 0;
        return { x: lerp(restTip.x, litTip.x, p), y: lerp(restTip.y, litTip.y, p), a: lerp(restTip.a, litTip.a, p) };
      }
      var q = anim.phase >= 3 ? easeOut(anim.phaseT / 0.8) : 0;
      return { x: lerp(litTip.x, jarTip.x, q), y: lerp(litTip.y, jarTip.y, q), a: lerp(litTip.a, jarTip.a, q) };
    }

    return {
      hot: function(phase) {
        if (phase === 0) return { x: 250, y: 214, w: 190, h: 44 };
        if (phase === 2) return { x: jarCx - 65, y: 100, w: 130, h: 156 };
        return null;
      },
      steps: [
        { prompt: '① Click the splint to light it in the Bunsen flame' },
        { prompt: 'Lighting the splint…', auto: 1.0 },
        { prompt: '② Click the gas jar to insert the burning splint' },
        { prompt: 'Inserting the splint…', auto: 1.9 },
        { prompt: '✓ Splint extinguished — the gas does not support combustion', auto: 0.8, finish: true }
      ],
      draw: function(time) {
        drawBunsen(burnerCx, BENCH, true, 70, BLUE_FLAME, null);
        label(ctx, 'Bunsen burner', burnerCx, BENCH + 18);

        drawGasJar(jarCx, 108, 116, 146);
        label(ctx, 'Gas jar', jarCx, BENCH + 18);

        var t = tipAt();
        var inJar = anim.phase >= 3 && anim.phaseT > 0.9;
        var out = anim.phase >= 4;
        var extinguished = inJar && anim.phaseT > 1.25;
        drawSplint(t.x, t.y, t.a, !extinguished);

        if (extinguished && anim.phaseT < 1.9) {
          ctx.save();
          ctx.globalAlpha = clamp01(1.9 - anim.phaseT) * 0.7;
          ctx.fillStyle = '#c9ccd2';
          for (var i = 0; i < 5; i++) {
            var px = jarCx - 30 + rnd(i) * 60;
            var py = 160 - (anim.phaseT - 1.25) * 40 - rnd(i + 2) * 18;
            ctx.beginPath();
            ctx.arc(px, py, 5 + rnd(i + 4) * 6, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        if (out || (inJar && extinguished)) {
          ctx.save();
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(214,69,69,0.92)';
          rr(ctx, jarCx - 96, 60, 192, 28, 8);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.fillText('Flame extinguished', jarCx, 79);
          ctx.restore();
        }

        if (inJar) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255,160,60,0.85)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(t.x - 8, t.y);
          ctx.lineTo(t.x - 26, t.y - 16);
          ctx.stroke();
          ctx.restore();
        }
      }
    };
  }

  /* ---------------- scene: test tube + reagent ---------------- */

  function tubeScene() {
    var tubeX = [300, 370, 440];
    var midX = tubeX[1];
    var bottleCx = 596;
    var rx = meta.reaction;

    return {
      hot: function(phase) {
        if (phase === 0) return { x: bottleCx - 48, y: 128, w: 96, h: 130 };
        if (phase === 2) return { x: midX - 26, y: 140, w: 56, h: 112 };
        return null;
      },
      steps: [
        { prompt: '① Click the reagent bottle to draw up the reagent' },
        { prompt: 'Reagent ready…', auto: 0.9 },
        { prompt: '② Click the middle test tube to add the reagent' },
        { prompt: 'Adding reagent — watch for a reaction…', auto: 2.6 },
        { prompt: '✓ Observation recorded — test complete', auto: 0.8, finish: true }
      ],
      draw: function(time) {
        var rx0 = 262, rw = 216;
        var rg = ctx.createLinearGradient(rx0, 0, rx0 + rw, 0);
        rg.addColorStop(0, '#8a6136'); rg.addColorStop(0.5, '#a97a45'); rg.addColorStop(1, '#77512e');
        ctx.fillStyle = rg;
        rr(ctx, rx0, 240, rw, 14, 3); ctx.fill();
        ctx.fillStyle = rg;
        rr(ctx, rx0 + 8, 150, 14, 96, 3); ctx.fill();
        rr(ctx, rx0 + rw - 22, 150, 14, 96, 3); ctx.fill();
        rr(ctx, rx0 + 8, 168, rw - 16, 10, 2); ctx.fill();

        var liq = meta.sampleLiq;
        var frac = 0.42;
        var midPpt = null, midPptFrac = 0, extraCol = null, blueFade = 1;

        if (anim.phase >= 3) {
          var t = anim.phaseT;
          if (rx === 'displace') {
            var q = clamp01((t - 1.1) / 1.4);
            blueFade = 1 - q * 0.75;
            midPpt = 'rgba(150,74,42,' + (0.55 + 0.4 * clamp01((t - 1.3) / 1.0)) + ')';
            midPptFrac = 0.18;
            extraCol = q > 0.5 ? 'rgba(120,90,60,0.5)' : null;
          } else if (rx === 'paleblue') {
            var p = clamp01((t - 1.0) / 1.2);
            midPpt = 'rgba(147,197,253,' + (0.35 + 0.5 * p) + ')';
            midPptFrac = 0.30 * p;
          } else if (rx === 'deepblue') {
            var p1 = clamp01((t - 0.9) / 0.9);
            var p2 = clamp01((t - 1.7) / 0.9);
            midPpt = 'rgba(147,197,253,' + (0.4 + 0.45 * p1) * (1 - p2) + ')';
            midPptFrac = 0.28 * p1 * (1 - p2);
            if (p2 > 0) extraCol = 'rgba(25,70,190,' + (0.55 * p2) + ')';
          } else {
            var p3 = clamp01((t - 1.0) / 1.2);
            midPpt = 'rgba(245,245,245,' + (0.5 + 0.45 * p3) + ')';
            midPptFrac = 0.30 * p3;
          }
        }

        for (var i = 0; i < 3; i++) {
          var tx = tubeX[i] - 17;
          var isMid = i === 1;
          var top = 152, h = 96;
          var col = isMid ? liq : 'rgba(210,235,245,0.22)';
          drawTube(tx, top, 34, h, col, frac);
          if (isMid && blueFade < 1) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(tx, top);
            ctx.lineTo(tx, top + h - 17);
            ctx.arc(tx + 17, top + h - 17, 17, Math.PI, 0);
            ctx.lineTo(tx + 34, top);
            ctx.closePath();
            ctx.clip();
            var ltop = (top + h) - h * frac;
            ctx.fillStyle = 'rgba(196,216,232,' + ((1 - blueFade) * 0.85) + ')';
            ctx.fillRect(tx, ltop, 34, (top + h) - ltop);
            ctx.restore();
          }
          if (isMid && midPpt) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(tx, top);
            ctx.lineTo(tx, top + h - 17);
            ctx.arc(tx + 17, top + h - 17, 17, Math.PI, 0);
            ctx.lineTo(tx + 34, top);
            ctx.closePath();
            ctx.clip();
            var bot = top + h;
            var pf = bot - h * midPptFrac;
            ctx.fillStyle = midPpt;
            ctx.fillRect(tx, pf, 34, bot - pf);
            if (rx === 'displace') {
              ctx.fillStyle = 'rgba(140,70,40,0.85)';
              for (var s = 0; s < 8; s++) {
                ctx.beginPath();
                ctx.arc(tx + 5 + rnd(s) * 24, bot - 4 - rnd(s + 3) * 8, 2.6, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            ctx.restore();
          }
          if (isMid && extraCol) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(tx, top);
            ctx.lineTo(tx, top + h - 17);
            ctx.arc(tx + 17, top + h - 17, 17, Math.PI, 0);
            ctx.lineTo(tx + 34, top);
            ctx.closePath();
            ctx.clip();
            ctx.fillStyle = extraCol;
            ctx.fillRect(tx, top + h - 46, 34, 46);
            ctx.restore();
          }
        }
        label(ctx, 'Test tube rack', 370, BENCH + 18);

        drawBottle(bottleCx, BENCH, 68, 112, '#3f6fb4', 'rgba(120,175,225,0.5)', meta.reagentLabel);
        label(ctx, 'Reagent', bottleCx, BENCH + 18);

        if (anim.phase >= 1) {
          var dp = anim.phase >= 2 ? 1 : easeOut(anim.phaseT / 0.7);
          var dx = lerp(bottleCx, midX, dp);
          var dy = lerp(150, 128, dp);
          drawDropper(dx, dy, 46, 0, anim.phase >= 3 && (anim.phaseT % 0.35) < 0.12);
          if (anim.phase === 3 && anim.phaseT < 1.0) {
            for (var d = 0; d < 3; d++) {
              var dt = ((anim.phaseT - 0.15 - d * 0.22) / 0.5);
              if (dt > 0 && dt < 1) {
                drawDrop(midX, lerp(146, 208, dt), 4);
              }
            }
          }
        }
      }
    };
  }

  /* ---------------- scene: beaker family ---------------- */

  function beakerScene() {
    var sub = meta.sub;
    var beakerCx = 330, baseY = BENCH;
    var spatX = 150, spatY = 232;
    var washCx = 560;

    return {
      hot: function(phase) {
        if (sub === 'dissolve' || sub === 'solubility') {
          if (phase === 0) return { x: 84, y: 200, w: 150, h: 56 };
          if (phase === 2) return sub === 'dissolve'
            ? { x: washCx - 50, y: 130, w: 100, h: 126 }
            : { x: beakerCx - 78, y: 116, w: 156, h: 140 };
          return null;
        }
        if (sub === 'appearance') {
          if (phase === 0) return { x: beakerCx - 78, y: 116, w: 156, h: 140 };
          return null;
        }
        if (sub === 'smell') {
          if (phase === 0) return { x: 470, y: 150, w: 190, h: 110 };
          return null;
        }
        if (phase === 0) return { x: beakerCx - 78, y: 116, w: 156, h: 140 };
        return null;
      },
      steps: sub === 'dissolve' ? [
        { prompt: '① Click the spatula to tip the powder into the beaker' },
        { prompt: 'Powder added…', auto: 0.9 },
        { prompt: '② Click the wash bottle to add distilled water' },
        { prompt: 'Adding water and stirring — the powder is dissolving…', auto: 2.4 },
        { prompt: '✓ Powder dissolved — test complete', auto: 0.8, finish: true }
      ] : sub === 'solubility' ? [
        { prompt: '① Click the spatula to drop the solid into the water' },
        { prompt: 'Solid added…', auto: 0.9 },
        { prompt: '② Click the beaker to stir the mixture' },
        { prompt: 'Stirring… watching whether the solid dissolves…', auto: 2.4 },
        { prompt: '✓ Result recorded — test complete', auto: 0.8, finish: true }
      ] : sub === 'appearance' ? [
        { prompt: '① Click the beaker to lift the sample against the light' },
        { prompt: 'Observing the colour…', auto: 1.5 },
        { prompt: '✓ Colour observed — test complete', auto: 0.8, finish: true }
      ] : sub === 'smell' ? [
        { prompt: meta.isGas ? '① Click your hand to waft the gas towards you' : '① Click your hand to waft the sample towards you' },
        { prompt: 'Wafting gently — never inhale directly…', auto: 1.8 },
        { prompt: '✓ Odour noted — test complete', auto: 0.8, finish: true }
      ] : [
        { prompt: '① Click the apparatus to carry out the test' },
        { prompt: 'Observing…', auto: 1.4 },
        { prompt: '✓ Test complete', auto: 0.8, finish: true }
      ],
      draw: function(time) {
        var liq = meta.sampleLiq;
        var solidCol = meta.solidCol;
        var powderIn = anim.phase >= 1;
        var water = anim.phase >= 3 || (anim.phase === 2 && sub === 'solubility');
        var stirred = anim.phase >= 3;
        var lift = anim.phase >= 1 && sub === 'appearance' ? easeOut(anim.phaseT / 0.8) : 0;
        var waft = anim.phase >= 1;

        if (sub === 'smell' && meta.isGas) {
          drawGasJar(beakerCx, 112, 128, 142);
          label(ctx, 'Gas jar', beakerCx, BENCH + 18);
          if (waft) drawAroma(beakerCx, 108, time, 'rgba(120,150,190,0.55)');
          drawWaftHand(540, 196, waft, time);
          label(ctx, 'Wafting', 540, BENCH + 18);
          return;
        }

        var drawY = BENCH - lift * 14;
        if (lift > 0) {
          ctx.save();
          ctx.globalAlpha = 0.25 * lift;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.ellipse(beakerCx, 90, 120, 46, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        if (sub === 'dissolve') {
          drawSpatula(spatX, spatY, powderIn ? -0.9 : -0.1, powderIn ? null : '#f2f2f2');
          label(ctx, 'Sample spatula', spatX + 20, BENCH + 18);
          var heap = powderIn ? (stirred ? clamp01(1 - (anim.phaseT / 1.6)) : 1) : 0;
          drawBeaker(beakerCx, drawY, 150, 140, 'rgba(205,232,245,0.30)',
            anim.phase >= 3 ? 0.62 : 0.0, null);
          if (heap > 0.02) {
            ctx.fillStyle = 'rgba(248,248,248,' + (0.9 * heap) + ')';
            for (var i = 0; i < 8; i++) {
              ctx.beginPath();
              ctx.ellipse(beakerCx - 40 + rnd(i) * 80, drawY - 6 - rnd(i + 4) * 5 * heap, 7 * heap, 4 * heap, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          if (anim.phase === 3) {
            var sw = clamp01(anim.phaseT / 1.8);
            ctx.save();
            ctx.strokeStyle = 'rgba(255,255,255,' + (0.5 * (1 - sw * 0.5)) + ')';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(beakerCx, drawY - 40, 46 * sw + 6, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          drawWashBottle(washCx, BENCH, anim.phase >= 2);
          label(ctx, 'Wash bottle (distilled water)', washCx, BENCH + 18);
        } else if (sub === 'solubility') {
          drawBeaker(beakerCx, drawY, 150, 140, 'rgba(205,232,245,0.30)', 0.6, null);
          if (powderIn || anim.phase >= 1) {
            ctx.fillStyle = '#f5f5f5';
            for (var s = 0; s < 9; s++) {
              var settled = anim.phase >= 2 ? 1 : clamp01(anim.phaseT / 0.7);
              var sx = beakerCx - 44 + rnd(s) * 88;
              var sy = lerp(drawY - 70 - rnd(s + 2) * 30, drawY - 8 - rnd(s + 3) * 5, settled);
              ctx.beginPath();
              ctx.ellipse(sx, sy, 5, 3.4, 0, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            drawSpatula(spatX, spatY, -0.1, '#f2f2f2');
          }
          label(ctx, 'Sample spatula', spatX + 20, BENCH + 18);
          if (stirred) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255,255,255,0.45)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(beakerCx, drawY - 44, 50, 9, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        } else if (sub === 'appearance') {
          drawBeaker(beakerCx, drawY, 150, 140, liq, 0.6, null);
          if (lift > 0) {
            ctx.save();
            ctx.globalAlpha = 0.5 * lift;
            ctx.fillStyle = liq;
            ctx.beginPath();
            ctx.ellipse(beakerCx, drawY - 56, 58, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        } else {
          drawBeaker(beakerCx, drawY, 150, 140, liq, meta.solid ? 0.0 : 0.55, meta.solid ? '#f2f2f2' : null);
          if (waft) drawAroma(beakerCx, drawY - 120, time, meta.solid ? 'rgba(210,210,210,0.5)' : 'rgba(140,170,205,0.5)');
          drawWaftHand(540, 196, waft, time);
          label(ctx, 'Waft gently', 540, BENCH + 18);
        }
        if (sub !== 'smell') label(ctx, 'Beaker', beakerCx, BENCH + 18);
      }
    };
  }

  function drawAroma(x, y, time, col) {
    ctx.save();
    ctx.strokeStyle = col;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    for (var i = 0; i < 3; i++) {
      var ph = (time * 0.9 + i * 0.33) % 1;
      ctx.globalAlpha = clamp01(ph * 2) * clamp01(2 - ph * 2) * 0.9;
      ctx.beginPath();
      var sx = x - 24 + i * 24;
      ctx.moveTo(sx, y);
      ctx.bezierCurveTo(sx + 12, y - 26 - ph * 20, sx - 12, y - 50 - ph * 26, sx + 8, y - 78 - ph * 30);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawWashBottle(cx, baseY, tipped) {
    ctx.save();
    ctx.translate(cx, baseY);
    ctx.rotate(tipped ? -0.55 : 0);
    ctx.translate(-cx, -baseY);
    var x = cx - 34, top = baseY - 118;
    ctx.fillStyle = 'rgba(235,240,248,0.75)';
    ctx.strokeStyle = 'rgba(140,160,185,0.8)';
    ctx.lineWidth = 1.6;
    rr(ctx, x, top, 68, 118, 10);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(190,225,245,0.55)';
    rr(ctx, x + 5, top + 44, 58, 68, 8);
    ctx.fill();
    ctx.fillStyle = '#cfd6e0';
    rr(ctx, cx - 12, top - 18, 24, 22, 4);
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(160,180,205,0.9)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx, top - 16);
    ctx.quadraticCurveTo(cx - 46, top - 30, cx - 58, top + 24);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('H₂O', cx, baseY - 30);
    ctx.textAlign = 'left';
    ctx.restore();
  }

  /* ---------------- scene: limewater / conc. HCl ---------------- */

  function bottleScene() {
    var jarCx = 220, tubeCx = 520;
    var isLime = meta.sub === 'limewater';

    return {
      hot: function(phase) {
        if (phase !== 0) return null;
        if (isLime) return { x: jarCx - 70, y: 96, w: 140, h: 160 };
        return { x: tubeCx - 60, y: 128, w: 120, h: 128 };
      },
      steps: isLime ? [
        { prompt: '① Click the gas jar to bubble the gas through the limewater' },
        { prompt: 'Bubbling the gas through limewater…', auto: 2.6 },
        { prompt: '✓ Limewater turned milky — test complete', auto: 0.9, finish: true }
      ] : [
        { prompt: '① Click the glass rod dipped in concentrated HCl to hold it near the jar' },
        { prompt: 'Dense white fumes forming…', auto: 2.2 },
        { prompt: '✓ White fumes produced — test complete', auto: 0.9, finish: true }
      ],
      draw: function(time) {
        drawGasJar(jarCx, 104, 124, 150);
        label(ctx, 'Gas jar', jarCx, BENCH + 18);

        if (isLime) {
          var milky = anim.phase >= 1 ? easeOut((anim.phaseT - 1.0) / 1.3) : 0;
          milky = clamp01(milky);
          var tubeTop = 150;
          ctx.save();
          ctx.strokeStyle = 'rgba(90,125,160,0.85)';
          ctx.lineWidth = 7;
          ctx.beginPath();
          ctx.moveTo(jarCx + 62, 176);
          ctx.bezierCurveTo(jarCx + 130, 176, tubeCx - 120, 150, tubeCx - 17, tubeTop + 24);
          ctx.stroke();
          ctx.strokeStyle = 'rgba(200,225,245,0.5)';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.restore();

          var liqBase = 'rgba(226,240,247,';
          drawTube(tubeCx - 17, tubeTop, 34, 100,
            milky > 0.02
              ? mixRgba(liqBase + '0.85)', 'rgba(248,250,252,0.95)', milky)
              : 'rgba(226,240,247,0.55)', 0.55);
          if (milky > 0.1) {
            ctx.fillStyle = 'rgba(255,255,255,' + (0.45 * milky) + ')';
            for (var p = 0; p < 10; p++) {
              ctx.beginPath();
              ctx.arc(tubeCx - 10 + rnd(p) * 20, tubeTop + 62 + rnd(p + 4) * 34, 2.5 + rnd(p + 7) * 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          label(ctx, 'Limewater', tubeCx, BENCH + 18);

          if (anim.phase === 1) {
            for (var b = 0; b < 6; b++) {
              var t = ((anim.phaseT * 1.4 + b * 0.17) % 1);
              var bx = jarCx + 62 + t * (tubeCx - 17 - jarCx - 62);
              var by = 176 - t * 26 - Math.sin(t * Math.PI) * 6;
              if (t > 0.72) {
                var tt = (t - 0.72) / 0.28;
                bx = tubeCx - 17 + 0;
                by = lerp(tubeTop + 40, tubeTop + 14, tt);
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.beginPath();
                ctx.arc(tubeCx - 6 + rnd(b) * 14, by, 3, 0, Math.PI * 2);
                ctx.fill();
              } else {
                ctx.fillStyle = 'rgba(210,235,250,0.75)';
                ctx.beginPath();
                ctx.arc(bx, by, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.85)';
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
            ctx.save();
            ctx.fillStyle = 'rgba(210,235,250,0.8)';
            for (var g = 0; g < 5; g++) {
              var gy = 236 - ((anim.phaseT * 46 + g * 22) % 110);
              ctx.beginPath();
              ctx.arc(jarCx - 24 + rnd(g) * 48, gy, 3.2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }

          if (anim.phase >= 2) {
            ctx.save();
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(255,255,255,0.95)';
            rr(ctx, tubeCx - 84, 96, 168, 28, 8);
            ctx.fill();
            ctx.strokeStyle = 'rgba(45,120,60,0.7)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#256b37';
            ctx.fillText('Limewater → milky', tubeCx, 115);
            ctx.restore();
          }
        } else {
          drawBottle(tubeCx, BENCH, 70, 116, '#8a3f3f', 'rgba(225,235,245,0.45)', 'Conc. HCl');
          label(ctx, 'Concentrated HCl', tubeCx, BENCH + 18);

          var move = anim.phase >= 1 ? easeOut(anim.phaseT / 0.7) : 0;
          var rodX = lerp(tubeCx - 40, jarCx + 78, move);
          var rodY = lerp(170, 140, move);
          ctx.save();
          ctx.translate(rodX, rodY);
          ctx.rotate(lerp(0.6, -0.35, move));
          var gg = ctx.createLinearGradient(0, -4, 0, 4);
          gg.addColorStop(0, 'rgba(200,225,245,0.7)');
          gg.addColorStop(0.5, 'rgba(255,255,255,0.4)');
          gg.addColorStop(1, 'rgba(200,225,245,0.6)');
          ctx.fillStyle = gg;
          ctx.strokeStyle = 'rgba(90,130,165,0.8)';
          ctx.lineWidth = 1.2;
          rr(ctx, -96, -4, 96, 8, 4);
          ctx.fill(); ctx.stroke();
          ctx.restore();

          if (anim.phase >= 1) {
            var ft = anim.phaseT;
            ctx.save();
            for (var f = 0; f < 14; f++) {
              var age = (ft * 0.8 + rnd(f)) % 1;
              var fx = lerp(rodX - 6, jarCx + 30, age) + (rnd(f + 3) - 0.5) * 34;
              var fy = lerp(rodY, 120, age) + (rnd(f + 6) - 0.5) * 40;
              ctx.globalAlpha = clamp01(age * 3) * clamp01(3 - age * 3) * 0.85;
              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(fx, fy, 7 + rnd(f + 9) * 9, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }

          if (anim.phase >= 2) {
            ctx.save();
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(255,255,255,0.95)';
            rr(ctx, jarCx - 92, 56, 184, 28, 8);
            ctx.fill();
            ctx.strokeStyle = 'rgba(90,90,90,0.7)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#333';
            ctx.fillText('Dense white fumes', jarCx, 75);
            ctx.restore();
          }
        }
      }
    };
  }

  function mixRgba(a, b, t) {
    t = clamp01(t);
    return t < 0.5 ? a : b;
  }

  /* ---------------- scene: litmus ---------------- */

  function litmusScene() {
    var srcCx = 300;
    var RED = '#d84a4a', BLUE = '#3f7fd4';
    var redFinal = meta.redFinal || RED;
    var blueFinal = meta.blueFinal || BLUE;

    return {
      hot: function(phase) {
        if (phase === 0) return { x: 430, y: 122, w: 170, h: 84 };
        return null;
      },
      steps: [
        { prompt: '① Click the litmus papers to hold them near the sample' },
        { prompt: 'Watching for a colour change…', auto: 1.9 },
        { prompt: '✓ Litmus result observed — test complete', auto: 0.9, finish: true }
      ],
      draw: function(time) {
        if (meta.isGas) {
          drawGasJar(srcCx, 106, 124, 148);
          label(ctx, 'Gas jar', srcCx, BENCH + 18);
        } else {
          drawBeaker(srcCx, BENCH, 148, 140, meta.sampleLiq, 0.55, null);
          label(ctx, 'Sample solution', srcCx, BENCH + 18);
        }

        var p = anim.phase >= 1 ? easeOut(anim.phaseT / 0.8) : 0;
        var colourP = anim.phase >= 1 ? clamp01((anim.phaseT - 0.9) / 0.7) : 0;
        var shift = lerp(0, -54, p);
        var rx = 486 + shift;

        drawLitmus(rx, 130, 96, 16, colourP > 0.5 ? redFinal : RED, true);
        drawLitmus(rx, 158, 96, 16, colourP > 0.5 ? blueFinal : BLUE, true);
        label(ctx, 'Litmus papers', rx + 48, BENCH + 18);

        ctx.save();
        ctx.font = '9px sans-serif';
        ctx.fillStyle = 'rgba(30,30,30,0.75)';
        ctx.fillText('red', rx + 104, 142);
        ctx.fillText('blue', rx + 104, 170);
        ctx.restore();

        if (anim.phase >= 2) {
          var msg = 'No colour change';
          if (redFinal !== RED || blueFinal !== BLUE) {
            msg = (redFinal !== RED) ? 'Red litmus → blue' : 'Blue litmus → red';
          }
          ctx.save();
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(255,255,255,0.95)';
          rr(ctx, srcCx - 96, 52, 192, 28, 8);
          ctx.fill();
          ctx.strokeStyle = (redFinal !== RED || blueFinal !== BLUE) ? 'rgba(45,110,190,0.7)' : 'rgba(120,120,120,0.7)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = '#243b57';
          ctx.fillText(msg, srcCx, 71);
          ctx.restore();
        }
      }
    };
  }

  /* ---------------- scene: sublimation / residue ---------------- */

  function funnelScene() {
    var cx = 330;
    var isResidue = meta.sub === 'residue';

    return {
      hot: function(phase) {
        if (phase !== 0) return null;
        if (isResidue) return { x: cx - 78, y: 158, w: 156, h: 74 };
        return { x: cx - 66, y: 150, w: 132, h: 106 };
      },
      steps: isResidue ? [
        { prompt: '① Click the evaporating dish to examine the residue' },
        { prompt: 'Examining the residue…', auto: 1.6 },
        { prompt: '✓ Gritty residue identified — test complete', auto: 0.9, finish: true }
      ] : [
        { prompt: '① Click the Bunsen to heat the dish gently' },
        { prompt: 'Heating — vapour rising, crystals depositing on the funnel…', auto: 3.0 },
        { prompt: '✓ White sublimate collected — test complete', auto: 0.9, finish: true }
      ],
      draw: function(time) {
        var heated = !isResidue && anim.phase >= 1;
        var heatP = heated ? easeOut(anim.phaseT / 1.4) : 0;
        var deposit = heated ? clamp01((anim.phaseT - 1.2) / 1.5) : 0;
        var examining = isResidue && anim.phase >= 1;

        ctx.save();
        ctx.strokeStyle = '#7d838d';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx - 62, BENCH); ctx.lineTo(cx - 40, 214);
        ctx.moveTo(cx + 62, BENCH); ctx.lineTo(cx + 40, 214);
        ctx.moveTo(cx, BENCH); ctx.lineTo(cx, 226);
        ctx.stroke();
        ctx.fillStyle = '#6a7078';
        rr(ctx, cx - 66, 206, 132, 9, 3);
        ctx.fill();
        ctx.fillStyle = 'rgba(150,160,175,0.9)';
        ctx.fillRect(cx - 56, 202, 112, 5);
        ctx.restore();

        drawBunsen(cx, BENCH, heated, 60 * heatP, BLUE_FLAME, null);
        if (heated) {
          ctx.save();
          ctx.globalAlpha = 0.5 * heatP;
          var hg = ctx.createRadialGradient(cx, 190, 5, cx, 190, 80);
          hg.addColorStop(0, 'rgba(255,170,60,0.5)');
          hg.addColorStop(1, 'rgba(255,170,60,0)');
          ctx.fillStyle = hg;
          ctx.fillRect(cx - 90, 110, 180, 160);
          ctx.restore();
        }
        label(ctx, 'Bunsen burner', cx, BENCH + 18);

        ctx.save();
        var dg = ctx.createLinearGradient(cx - 58, 0, cx + 58, 0);
        dg.addColorStop(0, '#9aa0a8'); dg.addColorStop(0.5, '#d7dce2'); dg.addColorStop(1, '#8f959d');
        ctx.fillStyle = dg;
        ctx.strokeStyle = 'rgba(80,88,98,0.8)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(cx, 186, 58, 15, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, 178, 58, 15, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#e9edf2';
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, 178, 50, 11, 0, 0, Math.PI * 2);
        ctx.fillStyle = examining ? '#7d7466' : 'rgba(232,232,232,0.9)';
        ctx.fill();
        ctx.restore();

        if (isResidue) {
          if (examining) {
            ctx.fillStyle = '#8a8172';
            for (var i = 0; i < 14; i++) {
              ctx.beginPath();
              ctx.ellipse(cx - 34 + rnd(i) * 68, 174 + rnd(i + 4) * 8, 4 + rnd(i + 8) * 3, 3, rnd(i) * 3, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx + 132, 150, 62, 0, Math.PI * 2);
            ctx.clip();
            ctx.fillStyle = '#f2f4f7';
            ctx.fillRect(cx + 70, 88, 124, 124);
            ctx.fillStyle = '#7a7264';
            for (var z = 0; z < 26; z++) {
              ctx.beginPath();
              ctx.ellipse(cx + 86 + rnd(z) * 92, 104 + rnd(z + 6) * 92, 4 + rnd(z + 3) * 4, 3 + rnd(z + 9) * 3, rnd(z) * 3, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
            ctx.save();
            ctx.strokeStyle = 'rgba(60,66,76,0.8)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(cx + 132, 150, 62, 0, Math.PI * 2);
            ctx.stroke();
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#3b414b';
            ctx.textAlign = 'center';
            ctx.fillText('×20 view — gritty residue', cx + 132, 228);
            ctx.textAlign = 'left';
            ctx.restore();
          }
          label(ctx, 'Evaporating dish', cx - 90, 240);
        } else {
          ctx.save();
          ctx.fillStyle = 'rgba(225,230,238,0.5)';
          ctx.strokeStyle = 'rgba(95,125,160,0.75)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - 62, 172);
          ctx.lineTo(cx - 22, 116);
          ctx.lineTo(cx + 22, 116);
          ctx.lineTo(cx + 62, 172);
          ctx.closePath();
          ctx.fill(); ctx.stroke();
          ctx.fillStyle = 'rgba(225,230,238,0.55)';
          rr(ctx, cx - 20, 86, 40, 32, 3);
          ctx.fill(); ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(cx, 172, 62, 13, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245,247,250,0.9)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(95,125,160,0.7)';
          ctx.stroke();

          if (deposit > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(cx - 62, 172);
            ctx.lineTo(cx - 22, 116);
            ctx.lineTo(cx + 22, 116);
            ctx.lineTo(cx + 62, 172);
            ctx.closePath();
            ctx.clip();
            ctx.fillStyle = 'rgba(255,255,255,' + (0.55 + 0.4 * deposit) + ')';
            for (var d = 0; d < 30; d++) {
              var dp = clamp01(deposit * 1.3 - rnd(d) * 0.3);
              if (dp <= 0) continue;
              var px = cx - 58 + rnd(d) * 116;
              var py = 168 - rnd(d + 5) * 46;
              ctx.beginPath();
              ctx.arc(px, py, 2 + rnd(d + 7) * 3 * dp, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }

          if (heated) {
            for (var v = 0; v < 8; v++) {
              var vt = ((anim.phaseT * 0.55 + v * 0.14) % 1);
              ctx.save();
              ctx.globalAlpha = clamp01(vt * 3) * clamp01(3.2 - vt * 3.2) * 0.55;
              ctx.fillStyle = '#ffffff';
              var vy = lerp(172, 108, vt);
              ctx.beginPath();
              ctx.arc(cx - 24 + rnd(v) * 48 + Math.sin(vt * 6 + v) * 8, vy, 6 + vt * 8, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
          label(ctx, 'Inverted funnel + filter paper', cx, 74);
        }
      }
    };
  }

  var BLUE_FLAME = {
    base: { outer0: 'rgba(40,90,200,0.85)', outer1: 'rgba(90,160,255,0.75)', outer2: 'rgba(150,210,255,0.35)', inner: 'rgba(230,245,255,0.9)' },
    glow: 'rgba(80,150,255,0.25)',
    sampleDot: null,
    badge: ''
  };

  /* ---------------- meta + scene factory ---------------- */

  function buildMeta(test, o) {
    var obs = test.observation || '';
    var desc = test.description || '';
    var id = test.id || '';
    var type = o.type || 'beaker';
    var sub = 'generic';
    var RED = '#d84a4a', BLUE = '#3f7fd4', RED_TO = '#3f7fd4', BLUE_TO = '#d84a4a';
    var metaRedFinal = RED, metaBlueFinal = BLUE;

    var flameCol = {
      base: { outer0: 'rgba(40,90,200,0.85)', outer1: 'rgba(90,160,255,0.75)', outer2: 'rgba(150,210,255,0.35)', inner: 'rgba(230,245,255,0.9)' },
      glow: 'rgba(80,150,255,0.25)',
      sampleDot: null,
      badge: ''
    };
    if (type === 'flame') {
      if (/yellow/i.test(obs)) {
        flameCol = {
          base: { outer0: 'rgba(255,176,32,0.92)', outer1: 'rgba(255,224,84,0.95)', outer2: 'rgba(255,245,180,0.55)', inner: 'rgba(255,255,240,0.95)' },
          glow: 'rgba(255,205,60,0.35)',
          sampleDot: '#ffca28',
          badge: 'Intense yellow flame'
        };
      } else if (/blue-green|emerald|blue green/i.test(obs)) {
        flameCol = {
          base: { outer0: 'rgba(20,170,140,0.9)', outer1: 'rgba(70,230,190,0.9)', outer2: 'rgba(160,255,225,0.5)', inner: 'rgba(240,255,250,0.95)' },
          glow: 'rgba(60,225,185,0.35)',
          sampleDot: '#2ec4b6',
          badge: 'Blue-green flame'
        };
      }
    }

    if (type === 'testtube') {
      if (/brown/i.test(obs)) sub = 'displace';
      else if (/deep blue/i.test(obs)) sub = 'deepblue';
      else if (/pale blue/i.test(obs)) sub = 'paleblue';
      else if (/white/i.test(obs)) sub = 'whiteppt';
      else sub = 'generic';
    }
    if (type === 'beaker') {
      if (id.indexOf('dissolve') !== -1) sub = 'dissolve';
      else if (id.indexOf('solub') !== -1) sub = 'solubility';
      else if (id.indexOf('appearance') !== -1) sub = 'appearance';
      else if (id.indexOf('smell') !== -1) sub = 'smell';
    }
    if (type === 'bottle') sub = id.indexOf('limewater') !== -1 ? 'limewater' : 'hcl';
    if (type === 'funnel') sub = id.indexOf('residue') !== -1 ? 'residue' : 'sublimation';

    var reagentLabel = 'Reagent';
    if (id.indexOf('silver') !== -1) reagentLabel = 'AgNO₃';
    else if (id.indexOf('naoh') !== -1) reagentLabel = 'NaOH';
    else if (id.indexOf('nh3') !== -1) reagentLabel = 'NH₃ (aq)';
    else if (id.indexOf('displace') !== -1) reagentLabel = 'Zn (granules)';

    if (type === 'litmus') {
      if (/red litmus (paper )?turns blue/i.test(obs)) metaRedFinal = RED_TO;
      if (/blue litmus (paper )?turns red/i.test(obs)) metaBlueFinal = BLUE_TO;
    }

    return {
      type: type,
      sub: sub,
      obs: obs,
      redFinal: metaRedFinal,
      blueFinal: metaBlueFinal,
      isGas: /gas jar/i.test(desc) || (sub === 'smell' && /the gas/i.test(desc)),
      sampleLiq: o.sampleColour || 'rgba(206,233,246,0.30)',
      solid: !!o.solid,
      solidCol: '#f4f4f4',
      flameCol: flameCol,
      flameBadge: flameCol.badge,
      reaction: sub,
      reagentLabel: reagentLabel,
      performed: !!o.performed,
      locked: !!o.locked,
      replay: !!o.replay,
      onComplete: o.onComplete || null
    };
  }

  function buildScene() {
    switch (meta.type) {
      case 'flame': return flameScene();
      case 'splint': return splintScene();
      case 'testtube': return tubeScene();
      case 'bottle': return bottleScene();
      case 'litmus': return litmusScene();
      case 'funnel': return funnelScene();
      default: return beakerScene();
    }
  }

  /* ---------------- step engine ---------------- */

  function lockedIdleSteps() {
    return [{ prompt: '🔒 Test budget used up — this apparatus is locked', auto: null }];
  }

  function enterPhase(i) {
    anim.phase = i;
    anim.phaseT = 0;
    var s = scene.steps[i];
    if (!s) { finish(); return; }
    setPrompt(s.prompt);
  }

  function finish() {
    if (anim.finished) return;
    anim.finished = true;
    var el = document.getElementById('tool-prompt');
    if (!el || el.textContent.indexOf('✓') !== 0) {
      setPrompt('✓ Apparatus interaction complete');
    }
    if (meta.onComplete && !meta.performed && !meta.locked && !meta.replay) {
      meta.onComplete();
    }
  }

  function tick(dt) {
    anim.t += dt;
    if (anim.finished) return;
    anim.phaseT += dt;
    var s = scene.steps[anim.phase];
    if (!s) { finish(); return; }
    if (s.auto != null && anim.phaseT >= s.auto) {
      if (s.finish) { finish(); return; }
      if (anim.phase + 1 < scene.steps.length) enterPhase(anim.phase + 1);
      else finish();
    }
  }

  function currentHot() {
    if (!scene || anim.finished || meta.locked) return null;
    var s = scene.steps[anim.phase];
    if (!s || s.auto != null) return null;
    return scene.hot(anim.phase);
  }

  /* ---------------- loop + events ---------------- */

  function loop(ts) {
    if (!ctx || !canvas) return;
    var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016;
    lastTs = ts || 0;
    tick(dt);
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, W, H);
    drawBackground();
    if (scene) scene.draw(anim.t);
    if (scene && scene.hot) promptRing(ctx, currentHot(), anim.t);
    if (meta.locked) {
      ctx.fillStyle = 'rgba(12,14,18,0.45)';
      ctx.fillRect(0, 0, W, H);
    }
    rafId = requestAnimationFrame(loop);
  }

  function canvasPoint(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height)
    };
  }

  function inRect(p, r) {
    return r && p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
  }

  function onClick(e) {
    if (!anim || meta.locked) return;
    if (anim.finished) {
      if (meta.replay || meta.performed) {
        anim.finished = false;
        enterPhase(0);
      }
      return;
    }
    var p = canvasPoint(e);
    var s = scene.steps[anim.phase];
    if (!s || s.auto != null) return;
    if (inRect(p, scene.hot(anim.phase))) {
      enterPhase(anim.phase + 1 >= scene.steps.length ? anim.phase : anim.phase + 1);
    }
  }

  function onMove(e) {
    if (!canvas) return;
    var r = currentHot();
    var p = canvasPoint(e);
    canvas.style.cursor = (r && inRect(p, r)) ? 'pointer' : 'default';
  }

  /* ---------------- public API ---------------- */

  function stop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (canvas) {
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousemove', onMove);
      canvas.style.cursor = 'default';
    }
    canvas = null; ctx = null; test = null; meta = null; scene = null; anim = null; opts = null;
    lastTs = 0;
  }

  function mount(el, theTest, o) {
    stop();
    if (!el || !el.getContext) return;
    canvas = el;
    ctx = canvas.getContext('2d');
    test = theTest;
    opts = o || {};
    meta = buildMeta(test, opts);
    scene = buildScene();
    if (meta.locked) scene.steps = lockedIdleSteps();
    anim = { phase: 0, phaseT: 0, t: 0, finished: false };
    lastTs = 0;
    enterPhase(0);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(loop);
  }

  return { mount: mount, stop: stop };
})();
