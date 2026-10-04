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
      case 'prepare':
        html = '<div class="stage-card"><h3 class="stage-card-title">Prepare Apparatus</h3>';
        html += '<p>Set up the evaporating dish on the tripod stand with wire gauze.</p>';
        html += '<p>Place the given mixture of naphthalene, sand, and salt in the dish.</p>';
        html += '<p>Cover with an inverted funnel lined with filter paper.</p>';
        html += '<div class="sim-note">Click <strong>Next</strong> to begin heating.</div>';
        html += '</div>';
        break;
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
      case 'prepare':
        html = '<div class="stage-card"><h3 class="stage-card-title">Prepare Apparatus</h3>';
        html += '<p>Clean the platinum/nichrome wire by dipping in concentrated HCl.</p>';
        html += '<p>Hold the wire in the Bunsen flame until no colour is observed.</p>';
        html += '<p>Prepare the five ion samples on watch glasses.</p>';
        html += '<div class="sim-note">Click <strong>Next</strong> to select an ion.</div>';
        html += '</div>';
        break;
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
      case 'prepare':
        html = '<div class="stage-card"><h3 class="stage-card-title">Prepare Apparatus</h3>';
        html += '<p>Set up the beaker on the tripod stand with wire gauze.</p>';
        html += '<p>Measure copper(II) sulphate powder and distilled water.</p>';
        html += '<div class="sim-note">Click <strong>Next</strong> to begin dissolving.</div>';
        html += '</div>';
        break;
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
      case 'prepare':
        html = '<div class="stage-card"><h3 class="stage-card-title">Prepare Apparatus</h3>';
        html += '<p>Pack naphthalene into a capillary tube.</p>';
        html += '<p>Attach the capillary tube to the thermometer.</p>';
        html += '<p>Place both in a beaker of water (water bath).</p>';
        html += '<div class="sim-note">Click <strong>Next</strong> to begin heating.</div>';
        html += '</div>';
        break;
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
      case 'prepare':
        html = '<div class="stage-card"><h3 class="stage-card-title">Prepare Apparatus</h3>';
        html += '<p>Pour ethyl alcohol into the round-bottom flask with boiling chips.</p>';
        html += '<p>Set up the distillation apparatus with thermometer at the flask neck.</p>';
        html += '<div class="sim-note">Click <strong>Next</strong> to begin heating.</div>';
        html += '</div>';
        break;
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
      case 'prepare':
        html = '<div class="stage-card"><h3 class="stage-card-title">Prepare Apparatus</h3>';
        html += '<p>Place a small amount of anhydrous copper(II) sulphate (white powder) in a test tube.</p>';
        html += '<p>Prepare a dropper with distilled water.</p>';
        html += '<div class="sim-note">Click <strong>Next</strong> to select the sample.</div>';
        html += '</div>';
        break;
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
      case 'prepare':
        html = '<div class="stage-card"><h3 class="stage-card-title">Prepare Apparatus</h3>';
        html += '<p>Set up the beaker with water for the melting point test.</p>';
        html += '<p>Prepare the thermometer and Bunsen burner.</p>';
        html += '<div class="sim-note">Click <strong>Next</strong> to begin the melting point test.</div>';
        html += '</div>';
        break;
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

  /* Canvas Drawing — realistic lab apparatus */
  draw: function(canvas, ctx, state, exp) {
    var id = exp.id;
    var cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    this.drawBench(ctx, cw, ch);
    if (id === 'M7_1') this.drawM7_1(ctx, cw, ch, state);
    else if (id === 'M7_2') this.drawM7_2(ctx, cw, ch, state);
    else if (id === 'M7_3') this.drawM7_3(ctx, cw, ch, state);
    else if (id === 'M7_4') this.drawM7_4(ctx, cw, ch, state);
    else if (id === 'M7_5') this.drawM7_5(ctx, cw, ch, state);
    else if (id === 'M7_6') this.drawM7_6(ctx, cw, ch, state);
    else if (id === 'M7_7') this.drawM7_7(ctx, cw, ch, state);
    else if (id === 'M7_8') this.drawM7_8(ctx, cw, ch, state);
  },

  /* Clean lab bench background */
  drawBench: function(ctx, cw, ch) {
    ctx.save();
    var benchTop = 560;
    var wallGrad = ctx.createLinearGradient(0, 0, 0, benchTop);
    wallGrad.addColorStop(0, '#fafbfc');
    wallGrad.addColorStop(0.5, '#f5f7f9');
    wallGrad.addColorStop(1, '#eef1f4');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, cw, benchTop);
    var benchGrad = ctx.createLinearGradient(0, benchTop, 0, ch);
    benchGrad.addColorStop(0, '#f0f2f5');
    benchGrad.addColorStop(0.3, '#e8ecf0');
    benchGrad.addColorStop(1, '#dde2e8');
    ctx.fillStyle = benchGrad;
    ctx.fillRect(0, benchTop, cw, ch - benchTop);
    ctx.strokeStyle = '#c5ccd4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, benchTop);
    ctx.lineTo(cw, benchTop);
    ctx.stroke();
    ctx.restore();
  },

  /* ── Reusable lab equipment helpers ── */

  /* Bunsen burner */
  drawBunsen: function(ctx, x, baseY, flameOn, flameColor, flameH) {
    ctx.save();
    var h = flameH || 50;
    /* base */
    var baseGrad = ctx.createLinearGradient(x - 20, baseY - 6, x + 20, baseY + 4);
    baseGrad.addColorStop(0, '#666');
    baseGrad.addColorStop(0.4, '#888');
    baseGrad.addColorStop(0.6, '#999');
    baseGrad.addColorStop(1, '#555');
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.ellipse(x, baseY, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.stroke();
    /* barrel */
    var barrelGrad = ctx.createLinearGradient(x - 6, 0, x + 6, 0);
    barrelGrad.addColorStop(0, '#777');
    barrelGrad.addColorStop(0.3, '#bbb');
    barrelGrad.addColorStop(0.5, '#ddd');
    barrelGrad.addColorStop(0.7, '#aaa');
    barrelGrad.addColorStop(1, '#666');
    ctx.fillStyle = barrelGrad;
    ctx.fillRect(x - 6, baseY - 50, 12, 46);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(x - 6, baseY - 50, 12, 46);
    /* collar */
    ctx.fillStyle = '#555';
    ctx.fillRect(x - 8, baseY - 54, 16, 6);
    /* flame */
    if (flameOn) {
      var fc = flameColor || '#4488ff';
      var outerGrad = ctx.createRadialGradient(x, baseY - 54 - h * 0.4, 2, x, baseY - 54 - h * 0.4, h * 0.5);
      outerGrad.addColorStop(0, fc);
      outerGrad.addColorStop(0.5, fc);
      outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.moveTo(x - 12, baseY - 54);
      ctx.quadraticCurveTo(x - 8, baseY - 54 - h * 0.5, x, baseY - 54 - h);
      ctx.quadraticCurveTo(x + 8, baseY - 54 - h * 0.5, x + 12, baseY - 54);
      ctx.closePath();
      ctx.fill();
      /* inner flame */
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.moveTo(x - 4, baseY - 54);
      ctx.quadraticCurveTo(x - 2, baseY - 54 - h * 0.3, x, baseY - 54 - h * 0.5);
      ctx.quadraticCurveTo(x + 2, baseY - 54 - h * 0.3, x + 4, baseY - 54);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  },

  /* Beaker */
  drawBeaker: function(ctx, x, y, w, h, liquidColor, liquidLevel) {
    ctx.save();
    var bx = x - w / 2;
    var by = y - h / 2;
    var lvl = liquidLevel || 0;
    /* glass body */
    var glassGrad = ctx.createLinearGradient(bx, by, bx + w, by);
    glassGrad.addColorStop(0, 'rgba(160,195,230,0.45)');
    glassGrad.addColorStop(0.1, 'rgba(195,220,245,0.22)');
    glassGrad.addColorStop(0.3, 'rgba(220,238,252,0.08)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.04)');
    glassGrad.addColorStop(0.7, 'rgba(220,238,252,0.07)');
    glassGrad.addColorStop(0.9, 'rgba(195,220,245,0.2)');
    glassGrad.addColorStop(1, 'rgba(160,195,230,0.42)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(bx + 2, by + 6);
    ctx.lineTo(bx + 2, by + h - 6);
    ctx.quadraticCurveTo(bx + 2, by + h, bx + 8, by + h);
    ctx.lineTo(bx + w - 8, by + h);
    ctx.quadraticCurveTo(bx + w - 2, by + h, bx + w - 2, by + h - 6);
    ctx.lineTo(bx + w - 2, by + 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* liquid */
    if (lvl > 0 && liquidColor) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bx + 2, by + 6);
      ctx.lineTo(bx + 2, by + h - 6);
      ctx.quadraticCurveTo(bx + 2, by + h, bx + 8, by + h);
      ctx.lineTo(bx + w - 8, by + h);
      ctx.quadraticCurveTo(bx + w - 2, by + h, bx + w - 2, by + h - 6);
      ctx.lineTo(bx + w - 2, by + 6);
      ctx.closePath();
      ctx.clip();
      var liqTop = by + h * (1 - lvl);
      ctx.fillStyle = liquidColor;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(bx, liqTop, w, by + h - liqTop);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(x, liqTop, w / 2 - 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    /* rim */
    ctx.strokeStyle = 'rgba(100,140,180,0.5)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(x, by + 5, w / 2 - 2, 3.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(bx + 6, by + 12, 3, h - 20);
    /* graduations */
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 0.8;
    for (var i = 1; i <= 4; i++) {
      var gy = by + h - 10 - (i / 5) * (h - 16);
      ctx.beginPath();
      ctx.moveTo(bx + w - 4, gy);
      ctx.lineTo(bx + w - 12, gy);
      ctx.stroke();
    }
    ctx.restore();
  },

  /* Test tube */
  drawTestTube: function(ctx, x, y, w, h, liquidColor, liquidLevel) {
    ctx.save();
    var bx = x - w / 2;
    var by = y - h / 2;
    var r = w / 2;
    var lvl = liquidLevel || 0;
    /* glass body */
    var glassGrad = ctx.createLinearGradient(bx, by, bx + w, by);
    glassGrad.addColorStop(0, 'rgba(160,195,230,0.45)');
    glassGrad.addColorStop(0.15, 'rgba(200,225,245,0.2)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    glassGrad.addColorStop(0.85, 'rgba(200,225,245,0.18)');
    glassGrad.addColorStop(1, 'rgba(160,195,230,0.42)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by + h - r);
    ctx.quadraticCurveTo(bx, by + h, x, by + h);
    ctx.quadraticCurveTo(bx + w, by + h, bx + w, by + h - r);
    ctx.lineTo(bx + w, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* liquid */
    if (lvl > 0 && liquidColor) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx, by + h - r);
      ctx.quadraticCurveTo(bx, by + h, x, by + h);
      ctx.quadraticCurveTo(bx + w, by + h, bx + w, by + h - r);
      ctx.lineTo(bx + w, by);
      ctx.closePath();
      ctx.clip();
      var liqTop = by + h * (1 - lvl);
      ctx.fillStyle = liquidColor;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(bx, liqTop, w, by + h - liqTop);
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(x, liqTop, w / 2 - 2, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    /* rim */
    ctx.strokeStyle = 'rgba(100,140,180,0.5)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(x, by + 2, w / 2, 3, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(bx + 2, by + 8, 2.5, h - 16);
    ctx.restore();
  },

  /* Evaporating dish */
  drawEvaporatingDish: function(ctx, x, y, w, h, contentsColor) {
    ctx.save();
    var bx = x - w / 2;
    var by = y - h / 2;
    /* dish body — shallow porcelain */
    var dishGrad = ctx.createLinearGradient(bx, by, bx + w, by);
    dishGrad.addColorStop(0, '#e8e4df');
    dishGrad.addColorStop(0.2, '#f5f2ef');
    dishGrad.addColorStop(0.5, '#faf8f6');
    dishGrad.addColorStop(0.8, '#f0ece8');
    dishGrad.addColorStop(1, '#ddd8d2');
    ctx.fillStyle = dishGrad;
    ctx.strokeStyle = '#b0a89e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + 4, by);
    ctx.lineTo(bx + w - 4, by);
    ctx.quadraticCurveTo(bx + w, by, bx + w, by + 6);
    ctx.lineTo(bx + w - 6, by + h - 4);
    ctx.quadraticCurveTo(bx + w - 8, by + h, x, by + h);
    ctx.quadraticCurveTo(bx + 8, by + h, bx + 6, by + h - 4);
    ctx.lineTo(bx, by + 6);
    ctx.quadraticCurveTo(bx, by, bx + 4, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* contents */
    if (contentsColor) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bx + 6, by + 4);
      ctx.lineTo(bx + w - 6, by + 4);
      ctx.lineTo(bx + w - 8, by + h - 6);
      ctx.quadraticCurveTo(bx + w - 10, by + h - 2, x, by + h - 2);
      ctx.quadraticCurveTo(bx + 10, by + h - 2, bx + 8, by + h - 6);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = contentsColor;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(bx, by + 4, w, h - 8);
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    /* rim highlight */
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(x, by + 2, w / 2 - 4, 2.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  },

  /* Tripod stand */
  drawTripod: function(ctx, x, baseY, w) {
    ctx.save();
    var hw = w / 2;
    /* legs */
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - hw, baseY);
    ctx.lineTo(x - hw + 4, baseY - 70);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + hw, baseY);
    ctx.lineTo(x + hw - 4, baseY - 70);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, baseY + 2);
    ctx.lineTo(x, baseY - 65);
    ctx.stroke();
    /* ring */
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(x, baseY - 70, hw, 5, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  },

  /* Wire gauze */
  drawWireGauze: function(ctx, x, y, w) {
    ctx.save();
    var hw = w / 2;
    ctx.fillStyle = '#c5c0b8';
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y, hw, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* mesh lines */
    ctx.strokeStyle = 'rgba(120,120,120,0.4)';
    ctx.lineWidth = 0.5;
    for (var i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * 8, y - 5);
      ctx.lineTo(x + i * 8, y + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - hw, y + i * 2);
      ctx.lineTo(x + hw, y + i * 2);
      ctx.stroke();
    }
    /* ceramic centre */
    ctx.fillStyle = '#ddd';
    ctx.beginPath();
    ctx.ellipse(x, y, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  /* Thermometer */
  drawThermometer: function(ctx, x, y, h, temp, maxTemp) {
    ctx.save();
    var w = 10;
    var bx = x - w / 2;
    var maxT = maxTemp || 100;
    var bulbR = 7;
    /* glass tube */
    var tubeGrad = ctx.createLinearGradient(bx, y, bx + w, y);
    tubeGrad.addColorStop(0, 'rgba(200,220,240,0.5)');
    tubeGrad.addColorStop(0.3, 'rgba(240,248,255,0.2)');
    tubeGrad.addColorStop(0.7, 'rgba(240,248,255,0.15)');
    tubeGrad.addColorStop(1, 'rgba(200,220,240,0.45)');
    ctx.fillStyle = tubeGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(bx, y, w, h - bulbR);
    ctx.strokeRect(bx, y, w, h - bulbR);
    /* bulb */
    ctx.fillStyle = '#e8e4df';
    ctx.beginPath();
    ctx.arc(x, y + h - bulbR + 2, bulbR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.stroke();
    /* mercury/red liquid */
    if (temp !== undefined && temp !== null) {
      var fillH = Math.max(0, Math.min(1, temp / maxT)) * (h - bulbR - 4);
      var liqTop = y + h - bulbR - fillH;
      ctx.fillStyle = '#cc2222';
      ctx.fillRect(x - 2, liqTop, 4, fillH + bulbR - 2);
      ctx.beginPath();
      ctx.arc(x, y + h - bulbR + 2, bulbR - 2, 0, Math.PI * 2);
      ctx.fill();
    }
    /* graduation marks */
    ctx.strokeStyle = 'rgba(80,80,80,0.5)';
    ctx.fillStyle = 'rgba(80,80,80,0.7)';
    ctx.font = '6px sans-serif';
    ctx.textAlign = 'right';
    for (var t = 0; t <= maxT; t += 10) {
      var my = y + h - bulbR - (t / maxT) * (h - bulbR - 4);
      var lw = (t % 20 === 0) ? 6 : 3;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(bx + w, my);
      ctx.lineTo(bx + w - lw, my);
      ctx.stroke();
      if (t % 20 === 0) ctx.fillText(t + '', bx + w - 8, my + 2);
    }
    ctx.textAlign = 'left';
    ctx.restore();
  },

  /* Funnel */
  drawFunnel: function(ctx, x, y, w, h, inverted) {
    ctx.save();
    var hw = w / 2;
    var coneH = h * 0.65;
    var stemH = h - coneH;
    var glassGrad = ctx.createLinearGradient(x - hw, 0, x + hw, 0);
    glassGrad.addColorStop(0, 'rgba(160,195,230,0.45)');
    glassGrad.addColorStop(0.15, 'rgba(200,225,245,0.2)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    glassGrad.addColorStop(0.85, 'rgba(200,225,245,0.18)');
    glassGrad.addColorStop(1, 'rgba(160,195,230,0.42)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.4;
    if (inverted) {
      /* inverted funnel — wide end down */
      ctx.beginPath();
      ctx.moveTo(x - hw, y + coneH);
      ctx.lineTo(x - 4, y);
      ctx.lineTo(x + 4, y);
      ctx.lineTo(x + hw, y + coneH);
      ctx.lineTo(x + hw - 4, y + coneH);
      ctx.lineTo(x + 3, y + 6);
      ctx.lineTo(x - 3, y + 6);
      ctx.lineTo(x - hw + 4, y + coneH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      /* stem */
      ctx.fillRect(x - 3, y - stemH, 6, stemH);
      ctx.strokeRect(x - 3, y - stemH, 6, stemH);
    } else {
      /* normal funnel — wide end up */
      ctx.beginPath();
      ctx.moveTo(x - hw, y);
      ctx.lineTo(x + hw, y);
      ctx.lineTo(x + 4, y + coneH);
      ctx.lineTo(x + 4, y + h);
      ctx.lineTo(x - 4, y + h);
      ctx.lineTo(x - 4, y + coneH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  },

  /* Wire loop (for flame tests) */
  drawWireLoop: function(ctx, x, y, sampleColor) {
    ctx.save();
    /* wire */
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 40);
    ctx.stroke();
    /* loop */
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y - 46, 6, 0, Math.PI * 2);
    ctx.stroke();
    /* sample in loop */
    if (sampleColor) {
      ctx.fillStyle = sampleColor;
      ctx.beginPath();
      ctx.arc(x, y - 46, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  },

  /* ── M7.1 Sublimation of Naphthalene ── */
  drawM7_1: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    var benchY = 560;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;

    this.drawTripod(ctx, cx - 60, benchY, 100);
    this.drawWireGauze(ctx, cx - 60, benchY - 70, 100);
    this.drawEvaporatingDish(ctx, cx - 60, benchY - 82, 70, 24, done ? '#c8c8c8' : '#e8e0d0');
    this.drawBunsen(ctx, cx - 60, benchY, heating || done, '#4488ff', heating ? 55 : 30);

    /* inverted funnel over dish */
    this.drawFunnel(ctx, cx - 60, benchY - 130, 80, 60, true);

    /* filter paper in funnel */
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.strokeStyle = 'rgba(180,180,180,0.5)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx - 60 - 32, benchY - 130);
    ctx.lineTo(cx - 60 + 32, benchY - 130);
    ctx.lineTo(cx - 60 + 3, benchY - 108);
    ctx.lineTo(cx - 60 - 3, benchY - 108);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    /* naphthalene vapour rising */
    if (heating) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#aaa';
      for (var i = 0; i < 5; i++) {
        var vy = benchY - 90 - i * 12 - (Date.now() / 30 % 12);
        var vx = cx - 60 + Math.sin((Date.now() / 200) + i) * 8;
        ctx.beginPath();
        ctx.arc(vx, vy, 3 + i * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    /* sublimate on funnel */
    if (done) {
      ctx.save();
      ctx.fillStyle = 'rgba(220,220,220,0.6)';
      for (var j = 0; j < 8; j++) {
        var sx = cx - 60 - 20 + (j % 4) * 12;
        var sy = benchY - 125 + Math.floor(j / 4) * 8;
        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* labels */
    ctx.save();
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555';
    ctx.textAlign = 'center';
    ctx.fillText('Evaporating dish', cx - 60, benchY + 20);
    ctx.fillText('Inverted funnel', cx - 60, benchY - 140);
    ctx.fillText('Bunsen burner', cx - 60, benchY + 35);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.2 Flame Tests ── */
  drawM7_2: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_2'];
    var cx = cw / 2;
    var benchY = 560;
    var ion = sim.ions[state.m7_ionIndex];
    var testing = state.m7ActionDone && state.simulation && !state.simulation.done;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;

    /* Bunsen burner */
    var flameColor = done && ion ? ion.flameHex : '#4488ff';
    var flameH = testing ? 70 : (done ? 60 : 40);
    this.drawBunsen(ctx, cx, benchY, true, flameColor, flameH);

    /* nichrome wire loop */
    if (testing || done) {
      this.drawWireLoop(ctx, cx, benchY - 54, done && ion ? ion.flameHex : '#888');
    }

    /* ion sample bottles in background */
    var colors = ['#ffcc00', '#cc66ff', '#cc4422', '#22aa66', '#66cc22'];
    for (var i = 0; i < 5; i++) {
      var bx = 40 + i * 35;
      ctx.save();
      ctx.fillStyle = '#e8e4df';
      ctx.strokeStyle = '#b0a89e';
      ctx.lineWidth = 1;
      ctx.fillRect(bx - 8, benchY - 30, 16, 30);
      ctx.strokeRect(bx - 8, benchY - 30, 16, 30);
      ctx.fillStyle = colors[i];
      ctx.globalAlpha = 0.5;
      ctx.fillRect(bx - 6, benchY - 18, 12, 16);
      ctx.globalAlpha = 1;
      /* cap */
      ctx.fillStyle = '#888';
      ctx.fillRect(bx - 5, benchY - 34, 10, 6);
      ctx.restore();
    }

    /* labels */
    ctx.save();
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555';
    ctx.textAlign = 'center';
    ctx.fillText('Bunsen burner', cx, benchY + 20);
    if (done && ion) {
      ctx.fillStyle = ion.flameHex;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(ion.name + ' \u2014 ' + ion.flameColour, cx, benchY - 140);
    }
    ctx.fillText('Ion samples', 120, benchY + 20);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.3 CuSO4 Crystals ── */
  drawM7_3: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    var benchY = 560;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var dissolving = state.m7ActionDone && state.simulation && !state.simulation.done;

    this.drawTripod(ctx, cx - 50, benchY, 90);
    this.drawWireGauze(ctx, cx - 50, benchY - 70, 90);
    this.drawEvaporatingDish(ctx, cx - 50, benchY - 82, 65, 22, done ? '#3366cc' : '#66aaff');
    this.drawBunsen(ctx, cx - 50, benchY, dissolving || done, '#4488ff', dissolving ? 50 : 28);

    /* funnel with filter paper */
    this.drawFunnel(ctx, cx + 70, benchY - 120, 60, 50, false);

    /* filter paper */
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.strokeStyle = 'rgba(180,180,180,0.5)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx + 70 - 24, benchY - 120);
    ctx.lineTo(cx + 70 + 24, benchY - 120);
    ctx.lineTo(cx + 70 + 3, benchY - 104);
    ctx.lineTo(cx + 70 - 3, benchY - 104);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    /* blue crystals */
    if (done) {
      ctx.save();
      ctx.fillStyle = '#3366cc';
      for (var i = 0; i < 6; i++) {
        var crx = cx + 70 - 14 + (i % 3) * 10;
        var cry = benchY - 112 + Math.floor(i / 3) * 6;
        ctx.fillRect(crx, cry, 7, 5);
      }
      ctx.restore();
    }

    /* steam */
    if (dissolving) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#aaa';
      for (var s = 0; s < 4; s++) {
        var sy = benchY - 95 - s * 14 - (Date.now() / 25 % 14);
        var sx = cx - 50 + Math.sin((Date.now() / 180) + s) * 6;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    ctx.save();
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555';
    ctx.textAlign = 'center';
    ctx.fillText('Evaporating dish', cx - 50, benchY + 20);
    ctx.fillText('Funnel', cx + 70, benchY + 20);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.4 Melting Point (Naphthalene) ── */
  drawM7_4: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_4'];
    var cx = cw / 2;
    var benchY = 560;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;
    var temp = done ? sim.expectedMeltingPoint : (heating ? 60 : 25);

    /* oil bath beaker */
    this.drawBeaker(ctx, cx - 30, benchY - 40, 90, 80, '#e8d090', 0.7);

    /* thermometer in oil bath */
    this.drawThermometer(ctx, cx - 30, benchY - 95, 90, temp, 120);

    /* capillary tube */
    ctx.save();
    ctx.strokeStyle = 'rgba(150,180,210,0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx + 10, benchY - 80);
    ctx.lineTo(cx + 10, benchY - 20);
    ctx.stroke();
    /* naphthalene in capillary */
    ctx.fillStyle = done ? '#e8d0c0' : '#f0e8e0';
    ctx.fillRect(cx + 9, benchY - 30, 2, 12);
    ctx.restore();

    /* Bunsen under beaker */
    this.drawBunsen(ctx, cx - 30, benchY, heating || done, '#4488ff', heating ? 45 : 25);

    /* temperature label */
    ctx.save();
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = done ? '#cc2222' : '#555';
    ctx.textAlign = 'center';
    ctx.fillText(temp.toFixed(1) + '\u00b0C', cx + 80, benchY - 60);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText('Oil bath', cx - 30, benchY + 20);
    ctx.fillText('Thermometer', cx - 30, benchY + 35);
    ctx.fillText('Capillary tube', cx + 30, benchY + 20);
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('MP: 80.26\u00b0C', cx + 80, benchY - 40);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.5 Boiling Point (Ethyl Alcohol) ── */
  drawM7_5: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_5'];
    var cx = cw / 2;
    var benchY = 560;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;
    var temp = done ? sim.expectedBoilingPoint : (heating ? 60 : 25);

    /* distillation flask */
    var fx = cx - 40;
    var fy = benchY - 50;
    ctx.save();
    var flaskGrad = ctx.createLinearGradient(fx - 30, fy, fx + 30, fy);
    flaskGrad.addColorStop(0, 'rgba(160,195,230,0.45)');
    flaskGrad.addColorStop(0.15, 'rgba(200,225,245,0.2)');
    flaskGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    flaskGrad.addColorStop(0.85, 'rgba(200,225,245,0.18)');
    flaskGrad.addColorStop(1, 'rgba(160,195,230,0.42)');
    ctx.fillStyle = flaskGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.8;
    /* round-bottom flask */
    ctx.beginPath();
    ctx.arc(fx, fy + 10, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* neck */
    ctx.fillRect(fx - 7, fy - 40, 14, 40);
    ctx.strokeRect(fx - 7, fy - 40, 14, 40);
    /* liquid inside */
    ctx.save();
    ctx.beginPath();
    ctx.arc(fx, fy + 10, 26, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#e8e0d0';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(fx - 30, fy, 60, 40);
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.restore();

    /* thermometer in flask neck */
    this.drawThermometer(ctx, fx, fy - 55, 70, temp, 120);

    /* side arm / delivery tube */
    ctx.save();
    ctx.strokeStyle = 'rgba(150,180,210,0.5)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(fx + 7, fy - 25);
    ctx.lineTo(fx + 50, fy - 25);
    ctx.lineTo(fx + 50, fy + 20);
    ctx.stroke();
    ctx.restore();

    /* condenser (simplified) */
    ctx.save();
    var conX = fx + 50;
    var conGrad = ctx.createLinearGradient(conX - 8, 0, conX + 8, 0);
    conGrad.addColorStop(0, 'rgba(160,195,230,0.4)');
    conGrad.addColorStop(0.5, 'rgba(240,248,255,0.1)');
    conGrad.addColorStop(1, 'rgba(160,195,230,0.38)');
    ctx.fillStyle = conGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.5)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(conX - 8, fy + 20, 16, 50);
    ctx.strokeRect(conX - 8, fy + 20, 16, 50);
    /* water jacket */
    ctx.strokeStyle = 'rgba(100,140,180,0.3)';
    ctx.strokeRect(conX - 12, fy + 18, 24, 54);
    ctx.restore();

    /* receiving flask */
    this.drawBeaker(ctx, conX, fy + 90, 40, 40, '#e8e0d0', done ? 0.5 : 0.1);

    /* Bunsen under flask */
    this.drawBunsen(ctx, fx, benchY, heating || done, '#4488ff', heating ? 45 : 25);

    /* bubbles in flask */
    if (heating) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (var b = 0; b < 4; b++) {
        var bx = fx - 12 + b * 8;
        var by = fy + 20 - ((Date.now() / 15 + b * 8) % 20);
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    ctx.save();
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555';
    ctx.textAlign = 'center';
    ctx.fillText('Distillation flask', fx, benchY + 20);
    ctx.fillText('Condenser', conX, benchY + 20);
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('BP: 78.37\u00b0C', conX + 40, fy + 40);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.6 Zn + CuSO4 Displacement ── */
  drawM7_6: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_6'];
    var cx = cw / 2;
    var benchY = 560;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var reacting = state.m7ActionDone && state.simulation && !state.simulation.done;

    /* beaker with CuSO4 */
    var liqColor = done ? '#d0d0d0' : '#3366cc';
    this.drawBeaker(ctx, cx, benchY - 45, 100, 90, liqColor, 0.65);

    /* Zn granules being added / in beaker */
    ctx.save();
    if (reacting || done) {
      ctx.fillStyle = '#888';
      for (var i = 0; i < 6; i++) {
        var gx = cx - 20 + (i % 3) * 16;
        var gy = benchY - 20 + Math.floor(i / 3) * 10;
        ctx.beginPath();
        ctx.arc(gx, gy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    /* Zn granules above (being added) */
    if (!reacting && !done) {
      ctx.fillStyle = '#999';
      for (var j = 0; j < 3; j++) {
        var ax = cx - 10 + j * 10;
        var ay = benchY - 120 + j * 5;
        ctx.beginPath();
        ctx.arc(ax, ay, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    /* copper deposit */
    if (done) {
      ctx.save();
      ctx.fillStyle = '#cc6622';
      for (var k = 0; k < 5; k++) {
        var dx = cx - 16 + k * 8;
        var dy = benchY - 18;
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* bubbles during reaction */
    if (reacting) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      for (var b = 0; b < 5; b++) {
        var bx = cx - 18 + b * 9;
        var by = benchY - 25 - ((Date.now() / 12 + b * 6) % 25);
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* colour change arrow */
    ctx.save();
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.fillText('Blue \u2192 Colourless', cx, benchY - 110);
    } else {
      ctx.fillStyle = '#3366cc';
      ctx.fillText('CuSO\u2084 solution (blue)', cx, benchY - 110);
    }
    ctx.fillStyle = '#555';
    ctx.fillText('Beaker with Zn + CuSO\u2084', cx, benchY + 20);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.7 Water Test (Anhydrous CuSO4) ── */
  drawM7_7: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    var benchY = 560;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var testing = state.m7ActionDone && state.simulation && !state.m7ObservationDone;

    /* test tube */
    var liqColor = done ? '#3366cc' : null;
    this.drawTestTube(ctx, cx, benchY - 50, 36, 100, liqColor, done ? 0.4 : 0);

    /* white powder (anhydrous CuSO4) in test tube */
    ctx.save();
    if (!done) {
      ctx.fillStyle = '#f0f0f0';
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - 14, benchY - 25);
      ctx.lineTo(cx + 14, benchY - 25);
      ctx.lineTo(cx + 10, benchY - 10);
      ctx.lineTo(cx - 10, benchY - 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();

    /* dropper adding water */
    ctx.save();
    var dropX = cx + 35;
    var dropY = benchY - 100;
    /* dropper body */
    var dGrad = ctx.createLinearGradient(dropX - 5, 0, dropX + 5, 0);
    dGrad.addColorStop(0, 'rgba(180,200,220,0.5)');
    dGrad.addColorStop(0.5, 'rgba(240,248,255,0.2)');
    dGrad.addColorStop(1, 'rgba(180,200,220,0.48)');
    ctx.fillStyle = dGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.5)';
    ctx.lineWidth = 1;
    ctx.fillRect(dropX - 4, dropY, 8, 30);
    ctx.strokeRect(dropX - 4, dropY, 8, 30);
    /* bulb */
    ctx.fillStyle = '#c5c0b8';
    ctx.beginPath();
    ctx.ellipse(dropX, dropY - 4, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#a0a0a0';
    ctx.stroke();
    /* tip */
    ctx.beginPath();
    ctx.moveTo(dropX - 2, dropY + 30);
    ctx.lineTo(dropX, dropY + 38);
    ctx.lineTo(dropX + 2, dropY + 30);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    /* water drop falling */
    if (testing) {
      ctx.save();
      ctx.fillStyle = 'rgba(100,180,230,0.6)';
      var dropProgress = (Date.now() % 800) / 800;
      var dropY2 = dropY + 40 + dropProgress * 30;
      ctx.beginPath();
      ctx.ellipse(dropX, dropY2, 3, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    /* colour change indicator */
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '10px sans-serif';
    if (done) {
      ctx.fillStyle = '#3366cc';
      ctx.fillText('White \u2192 Blue (water present)', cx, benchY - 120);
    } else {
      ctx.fillStyle = '#888';
      ctx.fillText('Anhydrous CuSO\u2084 (white)', cx, benchY - 120);
    }
    ctx.fillStyle = '#555';
    ctx.fillText('Test tube', cx, benchY + 20);
    ctx.fillText('Dropper', cx + 35, benchY + 20);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.8 Water Purity Test ── */
  drawM7_8: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_8'];
    var cx = cw / 2;
    var benchY = 560;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.m7ObservationDone;
    var temp = done ? 100 : (heating ? 70 : 25);

    /* beaker with water */
    this.drawBeaker(ctx, cx - 40, benchY - 45, 90, 80, '#a0d0f0', 0.65);

    /* thermometer */
    this.drawThermometer(ctx, cx - 40, benchY - 100, 90, temp, 110);

    /* Bunsen */
    this.drawBunsen(ctx, cx - 40, benchY, heating || done, '#4488ff', heating ? 50 : 25);

    /* second beaker (ice/melting) */
    this.drawBeaker(ctx, cx + 70, benchY - 35, 70, 60, done ? '#d0e8f8' : '#e0f0ff', 0.5);

    /* ice cubes */
    ctx.save();
    ctx.fillStyle = 'rgba(200,230,250,0.6)';
    ctx.strokeStyle = 'rgba(150,190,220,0.5)';
    ctx.lineWidth = 0.8;
    for (var i = 0; i < 3; i++) {
      var ix = cx + 58 + (i % 2) * 16;
      var iy = benchY - 30 + Math.floor(i / 2) * 12;
      ctx.fillRect(ix, iy, 12, 10);
      ctx.strokeRect(ix, iy, 12, 10);
    }
    ctx.restore();

    /* temperature labels */
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px sans-serif';
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.fillText('BP: 100\u00b0C', cx - 40, benchY - 120);
      ctx.fillStyle = '#3366cc';
      ctx.fillText('MP: 0\u00b0C', cx + 70, benchY - 60);
    } else {
      ctx.fillStyle = '#555';
      ctx.fillText(temp.toFixed(0) + '\u00b0C', cx + 30, benchY - 70);
    }
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText('Water (heating)', cx - 40, benchY + 20);
    ctx.fillText('Ice (melting)', cx + 70, benchY + 20);
    if (done) {
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('Pure water confirmed', cx, benchY + 40);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    // M7 canvas clicks - no interaction needed for most
  }
};
