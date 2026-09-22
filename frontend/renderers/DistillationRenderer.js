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

    var f = sim.flask;
    var col = sim.column;
    var cd = sim.condenser;
    var rc = sim.receiver;

    this.drawFlask(ctx, f, state);
    this.drawColumn(ctx, col);
    this.drawThermometer(ctx, col, state);
    this.drawCondenser(ctx, cd, state);
    this.drawReceiver(ctx, rc, state);
    this.drawConnections(ctx, f, col, cd, rc);

    if (state.currentStage === 'startHeating' || state.currentStage === 'monitor') {
      this.drawHeating(ctx, f);
    }
    if (state.simulation && (state.currentStage === 'monitor' || state.currentStage === 'observe' || state.currentStage === 'collect')) {
      this.drawAnimation(ctx, f, col, cd, rc, sim, state, canvas);
    }
  },

  drawFlask: function(ctx, f, state) {
    ctx.fillStyle = '#f0f0f0';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2, f.height * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);
    ctx.strokeRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);

    ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
    ctx.beginPath();
    ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2 - 3, f.height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('round-bottom flask', f.x - 10, f.y + f.height + 15);
  },

  drawColumn: function(ctx, col) {
    ctx.fillStyle = '#e8e8e8';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.fillRect(col.x, col.y, col.width, col.height);
    ctx.strokeRect(col.x, col.y, col.width, col.height);

    ctx.fillStyle = '#bbb';
    for (var i = 0; i < 6; i++) {
      var by = col.y + 15 + i * 25;
      ctx.beginPath();
      ctx.arc(col.x + col.width / 2, by, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('fractionating column', col.x - 20, col.y + col.height + 15);
  },

  drawThermometer: function(ctx, col, state) {
    var tx = col.x + col.width + 8;
    var ty = col.y + 5;
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(tx, ty, 4, 40);
    ctx.fillStyle = '#ddd';
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.fillRect(tx - 2, ty, 8, 40);
    ctx.strokeRect(tx - 2, ty, 8, 40);
    ctx.beginPath();
    ctx.arc(tx + 2, ty + 42, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4444';
    ctx.fill();
    ctx.stroke();

    var temp = state.distTemperature || 25;
    var fillH = Math.min(35, (temp / 110) * 35);
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(tx, ty + 40 - fillH, 4, fillH);

    ctx.fillStyle = '#333';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(temp.toFixed(1) + ' °C', tx + 12, ty + 25);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText('(simulated)', tx + 12, ty + 37);

    if (state.distThermometerOk) {
      ctx.fillStyle = 'rgba(40, 167, 69, 0.7)';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('✓', tx - 15, ty + 25);
    }
  },

  drawCondenser: function(ctx, cd, state) {
    ctx.fillStyle = '#d0e8f0';
    ctx.strokeStyle = '#6aa0cc';
    ctx.lineWidth = 1.5;
    ctx.fillRect(cd.x, cd.y, cd.width, cd.height);
    ctx.strokeRect(cd.x, cd.y, cd.width, cd.height);

    ctx.strokeStyle = '#4a90d9';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cd.x + 5, cd.y + cd.height / 2);
    ctx.lineTo(cd.x + cd.width - 5, cd.y + cd.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    if (state.distCondenserOk) {
      ctx.fillStyle = 'rgba(74, 144, 217, 0.4)';
      ctx.fillRect(cd.x + 2, cd.y + 2, cd.width - 4, cd.height - 4);
      ctx.fillStyle = '#4a90d9';
      ctx.font = '9px sans-serif';
      ctx.fillText('water flow \u2192', cd.x + cd.width / 2 - 20, cd.y + cd.height / 2 + 3);
    }

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('condenser', cd.x + cd.width / 2 - 20, cd.y - 5);
  },

  drawReceiver: function(ctx, rc, state) {
    ctx.fillStyle = '#f8f8f8';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.fillRect(rc.x, rc.y, rc.width, rc.height);
    ctx.strokeRect(rc.x, rc.y, rc.width, rc.height);

    if (state.distCollected) {
      ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
      ctx.fillRect(rc.x + 3, rc.y + rc.height * 0.5, rc.width - 6, rc.height * 0.45);
    }

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('receiving flask', rc.x - 5, rc.y + rc.height + 15);
  },

  drawConnections: function(ctx, f, col, cd, rc) {
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(f.x + f.width / 2, f.y);
    ctx.lineTo(col.x + col.width / 2, col.y + col.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(col.x + col.width, col.y + 10);
    ctx.lineTo(cd.x, cd.y + cd.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cd.x + cd.width, cd.y + cd.height / 2);
    ctx.lineTo(rc.x + rc.width / 2, rc.y);
    ctx.stroke();
  },

  drawHeating: function(ctx, f) {
    for (var i = 0; i < 5; i++) {
      var fx = f.x + f.width * 0.2 + Math.random() * f.width * 0.6;
      var fy = f.y + f.height + 5 + Math.random() * 10;
      ctx.fillStyle = 'rgba(255, 100, 0, 0.6)';
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx - 3, fy + 8 + Math.random() * 5);
      ctx.lineTo(fx + 3, fy + 8 + Math.random() * 5);
      ctx.closePath();
      ctx.fill();
    }
  },

  drawAnimation: function(ctx, f, col, cd, rc, sim, state, canvas) {
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

    var vapourY = col.y + col.height - progress * col.height;
    ctx.fillStyle = 'rgba(200, 220, 255, 0.3)';
    ctx.fillRect(col.x + 3, vapourY, col.width - 6, col.y + col.height - vapourY);

    if (progress > 0.3) {
      var dropProgress = (progress - 0.3) / 0.7;
      var dropX = cd.x + dropProgress * cd.width;
      ctx.fillStyle = 'rgba(180, 210, 240, 0.6)';
      ctx.beginPath();
      ctx.arc(dropX, cd.y + cd.height / 2, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    if (progress > 0.5) {
      var collectH = (progress - 0.5) * 2 * rc.height * 0.4;
      ctx.fillStyle = sim.firstFraction.color;
      ctx.fillRect(rc.x + 3, rc.y + rc.height - collectH - 3, rc.width - 6, collectH);
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
        var nearCondenser = mx >= cd.x - 10 && mx <= cd.x + cd.width + 10 && my >= cd.y - 15 && my <= cd.y + cd.height + 15;
        if (nearCondenser) {
          state.distCondenserOk = true;
        }
      }
    }
  }
};
