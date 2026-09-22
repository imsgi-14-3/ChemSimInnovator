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

  renderPrepare: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Prepare for Gas Detection</h3>';
    html += '<p>You will test three gases: NH\u2083, CO\u2082, and Cl\u2082.</p>';
    html += '<p>For each gas, you will:</p>';
    html += '<ul>';
    html += '<li>Select the gas</li>';
    html += '<li>Select the appropriate test</li>';
    html += '<li>Perform the virtual test</li>';
    html += '<li>Observe and record the evidence</li>';
    html += '<li>Interpret and confirm the gas</li>';
    html += '</ul>';
    html += '<div class="sim-note">All observations shown are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderSelectGas: function(exp, state) {
    var sim = SIMULATION_CONFIG['A5'];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Select a Gas</h3>';
    html += '<p>Choose the next gas to test.</p>';
    html += '<div class="tool-options">';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var done = state.gasResults[g.id] && state.gasResults[g.id].confirmed;
      var cls = done ? 'btn btn-secondary' : 'btn btn-accent';
      var label = g.name + (done ? ' \u2713 Confirmed' : '');
      html += '<button class="' + cls + '" data-gas="' + g.id + '" ' + (done ? 'disabled' : '') + '>' + label + '</button>';
    }
    html += '</div>';
    html += '</div>';
    return html;
  },

  renderSelectTest: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var html = '<div class="stage-card"><h3 class="stage-card-title">Select Test for ' + gas.name + '</h3>';
    html += '<p>Choose the correct test to identify <strong>' + gas.fullName + '</strong>.</p>';
    html += '<div class="tool-options">';
    for (var i = 0; i < gas.testOptions.length; i++) {
      var t = gas.testOptions[i];
      html += '<button class="btn btn-tool" data-test="' + t.id + '">' + t.label + '</button>';
    }
    html += '</div>';
    html += '<div class="sim-note">Select the most appropriate test for this gas.</div>';
    html += '</div>';
    return html;
  },

  renderPerformTest: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var html = '<div class="stage-card"><h3 class="stage-card-title">Perform Test: ' + gas.name + '</h3>';
    html += '<p>Gas: <strong>' + gas.fullName + '</strong></p>';
    html += '<p>Test: <strong>' + gas.correctTestLabel + '</strong></p>';
    if (state.gasTestPerformed && state.simulation && state.simulation.done) {
      html += '<div class="feedback feedback-correct">Test performed. Observation: ' + gas.observedChange + '</div>';
      html += '<div class="sim-note">This is a simulated educational value.</div>';
    } else {
      html += '<div data-action="perform-test" class="btn btn-primary">Start Test</div>';
    }
    html += '</div>';
    return html;
  },

  renderObserve: function(exp, state) {
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return '';
    var html = '<div class="stage-card"><h3 class="stage-card-title">Observe: ' + gas.name + '</h3>';
    html += '<p>Examine the evidence from the test.</p>';
    html += '<p class="detail-label">Simulated observation</p>';
    html += '<p><strong>' + gas.observedChange + '</strong></p>';
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
    html += '<p class="detail-label">Guiding question</p>';
    html += '<p>Does the evidence confirm the identity of ' + gas.fullName + '?</p>';
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
    html += '<p class="detail-label">Evidence</p>';
    html += '<p>Gas: <strong>' + gas.fullName + '</strong></p>';
    html += '<p>Test: <strong>' + gas.correctTestLabel + '</strong></p>';
    html += '<p>Observation: <strong>' + (res.recorded || '-') + '</strong></p>';
    html += '<p>Interpretation: <strong>' + (res.interpretation || '-') + '</strong></p>';
    html += '<p>Expected observation: <strong>' + gas.observedChange + '</strong></p>';
    html += '<div data-action="confirm-gas" class="btn btn-primary">Confirm Gas</div>';
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
    var html = '<div class="stage-card"><h3 class="stage-card-title">Gas Confirmed: ' + (gas ? gas.name : '') + '</h3>';
    html += '<div class="feedback feedback-correct">' + (gas ? gas.name : '') + ' has been confirmed.</div>';
    html += '<p>Confirmed: ' + confirmedCount + ' / ' + sim.gases.length + '</p>';
    if (confirmedCount < sim.gases.length) {
      html += '<div data-action="go-next-gas" class="btn btn-accent">Test Next Gas</div>';
    } else {
      html += '<div data-action="go-summary" class="btn btn-accent">View Summary</div>';
    }
    html += '</div>';
    return html;
  },

  renderSummary: function(exp, state) {
    var sim = SIMULATION_CONFIG['A5'];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Summary of Gas Tests</h3>';
    html += '<table class="table"><thead><tr><th>Gas</th><th>Test</th><th>Recorded Observation</th><th>Interpretation</th><th>Confirmation</th></tr></thead><tbody>';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var res = state.gasResults[g.id] || {};
      html += '<tr>';
      html += '<td>' + g.name + '</td>';
      html += '<td>' + g.correctTestLabel + '</td>';
      html += '<td>' + ChemSim.escapeHtml(res.recorded || '-') + '</td>';
      html += '<td>' + ChemSim.escapeHtml(res.interpretation || '-') + '</td>';
      html += '<td>' + (res.confirmed ? '\u2713 Confirmed' : '-') + '</td>';
      html += '</tr>';
    }
    html += '</tbody></table>';
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
    html += '<p><strong>Gases confirmed:</strong> ' + sim.gases.length + '</p>';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var res = state.gasResults[g.id] || {};
      html += '<p>' + g.name + ' \u2014 Test: ' + g.correctTestLabel + ' \u2014 ' + (res.confirmed ? '\u2713 Confirmed' : '-') + '</p>';
      html += '<p style="margin-left:1rem;">Observation: ' + ChemSim.escapeHtml(res.recorded || '-') + '</p>';
      html += '<p style="margin-left:1rem;">Interpretation: ' + ChemSim.escapeHtml(res.interpretation || '-') + '</p>';
    }
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
  draw: function(canvas, ctx, state, exp) {
    if (state.currentStage !== 'performTest') return;
    var gas = this.getGasByIndex(state.gasCurrentIndex);
    if (!gas) return;
    var cw = canvas.width, ch = canvas.height;
    var cx = cw / 2;
    var sim = SIMULATION_CONFIG['A5'];
    var gasConfig = null;
    for (var i = 0; i < sim.gases.length; i++) {
      if (sim.gases[i].id === gas.id) { gasConfig = sim.gases[i]; break; }
    }
    if (!gasConfig) return;

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = '#e8edf2';
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Test: ' + gas.correctTestLabel, cx, 30);

    var tubeX = cx - 25;
    var tubeY = 60;
    var tubeW = 50;
    var tubeH = 160;

    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tubeX, tubeY);
    ctx.lineTo(tubeX, tubeY + tubeH);
    ctx.arcTo(tubeX, tubeY + tubeH + 20, tubeX + tubeW / 2, tubeY + tubeH + 20, 25);
    ctx.arcTo(tubeX + tubeW, tubeY + tubeH + 20, tubeX + tubeW, tubeY + tubeH, 25);
    ctx.lineTo(tubeX + tubeW, tubeY);
    ctx.stroke();

    if (gas.id === 'CO2') {
      var limeCol = (state.gasTestPerformed && state.simulation && state.simulation.done)
        ? gasConfig.limeColourAfter : '#e8e8e0';
      ctx.fillStyle = limeCol;
      ctx.fillRect(tubeX + 4, tubeY + tubeH - 60, tubeW - 8, 60);
      ctx.fillStyle = '#555';
      ctx.font = '10px sans-serif';
      ctx.fillText('limewater', cx, tubeY + tubeH - 25);
    }

    if (state.gasTestPerformed && state.simulation && state.simulation.done) {
      var litmusY = tubeY + 10;
      if (gas.id === 'NH3') {
        ctx.fillStyle = gasConfig.litmusColourAfter;
        ctx.fillRect(cx - 15, litmusY, 30, 15);
        ctx.fillStyle = '#333';
        ctx.font = '10px sans-serif';
        ctx.fillText('red \u2192 blue', cx, litmusY + 30);
      } else if (gas.id === 'Cl2') {
        ctx.fillStyle = gasConfig.litmusColourAfter;
        ctx.fillRect(cx - 15, litmusY, 30, 15);
        ctx.fillStyle = '#333';
        ctx.font = '10px sans-serif';
        ctx.fillText('bleached white', cx, litmusY + 30);
      } else if (gas.id === 'CO2') {
        ctx.fillStyle = 'rgba(220,53,69,0.5)';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Limewater turned milky!', cx, tubeY + 10);
      }
    }

    ctx.fillStyle = '#888';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.textAlign = 'center';
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    // A5 performTest stage - no canvas click interaction needed
  }
};
