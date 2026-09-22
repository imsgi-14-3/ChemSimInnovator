var DistillationRenderer = {
  renderStage: function(stage, exp, state, appState) {
    var html = '';
    switch(stage) {
      case 'prepare': html = this.renderPrepare(exp, state); break;
      case 'setUp': html = this.renderSetUp(exp, state); break;
      case 'checkSetup': html = this.renderCheckSetup(exp, state); break;
      case 'startHeating': html = this.renderStartHeating(exp, state); break;
      case 'monitor': html = this.renderMonitor(exp, state); break;
      case 'observe': html = this.renderObserve(exp, state); break;
      case 'collect': html = this.renderCollect(exp, state); break;
      case 'record': html = this.renderRecord(exp, state); break;
      case 'interpret': html = this.renderInterpret(exp, state); break;
      case 'conclude': html = this.renderConclude(exp, state); break;
      case 'complete': html = this.renderComplete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    html += LaboratoryWorkspace.renderCanvas();
    return html;
  },

  renderPrepare: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Prepare the Apparatus</h3>';
    html += '<p>Before assembling the fractional distillation apparatus, identify the key components.</p>';
    html += '<p class="instruction-highlight">Important setup points:</p>';
    html += '<ul>';
    html += '<li>The thermometer bulb must be positioned at the branch of the fractionating column.</li>';
    html += '<li>The condenser must be connected with cooling water flowing.</li>';
    html += '<li>The receiving flask must be in place to collect the distillate.</li>';
    html += '</ul>';
    html += '<div class="sim-note">These are standard laboratory procedures for fractional distillation.</div>';
    html += '</div>';
    return html;
  },

  renderSetUp: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Set Up the Apparatus</h3>';
    html += '<p>Assemble the fractional distillation apparatus by positioning the components correctly.</p>';
    html += '<p>Click on the simulation area to position each component.</p>';
    if (!state.distThermometerOk) {
      html += '<div class="instruction-highlight">Click on the <strong>fractionating column head</strong> to position the thermometer.</div>';
    } else if (!state.distCondenserOk) {
      html += '<div class="instruction-highlight">Thermometer positioned. Now click on the <strong>condenser</strong> to connect cooling water.</div>';
    } else {
      html += '<div class="feedback feedback-correct">Apparatus assembled. Click <strong>Check Setup</strong> to verify.</div>';
    }
    html += '</div>';
    return html;
  },

  renderCheckSetup: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Check the Setup</h3>';
    html += '<p>Before heating, verify that the apparatus is correctly assembled.</p>';
    html += '<p class="instruction-highlight">Key checks:</p>';
    html += '<ul>';
    html += '<li>Thermometer bulb at the column head — ' +
      (state.distThermometerOk ? '<span class="text-success">✓ Correct</span>' : '<span class="text-danger">✗ Not positioned</span>') + '</li>';
    html += '<li>Condenser connected with cooling water — ' +
      (state.distCondenserOk ? '<span class="text-success">✓ Connected</span>' : '<span class="text-danger">✗ Not connected</span>') + '</li>';
    html += '</ul>';
    if (state.distThermometerOk && state.distCondenserOk) {
      html += '<div class="feedback feedback-correct">Setup verified. You may proceed to heating.</div>';
    } else {
      html += '<div class="feedback feedback-incorrect">Setup incomplete. Return to the Setup stage to position all components.</div>';
    }
    html += '</div>';
    return html;
  },

  renderStartHeating: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Start Heating</h3>';
    html += '<p>Begin heating the round-bottom flask gently and steadily.</p>';
    html += '<div data-action="start-heating" class="btn btn-primary">Start Heating</div>';
    if (state.distHeating) {
      html += '<div class="feedback feedback-correct">Heating in progress. The mixture is being heated.</div>';
    }
    html += '<div class="sim-note">⚠ This is a simulated animation. Temperature values are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderMonitor: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Monitor the Distillation</h3>';
    html += '<p>Observe the distillation process. Watch the temperature and the vapour movement.</p>';
    html += '<p class="detail-label">Current temperature</p>';
    html += '<p class="temp-display">' + state.distTemperature.toFixed(1) + ' °C</p>';
    if (state.distTemperature >= 78 && state.distTemperature < 95) {
      html += '<p>The temperature has stabilised near the boiling point of the alcohol. The first fraction is being collected.</p>';
    } else if (state.distTemperature >= 95) {
      html += '<p>The temperature is rising. The alcohol has mostly distilled over. Water is beginning to distil.</p>';
    }
    html += '<div class="sim-note">Temperature values are simulated educational values, not real laboratory measurements.</div>';
    html += '</div>';
    return html;
  },

  renderObserve: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Observe the Distillation</h3>';
    html += '<p>Examine the distillation process and the collected distillate.</p>';
    html += '<p class="detail-label">Record your observation</p>';
    html += '<p>The mixture has been separated by fractional distillation. The lower-boiling component (alcohol) distilled first.</p>';
    html += '<div class="sim-note">Observations are based on simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderCollect: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Collect the Distillate</h3>';
    html += '<p>The first fraction has been collected in the receiving flask.</p>';
    html += '<p class="detail-label">First fraction</p>';
    html += '<p>' + ChemSim.escapeHtml(sim.firstFraction.name) + ' — collected at approximately ' + sim.firstFraction.boilingPoint + ' °C (simulated).</p>';
    if (!state.distCollected) {
      html += '<div data-action="record-collection" class="btn btn-accent">Record Collection</div>';
    } else {
      html += '<div class="feedback feedback-correct">Distillate collected and recorded.</div>';
    }
    html += '<div class="sim-note">Volume and temperature are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderRecord: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Record Observations</h3>';
    html += '<p>Record your observations from the fractional distillation experiment.</p>';
    html += '<p class="detail-label">Simulated data (for reference)</p>';
    html += '<table class="table"><thead><tr><th>Parameter</th><th>Value</th><th>Note</th></tr></thead><tbody>';
    html += '<tr><td>Initial temperature</td><td>' + sim.initialTemp + ' °C</td><td>Simulated</td></tr>';
    html += '<tr><td>First fraction temperature</td><td>' + sim.firstFraction.boilingPoint + ' °C</td><td>Simulated</td></tr>';
    html += '<tr><td>Second fraction temperature</td><td>' + sim.secondFraction.boilingPoint + ' °C</td><td>Simulated</td></tr>';
    html += '</tbody></table>';
    html += '<div class="sim-note">All values are simulated educational values, not real laboratory measurements.</div>';
    html += '</div>';
    return html;
  },

  renderInterpret: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Interpret the Results</h3>';
    html += '<p>Based on your observations, interpret the fractional distillation results.</p>';
    html += '<p class="detail-label">Guiding questions</p>';
    html += '<ul>';
    html += '<li>Which component distilled first and why?</li>';
    html += '<li>What does the temperature stabilisation indicate?</li>';
    html += '<li>How does fractional distillation separate the mixture?</li>';
    html += '</ul>';
    html += '<div class="form-group"><label class="form-label">Your Interpretation</label>';
    html += '<textarea id="interpretation-input" class="form-textarea" placeholder="Write your interpretation here...">' + ChemSim.escapeHtml(state.interpretation) + '</textarea></div>';
    html += '</div>';
    return html;
  },

  renderConclude: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Conclusion</h3>';
    html += '<p>Write your conclusion based on your observations and interpretation.</p>';
    html += '<p>Your conclusion should address:</p>';
    html += '<ul>';
    html += '<li>Whether the mixture was separated successfully</li>';
    html += '<li>Which component distilled first</li>';
    html += '<li>The significance of the temperature at which the first fraction collected</li>';
    html += '</ul>';
    html += '<div class="form-group"><label class="form-label">Your Conclusion</label>';
    html += '<textarea id="conclusion-input" class="form-textarea" placeholder="Write your conclusion here...">' + ChemSim.escapeHtml(state.conclusion) + '</textarea></div>';
    html += '</div>';
    return html;
  },

  renderComplete: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Experiment Complete</h3>';
    html += '<div class="detail-row"><span class="detail-label">Practical</span><span class="detail-value">' + ChemSim.escapeHtml(exp.title) + '</span></div>';
    html += '<div class="detail-row"><span class="detail-label">Section</span><span class="detail-value">' + (exp.section.charAt(0).toUpperCase() + exp.section.slice(1)) + ' Practical</span></div>';
    html += '<div class="detail-row"><span class="detail-label">SLOs</span><span class="detail-value">' + exp.slos.join(', ') + '</span></div>';
    html += '<hr class="divider">';
    html += '<p><strong>First fraction:</strong> ' + ChemSim.escapeHtml(sim.firstFraction.name) +
      ' (simulated boiling point: ' + sim.firstFraction.boilingPoint + ' °C)</p>';
    html += '<p><strong>Second fraction:</strong> ' + ChemSim.escapeHtml(sim.secondFraction.name) +
      ' (simulated boiling point: ' + sim.secondFraction.boilingPoint + ' °C)</p>';
    html += '<hr class="divider">';
    html += '<p class="detail-label">Your Interpretation</p><p>' + ChemSim.escapeHtml(state.interpretation || '-') + '</p>';
    html += '<p class="detail-label">Your Conclusion</p><p>' + ChemSim.escapeHtml(state.conclusion || '-') + '</p>';
    html += '<div class="sim-note">All temperature and volume values are simulated educational values, not real laboratory measurements.</div>';
    html += '<div data-action="finish-experiment" class="btn btn-primary" style="margin-top:1rem;">Finish Experiment</div>';
    html += '</div>';
    return html;
  },

  /* ========== Canvas Drawing ========== */
  draw: function(canvas, ctx, state, exp) {
    var sim = SIMULATION_CONFIG['A1'];
    if (!sim) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawStand(ctx, sim.stand);
    this.drawMantle(ctx, sim.mantle, state);
    this.drawFlask(ctx, sim.flask, state);
    this.drawColumn(ctx, sim.column, sim.flask);
    this.drawThermometer(ctx, sim.column, state);
    this.drawCondenserToReceiver(ctx, sim, state);
    this.drawClamps(ctx, sim);
    this.drawLabels(ctx, sim);
    if (state.simulation && (state.currentStage === 'monitor' || state.currentStage === 'observe' || state.currentStage === 'collect')) {
      this.drawAnimation(ctx, sim, state, canvas);
    }
    if (state.distHeating && !state.simulation) {
      var self = this;
      requestAnimationFrame(function() { self.draw(canvas, ctx, state, exp); });
    }
  },

  drawStand: function(ctx, s) {
    ctx.save();
    var bg = ctx.createLinearGradient(s.baseX, 0, s.baseX + s.baseW, 0);
    bg.addColorStop(0, '#181818');
    bg.addColorStop(0.12, '#2e2e2e');
    bg.addColorStop(0.5, '#444');
    bg.addColorStop(0.88, '#2e2e2e');
    bg.addColorStop(1, '#181818');
    ctx.fillStyle = bg;
    ctx.fillRect(s.baseX, s.baseY, s.baseW, 14);
    ctx.strokeStyle = '#0e0e0e';
    ctx.lineWidth = 1;
    ctx.strokeRect(s.baseX, s.baseY, s.baseW, 14);
    var rg = ctx.createLinearGradient(s.rodX - 4, 0, s.rodX + 4, 0);
    rg.addColorStop(0, '#606060');
    rg.addColorStop(0.2, '#b0b0b0');
    rg.addColorStop(0.4, '#d0d0d0');
    rg.addColorStop(0.6, '#d0d0d0');
    rg.addColorStop(0.8, '#b0b0b0');
    rg.addColorStop(1, '#606060');
    ctx.fillStyle = rg;
    ctx.fillRect(s.rodX - 4, s.rodTop, 8, s.rodBot - s.rodTop);
    ctx.strokeStyle = '#505050';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(s.rodX - 4, s.rodTop, 8, s.rodBot - s.rodTop);
    ctx.fillStyle = '#a0a0a0';
    ctx.fillRect(s.rodX - 6, s.rodTop, 12, 6);
    ctx.strokeStyle = '#808080';
    ctx.strokeRect(s.rodX - 6, s.rodTop, 12, 6);
    ctx.restore();
  },

  drawMantle: function(ctx, m, state) {
    ctx.save();
    var cx = m.cx;
    var left = cx - m.w / 2;
    var top = m.cy - m.h / 2;
    var bodyG = ctx.createLinearGradient(left, 0, left + m.w, 0);
    bodyG.addColorStop(0, '#15356a');
    bodyG.addColorStop(0.12, '#1c4a88');
    bodyG.addColorStop(0.35, '#2460a5');
    bodyG.addColorStop(0.65, '#2460a5');
    bodyG.addColorStop(0.88, '#1c4a88');
    bodyG.addColorStop(1, '#15356a');
    ctx.fillStyle = bodyG;
    ctx.beginPath();
    ctx.moveTo(left + 5, top + 12);
    ctx.lineTo(left + m.w - 5, top + 12);
    ctx.quadraticCurveTo(left + m.w, top + 12, left + m.w, top + 18);
    ctx.lineTo(left + m.w, top + m.h - 5);
    ctx.quadraticCurveTo(left + m.w, top + m.h, left + m.w - 5, top + m.h);
    ctx.lineTo(left + 5, top + m.h);
    ctx.quadraticCurveTo(left, top + m.h, left, top + m.h - 5);
    ctx.lineTo(left, top + 18);
    ctx.quadraticCurveTo(left, top + 12, left + 5, top + 12);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0e2850';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    var rimG = ctx.createLinearGradient(left, top, left + m.w, top);
    rimG.addColorStop(0, '#7a7a7a');
    rimG.addColorStop(0.15, '#b0b0b0');
    rimG.addColorStop(0.35, '#d5d5d5');
    rimG.addColorStop(0.5, '#e0e0e0');
    rimG.addColorStop(0.65, '#d5d5d5');
    rimG.addColorStop(0.85, '#b0b0b0');
    rimG.addColorStop(1, '#7a7a7a');
    ctx.fillStyle = rimG;
    ctx.beginPath();
    ctx.ellipse(cx, top + 12, m.w / 2 - 1, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6a6a6a';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath();
    ctx.ellipse(cx, top + 12, m.w / 2 - 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ddd';
    ctx.beginPath();
    ctx.ellipse(cx, top + 12, m.w / 2 - 13, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ccc';
    ctx.beginPath();
    ctx.arc(m.dialX, m.dialY, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(m.dialX, m.dialY, 5, 0, Math.PI * 2);
    ctx.fill();
    var dialAngle = state.distHeating ? -0.4 : 0.9;
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.dialX, m.dialY);
    ctx.lineTo(m.dialX + Math.cos(dialAngle) * 8, m.dialY + Math.sin(dialAngle) * 8);
    ctx.stroke();
    if (state.distHeating || (state.simulation && !state.simulation.done)) {
      ctx.fillStyle = '#ff5500';
      ctx.beginPath();
      ctx.arc(m.dialX + 18, m.dialY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,85,0,0.25)';
      ctx.beginPath();
      ctx.arc(m.dialX + 18, m.dialY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  },

  drawFlask: function(ctx, f, state) {
    ctx.save();
    var cx = f.cx;
    var neckTop = f.cy - f.bodyR - f.neckH;
    var neckBot = f.cy - f.bodyR;
    var r = f.bodyR;

    ctx.strokeStyle = 'rgba(45,80,115,0.95)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - f.neckW / 2, neckTop);
    ctx.lineTo(cx - f.neckW / 2, neckBot);
    ctx.bezierCurveTo(cx - f.neckW / 2 - 5, neckBot + 12, cx - r + 10, f.cy - r * 0.25, cx - r, f.cy);
    ctx.arc(cx, f.cy, r, Math.PI, 0, false);
    ctx.bezierCurveTo(cx + r - 10, f.cy - r * 0.25, cx + f.neckW / 2 + 5, neckBot + 12, cx + f.neckW / 2, neckBot);
    ctx.lineTo(cx + f.neckW / 2, neckTop);
    ctx.closePath();

    var gg = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
    gg.addColorStop(0, 'rgba(120,168,210,0.48)');
    gg.addColorStop(0.08, 'rgba(160,200,238,0.32)');
    gg.addColorStop(0.25, 'rgba(210,235,255,0.16)');
    gg.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    gg.addColorStop(0.75, 'rgba(210,235,255,0.16)');
    gg.addColorStop(0.92, 'rgba(160,200,238,0.32)');
    gg.addColorStop(1, 'rgba(120,168,210,0.48)');
    ctx.fillStyle = gg;
    ctx.fill();
    ctx.stroke();

    var liqTop = f.cy + r * 0.1;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, f.cy, r - 4, 0, Math.PI * 2);
    ctx.clip();
    var lg = ctx.createLinearGradient(0, liqTop, 0, f.cy + r);
    lg.addColorStop(0, 'rgba(255,255,255,0.04)');
    lg.addColorStop(0.08, 'rgba(228,242,255,0.22)');
    lg.addColorStop(0.35, 'rgba(200,225,248,0.4)');
    lg.addColorStop(1, 'rgba(175,205,238,0.52)');
    ctx.fillStyle = lg;
    ctx.fillRect(cx - r, liqTop, r * 2, f.cy + r - liqTop);

    if (state.distHeating || (state.simulation && !state.simulation.done)) {
      var t = Date.now() / 100;
      for (var i = 0; i < 18; i++) {
        var seed = Math.sin(t * 0.7 + i * 2.3) * 0.5 + 0.5;
        var seed2 = Math.cos(t * 0.5 + i * 1.7) * 0.5 + 0.5;
        var bx = cx - r * 0.6 + seed * r * 1.2;
        var by = f.cy + r * 0.2 + seed2 * r * 0.65;
        var br = 1.5 + seed * 3;
        var rise = Math.sin(t * 2 + i * 1.1) * 4;
        var alpha = 0.15 + seed * 0.25;
        ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
        ctx.beginPath();
        ctx.arc(bx, by - rise, br, 0, Math.PI * 2);
        ctx.fill();
      }
      for (var j = 0; j < 5; j++) {
        var sx = cx - 12 + j * 6;
        var sy = f.cy + r * 0.5 - ((t * 30 + j * 15) % (r * 0.7));
        var sr = 1 + Math.sin(t + j) * 0.8;
        if (sy > liqTop) {
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();

    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - r + 10, f.cy - r * 0.65);
    ctx.quadraticCurveTo(cx - r + 6, f.cy - r * 0.05, cx - r + 12, f.cy + r * 0.5);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - r + 16, f.cy - r * 0.78);
    ctx.lineTo(cx - r + 13, f.cy - r * 0.32);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx - f.neckW / 2 + 2, neckTop + 10);
    ctx.lineTo(cx - f.neckW / 2 + 2, neckBot - 8);
    ctx.stroke();
    ctx.restore();
  },

  drawColumn: function(ctx, col, flask) {
    ctx.save();
    var colBottom = flask.cy - flask.bodyR;
    var colH = colBottom - col.y;
    var gg = ctx.createLinearGradient(col.x, 0, col.x + col.width, 0);
    gg.addColorStop(0, 'rgba(160,200,235,0.35)');
    gg.addColorStop(0.15, 'rgba(220,240,255,0.18)');
    gg.addColorStop(0.5, 'rgba(255,255,255,0.08)');
    gg.addColorStop(0.85, 'rgba(220,240,255,0.18)');
    gg.addColorStop(1, 'rgba(160,200,235,0.35)');
    ctx.fillStyle = gg;
    ctx.strokeStyle = 'rgba(80,120,160,0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(col.x, col.y, col.width, colH);
    ctx.fill();
    ctx.stroke();
    var beadCount = Math.floor(colH / 13);
    for (var i = 0; i < beadCount; i++) {
      var bx = col.x + col.width / 2;
      var by = col.y + 8 + i * 13;
      var bg = ctx.createRadialGradient(bx - 1, by - 1, 0, bx, by, 4.5);
      bg.addColorStop(0, 'rgba(255,255,255,0.8)');
      bg.addColorStop(0.3, 'rgba(230,242,255,0.5)');
      bg.addColorStop(0.7, 'rgba(185,208,228,0.3)');
      bg.addColorStop(1, 'rgba(155,180,205,0.12)');
      ctx.fillStyle = bg;
      ctx.strokeStyle = 'rgba(125,150,175,0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  },

  drawThermometer: function(ctx, col, state) {
    ctx.save();
    var tx = col.x + col.width / 2;
    var ty = col.y - 55;
    var th = 78;
    var bw = 7;
    var bulbR = 5;
    ctx.fillStyle = 'rgba(245,245,250,0.92)';
    ctx.strokeStyle = 'rgba(165,165,175,0.6)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(tx - bw / 2, ty + 4);
    ctx.arcTo(tx - bw / 2, ty, tx, ty, 3);
    ctx.arcTo(tx + bw / 2, ty, tx + bw / 2, ty + 4, 3);
    ctx.lineTo(tx + bw / 2, ty + th - bulbR);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var temp = state.distTemperature || 25;
    var fillH = Math.min(th - bulbR - 8, (temp / 110) * (th - bulbR - 8));
    ctx.fillStyle = '#c62828';
    ctx.fillRect(tx - 1.2, ty + th - bulbR - fillH, 2.4, fillH);
    ctx.beginPath();
    ctx.arc(tx, ty + th, bulbR, 0, Math.PI * 2);
    ctx.fillStyle = '#c62828';
    ctx.fill();
    ctx.strokeStyle = 'rgba(165,165,175,0.6)';
    ctx.lineWidth = 0.6;
    ctx.stroke();
    for (var i = 0; i <= 10; i++) {
      var markY = ty + th - bulbR - (i / 10) * (th - bulbR - 8);
      var markW = i % 5 === 0 ? 5 : 2;
      ctx.strokeStyle = 'rgba(100,100,100,0.4)';
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.moveTo(tx + bw / 2, markY);
      ctx.lineTo(tx + bw / 2 + markW, markY);
      ctx.stroke();
    }
    ctx.fillStyle = '#333';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(temp.toFixed(1) + ' \u00B0C', tx + 9, ty + th / 2);
    ctx.font = '8px sans-serif';
    ctx.fillStyle = '#aaa';
    ctx.fillText('(simulated)', tx + 9, ty + th / 2 + 12);
    if (state.distThermometerOk) {
      ctx.fillStyle = 'rgba(40,167,69,0.9)';
      ctx.beginPath();
      ctx.arc(tx - 11, ty + th / 2, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('\u2713', tx - 11, ty + th / 2 + 3);
    }
    ctx.restore();
  },

  drawCondenserToReceiver: function(ctx, sim, state) {
    var rc = sim.receiver;
    var rcNeckTop = rc.cy - rc.bodyR - rc.neckH;
    var connX = rc.cx;
    var connY = rcNeckTop;
    var cd = sim.condenser;
    var endX = connX - 5;
    var endY = connY + 5;

    ctx.save();
    var dx = endX - cd.x1;
    var dy = endY - cd.y1;
    var len = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    ctx.translate(cd.x1, cd.y1);
    ctx.rotate(angle);
    var ow = cd.width;
    var iw = cd.innerW;
    ctx.fillStyle = 'rgba(200,230,255,0.2)';
    ctx.strokeStyle = 'rgba(85,145,205,0.65)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(0, -ow / 2, len, ow);
    ctx.fill();
    ctx.stroke();
    if (state.distCondenserOk) {
      ctx.fillStyle = 'rgba(100,180,255,0.15)';
      ctx.beginPath();
      ctx.rect(3, -ow / 2 + 3, len - 6, ow - 6);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(225,240,255,0.3)';
    ctx.strokeStyle = 'rgba(155,180,208,0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(10, -iw / 2, len - 20, iw);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(14, -iw / 2 + 1);
    ctx.lineTo(len - 22, -iw / 2 + 1);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = 'rgba(85,145,205,0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX, connY - 2);
    ctx.stroke();
    ctx.restore();

    if (state.distCondenserOk) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      var hoseInX = endX - 18;
      var hoseInY = endY + 15;
      ctx.strokeStyle = 'rgba(25,105,205,0.8)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hoseInX, hoseInY + 32);
      ctx.quadraticCurveTo(hoseInX - 6, hoseInY + 18, hoseInX + 3, hoseInY + 3);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(55,145,235,0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hoseInX, hoseInY + 32);
      ctx.quadraticCurveTo(hoseInX - 6, hoseInY + 18, hoseInX + 3, hoseInY + 3);
      ctx.stroke();
      var hoseOutX = cd.x1 + 22;
      var hoseOutY = cd.y1 - 10;
      ctx.strokeStyle = 'rgba(25,105,205,0.8)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(hoseOutX, hoseOutY);
      ctx.quadraticCurveTo(hoseOutX - 8, hoseOutY - 16, hoseOutX - 4, hoseOutY - 35);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(55,145,235,0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hoseOutX, hoseOutY);
      ctx.quadraticCurveTo(hoseOutX - 8, hoseOutY - 16, hoseOutX - 4, hoseOutY - 35);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    var rcx = rc.cx;
    var rcNeckBot = rc.cy - rc.bodyR;
    var rr = rc.bodyR;
    ctx.fillStyle = '#f0f0ea';
    ctx.fillRect(rcx - 32, rc.cy + rr, 64, 5);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(rcx - 32, rc.cy + rr, 64, 5);
    ctx.strokeStyle = 'rgba(80,120,160,0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rcx - rc.neckW / 2, rcNeckTop);
    ctx.lineTo(rcx - rc.neckW / 2, rcNeckBot);
    ctx.lineTo(rcx - rr, rc.cy + rr * 0.65);
    ctx.lineTo(rcx - rr + 4, rc.cy + rr);
    ctx.quadraticCurveTo(rcx, rc.cy + rr + 5, rcx + rr - 4, rc.cy + rr);
    ctx.lineTo(rcx + rr, rc.cy + rr * 0.65);
    ctx.lineTo(rcx + rc.neckW / 2, rcNeckBot);
    ctx.lineTo(rcx + rc.neckW / 2, rcNeckTop);
    ctx.closePath();
    var rgg = ctx.createLinearGradient(rcx - rr, 0, rcx + rr, 0);
    rgg.addColorStop(0, 'rgba(160,200,235,0.3)');
    rgg.addColorStop(0.2, 'rgba(220,238,255,0.15)');
    rgg.addColorStop(0.5, 'rgba(248,255,255,0.06)');
    rgg.addColorStop(0.8, 'rgba(220,238,255,0.15)');
    rgg.addColorStop(1, 'rgba(160,200,235,0.3)');
    ctx.fillStyle = rgg;
    ctx.fill();
    ctx.stroke();
    var initLiqH = rr * 0.35;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(rcx - rr, rc.cy + rr * 0.65);
    ctx.lineTo(rcx - rr + 4, rc.cy + rr);
    ctx.quadraticCurveTo(rcx, rc.cy + rr + 4, rcx + rr - 4, rc.cy + rr);
    ctx.lineTo(rcx + rr, rc.cy + rr * 0.65);
    ctx.closePath();
    ctx.clip();
    var rlg = ctx.createLinearGradient(0, rc.cy + rr - initLiqH, 0, rc.cy + rr + 5);
    rlg.addColorStop(0, 'rgba(175,210,248,0.3)');
    rlg.addColorStop(1, 'rgba(150,195,240,0.5)');
    ctx.fillStyle = rlg;
    ctx.fillRect(rcx - rr, rc.cy + rr - initLiqH, rr * 2, initLiqH);
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rcx - rr + 10, rc.cy - rr * 0.1);
    ctx.lineTo(rcx - rr + 7, rc.cy + rr * 0.5);
    ctx.stroke();
    ctx.restore();
  },

  drawClamps: function(ctx, sim) {
    var rodX = sim.stand.rodX;
    var cf = sim.clampFlask;
    var cc = sim.clampColumn;
    ctx.save();
    ctx.fillStyle = '#999';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.fillRect(rodX - 3, cf.y, cf.x - rodX + 3, cf.h);
    ctx.strokeRect(rodX - 3, cf.y, cf.x - rodX + 3, cf.h);
    ctx.fillRect(cf.x, cf.y, cf.w, cf.h);
    ctx.strokeRect(cf.x, cf.y, cf.w, cf.h);
    ctx.fillRect(cf.x - 4, cf.y - 4, 8, cf.h + 8);
    ctx.strokeStyle = '#666';
    ctx.strokeRect(cf.x - 4, cf.y - 4, 8, cf.h + 8);
    ctx.fillStyle = '#999';
    ctx.fillRect(rodX - 3, cc.y, cc.x - rodX + 3, cc.h);
    ctx.strokeRect(rodX - 3, cc.y, cc.x - rodX + 3, cc.h);
    ctx.fillRect(cc.x, cc.y, cc.w, cc.h);
    ctx.strokeRect(cc.x, cc.y, cc.w, cc.h);
    ctx.fillRect(cc.x - 4, cc.y - 4, 8, cc.h + 8);
    ctx.strokeStyle = '#666';
    ctx.strokeRect(cc.x - 4, cc.y - 4, 8, cc.h + 8);
    ctx.restore();
  },

  drawLabels: function(ctx, sim) {
    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.textAlign = 'left';
    ctx.fillText('Mixture of water', 12, sim.flask.cy + 5);
    ctx.fillText('and alcohols', 12, sim.flask.cy + 19);
    ctx.fillText('Heating mantle', 12, sim.mantle.cy + 32);
    ctx.fillText('Fractionating', 12, sim.column.y + 100);
    ctx.fillText('column', 12, sim.column.y + 114);
    ctx.fillText('Thermometer', 30, sim.column.y - 68);
    var cdMX = (sim.condenser.x1 + sim.condenser.x2) / 2;
    var cdMY = (sim.condenser.y1 + sim.condenser.y2) / 2;
    ctx.fillText('Condenser', cdMX + 20, cdMY - 28);
    ctx.fillText('Distillate', sim.receiver.cx + 15, sim.receiver.cy - 12);
    ctx.fillText('(water-rich)', sim.receiver.cx + 15, sim.receiver.cy + 2);
    ctx.textAlign = 'left';
    ctx.restore();
  },

  drawAnimation: function(ctx, sim, state, canvas) {
    if (!state.simulation) return;
    var elapsed = Date.now() - state.simulation.startTime;
    var progress = Math.min(elapsed / sim.animationDurationMs, 1);
    var temp = sim.initialTemp + progress * (sim.secondFraction.boilingPoint - sim.initialTemp);
    if (progress < 0.5) {
      temp = sim.initialTemp + progress * 2 * (sim.firstFraction.boilingPoint - sim.initialTemp);
    } else {
      temp = sim.firstFraction.boilingPoint + (progress - 0.5) * 2 * (sim.secondFraction.boilingPoint - sim.firstFraction.boilingPoint);
    }
    state.distTemperature = Math.min(temp, sim.secondFraction.boilingPoint);
    var colBottom = sim.flask.cy - sim.flask.bodyR;
    var colH = colBottom - sim.column.y;
    var vapourY = sim.column.y + colH * (1 - progress);
    ctx.fillStyle = 'rgba(200,225,255,0.3)';
    ctx.fillRect(sim.column.x + 3, vapourY, sim.column.width - 6, colBottom - vapourY);
    if (progress > 0.3) {
      var dropP = (progress - 0.3) / 0.7;
      var dx = sim.condenser.x2 - sim.condenser.x1;
      var dy = sim.condenser.y2 - sim.condenser.y1;
      var dropX = sim.condenser.x1 + dropP * dx;
      var dropY = sim.condenser.y1 + dropP * dy;
      ctx.fillStyle = 'rgba(175,210,248,0.6)';
      ctx.beginPath();
      ctx.arc(dropX, dropY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    if (progress > 0.5) {
      var rc = sim.receiver;
      var extraH = (progress - 0.5) * 2 * rc.bodyR * 0.6;
      var totalH = rc.bodyR * 0.35 + extraH;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rc.cx - rc.bodyR, rc.cy + rc.bodyR * 0.65);
      ctx.lineTo(rc.cx - rc.bodyR + 4, rc.cy + rc.bodyR);
      ctx.quadraticCurveTo(rc.cx, rc.cy + rc.bodyR + 4, rc.cx + rc.bodyR - 4, rc.cy + rc.bodyR);
      ctx.lineTo(rc.cx + rc.bodyR, rc.cy + rc.bodyR * 0.65);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = sim.firstFraction.color;
      ctx.fillRect(rc.cx - rc.bodyR, rc.cy + rc.bodyR - totalH, rc.bodyR * 2, totalH);
      ctx.restore();
    }
    if (progress < 1) {
      var self = this;
      requestAnimationFrame(function() { self.draw(canvas, ctx, state, state.experiment); });
    } else {
      state.simulation.done = true;
      state.distTemperature = sim.secondFraction.boilingPoint;
    }
  },

  handleClick: function(mx, my, state, stage, appState) {
    var canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    var sim = SIMULATION_CONFIG['A1'];
    if (!sim) return;
    var col = sim.column;
    var cd = sim.condenser;
    if (stage === 'setUp') {
      if (!state.distThermometerOk) {
        var nearColHead = mx >= col.x - 10 && mx <= col.x + col.width + 20 && my >= col.y - 10 && my <= col.y + 30;
        if (nearColHead) {
          state.distThermometerOk = true;
        }
      } else if (!state.distCondenserOk) {
        var cdx = cd.x1, cdy = cd.y1;
        var nearCondenser = mx >= cdx - 20 && mx <= cd.x2 + 20 && my >= cdy - 30 && my <= cd.y2 + 30;
        if (nearCondenser) {
          state.distCondenserOk = true;
        }
      }
    }
  }
};
