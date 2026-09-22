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

  /* Canvas Drawing */
  draw: function(canvas, ctx, state, exp) {
    var sim = SIMULATION_CONFIG['A1'];
    if (!sim) return;
    var cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    this.drawStand(ctx, sim.stand);
    this.drawBurner(ctx, sim.burner, state);
    this.drawFlask(ctx, sim.flask, state);
    this.drawColumn(ctx, sim.column);
    this.drawThermometer(ctx, sim.column, state);
    this.drawCondenser(ctx, sim.condenser, state);
    this.drawReceiver(ctx, sim.receiver, state);
    this.drawClamps(ctx, sim);

    if (state.simulation && (state.currentStage === 'monitor' || state.currentStage === 'observe' || state.currentStage === 'collect')) {
      this.drawAnimation(ctx, sim, state, canvas);
    }
  },

  drawStand: function(ctx, s) {
    ctx.save();
    ctx.fillStyle = '#555';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.fillRect(s.baseX, s.baseY, s.baseW, 12);
    ctx.strokeRect(s.baseX, s.baseY, s.baseW, 12);
    ctx.fillRect(s.baseX + s.baseW / 2 - 5, s.baseY - 5, 10, 8);
    ctx.fillStyle = '#666';
    ctx.fillRect(s.rodX - 3, s.rodTop, 6, s.rodBot - s.rodTop);
    ctx.strokeStyle = '#555';
    ctx.strokeRect(s.rodX - 3, s.rodTop, 6, s.rodBot - s.rodTop);
    ctx.fillStyle = '#777';
    ctx.fillRect(s.rodX - 5, s.rodTop, 10, 6);
    ctx.restore();
  },

  drawClamps: function(ctx, sim) {
    var cf = sim.clampFlask;
    var cc = sim.clampColumn;
    ctx.save();
    ctx.fillStyle = '#777';
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.fillRect(cf.x, cf.y, cf.w, cf.h);
    ctx.strokeRect(cf.x, cf.y, cf.w, cf.h);
    ctx.fillRect(cf.x - 4, cf.y + 1, 8, cf.h - 2);
    ctx.fillRect(cf.x + cf.w - 4, cf.y + 1, 8, cf.h - 2);
    ctx.fillRect(cc.x, cc.y, cc.w, cc.h);
    ctx.strokeRect(cc.x, cc.y, cc.w, cc.h);
    ctx.fillRect(cc.x - 4, cc.y + 1, 8, cc.h - 2);
    ctx.fillRect(cc.x + cc.w - 4, cc.y + 1, 8, cc.h - 2);
    ctx.restore();
  },

  drawBurner: function(ctx, b, state) {
    var cx = b.x + b.baseW / 2;
    ctx.save();
    ctx.fillStyle = '#555';
    ctx.fillRect(b.x, b.y, b.baseW, 10);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.strokeRect(b.x, b.y, b.baseW, 10);
    ctx.fillStyle = '#888';
    ctx.fillRect(cx - 5, b.y - b.stemH, 10, b.stemH);
    ctx.fillStyle = '#666';
    ctx.fillRect(cx - 8, b.y - b.stemH - 3, 16, 5);
    if (state.distHeating || (state.simulation && !state.simulation.done)) {
      var t = Date.now() / 100;
      for (var i = 0; i < 7; i++) {
        var fx = cx - 10 + Math.random() * 20;
        var fh = b.flameH * (0.4 + Math.random() * 0.6);
        var flicker = Math.sin(t + i * 2) * 2;
        var colors = ['rgba(255, 100, 0, 0.8)', 'rgba(255, 150, 30, 0.7)', 'rgba(255, 200, 50, 0.6)', 'rgba(255, 255, 150, 0.4)'];
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(fx, b.y - b.stemH - 3);
        ctx.quadraticCurveTo(fx + flicker, b.y - b.stemH - 3 - fh * 0.6, fx, b.y - b.stemH - 3 - fh);
        ctx.quadraticCurveTo(fx - flicker, b.y - b.stemH - 3 - fh * 0.6, fx, b.y - b.stemH - 3);
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(cx - 5, b.y - b.stemH - 3);
      ctx.quadraticCurveTo(cx, b.y - b.stemH - 3 - b.flameH * 0.25, cx + 5, b.y - b.stemH - 3);
      ctx.fill();
    }
    ctx.restore();
  },

  drawFlask: function(ctx, f, state) {
    ctx.save();
    var cx = f.x + f.width / 2;
    var bodyTop = f.y + f.neckH;
    var bodyH = f.height - f.neckH;
    var glassGrad = ctx.createLinearGradient(f.x, f.y, f.x + f.width, f.y);
    glassGrad.addColorStop(0, 'rgba(200, 220, 240, 0.25)');
    glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.15)');
    glassGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
    glassGrad.addColorStop(1, 'rgba(200, 220, 240, 0.2)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100, 130, 160, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - f.neckW / 2, f.y);
    ctx.lineTo(cx - f.neckW / 2, bodyTop);
    ctx.quadraticCurveTo(cx - f.neckW / 2, bodyTop + bodyH * 0.15, f.x, bodyTop + bodyH * 0.4);
    ctx.quadraticCurveTo(f.x - 5, bodyTop + bodyH * 0.85, cx - f.width * 0.15, f.y + f.height - 5);
    ctx.quadraticCurveTo(cx, f.y + f.height + 5, cx + f.width * 0.15, f.y + f.height - 5);
    ctx.quadraticCurveTo(f.x + f.width + 5, bodyTop + bodyH * 0.85, f.x + f.width, bodyTop + bodyH * 0.4);
    ctx.quadraticCurveTo(cx + f.neckW / 2, bodyTop + bodyH * 0.15, cx + f.neckW / 2, bodyTop);
    ctx.lineTo(cx + f.neckW / 2, f.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var liquidH = bodyH * 0.45;
    var liquidTop = f.y + f.height - liquidH;
    ctx.fillStyle = 'rgba(180, 210, 245, 0.45)';
    ctx.beginPath();
    ctx.moveTo(f.x + 8, liquidTop);
    ctx.quadraticCurveTo(f.x + 2, liquidTop + liquidH * 0.5, cx - f.width * 0.15, f.y + f.height - 5);
    ctx.quadraticCurveTo(cx, f.y + f.height + 3, cx + f.width * 0.15, f.y + f.height - 5);
    ctx.quadraticCurveTo(f.x + f.width - 2, liquidTop + liquidH * 0.5, f.x + f.width - 8, liquidTop);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(150, 180, 210, 0.4)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(f.x + 15, bodyTop + bodyH * 0.2);
    ctx.quadraticCurveTo(f.x + 12, bodyTop + bodyH * 0.5, f.x + 18, bodyTop + bodyH * 0.7);
    ctx.stroke();
    ctx.restore();
  },

  drawColumn: function(ctx, col) {
    ctx.save();
    var glassGrad = ctx.createLinearGradient(col.x, 0, col.x + col.width, 0);
    glassGrad.addColorStop(0, 'rgba(200, 220, 240, 0.25)');
    glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.12)');
    glassGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
    glassGrad.addColorStop(1, 'rgba(200, 220, 240, 0.2)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100, 130, 160, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(col.x, col.y, col.width, col.height);
    ctx.fill();
    ctx.stroke();
    var beadCount = Math.floor(col.height / 18);
    for (var i = 0; i < beadCount; i++) {
      var bx = col.x + 4 + (i % 3) * ((col.width - 8) / 3) + ((col.width - 8) / 6);
      var by = col.y + 12 + i * 18;
      var grad = ctx.createRadialGradient(bx, by, 0, bx, by, 5);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      grad.addColorStop(0.5, 'rgba(200, 210, 220, 0.4)');
      grad.addColorStop(1, 'rgba(180, 190, 200, 0.2)');
      ctx.fillStyle = grad;
      ctx.strokeStyle = 'rgba(150, 160, 170, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(col.x + 5, col.y + 5);
    ctx.lineTo(col.x + 5, col.y + col.height - 5);
    ctx.stroke();
    ctx.restore();
  },

  drawThermometer: function(ctx, col, state) {
    ctx.save();
    var tx = col.x + col.width + 10;
    var ty = col.y - 5;
    var th = 70;
    var bw = 10;
    var bulbR = 6;
    ctx.fillStyle = 'rgba(230, 230, 235, 0.8)';
    ctx.strokeStyle = 'rgba(150, 150, 160, 0.6)';
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
    ctx.strokeStyle = 'rgba(150, 150, 160, 0.6)';
    ctx.stroke();
    for (var i = 0; i <= 10; i++) {
      var markY = ty + th - bulbR - (i / 10) * (th - bulbR - 6);
      var markW = i % 5 === 0 ? 6 : 3;
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
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
      ctx.fillStyle = 'rgba(40, 167, 69, 0.8)';
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
    var waterGrad = ctx.createLinearGradient(0, -ow / 2, 0, ow / 2);
    waterGrad.addColorStop(0, 'rgba(180, 210, 240, 0.15)');
    waterGrad.addColorStop(0.5, 'rgba(200, 225, 250, 0.1)');
    waterGrad.addColorStop(1, 'rgba(180, 210, 240, 0.15)');
    ctx.fillStyle = waterGrad;
    ctx.strokeStyle = 'rgba(100, 150, 200, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(0, -ow / 2, len, ow);
    ctx.fill();
    ctx.stroke();
    if (state.distCondenserOk) {
      ctx.fillStyle = 'rgba(100, 180, 240, 0.2)';
      ctx.beginPath();
      ctx.rect(2, -ow / 2 + 2, len - 4, ow - 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(70, 130, 200, 0.5)';
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
      ctx.fillStyle = 'rgba(50, 120, 200, 0.6)';
      ctx.font = '9px sans-serif';
      ctx.fillText('water in', -5, -ow / 2 - 6);
      ctx.fillText('water out', len - 25, -ow / 2 - 6);
    }
    ctx.fillStyle = 'rgba(220, 235, 245, 0.3)';
    ctx.strokeStyle = 'rgba(160, 180, 200, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(5, -iw / 2, len - 10, iw);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, -iw / 2 + 1);
    ctx.lineTo(len - 15, -iw / 2 + 1);
    ctx.stroke();
    ctx.restore();
  },

  drawReceiver: function(ctx, rc, state) {
    ctx.save();
    var cx = rc.x + rc.width / 2;
    var bodyTop = rc.y + rc.neckH;
    var bodyH = rc.height - rc.neckH;
    var glassGrad = ctx.createLinearGradient(rc.x, rc.y, rc.x + rc.width, rc.y);
    glassGrad.addColorStop(0, 'rgba(200, 220, 240, 0.25)');
    glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.12)');
    glassGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
    glassGrad.addColorStop(1, 'rgba(200, 220, 240, 0.2)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100, 130, 160, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - rc.neckW / 2, rc.y);
    ctx.lineTo(cx - rc.neckW / 2, bodyTop);
    ctx.lineTo(rc.x + 5, rc.y + rc.height - 5);
    ctx.quadraticCurveTo(cx, rc.y + rc.height + 3, rc.x + rc.width - 5, rc.y + rc.height - 5);
    ctx.lineTo(cx + rc.neckW / 2, bodyTop);
    ctx.lineTo(cx + rc.neckW / 2, rc.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (state.distCollected) {
      var collectH = bodyH * 0.4;
      ctx.fillStyle = 'rgba(180, 210, 245, 0.45)';
      ctx.beginPath();
      ctx.moveTo(rc.x + 10, rc.y + rc.height - collectH);
      ctx.lineTo(rc.x + 5, rc.y + rc.height - 5);
      ctx.quadraticCurveTo(cx, rc.y + rc.height + 2, rc.x + rc.width - 5, rc.y + rc.height - 5);
      ctx.lineTo(rc.x + rc.width - 10, rc.y + rc.height - collectH);
      ctx.closePath();
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rc.x + 12, bodyTop + 5);
    ctx.lineTo(rc.x + 10, rc.y + rc.height - 15);
    ctx.stroke();
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

    var col = sim.column;
    var vapourY = col.y + col.height - progress * col.height;
    ctx.fillStyle = 'rgba(200, 220, 255, 0.3)';
    ctx.fillRect(col.x + 3, vapourY, col.width - 6, col.y + col.height - vapourY);

    var cd = sim.condenser;
    if (progress > 0.3) {
      var dropProgress = (progress - 0.3) / 0.7;
      var dx = cd.x2 - cd.x1;
      var dy = cd.y2 - cd.y1;
      var dropX = cd.x1 + dropProgress * dx;
      var dropY = cd.y1 + dropProgress * dy;
      ctx.fillStyle = 'rgba(180, 210, 240, 0.6)';
      ctx.beginPath();
      ctx.arc(dropX, dropY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    var rc = sim.receiver;
    if (progress > 0.5) {
      var collectH = (progress - 0.5) * 2 * (rc.height - rc.neckH) * 0.4;
      ctx.fillStyle = sim.firstFraction.color;
      ctx.beginPath();
      var rcx = rc.x + rc.width / 2;
      ctx.moveTo(rcx - 20, rc.y + rc.height - collectH);
      ctx.lineTo(rc.x + 5, rc.y + rc.height - 5);
      ctx.quadraticCurveTo(rcx, rc.y + rc.height + 2, rc.x + rc.width - 5, rc.y + rc.height - 5);
      ctx.lineTo(rcx + 20, rc.y + rc.height - collectH);
      ctx.closePath();
      ctx.fill();
    }

    if (progress < 1) {
      var self = this;
      requestAnimationFrame(function() { self.draw(canvas, ctx, state, state.experiment); });
    } else {
      state.simulation.done = true;
      state.distTemperature = sim.secondFraction.boilingPoint;
    }
  },

  /* Canvas Click Handling */
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
