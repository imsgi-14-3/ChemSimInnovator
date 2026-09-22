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
    var bk = sim.beaker;
    var paperW = sim.paper.width;
    var paperH = sim.paper.height;
    var paperX = bk.cx - paperW / 2;
    var paperTop = bk.rimY + 15;
    var baseAbsY = paperTop + sim.paper.baselineY;
    var topAbsY = paperTop + sim.paper.topY;
    return { cw: cw, ch: ch, paperW: paperW, paperH: paperH, paperX: paperX, paperTop: paperTop, baseAbsY: baseAbsY, topAbsY: topAbsY, sim: sim };
  },

  draw: function(canvas, ctx, state, exp) {
    var sim = SIMULATION_CONFIG[exp.id];
    if (!sim) return;
    var g = this.getGeometry(canvas, sim);
    ctx.clearRect(0, 0, g.cw, g.ch);
    this.drawBench(ctx, g);
    this.drawInkBottles(ctx, g);
    this.drawCapillary(ctx, g);
    this.drawPencil(ctx, g);
    this.drawRuler(ctx, g);
    this.drawSmallBeaker(ctx, g);
    this.drawLargeBeaker(ctx, g);
    this.drawPaperStrip(ctx, g);
    this.drawStick(ctx, g);
    this.drawClip(ctx, g);
    if (state.currentStage === 'prepare') this.drawPrepareTool(ctx, g, state);
    if (state.baselineDrawn || state.currentStage === 'baseline') this.drawBaseline(ctx, g);
    if (state.sampleApplied || state.currentStage === 'sample') this.drawSampleSpot(ctx, g);
    if (state.currentStage === 'setup') this.drawSetupSolvent(ctx, g, state);
    if (state.currentStage === 'run' && state.simulation) this.drawRunningSim(ctx, g, state);
    if (['observe','markFront','measure','calculate','interpret','conclude','complete'].indexOf(state.currentStage) !== -1 && state.simulation) this.drawCompletedChrom(ctx, g, state);
    if (state.currentStage === 'measure') this.drawMeasureOverlay(ctx, g, state);
    this.drawLabels(ctx, g);
  },

  drawBench: function(ctx, g) {
    var benchY = 500;
    var bg = ctx.createLinearGradient(0, benchY, 0, g.ch);
    bg.addColorStop(0, '#5a5a5a');
    bg.addColorStop(0.02, '#4a4a4a');
    bg.addColorStop(1, '#333');
    ctx.fillStyle = bg;
    ctx.fillRect(0, benchY, g.cw, g.ch - benchY);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(g.cw, benchY);
    ctx.stroke();
  },

  drawLargeBeaker: function(ctx, g) {
    var bk = g.sim.beaker;
    var bx = bk.cx - bk.w / 2;
    var by = bk.rimY;
    var bw = bk.w;
    var bh = bk.h;
    ctx.save();
    ctx.fillStyle = 'rgba(220,235,248,0.18)';
    ctx.strokeStyle = 'rgba(140,170,200,0.7)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(bx + 8, by);
    ctx.lineTo(bx + bw - 8, by);
    ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + 8);
    ctx.lineTo(bx + bw, by + bh - 8);
    ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - 8, by + bh);
    ctx.lineTo(bx + 8, by + bh);
    ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - 8);
    ctx.lineTo(bx, by + 8);
    ctx.quadraticCurveTo(bx, by, bx + 8, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var spoutW = 20;
    ctx.beginPath();
    ctx.moveTo(bx + bw - 8, by);
    ctx.lineTo(bx + bw + spoutW, by - 6);
    ctx.lineTo(bx + bw + spoutW - 4, by + 2);
    ctx.lineTo(bx + bw - 8, by + 4);
    ctx.strokeStyle = 'rgba(140,170,200,0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();
    var solY = by + bh - bk.solventLevel * bh;
    ctx.fillStyle = 'rgba(170,210,245,0.35)';
    ctx.beginPath();
    ctx.moveTo(bx + 3, solY);
    ctx.lineTo(bx + bw - 3, solY);
    ctx.lineTo(bx + bw - 3, by + bh - 3);
    ctx.quadraticCurveTo(bx + bw - 3, by + bh, bx + bw - 8, by + bh);
    ctx.lineTo(bx + 8, by + bh);
    ctx.quadraticCurveTo(bx + 3, by + bh, bx + 3, by + bh - 3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(100,160,220,0.3)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(bx + 3, solY);
    ctx.lineTo(bx + bw - 3, solY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(100,100,100,0.5)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    var marks = [50, 100, 150, 200, 250];
    for (var i = 0; i < marks.length; i++) {
      var my = by + bh - (marks[i] / 250) * bh * 0.85;
      ctx.fillRect(bx + bw - 18, my, 12, 1);
      if (marks[i] % 100 === 0) {
        ctx.fillRect(bx + bw - 25, my, 18, 1);
      }
      ctx.fillText(marks[i] + '', bx + bw - 28, my + 3);
    }
    ctx.textAlign = 'left';
    ctx.restore();
  },

  drawPaperStrip: function(ctx, g) {
    ctx.save();
    ctx.fillStyle = '#f8f8f8';
    ctx.strokeStyle = '#c0c0c0';
    ctx.lineWidth = 1;
    ctx.fillRect(g.paperX, g.paperTop, g.paperW, g.paperH);
    ctx.strokeRect(g.paperX, g.paperTop, g.paperW, g.paperH);
    ctx.restore();
  },

  drawStick: function(ctx, g) {
    var st = g.sim.stick;
    ctx.save();
    var sg = ctx.createLinearGradient(st.x, st.y, st.x, st.y + st.h);
    sg.addColorStop(0, '#d4a853');
    sg.addColorStop(0.3, '#e8c478');
    sg.addColorStop(0.5, '#f0d48a');
    sg.addColorStop(0.7, '#e8c478');
    sg.addColorStop(1, '#c49a45');
    ctx.fillStyle = sg;
    ctx.fillRect(st.x, st.y, st.w, st.h);
    ctx.strokeStyle = '#a08030';
    ctx.lineWidth = 1;
    ctx.strokeRect(st.x, st.y, st.w, st.h);
    ctx.fillStyle = '#c49a45';
    ctx.beginPath();
    ctx.moveTo(st.x, st.y);
    ctx.lineTo(st.x - 10, st.y + st.h / 2);
    ctx.lineTo(st.x, st.y + st.h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  drawClip: function(ctx, g) {
    var cl = g.sim.clip;
    var cx = cl.cx;
    var top = cl.cy - cl.h / 2;
    ctx.save();
    ctx.fillStyle = '#222';
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - cl.w / 2, top);
    ctx.lineTo(cx + cl.w / 2, top);
    ctx.lineTo(cx + cl.w / 2 + 4, top + cl.h * 0.4);
    ctx.lineTo(cx + cl.w / 2, top + cl.h);
    ctx.lineTo(cx - cl.w / 2, top + cl.h);
    ctx.lineTo(cx - cl.w / 2 - 4, top + cl.h * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#555';
    ctx.fillRect(cx - cl.w / 2 + 2, top + 2, cl.w - 4, 4);
    ctx.restore();
  },

  drawInkBottles: function(ctx, g) {
    var bottles = g.sim.inkBottles;
    for (var i = 0; i < bottles.length; i++) {
      var b = bottles[i];
      var bx = b.cx - b.w / 2;
      var by = b.cy - b.h / 2;
      ctx.save();
      ctx.fillStyle = b.glassColor;
      ctx.beginPath();
      ctx.moveTo(bx + 6, by + 22);
      ctx.quadraticCurveTo(bx + 2, by + 22, bx + 2, by + 28);
      ctx.lineTo(bx + 2, by + b.h - 6);
      ctx.quadraticCurveTo(bx + 2, by + b.h, bx + 8, by + b.h);
      ctx.lineTo(bx + b.w - 8, by + b.h);
      ctx.quadraticCurveTo(bx + b.w - 2, by + b.h, bx + b.w - 2, by + b.h - 6);
      ctx.lineTo(bx + b.w - 2, by + 28);
      ctx.quadraticCurveTo(bx + b.w - 2, by + 22, bx + b.w - 6, by + 22);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,100,100,0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      var liqY = by + 30;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bx + 6, by + 22);
      ctx.quadraticCurveTo(bx + 2, by + 22, bx + 2, by + 28);
      ctx.lineTo(bx + 2, by + b.h - 6);
      ctx.quadraticCurveTo(bx + 2, by + b.h, bx + 8, by + b.h);
      ctx.lineTo(bx + b.w - 8, by + b.h);
      ctx.quadraticCurveTo(bx + b.w - 2, by + b.h, bx + b.w - 2, by + b.h - 6);
      ctx.lineTo(bx + b.w - 2, by + 28);
      ctx.quadraticCurveTo(bx + b.w - 2, by + 22, bx + b.w - 6, by + 22);
      ctx.closePath();
      ctx.clip();
      var lg = ctx.createLinearGradient(bx, liqY, bx, by + b.h);
      lg.addColorStop(0, b.liquidColor);
      lg.addColorStop(1, b.liquidColor);
      ctx.fillStyle = lg;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(bx, liqY, b.w, by + b.h - liqY);
      ctx.globalAlpha = 1;
      ctx.restore();
      ctx.strokeStyle = 'rgba(200,200,200,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bx + 6, by + 24);
      ctx.lineTo(bx + 4, by + b.h - 12);
      ctx.stroke();
      ctx.fillStyle = b.capColor;
      ctx.beginPath();
      ctx.moveTo(bx + 8, by + 22);
      ctx.lineTo(bx + b.w - 8, by + 22);
      ctx.lineTo(bx + b.w - 6, by + 10);
      ctx.quadraticCurveTo(bx + b.w / 2, by + 4, bx + 6, by + 10);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.ellipse(bx + b.w / 2, by + 8, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#666';
      ctx.beginPath();
      ctx.ellipse(bx + b.w / 2, by + 6, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      var labelY = by + b.h - 22;
      ctx.fillRect(bx + 5, labelY, b.w - 10, 18);
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(bx + 5, labelY, b.w - 10, 18);
      ctx.fillStyle = '#333';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      var lines = b.label.split(' ');
      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], b.cx, labelY + 8 + j * 9);
      }
      ctx.textAlign = 'left';
      ctx.restore();
    }
  },

  drawSmallBeaker: function(ctx, g) {
    var sb = g.sim.solventBeaker;
    var bx = sb.cx - sb.w / 2;
    var by = sb.cy - sb.h / 2;
    ctx.save();
    ctx.fillStyle = 'rgba(215,230,245,0.2)';
    ctx.strokeStyle = 'rgba(130,160,195,0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + 5, by);
    ctx.lineTo(bx + sb.w - 5, by);
    ctx.quadraticCurveTo(bx + sb.w, by, bx + sb.w, by + 5);
    ctx.lineTo(bx + sb.w, by + sb.h - 5);
    ctx.quadraticCurveTo(bx + sb.w, by + sb.h, bx + sb.w - 5, by + sb.h);
    ctx.lineTo(bx + 5, by + sb.h);
    ctx.quadraticCurveTo(bx, by + sb.h, bx, by + sb.h - 5);
    ctx.lineTo(bx, by + 5);
    ctx.quadraticCurveTo(bx, by, bx + 5, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    var solY = by + sb.h - sb.solventLevel * sb.h;
    ctx.fillStyle = 'rgba(165,205,240,0.4)';
    ctx.fillRect(bx + 2, solY, sb.w - 4, by + sb.h - solY - 2);
    ctx.strokeStyle = 'rgba(200,200,200,0.3)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(bx + 5, by + 4);
    ctx.lineTo(bx + 3, by + sb.h - 8);
    ctx.stroke();
    var spoutW = 12;
    ctx.beginPath();
    ctx.moveTo(bx + sb.w - 5, by);
    ctx.lineTo(bx + sb.w + spoutW, by - 5);
    ctx.lineTo(bx + sb.w + spoutW - 3, by + 2);
    ctx.lineTo(bx + sb.w - 5, by + 3);
    ctx.strokeStyle = 'rgba(130,160,195,0.65)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    var dp = g.sim.dropper;
    if (dp) {
      var dx = dp.cx;
      var dpTop = by - 15;
      var dpBot = by + sb.h * 0.6;
      ctx.fillStyle = 'rgba(200,220,240,0.3)';
      ctx.strokeStyle = 'rgba(130,160,195,0.5)';
      ctx.lineWidth = 1;
      ctx.fillRect(dx - 2, dpTop + 20, 4, dpBot - dpTop - 20);
      ctx.strokeRect(dx - 2, dpTop + 20, 4, dpBot - dpTop - 20);
      ctx.fillStyle = '#ddd';
      ctx.beginPath();
      ctx.ellipse(dx, dpTop + 18, 6, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#bbb';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.fillStyle = '#ccc';
      ctx.beginPath();
      ctx.ellipse(dx, dpTop + 10, 7, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#aaa';
      ctx.stroke();
    }
    ctx.restore();
  },

  drawCapillary: function(ctx, g) {
    var cp = g.sim.capillary;
    ctx.save();
    var angle = Math.atan2(cp.y2 - cp.y1, cp.x2 - cp.x1);
    var len = Math.sqrt(Math.pow(cp.x2 - cp.x1, 2) + Math.pow(cp.y2 - cp.y1, 2));
    ctx.translate(cp.x1, cp.y1);
    ctx.rotate(angle);
    ctx.fillStyle = 'rgba(200,225,250,0.4)';
    ctx.strokeStyle = 'rgba(140,170,200,0.6)';
    ctx.lineWidth = 1;
    ctx.fillRect(0, -2, len, 4);
    ctx.strokeRect(0, -2, len, 4);
    ctx.restore();
  },

  drawPencil: function(ctx, g) {
    var p = g.sim.pencil;
    ctx.save();
    var pg = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
    pg.addColorStop(0, '#f0c040');
    pg.addColorStop(0.5, '#e8b830');
    pg.addColorStop(1, '#d0a020');
    ctx.fillStyle = pg;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.strokeStyle = '#b08818';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#f5e0a0';
    ctx.fillRect(p.x + p.w - 22, p.y + 1, 20, p.h - 2);
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - 10, p.y + p.h / 2);
    ctx.lineTo(p.x, p.y + p.h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  drawRuler: function(ctx, g) {
    var r = g.sim.ruler;
    ctx.save();
    var rg = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
    rg.addColorStop(0, '#c8c8c8');
    rg.addColorStop(0.5, '#e0e0e0');
    rg.addColorStop(1, '#b0b0b0');
    ctx.fillStyle = rg;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = '#666';
    ctx.font = '7px sans-serif';
    ctx.textAlign = 'center';
    for (var i = 0; i <= 10; i++) {
      var mx = r.x + 8 + i * (r.w - 16) / 10;
      var mh = i % 5 === 0 ? 6 : 3;
      ctx.fillRect(mx, r.y, 0.5, mh);
      if (i % 2 === 0) ctx.fillText(i + '', mx, r.y + r.h - 3);
    }
    ctx.textAlign = 'left';
    ctx.restore();
  },

  drawBaseline: function(ctx, g) {
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(g.paperX + 8, g.baseAbsY);
    ctx.lineTo(g.paperX + g.paperW - 8, g.baseAbsY);
    ctx.stroke();
  },

  drawSampleSpot: function(ctx, g) {
    var sx = g.paperX + g.paperW / 2;
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(sx, g.baseAbsY, 5, 0, Math.PI * 2);
    ctx.fill();
  },

  drawPrepareTool: function(ctx, g, state) {
    if (state.prepareTool === 'pencil') {
      ctx.fillStyle = '#e8b830';
      ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 5, 40, 10);
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(g.paperX - 50, g.paperTop + g.paperH / 2 - 5);
      ctx.lineTo(g.paperX - 60, g.paperTop + g.paperH / 2);
      ctx.lineTo(g.paperX - 50, g.paperTop + g.paperH / 2 + 5);
      ctx.closePath();
      ctx.fill();
    } else if (state.prepareTool === 'pen') {
      ctx.fillStyle = '#222';
      ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 4, 36, 8);
      ctx.fillStyle = '#0044cc';
      ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 4, 6, 8);
    }
  },

  drawSetupSolvent: function(ctx, g, state) {
    var slider = document.getElementById('solvent-slider');
    var val = slider ? parseInt(slider.value, 10) : 50;
    var bk = g.sim.beaker;
    var bx = bk.cx - bk.w / 2;
    var by = bk.rimY;
    var bh = bk.h;
    var solY = by + bh - (val / 100) * bh * 0.4;
    ctx.fillStyle = 'rgba(170,210,245,0.35)';
    ctx.fillRect(bx + 3, solY, bk.w - 6, by + bh - solY - 3);
    ctx.strokeStyle = 'rgba(100,160,220,0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(bx + 3, solY);
    ctx.lineTo(bx + bk.w - 3, solY);
    ctx.stroke();
    ctx.setLineDash([]);
    this.drawBaseline(ctx, g);
  },

  drawRunningSim: function(ctx, g, state) {
    var elapsed = Date.now() - state.simulation.startTime;
    var progress = Math.min(elapsed / g.sim.animationDurationMs, 1);
    var solventFrontY = g.sim.paper.baselineY - progress * (g.sim.paper.baselineY - g.sim.paper.topY);
    var solventAbsY = g.paperTop + (solventFrontY - g.sim.paper.topY);
    ctx.fillStyle = 'rgba(170,210,245,0.2)';
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
    ctx.fillStyle = 'rgba(170,210,245,0.15)';
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

  drawLabels: function(ctx, g) {
    ctx.save();
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.textAlign = 'left';
    ctx.fillText('Ink samples', 55, 510);
    ctx.fillText('Chromatography paper', g.paperX + g.paperW + 10, g.paperTop + 60);
    ctx.fillText('Baseline', g.paperX + g.paperW + 10, g.baseAbsY + 4);
    ctx.fillText('Separated ink', g.paperX + g.paperW + 10, g.baseAbsY - 60);
    ctx.fillText('components', g.paperX + g.paperW + 10, g.baseAbsY - 48);
    ctx.fillText('Wooden stick and clip', g.sim.stick.x + g.sim.stick.w / 2 - 30, g.sim.stick.y - 10);
    ctx.fillText('Solvent', g.sim.beaker.cx + 20, g.sim.beaker.rimY + g.sim.beaker.h - 15);
    ctx.fillText('Solvent (with dropper)', g.sim.solventBeaker.cx + 50, g.sim.solventBeaker.cy - 30);
    ctx.fillText('Capillary tube', g.sim.capillary.x1 - 10, g.sim.capillary.y1 + 18);
    ctx.fillText('Pencil (for baseline)', g.sim.pencil.x + 20, g.sim.pencil.y + g.sim.pencil.h + 15);
    ctx.fillText('Ruler', g.sim.ruler.x + g.sim.ruler.w / 2 - 10, g.sim.ruler.y - 8);
    ctx.textAlign = 'left';
    ctx.restore();
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
