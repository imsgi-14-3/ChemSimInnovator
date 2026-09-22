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
    html += '<div class="instruction-highlight">Question 1: Which apparatus delivers accurately measured variable volumes?</div>';
    html += '<div class="tool-options">';
    html += '<button class="btn ' + (state.titrationApparatusChoice1 === 'burette' ? 'btn-primary' : 'btn-secondary') + '" data-tool="burette">Burette</button>';
    html += '<button class="btn ' + (state.titrationApparatusChoice1 === 'measuring-cylinder' ? 'btn-primary' : 'btn-secondary') + '" data-tool="measuring-cylinder">Measuring cylinder</button>';
    html += '<button class="btn ' + (state.titrationApparatusChoice1 === 'beaker' ? 'btn-primary' : 'btn-secondary') + '" data-tool="beaker">Beaker</button>';
    html += '</div>';
    if (state.titrationApparatusChoice1 === 'burette') {
      html += '<div class="feedback feedback-correct">Correct. A burette delivers variable volumes of liquid accurately.</div>';
    } else if (state.titrationApparatusChoice1 && state.titrationApparatusChoice1 !== 'burette') {
      html += '<div class="feedback feedback-incorrect">Incorrect. A burette is used to deliver accurately measured variable volumes.</div>';
    }
    html += '<div class="instruction-highlight" style="margin-top:1rem;">Question 2: Which apparatus measures a fixed volume of solution precisely?</div>';
    html += '<div class="tool-options">';
    html += '<button class="btn ' + (state.titrationApparatusChoice2 === 'volumetric-pipette' ? 'btn-primary' : 'btn-secondary') + '" data-tool="volumetric-pipette">Volumetric pipette</button>';
    html += '<button class="btn ' + (state.titrationApparatusChoice2 === 'burette2' ? 'btn-primary' : 'btn-secondary') + '" data-tool="burette2">Burette</button>';
    html += '<button class="btn ' + (state.titrationApparatusChoice2 === 'dropper' ? 'btn-primary' : 'btn-secondary') + '" data-tool="dropper">Dropper</button>';
    html += '</div>';
    if (state.titrationApparatusChoice2 === 'volumetric-pipette') {
      html += '<div class="feedback feedback-correct">Correct. A volumetric pipette measures a fixed volume (e.g. 25.00 mL) precisely.</div>';
    } else if (state.titrationApparatusChoice2 && state.titrationApparatusChoice2 !== 'volumetric-pipette') {
      html += '<div class="feedback feedback-incorrect">Incorrect. A volumetric pipette is used to measure a fixed volume precisely.</div>';
    }
    html += '<div class="sim-note">ChemSim educational simulation choice: Standard chemistry conventions used for apparatus identification.</div>';
    html += '</div>';
    return html;
  },

  renderFillBurette: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Fill the Burette</h3>';
    html += '<p>Rinse the burette with HCl solution, then fill it above the zero mark.</p>';
    html += '<p>Open the tap to remove air bubbles and adjust to exactly 0.00 mL.</p>';
    html += '<p class="detail-label">Simulated titrant</p>';
    html += '<p>HCl concentration: <strong>' + sim.hclConcentration.toFixed(4) + ' mol/L</strong></p>';
    html += '<div class="sim-note">Simulated educational value \u2014 not a real laboratory measurement.</div>';
    if (!state.titrationBuretteFilled) {
      html += '<div data-action="fill-burette" class="btn btn-primary">Fill Burette</div>';
    } else {
      html += '<div class="feedback feedback-correct">Burette filled and ready. Initial reading: 0.00 mL.</div>';
    }
    html += '</div>';
    return html;
  },

  renderMeasureSample: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Measure the NaOH Sample</h3>';
    html += '<p>Using the volumetric pipette, measure 25.00 mL of NaOH solution into the conical flask.</p>';
    html += '<p>Add 2\u20133 drops of phenolphthalein indicator. The solution will turn <strong>pink</strong>.</p>';
    html += '<p class="detail-label">Simulated sample</p>';
    html += '<p>NaOH volume: <strong>' + sim.naohVolume.toFixed(2) + ' mL</strong></p>';
    html += '<div class="sim-note">Simulated educational value \u2014 not a real laboratory measurement.</div>';
    if (!state.titrationSampleMeasured) {
      html += '<div data-action="measure-sample" class="btn btn-primary">Measure Sample</div>';
    } else {
      html += '<div class="feedback feedback-correct">NaOH sample prepared with indicator. Solution is pink.</div>';
    }
    html += '</div>';
    return html;
  },

  renderTitrate: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var trialNum = state.titrationTrialIndex + 1;
    var totalTrials = sim.trials.length;
    var html = '<div class="stage-card"><h3 class="stage-card-title">Titrate \u2014 Trial ' + trialNum + ' of ' + totalTrials + '</h3>';
    html += '<p>Slowly add HCl from the burette while watching the flask colour.</p>';
    html += '<p>Use the <strong>stopcock slider</strong> to control the flow rate.</p>';
    html += '<p class="detail-label">Current burette reading</p>';
    html += '<p class="temp-display">' + state.titrationVolume.toFixed(2) + ' mL</p>';
    html += '<div class="form-group"><label class="form-label">Stopcock Control</label>';
    html += '<input type="range" id="stopcock-slider" min="0" max="100" value="0" class="form-range">';
    html += '<p class="text-sm text-secondary">Slide to open the stopcock. Move toward endpoint carefully.</p></div>';
    if (state.titrationEndpointReached && !state.titrationEndpointPassed) {
      html += '<div class="feedback feedback-correct">Endpoint reached! The pink colour has just disappeared. Stop adding HCl.</div>';
    } else if (state.titrationEndpointPassed) {
      html += '<div class="feedback feedback-incorrect">Endpoint passed! Too much HCl was added. The solution is now acidic.</div>';
    }
    if (state.titrationEndpointReached || state.titrationEndpointPassed) {
      html += '<div data-action="record-titre" class="btn btn-accent">Record Titre</div>';
    }
    html += '<div class="sim-note">\u26a0 This is a simulated titration. Volume values are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderEndpoint: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Endpoint Observation</h3>';
    html += '<p>The endpoint has been reached.</p>';
    html += '<p class="detail-label">What happened at the endpoint?</p>';
    html += '<p>The <strong>pink colour disappeared</strong> and the solution became <strong>colourless</strong> after adding one extra drop of HCl.</p>';
    html += '<p>This indicates that all the NaOH has been neutralised by the HCl.</p>';
    html += '<p class="detail-label">Reaction</p>';
    html += '<p class="instruction-formula">NaOH(aq) + HCl(aq) \u2192 NaCl(aq) + H\u2082O(l)</p>';
    html += '<div class="sim-note">ChemSim educational simulation choice: Phenolphthalein indicator (colourless in acid, pink in base).</div>';
    html += '</div>';
    return html;
  },

  renderRecord: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Record Titration Results</h3>';
    html += '<p>Record the burette readings for each trial.</p>';
    html += '<table class="table"><thead><tr><th>Trial</th><th>Initial (mL)</th><th>Final (mL)</th><th>Titre (mL)</th></tr></thead><tbody>';
    for (var i = 0; i < sim.trials.length; i++) {
      var t = sim.trials[i];
      html += '<tr>';
      html += '<td>' + (i + 1) + (i === 0 ? ' (rough)' : ' (concordant)') + '</td>';
      html += '<td>' + t.initial.toFixed(2) + '</td>';
      html += '<td>' + t.final.toFixed(2) + '</td>';
      html += '<td>' + t.titre.toFixed(2) + '</td>';
      html += '</tr>';
    }
    html += '</tbody></table>';
    html += '<p class="detail-label" style="margin-top:0.75rem;">Mean titre (concordant): ' + sim.meanTitre.toFixed(2) + ' mL</p>';
    html += '<div class="sim-note">All values are simulated educational values, not real laboratory measurements.</div>';
    html += '</div>';
    return html;
  },

  renderCalculate: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Calculate NaOH Molarity</h3>';
    html += '<p class="instruction-formula">M(NaOH) \u00d7 V(NaOH) = M(HCl) \u00d7 V(HCl)</p>';
    html += '<p class="detail-label">Known values (simulated)</p>';
    html += '<p>HCl concentration: ' + sim.hclConcentration.toFixed(4) + ' mol/L</p>';
    html += '<p>HCl volume (mean titre): ' + sim.meanTitre.toFixed(2) + ' mL = ' + (sim.meanTitre / 1000).toFixed(6) + ' L</p>';
    html += '<p>NaOH volume: ' + sim.naohVolume.toFixed(2) + ' mL = ' + (sim.naohVolume / 1000).toFixed(6) + ' L</p>';
    html += '<p class="detail-label" style="margin-top:0.75rem;">Calculate M(NaOH)</p>';
    html += '<p>M(NaOH) = [M(HCl) \u00d7 V(HCl)] / V(NaOH)</p>';
    html += '<p>M(NaOH) = [' + sim.hclConcentration.toFixed(4) + ' \u00d7 ' + sim.meanTitre.toFixed(2) + '] / ' + sim.naohVolume.toFixed(2) + '</p>';
    html += '<div class="form-group"><label class="form-label">Your answer (mol/L):</label>';
    html += '<input type="number" step="0.0001" min="0" max="1" id="calc-answer" value="' + ChemSim.escapeHtml(String(state.titrationCalcAnswer)) + '" class="form-input" style="width:120px;margin-top:0.25rem;">';
    html += '<div data-action="check-calc" class="btn btn-accent" style="margin-left:0.5rem;display:inline-block;">Check</div></div>';
    if (state.titrationCalcChecked) {
      var userVal = parseFloat(state.titrationCalcAnswer);
      if (!isNaN(userVal) && Math.abs(userVal - sim.expectedMolarity) < 0.002) {
        html += '<div class="feedback feedback-correct">Correct! M(NaOH) = ' + sim.expectedMolarity.toFixed(4) + ' mol/L</div>';
      } else {
        html += '<div class="feedback feedback-incorrect">Expected ~' + sim.expectedMolarity.toFixed(4) + ' mol/L. Check your calculation.</div>';
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
  draw: function(canvas, ctx, state, exp) {
    var sim = SIMULATION_CONFIG['A4'];
    if (!sim) return;
    var cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    var b = sim.burette;
    var f = sim.flask;
    var st = sim.stand;
    var cl = sim.clamp;

    this.drawStand(ctx, st);
    this.drawClamp(ctx, cl, b);
    this.drawBurette(ctx, b, sim, state);
    this.drawFlask(ctx, f, sim, state);
    this.drawLabel(ctx, b, f, state);
  },

  drawStand: function(ctx, st) {
    ctx.fillStyle = '#666';
    ctx.fillRect(st.x, st.y, st.width, st.height);
    ctx.fillStyle = '#888';
    ctx.fillRect(st.x - 15, st.y + st.height - 5, st.width + 30, 8);
  },

  drawClamp: function(ctx, cl, b) {
    ctx.fillStyle = '#555';
    ctx.fillRect(cl.x, cl.y, cl.width, cl.height);
    ctx.fillRect(b.x - 3, cl.y + 2, 6, cl.height - 4);
  },

  drawBurette: function(ctx, b, sim, state) {
    ctx.fillStyle = '#e8e8e8';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.fillRect(b.x, b.y, b.width, b.height);
    ctx.strokeRect(b.x, b.y, b.width, b.height);

    var mlToPixel = b.height / b.maxML;
    var liquidTop = b.y + state.titrationVolume * mlToPixel;
    ctx.fillStyle = 'rgba(180, 210, 240, 0.5)';
    ctx.fillRect(b.x + 2, liquidTop, b.width - 4, b.y + b.height - liquidTop - 2);

    ctx.strokeStyle = '#4a90d9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(b.x + 2, liquidTop);
    ctx.lineTo(b.x + b.width - 2, liquidTop);
    ctx.stroke();

    for (var ml = 0; ml <= b.maxML; ml += 5) {
      var y = b.y + ml * mlToPixel;
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(b.x, y);
      ctx.lineTo(b.x + (ml % 10 === 0 ? 10 : 5), y);
      ctx.stroke();
      if (ml % 10 === 0) {
        ctx.fillStyle = '#666';
        ctx.font = '9px sans-serif';
        ctx.fillText(ml + '', b.x + 12, y + 3);
      }
    }

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('burette (HCl)', b.x - 10, b.y - 8);
  },

  drawFlask: function(ctx, f, sim, state) {
    ctx.fillStyle = '#f0f0f0';
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2, f.height * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);
    ctx.strokeRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);

    var frac = Math.min(state.titrationVolume / sim.endpointVolume, 1.2);
    var r, g, b2;
    if (frac < 0.85) {
      r = 220; g = 100; b2 = 180;
    } else if (frac < 1.0) {
      var t = (frac - 0.85) / 0.15;
      r = Math.round(220 - t * 200);
      g = Math.round(100 - t * 80);
      b2 = Math.round(180 - t * 160);
    } else {
      r = 255; g = 255; b2 = 255;
    }
    ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b2 + ', 0.6)';
    ctx.beginPath();
    ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2 - 3, f.height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#555';
    ctx.font = '10px sans-serif';
    ctx.fillText('conical flask (NaOH + indicator)', f.x - 30, f.y + f.height + 15);
  },

  drawLabel: function(ctx, b, f, state) {
    var vol = state.titrationVolume.toFixed(2);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Delivered: ' + vol + ' mL', b.x + b.width + 8, b.y + b.height / 2);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText('(simulated)', b.x + b.width + 8, b.y + b.height / 2 + 12);

    if (state.titrationEndpointReached && !state.titrationEndpointPassed) {
      ctx.fillStyle = 'rgba(40, 167, 69, 0.7)';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('\u2713 Endpoint reached', f.x - 20, f.y - 15);
    } else if (state.titrationEndpointPassed) {
      ctx.fillStyle = 'rgba(220, 53, 69, 0.7)';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('\u2717 Endpoint passed!', f.x - 20, f.y - 15);
    }
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    var canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    var sim = SIMULATION_CONFIG['A4'];
    if (!sim) return;

    if (stage === 'fillBurette' && !state.titrationBuretteFilled) {
      var nearBurette = mx >= sim.burette.x - 20 && mx <= sim.burette.x + sim.burette.width + 20 &&
        my >= sim.burette.y - 10 && my <= sim.burette.y + sim.burette.height + 10;
      if (nearBurette) {
        state.titrationBuretteFilled = true;
      }
    }
    if (stage === 'measureSample' && !state.titrationSampleMeasured) {
      var nearFlask = mx >= sim.flask.x - 20 && mx <= sim.flask.x + sim.flask.width + 20 &&
        my >= sim.flask.y - 20 && my <= sim.flask.y + sim.flask.height + 20;
      if (nearFlask) {
        state.titrationSampleMeasured = true;
      }
    }
  }
};
