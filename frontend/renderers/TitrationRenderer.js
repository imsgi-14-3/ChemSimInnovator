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
    this.drawStand(ctx, sim);
    this.drawNaOHBottle(ctx, sim);
    this.drawHClBottle(ctx, sim);
    this.drawIndicatorBottle(ctx, sim);
    this.drawPipette(ctx, sim);
    this.drawWhiteTile(ctx, sim);
    this.drawFlask(ctx, sim, state);
    this.drawBurette(ctx, sim, state);
    this.drawClamp(ctx, sim);
    this.drawStopcock(ctx, sim, state);
    this.drawLabels(ctx, sim, state);
  },

  drawStand: function(ctx, sim) {
    var s = sim.stand;
    ctx.save();
    var baseGrad = ctx.createLinearGradient(s.baseX, s.baseY, s.baseX, s.baseY + s.baseH);
    baseGrad.addColorStop(0, '#4a4a4a');
    baseGrad.addColorStop(0.5, '#3a3a3a');
    baseGrad.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.moveTo(s.baseX + 3, s.baseY);
    ctx.lineTo(s.baseX + s.baseW - 3, s.baseY);
    ctx.quadraticCurveTo(s.baseX + s.baseW, s.baseY, s.baseX + s.baseW, s.baseY + 3);
    ctx.lineTo(s.baseX + s.baseW, s.baseY + s.baseH - 3);
    ctx.quadraticCurveTo(s.baseX + s.baseW, s.baseY + s.baseH, s.baseX + s.baseW - 3, s.baseY + s.baseH);
    ctx.lineTo(s.baseX + 3, s.baseY + s.baseH);
    ctx.quadraticCurveTo(s.baseX, s.baseY + s.baseH, s.baseX, s.baseY + s.baseH - 3);
    ctx.lineTo(s.baseX, s.baseY + 3);
    ctx.quadraticCurveTo(s.baseX, s.baseY, s.baseX + 3, s.baseY);
    ctx.closePath();
    ctx.fill();
    var rodGrad = ctx.createLinearGradient(s.rodX - s.rodW / 2, 0, s.rodX + s.rodW / 2, 0);
    rodGrad.addColorStop(0, '#aaa');
    rodGrad.addColorStop(0.3, '#ddd');
    rodGrad.addColorStop(0.5, '#eee');
    rodGrad.addColorStop(0.7, '#ccc');
    rodGrad.addColorStop(1, '#999');
    ctx.fillStyle = rodGrad;
    ctx.fillRect(s.rodX - s.rodW / 2, s.rodTopY, s.rodW, s.rodBotY - s.rodTopY);
    ctx.restore();
  },

  drawClamp: function(ctx, sim) {
    var cl = sim.clamp;
    ctx.save();
    var clampGrad = ctx.createLinearGradient(cl.cx - cl.w / 2, cl.cy, cl.cx + cl.w / 2, cl.cy);
    clampGrad.addColorStop(0, '#3366aa');
    clampGrad.addColorStop(0.3, '#5588cc');
    clampGrad.addColorStop(0.5, '#6699dd');
    clampGrad.addColorStop(0.7, '#4477bb');
    clampGrad.addColorStop(1, '#2255aa');
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
    ctx.strokeStyle = '#1a4488';
    ctx.lineWidth = 1;
    ctx.stroke();
    var bx = sim.burette.cx;
    ctx.fillStyle = '#555';
    ctx.fillRect(bx - 3, cl.cy - cl.h / 2 + 2, 6, cl.h - 4);
    ctx.restore();
  },

  drawBurette: function(ctx, sim, state) {
    var b = sim.burette;
    var bx = b.cx - b.w / 2;
    var by = b.topY;
    ctx.save();
    var glassGrad = ctx.createLinearGradient(bx, by, bx + b.w, by);
    glassGrad.addColorStop(0, 'rgba(160,195,225,0.3)');
    glassGrad.addColorStop(0.1, 'rgba(200,225,245,0.15)');
    glassGrad.addColorStop(0.3, 'rgba(255,255,255,0.05)');
    glassGrad.addColorStop(0.7, 'rgba(255,255,255,0.03)');
    glassGrad.addColorStop(0.9, 'rgba(200,225,245,0.12)');
    glassGrad.addColorStop(1, 'rgba(160,195,225,0.28)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(70,110,150,0.5)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(bx, by, b.w, b.h);
    ctx.strokeRect(bx, by, b.w, b.h);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx + 2, by);
    ctx.lineTo(bx + 2, by + b.h);
    ctx.stroke();
    var mlToPixel = b.h / b.maxML;
    var vol = state.titrationVolume || 0;
    var liquidTop = by + vol * mlToPixel;
    var liquidGrad = ctx.createLinearGradient(bx, liquidTop, bx, by + b.h);
    liquidGrad.addColorStop(0, 'rgba(80,155,220,0.3)');
    liquidGrad.addColorStop(0.5, 'rgba(65,140,210,0.4)');
    liquidGrad.addColorStop(1, 'rgba(50,125,200,0.5)');
    ctx.fillStyle = liquidGrad;
    ctx.fillRect(bx + 2, liquidTop, b.w - 4, by + b.h - liquidTop - 2);
    ctx.fillStyle = 'rgba(45,115,185,0.45)';
    ctx.beginPath();
    ctx.ellipse(bx + b.w / 2, liquidTop, b.w / 2 - 2, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(45,85,125,0.5)';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'right';
    for (var ml = 0; ml <= b.maxML; ml += 5) {
      var y = by + ml * mlToPixel;
      var lw = (ml % 10 === 0) ? 9 : 4;
      ctx.strokeStyle = 'rgba(55,95,135,0.4)';
      ctx.lineWidth = (ml % 10 === 0) ? 1 : 0.5;
      ctx.beginPath();
      ctx.moveTo(bx + b.w, y);
      ctx.lineTo(bx + b.w - lw, y);
      ctx.stroke();
      if (ml % 10 === 0) {
        ctx.fillText(ml + '', bx + b.w - 12, y + 3);
      }
    }
    ctx.textAlign = 'left';
    var tipW = 5;
    var tipH = 16;
    ctx.fillStyle = 'rgba(160,195,225,0.18)';
    ctx.strokeStyle = 'rgba(70,110,150,0.5)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(bx + b.w / 2 - tipW / 2, by + b.h, tipW, tipH);
    ctx.strokeRect(bx + b.w / 2 - tipW / 2, by + b.h, tipW, tipH);
    if (state.titrationVolume > 0 && vol < b.maxML) {
      var dropY = by + b.h + tipH + 3;
      ctx.fillStyle = 'rgba(60,145,215,0.5)';
      ctx.beginPath();
      ctx.ellipse(bx + b.w / 2, dropY, 2, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  },

  drawStopcock: function(ctx, sim, state) {
    var sc = sim.stopcock;
    var bx = sim.burette.cx;
    var by = sim.burette.topY + sim.burette.h;
    ctx.save();
    ctx.fillStyle = '#e8e8e8';
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.fillRect(bx - sc.w / 2, by + 16, sc.w, sc.h);
    ctx.strokeRect(bx - sc.w / 2, by + 16, sc.w, sc.h);
    var knobX = bx + sc.w / 2 + 9;
    var knobY = by + 16 + sc.h / 2;
    ctx.fillStyle = '#4477bb';
    ctx.beginPath();
    ctx.arc(knobX, knobY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3366aa';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  },

  drawWhiteTile: function(ctx, sim) {
    var t = sim.whiteTile;
    ctx.save();
    var tileGrad = ctx.createLinearGradient(t.cx - t.w / 2, t.cy, t.cx + t.w / 2, t.cy);
    tileGrad.addColorStop(0, '#e5e5e5');
    tileGrad.addColorStop(0.15, '#f2f2f2');
    tileGrad.addColorStop(0.5, '#fafafa');
    tileGrad.addColorStop(0.85, '#f0f0f0');
    tileGrad.addColorStop(1, '#ddd');
    ctx.fillStyle = tileGrad;
    ctx.strokeStyle = '#c5c5c5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(t.cx - t.w / 2 + 2, t.cy - t.h / 2);
    ctx.lineTo(t.cx + t.w / 2 - 2, t.cy - t.h / 2);
    ctx.quadraticCurveTo(t.cx + t.w / 2, t.cy - t.h / 2, t.cx + t.w / 2, t.cy - t.h / 2 + 2);
    ctx.lineTo(t.cx + t.w / 2, t.cy + t.h / 2 - 2);
    ctx.quadraticCurveTo(t.cx + t.w / 2, t.cy + t.h / 2, t.cx + t.w / 2 - 2, t.cy + t.h / 2);
    ctx.lineTo(t.cx - t.w / 2 + 2, t.cy + t.h / 2);
    ctx.quadraticCurveTo(t.cx - t.w / 2, t.cy + t.h / 2, t.cx - t.w / 2, t.cy + t.h / 2 - 2);
    ctx.lineTo(t.cx - t.w / 2, t.cy - t.h / 2 + 2);
    ctx.quadraticCurveTo(t.cx - t.w / 2, t.cy - t.h / 2, t.cx - t.w / 2 + 2, t.cy - t.h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  drawFlask: function(ctx, sim, state) {
    var f = sim.flask;
    var fLeft = f.cx - f.bodyW / 2;
    var fRight = f.cx + f.bodyW / 2;
    var fBottom = f.cy + f.bodyH / 2;
    var fShoulder = f.cy - f.bodyH / 2;
    var neckTop = fShoulder - f.neckH;
    ctx.save();
    var flaskGrad = ctx.createLinearGradient(fLeft, f.cy, fRight, f.cy);
    flaskGrad.addColorStop(0, 'rgba(155,190,220,0.32)');
    flaskGrad.addColorStop(0.1, 'rgba(200,225,245,0.16)');
    flaskGrad.addColorStop(0.3, 'rgba(255,255,255,0.06)');
    flaskGrad.addColorStop(0.7, 'rgba(255,255,255,0.04)');
    flaskGrad.addColorStop(0.9, 'rgba(200,225,245,0.14)');
    flaskGrad.addColorStop(1, 'rgba(155,190,220,0.3)');
    ctx.fillStyle = flaskGrad;
    ctx.strokeStyle = 'rgba(70,110,150,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(f.cx - f.neckW / 2, neckTop);
    ctx.lineTo(f.cx - f.neckW / 2, fShoulder);
    ctx.lineTo(fLeft + 12, fShoulder);
    ctx.quadraticCurveTo(fLeft, fShoulder, fLeft, fShoulder + 12);
    ctx.lineTo(fLeft, fBottom - 12);
    ctx.quadraticCurveTo(fLeft, fBottom, fLeft + 12, fBottom);
    ctx.lineTo(fRight - 12, fBottom);
    ctx.quadraticCurveTo(fRight, fBottom, fRight, fBottom - 12);
    ctx.lineTo(fRight, fShoulder + 12);
    ctx.quadraticCurveTo(fRight, fShoulder, fRight - 12, fShoulder);
    ctx.lineTo(f.cx + f.neckW / 2, fShoulder);
    ctx.lineTo(f.cx + f.neckW / 2, neckTop);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(fLeft + 5, fShoulder + 16);
    ctx.lineTo(fLeft + 3, fBottom - 18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(fLeft + 8, fShoulder + 16);
    ctx.lineTo(fLeft + 6, fBottom - 18);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(fRight - 12, fShoulder + 22);
    ctx.lineTo(fRight - 10, fBottom - 22);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(f.cx, neckTop + 8, f.neckW / 2 - 2, 2.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    var vol = state.titrationVolume || 0;
    var hasSample = state.titrationSampleMeasured;
    var frac = hasSample ? Math.min(vol / sim.endpointVolume, 1.2) : 0;
    var r, g, b2;
    if (!hasSample) { r = 255; g = 255; b2 = 255; }
    else if (frac < 0.85) { r = 210; g = 60; b2 = 155; }
    else if (frac < 1.0) { var t = (frac - 0.85) / 0.15; r = Math.round(210 - t * 195); g = Math.round(60 - t * 45); b2 = Math.round(155 - t * 140); }
    else { r = 255; g = 255; b2 = 255; }
    var liquidY = fBottom - 16;
    if (hasSample) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(fLeft + 12, fShoulder);
      ctx.quadraticCurveTo(fLeft, fShoulder, fLeft, fShoulder + 12);
      ctx.lineTo(fLeft, fBottom - 12);
      ctx.quadraticCurveTo(fLeft, fBottom, fLeft + 12, fBottom);
      ctx.lineTo(fRight - 12, fBottom);
      ctx.quadraticCurveTo(fRight, fBottom, fRight, fBottom - 12);
      ctx.lineTo(fRight, fShoulder + 12);
      ctx.quadraticCurveTo(fRight, fShoulder, fRight - 12, fShoulder);
      ctx.closePath();
      ctx.clip();
      var liqGrad = ctx.createLinearGradient(fLeft, liquidY - 45, fLeft, fBottom);
      liqGrad.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b2 + ',0.3)');
      liqGrad.addColorStop(0.6, 'rgba(' + r + ',' + g + ',' + b2 + ',0.45)');
      liqGrad.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b2 + ',0.55)');
      ctx.fillStyle = liqGrad;
      ctx.fillRect(fLeft, liquidY - 45, f.bodyW, fBottom - liquidY + 45);
      ctx.fillStyle = 'rgba(' + Math.min(r + 30, 255) + ',' + Math.min(g + 30, 255) + ',' + Math.min(b2 + 30, 255) + ',0.22)';
      ctx.beginPath();
      ctx.ellipse(f.cx, liquidY - 45, f.bodyW / 2 - 6, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = 'rgba(55,85,115,0.4)';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'right';
    var marks = [50, 100, 150, 200, 250];
    for (var i = 0; i < marks.length; i++) {
      var my = fBottom - 16 - (marks[i] / 250) * (f.bodyH - 22);
      ctx.fillRect(fRight - 12, my, 6, 0.7);
      if (marks[i] % 100 === 0) {
        ctx.fillRect(fRight - 18, my, 12, 0.7);
      }
      ctx.fillText(marks[i] + '', fRight - 21, my + 3);
    }
    ctx.textAlign = 'left';
    ctx.restore();
  },

  drawNaOHBottle: function(ctx, sim) {
    this.drawReagentBottle(ctx, sim.naohBottle);
  },

  drawHClBottle: function(ctx, sim) {
    this.drawReagentBottle(ctx, sim.hclBottle);
  },

  drawReagentBottle: function(ctx, b) {
    var bx = b.cx - b.w / 2;
    var by = b.cy - b.h / 2;
    var neckW = b.w * 0.32;
    var neckH = b.h * 0.2;
    var bodyTop = by + neckH;
    ctx.save();
    var glassGrad = ctx.createLinearGradient(bx, by + 25, bx + b.w, by + 25);
    glassGrad.addColorStop(0, 'rgba(180,205,225,0.4)');
    glassGrad.addColorStop(0.12, 'rgba(215,235,250,0.2)');
    glassGrad.addColorStop(0.3, 'rgba(255,255,255,0.06)');
    glassGrad.addColorStop(0.7, 'rgba(255,255,255,0.04)');
    glassGrad.addColorStop(0.88, 'rgba(215,235,250,0.18)');
    glassGrad.addColorStop(1, 'rgba(180,205,225,0.38)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(80,110,140,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + (b.w - neckW) / 2, by + 12);
    ctx.lineTo(bx + (b.w - neckW) / 2, bodyTop);
    ctx.lineTo(bx + 2, bodyTop + 5);
    ctx.lineTo(bx + 2, by + b.h - 5);
    ctx.quadraticCurveTo(bx + 2, by + b.h, bx + 8, by + b.h);
    ctx.lineTo(bx + b.w - 8, by + b.h);
    ctx.quadraticCurveTo(bx + b.w - 2, by + b.h, bx + b.w - 2, by + b.h - 5);
    ctx.lineTo(bx + b.w - 2, bodyTop + 5);
    ctx.lineTo(bx + b.w - (b.w - neckW) / 2, bodyTop);
    ctx.lineTo(bx + b.w - (b.w - neckW) / 2, by + 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx + 4, bodyTop + 8);
    ctx.lineTo(bx + 3, by + b.h - 12);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx + 6, bodyTop + 8);
    ctx.lineTo(bx + 5, by + b.h - 12);
    ctx.stroke();
    ctx.fillStyle = b.capColor;
    ctx.fillRect(bx + (b.w - neckW) / 2, by + 4, neckW, 10);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx + (b.w - neckW) / 2, by + 4, neckW, 10);
    ctx.beginPath();
    ctx.ellipse(bx + b.w / 2, by + 2, neckW / 2 + 2, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    var labelY = by + b.h - 26;
    ctx.fillRect(bx + 4, labelY, b.w - 8, 22);
    ctx.strokeStyle = '#c0c0c0';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx + 4, labelY, b.w - 8, 22);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center';
    var lines = b.label.split('\n');
    for (var j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], b.cx, labelY + 8 + j * 10);
    }
    ctx.textAlign = 'left';
    ctx.restore();
  },

  drawIndicatorBottle: function(ctx, sim) {
    var ib = sim.indicatorBottle;
    var bx = ib.cx - ib.w / 2;
    var by = ib.cy - ib.h / 2;
    ctx.save();
    var glassGrad = ctx.createLinearGradient(bx, by, bx + ib.w, by);
    glassGrad.addColorStop(0, 'rgba(190,210,230,0.35)');
    glassGrad.addColorStop(0.5, 'rgba(255,255,255,0.08)');
    glassGrad.addColorStop(1, 'rgba(190,210,230,0.35)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(90,120,150,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + 5, by + 8);
    ctx.quadraticCurveTo(bx + 2, by + 8, bx + 2, by + 12);
    ctx.lineTo(bx + 2, by + ib.h - 4);
    ctx.quadraticCurveTo(bx + 2, by + ib.h, bx + 6, by + ib.h);
    ctx.lineTo(bx + ib.w - 6, by + ib.h);
    ctx.quadraticCurveTo(bx + ib.w - 2, by + ib.h, bx + ib.w - 2, by + ib.h - 4);
    ctx.lineTo(bx + ib.w - 2, by + 12);
    ctx.quadraticCurveTo(bx + ib.w - 2, by + 8, bx + ib.w - 5, by + 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bx + 2, by + 12);
    ctx.lineTo(bx + 2, by + ib.h - 4);
    ctx.quadraticCurveTo(bx + 2, by + ib.h, bx + 6, by + ib.h);
    ctx.lineTo(bx + ib.w - 6, by + ib.h);
    ctx.quadraticCurveTo(bx + ib.w - 2, by + ib.h, bx + ib.w - 2, by + ib.h - 4);
    ctx.lineTo(bx + ib.w - 2, by + 12);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = ib.liquidColor;
    ctx.fillRect(bx, by + 18, ib.w, ib.h - 18);
    ctx.restore();
    ctx.fillStyle = ib.capColor;
    ctx.beginPath();
    ctx.moveTo(bx + 6, by + 8);
    ctx.lineTo(bx + ib.w - 6, by + 8);
    ctx.lineTo(bx + ib.w - 5, by + 1);
    ctx.quadraticCurveTo(bx + ib.w / 2, by - 2, bx + 5, by + 1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    var labelY = by + ib.h - 18;
    ctx.fillRect(bx + 3, labelY, ib.w - 6, 14);
    ctx.strokeStyle = '#c0c0c0';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx + 3, labelY, ib.w - 6, 14);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 5.5px sans-serif';
    ctx.textAlign = 'center';
    var lines = ib.label.split('\n');
    for (var j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], ib.cx, labelY + 6 + j * 7);
    }
    ctx.textAlign = 'left';
    ctx.restore();
  },

  drawPipette: function(ctx, sim) {
    var p = sim.pipette;
    ctx.save();
    var angle = Math.atan2(p.y2 - p.y1, p.x2 - p.x1);
    var len = Math.sqrt(Math.pow(p.x2 - p.x1, 2) + Math.pow(p.y2 - p.y1, 2));
    ctx.translate(p.x1, p.y1);
    ctx.rotate(angle);
    var tubeW = 3.5;
    var tubeGrad = ctx.createLinearGradient(0, -tubeW, 0, tubeW);
    tubeGrad.addColorStop(0, 'rgba(190,215,240,0.22)');
    tubeGrad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    tubeGrad.addColorStop(1, 'rgba(190,215,240,0.22)');
    ctx.fillStyle = tubeGrad;
    ctx.strokeStyle = 'rgba(110,150,180,0.5)';
    ctx.lineWidth = 1;
    ctx.fillRect(0, -tubeW / 2, len - 14, tubeW);
    ctx.strokeRect(0, -tubeW / 2, len - 14, tubeW);
    ctx.beginPath();
    ctx.moveTo(len - 14, -tubeW / 2);
    ctx.lineTo(len, -1);
    ctx.lineTo(len, 1);
    ctx.lineTo(len - 14, tubeW / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var bulbX = -16;
    var bulbW = 12;
    var bulbH = 9;
    ctx.fillStyle = '#ddd';
    ctx.beginPath();
    ctx.ellipse(bulbX + bulbW / 2, 0, bulbW / 2, bulbH / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  },

  drawLabels: function(ctx, sim, state) {
    ctx.save();
    ctx.font = '9px sans-serif';
    ctx.fillStyle = 'rgba(30,30,30,0.75)';
    ctx.strokeStyle = 'rgba(30,30,30,0.35)';
    ctx.lineWidth = 0.7;
    function drawLine(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    drawLine(360, 42, 380, 42);
    ctx.fillText('Burette (with HCl)', 383, 46);
    drawLine(50, 338, 130, 338);
    ctx.fillText('NaOH solution', 10, 330);
    ctx.fillText('(unknown molarity)', 10, 341);
    drawLine(150, 338, 185, 338);
    ctx.fillText('HCl solution', 120, 330);
    ctx.fillText('(0.100 M)', 120, 341);
    drawLine(400, 478, 420, 478);
    ctx.fillText('Conical flask', 423, 475);
    ctx.fillText('(NaOH + indicator)', 423, 486);
    drawLine(495, 455, 510, 455);
    ctx.fillText('Phenolphthalein', 440, 450);
    ctx.fillText('indicator', 440, 461);
    drawLine(415, 556, 425, 556);
    ctx.fillText('White tile', 428, 560);
    drawLine(500, 583, 515, 583);
    ctx.fillText('Pipette', 445, 580);
    ctx.fillText('(for initial sample)', 445, 591);
    ctx.restore();
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    var canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    var sim = SIMULATION_CONFIG['A4'];
    if (!sim) return;

    if (stage === 'fillBurette' && !state.titrationBuretteFilled) {
      var nearBurette = mx >= sim.burette.cx - 30 && mx <= sim.burette.cx + 30 &&
        my >= sim.burette.topY - 10 && my <= sim.burette.topY + sim.burette.h + 30;
      if (nearBurette) {
        state.titrationBuretteFilled = true;
      }
    }
    if (stage === 'measureSample' && !state.titrationSampleMeasured) {
      var f = sim.flask;
      var nearFlask = mx >= f.cx - f.bodyW / 2 - 20 && mx <= f.cx + f.bodyW / 2 + 20 &&
        my >= f.cy - f.bodyH / 2 - 20 && my <= f.cy + f.bodyH / 2 + 20;
      if (nearFlask) {
        state.titrationSampleMeasured = true;
      }
    }
  }
};
