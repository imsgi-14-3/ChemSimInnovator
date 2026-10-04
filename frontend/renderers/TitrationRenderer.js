var TitrationRenderer = {
  renderStage: function(stage, exp, state, appState) {
    var html = '';
    switch(stage) {
      case 'prepare': html = this.renderPrepare(exp, state); break;
      case 'fillBurette': html = this.renderFillBurette(exp, state); break;
      case 'measureSample': html = this.renderMeasureSample(exp, state); break;
      case 'titrate': html = this.renderTitrate(exp, state); break;
      case 'endpoint': html = this.renderEndpoint(exp, state); break;
      case 'record': html = this.renderRecord(exp, state); break;
      case 'calculate': html = this.renderCalculate(exp, state); break;
      case 'interpret': html = this.renderInterpret(exp, state); break;
      case 'conclude': html = this.renderConclude(exp, state); break;
      case 'complete': html = this.renderComplete(exp, state); break;
      default: html = '<p>Stage: ' + stage + '</p>';
    }
    html += LaboratoryWorkspace.renderCanvas();
    return html;
  },

  renderPrepare: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Prepare the Titration</h3>';
    html += '<p>Before beginning the titration, identify the correct apparatus for each task.</p>';
    html += '<div class="titration-quiz">';
    html += '<div class="titration-quiz-q">';
    html += '<div class="titration-quiz-num">Q1</div>';
    html += '<div class="titration-quiz-text">Which apparatus delivers accurately measured variable volumes?</div>';
    html += '</div>';
    html += '<div class="tool-options">';
    html += '<button class="titration-tool-btn ' + (state.titrationApparatusChoice1 === 'burette' ? 'correct' : state.titrationApparatusChoice1 ? 'wrong' : '') + '" data-tool="burette">';
    html += '<span class="titration-tool-icon">&#128208;</span><span>Burette</span></button>';
    html += '<button class="titration-tool-btn ' + (state.titrationApparatusChoice1 === 'measuring-cylinder' ? 'correct' : state.titrationApparatusChoice1 === 'measuring-cylinder' ? 'wrong' : '') + '" data-tool="measuring-cylinder">';
    html += '<span class="titration-tool-icon">&#128214;</span><span>Measuring cylinder</span></button>';
    html += '<button class="titration-tool-btn ' + (state.titrationApparatusChoice1 === 'beaker' ? 'correct' : state.titrationApparatusChoice1 === 'beaker' ? 'wrong' : '') + '" data-tool="beaker">';
    html += '<span class="titration-tool-icon">&#129371;</span><span>Beaker</span></button>';
    html += '</div>';
    if (state.titrationApparatusChoice1 === 'burette') {
      html += '<div class="feedback feedback-correct">&#10003; Correct. A burette delivers variable volumes of liquid accurately.</div>';
    } else if (state.titrationApparatusChoice1 && state.titrationApparatusChoice1 !== 'burette') {
      html += '<div class="feedback feedback-incorrect">&#10007; Incorrect. A burette is used to deliver accurately measured variable volumes.</div>';
    }
    html += '</div>';
    html += '<div class="titration-quiz" style="margin-top:1rem;">';
    html += '<div class="titration-quiz-q">';
    html += '<div class="titration-quiz-num">Q2</div>';
    html += '<div class="titration-quiz-text">Which apparatus measures a fixed volume of solution precisely?</div>';
    html += '</div>';
    html += '<div class="tool-options">';
    html += '<button class="titration-tool-btn ' + (state.titrationApparatusChoice2 === 'volumetric-pipette' ? 'correct' : state.titrationApparatusChoice2 ? 'wrong' : '') + '" data-tool="volumetric-pipette">';
    html += '<span class="titration-tool-icon">&#129513;</span><span>Volumetric pipette</span></button>';
    html += '<button class="titration-tool-btn ' + (state.titrationApparatusChoice2 === 'burette2' ? 'correct' : state.titrationApparatusChoice2 === 'burette2' ? 'wrong' : '') + '" data-tool="burette2">';
    html += '<span class="titration-tool-icon">&#128208;</span><span>Burette</span></button>';
    html += '<button class="titration-tool-btn ' + (state.titrationApparatusChoice2 === 'dropper' ? 'correct' : state.titrationApparatusChoice2 === 'dropper' ? 'wrong' : '') + '" data-tool="dropper">';
    html += '<span class="titration-tool-icon">&#129479;</span><span>Dropper</span></button>';
    html += '</div>';
    if (state.titrationApparatusChoice2 === 'volumetric-pipette') {
      html += '<div class="feedback feedback-correct">&#10003; Correct. A volumetric pipette measures a fixed volume (e.g. 25.00 mL) precisely.</div>';
    } else if (state.titrationApparatusChoice2 && state.titrationApparatusChoice2 !== 'volumetric-pipette') {
      html += '<div class="feedback feedback-incorrect">&#10007; Incorrect. A volumetric pipette is used to measure a fixed volume precisely.</div>';
    }
    html += '</div>';
    html += '<div class="sim-note">ChemSim educational simulation choice: Standard chemistry conventions used for apparatus identification.</div>';
    html += '</div>';
    return html;
  },

  renderFillBurette: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Fill the Burette</h3>';
    html += '<div class="titration-step-list">';
    html += '<div class="titration-step' + (state.titrationBuretteFilled ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationBuretteFilled ? '&#10003;' : '1') + '</span>';
    html += '<span>Rinse the burette with HCl solution</span></div>';
    html += '<div class="titration-step' + (state.titrationBuretteFilled ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationBuretteFilled ? '&#10003;' : '2') + '</span>';
    html += '<span>Fill above the zero mark</span></div>';
    html += '<div class="titration-step' + (state.titrationBuretteFilled ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationBuretteFilled ? '&#10003;' : '3') + '</span>';
    html += '<span>Open tap to remove air bubbles</span></div>';
    html += '<div class="titration-step' + (state.titrationBuretteFilled ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationBuretteFilled ? '&#10003;' : '4') + '</span>';
    html += '<span>Adjust to exactly 0.00 mL</span></div>';
    html += '</div>';
    html += '<div class="titration-info-box">';
    html += '<div class="titration-info-row"><span class="titration-info-label">Titrant</span><span class="titration-info-value">HCl solution</span></div>';
    html += '<div class="titration-info-row"><span class="titration-info-label">Concentration</span><span class="titration-info-value">' + sim.hclConcentration.toFixed(4) + ' mol/L</span></div>';
    html += '</div>';
    html += '<div class="sim-note">Simulated educational value \u2014 not a real laboratory measurement.</div>';
    if (!state.titrationBuretteFilled) {
      html += '<div data-action="fill-burette" class="btn btn-primary titration-action-btn">Fill Burette</div>';
    } else {
      html += '<div class="feedback feedback-correct">&#10003; Burette filled and ready. Initial reading: 0.00 mL.</div>';
    }
    html += '</div>';
    return html;
  },

  renderMeasureSample: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Measure the NaOH Sample</h3>';
    html += '<div class="titration-step-list">';
    html += '<div class="titration-step' + (state.titrationSampleMeasured ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationSampleMeasured ? '&#10003;' : '1') + '</span>';
    html += '<span>Rinse volumetric pipette with NaOH</span></div>';
    html += '<div class="titration-step' + (state.titrationSampleMeasured ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationSampleMeasured ? '&#10003;' : '2') + '</span>';
    html += '<span>Pipette 25.00 mL into conical flask</span></div>';
    html += '<div class="titration-step' + (state.titrationSampleMeasured ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationSampleMeasured ? '&#10003;' : '3') + '</span>';
    html += '<span>Add 2\u20133 drops of phenolphthalein indicator</span></div>';
    html += '<div class="titration-step' + (state.titrationSampleMeasured ? ' done' : '') + '">';
    html += '<span class="titration-step-icon">' + (state.titrationSampleMeasured ? '&#10003;' : '4') + '</span>';
    html += '<span>Place flask on white tile under burette</span></div>';
    html += '</div>';
    html += '<div class="titration-info-box">';
    html += '<div class="titration-info-row"><span class="titration-info-label">Sample</span><span class="titration-info-value">NaOH solution</span></div>';
    html += '<div class="titration-info-row"><span class="titration-info-label">Volume</span><span class="titration-info-value">' + sim.naohVolume.toFixed(2) + ' mL</span></div>';
    html += '<div class="titration-info-row"><span class="titration-info-label">Indicator</span><span class="titration-info-value">Phenolphthalein (pink in base)</span></div>';
    html += '</div>';
    html += '<div class="sim-note">Simulated educational value \u2014 not a real laboratory measurement.</div>';
    if (!state.titrationSampleMeasured) {
      html += '<div data-action="measure-sample" class="btn btn-primary titration-action-btn">Measure Sample</div>';
    } else {
      html += '<div class="feedback feedback-correct">&#10003; NaOH sample prepared with indicator. Solution is pink.</div>';
    }
    html += '</div>';
    return html;
  },

  renderTitrate: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var trialNum = state.titrationTrialIndex + 1;
    var totalTrials = sim.trials.length;
    var allDone = state.titrationTrialIndex >= totalTrials;
    var html = '<div class="stage-card"><h3 class="stage-card-title">' + (allDone ? 'All Trials Complete' : 'Titrate \u2014 Trial ' + trialNum + ' of ' + totalTrials) + '</h3>';

    /* Titre tracker */
    html += '<div class="titre-tracker">';
    html += '<div class="titre-tracker-title">Trial Progress</div>';
    html += '<div class="titre-tracker-dots">';
    for (var i = 0; i < totalTrials; i++) {
      var dotCls = i < state.titrationTrialIndex ? 'done' : (i === state.titrationTrialIndex ? 'active' : 'pending');
      html += '<div class="titre-tracker-dot ' + dotCls + '">';
      html += '<span>' + (i < state.titrationTrialIndex ? '&#10003;' : (i + 1)) + '</span>';
      html += '</div>';
      if (i < totalTrials - 1) html += '<div class="titre-tracker-line ' + (i < state.titrationTrialIndex ? 'done' : '') + '"></div>';
    }
    html += '</div>';
    html += '</div>';

    if (allDone) {
      html += '<div class="feedback feedback-correct">&#10003; All ' + totalTrials + ' trials recorded. Click <strong>Next Step</strong> to continue to the endpoint observation.</div>';
    } else {
      html += '<p>Slowly add HCl from the burette while watching the flask colour.</p>';
      html += '<p>Use the <strong>stopcock slider</strong> to control the flow rate.</p>';

      /* Live burette reading */
      html += '<div class="titrate-reading">';
      html += '<div class="titrate-reading-label">Burette Reading</div>';
      html += '<div class="titrate-reading-value">' + state.titrationVolume.toFixed(2) + ' <span>mL</span></div>';
      html += '<div class="titrate-reading-bar">';
      var pct = Math.round((state.titrationVolume / sim.burette.maxML) * 100);
      html += '<div class="titrate-reading-fill" style="width:' + pct + '%"></div>';
      html += '</div>';
      html += '<div class="titrate-reading-scale"><span>0 mL</span><span>' + sim.burette.maxML + ' mL</span></div>';
      html += '</div>';

      html += '<div class="form-group"><label class="form-label">Stopcock Control</label>';
      var sliderVal = Math.round(((state.titrationVolume || 0) / sim.burette.maxML) * 100);
      html += '<div class="form-range"><input type="range" id="stopcock-slider" min="0" max="100" value="' + sliderVal + '"></div>';
      html += '<p class="text-sm text-secondary">Slide to open the stopcock. Move toward endpoint carefully.</p></div>';

      var fbCls = 'feedback';
      var fbStyle = 'display:none';
      var fbTxt = '';
      if (state.titrationEndpointReached && !state.titrationEndpointPassed) {
        fbCls = 'feedback feedback-correct';
        fbStyle = '';
        fbTxt = '&#10003; Endpoint reached! The pink colour has just disappeared. Stop adding HCl.';
      } else if (state.titrationEndpointPassed) {
        fbCls = 'feedback feedback-incorrect';
        fbStyle = '';
        fbTxt = '&#10007; Endpoint passed! Too much HCl was added. The solution is now acidic.';
      }
      html += '<div id="titrate-feedback" class="' + fbCls + '" style="' + fbStyle + '">' + fbTxt + '</div>';

      var recStyle = (state.titrationEndpointReached || state.titrationEndpointPassed) ? '' : 'display:none';
      html += '<div id="titrate-record-btn" data-action="record-titre" class="btn btn-accent titration-action-btn" style="' + recStyle + '">Record Titre</div>';
    }
    html += '<div class="sim-note">\u26a0 This is a simulated titration. Volume values are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderEndpoint: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Endpoint Observation</h3>';
    html += '<div class="endpoint-visual">';
    html += '<div class="endpoint-colour-pink"><div class="endpoint-swatch"></div><span>Before endpoint</span></div>';
    html += '<div class="endpoint-arrow">&rarr;</div>';
    html += '<div class="endpoint-colour-clear"><div class="endpoint-swatch"></div><span>After endpoint</span></div>';
    html += '</div>';
    html += '<p>The <strong>pink colour disappeared</strong> and the solution became <strong>colourless</strong> after adding one extra drop of HCl.</p>';
    html += '<p>This indicates that all the NaOH has been neutralised by the HCl.</p>';
    html += '<div class="titration-info-box">';
    html += '<div class="titration-info-row"><span class="titration-info-label">Reaction</span><span class="titration-info-value instruction-formula">NaOH(aq) + HCl(aq) \u2192 NaCl(aq) + H\u2082O(l)</span></div>';
    html += '<div class="titration-info-row"><span class="titration-info-label">Indicator</span><span class="titration-info-value">Phenolphthalein (colourless in acid, pink in base)</span></div>';
    html += '</div>';
    html += '<div class="sim-note">ChemSim educational simulation choice: Phenolphthalein indicator.</div>';
    html += '</div>';
    return html;
  },

  renderRecord: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Record Titration Results</h3>';
    html += '<p>Record the burette readings for each trial.</p>';
    html += '<table class="table titration-table"><thead><tr><th>Trial</th><th>Initial (mL)</th><th>Final (mL)</th><th>Titre (mL)</th></tr></thead><tbody>';
    for (var i = 0; i < sim.trials.length; i++) {
      var t = sim.trials[i];
      var cls = i === 0 ? 'trial-rough' : 'trial-concordant';
      html += '<tr class="' + cls + '">';
      html += '<td>' + (i + 1) + (i === 0 ? ' (rough)' : ' (concordant)') + '</td>';
      html += '<td>' + t.initial.toFixed(2) + '</td>';
      html += '<td>' + t.final.toFixed(2) + '</td>';
      html += '<td><strong>' + t.titre.toFixed(2) + '</strong></td>';
      html += '</tr>';
    }
    html += '</tbody></table>';
    html += '<div class="titration-mean-box">';
    html += '<div class="titration-mean-label">Mean Titre (concordant)</div>';
    html += '<div class="titration-mean-value">' + sim.meanTitre.toFixed(2) + ' mL</div>';
    html += '</div>';
    html += '<div class="sim-note">All values are simulated educational values, not real laboratory measurements.</div>';
    html += '</div>';
    return html;
  },

  renderCalculate: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Calculate NaOH Molarity</h3>';
    html += '<p class="instruction-formula">M(NaOH) \u00d7 V(NaOH) = M(HCl) \u00d7 V(HCl)</p>';
    html += '<div class="titration-info-box">';
    html += '<div class="titration-info-row"><span class="titration-info-label">HCl concentration</span><span class="titration-info-value">' + sim.hclConcentration.toFixed(4) + ' mol/L</span></div>';
    html += '<div class="titration-info-row"><span class="titration-info-label">HCl volume (mean titre)</span><span class="titration-info-value">' + sim.meanTitre.toFixed(2) + ' mL</span></div>';
    html += '<div class="titration-info-row"><span class="titration-info-label">NaOH volume</span><span class="titration-info-value">' + sim.naohVolume.toFixed(2) + ' mL</span></div>';
    html += '</div>';
    html += '<p class="detail-label" style="margin-top:0.75rem;">Calculate M(NaOH)</p>';
    html += '<p>M(NaOH) = [M(HCl) \u00d7 V(HCl)] / V(NaOH)</p>';
    html += '<p>M(NaOH) = [' + sim.hclConcentration.toFixed(4) + ' \u00d7 ' + sim.meanTitre.toFixed(2) + '] / ' + sim.naohVolume.toFixed(2) + '</p>';
    html += '<div class="form-group"><label class="form-label">Your answer (mol/L):</label>';
    html += '<input type="number" step="0.0001" min="0" max="1" id="calc-answer" value="' + ChemSim.escapeHtml(String(state.titrationCalcAnswer)) + '" class="form-input" style="width:120px;margin-top:0.25rem;">';
    html += '<div data-action="check-calc" class="btn btn-accent" style="margin-left:0.5rem;display:inline-block;">Check</div></div>';
    if (state.titrationCalcChecked) {
      var userVal = parseFloat(state.titrationCalcAnswer);
      if (!isNaN(userVal) && Math.abs(userVal - sim.expectedMolarity) < 0.002) {
        html += '<div class="feedback feedback-correct">&#10003; Correct! M(NaOH) = ' + sim.expectedMolarity.toFixed(4) + ' mol/L</div>';
      } else {
        html += '<div class="feedback feedback-incorrect">&#10007; Expected ~' + sim.expectedMolarity.toFixed(4) + ' mol/L. Check your calculation.</div>';
      }
    }
    html += '<div class="sim-note">Simulated educational values. This is not a real laboratory measurement.</div>';
    html += '</div>';
    return html;
  },

  renderInterpret: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Interpret the Results</h3>';
    html += '<p>Based on your titration data, interpret the calculated molarity.</p>';
    html += '<p class="detail-label">Guiding questions</p>';
    html += '<ul>';
    html += '<li>What does the calculated molarity tell you about the NaOH solution?</li>';
    html += '<li>How close were your concordant titre values?</li>';
    html += '<li>What are possible sources of error in this titration?</li>';
    html += '</ul>';
    html += '<div class="form-group"><label class="form-label">Your Interpretation</label>';
    html += '<textarea id="interpretation-input" class="form-textarea" placeholder="Write your interpretation here...">' + ChemSim.escapeHtml(state.interpretation) + '</textarea></div>';
    html += '</div>';
    return html;
  },

  renderConclude: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Conclusion</h3>';
    html += '<p>Write your conclusion based on your titration data and interpretation.</p>';
    html += '<p>Your conclusion should address:</p>';
    html += '<ul>';
    html += '<li>The determined molarity of the NaOH solution</li>';
    html += '<li>The concordance of your titre values</li>';
    html += '<li>Any factors that may have affected the accuracy</li>';
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
    html += '<div class="detail-row"><span class="detail-label">Section</span><span class="detail-value">' + (exp.section.charAt(0).toUpperCase() + exp.section.slice(1)) + '</span></div>';
    html += '<div class="detail-row"><span class="detail-label">SLOs</span><span class="detail-value">' + exp.slos.join(', ') + '</span></div>';
    html += '<hr class="divider">';
    html += '<p><strong>HCl concentration:</strong> ' + sim.hclConcentration.toFixed(4) + ' mol/L (simulated)</p>';
    html += '<p><strong>NaOH volume:</strong> ' + sim.naohVolume.toFixed(2) + ' mL (simulated)</p>';
    html += '<p><strong>Mean titre:</strong> ' + sim.meanTitre.toFixed(2) + ' mL (simulated)</p>';
    html += '<p><strong>Determined NaOH molarity:</strong> ' + sim.expectedMolarity.toFixed(4) + ' mol/L (simulated)</p>';
    html += '<hr class="divider">';
    html += '<p class="detail-label">Your Interpretation</p><p>' + ChemSim.escapeHtml(state.interpretation || '-') + '</p>';
    html += '<p class="detail-label">Your Conclusion</p><p>' + ChemSim.escapeHtml(state.conclusion || '-') + '</p>';
    html += '<div class="sim-note">All volume and concentration values are simulated educational values, not real laboratory measurements.</div>';
    html += '<div data-action="finish-experiment" class="btn btn-primary" style="margin-top:1rem;">Finish Experiment</div>';
    html += '</div>';
    return html;
  },

  /* Canvas Drawing */
  animActive: function(state, stage) {
    if (!state) return false;
    var now = Date.now();
    if (stage === 'fillBurette' && state.titrationBuretteFilled && state.titrationFillStart && (now - state.titrationFillStart) < 1700) return true;
    if (stage === 'measureSample' && state.titrationSampleMeasured && state.titrationSampleStart && (now - state.titrationSampleStart) < 1500) return true;
    if (stage === 'titrate' && state.titrationBuretteFilled) return true;
    return false;
  },

  draw: function(canvas, ctx, state, exp) {
    var sim = SIMULATION_CONFIG['A4'];
    if (!sim) return;
    var cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    this.drawBench(ctx, cw, ch);
    this.drawStand(ctx, sim);
    this.drawWhiteTile(ctx, sim);
    this.drawBeaker(ctx, sim);
    this.drawFlask(ctx, sim, state);
    this.drawBurette(ctx, sim, state);
    this.drawClamp(ctx, sim);
    this.drawStopcock(ctx, sim, state);
    this.drawLabels(ctx, sim, state);
  },

  /* Clean lab bench surface — matching reference style */
  drawBench: function(ctx, cw, ch) {
    ctx.save();
    var benchTop = 600;
    /* clean white/light surface */
    var benchGrad = ctx.createLinearGradient(0, benchTop, 0, ch);
    benchGrad.addColorStop(0, '#f0f2f5');
    benchGrad.addColorStop(0.3, '#e8ecf0');
    benchGrad.addColorStop(1, '#dde2e8');
    ctx.fillStyle = benchGrad;
    ctx.fillRect(0, benchTop, cw, ch - benchTop);
    /* surface edge line */
    ctx.strokeStyle = '#c5ccd4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, benchTop);
    ctx.lineTo(cw, benchTop);
    ctx.stroke();
    /* background wall — clean white with subtle gradient */
    var wallGrad = ctx.createLinearGradient(0, 0, 0, benchTop);
    wallGrad.addColorStop(0, '#fafbfc');
    wallGrad.addColorStop(0.5, '#f5f7f9');
    wallGrad.addColorStop(1, '#eef1f4');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, cw, benchTop);
    ctx.restore();
  },

  /* Retort stand — base + rod */
  drawStand: function(ctx, sim) {
    var s = sim.stand;
    ctx.save();
    /* base */
    var baseGrad = ctx.createLinearGradient(s.baseX, s.baseY, s.baseX, s.baseY + s.baseH);
    baseGrad.addColorStop(0, '#555');
    baseGrad.addColorStop(0.4, '#3a3a3a');
    baseGrad.addColorStop(1, '#222');
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.moveTo(s.baseX + 4, s.baseY);
    ctx.lineTo(s.baseX + s.baseW - 4, s.baseY);
    ctx.quadraticCurveTo(s.baseX + s.baseW, s.baseY, s.baseX + s.baseW, s.baseY + 4);
    ctx.lineTo(s.baseX + s.baseW, s.baseY + s.baseH - 4);
    ctx.quadraticCurveTo(s.baseX + s.baseW, s.baseY + s.baseH, s.baseX + s.baseW - 4, s.baseY + s.baseH);
    ctx.lineTo(s.baseX + 4, s.baseY + s.baseH);
    ctx.quadraticCurveTo(s.baseX, s.baseY + s.baseH, s.baseX, s.baseY + s.baseH - 4);
    ctx.lineTo(s.baseX, s.baseY + 4);
    ctx.quadraticCurveTo(s.baseX, s.baseY, s.baseX + 4, s.baseY);
    ctx.closePath();
    ctx.fill();
    /* base highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(s.baseX + 6, s.baseY + 1, s.baseW - 12, 2);
    /* rod */
    var rodGrad = ctx.createLinearGradient(s.rodX - s.rodW / 2, 0, s.rodX + s.rodW / 2, 0);
    rodGrad.addColorStop(0, '#888');
    rodGrad.addColorStop(0.25, '#ccc');
    rodGrad.addColorStop(0.45, '#eee');
    rodGrad.addColorStop(0.55, '#ddd');
    rodGrad.addColorStop(0.75, '#aaa');
    rodGrad.addColorStop(1, '#777');
    ctx.fillStyle = rodGrad;
    ctx.fillRect(s.rodX - s.rodW / 2, s.rodTopY, s.rodW, s.rodBotY - s.rodTopY);
    /* rod base connector */
    ctx.fillStyle = '#444';
    ctx.fillRect(s.rodX - 6, s.rodBotY - 8, 12, 10);
    ctx.restore();
  },

  /* Clamp holding burette */
  drawClamp: function(ctx, sim) {
    var cl = sim.clamp;
    ctx.save();
    /* clamp body */
    var clampGrad = ctx.createLinearGradient(cl.cx - cl.w / 2, cl.cy, cl.cx + cl.w / 2, cl.cy);
    clampGrad.addColorStop(0, '#2a5090');
    clampGrad.addColorStop(0.3, '#4477bb');
    clampGrad.addColorStop(0.5, '#5588cc');
    clampGrad.addColorStop(0.7, '#3a6aaa');
    clampGrad.addColorStop(1, '#1a4080');
    ctx.fillStyle = clampGrad;
    ctx.beginPath();
    ctx.moveTo(cl.cx - cl.w / 2 + 3, cl.cy - cl.h / 2);
    ctx.lineTo(cl.cx + cl.w / 2 - 3, cl.cy - cl.h / 2);
    ctx.quadraticCurveTo(cl.cx + cl.w / 2, cl.cy - cl.h / 2, cl.cx + cl.w / 2, cl.cy - cl.h / 2 + 3);
    ctx.lineTo(cl.cx + cl.w / 2, cl.cy + cl.h / 2 - 3);
    ctx.quadraticCurveTo(cl.cx + cl.w / 2, cl.cy + cl.h / 2, cl.cx + cl.w / 2 - 3, cl.cy + cl.h / 2);
    ctx.lineTo(cl.cx - cl.w / 2 + 3, cl.cy + cl.h / 2);
    ctx.quadraticCurveTo(cl.cx - cl.w / 2, cl.cy + cl.h / 2, cl.cx - cl.w / 2, cl.cy + cl.h / 2 - 3);
    ctx.lineTo(cl.cx - cl.w / 2, cl.cy - cl.h / 2 + 3);
    ctx.quadraticCurveTo(cl.cx - cl.w / 2, cl.cy - cl.h / 2, cl.cx - cl.w / 2 + 3, cl.cy - cl.h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#153570';
    ctx.lineWidth = 1;
    ctx.stroke();
    /* highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(cl.cx - cl.w / 2 + 4, cl.cy - cl.h / 2 + 1, cl.w - 8, 2);
    /* clamp jaws around burette */
    var bx = sim.burette.cx;
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(bx - 4, cl.cy - cl.h / 2 + 2, 8, cl.h - 4);
    /* screw knobs */
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.arc(cl.cx + cl.w / 2 + 4, cl.cy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#777';
    ctx.beginPath();
    ctx.arc(cl.cx + cl.w / 2 + 4, cl.cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  /* Burette with HCl — clean vector style */
  drawBurette: function(ctx, sim, state) {
    var b = sim.burette;
    var bx = b.cx - b.w / 2;
    var by = b.topY;
    ctx.save();
    /* glass tube — light blue tint */
    var glassGrad = ctx.createLinearGradient(bx, by, bx + b.w, by);
    glassGrad.addColorStop(0, 'rgba(160,195,230,0.4)');
    glassGrad.addColorStop(0.12, 'rgba(195,220,245,0.2)');
    glassGrad.addColorStop(0.35, 'rgba(220,238,252,0.08)');
    glassGrad.addColorStop(0.65, 'rgba(240,248,255,0.04)');
    glassGrad.addColorStop(0.88, 'rgba(195,220,245,0.15)');
    glassGrad.addColorStop(1, 'rgba(160,195,230,0.38)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.6;
    ctx.fillRect(bx, by, b.w, b.h);
    ctx.strokeRect(bx, by, b.w, b.h);
    /* top rim */
    ctx.strokeStyle = 'rgba(100,140,180,0.5)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(b.cx, by + 2, b.w / 2, 3, 0, 0, Math.PI * 2);
    ctx.stroke();
    /* liquid level */
    var mlToPixel = b.h / b.maxML;
    var vol = state.titrationVolume || 0;
    var liquidTop = by + vol * mlToPixel;
    if (state.currentStage === 'fillBurette' && state.titrationBuretteFilled && state.titrationFillStart) {
      var fillProg = Math.min(1, (Date.now() - state.titrationFillStart) / 1600);
      liquidTop = by + b.h * (1 - fillProg);
    }
    var liquidGrad = ctx.createLinearGradient(bx, liquidTop, bx, by + b.h);
    liquidGrad.addColorStop(0, 'rgba(80,155,220,0.35)');
    liquidGrad.addColorStop(0.5, 'rgba(65,140,210,0.45)');
    liquidGrad.addColorStop(1, 'rgba(50,125,200,0.55)');
    ctx.fillStyle = liquidGrad;
    ctx.fillRect(bx + 2, liquidTop, b.w - 4, by + b.h - liquidTop - 2);
    /* meniscus */
    ctx.fillStyle = 'rgba(45,115,185,0.45)';
    ctx.beginPath();
    ctx.ellipse(b.cx, liquidTop, b.w / 2 - 2, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    /* graduations — clean white lines */
    ctx.textAlign = 'right';
    for (var ml = 0; ml <= b.maxML; ml += 5) {
      var y = by + ml * mlToPixel;
      var lw = (ml % 10 === 0) ? 10 : 4;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = (ml % 10 === 0) ? 1 : 0.5;
      ctx.beginPath();
      ctx.moveTo(bx + b.w, y);
      ctx.lineTo(bx + b.w - lw, y);
      ctx.stroke();
      if (ml % 10 === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '8px sans-serif';
        ctx.fillText(ml + '', bx + b.w - 13, y + 3);
      }
    }
    ctx.textAlign = 'left';
    /* tip */
    var tipW = 5;
    var tipH = 18;
    var tipGrad = ctx.createLinearGradient(b.cx - tipW / 2, by + b.h, b.cx + tipW / 2, by + b.h);
    tipGrad.addColorStop(0, 'rgba(160,195,230,0.35)');
    tipGrad.addColorStop(0.5, 'rgba(200,225,245,0.18)');
    tipGrad.addColorStop(1, 'rgba(160,195,230,0.32)');
    ctx.fillStyle = tipGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.5)';
    ctx.lineWidth = 1.3;
    ctx.fillRect(b.cx - tipW / 2, by + b.h, tipW, tipH);
    ctx.strokeRect(b.cx - tipW / 2, by + b.h, tipW, tipH);
    /* drip animation during titration */
    if (state.currentStage === 'titrate' && state.titrationBuretteFilled) {
      var dripProg = (Date.now() % 700) / 700;
      var dropStartY = by + b.h + tipH + 6;
      var dropEndY = 490;
      ctx.fillStyle = 'rgba(60,145,215,0.65)';
      ctx.beginPath();
      ctx.ellipse(b.cx, dropStartY + dripProg * (dropEndY - dropStartY), 2.5, 3.8, 0, 0, Math.PI * 2);
      ctx.fill();
      if (dripProg > 0.88) {
        ctx.fillStyle = 'rgba(60,145,215,0.3)';
        ctx.beginPath();
        ctx.ellipse(b.cx, dropEndY + 4, 5, 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (state.titrationVolume > 0 && vol < b.maxML) {
      ctx.fillStyle = 'rgba(60,145,215,0.5)';
      ctx.beginPath();
      ctx.ellipse(b.cx, by + b.h + tipH + 3, 2.2, 3.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  },

  /* Stopcock */
  drawStopcock: function(ctx, sim, state) {
    var sc = sim.stopcock;
    var bx = sim.burette.cx;
    var by = sim.burette.topY + sim.burette.h;
    ctx.save();
    /* stopcock body */
    var bodyGrad = ctx.createLinearGradient(bx - sc.w / 2, 0, bx + sc.w / 2, 0);
    bodyGrad.addColorStop(0, '#d0d0d0');
    bodyGrad.addColorStop(0.3, '#f0f0f0');
    bodyGrad.addColorStop(0.5, '#fafafa');
    bodyGrad.addColorStop(0.7, '#e8e8e8');
    bodyGrad.addColorStop(1, '#c0c0c0');
    ctx.fillStyle = bodyGrad;
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.fillRect(bx - sc.w / 2, by + 18, sc.w, sc.h);
    ctx.strokeRect(bx - sc.w / 2, by + 18, sc.w, sc.h);
    /* knob */
    var knobX = bx + sc.w / 2 + 10;
    var knobY = by + 18 + sc.h / 2;
    var knobGrad = ctx.createRadialGradient(knobX - 2, knobY - 2, 1, knobX, knobY, 7);
    knobGrad.addColorStop(0, '#6699dd');
    knobGrad.addColorStop(0.6, '#4477bb');
    knobGrad.addColorStop(1, '#2a5090');
    ctx.fillStyle = knobGrad;
    ctx.beginPath();
    ctx.arc(knobX, knobY, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a4080';
    ctx.lineWidth = 1;
    ctx.stroke();
    /* knob highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.arc(knobX - 2, knobY - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  /* White tile under flask — clean style */
  drawWhiteTile: function(ctx, sim) {
    var t = sim.whiteTile;
    ctx.save();
    var tileGrad = ctx.createLinearGradient(t.cx - t.w / 2, t.cy - t.h / 2, t.cx + t.w / 2, t.cy + t.h / 2);
    tileGrad.addColorStop(0, '#f0f2f5');
    tileGrad.addColorStop(0.3, '#f8f9fa');
    tileGrad.addColorStop(0.7, '#fafbfc');
    tileGrad.addColorStop(1, '#e8ecf0');
    ctx.fillStyle = tileGrad;
    ctx.strokeStyle = '#c5ccd4';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(t.cx - t.w / 2 + 3, t.cy - t.h / 2);
    ctx.lineTo(t.cx + t.w / 2 - 3, t.cy - t.h / 2);
    ctx.quadraticCurveTo(t.cx + t.w / 2, t.cy - t.h / 2, t.cx + t.w / 2, t.cy - t.h / 2 + 3);
    ctx.lineTo(t.cx + t.w / 2, t.cy + t.h / 2 - 3);
    ctx.quadraticCurveTo(t.cx + t.w / 2, t.cy + t.h / 2, t.cx + t.w / 2 - 3, t.cy + t.h / 2);
    ctx.lineTo(t.cx - t.w / 2 + 3, t.cy + t.h / 2);
    ctx.quadraticCurveTo(t.cx - t.w / 2, t.cy + t.h / 2, t.cx - t.w / 2, t.cy + t.h / 2 - 3);
    ctx.lineTo(t.cx - t.w / 2, t.cy - t.h / 2 + 3);
    ctx.quadraticCurveTo(t.cx - t.w / 2, t.cy - t.h / 2, t.cx - t.w / 2 + 3, t.cy - t.h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  /* Conical flask — clean vector style matching reference */
  drawFlask: function(ctx, sim, state) {
    var f = sim.flask;
    var fLeft = f.cx - f.bodyW / 2;
    var fRight = f.cx + f.bodyW / 2;
    var fBottom = f.cy + f.bodyH / 2;
    var fShoulder = f.cy - f.bodyH / 2;
    var neckTop = fShoulder - f.neckH;
    ctx.save();
    if (state.currentStage === 'titrate') {
      ctx.translate(Math.sin(Date.now() / 280) * 1.5, 0);
    }

    /* circular base / white tile under flask */
    ctx.fillStyle = '#e8ecf0';
    ctx.strokeStyle = '#c0c8d0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(f.cx, fBottom + 6, f.bodyW / 2 + 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    /* flask glass body — light blue tinted */
    var glassGrad = ctx.createLinearGradient(fLeft, f.cy, fRight, f.cy);
    glassGrad.addColorStop(0, 'rgba(160,195,230,0.45)');
    glassGrad.addColorStop(0.1, 'rgba(195,220,245,0.25)');
    glassGrad.addColorStop(0.3, 'rgba(220,238,252,0.1)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    glassGrad.addColorStop(0.7, 'rgba(220,238,252,0.08)');
    glassGrad.addColorStop(0.9, 'rgba(195,220,245,0.2)');
    glassGrad.addColorStop(1, 'rgba(160,195,230,0.42)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(f.cx - f.neckW / 2, neckTop);
    ctx.lineTo(f.cx - f.neckW / 2, fShoulder);
    ctx.lineTo(fLeft + 18, fShoulder);
    ctx.quadraticCurveTo(fLeft, fShoulder, fLeft, fShoulder + 18);
    ctx.lineTo(fLeft, fBottom - 18);
    ctx.quadraticCurveTo(fLeft, fBottom, fLeft + 18, fBottom);
    ctx.lineTo(fRight - 18, fBottom);
    ctx.quadraticCurveTo(fRight, fBottom, fRight, fBottom - 18);
    ctx.lineTo(fRight, fShoulder + 18);
    ctx.quadraticCurveTo(fRight, fShoulder, fRight - 18, fShoulder);
    ctx.lineTo(f.cx + f.neckW / 2, fShoulder);
    ctx.lineTo(f.cx + f.neckW / 2, neckTop);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /* glass highlight — left edge */
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fLeft + 8, fShoulder + 22);
    ctx.lineTo(fLeft + 5, fBottom - 25);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(fLeft + 14, fShoulder + 22);
    ctx.lineTo(fLeft + 11, fBottom - 25);
    ctx.stroke();

    /* neck rim */
    ctx.strokeStyle = 'rgba(100,140,180,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(f.cx, neckTop + 6, f.neckW / 2, 4, 0, 0, Math.PI * 2);
    ctx.stroke();

    /* liquid — NaOH + phenolphthalein (pink) */
    var vol = state.titrationVolume || 0;
    var hasSample = state.titrationSampleMeasured;
    var frac = hasSample ? Math.min(vol / sim.endpointVolume, 1.2) : 0;
    var r, g, b2;
    if (!hasSample) { r = 255; g = 255; b2 = 255; }
    else if (frac < 0.85) { r = 220; g = 50; b2 = 140; }
    else if (frac < 1.0) { var t = (frac - 0.85) / 0.15; r = Math.round(220 - t * 205); g = Math.round(50 - t * 40); b2 = Math.round(140 - t * 125); }
    else { r = 255; g = 255; b2 = 255; }

    if (hasSample) {
      var sampProg = 1;
      if (state.currentStage === 'measureSample' && state.titrationSampleStart) {
        sampProg = Math.min(1, (Date.now() - state.titrationSampleStart) / 1400);
      }
      var liqTop = (fBottom - 75) + (fBottom - (fBottom - 75)) * (1 - sampProg);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(fLeft + 18, fShoulder);
      ctx.quadraticCurveTo(fLeft, fShoulder, fLeft, fShoulder + 18);
      ctx.lineTo(fLeft, fBottom - 18);
      ctx.quadraticCurveTo(fLeft, fBottom, fLeft + 18, fBottom);
      ctx.lineTo(fRight - 18, fBottom);
      ctx.quadraticCurveTo(fRight, fBottom, fRight, fBottom - 18);
      ctx.lineTo(fRight, fShoulder + 18);
      ctx.quadraticCurveTo(fRight, fShoulder, fRight - 18, fShoulder);
      ctx.closePath();
      ctx.clip();
      var liqGrad = ctx.createLinearGradient(fLeft, liqTop, fLeft, fBottom);
      liqGrad.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b2 + ',' + (0.35 * sampProg) + ')');
      liqGrad.addColorStop(0.4, 'rgba(' + r + ',' + g + ',' + b2 + ',' + (0.5 * sampProg) + ')');
      liqGrad.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b2 + ',' + (0.6 * sampProg) + ')');
      ctx.fillStyle = liqGrad;
      ctx.fillRect(fLeft, liqTop, f.bodyW, fBottom - liqTop);
      /* meniscus */
      ctx.fillStyle = 'rgba(' + Math.min(r + 50, 255) + ',' + Math.min(g + 50, 255) + ',' + Math.min(b2 + 50, 255) + ',' + (0.25 * sampProg) + ')';
      ctx.beginPath();
      ctx.ellipse(f.cx, liqTop, f.bodyW / 2 - 12, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      /* bubbles */
      if (state.currentStage === 'titrate') {
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        for (var bi = 0; bi < 3; bi++) {
          var bx2 = f.cx - 15 + bi * 14;
          var by2 = fBottom - 20 - ((Date.now() / 20 + bi * 30) % 40);
          ctx.beginPath();
          ctx.arc(bx2, by2, 2 + bi * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    /* graduation marks — clean white lines */
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    var marks = [50, 100, 150, 200, 250];
    for (var i = 0; i < marks.length; i++) {
      var my = fBottom - 18 - (marks[i] / 250) * (f.bodyH - 24);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(fRight - 8, my);
      ctx.lineTo(fRight - (marks[i] % 100 === 0 ? 22 : 14), my);
      ctx.stroke();
      if (marks[i] % 100 === 0) {
        ctx.fillText(marks[i] + '', fRight - 25, my + 3);
      }
    }
    ctx.textAlign = 'left';
    ctx.restore();
  },

  /* Beaker — clean vector style matching reference */
  drawBeaker: function(ctx, sim) {
    var bk = sim.hclBeaker;
    if (!bk) return;
    var bx = bk.cx - bk.w / 2;
    var by = bk.cy - bk.h / 2;
    var bw = bk.w;
    var bh = bk.h;
    ctx.save();

    /* circular base under beaker */
    ctx.fillStyle = '#e8ecf0';
    ctx.strokeStyle = '#c0c8d0';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(bk.cx, by + bh + 4, bw / 2 + 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    /* glass body — straight walls, light blue tint */
    var glassGrad = ctx.createLinearGradient(bx, by, bx + bw, by);
    glassGrad.addColorStop(0, 'rgba(160,195,230,0.48)');
    glassGrad.addColorStop(0.1, 'rgba(195,220,245,0.25)');
    glassGrad.addColorStop(0.3, 'rgba(220,238,252,0.1)');
    glassGrad.addColorStop(0.5, 'rgba(240,248,255,0.05)');
    glassGrad.addColorStop(0.7, 'rgba(220,238,252,0.08)');
    glassGrad.addColorStop(0.9, 'rgba(195,220,245,0.22)');
    glassGrad.addColorStop(1, 'rgba(160,195,230,0.45)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + 2, by + 8);
    ctx.lineTo(bx + 2, by + bh - 6);
    ctx.quadraticCurveTo(bx + 2, by + bh, bx + 8, by + bh);
    ctx.lineTo(bx + bw - 8, by + bh);
    ctx.quadraticCurveTo(bx + bw - 2, by + bh, bx + bw - 2, by + bh - 6);
    ctx.lineTo(bx + bw - 2, by + 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /* HCl liquid fill — light blue */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bx + 2, by + 8);
    ctx.lineTo(bx + 2, by + bh - 6);
    ctx.quadraticCurveTo(bx + 2, by + bh, bx + 8, by + bh);
    ctx.lineTo(bx + bw - 8, by + bh);
    ctx.quadraticCurveTo(bx + bw - 2, by + bh, bx + bw - 2, by + bh - 6);
    ctx.lineTo(bx + bw - 2, by + 8);
    ctx.closePath();
    ctx.clip();
    var liqTop = by + bh * (1 - (bk.liquidLevel || 0.55));
    var liqGrad = ctx.createLinearGradient(bx, liqTop, bx, by + bh);
    liqGrad.addColorStop(0, 'rgba(140,190,230,0.4)');
    liqGrad.addColorStop(0.4, 'rgba(120,180,225,0.5)');
    liqGrad.addColorStop(1, 'rgba(100,170,220,0.58)');
    ctx.fillStyle = liqGrad;
    ctx.fillRect(bx, liqTop, bw, by + bh - liqTop);
    /* meniscus */
    ctx.fillStyle = 'rgba(180,215,245,0.55)';
    ctx.beginPath();
    ctx.ellipse(bk.cx, liqTop, bw / 2 - 5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    /* pour spout */
    var spoutGrad = ctx.createLinearGradient(bx - 10, by, bx + 8, by + 14);
    spoutGrad.addColorStop(0, 'rgba(160,200,230,0.5)');
    spoutGrad.addColorStop(0.5, 'rgba(200,225,245,0.3)');
    spoutGrad.addColorStop(1, 'rgba(160,200,230,0.45)');
    ctx.fillStyle = spoutGrad;
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(bx + 4, by + 5);
    ctx.quadraticCurveTo(bx - 12, by - 1, bx - 8, by + 13);
    ctx.quadraticCurveTo(bx - 4, by + 15, bx + 6, by + 13);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /* rim */
    ctx.strokeStyle = 'rgba(100,140,180,0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(bk.cx, by + 6, bw / 2 - 2, 4.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    /* graduation marks — clean white lines */
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'right';
    var marks = [50, 100, 150, 200, 250];
    for (var i = 0; i < marks.length; i++) {
      var my = by + bh - 10 - (marks[i] / 250) * (bh - 20);
      var isMajor = (marks[i] % 100 === 0);
      ctx.lineWidth = isMajor ? 1.2 : 0.7;
      ctx.beginPath();
      ctx.moveTo(bx + bw - 4, my);
      ctx.lineTo(bx + bw - (isMajor ? 16 : 10), my);
      ctx.stroke();
      if (isMajor) {
        ctx.fillText(marks[i] + '', bx + bw - 18, my + 3);
      }
    }
    ctx.textAlign = 'left';

    /* white label */
    var labelW = bw - 22;
    var labelH = 26;
    var labelX = bx + 11;
    var labelY = by + bh * 0.42;
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fillRect(labelX, labelY, labelW, labelH);
    ctx.strokeStyle = '#c5c8cc';
    ctx.lineWidth = 0.7;
    ctx.strokeRect(labelX, labelY, labelW, labelH);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    var lines = bk.label.split('\n');
    for (var j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], bk.cx, labelY + 10 + j * 11);
    }
    ctx.textAlign = 'left';

    /* glass highlights */
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillRect(bx + 6, by + 16, 3.5, bh - 28);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(bx + 11, by + 18, 2, bh - 32);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(bx + bw - 11, by + 20, 2, bh - 36);

    /* base thickness */
    ctx.fillStyle = 'rgba(140,180,215,0.35)';
    ctx.fillRect(bx + 6, by + bh - 6, bw - 12, 5);

    ctx.restore();
  },

  /* Minimal clean labels */
  drawLabels: function(ctx, sim, state) {
    ctx.save();
    ctx.font = '9px sans-serif';
    ctx.fillStyle = 'rgba(25,25,25,0.78)';
    ctx.strokeStyle = 'rgba(25,25,25,0.3)';
    ctx.lineWidth = 0.6;
    function drawLine(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    /* Burette label */
    drawLine(358, 32, 372, 32);
    ctx.fillText('Burette', 375, 30);
    ctx.fillText('(with HCl)', 375, 41);
    /* Beaker label */
    drawLine(215, 520, 228, 520);
    ctx.fillText('Beaker', 231, 518);
    ctx.fillText('(with HCl)', 231, 529);
    /* Flask label */
    drawLine(408, 495, 420, 495);
    ctx.fillText('Conical flask', 423, 493);
    ctx.fillText('(NaOH + indicator)', 423, 504);
    /* White tile */
    drawLine(430, 572, 440, 572);
    ctx.fillText('White tile', 443, 575);
    ctx.restore();
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    var canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    var sim = SIMULATION_CONFIG['A4'];
    if (!sim) return;

    if (stage === 'fillBurette' && !state.titrationBuretteFilled) {
      var nearBurette = mx >= sim.burette.cx - 35 && mx <= sim.burette.cx + 35 &&
        my >= sim.burette.topY - 10 && my <= sim.burette.topY + sim.burette.h + 35;
      if (nearBurette) {
        state.titrationBuretteFilled = true;
        state.titrationFillStart = Date.now();
      }
    }
    if (stage === 'measureSample' && !state.titrationSampleMeasured) {
      var f = sim.flask;
      var nearFlask = mx >= f.cx - f.bodyW / 2 - 25 && mx <= f.cx + f.bodyW / 2 + 25 &&
        my >= f.cy - f.bodyH / 2 - 25 && my <= f.cy + f.bodyH / 2 + 25;
      if (nearFlask) {
        state.titrationSampleMeasured = true;
        state.titrationSampleStart = Date.now();
      }
    }
  }
};
