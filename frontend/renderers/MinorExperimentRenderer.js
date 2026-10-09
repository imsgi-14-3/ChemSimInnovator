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
    var canvasW = id === 'M7_1' ? 900 : 550;
    if (id === 'M7_3' || id === 'M7_4' || id === 'M7_5') canvasW = 960;
    var canvasHtml = LaboratoryWorkspace.renderCanvas(canvasW, 640);
    if (id === 'M7_4' && (stage === 'prepare' || stage === 'heat' || stage === 'monitor')) {
      html += '<div class="m74-stage-row"><div class="m74-canvas-cell">' + canvasHtml + '</div>' + this.renderM7_4Side(state) + '</div>';
    } else {
      html += canvasHtml;
    }
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

  /* -- M7.4 side panel: observation + graph shown beside the stage (HTML) -- */
  renderM7_4Side: function(state) {
    var g = '<svg viewBox="0 0 340 188" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">';
    g += '<rect width="340" height="188" rx="12" fill="#d4e8fb"/>';
    g += '<text x="170" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="#16345e">Temperature vs Time</text>';
    g += '<line x1="58" y1="152" x2="58" y2="38" stroke="#16345e" stroke-width="1.6"/>';
    g += '<polygon points="58,30 54,39 62,39" fill="#16345e"/>';
    g += '<line x1="58" y1="152" x2="326" y2="152" stroke="#16345e" stroke-width="1.6"/>';
    g += '<polygon points="334,152 325,148 325,156" fill="#16345e"/>';
    var yt = [60, 70, 80, 90];
    for (var i = 0; i < yt.length; i++) {
      var yy = 152 - (yt[i] - 60) * 3.8;
      g += '<line x1="54" y1="' + yy + '" x2="62" y2="' + yy + '" stroke="#16345e" stroke-width="1.2"/>';
      g += '<text x="48" y="' + (yy + 3.5) + '" text-anchor="end" font-size="10" fill="#16345e">' + yt[i] + '</text>';
    }
    g += '<line x1="136" y1="80" x2="136" y2="152" stroke="#8a94ab" stroke-width="1.2" stroke-dasharray="4 4"/>';
    g += '<line x1="214" y1="76" x2="214" y2="152" stroke="#8a94ab" stroke-width="1.2" stroke-dasharray="4 4"/>';
    g += '<path d="M72 146 Q112 98 136 78 Q176 74 214 74 Q266 68 310 44" fill="none" stroke="#1b3c8a" stroke-width="3" stroke-linecap="round"/>';
    g += '<rect x="118" y="38" width="150" height="34" rx="9" fill="#cfc0f0"/>';
    g += '<text x="193" y="52" text-anchor="middle" font-size="9.5" font-weight="700" fill="#16345e">Melting point range</text>';
    g += '<text x="193" y="66" text-anchor="middle" font-size="9.5" font-weight="700" fill="#16345e">(80\u201382 \u00b0C)</text>';
    g += '<text x="14" y="108" text-anchor="middle" font-size="9.5" font-weight="700" fill="#16345e" transform="rotate(-90 14 108)">Temperature (\u00b0C)</text>';
    g += '<text x="240" y="174" text-anchor="middle" font-size="9.5" font-weight="700" fill="#16345e">Time (min)</text>';
    g += '</svg>';
    var h = '<div class="m74-side">';
    h += '<div class="m74-obs">';
    h += '<h4 class="m74-obs-title">Observation</h4>';
    h += '<ul class="m74-obs-list">';
    h += '<li>The naphthalene starts to melt at about 80 \u00b0C.</li>';
    h += '<li>It is completely liquid at about 80\u201382 \u00b0C.</li>';
    h += '</ul>';
    h += '<div class="m74-obs-banner">Melting point of naphthalene<br>= 80\u201382 \u00b0C</div>';
    h += '</div>';
    h += '<div class="m74-graph">' + g + '</div>';
    h += '</div>';
    return h;
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

  /* ── M7.1 Sublimation of Naphthalene — wide reference scene (900 × 640) ── */
  drawM7_1: function(ctx, cw, ch, state) {
    /* Coordinate table (canvas 900 × 640)
       benchY 540  bench line        ax 265  apparatus axis
       stand  rod x69-81 y150-540, base rr(33,520,84,20), boss rr(66,278,18,20)
       tripod feet (180,540)/(350,540), ring (265,430) rx77 ry8
       gauze  ellipse (265,426) rx84 ry8       flame fy 462 blue 18 standby / dark orange ~44 heating
       flask  base y424 hw70, shoulder y306, neck hw21 y266, rim rx27
       callouts  green (356,248,172) purple (360,336,166) green✓ (358,452,186)
                 blue Heat (312,556,64)
       right  circles (650,108,56) (806,108,56), captions (575,178,150) (738,178,148)
              card (580,300,305,192), dish centre (716,376), yellow (612,432,240)
       banner (14,10,404,88) */
    var benchY = 540;
    var ax = 265;
    var by = benchY;
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = !!(state.simulation && !state.simulation.done);

    ctx.save();

    /* ── Shared helpers ── */
    function rr(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
    function wrapLines(text, maxW) {
      var words = text.split(' ');
      var lines = [], line = '';
      for (var i = 0; i < words.length; i++) {
        var test = line ? line + ' ' + words[i] : words[i];
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line);
          line = words[i];
        } else line = test;
      }
      if (line) lines.push(line);
      return lines;
    }
    function callout(text, x, y, w, fill, stroke, color, size, bold) {
      size = size || 12;
      ctx.font = (bold ? 'bold ' : '') + size + 'px sans-serif';
      var lines = wrapLines(text, w - 16);
      var h = lines.length * 14 + 12;
      rr(x, y, w, h, 8);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + w / 2, y + 13 + i * 14);
      }
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      return h;
    }
    function arrow(x1, y1, x2, y2, color, w) {
      color = color || '#2b7a3d';
      w = w || 2.5;
      var a = Math.atan2(y2 - y1, x2 - x1);
      var hl = 11;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - hl * Math.cos(a - 0.45), y2 - hl * Math.sin(a - 0.45));
      ctx.lineTo(x2 - hl * Math.cos(a + 0.45), y2 - hl * Math.sin(a + 0.45));
      ctx.closePath();
      ctx.fill();
    }
    function bigArrow(x1, y1, x2, y2) {
      arrow(x1, y1, x2, y2, '#4a5563', 6);
    }
    function flaskPath() {
      ctx.beginPath();
      ctx.moveTo(ax - 21, 266);
      ctx.lineTo(ax - 21, 306);
      ctx.lineTo(ax - 70, 414);
      ctx.quadraticCurveTo(ax - 70, 424, ax - 58, 424);
      ctx.lineTo(ax + 58, 424);
      ctx.quadraticCurveTo(ax + 70, 424, ax + 70, 414);
      ctx.lineTo(ax + 21, 306);
      ctx.lineTo(ax + 21, 266);
      ctx.closePath();
    }

    /* ── Background: wall, bokeh, dark bench ── */
    var wall = ctx.createLinearGradient(0, 0, 0, benchY);
    wall.addColorStop(0, '#eef2f6');
    wall.addColorStop(1, '#d5dde6');
    ctx.fillStyle = wall;
    ctx.fillRect(0, 0, cw, benchY);
    var bok = [[120, 90, 52], [305, 55, 34], [475, 130, 62], [705, 85, 46],
               [835, 185, 56], [600, 240, 40], [155, 310, 58], [430, 425, 48],
               [770, 340, 36]];
    for (var b = 0; b < bok.length; b++) {
      var bgr = ctx.createRadialGradient(bok[b][0], bok[b][1], 2, bok[b][0], bok[b][1], bok[b][2]);
      bgr.addColorStop(0, 'rgba(255,255,255,0.55)');
      bgr.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = bgr;
      ctx.beginPath();
      ctx.arc(bok[b][0], bok[b][1], bok[b][2], 0, Math.PI * 2);
      ctx.fill();
    }
    var bench = ctx.createLinearGradient(0, benchY, 0, ch);
    bench.addColorStop(0, '#565c63');
    bench.addColorStop(1, '#31353a');
    ctx.fillStyle = bench;
    ctx.fillRect(0, benchY, cw, ch - benchY);
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY + 1);
    ctx.lineTo(cw, benchY + 1);
    ctx.stroke();

    /* ── Bench shadows ── */
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath();
    ctx.ellipse(75, 543, 46, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(ax, 544, 44, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(ax - 85, 543, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(ax + 85, 543, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    /* ── Retort stand ── */
    ctx.fillStyle = '#3f454d';
    rr(33, 520, 84, 20, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(41, 525);
    ctx.lineTo(109, 525);
    ctx.stroke();
    var standGrad = ctx.createLinearGradient(69, 0, 81, 0);
    standGrad.addColorStop(0, '#565c64');
    standGrad.addColorStop(0.4, '#9aa2ab');
    standGrad.addColorStop(0.7, '#7c848d');
    standGrad.addColorStop(1, '#4a5058');
    ctx.fillStyle = standGrad;
    rr(69, 150, 12, 388, 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.stroke();

    /* ── Tripod stand ── */
    ctx.strokeStyle = '#23262b';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(ax - 85, by);
    ctx.quadraticCurveTo(ax - 77, by - 60, ax - 71, 434);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ax + 85, by);
    ctx.quadraticCurveTo(ax + 77, by - 60, ax + 71, 434);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ax, by + 4);
    ctx.lineTo(ax, 436);
    ctx.stroke();
    ctx.fillStyle = '#15171a';
    ctx.beginPath();
    ctx.ellipse(ax - 85, by, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(ax + 85, by, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2c3036';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(ax, 430, 77, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    /* ── Bunsen burner ── */
    var baseGrad = ctx.createLinearGradient(ax - 34, 0, ax + 34, 0);
    baseGrad.addColorStop(0, '#3a3d42');
    baseGrad.addColorStop(0.4, '#8b9199');
    baseGrad.addColorStop(0.6, '#a8aeb6');
    baseGrad.addColorStop(1, '#3a3d42');
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.ellipse(ax, by - 4, 32, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#24272b';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#4d5158';
    ctx.beginPath();
    ctx.ellipse(ax, by - 16, 13, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    var barrelGrad = ctx.createLinearGradient(ax - 8, 0, ax + 8, 0);
    barrelGrad.addColorStop(0, '#4a4e55');
    barrelGrad.addColorStop(0.4, '#9aa0a8');
    barrelGrad.addColorStop(0.6, '#b4bac2');
    barrelGrad.addColorStop(1, '#4a4e55');
    ctx.fillStyle = barrelGrad;
    ctx.fillRect(ax - 8, by - 74, 16, 62);
    ctx.strokeStyle = '#2b2e33';
    ctx.lineWidth = 1;
    ctx.strokeRect(ax - 8, by - 74, 16, 62);
    ctx.fillStyle = '#2b2e33';
    ctx.beginPath();
    ctx.ellipse(ax - 4, by - 66, 2.2, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(ax + 4, by - 66, 2.2, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#43474e';
    rr(ax - 10, by - 78, 20, 9, 2);
    ctx.fill();
    ctx.strokeStyle = '#26292e';
    ctx.lineWidth = 1;
    ctx.stroke();
    /* gas tube */
    ctx.strokeStyle = '#e87820';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(ax + 26, by - 2);
    ctx.quadraticCurveTo(ax + 62, by + 6, ax + 104, by - 1);
    ctx.stroke();
    ctx.strokeStyle = '#c06018';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(ax + 26, by - 2);
    ctx.quadraticCurveTo(ax + 62, by + 6, ax + 104, by - 1);
    ctx.stroke();

    /* ── Flame — blue on standby, dark orange while heating ── */
    var doneAlone = done && !heating;
    var flameH = heating ? 44 + Math.sin(Date.now() / 90) * 3 : (doneAlone ? 30 : 18);
    var fw = heating ? 14 : (doneAlone ? 11 : 9);
    var fy = by - 78;
    /* halo */
    var glow = ctx.createRadialGradient(ax, fy - flameH * 0.45, 4, ax, fy - flameH * 0.45, flameH * 1.6);
    glow.addColorStop(0, heating ? 'rgba(255,110,30,0.45)' : 'rgba(70,120,255,0.45)');
    glow.addColorStop(1, heating ? 'rgba(255,110,30,0)' : 'rgba(70,120,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(ax, fy - flameH * 0.45, flameH * 1.6, 0, Math.PI * 2);
    ctx.fill();
    /* radiant heat wash while heating */
    if (heating) {
      var hotWash = 0.5 + Math.sin(Date.now() / 150) * 0.08;
      var wash = ctx.createRadialGradient(ax, 442, 6, ax, 442, 40);
      wash.addColorStop(0, 'rgba(255,150,40,' + hotWash + ')');
      wash.addColorStop(1, 'rgba(255,150,40,0)');
      ctx.fillStyle = wash;
      ctx.beginPath();
      ctx.arc(ax, 442, 40, 0, Math.PI * 2);
      ctx.fill();
    }
    /* outer flame — solid dark orange while heating, blue on standby */
    var outer = ctx.createLinearGradient(0, fy, 0, fy - flameH);
    if (heating) {
      outer.addColorStop(0, '#8f2f00');
      outer.addColorStop(0.5, '#d64a00');
      outer.addColorStop(1, '#ff7a19');
    } else {
      outer.addColorStop(0, '#123fbe');
      outer.addColorStop(0.5, '#2f6dff');
      outer.addColorStop(1, '#5fa0ff');
    }
    ctx.fillStyle = outer;
    ctx.beginPath();
    ctx.moveTo(ax - fw, fy);
    ctx.quadraticCurveTo(ax - fw * 0.64, fy - flameH * 0.5, ax, fy - flameH);
    ctx.quadraticCurveTo(ax + fw * 0.64, fy - flameH * 0.5, ax + fw, fy);
    ctx.closePath();
    ctx.fill();
    /* inner cone */
    ctx.fillStyle = heating ? '#ffb347' : '#a9d0ff';
    ctx.beginPath();
    ctx.moveTo(ax - fw * 0.43, fy);
    ctx.quadraticCurveTo(ax - fw * 0.26, fy - flameH * 0.4, ax, fy - flameH * 0.66);
    ctx.quadraticCurveTo(ax + fw * 0.26, fy - flameH * 0.4, ax + fw * 0.43, fy);
    ctx.closePath();
    ctx.fill();
    /* bright core */
    ctx.fillStyle = heating ? 'rgba(255,240,220,0.9)' : 'rgba(255,251,242,0.88)';
    ctx.beginPath();
    ctx.moveTo(ax - fw * 0.18, fy);
    ctx.quadraticCurveTo(ax - fw * 0.1, fy - flameH * 0.3, ax, fy - flameH * 0.5);
    ctx.quadraticCurveTo(ax + fw * 0.1, fy - flameH * 0.3, ax + fw * 0.18, fy);
    ctx.closePath();
    ctx.fill();

    /* ── Wire gauze (over the flame, under the flask) ── */
    ctx.fillStyle = '#3a3a3a';
    ctx.strokeStyle = '#1e1e1e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(ax, 426, 84, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(ax, 426, 84, 8, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.strokeStyle = 'rgba(110,110,110,0.55)';
    ctx.lineWidth = 0.7;
    for (var mi = -6; mi <= 6; mi++) {
      ctx.beginPath();
      ctx.moveTo(ax + mi * 13, 418);
      ctx.lineTo(ax + mi * 13, 434);
      ctx.stroke();
    }
    for (var mj = -3; mj <= 3; mj++) {
      ctx.beginPath();
      ctx.moveTo(ax - 84, 426 + mj * 2.5);
      ctx.lineTo(ax + 84, 426 + mj * 2.5);
      ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle = '#c8c0b4';
    ctx.strokeStyle = '#a09890';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(ax, 426, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    /* ── Conical flask on the gauze ── */
    var glass = ctx.createLinearGradient(ax - 70, 0, ax + 70, 0);
    glass.addColorStop(0, 'rgba(170,198,222,0.55)');
    glass.addColorStop(0.12, 'rgba(232,242,252,0.18)');
    glass.addColorStop(0.5, 'rgba(245,250,255,0.08)');
    glass.addColorStop(0.88, 'rgba(232,242,252,0.16)');
    glass.addColorStop(1, 'rgba(170,198,222,0.5)');
    flaskPath();
    ctx.fillStyle = glass;
    ctx.fill();
    ctx.strokeStyle = 'rgba(88,128,168,0.85)';
    ctx.lineWidth = 2.2;
    ctx.stroke();

    /* mixture (sand + salt + naphthalene) inside */
    ctx.save();
    flaskPath();
    ctx.clip();
    ctx.fillStyle = '#d9ccaa';
    ctx.fillRect(ax - 75, 388, 150, 38);
    var grains = [[-46, 396], [-32, 404], [-16, 394], [2, 402], [18, 395],
                  [34, 404], [48, 397], [-40, 412], [-8, 414], [24, 413],
                  [44, 411], [8, 391]];
    ctx.fillStyle = '#b9a87e';
    for (var g1 = 0; g1 < grains.length; g1++) {
      ctx.beginPath();
      ctx.arc(ax + grains[g1][0], grains[g1][1], 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#f4f2ea';
    var salts = [[-24, 400], [10, 408], [40, 401], [-4, 395], [-52, 406], [28, 416]];
    for (var g2 = 0; g2 < salts.length; g2++) {
      ctx.beginPath();
      ctx.arc(ax + salts[g2][0], salts[g2][1], 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#e6dbba';
    ctx.beginPath();
    ctx.ellipse(ax, 388, 58, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(150,132,92,0.7)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    /* crystals deposited on the cooler inner walls */
    if (done || heating) {
      ctx.save();
      flaskPath();
      ctx.clip();
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.lineWidth = 1;
      var k, t, xw, yv;
      for (k = 0; k < 12; k++) {
        yv = 310 + k * 9;
        t = (yv - 306) / 108;
        xw = ax - 24 - t * 42 + 3 + (k % 4);
        ctx.beginPath();
        ctx.arc(xw, yv, 1.5 + (k % 3) * 0.7, 0, Math.PI * 2);
        ctx.fill();
        xw = ax + 24 + t * 42 - 3 - ((k + 2) % 4);
        ctx.beginPath();
        ctx.arc(xw, yv + 4, 1.5 + ((k + 1) % 3) * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      var necks = [[-16, 274], [-16, 286], [-16, 298], [16, 278], [16, 292],
                   [-30, 316], [0, 318], [-12, 330], [14, 334], [4, 348]];
      for (k = 0; k < necks.length; k++) {
        ctx.beginPath();
        ctx.arc(ax + necks[k][0], necks[k][1], 2 + (k % 3) * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      var spk = [[-36, 344], [30, 356], [-10, 366], [40, 378], [-44, 386]];
      for (k = 0; k < spk.length; k++) {
        ctx.beginPath();
        ctx.moveTo(ax + spk[k][0] - 3, spk[k][1]);
        ctx.lineTo(ax + spk[k][0] + 3, spk[k][1]);
        ctx.moveTo(ax + spk[k][0], spk[k][1] - 3);
        ctx.lineTo(ax + spk[k][0], spk[k][1] + 3);
        ctx.stroke();
      }
      ctx.restore();
    }

    /* rising naphthalene vapour */
    if (heating) {
      ctx.save();
      flaskPath();
      ctx.clip();
      ctx.fillStyle = 'rgba(214,224,238,0.55)';
      for (var v = 0; v < 6; v++) {
        var prog = (Date.now() / 14 + v * 34) % 136;
        var vy = 384 - prog;
        var jit = vy < 306 ? 7 : 24;
        var vx = ax + Math.sin(Date.now() / 300 + v * 1.7) * jit;
        ctx.globalAlpha = vy > 320 ? 0.35 : 0.25;
        ctx.beginPath();
        ctx.arc(vx, vy, 3 + (v % 3), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    /* flask rim + highlights */
    ctx.fillStyle = 'rgba(214,232,248,0.75)';
    ctx.beginPath();
    ctx.ellipse(ax, 266, 27, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(88,128,168,0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ax - 15, 314);
    ctx.lineTo(ax - 50, 404);
    ctx.stroke();
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(ax - 13, 272);
    ctx.lineTo(ax - 13, 302);
    ctx.stroke();

    /* ── Clamp boss, arm and jaw (grips the neck) ── */
    ctx.fillStyle = '#4a5058';
    rr(66, 278, 18, 20, 4);
    ctx.fill();
    ctx.strokeStyle = '#2b2f35';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.strokeStyle = '#7c848d';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(84, 288);
    ctx.lineTo(238, 288);
    ctx.stroke();
    ctx.strokeStyle = '#3f454d';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = '#8a929b';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(ax, 288, 26, Math.PI * 0.78, Math.PI * 1.22);
    ctx.stroke();
    ctx.fillStyle = '#3f454d';
    ctx.beginPath();
    ctx.arc(236, 288, 4, 0, Math.PI * 2);
    ctx.fill();

    /* ── Coloured callouts + arrows ── */
    arrow(356, 268, 303, 326, '#3d9b57');
    callout('Naphthalene crystals (on cooler surface)', 356, 248, 172, '#e6f6ea', '#3d9b57', '#175c2c', 12);
    arrow(360, 356, 329, 398, '#8a5cd0');
    callout('Mixture of sand, salt and naphthalene', 360, 336, 166, '#f2ebfb', '#8a5cd0', '#4a2d80', 12);
    arrow(358, 472, 335, 414, '#3d9b57');
    callout('\u2713 Sand + salt remain behind (they do not sublime)', 358, 452, 186, '#e6f6ea', '#3d9b57', '#175c2c', 12);
    arrow(330, 556, 285, 505, '#d97706');
    callout('Heat', 312, 556, 64, '#e3f0ff', '#3b82d0', '#14477e', 13, true);

    /* ── Right column: 3-step flow ── */
    var inBg = ctx.createLinearGradient(0, 52, 0, 164);
    inBg.addColorStop(0, '#eef4fa');
    inBg.addColorStop(1, '#d9e4ef');

    /* circle 1 — mixture bowl */
    ctx.save();
    ctx.beginPath();
    ctx.arc(650, 108, 56, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = inBg;
    ctx.fillRect(594, 52, 112, 112);
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#9aa7b4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(614, 126);
    ctx.quadraticCurveTo(618, 152, 650, 152);
    ctx.quadraticCurveTo(682, 152, 686, 126);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(650, 126, 36, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#f3f6f9';
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(650, 124, 31, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d9ccaa';
    ctx.fill();
    ctx.strokeStyle = 'rgba(150,132,92,0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
    var bowlG = [[-18, 123], [-6, 127], [8, 122], [20, 126], [0, 120], [-12, 130], [14, 130]];
    ctx.fillStyle = '#b9a87e';
    for (var b1 = 0; b1 < bowlG.length; b1++) {
      ctx.beginPath();
      ctx.arc(650 + bowlG[b1][0], bowlG[b1][1], 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#f4f2ea';
    var bowlS = [[-24, 125], [4, 124], [24, 123]];
    for (var b2 = 0; b2 < bowlS.length; b2++) {
      ctx.beginPath();
      ctx.arc(650 + bowlS[b2][0], bowlS[b2][1], 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(650, 108, 56, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#9fb6cd';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(650, 108, 58.5, 0, Math.PI * 2);
    ctx.stroke();

    /* circle 2 — mini flask with deposited crystals */
    ctx.save();
    ctx.beginPath();
    ctx.arc(806, 108, 56, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = inBg;
    ctx.fillRect(750, 52, 112, 112);
    var mf = ctx.createLinearGradient(778, 0, 834, 0);
    mf.addColorStop(0, 'rgba(170,198,222,0.6)');
    mf.addColorStop(0.5, 'rgba(245,250,255,0.15)');
    mf.addColorStop(1, 'rgba(170,198,222,0.55)');
    ctx.beginPath();
    ctx.moveTo(798, 74);
    ctx.lineTo(798, 96);
    ctx.lineTo(780, 140);
    ctx.quadraticCurveTo(778, 148, 786, 148);
    ctx.lineTo(826, 148);
    ctx.quadraticCurveTo(834, 148, 832, 140);
    ctx.lineTo(814, 96);
    ctx.lineTo(814, 74);
    ctx.closePath();
    ctx.fillStyle = mf;
    ctx.fill();
    ctx.strokeStyle = 'rgba(88,128,168,0.9)';
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.save();
    ctx.clip();
    ctx.fillStyle = '#d9ccaa';
    ctx.fillRect(776, 132, 60, 18);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    var mc = [[799, 100], [799, 111], [795, 123], [813, 104], [812, 117],
              [816, 128], [806, 82], [806, 88]];
    for (var c2i = 0; c2i < mc.length; c2i++) {
      ctx.beginPath();
      ctx.arc(mc[c2i][0], mc[c2i][1], 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.ellipse(806, 140, 26, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'rgba(214,232,248,0.8)';
    ctx.beginPath();
    ctx.ellipse(806, 74, 12, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(88,128,168,0.9)';
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(806, 108, 56, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#9fb6cd';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(806, 108, 58.5, 0, Math.PI * 2);
    ctx.stroke();

    /* flow arrows + step captions */
    bigArrow(712, 108, 746, 108);
    callout('1. Mixture of sand, salt and naphthalene', 575, 178, 150, '#e8f1fb', '#5b93d9', '#16375e', 12);
    callout('2. On heating, naphthalene sublimes and deposits on cooler surface', 738, 178, 148, '#e8f1fb', '#5b93d9', '#16375e', 12);
    bigArrow(812, 254, 812, 296);

    /* dark card with the separated-crystal dish */
    rr(580, 300, 305, 192, 18);
    ctx.fillStyle = '#232b36';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(716, 406, 62, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    var bowlGrad = ctx.createLinearGradient(0, 372, 0, 404);
    bowlGrad.addColorStop(0, '#f8fafc');
    bowlGrad.addColorStop(1, '#c3cad2');
    ctx.fillStyle = bowlGrad;
    ctx.strokeStyle = '#9aa4af';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(648, 372);
    ctx.quadraticCurveTo(652, 404, 716, 404);
    ctx.quadraticCurveTo(780, 404, 784, 372);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#eef1f5';
    ctx.beginPath();
    ctx.ellipse(716, 372, 68, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#9aa4af';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#dfe4ea';
    ctx.beginPath();
    ctx.ellipse(716, 372, 60, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    var pile = [
      [366, [-44, -33, -22, -11, 0, 11, 22, 33, 44]],
      [357, [-33, -22, -11, 0, 11, 22, 33]],
      [349, [-22, -11, 0, 11, 22]],
      [342, [-11, 0, 11]]
    ];
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#d3dbe3';
    ctx.lineWidth = 0.8;
    for (var p1 = 0; p1 < pile.length; p1++) {
      for (var p2 = 0; p2 < pile[p1][1].length; p2++) {
        ctx.beginPath();
        ctx.arc(716 + pile[p1][1][p2], pile[p1][0], 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 1.2;
    var sp2 = [[752, 350], [684, 358], [726, 336], [700, 344]];
    for (var s1 = 0; s1 < sp2.length; s1++) {
      ctx.beginPath();
      ctx.moveTo(sp2[s1][0] - 4, sp2[s1][1]);
      ctx.lineTo(sp2[s1][0] + 4, sp2[s1][1]);
      ctx.moveTo(sp2[s1][0], sp2[s1][1] - 4);
      ctx.lineTo(sp2[s1][0], sp2[s1][1] + 4);
      ctx.stroke();
    }
    callout('Separated naphthalene (white crystals)', 612, 432, 240, '#f8d97a', '#dcb84e', '#3a2c0d', 12, true);

    /* ── Title banner ── */
    var banGrad = ctx.createLinearGradient(14, 10, 418, 98);
    banGrad.addColorStop(0, '#132a4d');
    banGrad.addColorStop(1, '#1e4275');
    rr(14, 10, 404, 88, 16);
    ctx.fillStyle = banGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(245,197,66,0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Separation of Naphthalene', 216, 42);
    ctx.font = '12.5px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.fillText('(from a mixture of sand and salt)', 216, 64);
    ctx.font = 'bold 13.5px sans-serif';
    ctx.fillStyle = '#f5c542';
    ctx.fillText('\u2014 by Sublimation \u2014', 216, 86);
    ctx.textAlign = 'left';

    /* simulated note */
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
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

  /* ── M7.3 CuSO4 Crystals — 5-step poster (reference image) ── */
  drawM7_3: function(ctx, cw, ch, state) {
    var simRun = !!(state.simulation && !state.simulation.done);
    var simDone = !!(state.simulation && state.simulation.done);
    var t = Date.now();

    function rr(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function head(x, y, ang, s, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - s * Math.cos(ang - 0.45), y - s * Math.sin(ang - 0.45));
      ctx.lineTo(x - s * Math.cos(ang + 0.45), y - s * Math.sin(ang + 0.45));
      ctx.closePath();
      ctx.fill();
    }

    function arrow(x1, y1, cx, cy, x2, y2) {
      ctx.strokeStyle = '#16457e';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      ctx.stroke();
      head(x2, y2, Math.atan2(y2 - cy, x2 - cx), 8, '#16457e');
      ctx.lineCap = 'butt';
    }

    function callout(x, y, w, lines) {
      var h = lines.length * 15 + 14;
      ctx.fillStyle = '#ffffff';
      rr(x, y, w, h, 8);
      ctx.fill();
      ctx.strokeStyle = '#dbe4ec';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#16457e';
      ctx.font = 'bold 9.5px sans-serif';
      ctx.textAlign = 'center';
      for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + w / 2, y + 20 + i * 15);
      }
      ctx.textAlign = 'left';
      return h;
    }

    function header(bx, py, num, text, pw) {
      ctx.fillStyle = '#cfe7fa';
      rr(bx + 34, py, pw, 30, 15);
      ctx.fill();
      ctx.fillStyle = '#16457e';
      ctx.font = 'bold 12.5px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(text, bx + 46, py + 20);
      ctx.fillStyle = '#17457e';
      ctx.beginPath();
      ctx.arc(bx + 24, py + 15, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(num), bx + 24, py + 21);
      ctx.textAlign = 'left';
    }

    function panelBg(x, y, w, h, top, bottom) {
      var g = ctx.createLinearGradient(0, y, 0, y + h);
      g.addColorStop(0, top);
      g.addColorStop(1, bottom);
      ctx.fillStyle = g;
      ctx.fillRect(x, y, w, h);
    }

    function clipPanel(x, y, w, h) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.clip();
    }

    ctx.save();

    /* title banner */
    ctx.fillStyle = '#1d3f77';
    rr(140, 6, 680, 52, 26);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 21px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Preparation of Pure CuSO\u2084\u00b75H\u2082O Crystals', 480, 40);
    ctx.textAlign = 'left';

    /* ── Panel 1: dissolve ── */
    clipPanel(0, 64, 316, 284);
    panelBg(0, 64, 316, 284, '#f1f4f7', '#e6eaef');
    ctx.fillStyle = '#bb9064';
    ctx.fillRect(0, 316, 316, 32);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(0, 316, 316, 3);
    /* hot plate stirrer */
    ctx.fillStyle = '#f4f6f8';
    rr(64, 286, 190, 16, 5);
    ctx.fill();
    ctx.strokeStyle = '#c9ced4';
    ctx.lineWidth = 1;
    ctx.stroke();
    var hp = ctx.createLinearGradient(0, 300, 0, 344);
    hp.addColorStop(0, '#2c4180');
    hp.addColorStop(1, '#1c2c5e');
    ctx.fillStyle = hp;
    rr(70, 300, 178, 44, 6);
    ctx.fill();
    ctx.fillStyle = '#12172b';
    ctx.beginPath();
    ctx.arc(215, 322, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3a4468';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(215, 322);
    ctx.lineTo(220, 315);
    ctx.stroke();
    ctx.fillStyle = simRun ? '#ffb14d' : '#ff8c1a';
    ctx.beginPath();
    ctx.arc(240, 322, 4.5, 0, Math.PI * 2);
    ctx.fill();
    /* beaker on hot plate */
    var bgd = ctx.createLinearGradient(108, 0, 208, 0);
    bgd.addColorStop(0, 'rgba(255,255,255,0.34)');
    bgd.addColorStop(0.5, 'rgba(235,245,255,0.16)');
    bgd.addColorStop(1, 'rgba(255,255,255,0.30)');
    ctx.fillStyle = bgd;
    rr(108, 146, 100, 142, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(118,150,182,0.9)';
    ctx.lineWidth = 2;
    rr(108, 146, 100, 142, 8);
    ctx.stroke();
    ctx.fillStyle = 'rgba(210,230,248,0.5)';
    ctx.beginPath();
    ctx.moveTo(112, 150);
    ctx.lineTo(98, 140);
    ctx.lineTo(122, 147);
    ctx.closePath();
    ctx.fill();
    var lq = ctx.createLinearGradient(0, 196, 0, 284);
    lq.addColorStop(0, '#38b6ee');
    lq.addColorStop(1, '#1683cf');
    ctx.fillStyle = lq;
    ctx.beginPath();
    ctx.moveTo(111, 200);
    ctx.lineTo(205, 200);
    ctx.lineTo(205, 278);
    ctx.quadraticCurveTo(205, 284, 197, 284);
    ctx.lineTo(119, 284);
    ctx.quadraticCurveTo(111, 284, 111, 278);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(160,226,252,0.9)';
    ctx.fillRect(111, 198, 94, 4);
    ctx.strokeStyle = 'rgba(255,255,255,0.75)';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '7px sans-serif';
    ctx.textAlign = 'right';
    for (var gi = 0; gi < 4; gi++) {
      var ggy = 216 + gi * 20;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(184, ggy);
      ctx.lineTo(200, ggy);
      ctx.stroke();
      ctx.fillText(String(250 - gi * 50), 181, ggy + 2.5);
    }
    ctx.textAlign = 'left';
    /* pouring spoon */
    ctx.save();
    ctx.strokeStyle = '#9aa4ad';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(242, 146);
    ctx.lineTo(196, 134);
    ctx.stroke();
    ctx.strokeStyle = '#cfd6dc';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(242, 145);
    ctx.lineTo(196, 133);
    ctx.stroke();
    ctx.lineCap = 'butt';
    ctx.translate(188, 131);
    ctx.rotate(-0.35);
    var sgr = ctx.createLinearGradient(0, -11, 0, 11);
    sgr.addColorStop(0, '#e9edf1');
    sgr.addColorStop(1, '#97a1aa');
    ctx.fillStyle = sgr;
    ctx.beginPath();
    ctx.ellipse(0, 0, 17, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#7f8992';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#1e88e5';
    ctx.beginPath();
    ctx.ellipse(0, -1, 11, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    /* falling grains */
    if (!simDone) {
      var fall = simRun ? (t / 9) % 52 : 0;
      for (var gr = 0; gr < 5; gr++) {
        var grx = 180 + Math.sin(gr * 1.8 + (simRun ? t / 160 : 0)) * 5;
        var gry = 146 + ((gr * 11 + fall) % 52);
        ctx.save();
        ctx.translate(grx, gry);
        ctx.rotate(gr);
        ctx.fillStyle = gr % 2 ? '#1976d2' : '#2fa4ec';
        ctx.fillRect(-2.5, -2.5, 5, 5);
        ctx.restore();
      }
    }
    if (!simRun && !simDone) {
      ctx.fillStyle = 'rgba(21,105,180,0.85)';
      ctx.beginPath();
      ctx.ellipse(140, 278, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(172, 280, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    if (simRun) {
      ctx.fillStyle = 'rgba(200,236,252,0.7)';
      for (var sw = 0; sw < 5; sw++) {
        var swx = 158 + Math.sin(t / 260 + sw * 1.5) * 32;
        var swy = 240 + Math.cos(t / 300 + sw * 2.1) * 30;
        ctx.beginPath();
        ctx.arc(swx, swy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    callout(236, 150, 76, ['Impure', 'CuSO\u2084\u00b75H\u2082O', '(solid)']);
    arrow(234, 166, 218, 150, 205, 139);
    callout(6, 196, 96, ['Dissolve in', 'warm distilled', 'water']);
    arrow(104, 226, 114, 232, 111, 244);
    header(0, 70, 1, 'Dissolve the impure sample', 214);
    ctx.restore();

    /* ── Panel 2: filter ── */
    clipPanel(322, 64, 310, 284);
    panelBg(322, 64, 310, 284, '#eef1f5', '#e4e8ed');
    ctx.fillStyle = '#d5d9de';
    ctx.fillRect(322, 316, 310, 32);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(322, 316, 310, 2);
    /* retort stand */
    ctx.fillStyle = '#202329';
    rr(372, 316, 180, 18, 4);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(374, 318, 176, 3);
    var rodg = ctx.createLinearGradient(398, 0, 408, 0);
    rodg.addColorStop(0, '#6d757d');
    rodg.addColorStop(0.4, '#4a5158');
    rodg.addColorStop(1, '#333940');
    ctx.fillStyle = rodg;
    ctx.fillRect(398, 96, 10, 222);
    ctx.fillStyle = '#34383e';
    rr(420, 134, 14, 12, 3);
    ctx.fill();
    rr(438, 134, 14, 12, 3);
    ctx.fill();
    ctx.fillStyle = '#25282d';
    rr(408, 142, 66, 16, 4);
    ctx.fill();
    ctx.fillStyle = '#1a1d21';
    rr(458, 132, 26, 36, 5);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(460, 135, 22, 3);
    /* funnel + stem */
    ctx.fillStyle = 'rgba(218,234,248,0.4)';
    ctx.strokeStyle = 'rgba(108,148,184,0.95)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(438, 100);
    ctx.lineTo(504, 100);
    ctx.lineTo(474, 152);
    ctx.lineTo(468, 152);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(218,234,248,0.32)';
    ctx.fillRect(466, 150, 10, 66);
    ctx.strokeRect(466, 150, 10, 66);
    /* filter paper with impurities */
    ctx.fillStyle = '#f7f9fa';
    ctx.strokeStyle = '#d4dae0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(443, 104);
    ctx.lineTo(499, 104);
    ctx.lineTo(473, 148);
    ctx.lineTo(469, 148);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var imp = [[460, 110], [474, 113], [466, 118], [481, 108], [455, 115]];
    for (var ii = 0; ii < imp.length; ii++) {
      ctx.fillStyle = '#7a5a3a';
      ctx.beginPath();
      ctx.arc(imp[ii][0], imp[ii][1], 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#5f442a';
    ctx.beginPath();
    ctx.arc(470, 111, 2.6, 0, Math.PI * 2);
    ctx.fill();
    /* conical flask */
    ctx.fillStyle = 'rgba(255,255,255,0.26)';
    ctx.strokeStyle = 'rgba(108,148,184,0.95)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(461, 242);
    ctx.lineTo(431, 306);
    ctx.quadraticCurveTo(429, 316, 439, 316);
    ctx.lineTo(503, 316);
    ctx.quadraticCurveTo(513, 316, 511, 306);
    ctx.lineTo(481, 242);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(218,234,248,0.4)';
    ctx.fillRect(461, 210, 20, 34);
    ctx.strokeRect(461, 210, 20, 34);
    var flq = ctx.createLinearGradient(0, 272, 0, 314);
    flq.addColorStop(0, '#3ab4ea');
    flq.addColorStop(1, '#1a8fd0');
    ctx.fillStyle = flq;
    ctx.beginPath();
    ctx.moveTo(443, 274);
    ctx.lineTo(499, 274);
    ctx.lineTo(507, 310);
    ctx.quadraticCurveTo(509, 314, 503, 314);
    ctx.lineTo(439, 314);
    ctx.quadraticCurveTo(433, 314, 435, 310);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(170,230,252,0.95)';
    ctx.fillRect(443, 272, 56, 4);
    callout(536, 96, 94, ['Filter paper', '(with impurities)']);
    arrow(534, 124, 520, 118, 503, 119);
    callout(544, 256, 86, ['Clear blue', 'filtrate']);
    arrow(542, 278, 530, 284, 516, 289);
    header(322, 70, 2, 'Filter the solution', 168);
    ctx.restore();

    /* ── Panel 3: evaporate ── */
    clipPanel(638, 64, 322, 284);
    panelBg(638, 64, 322, 284, '#eef1f5', '#e5e9ee');
    var b3g = ctx.createLinearGradient(0, 296, 0, 348);
    b3g.addColorStop(0, '#31363c');
    b3g.addColorStop(1, '#24272c');
    ctx.fillStyle = b3g;
    ctx.fillRect(638, 296, 322, 52);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fillRect(638, 296, 322, 3);
    /* tripod legs */
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0e0f12';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(766, 286);
    ctx.lineTo(756, 330);
    ctx.stroke();
    ctx.strokeStyle = '#17181b';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(732, 286);
    ctx.lineTo(708, 344);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(868, 286);
    ctx.lineTo(892, 344);
    ctx.stroke();
    ctx.lineCap = 'butt';
    /* bunsen burner */
    var bur = ctx.createLinearGradient(788, 0, 812, 0);
    bur.addColorStop(0, '#7e858c');
    bur.addColorStop(0.35, '#dfe4e8');
    bur.addColorStop(0.7, '#a8afb6');
    bur.addColorStop(1, '#6d747b');
    ctx.fillStyle = bur;
    ctx.fillRect(788, 324, 24, 12);
    ctx.strokeStyle = '#565c63';
    ctx.lineWidth = 1;
    ctx.strokeRect(788, 324, 24, 12);
    ctx.fillStyle = '#6a7178';
    rr(784, 314, 32, 10, 3);
    ctx.fill();
    ctx.fillStyle = '#3a3f45';
    ctx.beginPath();
    ctx.arc(792, 319, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(800, 319, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(808, 319, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = bur;
    ctx.fillRect(794, 304, 12, 12);
    var bbase = ctx.createLinearGradient(0, 334, 0, 348);
    bbase.addColorStop(0, '#c2c8ce');
    bbase.addColorStop(1, '#767d84');
    ctx.fillStyle = bbase;
    rr(778, 334, 44, 14, 5);
    ctx.fill();
    ctx.strokeStyle = '#565c63';
    ctx.stroke();
    /* blue flame */
    var fs = simRun ? 1 + Math.sin(t / 70) * 0.08 : 1;
    var sway = simRun ? Math.sin(t / 90) * 1.6 : 0;
    ctx.save();
    ctx.translate(800, 304);
    ctx.scale(1, fs);
    ctx.fillStyle = 'rgba(47,127,255,0.85)';
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.quadraticCurveTo(-7, -10 + sway, sway, -18);
    ctx.quadraticCurveTo(7, -10 + sway, 8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(207,234,255,0.9)';
    ctx.beginPath();
    ctx.moveTo(-3.5, 0);
    ctx.quadraticCurveTo(-3, -6, sway, -11);
    ctx.quadraticCurveTo(3, -6, 3.5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    /* wire gauze */
    ctx.fillStyle = '#33373d';
    rr(716, 277, 168, 10, 2);
    ctx.fill();
    ctx.strokeStyle = '#565c64';
    ctx.lineWidth = 0.8;
    for (var mx = 724; mx < 884; mx += 9) {
      ctx.beginPath();
      ctx.moveTo(mx, 278);
      ctx.lineTo(mx, 286);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(717, 281);
    ctx.lineTo(883, 281);
    ctx.stroke();
    ctx.strokeStyle = '#474c54';
    ctx.lineWidth = 1;
    ctx.strokeRect(716, 277, 168, 10);
    /* evaporating dish */
    ctx.fillStyle = 'rgba(220,235,248,0.4)';
    ctx.strokeStyle = 'rgba(140,175,205,0.95)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(714, 244);
    ctx.quadraticCurveTo(720, 270, 748, 276);
    ctx.lineTo(852, 276);
    ctx.quadraticCurveTo(880, 270, 886, 244);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(714, 244);
    ctx.quadraticCurveTo(720, 270, 748, 276);
    ctx.lineTo(852, 276);
    ctx.quadraticCurveTo(880, 270, 886, 244);
    ctx.closePath();
    ctx.clip();
    var dliq = ctx.createLinearGradient(0, 250, 0, 276);
    dliq.addColorStop(0, '#38b4ec');
    dliq.addColorStop(1, '#1c8fd2');
    ctx.fillStyle = dliq;
    ctx.fillRect(700, 250, 200, 30);
    ctx.fillStyle = 'rgba(160,226,252,0.95)';
    ctx.fillRect(714, 250, 172, 4);
    ctx.restore();
    ctx.fillStyle = 'rgba(224,238,250,0.55)';
    ctx.strokeStyle = 'rgba(140,175,205,0.95)';
    ctx.beginPath();
    ctx.ellipse(800, 244, 86, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(56,176,232,0.8)';
    ctx.beginPath();
    ctx.ellipse(800, 246, 72, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    /* steam */
    for (var sm = 0; sm < 6; sm++) {
      var smy = 236 - (((simRun ? t / 10 : 0) + sm * 16) % 58);
      var smx = 800 + Math.sin((simRun ? t / 200 : 0) + sm * 1.4) * 14;
      var sma = 0.3 * (1 - (236 - smy) / 58);
      if (sma < 0.05) sma = 0.05;
      ctx.fillStyle = 'rgba(214,222,230,' + sma.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(smx, smy, 3.5 + (sm % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    callout(854, 130, 100, ['Slowly evaporate', '(leave to cool)']);
    arrow(874, 176, 866, 208, 857, 238);
    header(638, 70, 3, 'Evaporate the filtrate', 192);
    ctx.restore();

    /* ── Panel 4: crystallisation ── */
    clipPanel(0, 354, 316, 286);
    panelBg(0, 354, 316, 286, '#eff2f6', '#e6eaef');
    ctx.fillStyle = '#cfd4da';
    ctx.fillRect(0, 566, 316, 74);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(0, 566, 316, 3);
    /* beaker */
    var cbg = ctx.createLinearGradient(76, 0, 204, 0);
    cbg.addColorStop(0, 'rgba(255,255,255,0.36)');
    cbg.addColorStop(0.5, 'rgba(235,245,255,0.15)');
    cbg.addColorStop(1, 'rgba(255,255,255,0.30)');
    ctx.fillStyle = cbg;
    rr(76, 386, 128, 180, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(118,150,182,0.9)';
    ctx.lineWidth = 2.2;
    rr(76, 386, 128, 180, 10);
    ctx.stroke();
    ctx.fillStyle = 'rgba(225,238,250,0.55)';
    rr(72, 384, 136, 9, 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(118,150,182,0.85)';
    ctx.lineWidth = 1.4;
    rr(72, 384, 136, 9, 4);
    ctx.stroke();
    ctx.fillStyle = 'rgba(215,232,248,0.55)';
    ctx.beginPath();
    ctx.moveTo(78, 386);
    ctx.lineTo(66, 378);
    ctx.lineTo(88, 384);
    ctx.closePath();
    ctx.fill();
    var sol = ctx.createLinearGradient(0, 442, 0, 562);
    sol.addColorStop(0, '#2b93d8');
    sol.addColorStop(1, '#1465ad');
    ctx.fillStyle = sol;
    ctx.beginPath();
    ctx.moveTo(80, 442);
    ctx.lineTo(200, 442);
    ctx.lineTo(200, 554);
    ctx.quadraticCurveTo(200, 562, 190, 562);
    ctx.lineTo(90, 562);
    ctx.quadraticCurveTo(80, 562, 80, 554);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(120,200,240,0.9)';
    ctx.fillRect(80, 440, 120, 4);
    ctx.strokeStyle = 'rgba(255,255,255,0.65)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(176, 476);
    ctx.lineTo(196, 476);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(176, 508);
    ctx.lineTo(196, 508);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(176, 540);
    ctx.lineTo(196, 540);
    ctx.stroke();
    callout(230, 470, 84, ['Allow to cool', 'undisturbed']);
    arrow(228, 486, 214, 494, 206, 506);
    header(0, 360, 4, 'Crystallisation', 150);
    ctx.restore();

    /* ── Panel 5: pure crystals ── */
    clipPanel(322, 354, 638, 286);
    panelBg(322, 354, 638, 76, '#edf0f4', '#e7ebef');
    var p5b = ctx.createLinearGradient(0, 430, 0, 640);
    p5b.addColorStop(0, '#3a4046');
    p5b.addColorStop(1, '#2a2f35');
    ctx.fillStyle = p5b;
    ctx.fillRect(322, 430, 638, 210);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fillRect(322, 430, 638, 3);
    /* watch glass */
    ctx.fillStyle = 'rgba(226,238,250,0.20)';
    ctx.strokeStyle = 'rgba(255,255,255,0.62)';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(519, 505, 165, 55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.32)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(519, 505, 143, 46, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* crystal heap */
    var cc = ['#1e6fd8', '#2f8fe8', '#42a5f0', '#155cb5'];
    for (var ci = 0; ci < 16; ci++) {
      var cang = ci * 2.399;
      var crad = 16 + (ci % 4) * 27;
      var cpx = 519 + Math.cos(cang) * crad * 1.3;
      var cpy = 501 + Math.sin(cang * 1.31) * crad * 0.44;
      var csz = 11 + (ci % 3) * 6;
      ctx.save();
      ctx.translate(cpx, cpy);
      ctx.rotate(ci * 0.7);
      ctx.fillStyle = cc[ci % 4];
      ctx.beginPath();
      ctx.moveTo(-csz, -csz * 0.5);
      ctx.lineTo(csz * 0.4, -csz);
      ctx.lineTo(csz, csz * 0.4);
      ctx.lineTo(-csz * 0.4, csz);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-csz * 0.6, -csz * 0.2);
      ctx.lineTo(csz * 0.5, -csz * 0.55);
      ctx.stroke();
      ctx.restore();
    }
    /* arrow to inset */
    ctx.strokeStyle = '#16457e';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(648, 468);
    ctx.quadraticCurveTo(700, 410, 726, 396);
    ctx.stroke();
    head(726, 396, Math.atan2(396 - 410, 726 - 700), 9, '#16457e');
    ctx.lineCap = 'butt';
    /* circular inset */
    var ins = ctx.createRadialGradient(814, 434, 12, 814, 442, 102);
    ins.addColorStop(0, '#131a29');
    ins.addColorStop(1, '#05070c');
    ctx.fillStyle = ins;
    ctx.beginPath();
    ctx.arc(814, 442, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.save();
    ctx.translate(814, 448);
    ctx.scale(1.3, 1.3);
    ctx.beginPath();
    ctx.moveTo(-38, -6);
    ctx.lineTo(-16, -30);
    ctx.lineTo(18, -28);
    ctx.lineTo(40, -2);
    ctx.lineTo(26, 26);
    ctx.lineTo(-8, 34);
    ctx.lineTo(-32, 18);
    ctx.closePath();
    var gemg = ctx.createLinearGradient(-38, -30, 40, 34);
    gemg.addColorStop(0, '#5fb4f5');
    gemg.addColorStop(0.45, '#2578dc');
    gemg.addColorStop(1, '#0e4794');
    ctx.fillStyle = gemg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.66)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-38, -6);
    ctx.lineTo(2, 4);
    ctx.lineTo(18, -28);
    ctx.moveTo(2, 4);
    ctx.lineTo(40, -2);
    ctx.moveTo(2, 4);
    ctx.lineTo(-8, 34);
    ctx.moveTo(2, 4);
    ctx.lineTo(-32, 18);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.moveTo(-16, -30);
    ctx.lineTo(18, -28);
    ctx.lineTo(4, -12);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    /* caption */
    ctx.fillStyle = '#ffffff';
    rr(744, 556, 208, 74, 8);
    ctx.fill();
    ctx.strokeStyle = '#d8e2ec';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#16457e';
    ctx.font = 'bold 10.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Pure copper(II) sulfate', 848, 578);
    ctx.fillText('pentahydrate crystals', 848, 598);
    ctx.fillText('(CuSO\u2084\u00b75H\u2082O)', 848, 618);
    ctx.textAlign = 'left';
    header(322, 360, 5, 'Pure CuSO\u2084\u00b75H\u2082O crystals', 210);
    ctx.restore();

    ctx.fillStyle = '#8a919a';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.4 Melting Point (Naphthalene) — infographic poster (reference image) ── */
  drawM7_4: function(ctx, cw, ch, state) {
    var simRun = !!(state.simulation && !state.simulation.done);
    var t = Date.now();

    function rr(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function head(x, y, ang, s, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - s * Math.cos(ang - 0.45), y - s * Math.sin(ang - 0.45));
      ctx.lineTo(x - s * Math.cos(ang + 0.45), y - s * Math.sin(ang + 0.45));
      ctx.closePath();
      ctx.fill();
    }

    function arrow(x1, y1, cx, cy, x2, y2) {
      ctx.strokeStyle = '#2a63ad';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      ctx.stroke();
      head(x2, y2, Math.atan2(y2 - cy, x2 - cx), 9, '#2a63ad');
      ctx.lineCap = 'butt';
    }

    function callout(x, y, w, lines) {
      var h = lines.length * 17 + 16;
      ctx.fillStyle = '#dcedfd';
      rr(x, y, w, h, 10);
      ctx.fill();
      ctx.strokeStyle = '#2a63ad';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.fillStyle = '#16345e';
      ctx.font = 'bold 11.5px sans-serif';
      ctx.textAlign = 'center';
      for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + w / 2, y + 22 + i * 17);
      }
      ctx.textAlign = 'left';
      return h;
    }

    ctx.save();

    /* background */
    var wallg = ctx.createLinearGradient(0, 0, 0, 431);
    wallg.addColorStop(0, '#f6f8fa');
    wallg.addColorStop(1, '#e7ebef');
    ctx.fillStyle = wallg;
    ctx.fillRect(0, 0, cw, 431);
    var benchg = ctx.createLinearGradient(0, 431, 0, 640);
    benchg.addColorStop(0, '#787e86');
    benchg.addColorStop(1, '#545a61');
    ctx.fillStyle = benchg;
    ctx.fillRect(0, 431, cw, 209);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(0, 431, cw, 3);

    /* title banner */
    ctx.fillStyle = '#bfdcfb';
    rr(26, 16, 578, 88, 18);
    ctx.fill();
    ctx.fillStyle = '#16345e';
    ctx.font = 'bold 25px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Determining the Melting Point', 315, 54);
    ctx.fillText('of Naphthalene', 315, 86);
    ctx.textAlign = 'left';

    /* retort stand */
    var footg = ctx.createLinearGradient(0, 612, 0, 632);
    footg.addColorStop(0, '#eef1f4');
    footg.addColorStop(0.45, '#aab2ba');
    footg.addColorStop(1, '#6f777f');
    ctx.fillStyle = footg;
    rr(40, 612, 170, 20, 8);
    ctx.fill();
    ctx.strokeStyle = '#5a6169';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    var rodG = ctx.createLinearGradient(126, 0, 137, 0);
    rodG.addColorStop(0, '#f2f4f6');
    rodG.addColorStop(0.4, '#b0b8c0');
    rodG.addColorStop(1, '#6e767e');
    ctx.fillStyle = rodG;
    ctx.fillRect(126, 112, 11, 504);
    ctx.strokeStyle = 'rgba(70,78,86,0.7)';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(126, 112, 11, 504);
    /* blue clamp knob */
    ctx.fillStyle = '#1e2024';
    rr(100, 220, 30, 22, 4);
    ctx.fill();
    var knock = ctx.createLinearGradient(64, 210, 64, 250);
    knock.addColorStop(0, '#3f7bee');
    knock.addColorStop(1, '#16389c');
    ctx.fillStyle = knock;
    rr(64, 210, 46, 40, 10);
    ctx.fill();
    ctx.strokeStyle = '#10286e';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.fillStyle = '#dfe6ee';
    ctx.beginPath();
    ctx.arc(87, 230, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#8f98a2';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    /* clamp arm + jaw */
    var clampG = ctx.createLinearGradient(0, 204, 0, 238);
    clampG.addColorStop(0, '#2e3237');
    clampG.addColorStop(1, '#1a1d21');
    ctx.fillStyle = clampG;
    rr(140, 204, 166, 34, 6);
    ctx.fill();
    ctx.fillStyle = '#34383e';
    rr(168, 196, 16, 14, 3);
    ctx.fill();
    rr(190, 196, 16, 14, 3);
    ctx.fill();
    ctx.fillStyle = '#14161a';
    rr(262, 192, 48, 58, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(266, 196, 40, 4);

    /* capillary tube */
    var tubeG = ctx.createLinearGradient(278, 0, 296, 0);
    tubeG.addColorStop(0, 'rgba(245,250,255,0.5)');
    tubeG.addColorStop(0.5, 'rgba(215,230,245,0.32)');
    tubeG.addColorStop(1, 'rgba(205,222,240,0.45)');
    ctx.fillStyle = tubeG;
    rr(278, 126, 18, 266, 9);
    ctx.fill();
    ctx.strokeStyle = 'rgba(130,160,190,0.9)';
    ctx.lineWidth = 1.6;
    rr(278, 126, 18, 266, 9);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(130,160,190,0.9)';
    ctx.beginPath();
    ctx.ellipse(287, 127, 8, 2.6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(224,123,42,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(289, 172);
    ctx.lineTo(289, 280);
    ctx.stroke();
    ctx.lineWidth = 1.2;
    for (var tk = 0; tk < 11; tk++) {
      var tky = 172 + tk * 10.8;
      ctx.beginPath();
      ctx.moveTo(290, tky);
      ctx.lineTo(tk % 3 === 0 ? 296 : 293, tky);
      ctx.stroke();
    }
    ctx.fillStyle = '#f6f8fa';
    ctx.strokeStyle = '#dfe4ea';
    ctx.lineWidth = 1;
    var crt = [[283, 358], [291, 364], [285, 372], [292, 378], [286, 385]];
    for (var cr = 0; cr < crt.length; cr++) {
      ctx.beginPath();
      ctx.arc(crt[cr][0], crt[cr][1], 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    /* oil bath beaker */
    var bodyG = ctx.createLinearGradient(190, 0, 372, 0);
    bodyG.addColorStop(0, 'rgba(255,255,255,0.32)');
    bodyG.addColorStop(0.5, 'rgba(235,245,255,0.14)');
    bodyG.addColorStop(1, 'rgba(255,255,255,0.28)');
    ctx.fillStyle = bodyG;
    ctx.beginPath();
    ctx.moveTo(190, 258);
    ctx.lineTo(190, 428);
    ctx.quadraticCurveTo(190, 440, 202, 440);
    ctx.lineTo(360, 440);
    ctx.quadraticCurveTo(372, 440, 372, 428);
    ctx.lineTo(372, 258);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(125,155,185,0.95)';
    ctx.lineWidth = 2.4;
    ctx.stroke();
    /* oil */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(190, 258);
    ctx.lineTo(190, 428);
    ctx.quadraticCurveTo(190, 440, 202, 440);
    ctx.lineTo(360, 440);
    ctx.quadraticCurveTo(372, 440, 372, 428);
    ctx.lineTo(372, 258);
    ctx.closePath();
    ctx.clip();
    var oilG = ctx.createLinearGradient(0, 274, 0, 436);
    oilG.addColorStop(0, 'rgba(235,226,176,0.88)');
    oilG.addColorStop(1, 'rgba(212,197,130,0.9)');
    ctx.fillStyle = oilG;
    ctx.fillRect(186, 274, 190, 168);
    ctx.fillStyle = 'rgba(246,241,214,0.95)';
    ctx.fillRect(192, 272, 178, 5);
    if (simRun) {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 1;
      for (var bub = 0; bub < 5; bub++) {
        var bubx = 212 + bub * 32 + Math.sin(t / 200 + bub) * 4;
        var baby = 428 - (((t / 10) + bub * 26) % 140);
        ctx.beginPath();
        ctx.arc(bubx, baby, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
    ctx.restore();
    /* rim + spout */
    ctx.fillStyle = 'rgba(228,240,252,0.55)';
    rr(186, 250, 190, 10, 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(125,155,185,0.95)';
    ctx.lineWidth = 1.6;
    rr(186, 250, 190, 10, 4);
    ctx.stroke();
    ctx.fillStyle = 'rgba(215,232,248,0.55)';
    ctx.beginPath();
    ctx.moveTo(192, 252);
    ctx.lineTo(178, 242);
    ctx.lineTo(204, 250);
    ctx.closePath();
    ctx.fill();
    /* oil bath label */
    ctx.fillStyle = '#fdfdfd';
    rr(234, 356, 76, 40, 6);
    ctx.fill();
    ctx.strokeStyle = '#c9ced4';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#16345e';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Oil bath', 272, 381);
    ctx.textAlign = 'left';

    /* wire gauze */
    ctx.fillStyle = '#2e3238';
    rr(156, 430, 258, 12, 3);
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,128,138,0.5)';
    ctx.lineWidth = 0.8;
    for (var gx = 162; gx < 412; gx += 9) {
      ctx.beginPath();
      ctx.moveTo(gx, 431);
      ctx.lineTo(gx, 441);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(157, 434);
    ctx.lineTo(413, 434);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(157, 438);
    ctx.lineTo(413, 438);
    ctx.stroke();
    ctx.strokeStyle = '#494f56';
    ctx.lineWidth = 1.2;
    rr(156, 430, 258, 12, 3);
    ctx.stroke();

    /* tripod legs */
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f1013';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(300, 440);
    ctx.lineTo(330, 566);
    ctx.stroke();
    ctx.strokeStyle = '#16171a';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(172, 440);
    ctx.lineTo(146, 624);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(398, 440);
    ctx.lineTo(426, 624);
    ctx.stroke();
    ctx.lineCap = 'butt';

    /* bunsen burner */
    ctx.strokeStyle = '#22252a';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(302, 604);
    ctx.quadraticCurveTo(344, 616, 374, 606);
    ctx.stroke();
    ctx.lineCap = 'butt';
    var bunsG = ctx.createRadialGradient(256, 600, 4, 270, 610, 46);
    bunsG.addColorStop(0, '#d8dde2');
    bunsG.addColorStop(0.6, '#9aa1a8');
    bunsG.addColorStop(1, '#5e656c');
    ctx.fillStyle = bunsG;
    ctx.beginPath();
    ctx.ellipse(270, 610, 42, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4c5259';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    var colG = ctx.createLinearGradient(250, 0, 290, 0);
    colG.addColorStop(0, '#767d84');
    colG.addColorStop(0.3, '#e8ecef');
    colG.addColorStop(0.65, '#a2a9b0');
    colG.addColorStop(1, '#61686f');
    ctx.fillStyle = colG;
    rr(250, 548, 40, 58, 2);
    ctx.fill();
    ctx.strokeStyle = '#4c5259';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#7b828a';
    rr(244, 534, 52, 16, 3);
    ctx.fill();
    ctx.strokeStyle = '#565c63';
    ctx.stroke();
    ctx.fillStyle = '#3a3f45';
    var holes = [252, 262, 272, 282];
    for (var hl = 0; hl < holes.length; hl++) {
      ctx.beginPath();
      ctx.arc(holes[hl], 542, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = colG;
    rr(256, 504, 28, 30, 2);
    ctx.fill();
    ctx.strokeStyle = '#4c5259';
    ctx.stroke();
    ctx.fillStyle = '#9aa1a8';
    ctx.beginPath();
    ctx.ellipse(270, 504, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    /* blue flame */
    var fs = simRun ? 1 + Math.sin(t / 70) * 0.07 : 1;
    var sway = simRun ? Math.sin(t / 95) * 2 : 0;
    ctx.save();
    ctx.translate(270, 506);
    ctx.scale(1, fs);
    var flg = ctx.createLinearGradient(0, -64, 0, 0);
    flg.addColorStop(0, '#4c96ff');
    flg.addColorStop(0.6, '#2a6ff0');
    flg.addColorStop(1, '#1a55c8');
    ctx.fillStyle = flg;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.quadraticCurveTo(-11, -30 + sway * 0.6, sway, -64);
    ctx.quadraticCurveTo(11, -30 + sway * 0.6, 12, 0);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(190,228,255,0.9)';
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.quadraticCurveTo(-4, -20, sway * 0.7, -38);
    ctx.quadraticCurveTo(4, -20, 5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.ellipse(0, -2, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    /* watch glass with naphthalene */
    ctx.fillStyle = 'rgba(225,235,245,0.22)';
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(66, 566, 130, 44, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(66, 566, 108, 35, 0, 0, Math.PI * 2);
    ctx.stroke();
    var wcr = ['#f4f7fa', '#ffffff', '#e3e9ef'];
    for (var wc = 0; wc < 12; wc++) {
      var wcx = 66 + Math.cos(wc * 1.9) * (20 + (wc % 3) * 26);
      var wcy = 562 + Math.sin(wc * 2.28) * (6 + (wc % 2) * 10);
      var wcs = 7 + (wc % 4) * 3;
      ctx.save();
      ctx.translate(wcx, wcy);
      ctx.rotate(wc * 0.9);
      ctx.fillStyle = wcr[wc % 3];
      ctx.beginPath();
      ctx.moveTo(-wcs, -wcs * 0.5);
      ctx.lineTo(wcs * 0.3, -wcs);
      ctx.lineTo(wcs, wcs * 0.4);
      ctx.lineTo(-wcs * 0.4, wcs);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(150,162,174,0.7)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    /* sample label card */
    ctx.fillStyle = '#ffffff';
    rr(76, 586, 164, 48, 6);
    ctx.fill();
    ctx.strokeStyle = '#b9c0c8';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fillStyle = '#16345e';
    ctx.textAlign = 'center';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Naphthalene', 158, 608);
    ctx.font = '12px sans-serif';
    ctx.fillText('(sample)', 158, 626);
    ctx.textAlign = 'left';

    /* callouts */
    callout(390, 126, 196, ['Capillary tube', '(with naphthalene)']);
    arrow(388, 150, 344, 140, 306, 146);
    callout(436, 288, 170, ['Oil bath', '(gradual heating)']);
    arrow(434, 314, 398, 306, 376, 300);
    callout(836, 84, 120, ['Naphthalene', '(white crystals)']);
    arrow(834, 112, 770, 300, 802, 488);
    callout(830, 196, 126, ['Capillary tube', '(close-up view)']);
    arrow(828, 222, 846, 330, 786, 500);

    /* circular close-up inset (moved down to fill area freed by observation/graph) */
    ctx.save();
    ctx.translate(52, 314);
    var insg = ctx.createRadialGradient(720, 130, 14, 720, 138, 110);
    insg.addColorStop(0, '#161d2b');
    insg.addColorStop(1, '#06080d');
    ctx.fillStyle = insg;
    ctx.beginPath();
    ctx.arc(720, 138, 108, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    rr(700, 44, 48, 170, 20);
    ctx.clip();
    ctx.fillStyle = '#0a0d13';
    ctx.fillRect(700, 44, 48, 170);
    var insTube = ctx.createLinearGradient(700, 0, 748, 0);
    insTube.addColorStop(0, 'rgba(220,228,238,0.30)');
    insTube.addColorStop(0.5, 'rgba(150,165,185,0.16)');
    insTube.addColorStop(1, 'rgba(210,220,235,0.28)');
    ctx.fillStyle = insTube;
    ctx.fillRect(700, 44, 48, 170);
    var icr = [[712, 172, 7], [730, 168, 6], [722, 186, 8], [736, 190, 6], [710, 194, 6], [724, 202, 7]];
    for (var ic = 0; ic < icr.length; ic++) {
      ctx.fillStyle = '#f2f5f8';
      ctx.strokeStyle = '#d6dde4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(icr[ic][0], icr[ic][1], icr[ic][2], 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    rr(708, 60, 5, 80, 2.5);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(200,210,225,0.75)';
    ctx.lineWidth = 2.5;
    rr(700, 44, 48, 170, 20);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#b9c0c8';
    ctx.font = '9px sans-serif';
    ctx.fillText('(simulated)', 10, ch - 10);
    ctx.restore();
  },

  /* ── M7.5 Boiling Point (Ethyl Alcohol) — distillation setup ── */
  drawM7_5: function(ctx, cw, ch, state) {
    var sim = SIMULATION_CONFIG['M7_5'];
    var done = state.m7ActionDone && state.simulation && state.m7ObservationDone;
    var heating = state.m7ActionDone && state.simulation && !state.simulation.done;
    var temp = done ? sim.expectedBoilingPoint : (heating ? 60 : 25);

    /* ---- Backdrop: light wall + dark bench ---- */
    ctx.save();
    var wall = ctx.createLinearGradient(0, 0, 0, 311);
    wall.addColorStop(0, '#e8e6e1');
    wall.addColorStop(1, '#cdcbc5');
    ctx.fillStyle = wall;
    ctx.fillRect(0, 0, cw, 311);
    var bench = ctx.createLinearGradient(0, 311, 0, ch);
    bench.addColorStop(0, '#282c32');
    bench.addColorStop(1, '#15171b');
    ctx.fillStyle = bench;
    ctx.fillRect(0, 311, cw, ch - 311);
    ctx.fillStyle = '#5a626c';
    ctx.fillRect(0, 311, cw, 3);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, 316, cw, 8);
    ctx.restore();

    /* ---- Wall fixtures: gas valve (left) + green tap (right) ---- */
    ctx.save();
    ctx.fillStyle = '#f4f5f6';
    ctx.strokeStyle = '#c8ccd2';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(0, 274, 54, 36, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#8d949c';
    ctx.fillRect(10, 282, 22, 20);
    ctx.fillStyle = '#cc3333';
    ctx.beginPath();
    ctx.arc(40, 292, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7d858e';
    ctx.fillRect(934, 244, 12, 67);
    ctx.fillStyle = '#2e9e4b';
    ctx.beginPath();
    ctx.roundRect(902, 240, 36, 12, 4);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(940, 250, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#237a3a';
    ctx.beginPath();
    ctx.arc(940, 250, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    /* ---- Sink inset in bench (right) ---- */
    ctx.save();
    ctx.fillStyle = '#101317';
    ctx.strokeStyle = '#4d565f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(861, 314, 101, 110, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#0a0c0f';
    ctx.beginPath();
    ctx.roundRect(871, 324, 81, 90, 4);
    ctx.fill();
    ctx.restore();

    /* ---- Left retort stand ---- */
    ctx.save();
    var standGrad = ctx.createLinearGradient(35, 0, 49, 0);
    standGrad.addColorStop(0, '#7a828c');
    standGrad.addColorStop(0.4, '#c9ced4');
    standGrad.addColorStop(1, '#6d747d');
    ctx.fillStyle = standGrad;
    ctx.fillRect(35, 24, 14, 554);
    ctx.fillStyle = '#4a5058';
    ctx.fillRect(31, 18, 22, 8);
    ctx.fillStyle = '#2b313a';
    ctx.beginPath();
    ctx.roundRect(18, 576, 312, 24, 5);
    ctx.fill();
    ctx.fillStyle = '#3a414b';
    ctx.beginPath();
    ctx.roundRect(18, 576, 312, 8, 5);
    ctx.fill();
    var armGrad = ctx.createLinearGradient(0, 145, 0, 156);
    armGrad.addColorStop(0, '#aeb4bb');
    armGrad.addColorStop(1, '#5d646d');
    ctx.fillStyle = armGrad;
    ctx.fillRect(42, 145, 167, 11);
    ctx.restore();

    /* ---- Red gas hose to Bunsen ---- */
    ctx.save();
    ctx.strokeStyle = '#c1481f';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(206, 545);
    ctx.bezierCurveTo(150, 560, 70, 554, 0, 528);
    ctx.stroke();
    ctx.strokeStyle = '#8f3315';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(208, 544);
    ctx.lineTo(196, 548);
    ctx.stroke();
    ctx.restore();

    /* ---- Tripod stand + wire gauze ---- */
    ctx.save();
    ctx.strokeStyle = '#0c0e11';
    ctx.lineCap = 'round';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(118, 505);
    ctx.lineTo(342, 505);
    ctx.stroke();
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(155, 344);
    ctx.lineTo(93, 574);
    ctx.moveTo(325, 344);
    ctx.lineTo(359, 574);
    ctx.stroke();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0a0b0d';
    ctx.beginPath();
    ctx.moveTo(242, 346);
    ctx.lineTo(252, 542);
    ctx.stroke();
    ctx.fillStyle = '#8d9298';
    ctx.fillRect(151, 331, 178, 11);
    ctx.fillStyle = '#5f656c';
    ctx.fillRect(151, 342, 178, 6);
    ctx.save();
    ctx.beginPath();
    ctx.rect(151, 331, 178, 11);
    ctx.clip();
    ctx.strokeStyle = 'rgba(60,66,72,0.7)';
    ctx.lineWidth = 1;
    for (var gx = 151; gx <= 329; gx += 12) {
      ctx.beginPath();
      ctx.moveTo(gx, 331);
      ctx.lineTo(gx, 342);
      ctx.stroke();
    }
    for (var gy = 333; gy <= 342; gy += 4) {
      ctx.beginPath();
      ctx.moveTo(151, gy);
      ctx.lineTo(329, gy);
      ctx.stroke();
    }
    ctx.restore();
    ctx.strokeStyle = '#444a51';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(151, 331, 178, 17);
    ctx.restore();

    /* ---- Bunsen burner (low blue flame) ---- */
    ctx.save();
    var bGrad = ctx.createLinearGradient(173, 0, 261, 0);
    bGrad.addColorStop(0, '#5a5f66');
    bGrad.addColorStop(0.35, '#c2c7cd');
    bGrad.addColorStop(0.6, '#e2e5e9');
    bGrad.addColorStop(1, '#5a5f66');
    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.ellipse(217, 570, 44, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3c4147';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(184, 566);
    ctx.lineTo(205, 528);
    ctx.lineTo(229, 528);
    ctx.lineTo(250, 566);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(206, 500, 22, 30);
    ctx.strokeRect(206, 500, 22, 30);
    ctx.fillStyle = '#71787f';
    ctx.fillRect(199, 490, 36, 12);
    ctx.strokeStyle = '#3f444a';
    ctx.strokeRect(199, 490, 36, 12);
    ctx.fillStyle = '#26292d';
    ctx.beginPath();
    ctx.arc(207, 496, 3, 0, Math.PI * 2);
    ctx.arc(227, 496, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = bGrad;
    ctx.fillRect(208, 414, 18, 76);
    ctx.strokeStyle = '#44494f';
    ctx.lineWidth = 1;
    ctx.strokeRect(208, 414, 18, 76);
    ctx.fillStyle = '#6b7178';
    ctx.fillRect(205, 408, 24, 8);
    ctx.strokeRect(205, 408, 24, 8);
    if (heating || done) {
      var fGrad = ctx.createRadialGradient(217, 384, 2, 217, 384, 34);
      fGrad.addColorStop(0, '#7fb7ff');
      fGrad.addColorStop(0.55, '#3f86f0');
      fGrad.addColorStop(1, 'rgba(60,120,240,0)');
      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.moveTo(200, 410);
      ctx.quadraticCurveTo(204, 386, 217, 356);
      ctx.quadraticCurveTo(230, 386, 234, 410);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.moveTo(210, 410);
      ctx.quadraticCurveTo(212, 396, 217, 384);
      ctx.quadraticCurveTo(222, 396, 224, 410);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    /* ---- Boiling flask ---- */
    ctx.save();
    ctx.fillStyle = 'rgba(205,224,242,0.22)';
    ctx.strokeStyle = 'rgba(90,130,170,0.6)';
    ctx.lineWidth = 2;
    ctx.fillRect(210, 197, 50, 52);
    ctx.strokeRect(210, 197, 50, 52);
    ctx.fillStyle = 'rgba(215,232,248,0.3)';
    ctx.fillRect(205, 190, 60, 11);
    ctx.strokeRect(205, 190, 60, 11);
    ctx.strokeStyle = 'rgba(140,175,205,0.6)';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(256, 216);
    ctx.lineTo(334, 201);
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(90,130,170,0.55)';
    ctx.beginPath();
    ctx.moveTo(256, 210);
    ctx.lineTo(334, 195);
    ctx.moveTo(256, 222);
    ctx.lineTo(334, 207);
    ctx.stroke();
    var fGrad2 = ctx.createRadialGradient(215, 262, 6, 235, 278, 70);
    fGrad2.addColorStop(0, 'rgba(245,250,255,0.06)');
    fGrad2.addColorStop(0.6, 'rgba(185,212,240,0.18)');
    fGrad2.addColorStop(1, 'rgba(140,180,220,0.42)');
    ctx.fillStyle = fGrad2;
    ctx.strokeStyle = 'rgba(85,125,165,0.7)';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(235, 278, 66, 53, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(235, 278, 64, 51, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = 'rgba(233,239,245,0.45)';
    ctx.fillRect(169, 262, 132, 71);
    ctx.fillStyle = 'rgba(195,212,228,0.75)';
    ctx.fillRect(169, 261, 132, 2);
    ctx.fillStyle = 'rgba(120,125,130,0.9)';
    var chips = [[214, 324], [231, 327], [248, 325], [263, 321]];
    for (var ci = 0; ci < chips.length; ci++) {
      ctx.beginPath();
      ctx.arc(chips[ci][0], chips[ci][1], 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    if (heating) {
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      for (var b = 0; b < 6; b++) {
        var bx = 200 + b * 14;
        var by = 326 - ((Date.now() / 14 + b * 13) % 58);
        ctx.beginPath();
        ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    ctx.restore();

    /* ---- Thermometer ---- */
    ctx.save();
    var tGrad = ctx.createLinearGradient(224, 0, 238, 0);
    tGrad.addColorStop(0, 'rgba(175,198,220,0.5)');
    tGrad.addColorStop(0.35, 'rgba(242,248,255,0.28)');
    tGrad.addColorStop(1, 'rgba(175,198,220,0.45)');
    ctx.fillStyle = tGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 1.3;
    ctx.fillRect(224, 17, 14, 256);
    ctx.strokeRect(224, 17, 14, 256);
    ctx.fillStyle = '#a8adb3';
    ctx.fillRect(226, 8, 10, 12);
    ctx.strokeStyle = '#7a8087';
    ctx.lineWidth = 1;
    ctx.strokeRect(226, 8, 10, 12);
    ctx.fillStyle = '#55606c';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'left';
    for (var v = 0; v <= 100; v += 10) {
      var vy = 270 - (v / 100) * 245;
      ctx.fillRect(238, vy, v % 20 === 0 ? 8 : 5, 1);
      if (v % 20 === 0 && v > 0) ctx.fillText(String(v), 248, vy + 3);
    }
    var merH = (temp / 100) * 245;
    ctx.fillStyle = '#d43a3a';
    ctx.fillRect(229, 270 - merH, 5, merH - 6);
    ctx.beginPath();
    ctx.arc(231.5, 268, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#a02828';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    /* ---- Thermometer clamp ---- */
    ctx.save();
    ctx.fillStyle = '#17181a';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(207, 133, 66, 34, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#3d4147';
    ctx.beginPath();
    ctx.arc(218, 150, 6.5, 0, Math.PI * 2);
    ctx.arc(262, 150, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#22252a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(213, 150);
    ctx.lineTo(223, 150);
    ctx.moveTo(257, 150);
    ctx.lineTo(267, 150);
    ctx.stroke();
    ctx.restore();

    /* ---- Second retort stand (behind condenser) ---- */
    ctx.save();
    var rodGrad = ctx.createLinearGradient(584, 0, 599, 0);
    rodGrad.addColorStop(0, '#767e88');
    rodGrad.addColorStop(0.4, '#c6cbd1');
    rodGrad.addColorStop(1, '#697078');
    ctx.fillStyle = rodGrad;
    ctx.fillRect(584, 125, 15, 325);
    ctx.fillStyle = '#4a5058';
    ctx.fillRect(580, 118, 23, 8);
    ctx.fillStyle = '#2b313a';
    ctx.beginPath();
    ctx.roundRect(529, 450, 140, 31, 5);
    ctx.fill();
    ctx.fillStyle = '#3a414b';
    ctx.beginPath();
    ctx.roundRect(529, 450, 140, 10, 5);
    ctx.fill();
    ctx.restore();

    /* ---- Liebig condenser (angled) ---- */
    var ax = 348, ay = 206;
    var ang = Math.atan2(150, 441);
    var ux = Math.cos(ang), uy = Math.sin(ang);
    ctx.save();
    ctx.translate(ax, ay);
    ctx.rotate(ang);
    var jGrad = ctx.createLinearGradient(0, -17, 0, 17);
    jGrad.addColorStop(0, 'rgba(140,180,222,0.45)');
    jGrad.addColorStop(0.35, 'rgba(228,242,252,0.14)');
    jGrad.addColorStop(0.65, 'rgba(228,242,252,0.12)');
    jGrad.addColorStop(1, 'rgba(140,180,222,0.42)');
    ctx.fillStyle = jGrad;
    ctx.strokeStyle = 'rgba(80,120,160,0.62)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-10, -17, 480, 34, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(226,240,252,0.26)';
    ctx.strokeStyle = 'rgba(90,130,170,0.5)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(-6, -6.5, 486, 13, 4);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(70,110,150,0.6)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-10, -17);
    ctx.lineTo(-10, 17);
    ctx.moveTo(470, -17);
    ctx.lineTo(470, 17);
    ctx.stroke();
    ctx.restore();

    /* ---- Hose nipples + frosted adapter sleeve ---- */
    ctx.save();
    ctx.strokeStyle = 'rgba(150,185,215,0.75)';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(391, 206);
    ctx.lineTo(401, 194);
    ctx.moveTo(745, 359);
    ctx.lineTo(741, 373);
    ctx.stroke();
    ctx.save();
    ctx.translate(ax, ay);
    ctx.rotate(ang);
    ctx.fillStyle = 'rgba(246,248,251,0.92)';
    ctx.strokeStyle = '#9aa2ab';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.roundRect(-16, -13.5, 30, 27, 3);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(150,158,168,0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-8, -13);
    ctx.lineTo(-8, 13);
    ctx.moveTo(0, -13);
    ctx.lineTo(0, 13);
    ctx.stroke();
    ctx.restore();
    ctx.restore();

    /* ---- Condenser clamp on second stand ---- */
    ctx.save();
    ctx.fillStyle = '#17181a';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(565, 271, 58, 40, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#3d4147';
    ctx.beginPath();
    ctx.arc(574, 291, 6.5, 0, Math.PI * 2);
    ctx.arc(614, 291, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#22252a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(569, 291);
    ctx.lineTo(579, 291);
    ctx.moveTo(609, 291);
    ctx.lineTo(619, 291);
    ctx.stroke();
    ctx.restore();

    /* ---- Water-in hose (blue loop to tap) ---- */
    ctx.save();
    ctx.strokeStyle = '#3f7fd0';
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(401, 194);
    ctx.bezierCurveTo(434, 154, 446, 126, 456, 114);
    ctx.bezierCurveTo(468, 102, 468, 74, 464, 34);
    ctx.stroke();
    ctx.strokeStyle = '#79b8ea';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(401, 194);
    ctx.bezierCurveTo(434, 154, 446, 126, 456, 114);
    ctx.bezierCurveTo(468, 102, 468, 74, 464, 34);
    ctx.stroke();
    ctx.strokeStyle = '#2b5fa8';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(396, 202);
    ctx.lineTo(404, 192);
    ctx.stroke();
    ctx.restore();

    /* ---- Vapour moving through condenser ---- */
    if (heating || done) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      for (var v2 = 0; v2 < 4; v2++) {
        var t2 = (Date.now() / 26 + v2 * 116) % 462;
        var vx = ax + ux * t2 + uy * 5;
        var vyy = ay + uy * t2 - ux * 5;
        ctx.beginPath();
        ctx.arc(vx, vyy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* ---- Water-out hose (to sink) ---- */
    ctx.save();
    ctx.strokeStyle = '#3f7fd0';
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(741, 373);
    ctx.bezierCurveTo(752, 442, 772, 512, 812, 552);
    ctx.bezierCurveTo(852, 590, 902, 600, 952, 604);
    ctx.stroke();
    ctx.strokeStyle = '#79b8ea';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(741, 373);
    ctx.bezierCurveTo(752, 442, 772, 512, 812, 552);
    ctx.bezierCurveTo(852, 590, 902, 600, 952, 604);
    ctx.stroke();
    ctx.strokeStyle = '#2b5fa8';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(737, 366);
    ctx.lineTo(745, 378);
    ctx.stroke();
    ctx.restore();

    /* ---- Receiving flask on black slab ---- */
    ctx.save();
    ctx.fillStyle = '#101318';
    ctx.beginPath();
    ctx.roundRect(707, 476, 224, 32, 5);
    ctx.fill();
    ctx.fillStyle = '#1d222a';
    ctx.beginPath();
    ctx.roundRect(707, 476, 224, 10, 5);
    ctx.fill();
    ctx.fillStyle = 'rgba(205,224,242,0.2)';
    ctx.strokeStyle = 'rgba(90,130,170,0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(797, 368);
    ctx.lineTo(797, 400);
    ctx.lineTo(747, 458);
    ctx.lineTo(747, 470);
    ctx.quadraticCurveTo(747, 476, 754, 476);
    ctx.lineTo(860, 476);
    ctx.quadraticCurveTo(867, 476, 867, 470);
    ctx.lineTo(867, 458);
    ctx.lineTo(815, 400);
    ctx.lineTo(815, 368);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(215,232,248,0.3)';
    ctx.beginPath();
    ctx.roundRect(792, 357, 28, 11, 3);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(797, 368);
    ctx.lineTo(797, 400);
    ctx.lineTo(747, 458);
    ctx.lineTo(747, 470);
    ctx.quadraticCurveTo(747, 476, 754, 476);
    ctx.lineTo(860, 476);
    ctx.quadraticCurveTo(867, 476, 867, 470);
    ctx.lineTo(867, 458);
    ctx.lineTo(815, 400);
    ctx.lineTo(815, 368);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = 'rgba(205,224,245,0.5)';
    ctx.fillRect(744, 446, 126, 32);
    ctx.fillStyle = 'rgba(150,195,235,0.55)';
    ctx.beginPath();
    ctx.ellipse(806, 470, 30, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(150,185,215,0.75)';
    ctx.lineWidth = 11;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(789, 356);
    ctx.quadraticCurveTo(803, 372, 806, 396);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(90,130,170,0.5)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(789, 356);
    ctx.quadraticCurveTo(803, 372, 806, 396);
    ctx.stroke();
    ctx.restore();

    /* ---- Distillate drops ---- */
    if (heating || done) {
      ctx.save();
      var dph = (Date.now() / 11) % 44;
      ctx.fillStyle = 'rgba(170,205,240,0.85)';
      ctx.beginPath();
      ctx.ellipse(806, 400 + dph, 3, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    /* ---- Digital temperature readout ---- */
    ctx.save();
    var dx = cw - 110, dy = 90;
    ctx.fillStyle = '#26282b';
    ctx.strokeStyle = '#45484c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(dx - 54, dy - 25, 108, 50, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = done ? '#ff5555' : '#4ade4a';
    ctx.font = 'bold 21px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(temp.toFixed(1) + '\u00b0C', dx, dy + 8);
    ctx.restore();

    /* ---- Result banner (when complete) ---- */
    if (done) {
      ctx.save();
      ctx.fillStyle = '#1a3a6a';
      ctx.beginPath();
      ctx.roundRect(395, 32, 170, 42, 6);
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ff5555';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Boiling Point', 480, 50);
      ctx.fillStyle = '#ffffff';
      ctx.font = '13px sans-serif';
      ctx.fillText('78.37\u00b0C', 480, 68);
      ctx.textAlign = 'left';
      ctx.restore();
    }

    /* ---- Photo-style labels ---- */
    ctx.save();
    function sticker(x, y, w, h, lines) {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#14171a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#14171a';
      ctx.textAlign = 'center';
      if (lines.length === 1) {
        ctx.font = '12px sans-serif';
        ctx.fillText(lines[0], x + w / 2, y + h / 2 + 4);
      } else {
        ctx.font = '11.5px sans-serif';
        ctx.fillText(lines[0], x + w / 2, y + 18);
        ctx.fillText(lines[1], x + w / 2, y + 35);
      }
      ctx.textAlign = 'left';
    }
    function arrow(x1, y1, cx2, cy2, x2, y2) {
      ctx.strokeStyle = '#14171a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx2, cy2, x2, y2);
      ctx.stroke();
      var a = Math.atan2(y2 - cy2, x2 - cx2);
      ctx.fillStyle = '#14171a';
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 9 * Math.cos(a - 0.4), y2 - 9 * Math.sin(a - 0.4));
      ctx.lineTo(x2 - 9 * Math.cos(a + 0.4), y2 - 9 * Math.sin(a + 0.4));
      ctx.closePath();
      ctx.fill();
    }
    sticker(256, 34, 116, 26, ['Thermometer']);
    arrow(255, 50, 247, 57, 239, 63);
    sticker(287, 116, 148, 26, ['Thermometer clamp']);
    arrow(286, 133, 279, 142, 272, 150);
    sticker(470, 78, 136, 46, ['Water in', '(from tap)']);
    arrow(469, 112, 456, 114, 446, 111);
    sticker(6, 225, 158, 46, ['Boiling flask', '(with ethyl alcohol)']);
    arrow(165, 249, 171, 256, 176, 262);
    sticker(30, 330, 100, 26, ['Wire gauze']);
    arrow(131, 344, 142, 342, 152, 339);
    sticker(26, 424, 110, 26, ['Tripod stand']);
    arrow(137, 442, 131, 448, 125, 454);
    sticker(283, 442, 160, 46, ['Bunsen burner', '(low flame)']);
    arrow(282, 468, 257, 474, 234, 478);
    sticker(662, 189, 140, 26, ['Liebig condenser']);
    arrow(687, 215, 676, 258, 668, 300);
    sticker(742, 246, 130, 46, ['Water out', '(to sink)']);
    arrow(748, 293, 745, 325, 742, 356);
    sticker(712, 540, 236, 46, ['Receiving flask', '(for distilled ethyl alcohol)']);
    arrow(800, 540, 799, 510, 798, 478);
    ctx.restore();

    /* ---- Footer ---- */
    ctx.save();
    ctx.fillStyle = '#888888';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'left';
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