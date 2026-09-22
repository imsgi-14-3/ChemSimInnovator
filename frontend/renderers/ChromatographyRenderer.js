var ChromatographyRenderer = {
  renderStage: function(stage, exp, state, appState) {
    var html = '';
    switch(stage) {
      case 'prepare': html = this.renderPrepare(exp, state); break;
      case 'baseline': html = this.renderBaseline(exp, state); break;
      case 'sample': html = this.renderSample(exp, state); break;
      case 'setup': html = this.renderSetup(exp, state); break;
      case 'run': html = this.renderRun(exp, state); break;
      case 'observe': html = this.renderObserve(exp, state); break;
      case 'markFront': html = this.renderMarkFront(exp, state); break;
      case 'measure': html = this.renderMeasure(exp, state); break;
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
    var html = '<div class="stage-card"><h3 class="stage-card-title">Prepare the Chromatography Paper</h3>';
    html += '<p>Before beginning, select the correct tool for drawing the baseline.</p>';
    html += '<p class="instruction-highlight">Which tool should you use?</p>';
    html += '<div class="tool-options">';
    html += '<button class="btn ' + (state.prepareTool === 'pencil' ? 'btn-primary' : 'btn-secondary') + '" data-tool="pencil">Pencil</button>';
    html += '<button class="btn ' + (state.prepareTool === 'pen' ? 'btn-primary' : 'btn-secondary') + '" data-tool="pen">Pen (ink)</button>';
    html += '</div>';
    if (state.prepareTool === 'pen') {
      html += '<div class="feedback feedback-incorrect">Incorrect. Use pencil — ink dissolves in solvent and interferes with the chromatogram.</div>';
    }
    if (state.prepareTool === 'pencil') {
      html += '<div class="feedback feedback-correct">Correct! Pencil (graphite) does not dissolve in the solvent.</div>';
    }
    html += '<div class="sim-note">In a real laboratory, always use pencil for chromatography baselines.</div>';
    html += '</div>';
    return html;
  },

  renderBaseline: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Draw the Baseline</h3>';
    html += '<p>Click on the chromatography paper to draw the baseline with pencil.</p>';
    html += '<p>The baseline should be a straight horizontal line near the bottom of the paper.</p>';
    if (state.baselineDrawn) {
      html += '<div class="feedback feedback-correct">Baseline drawn with pencil.</div>';
    }
    html += '<div class="sim-note">Click on the paper in the simulation area to place the baseline.</div>';
    html += '</div>';
    return html;
  },

  renderSample: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Apply the Sample</h3>';
    html += '<p>Using the capillary tube, apply a small, concentrated spot of the sample at the centre of the baseline.</p>';
    html += '<p>Click on the baseline (the pencil line) to place the spot.</p>';
    if (state.sampleApplied) {
      html += '<div class="feedback feedback-correct">Sample applied at the centre of the baseline.</div>';
    }
    html += '<div class="sim-note">The spot should be small and concentrated.</div>';
    html += '</div>';
    return html;
  },

  renderSetup: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Set Up the Chromatography</h3>';
    html += '<p>Position the chromatography paper in the beaker with solvent.</p>';
    html += '<p>Key conditions:</p>';
    html += '<ul><li>The solvent level must be <strong>below</strong> the baseline.</li>';
    html += '<li>The paper must not touch the walls of the beaker.</li></ul>';
    html += '<div class="form-group"><label class="form-label">Solvent Level</label>';
    html += '<input type="range" id="solvent-slider" min="0" max="100" value="' + (state.solventPositioned ? '20' : '80') + '" class="form-range">';
    html += '<p class="text-sm text-secondary">Adjust so solvent level is below the baseline (dashed line).</p></div>';
    if (state.feedback === 'solvent_above_baseline') {
      html += '<div class="feedback feedback-incorrect">The solvent level is above the baseline. Lower the solvent level.</div>';
    }
    if (state.feedback === 'setup_ok') {
      html += '<div class="feedback feedback-correct">Setup verified. The solvent level is below the baseline.</div>';
    }
    html += '</div>';
    return html;
  },

  renderRun: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Run the Chromatography</h3>';
    html += '<p>The solvent is rising through the paper by capillary action.</p>';
    html += '<p>Observe the components separating as the solvent front advances.</p>';
    if (state.simulation && state.simulation.done) {
      html += '<div class="feedback feedback-correct">Chromatography complete.</div>';
    }
    html += '<div class="sim-note">Simulated animation. Observed colours and distances are educational values.</div>';
    html += '</div>';
    return html;
  },

  renderObserve: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var numComponents = sim ? sim.components.length : 0;
    var html = '<div class="stage-card"><h3 class="stage-card-title">Observe the Chromatogram</h3>';
    html += '<p>Examine the separated spots on the chromatogram.</p>';
    html += '<p>The mixture has separated into <strong>' + numComponents + ' distinct spots</strong>.</p>';
    html += '<div class="sim-note">Colours shown are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  renderMarkFront: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Mark the Solvent Front</h3>';
    html += '<p>Click on the paper to mark the position of the solvent front.</p>';
    html += '<p>This should be done immediately after removing the paper from the beaker.</p>';
    if (state.solventFrontMarked) {
      html += '<div class="feedback feedback-correct">Solvent front marked with pencil.</div>';
    }
    html += '<div class="sim-note">Click near the top of the wet area on the paper.</div>';
    html += '</div>';
    return html;
  },

  renderMeasure: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Measure Distances</h3>';
    html += '<p>Measure the distance from the baseline to each separated spot and to the solvent front.</p>';
    html += '<div class="sim-note">Distances are simulated educational values.</div>';
    if (state.measurePhase === 'done') {
      html += '<table class="table"><thead><tr><th>Component</th><th>Colour</th><th>Distance (cm)</th></tr></thead><tbody>';
      for (var i = 0; i < state.measuredComponents.length; i++) {
        var mc = state.measuredComponents[i];
        html += '<tr><td>' + ChemSim.escapeHtml(mc.name) + '</td>';
        html += '<td><span class="color-dot" style="background:' + mc.color + ';"></span></td>';
        html += '<td>' + mc.distance.toFixed(2) + '</td></tr>';
      }
      html += '<tr style="font-weight:600;"><td>Solvent front</td><td>-</td><td>' + state.solventFrontDist.toFixed(2) + '</td></tr>';
      html += '</tbody></table>';
    }
    html += '</div>';
    return html;
  },

  renderCalculate: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Calculate Rf Values</h3>';
    html += '<p class="instruction-formula">Rf = Distance traveled by component / Distance traveled by solvent front</p>';
    html += '<table class="table"><thead><tr><th>Component</th><th>Colour</th><th>Distance</th><th>Solvent</th><th>Your Rf</th><th></th></tr></thead><tbody>';
    for (var i = 0; i < sim.components.length; i++) {
      var c = sim.components[i];
      var dist = state.measuredComponents[i] ? state.measuredComponents[i].distance : 0;
      var sDist = state.solventFrontDist || 0;
      var key = 'rf_' + i;
      var userVal = state.rfAnswers[key] || '';
      html += '<tr><td>' + ChemSim.escapeHtml(c.name) + '</td>';
      html += '<td><span class="color-dot" style="background:' + c.color + ';"></span></td>';
      html += '<td>' + dist.toFixed(2) + '</td><td>' + sDist.toFixed(2) + '</td>';
      html += '<td><input type="number" step="0.01" min="0" max="1" id="' + key + '" value="' + ChemSim.escapeHtml(String(userVal)) + '" class="form-input form-input-sm rf-input"></td>';
      html += '<td><span class="rf-feedback" id="rf-fb-' + key + '"></span></td></tr>';
    }
    html += '</tbody></table>';
    html += '<div class="sim-note">Enter your calculated Rf values.</div>';
    html += '</div>';
    return html;
  },

  renderInterpret: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Interpret the Chromatogram</h3>';
    html += '<p>Based on your observations and measurements, interpret the chromatogram.</p>';
    html += '<p class="detail-label">Guiding question</p>';
    html += '<p>When the mixture separates into distinct spots, what does this tell you about the composition?</p>';
    html += '<div class="form-group"><label class="form-label">Your Interpretation</label>';
    html += '<textarea id="interpretation-input" class="form-textarea" placeholder="Write your interpretation here...">' + ChemSim.escapeHtml(state.interpretation) + '</textarea></div>';
    html += '</div>';
    return html;
  },

  renderConclude: function(exp, state) {
    var html = '<div class="stage-card"><h3 class="stage-card-title">Conclusion</h3>';
    html += '<p>Write your conclusion based on your observations, measurements, and interpretation.</p>';
    html += '<p>Your conclusion should address:</p>';
    html += '<ul><li>Whether the mixture was separated successfully</li>';
    html += '<li>How many components were identified</li>';
    html += '<li>The Rf values of each component</li></ul>';
    html += '<div class="form-group"><label class="form-label">Your Conclusion</label>';
    html += '<textarea id="conclusion-input" class="form-textarea" placeholder="Write your conclusion here...">' + ChemSim.escapeHtml(state.conclusion) + '</textarea></div>';
    html += '</div>';
    return html;
  },

  renderComplete: function(exp, state) {
    var sim = SIMULATION_CONFIG[exp.id];
    var html = '<div class="stage-card"><h3 class="stage-card-title">Experiment Complete</h3>';
    html += '<div class="detail-row"><span class="detail-label">Practical</span><span class="detail-value">' + ChemSim.escapeHtml(exp.title) + '</span></div>';
    html += '<div class="detail-row"><span class="detail-label">Section</span><span class="detail-value">' + (exp.section.charAt(0).toUpperCase() + exp.section.slice(1)) + ' Practical</span></div>';
    html += '<div class="detail-row"><span class="detail-label">SLO</span><span class="detail-value">' + exp.slos.join(', ') + '</span></div>';
    html += '<hr class="divider">';
    html += '<p><strong>Components separated:</strong> ' + sim.components.length + '</p>';
    for (var i = 0; i < sim.components.length; i++) {
      var c = sim.components[i];
      var dist = state.measuredComponents[i] ? state.measuredComponents[i].distance : 0;
      var rf = state.rfAnswers['rf_' + i] || '-';
      html += '<p>' + ChemSim.escapeHtml(c.name) + ' — <span class="color-dot" style="background:' + c.color + ';"></span> Distance: ' + dist.toFixed(2) + ' cm, Rf: ' + rf + '</p>';
    }
    html += '<p><strong>Solvent front:</strong> ' + (state.solventFrontDist ? state.solventFrontDist.toFixed(2) + ' cm' : '-') + '</p>';
    html += '<hr class="divider">';
    html += '<p class="detail-label">Your Interpretation</p><p>' + ChemSim.escapeHtml(state.interpretation || '-') + '</p>';
    html += '<p class="detail-label">Your Conclusion</p><p>' + ChemSim.escapeHtml(state.conclusion || '-') + '</p>';
    html += '<div class="sim-note">All measurements are simulated educational values.</div>';
    html += '</div>';
    return html;
  },

  /* Canvas Drawing */
  getGeometry: function(canvas, sim) {
    var cw = canvas.width, ch = canvas.height;
    var paperW = sim.paper.width, paperH = sim.paper.height;
    var paperX = (cw - paperW) / 2;
    var paperTop = (ch - paperH) / 2;
    var baseAbsY = paperTop + sim.paper.baselineY;
    var topAbsY = paperTop + sim.paper.topY;
    return { cw: cw, ch: ch, paperW: paperW, paperH: paperH, paperX: paperX, paperTop: paperTop, baseAbsY: baseAbsY, topAbsY: topAbsY, sim: sim };
  },

  draw: function(canvas, ctx, state, exp) {
    var sim = SIMULATION_CONFIG[exp.id];
    if (!sim) return;
    var g = this.getGeometry(canvas, sim);
    ctx.clearRect(0, 0, g.cw, g.ch);

    this.drawPaperStrip(ctx, g);
    this.drawBeakerBg(ctx, g);
    if (state.currentStage === 'prepare') this.drawPrepareTool(ctx, g, state);
    if (state.baselineDrawn || state.currentStage === 'baseline') this.drawBaseline(ctx, g);
    if (state.sampleApplied || state.currentStage === 'sample') this.drawSampleSpot(ctx, g);
    if (state.currentStage === 'setup') this.drawSetupSolvent(ctx, g, state);
    if (state.currentStage === 'run' && state.simulation) this.drawRunningSim(ctx, g, state);
    if (['observe','markFront','measure','calculate','interpret','conclude','complete'].indexOf(state.currentStage) !== -1 && state.simulation) this.drawCompletedChrom(ctx, g, state);
    if (state.currentStage === 'measure') this.drawMeasureOverlay(ctx, g, state);
  },

  drawPaperStrip: function(ctx, g) {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#b0b0b0';
    ctx.lineWidth = 1;
    ctx.fillRect(g.paperX, g.paperTop, g.paperW, g.paperH);
    ctx.strokeRect(g.paperX, g.paperTop, g.paperW, g.paperH);
  },

  drawBeakerBg: function(ctx, g) {
    var bx = g.paperX - 35;
    var bw = g.paperW + 70;
    var bh = g.paperH + 50;
    var by = g.paperTop + g.paperH - bh + 65;
    ctx.fillStyle = '#e8edf2';
    ctx.strokeStyle = '#9aa8b5';
    ctx.lineWidth = 2;
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeRect(bx, by, bw, bh);
  },

  drawPrepareTool: function(ctx, g, state) {
    if (state.prepareTool === 'pencil') {
      ctx.fillStyle = '#555';
      ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 5, 40, 10);
      ctx.fillStyle = '#333';
      ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 5, 8, 10);
    } else if (state.prepareTool === 'pen') {
      ctx.fillStyle = '#222';
      ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 4, 36, 8);
      ctx.fillStyle = '#0044cc';
      ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 4, 6, 8);
    }
  },

  drawBaseline: function(ctx, g) {
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(g.paperX + 10, g.baseAbsY);
    ctx.lineTo(g.paperX + g.paperW - 10, g.baseAbsY);
    ctx.stroke();
  },

  drawSampleSpot: function(ctx, g) {
    var sx = g.paperX + g.paperW / 2;
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(sx, g.baseAbsY, 5, 0, Math.PI * 2);
    ctx.fill();
  },

  drawSetupSolvent: function(ctx, g, state) {
    var slider = document.getElementById('solvent-slider');
    var val = slider ? parseInt(slider.value, 10) : 50;
    var bx = g.paperX - 35;
    var bw = g.paperW + 70;
    var bh = g.paperH + 50;
    var by = g.paperTop + g.paperH - bh + 65;
    var solventLevel = by + bh - (val / 100) * bh * 0.4;
    ctx.fillStyle = 'rgba(180, 210, 240, 0.5)';
    ctx.fillRect(bx + 2, solventLevel, bw - 4, by + bh - solventLevel - 2);
    ctx.strokeStyle = '#4a90d9';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(bx + 2, solventLevel);
    ctx.lineTo(bx + bw - 2, solventLevel);
    ctx.stroke();
    ctx.setLineDash([]);
    this.drawBaseline(ctx, g);
  },

  drawRunningSim: function(ctx, g, state) {
    var elapsed = Date.now() - state.simulation.startTime;
    var progress = Math.min(elapsed / g.sim.animationDurationMs, 1);
    var solventFrontY = g.sim.paper.baselineY - progress * (g.sim.paper.baselineY - g.sim.paper.topY);
    var solventAbsY = g.paperTop + solventFrontY;
    ctx.fillStyle = 'rgba(180, 210, 240, 0.2)';
    ctx.fillRect(g.paperX + 2, solventAbsY, g.paperW - 4, g.baseAbsY - solventAbsY);
    ctx.strokeStyle = 'rgba(100, 160, 220, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(g.paperX + 8, solventAbsY);
    ctx.lineTo(g.paperX + g.paperW - 8, solventAbsY);
    ctx.stroke();
    for (var i = 0; i < g.sim.components.length; i++) {
      var c = g.sim.components[i];
      var spotDist = progress * (g.sim.paper.baselineY - g.sim.paper.topY) * c.relativeRate;
      var spotAbsY = g.baseAbsY - spotDist;
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(g.paperX + g.paperW / 2, spotAbsY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    if (progress < 1) {
      var self = this;
      var canvas = ctx.canvas;
      requestAnimationFrame(function() { self.draw(canvas, ctx, state, state.experiment); });
    } else {
      state.simulation.done = true;
    }
  },

  drawCompletedChrom: function(ctx, g, state) {
    ctx.fillStyle = 'rgba(180, 210, 240, 0.15)';
    ctx.fillRect(g.paperX + 2, g.topAbsY, g.paperW - 4, g.baseAbsY - g.topAbsY);
    if (state.solventFrontMarked || state.currentStage === 'markFront') {
      ctx.strokeStyle = 'rgba(100, 160, 220, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(g.paperX + 8, g.topAbsY);
      ctx.lineTo(g.paperX + g.paperW - 8, g.topAbsY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    this.drawBaseline(ctx, g);
    for (var i = 0; i < g.sim.components.length; i++) {
      var c = g.sim.components[i];
      var spotDist = (g.sim.paper.baselineY - g.sim.paper.topY) * c.relativeRate;
      var spotAbsY = g.baseAbsY - spotDist;
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(g.paperX + g.paperW / 2, spotAbsY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  },

  drawMeasureOverlay: function(ctx, g, state) {
    if (state.measurePhase === 'baseline_done' || state.measurePhase === 'solvent_done' || state.measurePhase === 'done') {
      ctx.strokeStyle = 'rgba(220, 53, 69, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(g.paperX + g.paperW / 2 - 30, g.baseAbsY);
      ctx.lineTo(g.paperX + g.paperW / 2 + 30, g.baseAbsY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (state.measurePhase === 'solvent_done' || state.measurePhase === 'done') {
      ctx.strokeStyle = 'rgba(40, 167, 69, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(g.paperX + g.paperW / 2 - 30, g.topAbsY);
      ctx.lineTo(g.paperX + g.paperW / 2 + 30, g.topAbsY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  },

  /* Canvas Click Handling */
  handleClick: function(mx, my, state, stage, appState) {
    var canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    var sim = SIMULATION_CONFIG[appState.experimentId];
    if (!sim) return;
    var g = this.getGeometry(canvas, sim);
    
    switch(stage) {
      case 'baseline':
        if (mx >= g.paperX && mx <= g.paperX + g.paperW && Math.abs(my - g.baseAbsY) < 30) {
          state.baselineDrawn = true;
        }
        break;
      case 'sample':
        if (state.baselineDrawn && Math.abs(my - g.baseAbsY) < 15 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
          state.sampleApplied = true;
        }
        break;
      case 'markFront':
        if (state.simulation && state.simulation.done && Math.abs(my - g.topAbsY) < 40 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
          state.solventFrontMarked = true;
        }
        break;
      case 'measure':
        this.handleMeasureClick(g, mx, my, state, sim);
        break;
    }
  },

  handleMeasureClick: function(g, mx, my, state, sim) {
    if (state.measurePhase === 'idle') {
      if (Math.abs(my - g.baseAbsY) < 15 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
        state.measurePhase = 'baseline_done';
      }
    } else if (state.measurePhase === 'baseline_done') {
      if (Math.abs(my - g.topAbsY) < 25 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
        state.measurePhase = 'solvent_done';
        state.solventFrontDist = sim.solventFrontMaxDist / 35;
      }
    } else if (state.measurePhase === 'solvent_done') {
      for (var i = 0; i < sim.components.length; i++) {
        var c = sim.components[i];
        var spotDist = (sim.paper.baselineY - sim.paper.topY) * c.relativeRate;
        var spotAbsY = g.baseAbsY - spotDist;
        if (Math.abs(my - spotAbsY) < 15 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
          var already = state.measuredComponents.some(function(mc) { return mc.name === c.name; });
          if (!already) {
            state.measuredComponents.push({ name: c.name, color: c.color, distance: sim.solventFrontMaxDist * c.relativeRate / 35 });
            if (state.measuredComponents.length === sim.components.length) state.measurePhase = 'done';
          }
          break;
        }
      }
    }
  }
};
