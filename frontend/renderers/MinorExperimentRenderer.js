var MinorExperimentRenderer = {
  renderStage: function(stage, exp, state, appState) {
    var html = '';
    var id = exp.id;
    if (id === 'M7_1') html = this.renderM7_1(stage, exp, state);
    else if (id === 'M7_2') html = this.renderM7_2(stage, exp, state);
    else if (id === 'M7_3') html = this.renderM7_3(stage, exp, state);
    else if (id === 'M7_4') html = this.renderM7_4(stage, exp, state);
    else if (id === 'M7_5') html = this.renderM7_5(stage, exp, state);
    else if (id === 'M7_6') html = this.renderM7_6(stage, exp, state);
    else if (id === 'M7_7') html = this.renderM7_7(stage, exp, state);
    else if (id === 'M7_8') html = this.renderM7_8(stage, exp, state);
    else html = '<p>Unknown experiment: ' + id + '</p>';
    html += LaboratoryWorkspace.renderCanvas();
    return html;
  },

  /* ── M7.1 Sublimation ── */
  renderM7_1: function(stage, exp, state) {
    var html = '';
    switch(stage) {
      case 'heat':
        html = '<div class="stage-card"><h3 class="stage-card-title">Heat the Mixture</h3>';
        html += '<p>Heat the mixture in the evaporating dish to sublime the naphthalene.</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">Naphthalene has sublimed and collected on the funnel.</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start Heating</div>';
        }
        html += '</div>';
        break;
      case 'collect':
        html = '<div class="stage-card"><h3 class="stage-card-title">Collect Sublimate</h3>';
        html += '<p>Allow the apparatus to cool. The sublimed naphthalene is collected on the filter paper lining the funnel.</p>';
        html += '<p>Residue in the dish: <strong>sand and salt</strong></p>';
        html += '<p>Sublimate on funnel: <strong>naphthalene</strong></p>';
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'record': html = this.renderM7Record(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── M7.2 Flame Tests ── */
  renderM7_2: function(stage, exp, state) {
    var sim = SIMULATION_CONFIG['M7_2'];
    var html = '';
    switch(stage) {
      case 'selectIon':
        html = '<div class="stage-card"><h3 class="stage-card-title">Select an Ion</h3>';
        html += '<p>Choose the next ion to test.</p>';
        html += '<div class="tool-options">';
        for (var i = 0; i < sim.ions.length; i++) {
          var ion = sim.ions[i];
          var done = state.m7_ionResults[ion.id];
          var cls = done ? 'btn btn-secondary' : 'btn btn-accent';
          html += '<button class="' + cls + '" data-ion="' + ion.id + '" ' + (done ? 'disabled' : '') + '>' + ion.name + (done ? ' \u2713' : '') + '</button>';
        }
        html += '</div></div>';
        break;
      case 'performTest':
        html = '<div class="stage-card"><h3 class="stage-card-title">Perform Flame Test</h3>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          var currentIon = sim.ions[state.m7_ionIndex];
          html += '<div class="feedback feedback-correct">Flame test complete. ' + currentIon.name + ' produces a ' + currentIon.flameColour + ' flame.</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start Flame Test</div>';
        }
        html += '</div>';
        break;
      case 'identify':
        html = '<div class="stage-card"><h3 class="stage-card-title">Identify</h3>';
        var ion2 = sim.ions[state.m7_ionIndex];
        if (ion2) {
          html += '<p>Based on the flame colour, identify the ion.</p>';
          html += '<p class="detail-label">Evidence</p>';
          html += '<p>Ion: <strong>' + ion2.name + '</strong></p>';
          html += '<p>Flame colour: <strong>' + ion2.flameColour + '</strong></p>';
          html += '<div data-action="m7-confirm-ion" class="btn btn-accent">Confirm Identification</div>';
        }
        html += '</div>';
        break;
      case 'nextIon':
        html = '<div class="stage-card"><h3 class="stage-card-title">Next Ion</h3>';
        var doneCount = 0;
        for (var j = 0; j < sim.ions.length; j++) {
          if (state.m7_ionResults[sim.ions[j].id]) doneCount++;
        }
        html += '<p>Identified: ' + doneCount + ' / ' + sim.ions.length + '</p>';
        if (doneCount < sim.ions.length) {
          html += '<div data-action="m7-go-next" class="btn btn-accent">Test Next Ion</div>';
        } else {
          html += '<div data-action="go-summary" class="btn btn-accent">View Summary</div>';
        }
        html += '</div>';
        break;
      case 'summary':
        html = '<div class="stage-card"><h3 class="stage-card-title">Summary of Flame Tests</h3>';
        html += '<table class="table"><thead><tr><th>Ion</th><th>Flame Colour</th><th>Identified</th></tr></thead><tbody>';
        for (var k = 0; k < sim.ions.length; k++) {
          var ion3 = sim.ions[k];
          var res = state.m7_ionResults[ion3.id];
          html += '<tr><td>' + ion3.name + '</td><td>' + ion3.flameColour + '</td><td>' + (res ? '\u2713' : '-') + '</td></tr>';
        }
        html += '</tbody></table>';
        html += '<div class="sim-note">All observations are simulated educational values.</div>';
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'record': html = this.renderM7Record(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── M7.3 Crystals ── */
  renderM7_3: function(stage, exp, state) {
    var html = '';
    switch(stage) {
      case 'dissolve':
        html = '<div class="stage-card"><h3 class="stage-card-title">Dissolve CuSO\u2084</h3>';
        html += '<p>Dissolve copper(II) sulphate powder in warm distilled water.</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">CuSO\u2084 dissolved. Blue solution obtained.</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start</div>';
        }
        html += '</div>';
        break;
      case 'concentrate':
        html = '<div class="stage-card"><h3 class="stage-card-title">Concentrate the Solution</h3>';
        html += '<p>Heat the solution to concentrate it by evaporation.</p>';
        html += '<div class="sim-note">ChemSim educational simulation choice.</div>';
        html += '</div>';
        break;
      case 'crystallize':
        html = '<div class="stage-card"><h3 class="stage-card-title">Crystallize</h3>';
        html += '<p>Allow the solution to cool slowly for crystal formation.</p>';
        html += '<p>Blue crystals of CuSO\u2084\u00b75H\u2082O should form.</p>';
        html += '<div class="sim-note">Crystal formation is a simulated educational value.</div>';
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'record': html = this.renderM7Record(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── M7.4 Melting Point ── */
  renderM7_4: function(stage, exp, state) {
    var html = '';
    switch(stage) {
      case 'heat': case 'monitor':
        html = '<div class="stage-card"><h3 class="stage-card-title">Heat the Naphthalene</h3>';
        html += '<p>Observe the temperature as naphthalene is heated.</p>';
        html += '<p>Expected melting point: <strong>~80\u00b0C</strong> (simulated)</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">Temperature recorded.</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start Heating</div>';
        }
        html += '<div class="sim-note">Temperature values are simulated educational values.</div>';
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'record': html = this.renderM7Record(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── M7.5 Boiling Point ── */
  renderM7_5: function(stage, exp, state) {
    var html = '';
    switch(stage) {
      case 'heat': case 'monitor':
        html = '<div class="stage-card"><h3 class="stage-card-title">Heat the Ethyl Alcohol</h3>';
        html += '<p>Observe the temperature as ethyl alcohol is heated.</p>';
        html += '<p>Expected boiling point: <strong>~78\u00b0C</strong> (simulated)</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">Temperature recorded.</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start Heating</div>';
        }
        html += '<div class="sim-note">Temperature values are simulated educational values.</div>';
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'record': html = this.renderM7Record(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── M7.6 Metal Displacement ── */
  renderM7_6: function(stage, exp, state) {
    var html = '';
    switch(stage) {
      case 'selectMaterials':
        html = '<div class="stage-card"><h3 class="stage-card-title">Select Materials</h3>';
        html += '<p>This experiment demonstrates the displacement of copper by zinc.</p>';
        html += '<p><strong>Metal:</strong> Zinc (Zn) granules</p>';
        html += '<p><strong>Solution:</strong> Copper(II) sulphate (CuSO\u2084)</p>';
        html += '<div class="sim-note">ChemSim educational simulation choice.</div>';
        html += '</div>';
        break;
      case 'performReaction':
        html = '<div class="stage-card"><h3 class="stage-card-title">Perform Displacement Reaction</h3>';
        html += '<p>Add zinc granules to copper(II) sulphate solution.</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">Reaction complete. Colour change observed.</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start Reaction</div>';
        }
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'record': html = this.renderM7Record(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── M7.7 Water Test ── */
  renderM7_7: function(stage, exp, state) {
    var html = '';
    switch(stage) {
      case 'selectSample':
        html = '<div class="stage-card"><h3 class="stage-card-title">Select Sample</h3>';
        html += '<p>This test uses anhydrous copper(II) sulphate to detect water.</p>';
        html += '<p><strong>Sample:</strong> Anhydrous CuSO\u2084 (white powder)</p>';
        html += '<p><strong>Reagent:</strong> Distilled water</p>';
        html += '</div>';
        break;
      case 'performTest':
        html = '<div class="stage-card"><h3 class="stage-card-title">Perform Water Test</h3>';
        html += '<p>Add water to the anhydrous copper(II) sulphate.</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">Colour changed from white to blue. Water is present.</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Add Water</div>';
        }
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'record': html = this.renderM7Record(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── M7.8 Water Purity ── */
  renderM7_8: function(stage, exp, state) {
    var html = '';
    switch(stage) {
      case 'meltingPointTest':
        html = '<div class="stage-card"><h3 class="stage-card-title">Melting Point Test</h3>';
        html += '<p>Determine the melting point of ice.</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">Melting point: 0\u00b0C (simulated)</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start Test</div>';
        }
        html += '<div class="sim-note">Temperature values are simulated educational values.</div>';
        html += '</div>';
        break;
      case 'recordMP':
        html = '<div class="stage-card"><h3 class="stage-card-title">Record Melting Point</h3>';
        html += '<p>Record the observed melting point.</p>';
        html += '<p>Observed melting point: <strong>0\u00b0C</strong> (simulated)</p>';
        html += '<div class="form-group"><label class="form-label">Your record</label>';
        html += '<textarea id="m7-record-input" class="form-textarea" placeholder="Record the melting point...">' +
          ChemSim.escapeHtml(state.interpretation || '') + '</textarea></div>';
        html += '<div data-action="m7-record" class="btn btn-accent">Record & Continue</div>';
        html += '</div>';
        break;
      case 'boilingPointTest':
        html = '<div class="stage-card"><h3 class="stage-card-title">Boiling Point Test</h3>';
        html += '<p>Determine the boiling point of the water sample.</p>';
        if (state.m7ActionDone && state.simulation && state.simulation.done) {
          html += '<div class="feedback feedback-correct">Boiling point: 100\u00b0C (simulated)</div>';
        } else {
          html += '<div data-action="m7-start" class="btn btn-primary">Start Test</div>';
        }
        html += '<div class="sim-note">Temperature values are simulated educational values.</div>';
        html += '</div>';
        break;
      case 'recordBP':
        html = '<div class="stage-card"><h3 class="stage-card-title">Record Boiling Point</h3>';
        html += '<p>Record the observed boiling point.</p>';
        html += '<p>Observed boiling point: <strong>100\u00b0C</strong> (simulated)</p>';
        html += '<div class="form-group"><label class="form-label">Your record</label>';
        html += '<textarea id="m7-record-input" class="form-textarea" placeholder="Record the boiling point...">' +
          ChemSim.escapeHtml(state.conclusion || '') + '</textarea></div>';
        html += '<div data-action="m7-record" class="btn btn-accent">Record & Continue</div>';
        html += '</div>';
        break;
      case 'observe': html = this.renderM7Observe(exp, state); break;
      case 'interpret': html = this.renderM7Interpret(exp, state); break;
      case 'conclude': html = this.renderM7Conclude(exp, state); break;
      case 'complete': html = this.renderM7Complete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    return html;
  },

  /* ── Shared M7 Stage Renderers ── */
  renderM7Observe: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Observe</h3>';
    html += '<p>Examine the evidence from the experiment.</p>';
    html += '<p class="detail-label">Simulated observation</p>';
    if (state.simulation && state.simulation.done) {
      html += '<div class="feedback feedback-correct">Observation recorded.</div>';
    } else {
      html += '<p>Complete the experiment action first.</p>';
    }
    html += '<div class="sim-note">Observations shown are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderM7Record: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Record Observation</h3>';
    html += '<p>Record what you observed during the experiment.</p>';
    html += '<div class="form-group"><label class="form-label">Your observation</label>';
    html += '<textarea id="m7-record-input" class="form-textarea" placeholder="Describe what you observed...">' +
      ChemSim.escapeHtml(state.interpretation || '') + '</textarea></div>';
    html += '<div data-action="m7-record" class="btn btn-accent">Record & Continue</div>';
    html += '</div>';
    return html;
  },

  renderM7Interpret: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Interpret</h3>';
    html += '<p>Based on your observation, interpret the results.</p>';
    html += '<div class="form-group"><label class="form-label">Your interpretation</label>';
    html += '<textarea id="m7-interpret-input" class="form-textarea" placeholder="Write your interpretation here...">' +
      ChemSim.escapeHtml(state.interpretation || '') + '</textarea></div>';
    html += '<div data-action="m7-interpret" class="btn btn-accent">Submit Interpretation</div>';
    html += '</div>';
    return html;
  },

  renderM7Conclude: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Conclusion</h3>';
    html += '<p>Write a conclusion for this experiment.</p>';
    html += '<div class="form-group"><label class="form-label">Your Conclusion</label>';
    html += '<textarea id="conclusion-input" class="form-textarea" placeholder="Write your conclusion here...">' +
      ChemSim.escapeHtml(state.conclusion || '') + '</textarea></div>';
    html += '</div>';
    return html;
  },

  renderM7Complete: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Experiment Complete</h3>';
    html += '<div class="detail-row"><span class="detail-label">Practical</span><span class="detail-value">' + ChemSim.escapeHtml(exp.title) + '</span></div>';
    html += '<div class="detail-row"><span class="detail-label">Section</span><span class="detail-value">' + (exp.section.charAt(0).toUpperCase() + exp.section.slice(1)) + '</span></div>';
    html += '<div class="detail-row"><span class="detail-label">SLO</span><span class="detail-value">' + exp.slos.join(', ') + '</span></div>';
    html += '<hr class="divider">';
    html += '<p><strong>Observation:</strong> ' + ChemSim.escapeHtml(state.interpretation || '-') + '</p>';
    html += '<p><strong>Interpretation:</strong> ' + ChemSim.escapeHtml(state.interpretation || '-') + '</p>';
    html += '<p><strong>Conclusion:</strong> ' + ChemSim.escapeHtml(state.conclusion || '-') + '</p>';
    html += '<div class="sim-note">SIMULATED EDUCATIONAL VALUES \u2014 not real laboratory measurements.</div>';
    html += '<div data-action="finish-experiment" class="btn btn-primary" style="margin-top:1rem;">Finish Experiment</div>';
    html += '</div>';
    return html;
  },

  /* Canvas Drawing */
  draw: function(canvas, ctx, state, exp) {
    var id = exp.id;
    var cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = '#e8edf2';
    ctx.fillRect(0, 0, cw, ch);
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';

    if (id === 'M7_1') {
      this.drawM7_1(ctx, cw, ch, state);
    } else if (id === 'M7_2') {
      this.drawM7_2(ctx, cw, ch, state);
    } else if (id === 'M7_3') {
      this.drawM7_3(ctx, cw, ch, state);
    } else if (id === 'M7_4') {
      this.drawM7_4(ctx, cw, ch, state);
    } else if (id === 'M7_5') {
      this.drawM7_5(ctx, cw, ch, state);
    } else if (id === 'M7_6') {
      this.drawM7_6(ctx, cw, ch, state);
    } else if (id === 'M7_7') {
      this.drawM7_7(ctx, cw, ch, state);
    } else if (id === 'M7_8') {
      this.drawM7_8(ctx, cw, ch, state);
    }

    ctx.fillStyle = '#888';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.textAlign = 'center';
  },

  drawM7_1: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Sublimation of Naphthalene', cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = '#aaa';
      ctx.beginPath();
      ctx.arc(cx, ch / 2, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('Sublimate collected on funnel', cx, ch / 2 + 60);
    }
  },

  drawM7_2: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_2'];
    var cx = cw / 2;
    var ion = sim.ions[state.m7_ionIndex];
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    if (ion && state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = ion.flameHex;
      ctx.beginPath();
      ctx.arc(cx, ch / 2, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.fillText(ion.name + ' \u2014 ' + ion.flameColour, cx, ch / 2 + 80);
    } else {
      ctx.fillText('Flame test', cx, 30);
    }
  },

  drawM7_3: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CuSO\u2084\u00b75H\u2082O Crystals', cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = '#3366cc';
      for (var i = 0; i < 5; i++) {
        ctx.fillRect(cx - 40 + i * 16, ch / 2 - 10, 12, 20);
      }
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('Blue crystals formed', cx, ch / 2 + 40);
    }
  },

  drawM7_4: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Melting Point: Naphthalene', cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = '#ddd';
      ctx.beginPath();
      ctx.arc(cx, ch / 2, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('MP: 80.26\u00b0C (simulated)', cx, ch / 2 + 50);
    }
  },

  drawM7_5: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Boiling Point: Ethyl Alcohol', cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = '#eee';
      ctx.beginPath();
      ctx.arc(cx, ch / 2, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('BP: 78.37\u00b0C (simulated)', cx, ch / 2 + 50);
    }
  },

  drawM7_6: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Zn + CuSO\u2084 Displacement', cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = '#cc6622';
      ctx.fillRect(cx - 30, ch / 2 - 20, 60, 40);
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('Colour changed from blue to colourless', cx, ch / 2 + 40);
    }
  },

  drawM7_7: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Water Test: Anhydrous CuSO\u2084', cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = '#3366cc';
      ctx.fillRect(cx - 30, ch / 2 - 20, 60, 40);
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('White \u2192 Blue (water present)', cx, ch / 2 + 40);
    } else {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(cx - 30, ch / 2 - 20, 60, 40);
      ctx.strokeStyle = '#999';
      ctx.strokeRect(cx - 30, ch / 2 - 20, 60, 40);
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('White powder (anhydrous)', cx, ch / 2 + 40);
    }
  },

  drawM7_8: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Water Purity Test', cx, 30);
    ctx.fillText('MP: 0\u00b0C | BP: 100\u00b0C', cx, ch / 2);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = '#4a90d9';
      ctx.fillRect(cx - 30, ch / 2 + 20, 60, 20);
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.fillText('Pure water confirmed (simulated)', cx, ch / 2 + 60);
    }
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    // M7 canvas clicks - no interaction needed for most
  }
};
