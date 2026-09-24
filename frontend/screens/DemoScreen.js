/* ================================================================
   Demo Mode Screen — Full guided demonstration engine
   ================================================================ */

var DemoEngine = (function() {
  'use strict';

  var STEPS = [
    { id: 'practical', label: 'Practical Lab', instruction: 'Demonstrate the experiment workflow. This short animated demonstration shows how ChemSim guides students through paper chromatography — apparatus, setup, observation, and separation. No student input is required in demo mode.' },
    { id: 'log', label: 'Experiment Log', instruction: 'Show how the completed practical is automatically recorded in the browser\'s local storage.' },
    { id: 'revision', label: 'Learning & Revision', instruction: 'Show how students can browse and review all 13 prescribed practicals with search and filtering.' },
    { id: 'mystery', label: 'Mystery Lab', instruction: 'Demonstrate the investigation interface: choose tests, collect evidence, form a hypothesis, and identify the unknown sample.' },
    { id: 'pba', label: 'PBA Practice', instruction: 'Demonstrate the practical-skills assessment workflow with timed questions and scoring.' }
  ];

  function esc(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- Renderers ---- */

  function renderIntro() {
    var h = '<div class="demo-panel demo-panel-center">';
    h += '<h2>ChemSim Demonstration Mode</h2>';
    h += '<p class="text-secondary">A guided tour of ChemSim\'s interactive virtual chemistry laboratory.</p>';
    h += '<div class="demo-feature-list">';
    h += '<p>This demonstration walks through ChemSim\'s key features:</p>';
    h += '<ol>';
    for (var i = 0; i < STEPS.length; i++) {
      h += '<li><strong>' + STEPS[i].label + '</strong></li>';
    }
    h += '</ol>';
    h += '<p class="text-secondary" style="font-size:0.85rem;">The demonstration uses existing educational simulations. You may interact with each module normally.</p>';
    h += '</div>';
    h += '<button class="btn btn-primary demo-start-btn" id="btn-demo-start">Start Demo</button>';
    h += '<br>';
    h += '<button class="btn btn-secondary" id="btn-demo-exit" style="margin-top:0.75rem;">Exit Demo</button>';
    h += '</div>';
    return h;
  }

  function renderProgress(stepIndex) {
    var h = '<div class="demo-progress">';
    for (var i = 0; i < STEPS.length; i++) {
      var cls = 'demo-progress-dot';
      if (i < stepIndex) cls += ' completed';
      else if (i === stepIndex) cls += ' active';
      h += '<span class="' + cls + '" title="' + STEPS[i].label + '"></span>';
    }
    h += '<span class="demo-progress-label">Step ' + (stepIndex + 1) + ' of ' + STEPS.length + ': ' + STEPS[stepIndex].label + '</span>';
    h += '</div>';
    return h;
  }

  function renderStepPractical(demoState) {
    var h = '<div class="demo-panel">';
    h += '<div class="demo-instruction"><strong>Presenter:</strong> ' + STEPS[0].instruction + '</div>';
    h += '<div class="demo-step-content">';
    h += '<h3>Paper Chromatography (A2) \u2014 Animated Demo</h3>';
    h += '<p class="text-secondary">Auto-playing animation of the step-by-step procedure. No student input required in demo mode.</p>';
    h += '<div class="demo-anim-wrap"><canvas id="demo-anim-canvas" width="560" height="360"></canvas></div>';
    h += '<div class="demo-anim-controls">';
    h += '<button class="btn btn-secondary" id="btn-demo-anim-replay">Replay Animation</button>';
    h += '</div>';
    h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    h += '</div>';
    h += '<div class="demo-footer"><button class="btn btn-secondary" id="btn-demo-exit">Exit Demo</button></div>';
    h += '</div>';
    return h;
  }

  function renderStepLog() {
    var records = ExpLog.load();
    var h = '<div class="demo-panel">';
    h += '<div class="demo-instruction"><strong>Presenter:</strong> ' + STEPS[1].instruction + '</div>';
    h += '<div class="demo-step-content">';
    h += '<h3>Experiment Log</h3>';
    if (records.length > 0) {
      h += '<p class="text-secondary">' + records.length + ' record(s) saved locally in this browser.</p>';
      h += '<div class="demo-log-preview">';
      for (var i = 0; i < Math.min(records.length, 3); i++) {
        var r = records[i];
        h += '<div class="log-card">';
        h += '<strong>' + esc(r.title) + '</strong><br>';
        h += '<small class="text-secondary">' + esc(r.date) + ' ' + esc(r.time) + '</small>';
        h += '</div>';
      }
      if (records.length > 3) h += '<p class="text-secondary" style="font-size:0.85rem;">...and ' + (records.length - 3) + ' more</p>';
      h += '</div>';
    } else {
      h += '<p class="text-secondary">No records yet. Complete a practical to see it logged here.</p>';
    }
    h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    h += '</div>';
    h += '<div class="demo-footer"><button class="btn btn-secondary" id="btn-demo-exit">Exit Demo</button></div>';
    h += '</div>';
    return h;
  }

  function renderStepRevision() {
    var h = '<div class="demo-panel">';
    h += '<div class="demo-instruction"><strong>Presenter:</strong> ' + STEPS[2].instruction + '</div>';
    h += '<div class="demo-step-content">';
    h += '<h3>Learning & Revision Hub</h3>';
    h += '<p class="text-secondary">Browse all 13 prescribed practicals (5 Major + 8 Minor)</p>';
    h += '<div class="demo-feature-box">';
    h += '<p><strong>Features:</strong></p>';
    h += '<ul>';
    h += '<li>Search by title, SLO, or keyword</li>';
    h += '<li>Filter by Major / Minor</li>';
    h += '<li>View full practical details</li>';
    h += '<li>Launch any practical directly</li>';
    h += '</ul>';
    h += '</div>';
    h += '<button class="btn btn-primary" id="btn-demo-open-revision">Open Revision Hub &rarr;</button>';
    h += '<br>';
    h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    h += '</div>';
    h += '<div class="demo-footer"><button class="btn btn-secondary" id="btn-demo-exit">Exit Demo</button></div>';
    h += '</div>';
    return h;
  }

  function renderStepMystery() {
    var h = '<div class="demo-panel">';
    h += '<div class="demo-instruction"><strong>Presenter:</strong> ' + STEPS[3].instruction + '</div>';
    h += '<div class="demo-step-content">';
    h += '<h3>Mystery Lab</h3>';
    h += '<p class="text-secondary">Investigate an unknown sample using virtual tests</p>';
    h += '<div class="demo-feature-box">';
    h += '<p><strong>Investigation process:</strong></p>';
    h += '<ul>';
    h += '<li>Choose from 5 virtual tests</li>';
    h += '<li>Record observations and evidence</li>';
    h += '<li>Form a hypothesis</li>';
    h += '<li>Identify the unknown sample</li>';
    h += '</ul>';
    h += '</div>';
    h += '<button class="btn btn-primary demo-mystery-btn" id="btn-demo-open-mystery">Open Mystery Lab &rarr;</button>';
    h += '<br>';
    h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    h += '</div>';
    h += '<div class="demo-footer"><button class="btn btn-secondary" id="btn-demo-exit">Exit Demo</button></div>';
    h += '</div>';
    return h;
  }

  function renderStepPBA() {
    var h = '<div class="demo-panel">';
    h += '<div class="demo-instruction"><strong>Presenter:</strong> ' + STEPS[4].instruction + '</div>';
    h += '<div class="demo-step-content">';
    h += '<h3>PBA Practice</h3>';
    h += '<p class="text-secondary">Practical-skills assessment workflow</p>';
    h += '<div class="demo-feature-box">';
    h += '<p><strong>PBA features:</strong></p>';
    h += '<ul>';
    h += '<li>20-mark timed assessment</li>';
    h += '<li>Major and Minor question sections</li>';
    h += '<li>Multiple question types</li>';
    h += '<li>Instant scoring and review</li>';
    h += '</ul>';
    h += '</div>';
    h += '<button class="btn btn-primary" id="btn-demo-open-pba">Open PBA Practice &rarr;</button>';
    h += '<br>';
    h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    h += '</div>';
    h += '<div class="demo-footer"><button class="btn btn-secondary" id="btn-demo-exit">Exit Demo</button></div>';
    h += '</div>';
    return h;
  }

  function renderComplete() {
    var h = '<div class="demo-panel demo-panel-center">';
    h += '<h2>Demonstration Complete</h2>';
    h += '<p class="text-secondary">You have explored ChemSim\'s key features:</p>';
    h += '<div class="demo-feature-box">';
    h += '<ul>';
    h += '<li><strong>Practical Lab</strong> &mdash; Interactive experiments with simulation</li>';
    h += '<li><strong>PBA Practice</strong> &mdash; Timed assessment workflow</li>';
    h += '<li><strong>Mystery Lab</strong> &mdash; Unknown sample investigation</li>';
    h += '<li><strong>Experiment Log</strong> &mdash; Local record keeping</li>';
    h += '<li><strong>Learning & Revision</strong> &mdash; Practical reference hub</li>';
    h += '</ul>';
    h += '</div>';
    h += '<p class="text-secondary" style="font-size:0.85rem;">ChemSim is an educational simulation for FBISE SSC Chemistry Practical Based Assessment preparation.</p>';
    h += '<button class="btn btn-primary" id="btn-demo-restart" style="margin-right:0.5rem;">Restart Demo</button>';
    h += '<button class="btn btn-secondary" id="btn-demo-exit-complete">Return to Main Menu</button>';
    h += '</div>';
    return h;
  }

  /* ---- Main Render ---- */

  var animCanvas = null;
  var animCtx = null;
  var animReqId = null;
  var animStart = 0;

  function roundRect(ctx, x, y, w, h, r) {
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

  /* Paper chromatography animated demo — self-playing, no user input */
  function runPracticalAnimation() {
    var canvas = document.getElementById('demo-anim-canvas');
    if (!canvas) return;
    animCanvas = canvas;
    animCtx = canvas.getContext('2d');
    animStart = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    if (animReqId) cancelAnimationFrame(animReqId);
    animReqId = requestAnimationFrame(practicalAnimFrame);
  }

  function practicalAnimFrame(now) {
    var ctx = animCtx;
    if (!ctx) return;
    var W = animCanvas.width;
    var H = animCanvas.height;
    var elapsed = now - animStart;
    var cycle = 22000; /* ms for full loop */
    var t = (elapsed % cycle) / cycle; /* 0..1 */

    ctx.clearRect(0, 0, W, H);

    /* bench background */
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

    /* ---- phase helpers ---- */
    function phase(a, b) { /* returns 0..1 progress within phase window */
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    /* ---- beaker ---- */
    var beakerX = 150, beakerTopY = 130, beakerW = 200, beakerH = 200;
    var solventBaseY = beakerTopY + beakerH - 24;
    var solventMaxY = beakerTopY + 150; /* initial solvent fill stops */
    var solventFill = lerp(solventBaseY, solventMaxY, phase(0, 0.12)); /* beaker fills */

    /* paper strip */
    var paperX = beakerX + 70, paperW = 60, paperTopY = 60, paperBotY = beakerTopY + beakerH - 4;

    /* mobile phase rises on paper */
    var baselineY = paperTopY + 150;
    var solventFrontMaxY = paperTopY + 45; /* where front ends */
    var solventFront = lerp(baselineY + 10, solventFrontMaxY, phase(0.12, 0.55));

    /* components travel once front passes baseline */
    var sepProgress = phase(0.45, 0.85);
    var frontTravel = (baselineY + 10) - solventFrontMaxY;
    var redTravel = 0.82 * frontTravel;
    var blueTravel = 0.55 * frontTravel;
    var redY = baselineY - redTravel * sepProgress;
    var blueY = baselineY - blueTravel * sepProgress;

    /* glass beaker */
    ctx.save();
    /* solvent inside */
    ctx.beginPath();
    roundRect(ctx, beakerX, solventFill, beakerW, solventBaseY - solventFill, 6);
    ctx.closePath();
    var solGrad = ctx.createLinearGradient(0, solventFill, 0, solventBaseY);
    solGrad.addColorStop(0, 'rgba(96,165,250,0.55)');
    solGrad.addColorStop(1, 'rgba(37,99,235,0.80)');
    ctx.fillStyle = solGrad;
    ctx.fill();

    /* glass wall */
    ctx.beginPath();
    roundRect(ctx, beakerX, beakerTopY, beakerW, beakerH, 8);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    /* paper */
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(paperX, paperTopY, paperW, paperBotY - paperTopY);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(paperX, paperTopY, paperW, paperBotY - paperTopY);

    /* wet paper region (mobile phase travelled) */
    ctx.fillStyle = 'rgba(147,197,253,0.45)';
    ctx.fillRect(paperX + 1, solventFront, paperW - 2, paperBotY - solventFront);

    /* solvent front line on paper */
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(paperX + 1, solventFront);
    ctx.lineTo(paperX + paperW - 1, solventFront);
    ctx.stroke();
    ctx.setLineDash([]);

    /* baseline */
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 2]);
    ctx.beginPath();
    ctx.moveTo(paperX, baselineY);
    ctx.lineTo(paperX + paperW, baselineY);
    ctx.stroke();
    ctx.setLineDash([]);

    /* original sample spot */
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(paperX + paperW / 2, baselineY, 4, 0, Math.PI * 2);
    ctx.fill();

    /* separated components */
    if (sepProgress > 0) {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(paperX + paperW / 2 - 4, redY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.arc(paperX + paperW / 2 + 4, blueY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    /* result markers when separation is complete */
    if (sepProgress >= 1) {
      ctx.fillStyle = '#dc2626';
      ctx.fillText('Rf = 0.82', paperX + paperW + 8, redY + 4);
      ctx.fillStyle = '#2563eb';
      ctx.fillText('Rf = 0.55', paperX + paperW + 8, blueY + 4);
    }

    /* ---- labels ---- */
    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Beaker with solvent', beakerX + beakerW / 2, beakerTopY + beakerH + 20);
    ctx.fillText('Chromatography paper', paperX + paperW / 2, paperTopY - 10);
    ctx.fillText('Baseline', paperX + paperW / 2, baselineY + 16);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('Solvent front', paperX + paperW / 2, solventFront - 8);

    /* caption / stage narration */
    var caption = '';
    if (t < 0.12) caption = 'Step 1: Pour the solvent (mobile phase) into the beaker.';
    else if (t < 0.30) caption = 'Step 2: Mark the baseline with pencil and apply the ink sample.';
    else if (t < 0.45) caption = 'Step 3: Place the paper in the beaker \u2014 solvent must stay below the baseline.';
    else if (t < 0.60) caption = 'Step 4: The solvent rises up the paper and carries the ink components.';
    else if (t < 0.85) caption = 'Step 5: Components travel different distances \u2014 red travels faster than blue.';
    else caption = 'Result: the mixture is separated. Rf = distance moved by component \u00f7 distance moved by solvent front.';

    ctx.fillStyle = '#334155';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText(caption, W / 2, H - 10);

    /* progress ring indicator */
    ctx.strokeStyle = '#e65100';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(W - 22, 22, 10, -Math.PI / 2, -Math.PI / 2 + t * 2 * Math.PI);
    ctx.stroke();

    animReqId = requestAnimationFrame(practicalAnimFrame);
  }

  function stopAnimation() {
    if (animReqId) {
      cancelAnimationFrame(animReqId);
      animReqId = null;
    }
    animCanvas = null;
    animCtx = null;
  }

  function renderInto(appState) {
    var workspace = document.getElementById('workspace-content');
    if (!workspace) return;
    attachListeners(appState);
    var ds = appState.demoState;
    var screen = ds.screen;

    if (screen === 'practical') {
      workspace.innerHTML = renderStepPractical(ds);
      runPracticalAnimation();
    } else if (screen === 'log') {
      stopAnimation();
      workspace.innerHTML = renderStepLog();
    } else if (screen === 'revision') {
      stopAnimation();
      workspace.innerHTML = renderStepRevision();
    } else if (screen === 'mystery') {
      stopAnimation();
      workspace.innerHTML = renderStepMystery();
    } else if (screen === 'pba') {
      stopAnimation();
      workspace.innerHTML = renderStepPBA();
    } else if (screen === 'complete') {
      stopAnimation();
      workspace.innerHTML = renderComplete();
    } else {
      stopAnimation();
      workspace.innerHTML = renderIntro();
    }
  }

  /* ---- Event Handler ---- */

  var listenersAttached = false;

  function attachListeners(appState) {
    if (listenersAttached) return;
    var workspace = document.getElementById('workspace-content');
    if (!workspace) return;
    listenersAttached = true;

    workspace.addEventListener('click', function(e) {
      var target = e.target;
      var ds = appState.demoState;

      if (target.id === 'btn-demo-start') {
        ds.screen = 'practical';
        ds.step = 0;
        renderInto(appState);
        return;
      }
      if (target.id === 'btn-demo-exit' || target.id === 'btn-demo-exit-complete') {
        stopAnimation();
        appState.demoState = { screen: 'intro', step: 0 };
        appState.screen = 'home';
        ChemSim.goHome();
        return;
      }
      if (target.id === 'btn-demo-next-step') {
        stopAnimation();
        ds.step++;
        if (ds.step >= STEPS.length) {
          ds.screen = 'complete';
        } else {
          ds.screen = STEPS[ds.step].id;
        }
        renderInto(appState);
        return;
      }
      if (target.id === 'btn-demo-anim-replay') {
        runPracticalAnimation();
        return;
      }
      if (target.id === 'btn-demo-open-revision') {
        appState.screen = 'revision';
        ChemSim.navigateTo('revision');
        return;
      }
      if (target.id === 'btn-demo-open-mystery') {
        appState.screen = 'mystery';
        ChemSim.navigateTo('mystery');
        return;
      }
      if (target.id === 'btn-demo-open-pba') {
        appState.screen = 'pba';
        ChemSim.navigateTo('pba');
        return;
      }
      if (target.id === 'btn-demo-restart') {
        stopAnimation();
        ds.screen = 'intro';
        ds.step = 0;
        renderInto(appState);
        return;
      }
    });
  }

  return {
    STEPS: STEPS,
    renderInto: renderInto,
    attachListeners: attachListeners
  };
})();

/* Register demo screen with ChemSim */
ChemSim.registerScreen('demo', function(appState) {
  if (!appState.demoState) {
    appState.demoState = { screen: 'intro', step: 0 };
  }
  DemoEngine.attachListeners(appState);
  return ''; /* content rendered by renderInto */
});
