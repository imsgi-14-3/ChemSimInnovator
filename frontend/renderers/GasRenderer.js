var GasRenderer = {
  renderStage: function(stage, exp, state, appState) {
    var html = '';
    switch(stage) {
      case 'prepare': html = this.renderPrepare(exp, state); break;
      case 'selectGas': html = this.renderSelectGas(exp, state); break;
      case 'selectTest': html = this.renderSelectTest(exp, state); break;
      case 'performTest': html = this.renderPerformTest(exp, state); break;
      case 'observe': html = this.renderObserve(exp, state); break;
      case 'record': html = this.renderRecord(exp, state); break;
      case 'interpret': html = this.renderInterpret(exp, state); break;
      case 'confirm': html = this.renderConfirm(exp, state); break;
      case 'nextGas': html = this.renderNextGas(exp, state); break;
      case 'summary': html = this.renderSummary(exp, state); break;
      case 'conclude': html = this.renderConclude(exp, state); break;
      case 'complete': html = this.renderComplete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    html += LaboratoryWorkspace.renderCanvas();
    return html;
  },

  /* Gas identity card helper */
  gasCard: function(g, state, isActive) {
    var done = state.gasResults[g.id] && state.gasResults[g.id].confirmed;
    var cls = 'gas-card' + (done ? ' gas-card-done' : '') + (isActive ? ' gas-card-active' : '');
    var h = '<div class="' + cls + '">';
    h += '<div class="gas-card-icon" style="background:' + g.colour + ';">' + g.name + '</div>';
    h += '<div class="gas-card-body">';
    h += '<div class="gas-card-name">' + g.fullName + '</div>';
    h += '<div class="gas-card-formula">' + g.name + '</div>';
    if (done) {
      h += '<div class="gas-card-status gas-status-confirmed">&#10003; Confirmed</div>';
    } else if (isActive) {
      h += '<div class="gas-card-status gas-status-active">Testing now</div>';
    } else {
      h += '<div class="gas-card-status gas-status-pending">Pending</div>';
    }
    h += '</div></div>';
    return h;
  },

  /* Gas progress tracker */
  progressTracker: function(state) {
    var sim = SIMULATION_CONFIG['A5'];
    var h = '<div class="gas-tracker">';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var done = state.gasResults[g.id] && state.gasResults[g.id].confirmed;
      var active = state.gasCurrentIndex === i && !done;
      var cls = 'gas-tracker-item' + (done ? ' done' : '') + (active ? ' active' : '');
      h += '<div class="' + cls + '">';
      h += '<span class="gas-tracker-dot" style="background:' + (done ? '#2f7d4f' : active ? g.colour : '#ccc') + ';"></span>';
      h += '<span class="gas-tracker-label">' + g.name + '</span>';
      h += '</div>';
    }
    h += '</div>';
    return h;
  },

  renderPrepare: function(exp, state) {
    var sim = SIMULATION_CONFIG['A5'];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Prepare for Gas Detection</h3>';
    html += '<p>You will test three gases using appropriate chemical tests.</p>';
    html += '<div class="gas-prep-grid">';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      html += '<div class="gas-prep-card">';
      html += '<div class="gas-prep-icon" style="background:' + g.colour + ';">' + g.name + '</div>';
      html += '<div class="gas-prep-info">';
      html += '<strong>' + g.fullName + '</strong>';
      html += '<span class="gas-prep-test">' + g.correctTestLabel + '</span>';
      html += '</div></div>';
    }
    html += '</div>';
    html += '<p style="margin-top:1rem;">For each gas, you will:</p>';
    html += '<ul>';
    html += '<li>Select the gas to test</li>';
    html += '<li>Choose the correct chemical test</li>';
    html += '<li>Perform the virtual test and observe the result</li>';
    html += '<li>Record and interpret the evidence</li>';
    html += '<li>Confirm the gas identity</li>';
    html += '</ul>';
    html += '<div class="sim-note">All observations shown are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderSelectGas: function(exp, state) {
    var sim = SIMULATION_CONFIG['A5'];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Select a Gas</h3>';
    html += this.progressTracker(state);
    html += '<p>Choose the next gas to test.</p>';
    html += '<div class="gas-select-grid">';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var done = state.gasResults[g.id] && state.gasResults[g.id].confirmed;
      var active = state.gasCurrentIndex === i && !done;
      var cls = 'gas-select-card' + (done ? ' done' : '') + (active ? ' active' : '');
      html += '<button class="' + cls + '" data-gas="' + g.id + '" ' + (done ? 'disabled' : '') + '>';
      html += '<div class="gas-select-icon" style="background:' + g.colour + ';">' + g.name + '</div>';
      html += '<div class="gas-select-name">' + g.fullName + '</div>';
      html += '<div class="gas-select-formula">' + g.name + '</div>';
      if (done) {
        html += '<div class="gas-select-status confirmed">&#10003; Confirmed</div>';
      } else {
        html += '<div class="gas-select-status">Tap to test</div>';
      }
      html += '</button>';
    }
    html += '</div>';
    html += '</div>';
    return html;
  },

  renderSelectTest: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var html = '<div class="stage-card"><h3 class="stage-card-title">Select Test for ' + gas.name + '</h3>';
    html += '<div class="gas-target-banner">';
    html += '<div class="gas-target-icon" style="background:' + gas.colour + ';">' + gas.name + '</div>';
    html += '<div class="gas-target-info">';
    html += '<strong>' + gas.fullName + '</strong>';
    html += '<span>' + gas.name + '</span>';
    html += '</div></div>';
    html += '<p>Choose the correct test to identify <strong>' + gas.fullName + '</strong>.</p>';
    html += '<div class="gas-test-options">';
    for (var i = 0; i < gas.testOptions.length; i++) {
      var t = gas.testOptions[i];
      var icon = t.id === 'limewater' ? '&#129514;' : (t.id === 'damp_red_litmus' ? '&#128331;' : '&#128993;');
      html += '<button class="gas-test-btn" data-test="' + t.id + '">';
      html += '<span class="gas-test-icon">' + icon + '</span>';
      html += '<span class="gas-test-label">' + t.label + '</span>';
      html += '</button>';
    }
    html += '</div>';
    html += '<div class="sim-note">Select the most appropriate test for this gas.</div>';
    html += '</div>';
    return html;
  },

  renderPerformTest: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var res = state.gasResults[gas.id] || {};
    var selectedTest = res.selectedTest || gas.correctTest;
    var testLabel = gas.correctTestLabel;
    for (var t = 0; t < gas.testOptions.length; t++) {
      if (gas.testOptions[t].id === selectedTest) testLabel = gas.testOptions[t].label;
    }
    var isCorrect = selectedTest === gas.correctTest;

    var html = '<div class="stage-card"><h3 class="stage-card-title">Perform Test: ' + gas.name + '</h3>';
    html += '<div class="gas-target-banner">';
    html += '<div class="gas-target-icon" style="background:' + gas.colour + ';">' + gas.name + '</div>';
    html += '<div class="gas-target-info">';
    html += '<strong>' + gas.fullName + '</strong>';
    html += '<span>Test: ' + testLabel + '</span>';
    html += '</div></div>';

    if (state.gasTestPerformed && state.simulation && state.simulation.done) {
      if (isCorrect) {
        html += '<div class="feedback feedback-correct">&#10003; Correct test selected!</div>';
        html += '<div class="gas-observation-card">';
        html += '<div class="gas-obs-label">Observed Result</div>';
        html += '<div class="gas-obs-value">' + gas.observedChange + '</div>';
        html += '</div>';
      } else {
        html += '<div class="feedback feedback-incorrect">&#10007; That test is not appropriate for ' + gas.name + '.</div>';
        html += '<div class="gas-observation-card gas-obs-wrong">';
        html += '<div class="gas-obs-label">What Happened</div>';
        html += '<div class="gas-obs-value">No significant change was observed.</div>';
        html += '<div class="gas-obs-hint">The correct test for ' + gas.name + ' is <strong>' + gas.correctTestLabel + '</strong>.</div>';
        html += '</div>';
      }
      html += '<div class="sim-note">This is a simulated educational value.</div>';
    } else {
      html += '<div class="gas-perform-area">';
      html += '<div data-action="perform-test" class="btn btn-primary gas-perform-btn">Start Test</div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  },

  renderObserve: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var html = '<div class="stage-card"><h3 class="stage-card-title">Observe: ' + gas.name + '</h3>';
    html += '<div class="gas-target-banner">';
    html += '<div class="gas-target-icon" style="background:' + gas.colour + ';">' + gas.name + '</div>';
    html += '<div class="gas-target-info"><strong>' + gas.fullName + '</strong></div>';
    html += '</div>';
    html += '<div class="gas-observation-card">';
    html += '<div class="gas-obs-label">Simulated Observation</div>';
    html += '<div class="gas-obs-value">' + gas.observedChange + '</div>';
    html += '</div>';
    html += '<p style="margin-top:0.75rem;">Examine the evidence carefully. What does this observation tell you about the gas?</p>';
    html += '<div class="sim-note">The observation shown is a simulated educational value.</div>';
    html += '</div>';
    return html;
  },

  renderRecord: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var res = state.gasResults[gas.id] || {};
    var html = '<div class="stage-card"><h3 class="stage-card-title">Record Observation: ' + gas.name + '</h3>';
    html += '<p>Record what you observed during the test.</p>';
    html += '<div class="gas-obs-hint-box">';
    html += '<p><strong>Expected observation:</strong> ' + gas.observedChange + '</p>';
    html += '<p>Write your own description based on what you saw.</p>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">Your observation</label>';
    html += '<textarea id="gas-record-input" class="form-textarea" placeholder="Describe what you observed...">' +
      ChemSim.escapeHtml(res.recorded || '') + '</textarea></div>';
    html += '<div data-action="record-gas" class="btn btn-accent">Record & Continue</div>';
    html += '</div>';
    return html;
  },

  renderInterpret: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var res = state.gasResults[gas.id] || {};
    var html = '<div class="stage-card"><h3 class="stage-card-title">Interpret: ' + gas.name + '</h3>';
    html += '<p>Based on your observation, what does this tell you about the gas?</p>';
    html += '<div class="gas-interpret-guide">';
    html += '<p><strong>' + gas.name + ' (' + gas.fullName + ')</strong></p>';
    html += '<p>' + gas.explanation + '</p>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">Your interpretation</label>';
    html += '<textarea id="gas-interpret-input" class="form-textarea" placeholder="Write your interpretation here...">' +
      ChemSim.escapeHtml(res.interpretation || '') + '</textarea></div>';
    html += '<div data-action="interpret-gas" class="btn btn-accent">Submit Interpretation</div>';
    html += '</div>';
    return html;
  },

  renderConfirm: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var res = state.gasResults[gas.id] || {};
    var html = '<div class="stage-card"><h3 class="stage-card-title">Confirm: ' + gas.name + '</h3>';
    html += '<p>Based on your observation and interpretation, confirm the identity of the gas.</p>';
    html += '<div class="gas-confirm-evidence">';
    html += '<div class="gas-evidence-row"><span class="gas-evidence-label">Gas</span><span class="gas-evidence-value">' + gas.name + ' (' + gas.fullName + ')</span></div>';
    html += '<div class="gas-evidence-row"><span class="gas-evidence-label">Test</span><span class="gas-evidence-value">' + gas.correctTestLabel + '</span></div>';
    html += '<div class="gas-evidence-row"><span class="gas-evidence-label">Observation</span><span class="gas-evidence-value">' + ChemSim.escapeHtml(res.recorded || '-') + '</span></div>';
    html += '<div class="gas-evidence-row"><span class="gas-evidence-label">Interpretation</span><span class="gas-evidence-value">' + ChemSim.escapeHtml(res.interpretation || '-') + '</span></div>';
    html += '<div class="gas-evidence-row"><span class="gas-evidence-label">Expected</span><span class="gas-evidence-value">' + gas.observedChange + '</span></div>';
    html += '</div>';
    html += '<div data-action="confirm-gas" class="btn btn-primary">Confirm ' + gas.name + '</div>';
    html += '</div>';
    return html;
  },

  renderNextGas: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    var sim = SIMULATION_CONFIG['A5'];
    var confirmedCount = 0;
    for (var i = 0; i < sim.gases.length; i++) {
      if (state.gasResults[sim.gases[i].id] && state.gasResults[sim.gases[i].id].confirmed) confirmedCount++;
    }
    var html = '<div class="stage-card"><h3 class="stage-card-title">Gas Confirmed!</h3>';
    html += '<div class="gas-confirm-success">';
    html += '<div class="gas-confirm-icon" style="background:' + (gas ? gas.colour : '#2f7d4f') + ';">&#10003;</div>';
    html += '<div class="gas-confirm-text">';
    html += '<strong>' + (gas ? gas.fullName : '') + '</strong> has been confirmed.';
    html += '<span>' + (gas ? gas.explanation : '') + '</span>';
    html += '</div></div>';
    html += this.progressTracker(state);
    html += '<p style="margin-top:0.75rem;">Confirmed: ' + confirmedCount + ' / ' + sim.gases.length + ' gases</p>';
    if (confirmedCount < sim.gases.length) {
      html += '<div data-action="go-next-gas" class="btn btn-accent">Test Next Gas &rarr;</div>';
    } else {
      html += '<div data-action="go-summary" class="btn btn-primary">View Summary &rarr;</div>';
    }
    html += '</div>';
    return html;
  },

  renderSummary: function(exp, state) {
    var sim = SIMULATION_CONFIG['A5'];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Summary of Gas Tests</h3>';
    html += '<div class="gas-summary-cards">';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var res = state.gasResults[g.id] || {};
      var confirmed = !!res.confirmed;
      html += '<div class="gas-summary-card' + (confirmed ? ' confirmed' : '') + '">';
      html += '<div class="gas-summary-header">';
      html += '<div class="gas-summary-icon" style="background:' + g.colour + ';">' + g.name + '</div>';
      html += '<div class="gas-summary-status">' + (confirmed ? '&#10003; Confirmed' : '&#10007; Not confirmed') + '</div>';
      html += '</div>';
      html += '<div class="gas-summary-body">';
      html += '<p><strong>Test:</strong> ' + g.correctTestLabel + '</p>';
      html += '<p><strong>Observation:</strong> ' + ChemSim.escapeHtml(res.recorded || '-') + '</p>';
      html += '<p><strong>Interpretation:</strong> ' + ChemSim.escapeHtml(res.interpretation || '-') + '</p>';
      html += '</div></div>';
    }
    html += '</div>';
    html += '<div class="sim-note">All observations are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderConclude: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Conclusion</h3>';
    html += '<p>Write a conclusion summarising the detection and confirmation of all three gases.</p>';
    html += '<p>Your conclusion should address:</p>';
    html += '<ul>';
    html += '<li>Which gases were tested</li>';
    html += '<li>Which tests confirmed each gas</li>';
    html += '<li>The key observations for each gas</li>';
    html += '</ul>';
    html += '<div class="form-group"><label class="form-label">Your Conclusion</label>';
    html += '<textarea id="conclusion-input" class="form-textarea" placeholder="Write your conclusion here...">' +
      ChemSim.escapeHtml(state.conclusion || '') + '</textarea></div>';
    html += '</div>';
    return html;
  },

  renderComplete: function(exp, state) {
    var sim = SIMULATION_CONFIG['A5'];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Experiment Complete</h3>';
    html += '<div class="detail-row"><span class="detail-label">Practical</span><span class="detail-value">' + ChemSim.escapeHtml(exp.title) + '</span></div>';
    html += '<div class="detail-row"><span class="detail-label">Section</span><span class="detail-value">' + (exp.section.charAt(0).toUpperCase() + exp.section.slice(1)) + ' Practical</span></div>';
    html += '<div class="detail-row"><span class="detail-label">SLO</span><span class="detail-value">' + exp.slos.join(', ') + '</span></div>';
    html += '<hr class="divider">';
    html += '<div class="gas-summary-cards">';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var res = state.gasResults[g.id] || {};
      var confirmed = !!res.confirmed;
      html += '<div class="gas-summary-card' + (confirmed ? ' confirmed' : '') + '">';
      html += '<div class="gas-summary-header">';
      html += '<div class="gas-summary-icon" style="background:' + g.colour + ';">' + g.name + '</div>';
      html += '<div class="gas-summary-status">' + (confirmed ? '&#10003; Confirmed' : '-') + '</div>';
      html += '</div>';
      html += '<div class="gas-summary-body">';
      html += '<p><strong>Test:</strong> ' + g.correctTestLabel + '</p>';
      html += '<p><strong>Observation:</strong> ' + ChemSim.escapeHtml(res.recorded || '-') + '</p>';
      html += '<p><strong>Interpretation:</strong> ' + ChemSim.escapeHtml(res.interpretation || '-') + '</p>';
      html += '</div></div>';
    }
    html += '</div>';
    html += '<hr class="divider">';
    html += '<p class="detail-label">Your Conclusion</p><p>' + ChemSim.escapeHtml(state.conclusion || '-') + '</p>';
    html += '<div class="sim-note">All observations are simulated educational values.</div>';
    html += '<div data-action="finish-experiment" class="btn btn-primary" style="margin-top:1rem;">Finish Experiment</div>';
    html += '</div>';
    return html;
  },

  /* Helpers */
  getGasByIndex: function(index) {
    var sim = SIMULATION_CONFIG['A5'];
    if (!sim || !sim.gases[index]) return null;
    return sim.gases[index];
  },

  /* Canvas Drawing */
  animActive: function(state, stage) {
    if (stage !== 'performTest') return false;
    if (!state || !state.simulation || state.simulation.done) return false;
    return true;
  },

  lerpHex: function(c1, c2, t) {
    var a = parseInt(c1.substring(1), 16);
    var b = parseInt(c2.substring(1), 16);
    var r = Math.round(((a >> 16) & 255) + ((((b >> 16) & 255) - ((a >> 16) & 255)) * t));
    var g = Math.round(((a >> 8) & 255) + ((((b >> 8) & 255) - ((a >> 8) & 255)) * t));
    var bl = Math.round((a & 255) + (((b & 255) - (a & 255)) * t));
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  },

  draw: function(canvas, ctx, state, exp) {
    if (state.currentStage !== 'performTest') return;
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return;
    var sim = SIMULATION_CONFIG['A5'];
    var gasConfig = null;
    for (var i = 0; i < sim.gases.length; i++) {
      if (sim.gases[i].id === gas.id) { gasConfig = sim.gases[i]; break; }
    }
    if (!gasConfig) return;
    var cw = canvas.width, ch = canvas.height;
    var cx = cw / 2;

    var now = Date.now();
    var prog = 0;
    if (state.simulation) {
      prog = state.simulation.done ? 1 : Math.max(0, Math.min(1, (now - state.simulation.startTime) / 2500));
    }
    var results = (state.gasResults && state.gasResults[gas.id]) ? state.gasResults[gas.id] : null;
    var testId = gas.correctTest;
    if (results && results.selectedTest) testId = results.selectedTest;
    if (state.simulation && state.simulation.testId) testId = state.simulation.testId;
    var testLabel = gas.correctTestLabel;
    for (var t = 0; t < gas.testOptions.length; t++) {
      if (gas.testOptions[t].id === testId) testLabel = gas.testOptions[t].label;
    }
    var isLime = testId === 'limewater';
    var flowProg = Math.max(0, Math.min(1, (prog - 0.05) / 0.85));
    var colourT = Math.max(0, Math.min(1, (prog - 0.55) / 0.35));

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = '#e8edf2';
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = '#dde5ec';
    ctx.fillRect(0, 0, cw, 500);
    ctx.fillStyle = '#c9b79a';
    ctx.fillRect(0, 500, cw, 34);
    ctx.fillStyle = '#b3a184';
    ctx.fillRect(0, 534, cw, ch - 534);

    /* Title banner */
    var bannerW = 380, bannerH = 40, bannerX = cx - bannerW / 2, bannerY = 10;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = gas.colour;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bannerX + 6, bannerY);
    ctx.arcTo(bannerX + bannerW, bannerY, bannerX + bannerW, bannerY + bannerH, 6);
    ctx.arcTo(bannerX + bannerW, bannerY + bannerH, bannerX, bannerY + bannerH, 6);
    ctx.arcTo(bannerX, bannerY + bannerH, bannerX, bannerY, 6);
    ctx.arcTo(bannerX, bannerY, bannerX + bannerW, bannerY, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#222';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(gas.name + ' \u2014 ' + testLabel, cx, bannerY + 25);

    /* Gas jar */
    var gx = 95, gBase = 500, gW = 104, gH = 86, gNeckW = 28, gNeckH = 46;
    var gLeft = gx - gW / 2;
    var gRight = gx + gW / 2;
    var gBodyTop = gBase - gH;
    var gNeckTop = gBodyTop - gNeckH;

    ctx.save();
    var gGrad = ctx.createLinearGradient(gLeft, 0, gRight, 0);
    gGrad.addColorStop(0, 'rgba(150,188,220,0.4)');
    gGrad.addColorStop(0.2, 'rgba(255,255,255,0.15)');
    gGrad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    gGrad.addColorStop(0.8, 'rgba(255,255,255,0.12)');
    gGrad.addColorStop(1, 'rgba(150,188,220,0.38)');
    ctx.fillStyle = gGrad;
    ctx.strokeStyle = 'rgba(70,110,150,0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx - gNeckW / 2, gNeckTop);
    ctx.lineTo(gx - gNeckW / 2, gBodyTop);
    ctx.lineTo(gLeft + 12, gBodyTop);
    ctx.quadraticCurveTo(gLeft, gBodyTop, gLeft, gBodyTop + 12);
    ctx.lineTo(gLeft, gBase - 8);
    ctx.quadraticCurveTo(gLeft, gBase, gLeft + 10, gBase);
    ctx.lineTo(gRight - 10, gBase);
    ctx.quadraticCurveTo(gRight, gBase, gRight, gBase - 8);
    ctx.lineTo(gRight, gBodyTop + 12);
    ctx.quadraticCurveTo(gRight, gBodyTop, gRight - 12, gBodyTop);
    ctx.lineTo(gx + gNeckW / 2, gBodyTop);
    ctx.lineTo(gx + gNeckW / 2, gNeckTop);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.clip();
    var genLiqTop = gBodyTop + 34;
    ctx.fillStyle = 'rgba(90,150,205,0.4)';
    ctx.fillRect(gLeft, genLiqTop, gW, gBase - genLiqTop);
    ctx.fillStyle = 'rgba(120,175,225,0.5)';
    ctx.beginPath();
    ctx.ellipse(gx, genLiqTop, gW / 2 - 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    if (prog > 0.03 && prog < 0.98) {
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      for (var bi = 0; bi < 4; bi++) {
        var bp = ((now / 700) + bi * 0.25) % 1;
        var bxx = gx - 22 + bi * 14 + Math.sin(now / 300 + bi) * 3;
        var byy = gBase - 8 - bp * (gBase - 8 - genLiqTop - 6);
        ctx.beginPath();
        ctx.arc(bxx, byy, 2 + (bi % 2), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    ctx.fillStyle = '#a8804f';
    ctx.strokeStyle = '#7d5f39';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx - gNeckW / 2 - 3, gNeckTop - 12);
    ctx.lineTo(gx + gNeckW / 2 + 3, gNeckTop - 12);
    ctx.lineTo(gx + gNeckW / 2, gNeckTop + 2);
    ctx.lineTo(gx - gNeckW / 2, gNeckTop + 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    /* Test apparatus */
    if (isLime) {
      this.drawRack(ctx, 420, 500);
      this.drawLimeTube(ctx, 420, 300, 470, gasConfig, colourT, prog, now);
    } else {
      this.drawLitmusJar(ctx, 418, gasConfig, colourT, flowProg, now);
    }

    /* Delivery tube */
    ctx.save();
    ctx.strokeStyle = 'rgba(125,145,165,0.9)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(gx, gNeckTop - 8);
    if (isLime) {
      ctx.bezierCurveTo(200, 250, 330, 275, 420, 302);
      ctx.lineTo(420, 448);
    } else {
      ctx.bezierCurveTo(210, 240, 330, 258, 390, 272);
      ctx.lineTo(390, 452);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    /* Status banner */
    ctx.textAlign = 'center';
    if (!state.simulation) {
      ctx.fillStyle = '#556';
      ctx.font = '12px sans-serif';
      ctx.fillText('Click "Start Test" to begin the simulation', cx, 580);
    } else if (!state.simulation.done) {
      ctx.fillStyle = '#345';
      ctx.font = '12px sans-serif';
      ctx.fillText('Simulating\u2026 ' + Math.round(prog * 100) + '%', cx, 580);
    } else {
      var bw = 400, bh = 44;
      var bx2 = cx - bw / 2, by2 = 556;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#2f7d4f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx2 + 8, by2);
      ctx.arcTo(bx2 + bw, by2, bx2 + bw, by2 + bh, 8);
      ctx.arcTo(bx2 + bw, by2 + bh, bx2, by2 + bh, 8);
      ctx.arcTo(bx2, by2 + bh, bx2, by2, 8);
      ctx.arcTo(bx2, by2, bx2 + bw, by2, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1d5e38';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Observed: ' + gas.observedChange, cx, by2 + 27);
    }

    ctx.fillStyle = '#888';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.textAlign = 'center';
  },

  drawRack: function(ctx, cx, benchY) {
    ctx.save();
    ctx.fillStyle = '#8a6b45';
    ctx.strokeStyle = '#6f5435';
    ctx.lineWidth = 1;
    ctx.fillRect(cx - 55, benchY - 30, 110, 30);
    ctx.strokeRect(cx - 55, benchY - 30, 110, 30);
    ctx.fillStyle = '#94734c';
    ctx.fillRect(cx - 50, 330, 100, 140);
    ctx.strokeRect(cx - 50, 330, 100, 140);
    ctx.fillStyle = '#8a6b45';
    ctx.fillRect(cx - 52, 336, 104, 16);
    ctx.strokeRect(cx - 52, 336, 104, 16);
    ctx.restore();
  },

  drawLimeTube: function(ctx, cx, top, bot, gasConfig, colourT, prog, now) {
    var w = 40, l = cx - w / 2, r = cx + w / 2;
    var liqTop = 400;
    ctx.save();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(l, top);
    ctx.lineTo(l, bot - 14);
    ctx.quadraticCurveTo(l, bot, cx, bot);
    ctx.quadraticCurveTo(r, bot, r, bot - 14);
    ctx.lineTo(r, top);
    ctx.closePath();
    ctx.clip();
    var limeCol = this.lerpHex('#c8dae2', gasConfig.limeColourAfter || '#dfe8ea', colourT);
    ctx.globalAlpha = 0.55 + colourT * 0.4;
    ctx.fillStyle = limeCol;
    ctx.fillRect(l, liqTop, w, bot - 4 - liqTop);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, liqTop, w / 2 - 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    if (prog > 0.1 && prog < 0.92) {
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      for (var i = 0; i < 4; i++) {
        var bp = ((now / 600) + i * 0.25) % 1;
        var yy = bot - 12 - bp * (bot - 12 - liqTop - 4);
        ctx.beginPath();
        ctx.arc(cx - 10 + i * 7, yy, 2 + (i % 2) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(l, top);
    ctx.lineTo(l, bot - 14);
    ctx.quadraticCurveTo(l, bot, cx, bot);
    ctx.quadraticCurveTo(r, bot, r, bot - 14);
    ctx.lineTo(r, top);
    ctx.strokeStyle = 'rgba(70,110,150,0.65)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(l + 5, top + 12);
    ctx.lineTo(l + 5, bot - 20);
    ctx.stroke();
    ctx.fillStyle = '#f5ead8';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('limewater', cx, bot + 16);
    ctx.restore();
  },

  drawLitmusJar: function(ctx, cx, gasConfig, colourT, flowProg, now) {
    var jw = 102, jl = cx - jw / 2, jr = cx + jw / 2;
    var jTop = 288, jBot = 470;
    ctx.save();
    ctx.fillStyle = '#8a6b45';
    ctx.strokeStyle = '#6f5435';
    ctx.lineWidth = 1;
    ctx.fillRect(jl - 8, jBot, jw + 16, 30);
    ctx.strokeRect(jl - 8, jBot, jw + 16, 30);
    ctx.beginPath();
    ctx.moveTo(jl, jTop);
    ctx.lineTo(jl, jBot - 10);
    ctx.quadraticCurveTo(jl, jBot, jl + 10, jBot);
    ctx.lineTo(jr - 10, jBot);
    ctx.quadraticCurveTo(jr, jBot, jr, jBot - 10);
    ctx.lineTo(jr, jTop);
    ctx.strokeStyle = 'rgba(70,110,150,0.6)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.rect(jl + 2, jTop, jw - 4, jBot - jTop - 2);
    ctx.clip();
    if (flowProg > 0) {
      var gasLevel = jBot - 2 - flowProg * (jBot - jTop - 10);
      ctx.globalAlpha = 0.06 + 0.2 * flowProg;
      ctx.fillStyle = gasConfig.colour || '#999999';
      ctx.fillRect(jl, gasLevel, jw, jBot - gasLevel);
      ctx.globalAlpha = 1;
    }
    if (flowProg > 0 && flowProg < 1) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (var i = 0; i < 3; i++) {
        var bp = ((now / 650) + i * 0.33) % 1;
        var yy = jBot - 14 - bp * 90;
        ctx.beginPath();
        ctx.arc(jl + 24 + i * 12, yy, 2 + (i % 2) * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    var stripC = cx + 24;
    var stripL = cx + 6, stripR = cx + 42;
    var stripT = 322, stripB = 340;
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(jr - 8, jTop);
    ctx.lineTo(stripC, stripT);
    ctx.stroke();
    var stripAfter = gasConfig.litmusColourAfter || '#d8564e';
    ctx.fillStyle = this.lerpHex('#d8564e', stripAfter, colourT);
    ctx.strokeStyle = 'rgba(90,60,50,0.6)';
    ctx.lineWidth = 1;
    ctx.fillRect(stripL, stripT, stripR - stripL, stripB - stripT);
    ctx.strokeRect(stripL, stripT, stripR - stripL, stripB - stripT);
    ctx.fillStyle = 'rgba(40,60,90,0.85)';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('damp litmus', stripC, stripB + 14);
    ctx.fillStyle = '#f5ead8';
    ctx.fillText('gas jar', cx, jBot + 20);
    ctx.restore();
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    // A5 performTest stage - no canvas click interaction needed
  }
};
