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

  /* Lab bench background — realistic tiled wall + wooden bench */
  drawBench: function(ctx, cw, ch) {
    ctx.save();
    var benchY = 540;
    /* tiled wall */
    var wallGrad = ctx.createLinearGradient(0, 0, 0, benchY);
    wallGrad.addColorStop(0, '#f2f4f7');
    wallGrad.addColorStop(0.4, '#e8ecf1');
    wallGrad.addColorStop(1, '#dfe4ea');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, cw, benchY);
    /* tile lines */
    ctx.strokeStyle = 'rgba(200,210,220,0.4)';
    ctx.lineWidth = 0.5;
    for (var ty = 0; ty < benchY; ty += 40) {
      ctx.beginPath();
      ctx.moveTo(0, ty);
      ctx.lineTo(cw, ty);
      ctx.stroke();
    }
    for (var tx = 0; tx < cw; tx += 40) {
      ctx.beginPath();
      ctx.moveTo(tx, 0);
      ctx.lineTo(tx, benchY);
      ctx.stroke();
    }
    /* wooden bench */
    var benchGrad = ctx.createLinearGradient(0, benchY, 0, ch);
    benchGrad.addColorStop(0, '#d4a574');
    benchGrad.addColorStop(0.15, '#c9986a');
    benchGrad.addColorStop(0.5, '#bf8f60');
    benchGrad.addColorStop(1, '#a87d50');
    ctx.fillStyle = benchGrad;
    ctx.fillRect(0, benchY, cw, ch - benchY);
    /* wood grain */
    ctx.strokeStyle = 'rgba(140,90,50,0.2)';
    ctx.lineWidth = 1;
    for (var wg = 0; wg < 8; wg++) {
      var wy = benchY + 8 + wg * 12;
      ctx.beginPath();
      ctx.moveTo(0, wy);
      for (var wx = 0; wx < cw; wx += 20) {
        ctx.lineTo(wx, wy + Math.sin(wx * 0.05 + wg) * 2);
      }
      ctx.stroke();
    }
    /* bench edge highlight */
    ctx.strokeStyle = 'rgba(255,220,180,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY + 1);
    ctx.lineTo(cw, benchY + 1);
    ctx.stroke();
    ctx.restore();
  },

  /* ── Reusable lab equipment helpers — LARGE SCALE ── */

  /* Bunsen burner — large realistic */
  drawBunsen: function(ctx, x, baseY, flameOn, flameColor, flameH) {
    ctx.save();
    var h = flameH || 70;
    /* heavy base */
    var baseGrad = ctx.createLinearGradient(x - 32, baseY - 8, x + 32, baseY + 6);
    baseGrad.addColorStop(0, '#555');
    baseGrad.addColorStop(0.3, '#888');
    baseGrad.addColorStop(0.5, '#aaa');
    baseGrad.addColorStop(0.7, '#888');
    baseGrad.addColorStop(1, '#444');
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.ellipse(x, baseY, 32, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    /* air hole collar */
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.ellipse(x, baseY - 8, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.stroke();
    /* barrel */
    var barrelGrad = ctx.createLinearGradient(x - 9, 0, x + 9, 0);
    barrelGrad.addColorStop(0, '#666');
    barrelGrad.addColorStop(0.25, '#aaa');
    barrelGrad.addColorStop(0.5, '#ccc');
    barrelGrad.addColorStop(0.75, '#999');
    barrelGrad.addColorStop(1, '#555');
    ctx.fillStyle = barrelGrad;
    ctx.fillRect(x - 9, baseY - 75, 18, 68);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 9, baseY - 75, 18, 68);
    /* top collar */
    ctx.fillStyle = '#555';
    ctx.fillRect(x - 12, baseY - 82, 24, 8);
    ctx.strokeStyle = '#333';
    ctx.strokeRect(x - 12, baseY - 82, 24, 8);
    /* flame */
    if (flameOn) {
      var fc = flameColor || '#4488ff';
      var fy = baseY - 82;
      /* outer flame */
      var outerGrad = ctx.createRadialGradient(x, fy - h * 0.35, 3, x, fy - h * 0.35, h * 0.55);
      outerGrad.addColorStop(0, fc);
      outerGrad.addColorStop(0.4, fc);
      outerGrad.addColorStop(0.8, fc);
      outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.moveTo(x - 18, fy);
      ctx.quadraticCurveTo(x - 14, fy - h * 0.45, x, fy - h);
      ctx.quadraticCurveTo(x + 14, fy - h * 0.45, x + 18, fy);
      ctx.closePath();
      ctx.fill();
      /* inner cone */
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath();
      ctx.moveTo(x - 6, fy);
      ctx.quadraticCurveTo(x - 3, fy - h * 0.3, x, fy - h * 0.55);
      ctx.quadraticCurveTo(x + 3, fy - h * 0.3, x + 6, fy);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  },

  /* Beaker — large realistic */
  drawBeaker: function(ctx, x, y, w, h, liquidColor, liquidLevel) {
    ctx.save();
    var bx = x - w / 2;
    var by = y - h / 2;
    var lvl = liquidLevel || 0;
    /* glass body with pour spout */
    var glassGrad = ctx.createLinearGradient(bx, by, bx + w, by);
    glassGrad.addColorStop(0, 'rgba(140,180,220,0.5)');
    glassGrad.addColorStop(0.08, 'rgba(180,210,240,0.25)');
    glassGrad.addColorStop(0.25, 'rgba(210,230,250,0.1)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    glassGrad.addColorStop(0.75, 'rgba(210,230,250,0.08)');
    glassGrad.addColorStop(0.92, 'rgba(180,210,240,0.22)');
    glassGrad.addColorStop(1, 'rgba(140,180,220,0.48)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.6)';
    ctx.lineWidth = 2.2;
    /* body with spout */
    ctx.beginPath();
    ctx.moveTo(bx + 4, by + 10);
    ctx.lineTo(bx + 4, by + h - 8);
    ctx.quadraticCurveTo(bx + 4, by + h, bx + 12, by + h);
    ctx.lineTo(bx + w - 12, by + h);
    ctx.quadraticCurveTo(bx + w - 4, by + h, bx + w - 4, by + h - 8);
    ctx.lineTo(bx + w - 4, by + 10);
    /* spout */
    ctx.lineTo(bx + w + 2, by + 4);
    ctx.lineTo(bx + w - 2, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* liquid */
    if (lvl > 0 && liquidColor) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bx + 4, by + 10);
      ctx.lineTo(bx + 4, by + h - 8);
      ctx.quadraticCurveTo(bx + 4, by + h, bx + 12, by + h);
      ctx.lineTo(bx + w - 12, by + h);
      ctx.quadraticCurveTo(bx + w - 4, by + h, bx + w - 4, by + h - 8);
      ctx.lineTo(bx + w - 4, by + 10);
      ctx.closePath();
      ctx.clip();
      var liqTop = by + h * (1 - lvl);
      /* liquid body */
      ctx.fillStyle = liquidColor;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(bx, liqTop, w, by + h - liqTop);
      /* liquid surface */
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(x, liqTop, w / 2 - 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    /* rim highlight */
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(x, by + 8, w / 2 - 6, 4, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* glass highlight streak */
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillRect(bx + 10, by + 18, 4, h - 30);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(bx + w - 14, by + 18, 2, h - 30);
    /* graduation marks */
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1;
    for (var i = 1; i <= 5; i++) {
      var gy = by + h - 12 - (i / 6) * (h - 20);
      ctx.beginPath();
      ctx.moveTo(bx + w - 6, gy);
      ctx.lineTo(bx + w - 18, gy);
      ctx.stroke();
      /* tick marks */
      ctx.beginPath();
      ctx.moveTo(bx + w - 6, gy);
      ctx.lineTo(bx + w - 10, gy);
      ctx.stroke();
    }
    ctx.restore();
  },

  /* Test tube — large realistic */
  drawTestTube: function(ctx, x, y, w, h, liquidColor, liquidLevel) {
    ctx.save();
    var bx = x - w / 2;
    var by = y - h / 2;
    var r = w / 2;
    var lvl = liquidLevel || 0;
    /* glass body */
    var glassGrad = ctx.createLinearGradient(bx, by, bx + w, by);
    glassGrad.addColorStop(0, 'rgba(140,180,220,0.5)');
    glassGrad.addColorStop(0.12, 'rgba(180,210,240,0.25)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    glassGrad.addColorStop(0.88, 'rgba(180,210,240,0.22)');
    glassGrad.addColorStop(1, 'rgba(140,180,220,0.48)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.6)';
    ctx.lineWidth = 2;
    /* body with rounded bottom */
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by + h - r);
    ctx.quadraticCurveTo(bx, by + h, x, by + h);
    ctx.quadraticCurveTo(bx + w, by + h, bx + w, by + h - r);
    ctx.lineTo(bx + w, by);
    /* rim lip */
    ctx.lineTo(bx + w + 2, by - 2);
    ctx.lineTo(bx - 2, by - 2);
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
      ctx.globalAlpha = 0.6;
      ctx.fillRect(bx, liqTop, w, by + h - liqTop);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(x, liqTop, w / 2 - 3, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    /* rim highlight */
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(x, by, w / 2 + 1, 3.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* glass highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillRect(bx + 3, by + 10, 3, h - 20);
    ctx.restore();
  },

  /* Evaporating dish — large realistic */
  drawEvaporatingDish: function(ctx, x, y, w, h, contentsColor) {
    ctx.save();
    var bx = x - w / 2;
    var by = y - h / 2;
    /* porcelain dish body */
    var dishGrad = ctx.createLinearGradient(bx, by, bx + w, by);
    dishGrad.addColorStop(0, '#d4cfc8');
    dishGrad.addColorStop(0.15, '#ebe7e2');
    dishGrad.addColorStop(0.4, '#f5f2ee');
    dishGrad.addColorStop(0.6, '#f0ece7');
    dishGrad.addColorStop(0.85, '#e5e0da');
    dishGrad.addColorStop(1, '#c8c2ba');
    ctx.fillStyle = dishGrad;
    ctx.strokeStyle = '#a09890';
    ctx.lineWidth = 2;
    /* dish shape */
    ctx.beginPath();
    ctx.moveTo(bx + 6, by + 2);
    ctx.lineTo(bx + w - 6, by + 2);
    ctx.quadraticCurveTo(bx + w, by + 2, bx + w, by + 10);
    ctx.lineTo(bx + w - 10, by + h - 6);
    ctx.quadraticCurveTo(bx + w - 12, by + h, x, by + h);
    ctx.quadraticCurveTo(bx + 12, by + h, bx + 10, by + h - 6);
    ctx.lineTo(bx, by + 10);
    ctx.quadraticCurveTo(bx, by + 2, bx + 6, by + 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* contents */
    if (contentsColor) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bx + 8, by + 6);
      ctx.lineTo(bx + w - 8, by + 6);
      ctx.lineTo(bx + w - 12, by + h - 8);
      ctx.quadraticCurveTo(bx + w - 14, by + h - 3, x, by + h - 3);
      ctx.quadraticCurveTo(bx + 14, by + h - 3, bx + 12, by + h - 8);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = contentsColor;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(bx, by + 6, w, h - 12);
      /* surface highlight */
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(x, by + 8, w / 2 - 10, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    /* rim highlight */
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, by + 4, w / 2 - 8, 3, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* porcelain shine */
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    ctx.ellipse(x - w * 0.2, by + h * 0.4, 6, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  /* Tripod stand — large realistic */
  drawTripod: function(ctx, x, baseY, w) {
    ctx.save();
    var hw = w / 2;
    /* three legs */
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 4;
    /* left leg */
    ctx.beginPath();
    ctx.moveTo(x - hw, baseY);
    ctx.quadraticCurveTo(x - hw + 6, baseY - 40, x - hw + 10, baseY - 95);
    ctx.stroke();
    /* right leg */
    ctx.beginPath();
    ctx.moveTo(x + hw, baseY);
    ctx.quadraticCurveTo(x + hw - 6, baseY - 40, x + hw - 10, baseY - 95);
    ctx.stroke();
    /* center leg */
    ctx.beginPath();
    ctx.moveTo(x, baseY + 3);
    ctx.lineTo(x, baseY - 90);
    ctx.stroke();
    /* rubber feet */
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(x - hw, baseY, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + hw, baseY, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    /* ring */
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(x, baseY - 95, hw - 4, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* ring highlight */
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, baseY - 96, hw - 6, 5, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  },

  /* Wire gauze — large realistic */
  drawWireGauze: function(ctx, x, y, w) {
    ctx.save();
    var hw = w / 2;
    /* ceramic center pad */
    ctx.fillStyle = '#d0ccc4';
    ctx.strokeStyle = '#a09890';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* wire mesh */
    ctx.fillStyle = '#b8b0a4';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y, hw, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* mesh grid lines */
    ctx.strokeStyle = 'rgba(100,100,100,0.35)';
    ctx.lineWidth = 0.6;
    for (var i = -4; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * 10, y - 7);
      ctx.lineTo(x + i * 10, y + 7);
      ctx.stroke();
    }
    for (var j = -2; j <= 2; j++) {
      ctx.beginPath();
      ctx.moveTo(x - hw, y + j * 3);
      ctx.lineTo(x + hw, y + j * 3);
      ctx.stroke();
    }
    ctx.restore();
  },

  /* Thermometer — large realistic */
  drawThermometer: function(ctx, x, y, h, temp, maxTemp) {
    ctx.save();
    var w = 14;
    var bx = x - w / 2;
    var maxT = maxTemp || 100;
    var bulbR = 10;
    /* glass tube */
    var tubeGrad = ctx.createLinearGradient(bx, y, bx + w, y);
    tubeGrad.addColorStop(0, 'rgba(180,210,235,0.55)');
    tubeGrad.addColorStop(0.2, 'rgba(220,238,252,0.2)');
    tubeGrad.addColorStop(0.5, 'rgba(245,250,255,0.08)');
    tubeGrad.addColorStop(0.8, 'rgba(220,238,252,0.18)');
    tubeGrad.addColorStop(1, 'rgba(180,210,235,0.5)');
    ctx.fillStyle = tubeGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.6)';
    ctx.lineWidth = 1.5;
    /* tube body */
    ctx.beginPath();
    ctx.moveTo(bx, y + 2);
    ctx.lineTo(bx, y + h - bulbR);
    ctx.quadraticCurveTo(bx, y + h - bulbR + 4, x - bulbR + 4, y + h - bulbR + 4);
    ctx.lineTo(x + bulbR - 4, y + h - bulbR + 4);
    ctx.quadraticCurveTo(x + bulbR, y + h - bulbR + 4, x + bulbR, y + h - bulbR);
    ctx.lineTo(x + bulbR, y + 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* bulb */
    var bulbGrad = ctx.createRadialGradient(x - 2, y + h - 2, 1, x, y + h, bulbR);
    bulbGrad.addColorStop(0, '#e8e4df');
    bulbGrad.addColorStop(0.7, '#d0c8c0');
    bulbGrad.addColorStop(1, '#b8b0a8');
    ctx.fillStyle = bulbGrad;
    ctx.beginPath();
    ctx.arc(x, y + h, bulbR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(80,120,160,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    /* mercury column */
    if (temp !== undefined && temp !== null) {
      var fillH = Math.max(0, Math.min(1, temp / maxT)) * (h - bulbR - 8);
      var liqTop = y + h - bulbR - fillH;
      ctx.fillStyle = '#cc2222';
      ctx.fillRect(x - 3, liqTop, 6, fillH + bulbR - 4);
      /* mercury in bulb */
      ctx.beginPath();
      ctx.arc(x, y + h, bulbR - 3, 0, Math.PI * 2);
      ctx.fill();
    }
    /* graduation marks */
    ctx.strokeStyle = 'rgba(60,60,60,0.55)';
    ctx.fillStyle = 'rgba(60,60,60,0.75)';
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'right';
    for (var t = 0; t <= maxT; t += 10) {
      var my = y + h - bulbR - (t / maxT) * (h - bulbR - 8);
      var lw = (t % 20 === 0) ? 8 : 4;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(bx + w, my);
      ctx.lineTo(bx + w - lw, my);
      ctx.stroke();
      if (t % 20 === 0) ctx.fillText(t + '', bx + w - 10, my + 2.5);
    }
    ctx.textAlign = 'left';
    /* glass highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(bx + 2, y + 6, 3, h - bulbR - 8);
    ctx.restore();
  },

  /* Funnel — large realistic */
  drawFunnel: function(ctx, x, y, w, h, inverted) {
    ctx.save();
    var hw = w / 2;
    var coneH = h * 0.65;
    var stemH = h - coneH;
    var glassGrad = ctx.createLinearGradient(x - hw, 0, x + hw, 0);
    glassGrad.addColorStop(0, 'rgba(140,180,220,0.5)');
    glassGrad.addColorStop(0.12, 'rgba(180,210,240,0.25)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    glassGrad.addColorStop(0.88, 'rgba(180,210,240,0.22)');
    glassGrad.addColorStop(1, 'rgba(140,180,220,0.48)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.6)';
    ctx.lineWidth = 1.8;
    if (inverted) {
      /* inverted funnel — wide end down */
      ctx.beginPath();
      ctx.moveTo(x - hw, y + coneH);
      ctx.lineTo(x - 6, y);
      ctx.lineTo(x + 6, y);
      ctx.lineTo(x + hw, y + coneH);
      ctx.lineTo(x + hw - 6, y + coneH);
      ctx.lineTo(x + 4, y + 8);
      ctx.lineTo(x - 4, y + 8);
      ctx.lineTo(x - hw + 6, y + coneH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      /* stem */
      ctx.fillRect(x - 5, y - stemH, 10, stemH);
      ctx.strokeRect(x - 5, y - stemH, 10, stemH);
    } else {
      /* normal funnel — wide end up */
      ctx.beginPath();
      ctx.moveTo(x - hw, y);
      ctx.lineTo(x + hw, y);
      ctx.lineTo(x + 6, y + coneH);
      ctx.lineTo(x + 6, y + h);
      ctx.lineTo(x - 6, y + h);
      ctx.lineTo(x - 6, y + coneH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  },

  /* Wire loop — large realistic */
  drawWireLoop: function(ctx, x, y, sampleColor) {
    ctx.save();
    /* wire handle */
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 60);
    ctx.stroke();
    /* loop */
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y - 68, 10, 0, Math.PI * 2);
    ctx.stroke();
    /* sample in loop */
    if (sampleColor) {
      ctx.fillStyle = sampleColor;
      ctx.beginPath();
      ctx.arc(x, y - 68, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  },

  /* Dropper — large realistic */
  drawDropper: function(ctx, x, y, filled) {
    ctx.save();
    /* glass tube */
    var tubeGrad = ctx.createLinearGradient(x - 6, y, x + 6, y);
    tubeGrad.addColorStop(0, 'rgba(160,195,220,0.5)');
    tubeGrad.addColorStop(0.3, 'rgba(210,230,245,0.2)');
    tubeGrad.addColorStop(0.7, 'rgba(210,230,245,0.18)');
    tubeGrad.addColorStop(1, 'rgba(160,195,220,0.48)');
    ctx.fillStyle = tubeGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.55)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(x - 6, y, 12, 40);
    ctx.strokeRect(x - 6, y, 12, 40);
    /* liquid inside */
    if (filled) {
      ctx.fillStyle = 'rgba(100,180,230,0.5)';
      ctx.fillRect(x - 4, y + 10, 8, 28);
    }
    /* rubber bulb */
    var bulbGrad = ctx.createRadialGradient(x - 2, y - 6, 2, x, y - 4, 10);
    bulbGrad.addColorStop(0, '#d4cfc8');
    bulbGrad.addColorStop(0.6, '#c0b8b0');
    bulbGrad.addColorStop(1, '#a89888');
    ctx.fillStyle = bulbGrad;
    ctx.beginPath();
    ctx.ellipse(x, y - 4, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();
    /* tip */
    ctx.fillStyle = '#a09890';
    ctx.beginPath();
    ctx.moveTo(x - 3, y + 40);
    ctx.lineTo(x, y + 52);
    ctx.lineTo(x + 3, y + 40);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  /* ── M7.1 Sublimation of Naphthalene — WIDE ── */
  drawM7_1: function(ctx, cw, ch, state) {
    var cx = cw / 2 + 20;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;

    /* ── Left: labelled mixture jar ── */
    ctx.save();
    var jx = 55, jy = benchY - 55;
    /* jar body */
    var jarGrad = ctx.createLinearGradient(jx - 22, 0, jx + 22, 0);
    jarGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    jarGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    jarGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    jarGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = jarGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(jx - 22, jy - 40);
    ctx.lineTo(jx - 22, jy + 40);
    ctx.quadraticCurveTo(jx - 22, jy + 48, jx - 14, jy + 48);
    ctx.lineTo(jx + 14, jy + 48);
    ctx.quadraticCurveTo(jx + 22, jy + 48, jx + 22, jy + 40);
    ctx.lineTo(jx + 22, jy - 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* mixture inside */
    ctx.fillStyle = '#c8b898';
    ctx.globalAlpha = 0.6;
    ctx.fillRect(jx - 18, jy - 5, 36, 45);
    ctx.globalAlpha = 1;
    /* grains */
    ctx.fillStyle = '#a09070';
    for (var g = 0; g < 8; g++) {
      ctx.beginPath();
      ctx.arc(jx - 12 + (g % 4) * 8, jy + 5 + Math.floor(g / 4) * 12, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    /* white label */
    ctx.fillStyle = '#fff';
    ctx.fillRect(jx - 18, jy - 35, 36, 28);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(jx - 18, jy - 35, 36, 28);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 6px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Naphthalene', jx, jy - 26);
    ctx.fillText('+ Sand', jx, jy - 18);
    ctx.fillText('+ Salt', jx, jy - 10);
    /* lid */
    ctx.fillStyle = '#888';
    ctx.fillRect(jx - 16, jy - 48, 32, 10);
    ctx.strokeStyle = '#666';
    ctx.strokeRect(jx - 16, jy - 48, 32, 10);
    ctx.textAlign = 'left';
    ctx.restore();

    /* ── Tripod stand (black metal) ── */
    ctx.save();
    var tx = cx, ty = benchY;
    var thw = 70;
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 5;
    /* left leg */
    ctx.beginPath();
    ctx.moveTo(tx - thw, ty);
    ctx.quadraticCurveTo(tx - thw + 8, ty - 50, tx - thw + 14, ty - 110);
    ctx.stroke();
    /* right leg */
    ctx.beginPath();
    ctx.moveTo(tx + thw, ty);
    ctx.quadraticCurveTo(tx + thw - 8, ty - 50, tx + thw - 14, ty - 110);
    ctx.stroke();
    /* center leg */
    ctx.beginPath();
    ctx.moveTo(tx, ty + 4);
    ctx.lineTo(tx, ty - 105);
    ctx.stroke();
    /* rubber feet */
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(tx - thw, ty, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(tx + thw, ty, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    /* top ring */
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(tx, ty - 110, thw - 8, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    /* ── Wire gauze (black mesh) ── */
    ctx.save();
    var gx = cx, gy = benchY - 112;
    var ghw = 68;
    /* ceramic centre */
    ctx.fillStyle = '#c8c0b4';
    ctx.strokeStyle = '#a09890';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(gx, gy, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* black mesh */
    ctx.fillStyle = '#3a3a3a';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(gx, gy, ghw, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* mesh grid */
    ctx.strokeStyle = 'rgba(80,80,80,0.5)';
    ctx.lineWidth = 0.7;
    for (var mi = -5; mi <= 5; mi++) {
      ctx.beginPath();
      ctx.moveTo(gx + mi * 12, gy - 6);
      ctx.lineTo(gx + mi * 12, gy + 6);
      ctx.stroke();
    }
    for (var mj = -2; mj <= 2; mj++) {
      ctx.beginPath();
      ctx.moveTo(gx - ghw, gy + mj * 2.5);
      ctx.lineTo(gx + ghw, gy + mj * 2.5);
      ctx.stroke();
    }
    ctx.restore();

    /* ── China dish (white porcelain) ── */
    ctx.save();
    var dx = cx, dy = benchY - 125;
    var dw = 85, dh = 28;
    var dbx = dx - dw / 2, dby = dy - dh / 2;
    /* dish body */
    var dishGrad = ctx.createLinearGradient(dbx, dby, dbx + dw, dby);
    dishGrad.addColorStop(0, '#e8e4e0');
    dishGrad.addColorStop(0.2, '#f8f6f4');
    dishGrad.addColorStop(0.5, '#ffffff');
    dishGrad.addColorStop(0.8, '#f4f2f0');
    dishGrad.addColorStop(1, '#ddd8d2');
    ctx.fillStyle = dishGrad;
    ctx.strokeStyle = '#b0a8a0';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(dbx + 5, dby + 2);
    ctx.lineTo(dbx + dw - 5, dby + 2);
    ctx.quadraticCurveTo(dbx + dw, dby + 2, dbx + dw, dby + 8);
    ctx.lineTo(dbx + dw - 8, dby + dh - 4);
    ctx.quadraticCurveTo(dbx + dw - 10, dby + dh, dx, dby + dh);
    ctx.quadraticCurveTo(dbx + 10, dby + dh, dbx + 8, dby + dh - 4);
    ctx.lineTo(dbx, dby + 8);
    ctx.quadraticCurveTo(dbx, dby + 2, dbx + 5, dby + 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* mixture inside (sand + salt + naphthalene) */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(dbx + 7, dby + 5);
    ctx.lineTo(dbx + dw - 7, dby + 5);
    ctx.lineTo(dbx + dw - 10, dby + dh - 6);
    ctx.quadraticCurveTo(dbx + dw - 12, dby + dh - 2, dx, dby + dh - 2);
    ctx.quadraticCurveTo(dbx + 12, dby + dh - 2, dbx + 10, dby + dh - 6);
    ctx.closePath();
    ctx.clip();
    /* base colour */
    ctx.fillStyle = '#d4c8a8';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(dbx, dby + 5, dw, dh - 8);
    /* grains */
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#b8a880';
    for (var mg = 0; mg < 12; mg++) {
      var mgx = dbx + 10 + (mg % 6) * 11;
      var mgy = dby + 8 + Math.floor(mg / 6) * 8;
      ctx.beginPath();
      ctx.arc(mgx, mgy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    /* white salt grains */
    ctx.fillStyle = '#f0f0f0';
    for (var sg = 0; sg < 6; sg++) {
      var sgx = dbx + 14 + (sg % 3) * 18;
      var sgy = dby + 10 + Math.floor(sg / 3) * 7;
      ctx.beginPath();
      ctx.arc(sgx, sgy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    /* rim highlight */
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(dx, dby + 3, dw / 2 - 8, 3, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    /* ── Bunsen burner (with orange gas tube) ── */
    ctx.save();
    var bx = cx, by = benchY;
    /* heavy base */
    var baseGrad = ctx.createLinearGradient(bx - 28, by - 8, bx + 28, by + 6);
    baseGrad.addColorStop(0, '#444');
    baseGrad.addColorStop(0.3, '#777');
    baseGrad.addColorStop(0.5, '#999');
    baseGrad.addColorStop(0.7, '#777');
    baseGrad.addColorStop(1, '#333');
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.ellipse(bx, by, 28, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    /* air collar */
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.ellipse(bx, by - 10, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    /* barrel */
    var barrelGrad = ctx.createLinearGradient(bx - 8, 0, bx + 8, 0);
    barrelGrad.addColorStop(0, '#555');
    barrelGrad.addColorStop(0.3, '#999');
    barrelGrad.addColorStop(0.5, '#bbb');
    barrelGrad.addColorStop(0.7, '#888');
    barrelGrad.addColorStop(1, '#444');
    ctx.fillStyle = barrelGrad;
    ctx.fillRect(bx - 8, by - 72, 16, 64);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx - 8, by - 72, 16, 64);
    /* top collar */
    ctx.fillStyle = '#444';
    ctx.fillRect(bx - 10, by - 78, 20, 8);
    /* orange gas tube */
    ctx.strokeStyle = '#e87820';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(bx + 28, by);
    ctx.quadraticCurveTo(bx + 60, by + 5, bx + 90, by + 2);
    ctx.stroke();
    ctx.strokeStyle = '#c06018';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bx + 28, by);
    ctx.quadraticCurveTo(bx + 60, by + 5, bx + 90, by + 2);
    ctx.stroke();
    /* flame */
    var flameH = heating ? 80 : (done ? 50 : 35);
    var fy = by - 78;
    var outerGrad = ctx.createRadialGradient(bx, fy - flameH * 0.35, 3, bx, fy - flameH * 0.35, flameH * 0.55);
    outerGrad.addColorStop(0, '#ffaa00');
    outerGrad.addColorStop(0.3, '#ff8800');
    outerGrad.addColorStop(0.7, '#ff6600');
    outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.moveTo(bx - 14, fy);
    ctx.quadraticCurveTo(bx - 10, fy - flameH * 0.45, bx, fy - flameH);
    ctx.quadraticCurveTo(bx + 10, fy - flameH * 0.45, bx + 14, fy);
    ctx.closePath();
    ctx.fill();
    /* inner blue cone */
    ctx.fillStyle = 'rgba(80,120,255,0.5)';
    ctx.beginPath();
    ctx.moveTo(bx - 5, fy);
    ctx.quadraticCurveTo(bx - 2, fy - flameH * 0.3, bx, fy - flameH * 0.55);
    ctx.quadraticCurveTo(bx + 2, fy - flameH * 0.3, bx + 5, fy);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    /* ── Inverted funnel (large, over china dish) ── */
    ctx.save();
    var fx = cx, fy2 = benchY - 155;
    var fw = 120, fh = 100;
    var coneH = fh * 0.7;
    var fhw = fw / 2;
    var funGrad = ctx.createLinearGradient(fx - fhw, 0, fx + fhw, 0);
    funGrad.addColorStop(0, 'rgba(160,195,225,0.4)');
    funGrad.addColorStop(0.1, 'rgba(200,225,245,0.18)');
    funGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    funGrad.addColorStop(0.9, 'rgba(200,225,245,0.15)');
    funGrad.addColorStop(1, 'rgba(160,195,225,0.38)');
    ctx.fillStyle = funGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.55)';
    ctx.lineWidth = 2;
    /* cone (wide end down) */
    ctx.beginPath();
    ctx.moveTo(fx - fhw, fy2 + coneH);
    ctx.lineTo(fx - 8, fy2);
    ctx.lineTo(fx + 8, fy2);
    ctx.lineTo(fx + fhw, fy2 + coneH);
    ctx.lineTo(fx + fhw - 8, fy2 + coneH);
    ctx.lineTo(fx + 5, fy2 + 10);
    ctx.lineTo(fx - 5, fy2 + 10);
    ctx.lineTo(fx - fhw + 8, fy2 + coneH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* stem */
    ctx.fillRect(fx - 6, fy2 - 35, 12, 35);
    ctx.strokeRect(fx - 6, fy2 - 35, 12, 35);
    ctx.restore();

    /* ── Cotton plug in funnel stem ── */
    ctx.save();
    var cpx = cx, cpy = fy2 - 40;
    ctx.fillStyle = '#f5f2ee';
    ctx.strokeStyle = '#d0ccc4';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cpx, cpy, 12, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* cotton texture */
    ctx.fillStyle = '#e8e4de';
    ctx.beginPath();
    ctx.ellipse(cpx - 3, cpy - 2, 5, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cpx + 4, cpy + 1, 4, 3, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    /* ── Naphthalene crystals on funnel interior ── */
    if (done || heating) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      for (var c = 0; c < 16; c++) {
        var angle = (c / 16) * Math.PI;
        var cr = 35 + (c % 3) * 10;
        var ccx = cx + Math.cos(angle) * cr * 0.6;
        var ccy = fy2 + 20 + Math.sin(angle) * cr * 0.4;
        ctx.beginPath();
        ctx.arc(ccx, ccy, 2 + (c % 2), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* ── Naphthalene vapour rising ── */
    if (heating) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#bbb';
      for (var v = 0; v < 5; v++) {
        var vy = benchY - 135 - v * 12 - (Date.now() / 30 % 12);
        var vx = cx + Math.sin((Date.now() / 200) + v) * 8;
        ctx.beginPath();
        ctx.arc(vx, vy, 3 + v * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    /* ── Labels (blue background, like reference) ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Cotton plug label */
    drawLine(cx + 6, cpy - 10, cx + 80, cpy - 30);
    drawLabel('Cotton plug', cx + 80, cpy - 48, 80);
    /* Inverted funnel label */
    drawLine(cx + 60, fy2 + 30, cx + 90, fy2 + 10);
    drawLabel('Inverted funnel', cx + 90, fy2 - 8, 95);
    /* Naphthalene crystals label */
    drawLine(cx + 40, fy2 + 50, cx + 90, fy2 + 60);
    drawLabel('Naphthalene crystals', cx + 90, fy2 + 52, 120);
    /* China dish label */
    drawLine(cx + 45, dby + 10, cx + 90, dby + 5);
    drawLabel('China dish', cx + 90, dby - 13, 75);
    /* Wire gauze label */
    drawLine(cx + 70, gy + 5, cx + 100, gy + 15);
    drawLabel('Wire gauze', cx + 100, gy + 8, 75);
    /* Tripod label */
    drawLine(cx + thw, ty - 40, cx + thw + 20, ty - 40);
    drawLabel('Tripod stand', cx + thw + 20, ty - 48, 85);
    /* Burner label */
    drawLine(cx + 28, by - 30, cx + 90, by - 30);
    drawLabel('Burner', cx + 90, by - 38, 55);
    ctx.textAlign = 'left';
    ctx.restore();

    /* Simulated note */
    ctx.save();
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.2 Flame Tests — WIDE ── */
  drawM7_2: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_2'];
    var cx = cw / 2;
    var benchY = 540;
    var ion = sim.ions[state.m7_ionIndex];
    var testing = state.m7ActionDone && state.simulation && !state.simulation.done;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;

    /* ── HCl beaker — LEFT SIDE ── */
    ctx.save();
    var hx = 65, hy = benchY - 40;
    var hGrad = ctx.createLinearGradient(hx - 25, 0, hx + 25, 0);
    hGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    hGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    hGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    hGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = hGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(hx - 25, hy - 30);
    ctx.lineTo(hx - 25, hy + 30);
    ctx.lineTo(hx + 25, hy + 30);
    ctx.lineTo(hx + 25, hy - 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* HCl liquid */
    ctx.fillStyle = 'rgba(200,220,240,0.35)';
    ctx.fillRect(hx - 22, hy - 10, 44, 38);
    /* label */
    ctx.fillStyle = '#fff';
    ctx.fillRect(hx - 16, hy - 24, 32, 16);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(hx - 16, hy - 24, 32, 16);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HCl', hx, hy - 13);
    ctx.textAlign = 'left';
    ctx.restore();

    /* ── Bunsen burner — CENTER ── */
    var flameColor = done && ion ? ion.flameHex : '#4488ff';
    var flameH = testing ? 110 : (done ? 95 : 55);
    this.drawBunsen(ctx, cx, benchY, true, flameColor, flameH);

    /* ── Nichrome wire loop with cork handle ── */
    if (testing || done) {
      var wireColor = done && ion ? ion.flameHex : '#888';
      ctx.save();
      /* cork handle */
      ctx.fillStyle = '#c8a882';
      ctx.strokeStyle = '#a08060';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 35, benchY - 75);
      ctx.lineTo(cx - 8, benchY - 88);
      ctx.lineTo(cx - 6, benchY - 80);
      ctx.lineTo(cx - 33, benchY - 67);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      /* nichrome wire */
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 8, benchY - 84);
      ctx.lineTo(cx + 20, benchY - 84);
      ctx.stroke();
      /* loop */
      ctx.strokeStyle = wireColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx + 25, benchY - 84, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    /* ── Watch glasses with ion solutions — RIGHT SIDE ── */
    var ionColors = ['#ffcc00', '#cc66ff', '#cc4422', '#22aa66', '#66cc22'];
    var ionNames = ['Na⁺', 'K⁺', 'Ca²⁺', 'Cu²⁺', 'Ba²⁺'];
    for (var i = 0; i < 5; i++) {
      var wx = cw - 210 + i * 42;
      var wy = benchY - 15;
      ctx.save();
      /* watch glass */
      var wgGrad = ctx.createRadialGradient(wx, wy - 4, 2, wx, wy, 18);
      wgGrad.addColorStop(0, 'rgba(240,248,255,0.3)');
      wgGrad.addColorStop(0.7, 'rgba(200,220,240,0.15)');
      wgGrad.addColorStop(1, 'rgba(180,200,220,0.4)');
      ctx.fillStyle = wgGrad;
      ctx.strokeStyle = 'rgba(100,140,180,0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(wx, wy, 18, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      /* solution colour */
      ctx.fillStyle = ionColors[i];
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.ellipse(wx, wy - 2, 12, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      /* label below */
      ctx.fillStyle = '#333';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ionNames[i], wx, wy + 20);
      ctx.textAlign = 'left';
      ctx.restore();
    }

    /* ── Blue background labels with leader lines ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Bunsen burner label */
    drawLine(cx - 10, benchY - 30, cx - 80, benchY - 10);
    drawLabel('Bunsen burner', cx - 145, benchY - 18, 90);
    /* Wire loop label */
    if (testing || done) {
      drawLine(cx + 25, benchY - 92, cx + 80, benchY - 120);
      drawLabel('Nichrome wire', cx + 80, benchY - 138, 90);
    }
    /* HCl label */
    drawLine(hx + 25, hy - 10, hx + 55, hy - 30);
    drawLabel('HCl (cleaning)', hx + 35, hy - 48, 95);
    /* Watch glasses label */
    drawLine(cw - 130, benchY - 20, cw - 130, benchY - 50);
    drawLabel('Watch glasses', cw - 175, benchY - 68, 95);
    /* Ion samples label */
    drawLine(cw - 130, benchY - 68, cw - 130, benchY - 80);
    drawLabel('Ion samples', cw - 175, benchY - 98, 90);
    ctx.restore();

    /* ── Result display ── */
    ctx.save();
    ctx.textAlign = 'center';
    if (done && ion) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 90, 50, 180, 40);
      ctx.fillStyle = ion.flameHex;
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(ion.name, cx, 68);
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.fillText(ion.flameColour, cx, 84);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.3 CuSO4 Crystals — realistic lab setup ── */
  drawM7_3: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;

    /* ── Tripod stand (black metal) — LEFT ── */
    var tLx = cx - 90, tLy = benchY, tLhw = 55;
    ctx.save();
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(tLx - tLhw, tLy);
    ctx.quadraticCurveTo(tLx - tLhw + 6, tLy - 40, tLx - tLhw + 12, tLy - 95);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tLx + tLhw, tLy);
    ctx.quadraticCurveTo(tLx + tLhw - 6, tLy - 40, tLx + tLhw - 12, tLy - 95);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tLx, tLy + 4);
    ctx.lineTo(tLx, tLy - 90);
    ctx.stroke();
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(tLx - tLhw, tLy, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(tLx + tLhw, tLy, 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    /* top ring */
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(tLx, tLy - 95, tLhw - 6, 6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    /* ── Wire gauze (black mesh) ── */
    var gx = tLx, gy = tLy - 97, ghw = 53;
    ctx.save();
    ctx.fillStyle = '#c8c0b4';
    ctx.strokeStyle = '#a09890';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(gx, gy, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#3a3a3a';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(gx, gy, ghw, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(80,80,80,0.5)';
    ctx.lineWidth = 0.6;
    for (var mi = -4; mi <= 4; mi++) {
      ctx.beginPath();
      ctx.moveTo(gx + mi * 10, gy - 5);
      ctx.lineTo(gx + mi * 10, gy + 5);
      ctx.stroke();
    }
    for (var mj = -1; mj <= 1; mj++) {
      ctx.beginPath();
      ctx.moveTo(gx - ghw, gy + mj * 2);
      ctx.lineTo(gx + ghw, gy + mj * 2);
      ctx.stroke();
    }
    ctx.restore();

    /* ── China dish (white porcelain) on gauze ── */
    var dx = tLx, dy = gy - 14, dw = 70, dh = 24;
    var dbx = dx - dw / 2, dby = dy - dh / 2;
    ctx.save();
    var dishGrad = ctx.createLinearGradient(dbx, dby, dbx + dw, dby);
    dishGrad.addColorStop(0, '#e8e4e0');
    dishGrad.addColorStop(0.2, '#f8f6f4');
    dishGrad.addColorStop(0.5, '#ffffff');
    dishGrad.addColorStop(0.8, '#f4f2f0');
    dishGrad.addColorStop(1, '#ddd8d2');
    ctx.fillStyle = dishGrad;
    ctx.strokeStyle = '#b0a8a0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(dbx + 4, dby + 1);
    ctx.lineTo(dbx + dw - 4, dby + 1);
    ctx.quadraticCurveTo(dbx + dw, dby + 1, dbx + dw, dby + 6);
    ctx.lineTo(dbx + dw - 7, dby + dh - 3);
    ctx.quadraticCurveTo(dbx + dw - 9, dby + dh, dx, dby + dh);
    ctx.quadraticCurveTo(dbx + 9, dby + dh, dbx + 7, dby + dh - 3);
    ctx.lineTo(dbx, dby + 6);
    ctx.quadraticCurveTo(dbx, dby + 1, dbx + 4, dby + 1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* CuSO4 solution inside */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(dbx + 6, dby + 4);
    ctx.lineTo(dbx + dw - 6, dby + 4);
    ctx.lineTo(dbx + dw - 9, dby + dh - 5);
    ctx.quadraticCurveTo(dbx + dw - 10, dby + dh - 2, dx, dby + dh - 2);
    ctx.quadraticCurveTo(dbx + 10, dby + dh - 2, dbx + 9, dby + dh - 5);
    ctx.closePath();
    ctx.fillStyle = done ? '#5588cc' : '#4477bb';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.restore();

    /* ── Bunsen burner under tripod ── */
    this.drawBunsen(ctx, tLx, benchY, heating || done, '#4488ff', heating ? 70 : 35);

    /* ── Steam rising ── */
    if (heating) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#aaa';
      for (var s = 0; s < 5; s++) {
        var sy = dy - 10 - s * 14 - (Date.now() / 25 % 14);
        var sx = tLx + Math.sin((Date.now() / 180) + s) * 7;
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    /* ── Bunsen burner stand — RIGHT SIDE ── */
    var rBx = cx + 80, rBy = benchY;
    ctx.save();
    /* tripod stand for funnel */
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rBx + 25, rBy);
    ctx.lineTo(rBx + 25, rBy - 140);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rBx + 15, rBy);
    ctx.lineTo(rBx + 35, rBy);
    ctx.stroke();
    /* clamp */
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rBx + 25, rBy - 130);
    ctx.lineTo(rBx + 5, rBy - 130);
    ctx.stroke();
    ctx.restore();

    /* ── Funnel with filter paper ── */
    var fx = rBx + 5, fy = rBy - 125;
    ctx.save();
    /* funnel glass */
    var fGrad = ctx.createLinearGradient(fx - 28, 0, fx + 28, 0);
    fGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    fGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    fGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    fGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = fGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.5;
    /* cone */
    ctx.beginPath();
    ctx.moveTo(fx - 28, fy);
    ctx.lineTo(fx + 28, fy);
    ctx.lineTo(fx + 4, fy + 35);
    ctx.lineTo(fx - 4, fy + 35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* stem */
    ctx.fillStyle = 'rgba(180,200,220,0.3)';
    ctx.fillRect(fx - 3, fy + 35, 6, 25);
    ctx.strokeRect(fx - 3, fy + 35, 6, 25);
    /* filter paper */
    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.strokeStyle = 'rgba(170,170,170,0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(fx - 26, fy + 1);
    ctx.lineTo(fx + 26, fy + 1);
    ctx.lineTo(fx + 3, fy + 32);
    ctx.lineTo(fx - 3, fy + 32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* blue crystals in funnel */
    if (done) {
      ctx.fillStyle = '#3366cc';
      for (var ci = 0; ci < 7; ci++) {
        var crx = fx - 15 + (ci % 4) * 10;
        var cry = fy + 8 + Math.floor(ci / 4) * 7;
        ctx.fillRect(crx, cry, 7, 5);
      }
    }
    ctx.restore();

    /* ── Beaker below funnel collecting filtrate ── */
    this.drawBeaker(ctx, fx, rBy - 25, 45, 45, done ? '#5588cc' : '#4477bb', 0.4);

    /* ── Blue background labels with leader lines ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Tripod label */
    drawLine(tLx - tLhw, tLy - 20, tLx - tLhw - 30, tLy - 5);
    drawLabel('Tripod stand', tLx - tLhw - 100, tLy - 13, 80);
    /* Wire gauze label */
    drawLine(gx - ghw, gy, gx - ghw - 25, gy - 10);
    drawLabel('Wire gauze', gx - ghw - 90, gy - 18, 70);
    /* China dish label */
    drawLine(dbx, dby, dbx - 20, dby - 15);
    drawLabel('China dish', dbx - 80, dby - 23, 65);
    /* Bunsen label */
    drawLine(tLx - 10, benchY - 25, tLx - 50, benchY - 5);
    drawLabel('Bunsen burner', tLx - 130, benchY - 13, 85);
    /* Funnel label */
    drawLine(fx + 28, fy + 10, fx + 55, fy - 5);
    drawLabel('Funnel', fx + 35, fy - 23, 50);
    /* Filter paper label */
    drawLine(fx - 20, fy + 15, fx - 45, fy + 5);
    drawLabel('Filter paper', fx - 110, fy - 3, 70);
    ctx.restore();

    /* ── Result display ── */
    ctx.save();
    ctx.textAlign = 'center';
    if (done) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 80, 50, 160, 30);
      ctx.fillStyle = '#5588cc';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Blue crystals formed', cx, 70);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.4 Melting Point (Naphthalene) — realistic oil bath setup ── */
  drawM7_4: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_4'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;
    var temp = done ? sim.expectedMeltingPoint : (heating ? 60 : 25);

    /* ── Large beaker (oil bath) — CENTER ── */
    var bx = cx - 10, by = benchY - 60, bw = 130, bh = 110;
    ctx.save();
    var bGrad = ctx.createLinearGradient(bx - bw/2, 0, bx + bw/2, 0);
    bGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    bGrad.addColorStop(0.12, 'rgba(220,238,252,0.15)');
    bGrad.addColorStop(0.88, 'rgba(220,238,252,0.12)');
    bGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = bGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(bx - bw/2, by - bh/2);
    ctx.lineTo(bx - bw/2, by + bh/2 - 5);
    ctx.quadraticCurveTo(bx - bw/2, by + bh/2, bx - bw/2 + 5, by + bh/2);
    ctx.lineTo(bx + bw/2 - 5, by + bh/2);
    ctx.quadraticCurveTo(bx + bw/2, by + bh/2, bx + bw/2, by + bh/2 - 5);
    ctx.lineTo(bx + bw/2, by - bh/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* pour spout */
    ctx.beginPath();
    ctx.moveTo(bx - bw/2, by - bh/2);
    ctx.lineTo(bx - bw/2 - 8, by - bh/2 - 6);
    ctx.lineTo(bx - bw/2 + 2, by - bh/2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200,220,240,0.3)';
    ctx.fill();
    ctx.stroke();
    /* oil liquid */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bx - bw/2 + 3, by - bh/2 + 8);
    ctx.lineTo(bx + bw/2 - 3, by - bh/2 + 8);
    ctx.lineTo(bx + bw/2 - 3, by + bh/2 - 5);
    ctx.lineTo(bx - bw/2 + 3, by + bh/2 - 5);
    ctx.closePath();
    ctx.fillStyle = '#e8d090';
    ctx.globalAlpha = 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    /* graduation marks */
    ctx.strokeStyle = 'rgba(120,140,160,0.4)';
    ctx.lineWidth = 1;
    for (var gm = 1; gm < 6; gm++) {
      var gy = by - bh/2 + gm * (bh/6);
      ctx.beginPath();
      ctx.moveTo(bx - bw/2 + 2, gy);
      ctx.lineTo(bx - bw/2 + 12, gy);
      ctx.stroke();
    }
    ctx.restore();

    /* ── Thermometer in oil bath ── */
    var tx = bx + 10, ty = by - 70, th = 130;
    ctx.save();
    /* thermometer bulb */
    ctx.fillStyle = '#cc3333';
    ctx.beginPath();
    ctx.arc(tx, by + 30, 6, 0, Math.PI * 2);
    ctx.fill();
    /* glass tube */
    var tGrad = ctx.createLinearGradient(tx - 4, 0, tx + 4, 0);
    tGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    tGrad.addColorStop(0.3, 'rgba(240,248,255,0.15)');
    tGrad.addColorStop(0.7, 'rgba(240,248,255,0.12)');
    tGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = tGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(tx - 4, by - 70, 8, 100);
    ctx.strokeRect(tx - 4, by - 70, 8, 100);
    /* mercury column */
    var mercuryH = done ? 80 : (heating ? 50 : 20);
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(tx - 1.5, by + 30 - mercuryH, 3, mercuryH);
    /* graduations */
    ctx.strokeStyle = 'rgba(80,80,80,0.5)';
    ctx.lineWidth = 0.8;
    for (var tg = 0; tg < 8; tg++) {
      var gyy = by + 25 - tg * 12;
      ctx.beginPath();
      ctx.moveTo(tx + 4, gyy);
      ctx.lineTo(tx + (tg % 2 === 0 ? 10 : 7), gyy);
      ctx.stroke();
    }
    /* top */
    ctx.fillStyle = '#aaa';
    ctx.fillRect(tx - 5, by - 78, 10, 10);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(tx - 5, by - 78, 10, 10);
    ctx.restore();

    /* ── Capillary tube tied to thermometer ── */
    ctx.save();
    ctx.strokeStyle = 'rgba(140,175,205,0.65)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(tx + 18, by - 55);
    ctx.lineTo(tx + 18, by + 15);
    ctx.stroke();
    /* naphthalene in capillary */
    ctx.fillStyle = done ? '#e8d0c0' : '#f0e8e0';
    ctx.fillRect(tx + 16.5, by - 5, 3, 18);
    /* rubber band */
    ctx.strokeStyle = '#cc8844';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx + 4, by - 55);
    ctx.lineTo(tx + 18, by - 55);
    ctx.stroke();
    ctx.restore();

    /* ── Bunsen burner under beaker ── */
    this.drawBunsen(ctx, bx, benchY, heating || done, '#4488ff', heating ? 65 : 35);

    /* ── Boiling bubbles in oil ── */
    if (heating) {
      ctx.save();
      ctx.fillStyle = 'rgba(200,180,120,0.4)';
      for (var b = 0; b < 6; b++) {
        var bubx = bx - 30 + b * 12;
        var baby = by + 30 - ((Date.now() / 15 + b * 8) % 35);
        ctx.beginPath();
        ctx.arc(bubx, baby, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* ── Digital temperature readout — RIGHT SIDE ── */
    ctx.save();
    var rx = cw - 120, ry = 100;
    ctx.fillStyle = '#2a2a2a';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rx - 50, ry - 25, 100, 50, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = done ? '#ff4444' : '#44ff44';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(temp.toFixed(1) + '°C', rx, ry + 8);
    ctx.restore();

    /* ── Blue background labels with leader lines ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Oil bath beaker label */
    drawLine(bx - bw/2, by, bx - bw/2 - 30, by + 10);
    drawLabel('Oil bath beaker', bx - bw/2 - 130, by + 2, 95);
    /* Thermometer label */
    drawLine(tx + 4, by - 40, tx + 40, by - 55);
    drawLabel('Thermometer', tx + 20, by - 73, 80);
    /* Capillary tube label */
    drawLine(tx + 18, by - 20, tx + 50, by - 10);
    drawLabel('Capillary tube', tx + 30, by - 28, 90);
    /* Bunsen label */
    drawLine(bx - 10, benchY - 25, bx - 50, benchY - 5);
    drawLabel('Bunsen burner', bx - 130, benchY - 13, 85);
    ctx.restore();

    /* ── Result display ── */
    ctx.save();
    ctx.textAlign = 'center';
    if (done) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 90, 50, 180, 40);
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Melting Point', cx, 68);
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.fillText('80.26°C', cx, 84);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.5 Boiling Point (Ethyl Alcohol) — distillation setup ── */
  drawM7_5: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_5'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;
    var temp = done ? sim.expectedBoilingPoint : (heating ? 60 : 25);

    /* ── Round-bottom flask — LEFT ── */
    var fx = cx - 100, fy = benchY - 50;
    ctx.save();
    /* flask body */
    var flaskGrad = ctx.createRadialGradient(fx, fy + 15, 5, fx, fy + 15, 42);
    flaskGrad.addColorStop(0, 'rgba(240,248,255,0.05)');
    flaskGrad.addColorStop(0.5, 'rgba(180,210,240,0.2)');
    flaskGrad.addColorStop(1, 'rgba(140,180,220,0.5)');
    ctx.fillStyle = flaskGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.6)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(fx, fy + 15, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* neck */
    ctx.fillStyle = 'rgba(180,210,240,0.25)';
    ctx.fillRect(fx - 10, fy - 50, 20, 55);
    ctx.strokeStyle = 'rgba(80,120,160,0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(fx - 10, fy - 50, 20, 55);
    /* liquid inside */
    ctx.save();
    ctx.beginPath();
    ctx.arc(fx, fy + 15, 37, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#e8dcc8';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(fx - 42, fy - 5, 84, 60);
    ctx.globalAlpha = 1;
    ctx.restore();
    /* boiling chips */
    ctx.fillStyle = '#aaa';
    for (var bc = 0; bc < 4; bc++) {
      ctx.beginPath();
      ctx.arc(fx - 12 + bc * 8, fy + 40, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    /* ── Thermometer in flask neck ── */
    var tx = fx, ty = fy - 80, th = 100;
    ctx.save();
    /* bulb */
    ctx.fillStyle = '#cc3333';
    ctx.beginPath();
    ctx.arc(tx, fy - 5, 5, 0, Math.PI * 2);
    ctx.fill();
    /* glass tube */
    var tGrad = ctx.createLinearGradient(tx - 3.5, 0, tx + 3.5, 0);
    tGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    tGrad.addColorStop(0.3, 'rgba(240,248,255,0.15)');
    tGrad.addColorStop(0.7, 'rgba(240,248,255,0.12)');
    tGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = tGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(tx - 3.5, fy - 80, 7, 75);
    ctx.strokeRect(tx - 3.5, fy - 80, 7, 75);
    /* mercury */
    var mercuryH = done ? 65 : (heating ? 40 : 18);
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(tx - 1, fy - 5 - mercuryH, 2, mercuryH);
    /* top */
    ctx.fillStyle = '#aaa';
    ctx.fillRect(tx - 4, fy - 88, 8, 10);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(tx - 4, fy - 88, 8, 10);
    ctx.restore();

    /* ── Side arm / delivery tube ── */
    ctx.save();
    ctx.strokeStyle = 'rgba(140,175,205,0.55)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(fx + 10, fy - 25);
    ctx.lineTo(fx + 60, fy - 25);
    ctx.lineTo(fx + 60, fy + 30);
    ctx.stroke();
    ctx.restore();

    /* ── Condenser (Liebig) — CENTER RIGHT ── */
    var conX = fx + 60;
    ctx.save();
    /* water jacket */
    var conGrad = ctx.createLinearGradient(conX - 14, 0, conX + 14, 0);
    conGrad.addColorStop(0, 'rgba(140,180,220,0.45)');
    conGrad.addColorStop(0.3, 'rgba(200,225,245,0.12)');
    conGrad.addColorStop(0.7, 'rgba(200,225,245,0.1)');
    conGrad.addColorStop(1, 'rgba(140,180,220,0.42)');
    ctx.fillStyle = conGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.5)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(conX - 14, fy + 26, 28, 78);
    ctx.strokeRect(conX - 14, fy + 26, 28, 78);
    /* inner tube */
    ctx.fillStyle = 'rgba(200,225,245,0.2)';
    ctx.fillRect(conX - 5, fy + 30, 10, 70);
    ctx.strokeStyle = 'rgba(80,120,160,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(conX - 5, fy + 30, 10, 70);
    /* water inlet (bottom) */
    ctx.strokeStyle = 'rgba(80,120,160,0.4)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(conX - 14, fy + 40);
    ctx.lineTo(conX - 24, fy + 40);
    ctx.stroke();
    /* water outlet (top) */
    ctx.beginPath();
    ctx.moveTo(conX + 14, fy + 90);
    ctx.lineTo(conX + 24, fy + 90);
    ctx.stroke();
    /* labels on jacket */
    ctx.fillStyle = '#666';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('in', conX - 24, fy + 36);
    ctx.fillText('out', conX + 24, fy + 86);
    ctx.textAlign = 'left';
    ctx.restore();

    /* ── Receiving flask (conical) — RIGHT ── */
    var rx = conX, ry = fy + 130;
    ctx.save();
    var rGrad = ctx.createLinearGradient(rx - 25, 0, rx + 25, 0);
    rGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    rGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    rGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    rGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = rGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(rx - 8, ry - 25);
    ctx.lineTo(rx - 25, ry + 20);
    ctx.lineTo(rx - 25, ry + 35);
    ctx.lineTo(rx + 25, ry + 35);
    ctx.lineTo(rx + 25, ry + 20);
    ctx.lineTo(rx + 8, ry - 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* collected alcohol */
    ctx.fillStyle = '#e8dcc8';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(rx - 22, ry + 5, 44, 28);
    ctx.globalAlpha = 1;
    ctx.restore();

    /* ── Bunsen burner under flask ── */
    this.drawBunsen(ctx, fx, benchY, heating || done, '#4488ff', heating ? 65 : 35);

    /* ── Bubbles in flask ── */
    if (heating) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (var b = 0; b < 5; b++) {
        var bubx = fx - 16 + b * 8;
        var baby = fy + 30 - ((Date.now() / 15 + b * 8) % 25);
        ctx.beginPath();
        ctx.arc(bubx, baby, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* ── Vapour moving through condenser ── */
    if (heating || done) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#fff';
      for (var v = 0; v < 3; v++) {
        var vy = fy + 35 + ((Date.now() / 20 + v * 20) % 60);
        ctx.beginPath();
        ctx.arc(conX, vy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    /* ── Digital temperature readout — TOP RIGHT ── */
    ctx.save();
    var dx = cw - 110, dy = 90;
    ctx.fillStyle = '#2a2a2a';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(dx - 50, dy - 25, 100, 50, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = done ? '#ff4444' : '#44ff44';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(temp.toFixed(1) + '°C', dx, dy + 8);
    ctx.restore();

    /* ── Blue background labels with leader lines ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Flask label */
    drawLine(fx - 40, fy + 15, fx - 70, fy + 5);
    drawLabel('Round-bottom flask', fx - 165, fy - 3, 100);
    /* Thermometer label */
    drawLine(tx + 3, fy - 50, tx + 35, fy - 60);
    drawLabel('Thermometer', tx + 15, fy - 78, 75);
    /* Condenser label */
    drawLine(conX + 14, fy + 50, conX + 45, fy + 40);
    drawLabel('Condenser', conX + 25, fy + 22, 65);
    /* Receiving flask label */
    drawLine(rx + 25, ry + 20, rx + 50, ry + 10);
    drawLabel('Receiving flask', rx + 30, ry - 8, 90);
    /* Bunsen label */
    drawLine(fx - 10, benchY - 25, fx - 45, benchY - 5);
    drawLabel('Bunsen burner', fx - 125, benchY - 13, 85);
    ctx.restore();

    /* ── Result display ── */
    ctx.save();
    ctx.textAlign = 'center';
    if (done) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 90, 50, 180, 40);
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Boiling Point', cx, 68);
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.fillText('78.37°C', cx, 84);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.6 Zn + CuSO4 Displacement — realistic beaker setup ── */
  drawM7_6: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_6'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var reacting = state.m7ActionDone && state.simulation && !state.simulation.done;

    /* ── Large beaker with CuSO4 — CENTER ── */
    var bx = cx, by = benchY - 65, bw = 140, bh = 120;
    ctx.save();
    var bGrad = ctx.createLinearGradient(bx - bw/2, 0, bx + bw/2, 0);
    bGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    bGrad.addColorStop(0.12, 'rgba(220,238,252,0.15)');
    bGrad.addColorStop(0.88, 'rgba(220,238,252,0.12)');
    bGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = bGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(bx - bw/2, by - bh/2);
    ctx.lineTo(bx - bw/2, by + bh/2 - 5);
    ctx.quadraticCurveTo(bx - bw/2, by + bh/2, bx - bw/2 + 5, by + bh/2);
    ctx.lineTo(bx + bw/2 - 5, by + bh/2);
    ctx.quadraticCurveTo(bx + bw/2, by + bh/2, bx + bw/2, by + bh/2 - 5);
    ctx.lineTo(bx + bw/2, by - bh/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* pour spout */
    ctx.beginPath();
    ctx.moveTo(bx + bw/2, by - bh/2);
    ctx.lineTo(bx + bw/2 + 8, by - bh/2 - 6);
    ctx.lineTo(bx + bw/2 - 2, by - bh/2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200,220,240,0.3)';
    ctx.fill();
    ctx.stroke();
    /* CuSO4 solution (blue → colourless) */
    var liqColor = done ? '#d0d8e0' : (reacting ? '#5588bb' : '#3366cc');
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bx - bw/2 + 3, by - bh/2 + 10);
    ctx.lineTo(bx + bw/2 - 3, by - bh/2 + 10);
    ctx.lineTo(bx + bw/2 - 3, by + bh/2 - 5);
    ctx.lineTo(bx - bw/2 + 3, by + bh/2 - 5);
    ctx.closePath();
    ctx.fillStyle = liqColor;
    ctx.globalAlpha = 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    /* graduation marks */
    ctx.strokeStyle = 'rgba(120,140,160,0.4)';
    ctx.lineWidth = 1;
    for (var gm = 1; gm < 6; gm++) {
      var gyy = by - bh/2 + gm * (bh/6);
      ctx.beginPath();
      ctx.moveTo(bx - bw/2 + 2, gyy);
      ctx.lineTo(bx - bw/2 + 12, gyy);
      ctx.stroke();
    }
    ctx.restore();

    /* ── Zn granules ── */
    ctx.save();
    if (reacting || done) {
      /* Zn granules at bottom with copper deposit */
      for (var i = 0; i < 8; i++) {
        var gx = bx - 30 + (i % 4) * 20;
        var gy = by + 35 + Math.floor(i / 4) * 14;
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.arc(gx, gy, 5, 0, Math.PI * 2);
        ctx.fill();
        /* copper deposit on Zn */
        if (done) {
          ctx.fillStyle = '#cc6622';
          ctx.beginPath();
          ctx.arc(gx, gy, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    /* Zn granules being added (falling) */
    if (!reacting && !done) {
      for (var j = 0; j < 3; j++) {
        var ax = bx - 15 + j * 15;
        var ay = by - 120 + j * 10;
        ctx.fillStyle = '#999';
        ctx.beginPath();
        ctx.arc(ax, ay, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    /* ── Bubbles during reaction ── */
    if (reacting) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      for (var b = 0; b < 6; b++) {
        var bubx = bx - 25 + b * 10;
        var baby = by + 30 - ((Date.now() / 12 + b * 6) % 30);
        ctx.beginPath();
        ctx.arc(bubx, baby, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* ── Zn granules container — LEFT SIDE ── */
    ctx.save();
    var zx = 55, zy = benchY - 30;
    /* small jar */
    var zGrad = ctx.createLinearGradient(zx - 18, 0, zx + 18, 0);
    zGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    zGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    zGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    zGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = zGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(zx - 18, zy - 25);
    ctx.lineTo(zx - 18, zy + 20);
    ctx.quadraticCurveTo(zx - 18, zy + 25, zx - 12, zy + 25);
    ctx.lineTo(zx + 12, zy + 25);
    ctx.quadraticCurveTo(zx + 18, zy + 25, zx + 18, zy + 20);
    ctx.lineTo(zx + 18, zy - 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* Zn granules inside */
    ctx.fillStyle = '#999';
    for (var zg = 0; zg < 6; zg++) {
      ctx.beginPath();
      ctx.arc(zx - 10 + (zg % 3) * 10, zy - 5 + Math.floor(zg / 3) * 12, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    /* label */
    ctx.fillStyle = '#fff';
    ctx.fillRect(zx - 14, zy - 20, 28, 16);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(zx - 14, zy - 20, 28, 16);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Zn', zx, zy - 9);
    ctx.textAlign = 'left';
    ctx.restore();

    /* ── CuSO4 solution container — RIGHT SIDE ── */
    ctx.save();
    var sx = cw - 55, sy = benchY - 30;
    var sGrad = ctx.createLinearGradient(sx - 18, 0, sx + 18, 0);
    sGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    sGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    sGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    sGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = sGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(sx - 18, sy - 25);
    ctx.lineTo(sx - 18, sy + 20);
    ctx.quadraticCurveTo(sx - 18, sy + 25, sx - 12, sy + 25);
    ctx.lineTo(sx + 12, sy + 25);
    ctx.quadraticCurveTo(sx + 18, sy + 25, sx + 18, sy + 20);
    ctx.lineTo(sx + 18, sy - 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* CuSO4 solution */
    ctx.fillStyle = '#3366cc';
    ctx.globalAlpha = 0.55;
    ctx.fillRect(sx - 15, sy - 5, 30, 28);
    ctx.globalAlpha = 1;
    /* label */
    ctx.fillStyle = '#fff';
    ctx.fillRect(sx - 16, sy - 20, 32, 16);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(sx - 16, sy - 20, 32, 16);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CuSO₄', sx, sy - 9);
    ctx.textAlign = 'left';
    ctx.restore();

    /* ── Blue background labels with leader lines ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Beaker label */
    drawLine(bx - bw/2, by, bx - bw/2 - 30, by + 10);
    drawLabel('Beaker', bx - bw/2 - 80, by + 2, 55);
    /* Zn container label */
    drawLine(zx + 18, zy, zx + 40, zy - 10);
    drawLabel('Zn granules', zx + 25, zy - 28, 75);
    /* CuSO4 container label */
    drawLine(sx - 18, sy, sx - 40, sy - 10);
    drawLabel('CuSO₄ solution', sx - 110, sy - 28, 85);
    ctx.restore();

    /* ── Result display ── */
    ctx.save();
    ctx.textAlign = 'center';
    if (done) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 100, 50, 200, 40);
      ctx.fillStyle = '#cc6622';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Blue → Colourless', cx, 68);
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.fillText('Cu deposited on Zn', cx, 84);
    } else if (reacting) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 80, 50, 160, 30);
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.fillText('Reaction in progress...', cx, 70);
    } else {
      ctx.fillStyle = '#3366cc';
      ctx.font = '12px sans-serif';
      ctx.fillText('CuSO₄ solution (blue)', cx, 65);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.7 Water Test (Anhydrous CuSO4) — realistic test tube setup ── */
  drawM7_7: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var testing = state.m7ActionDone && state.simulation && !state.m7ObservationDone;

    /* ── Test tube stand — LEFT ── */
    ctx.save();
    var stx = cx - 80, sty = benchY;
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(stx, sty);
    ctx.lineTo(stx, sty - 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(stx - 20, sty);
    ctx.lineTo(stx + 20, sty);
    ctx.stroke();
    /* clamp */
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(stx, sty - 80);
    ctx.lineTo(stx + 25, sty - 80);
    ctx.stroke();
    /* base */
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.ellipse(stx, sty, 22, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    /* ── Test tube in clamp — CENTER ── */
    var tx = cx, ty = benchY - 80, tw = 40, th = 130;
    ctx.save();
    /* glass tube */
    var tGrad = ctx.createLinearGradient(tx - tw/2, 0, tx + tw/2, 0);
    tGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    tGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    tGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    tGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = tGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(tx - tw/2, ty);
    ctx.lineTo(tx - tw/2, ty + th - 15);
    ctx.quadraticCurveTo(tx - tw/2, ty + th, tx, ty + th);
    ctx.quadraticCurveTo(tx + tw/2, ty + th, tx + tw/2, ty + th - 15);
    ctx.lineTo(tx + tw/2, ty);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* rim */
    ctx.strokeStyle = 'rgba(100,140,180,0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx - tw/2 - 2, ty);
    ctx.lineTo(tx + tw/2 + 2, ty);
    ctx.stroke();
    ctx.restore();

    /* ── White powder (anhydrous CuSO4) in test tube ── */
    ctx.save();
    if (!done) {
      /* white powder layer */
      ctx.fillStyle = '#f0f0f0';
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx - tw/2 + 2, ty + th - 40);
      ctx.lineTo(tx + tw/2 - 2, ty + th - 40);
      ctx.lineTo(tx + tw/2 - 4, ty + th - 5);
      ctx.quadraticCurveTo(tx, ty + th, tx - tw/2 + 4, ty + th - 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      /* powder texture */
      ctx.fillStyle = '#e0e0e0';
      for (var p = 0; p < 8; p++) {
        ctx.beginPath();
        ctx.arc(tx - 10 + (p % 4) * 7, ty + th - 30 + Math.floor(p / 4) * 12, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      /* blue hydrated crystals */
      ctx.fillStyle = '#3366cc';
      ctx.globalAlpha = 0.6;
      ctx.fillRect(tx - tw/2 + 2, ty + th - 45, tw - 4, 40);
      ctx.globalAlpha = 1;
      /* crystal texture */
      ctx.fillStyle = '#2255aa';
      for (var c = 0; c < 6; c++) {
        ctx.fillRect(tx - 8 + (c % 3) * 8, ty + th - 35 + Math.floor(c / 3) * 12, 6, 5);
      }
    }
    ctx.restore();

    /* ── Dropper with water — RIGHT SIDE ── */
    var dx = cx + 70, dy = benchY - 130;
    ctx.save();
    /* bulb */
    ctx.fillStyle = '#cc4444';
    ctx.strokeStyle = '#aa3333';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(dx, dy - 20, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* glass tube */
    var dGrad = ctx.createLinearGradient(dx - 4, 0, dx + 4, 0);
    dGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    dGrad.addColorStop(0.3, 'rgba(240,248,255,0.15)');
    dGrad.addColorStop(0.7, 'rgba(240,248,255,0.12)');
    dGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = dGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(dx - 3.5, dy - 8, 7, 40);
    ctx.strokeRect(dx - 3.5, dy - 8, 7, 40);
    /* tip */
    ctx.beginPath();
    ctx.moveTo(dx - 3, dy + 32);
    ctx.lineTo(dx, dy + 40);
    ctx.lineTo(dx + 3, dy + 32);
    ctx.closePath();
    ctx.fillStyle = 'rgba(180,200,220,0.4)';
    ctx.fill();
    ctx.stroke();
    /* water inside */
    ctx.fillStyle = 'rgba(100,180,230,0.4)';
    ctx.fillRect(dx - 2, dy - 5, 4, 35);
    ctx.restore();

    /* ── Water drop falling ── */
    if (testing) {
      ctx.save();
      ctx.fillStyle = 'rgba(100,180,230,0.6)';
      var dropProgress = (Date.now() % 800) / 800;
      var dropY = dy + 40 + dropProgress * 35;
      ctx.beginPath();
      ctx.ellipse(dx, dropY, 4, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    /* ── Water beaker — FAR LEFT ── */
    ctx.save();
    var wbx = 45, wby = benchY - 25;
    var wbGrad = ctx.createLinearGradient(wbx - 20, 0, wbx + 20, 0);
    wbGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    wbGrad.addColorStop(0.15, 'rgba(220,238,252,0.15)');
    wbGrad.addColorStop(0.85, 'rgba(220,238,252,0.12)');
    wbGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = wbGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(wbx - 20, wby - 20);
    ctx.lineTo(wbx - 20, wby + 18);
    ctx.quadraticCurveTo(wbx - 20, wby + 22, wbx - 15, wby + 22);
    ctx.lineTo(wbx + 15, wby + 22);
    ctx.quadraticCurveTo(wbx + 20, wby + 22, wbx + 20, wby + 18);
    ctx.lineTo(wbx + 20, wby - 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* water */
    ctx.fillStyle = 'rgba(100,180,230,0.35)';
    ctx.fillRect(wbx - 17, wby - 5, 34, 23);
    /* label */
    ctx.fillStyle = '#fff';
    ctx.fillRect(wbx - 14, wby - 16, 28, 14);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(wbx - 14, wby - 16, 28, 14);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('H₂O', wbx, wby - 6);
    ctx.textAlign = 'left';
    ctx.restore();

    /* ── Blue background labels with leader lines ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Test tube label */
    drawLine(tx + tw/2, ty + 20, tx + tw/2 + 30, ty + 10);
    drawLabel('Test tube', tx + tw/2 + 10, ty - 8, 70);
    /* Dropper label */
    drawLine(dx + 3, dy + 10, dx + 25, dy);
    drawLabel('Dropper', dx + 5, dy - 18, 60);
    /* Water beaker label */
    drawLine(wbx + 20, wby, wbx + 40, wby - 10);
    drawLabel('Water', wbx + 25, wby - 28, 45);
    ctx.restore();

    /* ── Result display ── */
    ctx.save();
    ctx.textAlign = 'center';
    if (done) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 100, 50, 200, 40);
      ctx.fillStyle = '#3366cc';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('White → Blue', cx, 68);
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.fillText('Water present!', cx, 84);
    } else if (testing) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(cx - 80, 50, 160, 30);
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.fillText('Adding water...', cx, 70);
    } else {
      ctx.fillStyle = '#888';
      ctx.font = '12px sans-serif';
      ctx.fillText('Anhydrous CuSO₄ (white)', cx, 65);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.8 Water Purity Test — MP & BP setup ── */
  drawM7_8: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_8'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.m7ObservationDone;
    var temp = done ? 100 : (heating ? 70 : 25);

    /* ── Large beaker with water (heating) — LEFT ── */
    var bx = cx - 90, by = benchY - 60, bw = 120, bh = 110;
    ctx.save();
    var bGrad = ctx.createLinearGradient(bx - bw/2, 0, bx + bw/2, 0);
    bGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    bGrad.addColorStop(0.12, 'rgba(220,238,252,0.15)');
    bGrad.addColorStop(0.88, 'rgba(220,238,252,0.12)');
    bGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = bGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(bx - bw/2, by - bh/2);
    ctx.lineTo(bx - bw/2, by + bh/2 - 5);
    ctx.quadraticCurveTo(bx - bw/2, by + bh/2, bx - bw/2 + 5, by + bh/2);
    ctx.lineTo(bx + bw/2 - 5, by + bh/2);
    ctx.quadraticCurveTo(bx + bw/2, by + bh/2, bx + bw/2, by + bh/2 - 5);
    ctx.lineTo(bx + bw/2, by - bh/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* pour spout */
    ctx.beginPath();
    ctx.moveTo(bx - bw/2, by - bh/2);
    ctx.lineTo(bx - bw/2 - 8, by - bh/2 - 6);
    ctx.lineTo(bx - bw/2 + 2, by - bh/2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200,220,240,0.3)';
    ctx.fill();
    ctx.stroke();
    /* water */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bx - bw/2 + 3, by - bh/2 + 10);
    ctx.lineTo(bx + bw/2 - 3, by - bh/2 + 10);
    ctx.lineTo(bx + bw/2 - 3, by + bh/2 - 5);
    ctx.lineTo(bx - bw/2 + 3, by + bh/2 - 5);
    ctx.closePath();
    ctx.fillStyle = '#a0d0f0';
    ctx.globalAlpha = 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    /* graduation marks */
    ctx.strokeStyle = 'rgba(120,140,160,0.4)';
    ctx.lineWidth = 1;
    for (var gm = 1; gm < 6; gm++) {
      var gyy = by - bh/2 + gm * (bh/6);
      ctx.beginPath();
      ctx.moveTo(bx - bw/2 + 2, gyy);
      ctx.lineTo(bx - bw/2 + 12, gyy);
      ctx.stroke();
    }
    ctx.restore();

    /* ── Thermometer in beaker ── */
    var tx = bx + 5, ty = by - 75, th = 130;
    ctx.save();
    /* bulb */
    ctx.fillStyle = '#cc3333';
    ctx.beginPath();
    ctx.arc(tx, by + 30, 5, 0, Math.PI * 2);
    ctx.fill();
    /* glass tube */
    var tGrad = ctx.createLinearGradient(tx - 3.5, 0, tx + 3.5, 0);
    tGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    tGrad.addColorStop(0.3, 'rgba(240,248,255,0.15)');
    tGrad.addColorStop(0.7, 'rgba(240,248,255,0.12)');
    tGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = tGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(tx - 3.5, by - 75, 7, 105);
    ctx.strokeRect(tx - 3.5, by - 75, 7, 105);
    /* mercury */
    var mercuryH = done ? 90 : (heating ? 60 : 20);
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(tx - 1, by + 30 - mercuryH, 2, mercuryH);
    /* graduations */
    ctx.strokeStyle = 'rgba(80,80,80,0.5)';
    ctx.lineWidth = 0.8;
    for (var tg = 0; tg < 8; tg++) {
      var gyy2 = by + 25 - tg * 12;
      ctx.beginPath();
      ctx.moveTo(tx + 3.5, gyy2);
      ctx.lineTo(tx + (tg % 2 === 0 ? 10 : 7), gyy2);
      ctx.stroke();
    }
    /* top */
    ctx.fillStyle = '#aaa';
    ctx.fillRect(tx - 4.5, by - 83, 9, 10);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(tx - 4.5, by - 83, 9, 10);
    ctx.restore();

    /* ── Bunsen burner under beaker ── */
    this.drawBunsen(ctx, bx, benchY, heating || done, '#4488ff', heating ? 70 : 35);

    /* ── Bubbles when boiling ── */
    if (heating || done) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (var b = 0; b < 6; b++) {
        var bubx = bx - 25 + b * 10;
        var baby = by + 30 - ((Date.now() / 12 + b * 6) % 35);
        ctx.beginPath();
        ctx.arc(bubx, baby, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* ── Second beaker with ice — RIGHT SIDE ── */
    var ibx = cx + 80, iby = benchY - 50, ibw = 100, ibh = 90;
    ctx.save();
    var ibGrad = ctx.createLinearGradient(ibx - ibw/2, 0, ibx + ibw/2, 0);
    ibGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    ibGrad.addColorStop(0.12, 'rgba(220,238,252,0.15)');
    ibGrad.addColorStop(0.88, 'rgba(220,238,252,0.12)');
    ibGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = ibGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ibx - ibw/2, iby - ibh/2);
    ctx.lineTo(ibx - ibw/2, iby + ibh/2 - 4);
    ctx.quadraticCurveTo(ibx - ibw/2, iby + ibh/2, ibx - ibw/2 + 4, iby + ibh/2);
    ctx.lineTo(ibx + ibw/2 - 4, iby + ibh/2);
    ctx.quadraticCurveTo(ibx + ibw/2, iby + ibh/2, ibx + ibw/2, iby + ibh/2 - 4);
    ctx.lineTo(ibx + ibw/2, iby - ibh/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    /* water + ice */
    ctx.fillStyle = done ? '#d0e8f8' : '#e0f0ff';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(ibx - ibw/2 + 3, iby - ibh/2 + 8, ibw - 6, ibh - 12);
    ctx.globalAlpha = 1;
    /* ice cubes */
    ctx.fillStyle = 'rgba(200,230,250,0.65)';
    ctx.strokeStyle = 'rgba(150,190,220,0.55)';
    ctx.lineWidth = 1;
    for (var i = 0; i < 4; i++) {
      var ix = ibx - 25 + (i % 2) * 28;
      var iy = iby - 15 + Math.floor(i / 2) * 18;
      ctx.fillRect(ix, iy, 22, 15);
      ctx.strokeRect(ix, iy, 22, 15);
    }
    ctx.restore();

    /* ── Ice beaker thermometer (small) ── */
    ctx.save();
    var itx = ibx + 15, ity = iby - 50;
    ctx.fillStyle = '#cc3333';
    ctx.beginPath();
    ctx.arc(itx, iby + 20, 3.5, 0, Math.PI * 2);
    ctx.fill();
    var itGrad = ctx.createLinearGradient(itx - 2.5, 0, itx + 2.5, 0);
    itGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
    itGrad.addColorStop(0.3, 'rgba(240,248,255,0.15)');
    itGrad.addColorStop(0.7, 'rgba(240,248,255,0.12)');
    itGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
    ctx.fillStyle = itGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1;
    ctx.fillRect(itx - 2.5, ity, 5, 65);
    ctx.strokeRect(itx - 2.5, ity, 5, 65);
    /* mercury (low temp) */
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(itx - 0.5, iby + 15, 1, 5);
    ctx.restore();

    /* ── Digital temperature readout — TOP CENTER ── */
    ctx.save();
    var rx = cx, ry = 80;
    ctx.fillStyle = '#2a2a2a';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rx - 55, ry - 25, 110, 50, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = done ? '#ff4444' : '#44ff44';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(temp.toFixed(0) + '°C', rx, ry + 8);
    ctx.restore();

    /* ── Blue background labels with leader lines ── */
    ctx.save();
    function drawLabel(text, lx, ly, tw) {
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(lx, ly, tw, 18);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text, lx + tw / 2, ly + 13);
    }
    function drawLine(x1, y1, x2, y2) {
      ctx.strokeStyle = '#1a3a6a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Heating beaker label */
    drawLine(bx - bw/2, by, bx - bw/2 - 25, by + 10);
    drawLabel('Water (heating)', bx - bw/2 - 120, by + 2, 90);
    /* Thermometer label */
    drawLine(tx + 3, by - 40, tx + 35, by - 50);
    drawLabel('Thermometer', tx + 15, by - 68, 80);
    /* Ice beaker label */
    drawLine(ibx + ibw/2, iby, ibx + ibw/2 + 25, iby + 10);
    drawLabel('Ice (melting)', ibx + ibw/2 + 5, iby + 2, 80);
    /* Bunsen label */
    drawLine(bx - 10, benchY - 25, bx - 40, benchY - 5);
    drawLabel('Bunsen burner', bx - 120, benchY - 13, 85);
    ctx.restore();

    /* ── Result display ── */
    ctx.save();
    ctx.textAlign = 'center';
    if (done) {
      /* BP box */
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(bx - 50, 130, 100, 40);
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('BP: 100°C', bx, 148);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.fillText('(boiling point)', bx, 162);
      /* MP box */
      ctx.fillStyle = '#1a3a6a';
      ctx.fillRect(ibx - 50, 130, 100, 40);
      ctx.fillStyle = '#3388cc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('MP: 0°C', ibx, 148);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.fillText('(melting point)', ibx, 162);
      /* Pure water badge */
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.roundRect(cx - 70, 200, 140, 35, 5);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Pure water confirmed', cx, 223);
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
