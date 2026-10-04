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
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;

    /* Tripod + gauze + dish + Bunsen — LEFT SIDE */
    this.drawTripod(ctx, cx - 80, benchY, 130);
    this.drawWireGauze(ctx, cx - 80, benchY - 95, 130);
    this.drawEvaporatingDish(ctx, cx - 80, benchY - 110, 95, 32, done ? '#c8c0b8' : '#e8dcc8');
    this.drawBunsen(ctx, cx - 80, benchY, heating || done, '#4488ff', heating ? 75 : 40);

    /* Inverted funnel over dish — CENTERED on dish */
    this.drawFunnel(ctx, cx - 80, benchY - 175, 110, 80, true);

    /* Filter paper in funnel */
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.strokeStyle = 'rgba(170,170,170,0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 80 - 42, benchY - 175);
    ctx.lineTo(cx - 80 + 42, benchY - 175);
    ctx.lineTo(cx - 80 + 4, benchY - 145);
    ctx.lineTo(cx - 80 - 4, benchY - 145);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    /* Naphthalene vapour rising */
    if (heating) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#aaa';
      for (var i = 0; i < 6; i++) {
        var vy = benchY - 120 - i * 14 - (Date.now() / 30 % 14);
        var vx = cx - 80 + Math.sin((Date.now() / 200) + i) * 10;
        ctx.beginPath();
        ctx.arc(vx, vy, 4 + i * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    /* Sublimate on funnel */
    if (done) {
      ctx.save();
      ctx.fillStyle = 'rgba(220,220,220,0.65)';
      for (var j = 0; j < 10; j++) {
        var sx = cx - 80 - 28 + (j % 5) * 14;
        var sy = benchY - 168 + Math.floor(j / 5) * 10;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* Residue in dish (sand + salt) */
    if (done) {
      ctx.save();
      ctx.fillStyle = '#b0a090';
      for (var k = 0; k < 4; k++) {
        var rx = cx - 80 - 15 + k * 10;
        var ry = benchY - 108;
        ctx.beginPath();
        ctx.arc(rx, ry, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* Labels */
    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#444';
    ctx.textAlign = 'center';
    ctx.fillText('Evaporating dish', cx - 80, benchY + 25);
    ctx.fillText('Inverted funnel', cx - 80, benchY - 195);
    ctx.fillText('Bunsen burner', cx - 80, benchY + 42);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
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

    /* Bunsen burner — CENTER */
    var flameColor = done && ion ? ion.flameHex : '#4488ff';
    var flameH = testing ? 100 : (done ? 85 : 55);
    this.drawBunsen(ctx, cx, benchY, true, flameColor, flameH);

    /* Nichrome wire loop */
    if (testing || done) {
      this.drawWireLoop(ctx, cx, benchY - 82, done && ion ? ion.flameHex : '#888');
    }

    /* Ion sample bottles — RIGHT SIDE */
    var colors = ['#ffcc00', '#cc66ff', '#cc4422', '#22aa66', '#66cc22'];
    var names = ['Na⁺', 'K⁺', 'Ca²⁺', 'Cu²⁺', 'Ba²⁺'];
    for (var i = 0; i < 5; i++) {
      var bx = cw - 200 + i * 38;
      ctx.save();
      /* bottle body */
      var botGrad = ctx.createLinearGradient(bx - 12, 0, bx + 12, 0);
      botGrad.addColorStop(0, 'rgba(180,200,220,0.4)');
      botGrad.addColorStop(0.3, 'rgba(220,238,252,0.15)');
      botGrad.addColorStop(0.7, 'rgba(220,238,252,0.12)');
      botGrad.addColorStop(1, 'rgba(180,200,220,0.38)');
      ctx.fillStyle = botGrad;
      ctx.strokeStyle = 'rgba(100,140,180,0.5)';
      ctx.lineWidth = 1.2;
      ctx.fillRect(bx - 12, benchY - 45, 24, 45);
      ctx.strokeRect(bx - 12, benchY - 45, 24, 45);
      /* sample colour */
      ctx.fillStyle = colors[i];
      ctx.globalAlpha = 0.55;
      ctx.fillRect(bx - 9, benchY - 28, 18, 25);
      ctx.globalAlpha = 1;
      /* cap */
      ctx.fillStyle = '#777';
      ctx.fillRect(bx - 7, benchY - 52, 14, 8);
      ctx.strokeStyle = '#555';
      ctx.strokeRect(bx - 7, benchY - 52, 14, 8);
      /* label */
      ctx.fillStyle = '#fff';
      ctx.fillRect(bx - 8, benchY - 22, 16, 12);
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(bx - 8, benchY - 22, 16, 12);
      ctx.fillStyle = '#333';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(names[i], bx, benchY - 14);
      ctx.restore();
    }

    /* Labels */
    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#444';
    ctx.textAlign = 'center';
    ctx.fillText('Bunsen burner', cx, benchY + 25);
    ctx.fillText('Ion samples', cw - 110, benchY + 25);
    if (done && ion) {
      ctx.fillStyle = ion.flameHex;
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(ion.name + ' — ' + ion.flameColour, cx, benchY - 180);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.3 CuSO4 Crystals — WIDE ── */
  drawM7_3: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var dissolving = state.m7ActionDone && state.simulation && !state.simulation.done;

    /* Tripod + gauze + dish + Bunsen — LEFT */
    this.drawTripod(ctx, cx - 70, benchY, 120);
    this.drawWireGauze(ctx, cx - 70, benchY - 95, 120);
    this.drawEvaporatingDish(ctx, cx - 70, benchY - 110, 90, 30, done ? '#3366cc' : '#66aaff');
    this.drawBunsen(ctx, cx - 70, benchY, dissolving || done, '#4488ff', dissolving ? 70 : 38);

    /* Funnel + filter paper — RIGHT */
    this.drawFunnel(ctx, cx + 80, benchY - 150, 80, 70, false);

    /* Filter paper */
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.strokeStyle = 'rgba(170,170,170,0.55)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + 80 - 32, benchY - 150);
    ctx.lineTo(cx + 80 + 32, benchY - 150);
    ctx.lineTo(cx + 80 + 4, benchY - 128);
    ctx.lineTo(cx + 80 - 4, benchY - 128);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    /* Blue crystals in funnel */
    if (done) {
      ctx.save();
      ctx.fillStyle = '#3366cc';
      for (var i = 0; i < 8; i++) {
        var crx = cx + 80 - 18 + (i % 4) * 12;
        var cry = benchY - 142 + Math.floor(i / 4) * 8;
        ctx.fillRect(crx, cry, 9, 6);
      }
      ctx.restore();
    }

    /* Steam */
    if (dissolving) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#aaa';
      for (var s = 0; s < 5; s++) {
        var sy = benchY - 125 - s * 16 - (Date.now() / 25 % 16);
        var sx = cx - 70 + Math.sin((Date.now() / 180) + s) * 8;
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#444';
    ctx.textAlign = 'center';
    ctx.fillText('Evaporating dish', cx - 70, benchY + 25);
    ctx.fillText('Funnel + filter paper', cx + 80, benchY + 25);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.4 Melting Point (Naphthalene) — WIDE ── */
  drawM7_4: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_4'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;
    var temp = done ? sim.expectedMeltingPoint : (heating ? 60 : 25);

    /* Oil bath beaker — CENTER */
    this.drawBeaker(ctx, cx - 20, benchY - 55, 120, 100, '#e8d090', 0.7);

    /* Thermometer in oil bath */
    this.drawThermometer(ctx, cx - 20, benchY - 130, 120, temp, 120);

    /* Capillary tube — beside thermometer */
    ctx.save();
    ctx.strokeStyle = 'rgba(140,175,205,0.65)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx + 25, benchY - 110);
    ctx.lineTo(cx + 25, benchY - 30);
    ctx.stroke();
    /* naphthalene in capillary */
    ctx.fillStyle = done ? '#e8d0c0' : '#f0e8e0';
    ctx.fillRect(cx + 23, benchY - 45, 4, 18);
    ctx.restore();

    /* Bunsen under beaker */
    this.drawBunsen(ctx, cx - 20, benchY, heating || done, '#4488ff', heating ? 65 : 35);

    /* Temperature label */
    ctx.save();
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = done ? '#cc2222' : '#444';
    ctx.textAlign = 'center';
    ctx.fillText(temp.toFixed(1) + '°C', cx + 90, benchY - 80);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#444';
    ctx.fillText('Oil bath', cx - 20, benchY + 25);
    ctx.fillText('Thermometer', cx - 20, benchY + 42);
    ctx.fillText('Capillary tube', cx + 40, benchY + 25);
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('MP: 80.26°C', cx + 90, benchY - 55);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.5 Boiling Point (Ethyl Alcohol) — WIDE ── */
  drawM7_5: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_5'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;
    var temp = done ? sim.expectedBoilingPoint : (heating ? 60 : 25);

    /* Round-bottom flask — LEFT */
    var fx = cx - 80;
    var fy = benchY - 55;
    ctx.save();
    var flaskGrad = ctx.createLinearGradient(fx - 40, fy, fx + 40, fy);
    flaskGrad.addColorStop(0, 'rgba(140,180,220,0.5)');
    flaskGrad.addColorStop(0.12, 'rgba(180,210,240,0.25)');
    flaskGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    flaskGrad.addColorStop(0.88, 'rgba(180,210,240,0.22)');
    flaskGrad.addColorStop(1, 'rgba(140,180,220,0.48)');
    ctx.fillStyle = flaskGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.6)';
    ctx.lineWidth = 2.2;
    /* round body */
    ctx.beginPath();
    ctx.arc(fx, fy + 15, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    /* neck */
    ctx.fillRect(fx - 10, fy - 50, 20, 55);
    ctx.strokeRect(fx - 10, fy - 50, 20, 55);
    /* liquid inside */
    ctx.save();
    ctx.beginPath();
    ctx.arc(fx, fy + 15, 37, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#e8dcc8';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(fx - 42, fy, 84, 55);
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.restore();

    /* Thermometer in flask neck */
    this.drawThermometer(ctx, fx, fy - 70, 90, temp, 120);

    /* Side arm / delivery tube */
    ctx.save();
    ctx.strokeStyle = 'rgba(140,175,205,0.55)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(fx + 10, fy - 30);
    ctx.lineTo(fx + 70, fy - 30);
    ctx.lineTo(fx + 70, fy + 30);
    ctx.stroke();
    ctx.restore();

    /* Condenser — CENTER RIGHT */
    var conX = fx + 70;
    ctx.save();
    var conGrad = ctx.createLinearGradient(conX - 12, 0, conX + 12, 0);
    conGrad.addColorStop(0, 'rgba(140,180,220,0.45)');
    conGrad.addColorStop(0.3, 'rgba(200,225,245,0.12)');
    conGrad.addColorStop(0.7, 'rgba(200,225,245,0.1)');
    conGrad.addColorStop(1, 'rgba(140,180,220,0.42)');
    ctx.fillStyle = conGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.5)';
    ctx.lineWidth = 1.5;
    /* inner tube */
    ctx.fillRect(conX - 6, fy + 30, 12, 70);
    ctx.strokeRect(conX - 6, fy + 30, 12, 70);
    /* water jacket */
    ctx.strokeStyle = 'rgba(80,120,160,0.35)';
    ctx.strokeRect(conX - 14, fy + 26, 28, 78);
    /* water inlet/outlet */
    ctx.strokeStyle = 'rgba(80,120,160,0.4)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(conX - 14, fy + 40);
    ctx.lineTo(conX - 22, fy + 40);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(conX + 14, fy + 90);
    ctx.lineTo(conX + 22, fy + 90);
    ctx.stroke();
    ctx.restore();

    /* Receiving flask — RIGHT */
    this.drawBeaker(ctx, conX, fy + 130, 55, 55, '#e8dcc8', done ? 0.5 : 0.1);

    /* Bunsen under flask */
    this.drawBunsen(ctx, fx, benchY, heating || done, '#4488ff', heating ? 65 : 35);

    /* Bubbles in flask */
    if (heating) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (var b = 0; b < 5; b++) {
        var bx = fx - 16 + b * 8;
        var by = fy + 25 - ((Date.now() / 15 + b * 8) % 25);
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#444';
    ctx.textAlign = 'center';
    ctx.fillText('Distillation flask', fx, benchY + 25);
    ctx.fillText('Condenser', conX, benchY + 25);
    ctx.fillText('Receiving flask', conX, benchY + 42);
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('BP: 78.37°C', conX + 60, fy + 50);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.6 Zn + CuSO4 Displacement — WIDE ── */
  drawM7_6: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_6'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var reacting = state.m7ActionDone && state.simulation && !state.simulation.done;

    /* Large beaker with CuSO4 — CENTER */
    var liqColor = done ? '#d0d0d0' : '#3366cc';
    this.drawBeaker(ctx, cx, benchY - 55, 130, 110, liqColor, 0.65);

    /* Zn granules */
    ctx.save();
    if (reacting || done) {
      ctx.fillStyle = '#888';
      for (var i = 0; i < 8; i++) {
        var gx = cx - 28 + (i % 4) * 18;
        var gy = benchY - 25 + Math.floor(i / 4) * 12;
        ctx.beginPath();
        ctx.arc(gx, gy, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    /* Zn granules above (being added) */
    if (!reacting && !done) {
      ctx.fillStyle = '#999';
      for (var j = 0; j < 3; j++) {
        var ax = cx - 15 + j * 15;
        var ay = benchY - 150 + j * 8;
        ctx.beginPath();
        ctx.arc(ax, ay, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    /* Copper deposit */
    if (done) {
      ctx.save();
      ctx.fillStyle = '#cc6622';
      for (var k = 0; k < 6; k++) {
        var dx = cx - 22 + k * 9;
        var dy = benchY - 22;
        ctx.beginPath();
        ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* Bubbles during reaction */
    if (reacting) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      for (var b = 0; b < 6; b++) {
        var bx = cx - 24 + b * 10;
        var by = benchY - 30 - ((Date.now() / 12 + b * 6) % 30);
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    ctx.save();
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.fillText('Blue → Colourless', cx, benchY - 150);
    } else {
      ctx.fillStyle = '#3366cc';
      ctx.fillText('CuSO₄ solution (blue)', cx, benchY - 150);
    }
    ctx.fillStyle = '#444';
    ctx.fillText('Beaker with Zn + CuSO₄', cx, benchY + 25);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.7 Water Test (Anhydrous CuSO4) — WIDE ── */
  drawM7_7: function(ctx, cw, ch, state) {
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var testing = state.m7ActionDone && state.simulation && !state.m7ObservationDone;

    /* Large test tube — CENTER */
    var liqColor = done ? '#3366cc' : null;
    this.drawTestTube(ctx, cx, benchY - 60, 50, 140, liqColor, done ? 0.4 : 0);

    /* White powder (anhydrous CuSO4) in test tube */
    ctx.save();
    if (!done) {
      ctx.fillStyle = '#f0f0f0';
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 18, benchY - 30);
      ctx.lineTo(cx + 18, benchY - 30);
      ctx.lineTo(cx + 14, benchY - 8);
      ctx.lineTo(cx - 14, benchY - 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();

    /* Dropper — RIGHT SIDE */
    this.drawDropper(ctx, cx + 55, benchY - 140, !done);

    /* Water drop falling */
    if (testing) {
      ctx.save();
      ctx.fillStyle = 'rgba(100,180,230,0.6)';
      var dropProgress = (Date.now() % 800) / 800;
      var dropY2 = benchY - 88 + dropProgress * 40;
      ctx.beginPath();
      ctx.ellipse(cx + 55, dropY2, 4, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '11px sans-serif';
    if (done) {
      ctx.fillStyle = '#3366cc';
      ctx.fillText('White → Blue (water present)', cx, benchY - 170);
    } else {
      ctx.fillStyle = '#888';
      ctx.fillText('Anhydrous CuSO₄ (white)', cx, benchY - 170);
    }
    ctx.fillStyle = '#444';
    ctx.fillText('Test tube', cx, benchY + 25);
    ctx.fillText('Dropper', cx + 55, benchY + 25);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#888';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.8 Water Purity Test — WIDE ── */
  drawM7_8: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_8'];
    var cx = cw / 2;
    var benchY = 540;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.m7ObservationDone;
    var temp = done ? 100 : (heating ? 70 : 25);

    /* Large beaker with water — LEFT */
    this.drawBeaker(ctx, cx - 80, benchY - 55, 110, 100, '#a0d0f0', 0.65);

    /* Thermometer */
    this.drawThermometer(ctx, cx - 80, benchY - 135, 120, temp, 110);

    /* Bunsen */
    this.drawBunsen(ctx, cx - 80, benchY, heating || done, '#4488ff', heating ? 70 : 35);

    /* Second beaker (ice/melting) — RIGHT */
    this.drawBeaker(ctx, cx + 70, benchY - 45, 90, 80, done ? '#d0e8f8' : '#e0f0ff', 0.5);

    /* Ice cubes */
    ctx.save();
    ctx.fillStyle = 'rgba(200,230,250,0.65)';
    ctx.strokeStyle = 'rgba(150,190,220,0.55)';
    ctx.lineWidth = 1;
    for (var i = 0; i < 4; i++) {
      var ix = cx + 52 + (i % 2) * 22;
      var iy = benchY - 38 + Math.floor(i / 2) * 16;
      ctx.fillRect(ix, iy, 18, 14);
      ctx.strokeRect(ix, iy, 18, 14);
    }
    ctx.restore();

    /* Temperature labels */
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px sans-serif';
    if (done) {
      ctx.fillStyle = '#cc2222';
      ctx.fillText('BP: 100°C', cx - 80, benchY - 160);
      ctx.fillStyle = '#3366cc';
      ctx.fillText('MP: 0°C', cx + 70, benchY - 65);
    } else {
      ctx.fillStyle = '#444';
      ctx.fillText(temp.toFixed(0) + '°C', cx + 10, benchY - 90);
    }
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#444';
    ctx.fillText('Water (heating)', cx - 80, benchY + 25);
    ctx.fillText('Ice (melting)', cx + 70, benchY + 25);
    if (done) {
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Pure water confirmed', cx, benchY + 45);
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
