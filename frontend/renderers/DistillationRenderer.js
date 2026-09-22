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
    this.drawClamps(ctx, sim);
    this.drawBurner(ctx, sim.burner, state);
    this.drawFlask(ctx, sim.flask, state);
    this.drawColumn(ctx, sim.column, sim.flask);
    this.drawThermometer(ctx, sim.column, state);
    this.drawCondenser(ctx, sim.condenser, state);
    this.drawReceiver(ctx, sim.receiver, state);
    this.drawLabels(ctx, sim);
    if (state.simulation && (state.currentStage === 'monitor' || state.currentStage === 'observe' || state.currentStage === 'collect')) {
      this.drawAnimation(ctx, sim, state, canvas);
    }
  },

  drawStand: function(ctx, s) {
    ctx.save();
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(s.baseX, s.baseY, s.baseW, 10);
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    ctx.strokeRect(s.baseX, s.baseY, s.baseW, 10);
    var g = ctx.createLinearGradient(s.rodX - 3, 0, s.rodX + 3, 0);
    g.addColorStop(0, '#555');
    g.addColorStop(0.4, '#aaa');
    g.addColorStop(0.6, '#aaa');
    g.addColorStop(1, '#555');
    ctx.fillStyle = g;
    ctx.fillRect(s.rodX - 3, s.rodTop, 6, s.rodBot - s.rodTop);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(s.rodX - 3, s.rodTop, 6, s.rodBot - s.rodTop);
    ctx.fillStyle = '#666';
    ctx.fillRect(s.rodX - 6, s.rodTop, 12, 5);
    ctx.restore();
  },

  drawClamps: function(ctx, sim) {
    var rodX = sim.stand.rodX;
    var cf = sim.clampFlask;
    var cc = sim.clampColumn;
    ctx.save();
    ctx.fillStyle = '#888';
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.fillRect(rodX - 3, cf.y, cf.x - rodX + 3, cf.h);
    ctx.strokeRect(rodX - 3, cf.y, cf.x - rodX + 3, cf.h);
    ctx.fillRect(cf.x, cf.y, cf.w, cf.h);
    ctx.strokeRect(cf.x, cf.y, cf.w, cf.h);
    ctx.fillRect(rodX - 3, cc.y, cc.x - rodX + 3, cc.h);
    ctx.strokeRect(rodX - 3, cc.y, cc.x - rodX + 3, cc.h);
    ctx.fillRect(cc.x, cc.y, cc.w, cc.h);
    ctx.strokeRect(cc.x, cc.y, cc.w, cc.h);
    ctx.restore();
  },

  drawBurner: function(ctx, b, state) {
    var cx = b.cx;
    var topY = b.baseY - b.stemH;
    ctx.save();
    var baseG = ctx.createLinearGradient(cx - b.baseW / 2, 0, cx + b.baseW / 2, 0);
    baseG.addColorStop(0, '#3a3a3a');
    baseG.addColorStop(0.3, '#666');
    baseG.addColorStop(0.5, '#777');
    baseG.addColorStop(0.7, '#666');
    baseG.addColorStop(1, '#3a3a3a');
    ctx.fillStyle = baseG;
    ctx.beginPath();
    ctx.moveTo(cx - b.baseW / 2 + 4, b.baseY);
    ctx.lineTo(cx + b.baseW / 2 - 4, b.baseY);
    ctx.lineTo(cx + b.baseW / 2, b.baseY - 5);
    ctx.lineTo(cx - b.baseW / 2, b.baseY - 5);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    var stemG = ctx.createLinearGradient(cx - 5, 0, cx + 5, 0);
    stemG.addColorStop(0, '#777');
    stemG.addColorStop(0.3, '#bbb');
    stemG.addColorStop(0.5, '#ddd');
    stemG.addColorStop(0.7, '#bbb');
    stemG.addColorStop(1, '#777');
    ctx.fillStyle = stemG;
    ctx.fillRect(cx - 5, topY + 8, 10, b.stemH - 8);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(cx - 5, topY + 8, 10, b.stemH - 8);
    ctx.fillStyle = '#999';
    ctx.fillRect(cx - 7, topY, 14, 10);
    ctx.strokeStyle = '#777';
    ctx.strokeRect(cx - 7, topY, 14, 10);
    ctx.fillStyle = 'rgba(60,60,60,0.5)';
    ctx.fillRect(cx - 2, topY + 10, 4, b.stemH - 18);
    if (state.distHeating || (state.simulation && !state.simulation.done)) {
      var t = Date.now() / 80;
      for (var i = 0; i < 8; i++) {
        var spread = (i / 8) * 12 - 6;
        var fx = cx + spread;
        var fh = b.flameH * (0.3 + Math.random() * 0.7);
        var fl = Math.sin(t + i * 1.7) * 1.5;
        var al = 0.4 + (1 - Math.abs(spread) / 12) * 0.5;
        if (i < 3) ctx.fillStyle = 'rgba(50,80,200,' + (al * 0.6) + ')';
        else if (i < 5) ctx.fillStyle = 'rgba(255,180,30,' + (al * 0.8) + ')';
        else ctx.fillStyle = 'rgba(255,255,200,' + (al * 0.5) + ')';
        ctx.beginPath();
        ctx.moveTo(fx, topY);
        ctx.quadraticCurveTo(fx + fl, topY - fh * 0.5, fx + fl * 0.5, topY - fh);
        ctx.quadraticCurveTo(fx - fl * 0.5, topY - fh * 0.5, fx, topY);
        ctx.fill();
      }
    }
    ctx.restore();
  },

  drawFlask: function(ctx, f, state) {
    ctx.save();
    var cx = f.cx;
    var neckTop = f.cy - f.bodyR - f.neckH;
    var neckBot = f.cy - f.bodyR;
    var r = f.bodyR;
    ctx.strokeStyle = 'rgba(90,120,150,0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - f.neckW / 2, neckTop);
    ctx.lineTo(cx - f.neckW / 2, neckBot);
    ctx.quadraticCurveTo(cx - f.neckW / 2 - 12, neckBot + 15, cx - r, f.cy);
    ctx.arc(cx, f.cy, r, Math.PI, 0, false);
    ctx.quadraticCurveTo(cx + f.neckW / 2 + 12, neckBot + 15, cx + f.neckW / 2, neckBot);
    ctx.lineTo(cx + f.neckW / 2, neckTop);
    ctx.closePath();
    var gg = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
    gg.addColorStop(0, 'rgba(180,210,235,0.3)');
    gg.addColorStop(0.25, 'rgba(230,240,250,0.2)');
    gg.addColorStop(0.5, 'rgba(255,255,255,0.12)');
    gg.addColorStop(0.75, 'rgba(230,240,250,0.2)');
    gg.addColorStop(1, 'rgba(180,210,235,0.3)');
    ctx.fillStyle = gg;
    ctx.fill();
    ctx.stroke();
    var liqTop = f.cy + r * 0.1;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - f.neckW / 2 - 10, neckBot);
    ctx.quadraticCurveTo(cx - f.neckW / 2 - 12, neckBot + 15, cx - r, f.cy);
    ctx.arc(cx, f.cy, r, Math.PI, 0, false);
    ctx.quadraticCurveTo(cx + f.neckW / 2 + 12, neckBot + 15, cx + f.neckW / 2 + 10, neckBot);
    ctx.lineTo(cx + f.neckW / 2 + 10, f.cy + r);
    ctx.lineTo(cx - f.neckW / 2 - 10, f.cy + r);
    ctx.closePath();
    ctx.clip();
    var lg = ctx.createLinearGradient(0, liqTop, 0, f.cy + r);
    lg.addColorStop(0, 'rgba(210,170,100,0.55)');
    lg.addColorStop(0.5, 'rgba(190,140,70,0.6)');
    lg.addColorStop(1, 'rgba(170,120,50,0.65)');
    ctx.fillStyle = lg;
    ctx.fillRect(cx - r, liqTop, r * 2, f.cy + r - liqTop);
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - r + 12, f.cy - r * 0.5);
    ctx.quadraticCurveTo(cx - r + 8, f.cy, cx - r + 14, f.cy + r * 0.4);
    ctx.stroke();
    ctx.restore();
  },

  drawColumn: function(ctx, col, flask) {
    ctx.save();
    var colBottom = flask.cy - flask.bodyR;
    var colH = colBottom - col.y;
    var gg = ctx.createLinearGradient(col.x, 0, col.x + col.width, 0);
    gg.addColorStop(0, 'rgba(200,220,240,0.25)');
    gg.addColorStop(0.3, 'rgba(255,255,255,0.12)');
    gg.addColorStop(0.7, 'rgba(255,255,255,0.08)');
    gg.addColorStop(1, 'rgba(200,220,240,0.2)');
    ctx.fillStyle = gg;
    ctx.strokeStyle = 'rgba(100,130,160,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(col.x, col.y, col.width, colH);
    ctx.fill();
    ctx.stroke();
    var beadCount = Math.floor(colH / 18);
    for (var i = 0; i < beadCount; i++) {
      var bx = col.x + 4 + (i % 3) * ((col.width - 8) / 3) + ((col.width - 8) / 6);
      var by = col.y + 12 + i * 18;
      var bg = ctx.createRadialGradient(bx, by, 0, bx, by, 5);
      bg.addColorStop(0, 'rgba(255,255,255,0.6)');
      bg.addColorStop(0.5, 'rgba(200,210,220,0.4)');
      bg.addColorStop(1, 'rgba(180,190,200,0.2)');
      ctx.fillStyle = bg;
      ctx.strokeStyle = 'rgba(150,160,170,0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(col.x + 5, col.y + 5);
    ctx.lineTo(col.x + 5, colBottom - 5);
    ctx.stroke();
    ctx.restore();
  },

  drawThermometer: function(ctx, col, state) {
    ctx.save();
    var tx = col.x + col.width + 12;
    var ty = col.y - 5;
    var th = 70;
    var bw = 10;
    var bulbR = 6;
    ctx.fillStyle = 'rgba(230,230,235,0.8)';
    ctx.strokeStyle = 'rgba(150,150,160,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tx - bw / 2, ty + 3);
    ctx.arcTo(tx - bw / 2, ty, tx - bw / 2 + 3, ty, 3);
    ctx.arcTo(tx + bw / 2, ty, tx + bw / 2, ty + 3, 3);
    ctx.lineTo(tx + bw / 2, ty + th - bulbR);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var temp = state.distTemperature || 25;
    var fillH = Math.min(th - bulbR - 6, (temp / 110) * (th - bulbR - 6));
    ctx.fillStyle = '#e63946';
    ctx.fillRect(tx - 1.5, ty + th - bulbR - fillH, 3, fillH);
    ctx.beginPath();
    ctx.arc(tx, ty + th, bulbR, 0, Math.PI * 2);
    ctx.fillStyle = '#e63946';
    ctx.fill();
    ctx.strokeStyle = 'rgba(150,150,160,0.6)';
    ctx.stroke();
    for (var i = 0; i <= 10; i++) {
      var markY = ty + th - bulbR - (i / 10) * (th - bulbR - 6);
      var markW = i % 5 === 0 ? 6 : 3;
      ctx.strokeStyle = 'rgba(100,100,100,0.5)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(tx + bw / 2, markY);
      ctx.lineTo(tx + bw / 2 + markW, markY);
      ctx.stroke();
    }
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(temp.toFixed(1) + ' \u00B0C', tx + 14, ty + th / 2);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText('(simulated)', tx + 14, ty + th / 2 + 14);
    if (state.distThermometerOk) {
      ctx.fillStyle = 'rgba(40,167,69,0.8)';
      ctx.beginPath();
      ctx.arc(tx - 14, ty + th / 2, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('\u2713', tx - 17.5, ty + th / 2 + 3.5);
    }
    ctx.restore();
  },

  drawCondenser: function(ctx, cd, state) {
    ctx.save();
    var dx = cd.x2 - cd.x1;
    var dy = cd.y2 - cd.y1;
    var len = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    ctx.translate(cd.x1, cd.y1);
    ctx.rotate(angle);
    var ow = cd.width;
    var iw = cd.innerW;
    var wg = ctx.createLinearGradient(0, -ow / 2, 0, ow / 2);
    wg.addColorStop(0, 'rgba(180,210,240,0.15)');
    wg.addColorStop(0.5, 'rgba(200,225,250,0.1)');
    wg.addColorStop(1, 'rgba(180,210,240,0.15)');
    ctx.fillStyle = wg;
    ctx.strokeStyle = 'rgba(100,150,200,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(0, -ow / 2, len, ow);
    ctx.fill();
    ctx.stroke();
    if (state.distCondenserOk) {
      ctx.fillStyle = 'rgba(100,180,240,0.2)';
      ctx.beginPath();
      ctx.rect(2, -ow / 2 + 2, len - 4, ow - 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(70,130,200,0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, -ow / 2);
      ctx.lineTo(0, ow / 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(len, -ow / 2);
      ctx.lineTo(len, ow / 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(50,120,200,0.6)';
      ctx.font = '9px sans-serif';
      ctx.fillText('water in', -5, -ow / 2 - 6);
      ctx.fillText('water out', len - 25, -ow / 2 - 6);
    }
    ctx.fillStyle = 'rgba(220,235,245,0.3)';
    ctx.strokeStyle = 'rgba(160,180,200,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(5, -iw / 2, len - 10, iw);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, -iw / 2 + 1);
    ctx.lineTo(len - 15, -iw / 2 + 1);
    ctx.stroke();
    ctx.restore();
  },

  drawReceiver: function(ctx, rc, state) {
    ctx.save();
    var cx = rc.cx;
    var neckTop = rc.cy - rc.bodyR - rc.neckH;
    var neckBot = rc.cy - rc.bodyR;
    var r = rc.bodyR;
    ctx.strokeStyle = 'rgba(100,130,160,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - rc.neckW / 2, neckTop);
    ctx.lineTo(cx - rc.neckW / 2, neckBot);
    ctx.quadraticCurveTo(cx - rc.neckW / 2 - 8, neckBot + 12, cx - r, rc.cy);
    ctx.arc(cx, rc.cy, r, Math.PI, 0, false);
    ctx.quadraticCurveTo(cx + rc.neckW / 2 + 8, neckBot + 12, cx + rc.neckW / 2, neckBot);
    ctx.lineTo(cx + rc.neckW / 2, neckTop);
    ctx.closePath();
    var gg = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
    gg.addColorStop(0, 'rgba(200,220,240,0.25)');
    gg.addColorStop(0.3, 'rgba(255,255,255,0.12)');
    gg.addColorStop(0.7, 'rgba(255,255,255,0.08)');
    gg.addColorStop(1, 'rgba(200,220,240,0.2)');
    ctx.fillStyle = gg;
    ctx.fill();
    ctx.stroke();
    if (state.distCollected) {
      var collectH = r * 0.8;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, rc.cy, r - 3, 0, Math.PI * 2);
      ctx.clip();
      var lg = ctx.createLinearGradient(0, rc.cy + r - collectH, 0, rc.cy + r);
      lg.addColorStop(0, 'rgba(180,210,245,0.4)');
      lg.addColorStop(1, 'rgba(160,195,235,0.55)');
      ctx.fillStyle = lg;
      ctx.fillRect(cx - r, rc.cy + r - collectH, r * 2, collectH);
      ctx.restore();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - r + 8, rc.cy - r * 0.4);
    ctx.lineTo(cx - r + 6, rc.cy + r * 0.4);
    ctx.stroke();
    ctx.restore();
  },

  drawLabels: function(ctx, sim) {
    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillText('Round-bottom flask', sim.flask.cx, sim.flask.cy + sim.flask.bodyR + 18);
    ctx.fillText('Bunsen burner', sim.burner.cx, sim.burner.baseY + 22);
    ctx.fillText('Fractionating column', sim.column.x + sim.column.width / 2, sim.column.y - 12);
    ctx.fillText('Thermometer', sim.column.x + sim.column.width + 12, sim.column.y - 18);
    var cdMX = (sim.condenser.x1 + sim.condenser.x2) / 2;
    var cdMY = (sim.condenser.y1 + sim.condenser.y2) / 2;
    var cdA = Math.atan2(sim.condenser.y2 - sim.condenser.y1, sim.condenser.x2 - sim.condenser.x1);
    ctx.save();
    ctx.translate(cdMX, cdMY - 16);
    ctx.rotate(cdA);
    ctx.fillText('Condenser', 0, 0);
    ctx.restore();
    ctx.fillText('Receiving flask', sim.receiver.cx, sim.receiver.cy + sim.receiver.bodyR + 18);
    ctx.fillText('Retort stand', sim.stand.rodX, sim.stand.rodTop - 5);
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
    ctx.fillStyle = 'rgba(200,220,255,0.3)';
    ctx.fillRect(sim.column.x + 3, vapourY, sim.column.width - 6, colBottom - vapourY);
    if (progress > 0.3) {
      var dropP = (progress - 0.3) / 0.7;
      var dx = sim.condenser.x2 - sim.condenser.x1;
      var dy = sim.condenser.y2 - sim.condenser.y1;
      var dropX = sim.condenser.x1 + dropP * dx;
      var dropY = sim.condenser.y1 + dropP * dy;
      ctx.fillStyle = 'rgba(180,210,240,0.6)';
      ctx.beginPath();
      ctx.arc(dropX, dropY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    if (progress > 0.5) {
      var collectH = (progress - 0.5) * 2 * sim.receiver.bodyR * 0.8;
      ctx.save();
      ctx.beginPath();
      ctx.arc(sim.receiver.cx, sim.receiver.cy, sim.receiver.bodyR - 3, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = sim.firstFraction.color;
      ctx.fillRect(sim.receiver.cx - sim.receiver.bodyR, sim.receiver.cy + sim.receiver.bodyR - collectH, sim.receiver.bodyR * 2, collectH);
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
