/* ================================================================
   Demo Mode Screen — Full guided demonstration engine
   ================================================================ */

var DemoEngine = (function() {
  'use strict';

  var STEPS = [
    { id: 'practical', label: 'Practical Lab', instruction: 'Demonstrate the experiment workflow. Eleven of the thirteen prescribed practicals have a short auto-playing animated demonstration. No student input is required in demo mode.' },
    { id: 'log', label: 'Experiment Log', instruction: 'Show how the completed practical is automatically recorded in the browser\'s local storage.' },
    { id: 'revision', label: 'Learning & Revision', instruction: 'Show how students can browse and review all 13 prescribed practicals with search and filtering.' },
    { id: 'mystery', label: 'Mystery Lab', instruction: 'Demonstrate the investigation interface: choose tests, collect evidence, form a hypothesis, and identify the unknown sample.' },
    { id: 'pba', label: 'PBA Practice', instruction: 'Demonstrate the practical-skills assessment workflow with timed questions and scoring.' }
  ];

  var PRACTICAL_DEMOS = [
    { id: 'A1', code: 'A1', title: 'Fractional Distillation', short: 'Separate water and alcohol', anim: 'distill', section: 'major' },
    { id: 'A2', code: 'A2', title: 'Paper Chromatography', short: 'Separate a mixture of inks', anim: 'major', section: 'major' },
    { id: 'A3', code: 'A3', title: 'Pb\u00b2\u207a/Cd\u00b2\u207a Chromatography', short: 'Separate metal ions by paper', anim: 'ionChrom', section: 'major' },
    { id: 'A4', code: 'A4', title: 'Titration (NaOH vs HCl)', short: 'Find NaOH molarity volumetrically', anim: 'titration', section: 'major' },
    { id: 'A5', code: 'A5', title: 'Gas Detection', short: 'Confirm NH\u2083, CO\u2082, Cl\u2082', anim: 'gases', section: 'major' },
    { id: 'M7_1', code: 'M7.1', title: 'Sublimation', short: 'Isolate naphthalene from sand & salt', anim: 'sublimation', section: 'minor' },
    { id: 'M7_2', code: 'M7.2', title: 'Flame Test', short: 'Identify five ions by colour', anim: 'minor', section: 'minor' },
    { id: 'M7_3', code: 'M7.3', title: 'Copper Sulphate Crystals', short: 'Prepare pure CuSO\u2084\u00b75H\u2082O', anim: 'crystals', section: 'minor' },
    { id: 'M7_4', code: 'M7.4', title: 'Melting Point', short: 'Melting point of naphthalene', anim: 'melting', section: 'minor' },
    { id: 'M7_5', code: 'M7.5', title: 'Boiling Point', short: 'Boiling point of ethyl alcohol', anim: 'boiling', section: 'minor' },
    { id: 'M7_6', code: 'M7.6', title: 'Displacement Reaction', short: 'Zn displaces Cu from CuSO\u2084', anim: 'displacement', section: 'minor' },
    { id: 'M7_7', code: 'M7.7', title: 'Test for Water', short: 'Anhydrous CuSO\u2084 turns blue', anim: 'waterTest', section: 'minor' },
    { id: 'M7_8', code: 'M7.8', title: 'Purity of Water', short: 'Melting & boiling point tests', anim: 'purity', section: 'minor' }
  ];

  var ANIM_FRAMES = {
    'distill': animDistill,
    'major': animMajor,
    'ionChrom': animIonChrom,
    'titration': animTitration,
    'gases': animGases,
    'sublimation': animSublimation,
    'minor': animMinor,
    'crystals': animCrystals,
    'melting': animMelting,
    'boiling': animBoiling,
    'displacement': animDisplacement,
    'waterTest': animWaterTest,
    'purity': animPurity
  };

  function demoAnimKey(practicalId) {
    for (var i = 0; i < PRACTICAL_DEMOS.length; i++) {
      if (PRACTICAL_DEMOS[i].id === practicalId) return PRACTICAL_DEMOS[i].anim;
    }
    return 'major';
  }

  function esc(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- Renderers ---- */

  function renderIntro() {
    var h = '<div class="demo-panel demo-panel-center demo-briefing">';
    h += '<div class="demo-briefing-crest" aria-hidden="true">CSS</div>';
    h += '<h2>ChemSim Laboratory Briefing</h2>';
    h += '<p class="text-secondary">Interactive virtual chemistry laboratory \u2014 guided demonstration for FBISE SSC PBA preparation.</p>';
    h += '<div class="demo-feature-list demo-feature-list--brief">';
    h += '<p><strong>Tour itinerary</strong> (presenter-paced):</p>';
    h += '<ol>';
    for (var i = 0; i < STEPS.length; i++) {
      h += '<li><strong>' + STEPS[i].label + '</strong> \u2014 <span class="text-secondary">' + esc(STEPS[i].instruction) + '</span></li>';
    }
    h += '</ol>';
    h += '<p class="text-secondary" style="font-size:0.85rem;">All measurements in demos are <strong>simulated educational values</strong>, not real laboratory measurements. Goggles optional\u2014curiosity required.</p>';
    h += '</div>';
    h += '<button class="btn btn-primary demo-start-btn" id="btn-demo-start">Start Lab Demonstration</button>';
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
    if (demoState.practicalView === 'play') {
      return renderStepPracticalVideo(demoState);
    }
    var h = '<div class="demo-panel">';
    h += '<div class="demo-instruction"><strong>Presenter:</strong> ' + STEPS[0].instruction + '</div>';
    h += '<div class="demo-step-content">';
    h += '<h3>Practical Lab \u2014 Animated Demos</h3>';
    h += '<p class="text-secondary">All 13 prescribed practicals (5 major + 8 minor). Click a practical to open its animated demonstration. No student input required in demo mode.</p>';

    h += '<div class="demo-section-label">Major Practicals</div>';
    h += '<div class="demo-cards">';
    for (var i = 0; i < PRACTICAL_DEMOS.length; i++) {
      var p = PRACTICAL_DEMOS[i];
      if (p.section !== 'major') continue;
      h += renderDemoCard(p);
    }
    h += '</div>';

    h += '<div class="demo-section-label">Minor Practicals</div>';
    h += '<div class="demo-cards">';
    for (var j = 0; j < PRACTICAL_DEMOS.length; j++) {
      var q = PRACTICAL_DEMOS[j];
      if (q.section !== 'minor') continue;
      h += renderDemoCard(q);
    }
    h += '</div>';

    h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    h += '</div>';
    h += '<div class="demo-footer"><button class="btn btn-secondary" id="btn-demo-exit">Exit Demo</button></div>';
    h += '</div>';
    return h;
  }

  var PRACTICAL_APPARATUS = {
    'A1': ['Round-bottom flask', 'Fractionating column', 'Condenser', 'Thermometer', 'Receiver', 'Bunsen burner'],
    'A2': ['Beaker', 'Chromatography paper', 'Pencil & capillary', 'Solvent (mobile phase)', 'Stand & clip'],
    'A3': ['Beaker', 'Chromatography paper', 'Pb\u00b2\u207a/Cd\u00b2\u207a solutions', 'Solvent', 'Stand & clip'],
    'A4': ['Burette (HCl)', 'Conical flask', 'Pipette', 'White tile', 'Phenolphthalein'],
    'A5': ['Test tubes', 'Delivery tubes', 'Limewater', 'Litmus paper', 'Gas jars'],
    'M7_1': ['Evaporating dish', 'Inverted funnel', 'Filter paper', 'Bunsen burner'],
    'M7_2': ['Bunsen burner', 'Nichrome wire', 'Concentrated HCl', 'Observer'],
    'M7_3': ['Beaker', 'Tripod & gauze', 'Bunsen burner', 'Filter paper'],
    'M7_4': ['Water bath', 'Capillary tube', 'Thermometer', 'Bunsen burner'],
    'M7_5': ['Round-bottom flask', 'Thermometer', 'Condenser', 'Bunsen burner'],
    'M7_6': ['Test tube', 'Zn granules', 'CuSO\u2084 solution', 'Stand'],
    'M7_7': ['Watch glass', 'Anhydrous CuSO\u2084', 'Dropper', 'Distilled water'],
    'M7_8': ['Beaker (ice)', 'Flask (water)', 'Thermometer', 'Bunsen burner']
  };

  function renderStepPracticalVideo(demoState) {
    var p = PRACTICAL_DEMOS[0];
    for (var i = 0; i < PRACTICAL_DEMOS.length; i++) {
      if (PRACTICAL_DEMOS[i].id === demoState.practicalId) { p = PRACTICAL_DEMOS[i]; break; }
    }
    var apparatus = PRACTICAL_APPARATUS[p.id] || [];
    var totalSteps = DEMO_TOTAL_STEPS[p.anim] || 4;
    var h = '<div class="demo-panel demo-panel-wide">';
    h += '<div class="demo-instruction"><strong>Presenter:</strong> ' + STEPS[0].instruction + '</div>';
    h += '<div class="demo-step-content demo-step-content--flush">';

    h += '<div class="demo-lab-header">';
    h += '<div class="demo-lab-title-block">';
    h += '<div class="demo-live-row"><span class="demo-live-dot" aria-hidden="true"></span><span class="demo-live-label">LIVE DEMONSTRATION</span>';
    h += '<span class="demo-elapsed" id="demo-elapsed">0:00</span></div>';
    h += '<h3>' + esc(p.code) + ' \u2014 ' + esc(p.title) + '</h3>';
    h += '<p class="text-secondary">' + esc(p.short) + ' \u00b7 ' + p.section.toUpperCase() + ' practical</p>';
    h += '</div>';
    h += '<span class="demo-sim-badge">SIMULATED EDUCATIONAL VALUES</span>';
    h += '</div>';

    h += '<div class="demo-lab-stage">';
    h += '<div class="demo-stage-main">';
    h += '<div class="demo-stage-bezel">';
    h += '<canvas id="demo-anim-canvas" width="560" height="360"></canvas>';
    h += '</div>';
    h += '<div class="demo-timeline" aria-hidden="true"><div class="demo-timeline-fill" id="demo-timeline-fill"></div></div>';
    h += '<div class="demo-anim-controls">';
    h += '<button class="btn btn-secondary" id="btn-demo-anim-stop">Pause</button>';
    h += '<button class="btn btn-secondary" id="btn-demo-anim-replay">Replay Animation</button>';
    h += '</div>';
    h += '</div>';

    h += '<aside class="demo-notebook" aria-live="polite">';
    h += '<div class="demo-nb-header"><span class="demo-nb-dot"></span> Lab notebook</div>';
    h += '<div class="demo-nb-section">';
    h += '<h4>Procedure</h4>';
    h += '<div class="demo-nb-step" id="demo-nb-step">Step 1 of ' + totalSteps + '</div>';
    h += '<p class="demo-nb-caption" id="demo-nb-caption">Starting demonstration\u2026</p>';
    h += '</div>';
    h += '<div class="demo-nb-section">';
    h += '<h4>Expected observation</h4>';
    h += '<p class="demo-nb-obs" id="demo-nb-obs">Watch the apparatus as the procedure runs.</p>';
    h += '</div>';
    h += '<div class="demo-nb-section">';
    h += '<h4>Instruments</h4>';
    h += '<div class="demo-instruments" id="demo-nb-readings"><span class="demo-reading demo-reading--idle"><em>Status</em><strong>Running\u2026</strong></span></div>';
    h += '</div>';
    h += '<div class="demo-nb-section">';
    h += '<h4>Apparatus</h4>';
    h += '<ul class="demo-apparatus-list">';
    for (var a = 0; a < apparatus.length; a++) {
      h += '<li>' + esc(apparatus[a]) + '</li>';
    }
    h += '</ul>';
    h += '</div>';
    h += '<div class="demo-nb-log">';
    h += '<h4>Observation log</h4>';
    h += '<ol id="demo-nb-log-list"></ol>';
    h += '</div>';
    h += '<p class="demo-nb-disclaimer">Values shown are simulated educational values \u2014 not real laboratory measurements.</p>';
    h += '</aside>';
    h += '</div>';

    h += '<div class="demo-step-actions">';
    h += '<button class="btn btn-secondary demo-back-btn" id="btn-demo-back-list">&larr; Practical List</button>';
    h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    h += '</div>';
    h += '</div>';
    h += '<div class="demo-footer"><button class="btn btn-secondary" id="btn-demo-exit">Exit Demo</button></div>';
    h += '</div>';
    return h;
  }

  function renderDemoCard(p) {
    var h = '<button class="demo-card" id="btn-demo-card-' + p.id + '" data-demo-id="' + p.id + '">';
    h += '<span class="demo-card-tag demo-card-tag--' + p.section + '">' + esc(p.code) + '</span>';
    h += '<strong>' + esc(p.title) + '</strong>';
    h += '<small>' + esc(p.short) + '</small>';
    h += '</button>';
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
    var h = '<div class="demo-panel demo-panel-center demo-briefing">';
    h += '<div class="demo-briefing-crest demo-briefing-crest--done" aria-hidden="true">\u2713</div>';
    h += '<h2>Demonstration Complete</h2>';
    h += '<p class="text-secondary">You have walked through ChemSim\'s key laboratory modules:</p>';
    h += '<div class="demo-feature-box demo-feature-box--wide">';
    h += '<ul>';
    h += '<li><strong>Practical Lab</strong> &mdash; 13 animated practicals with live lab notebook</li>';
    h += '<li><strong>PBA Practice</strong> &mdash; Timed assessment with partial credit</li>';
    h += '<li><strong>Mystery Lab</strong> &mdash; Unknown sample investigation</li>';
    h += '<li><strong>Experiment Log</strong> &mdash; Local record keeping</li>';
    h += '<li><strong>Learning & Revision</strong> &mdash; Practical reference hub</li>';
    h += '</ul>';
    h += '</div>';
    h += '<p class="demo-final-sim">All displayed measurements are simulated educational values \u2014 not real laboratory measurements.</p>';
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
  var animKind = 'major';
  var animPaused = false;
  var animPauseAccum = 0;

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

  /* Self-playing animated demo — no user input */
  function runPracticalAnimation(key) {
    var canvas = document.getElementById('demo-anim-canvas');
    if (!canvas) return;
    animCanvas = canvas;
    animCtx = canvas.getContext('2d');
    animKind = key || 'major';
    animPaused = false;
    animPauseAccum = 0;
    resetDemoPhase(animKind);
    resetAnimClock();
    if (animReqId) cancelAnimationFrame(animReqId);
    animReqId = requestAnimationFrame(practicalAnimFrame);
    syncAnimButtons();
  }

  function animNow() {
    return (typeof performance !== 'undefined') ? performance.now() : Date.now();
  }

  function resetAnimClock() {
    animStart = animNow() - animPauseAccum;
  }

  function currentAnimElapsed(now) {
    return (now - animStart);
  }

  function pausePracticalAnimation() {
    if (animPaused || !animCanvas) return;
    animPauseAccum = currentAnimElapsed(animNow());
    animPaused = true;
    if (animReqId) cancelAnimationFrame(animReqId);
    animReqId = null;
    syncAnimButtons();
  }

  function resumePracticalAnimation() {
    if (!animPaused || !animCanvas) return;
    resetAnimClock();
    animPaused = false;
    if (animReqId) cancelAnimationFrame(animReqId);
    animReqId = requestAnimationFrame(practicalAnimFrame);
    syncAnimButtons();
  }

  function syncAnimButtons() {
    var btn = document.getElementById('btn-demo-anim-stop');
    if (btn) btn.textContent = animPaused ? 'Play' : 'Pause';
  }

  function appendDemoLogEntry(stepLabel, text) {
    var list = document.getElementById('demo-nb-log-list');
    if (!list) return;
    var key = stepLabel + '|' + text;
    if (list.getAttribute('data-last') === key) return;
    list.setAttribute('data-last', key);
    var li = document.createElement('li');
    li.innerHTML = '<strong>' + esc(stepLabel) + '</strong> ' + esc(text);
    list.appendChild(li);
    while (list.children.length > 6) list.removeChild(list.firstChild);
    list.scrollTop = list.scrollHeight;
  }

  function syncDemoPhaseDom(t, elapsedMs) {
    var fill = document.getElementById('demo-timeline-fill');
    if (fill) fill.style.width = Math.round(t * 100) + '%';
    var elapsedEl = document.getElementById('demo-elapsed');
    if (elapsedEl) {
      var secs = Math.floor(elapsedMs / 1000);
      var mm = Math.floor(secs / 60);
      var ss = secs % 60;
      elapsedEl.textContent = mm + ':' + (ss < 10 ? '0' : '') + ss;
    }
    var stepEl = document.getElementById('demo-nb-step');
    var capEl = document.getElementById('demo-nb-caption');
    var obsEl = document.getElementById('demo-nb-obs');
    var readEl = document.getElementById('demo-nb-readings');
    if (capEl && demoPhase.caption && demoPhase.caption !== demoPhase.lastCaption) {
      demoPhase.lastCaption = demoPhase.caption;
      var isResult = /^Result/i.test(demoPhase.caption);
      var label = isResult ? 'Result' : ('Step ' + demoPhase.step);
      if (stepEl) stepEl.textContent = label + ' of ' + demoPhase.totalSteps;
      capEl.textContent = demoPhase.caption;
      if (obsEl) obsEl.textContent = demoPhase.observation || demoPhase.caption;
      appendDemoLogEntry(label, demoPhase.observation || demoPhase.caption);
    }
    if (readEl && demoPhase.readingsHtml) {
      readEl.innerHTML = demoPhase.readingsHtml;
    }
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

    var frame = ANIM_FRAMES[animKind] || ANIM_FRAMES['major'];
    if (frame) frame(ctx, W, H, t);
    syncDemoPhaseDom(t, elapsed);

    if (!animPaused) {
      animReqId = requestAnimationFrame(practicalAnimFrame);
    } else {
      animReqId = null;
    }
  }

  /* ================================================================
     ANIMATION FRAMES — one per practical key ('distill', 'major',
     'ionChrom', 'titration', 'gases', 'sublimation', 'minor',
     'crystals', 'melting', 'boiling', 'displacement',
     'waterTest', 'purity')
     ================================================================ */

  /* Flame test (M7_2 / Minor Practical) animated demo — self-playing, no user input */
  function animMinor(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    /* sequence of ions: each occupies a portion of the loop */
    var ions = [
      { name: 'Na\u207a', colour: '#fbbf24', label: 'Golden yellow' },
      { name: 'K\u207a', colour: '#c084fc', label: 'Lilac' },
      { name: 'Ca\u00b2\u207a', colour: '#ef4444', label: 'Brick red' },
      { name: 'Cu\u00b2\u207a', colour: '#22d3ee', label: 'Blue-green' },
      { name: 'Ba\u00b2\u207a', colour: '#4ade80', label: 'Apple green' }
    ];

    /* bunsen burner */
    var burnerX = 230, burnerTopY = 240, burnerW = 26, burnerH = 100;
    var baseY = burnerTopY + burnerH;

    /* stage: flame colour cycle begins after intro */
    var introStart = 0.05, introEnd = 0.12;
    var segLen = (1 - introEnd) / ions.length;
    var seqProg = lerp(introEnd, 1, phase(0, 1));

    /* determine active ion */
    var ionIndex = 0;
    for (var i = 0; i < ions.length; i++) {
      if (t >= introEnd + i * segLen) ionIndex = i;
    }
    var ion = ions[ionIndex];
    var ionProgress = (t - (introEnd + ionIndex * segLen)) / segLen; /* 0..1 for current ion */
    var ionReveal = lerp(0, 1, phase(0, 0.2)); /* flame colour fades in */

    /* ---- bunsen burner ---- */
    /* tripod / stand */
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    /* wire holder from right */
    ctx.beginPath();
    ctx.moveTo(W - 110, 150);
    ctx.lineTo(burnerX + burnerW / 2 + 10, burnerTopY - 18);
    ctx.stroke();

    /* bunsen tube */
    ctx.fillStyle = '#94a3b8';
    roundRect(ctx, burnerX, burnerTopY, burnerW, burnerH, 3);
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    roundRect(ctx, burnerX, burnerTopY, burnerW, burnerH, 3);
    ctx.stroke();

    /* base */
    ctx.fillStyle = '#64748b';
    roundRect(ctx, burnerX - 18, baseY - 6, burnerW + 36, 12, 3);
    ctx.fill();

    /* nichrome wire with sample */
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W - 110, 150);
    ctx.quadraticCurveTo(W - 90, 210, burnerX + burnerW / 2 + 10, burnerTopY - 18);
    ctx.stroke();

    /* ---- flame ---- */
    var flame = ion.colour;
    var alpha = ionReveal;
    var flicker = 0.9 + 0.1 * Math.sin(t * 40 * Math.PI);

    /* inner blue flame at base */
    ctx.fillStyle = 'rgba(59,130,246,0.65)';
    ctx.beginPath();
    ctx.moveTo(burnerX + 4, burnerTopY + 4);
    ctx.quadraticCurveTo(burnerX + burnerW / 2, burnerTopY - 8 * flicker, burnerX + burnerW - 4, burnerTopY + 4);
    ctx.closePath();
    ctx.fill();

    /* coloured outer flame (ion colour) */
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = flame;
    ctx.beginPath();
    ctx.moveTo(burnerX - 2, burnerTopY + 2);
    ctx.quadraticCurveTo(burnerX + burnerW / 2, burnerTopY - (42 * flicker + 8), burnerX + burnerW + 2, burnerTopY + 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    /* ---- caption / narration ---- */
    var caption = '';
    if (t < introEnd) {
      caption = 'Step 1: Clean the nichrome wire in concentrated HCl and heat it until no colour shows.';
    } else {
      caption = 'Ion ' + ion.name + ' produces a ' + ion.label.toLowerCase() + ' flame \u2014 record the colour and identify the ion.';
    }
    setDemoReadings(
      '<span class="demo-reading"><em>Ion</em><strong>' + ion.name + '</strong></span>' +
      '<span class="demo-reading"><em>Flame</em><strong>' + ion.label + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    /* ion sequence chips at top */
    var chipW = 88, chipH = 26, startX = (W - (ions.length * chipW + (ions.length - 1) * 8)) / 2;
    for (var c = 0; c < ions.length; c++) {
      ctx.fillStyle = c === ionIndex ? ions[c].colour : '#e2e8f0';
      ctx.globalAlpha = c === ionIndex ? 1 : 0.6;
      ctx.fillRect(startX + c * (chipW + 8), 16, chipW, chipH);
      ctx.globalAlpha = 1;
      ctx.fillStyle = c === ionIndex ? '#ffffff' : '#475569';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(ions[c].name, startX + c * (chipW + 8) + chipW / 2, 16 + chipH / 2 + 4);
    }

    drawProgressRing(ctx, W, t);
  }

  /* Paper chromatography (A2 / Major Practical) animated demo — self-playing, no user input */
  function animMajor(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

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

    setDemoReadings(
      '<span class="demo-reading"><em>Solvent front</em><strong>' + (phase(0.12, 0.55) < 1 ? Math.round(phase(0.12, 0.55) * 100) + '%' : '100%') + '</strong></span>' +
      '<span class="demo-reading"><em>Rf red</em><strong>' + (sepProgress >= 1 ? '0.82' : '\u2014') + '</strong></span>' +
      '<span class="demo-reading"><em>Rf blue</em><strong>' + (sepProgress >= 1 ? '0.55' : '\u2014') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);
    drawProgressRing(ctx, W, t);
  }

  /* Shared bench background + progress ring for the demo animations */
  var demoPhase = {
    caption: '',
    step: 1,
    totalSteps: 4,
    observation: '',
    readingsHtml: '',
    lastCaption: ''
  };

  var DEMO_TOTAL_STEPS = {
    'distill': 5, 'major': 6, 'ionChrom': 5, 'titration': 4, 'gases': 3,
    'sublimation': 4, 'minor': 5, 'crystals': 4, 'melting': 4, 'boiling': 4,
    'displacement': 4, 'waterTest': 4, 'purity': 2
  };

  function setDemoReadings(html) {
    demoPhase.readingsHtml = html || '';
  }

  function resetDemoPhase(animKey) {
    demoPhase.caption = '';
    demoPhase.step = 1;
    demoPhase.totalSteps = DEMO_TOTAL_STEPS[animKey] || 4;
    demoPhase.observation = '';
    demoPhase.readingsHtml = '';
    demoPhase.lastCaption = '';
  }

  /* Realistic lab station backdrop: tiled wall, shelf, wooden bench */
  function drawDemoBg(ctx, W, H) {
    /* wall */
    var wallGrad = ctx.createLinearGradient(0, 0, 0, H * 0.62);
    wallGrad.addColorStop(0, '#e8eef4');
    wallGrad.addColorStop(1, '#d7e0e8');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, W, H * 0.62);

    /* wall tiles */
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1;
    for (var tx = 0; tx < W; tx += 40) {
      ctx.beginPath();
      ctx.moveTo(tx, 0);
      ctx.lineTo(tx, H * 0.62);
      ctx.stroke();
    }
    for (var ty = 0; ty < H * 0.62; ty += 32) {
      ctx.beginPath();
      ctx.moveTo(0, ty);
      ctx.lineTo(W, ty);
      ctx.stroke();
    }

    /* reagent shelf */
    var shelfY = 48;
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(40, shelfY, W - 80, 6);
    ctx.fillStyle = '#6b4f10';
    ctx.fillRect(40, shelfY + 6, W - 80, 3);
    var bottles = ['#1a6b4f', '#4a90d9', '#dc3545', '#f0ad4e', '#6a1b9a', '#0d9e5f'];
    for (var i = 0; i < bottles.length; i++) {
      var bx = 56 + i * 78;
      ctx.fillStyle = bottles[i];
      ctx.globalAlpha = 0.75;
      roundRect(ctx, bx, shelfY - 28, 18, 28, 3);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#334155';
      ctx.fillRect(bx + 5, shelfY - 34, 8, 6);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '7px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('R' + (i + 1), bx + 9, shelfY - 10);
    }

    /* safety sign */
    ctx.fillStyle = '#fef3c7';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    roundRect(ctx, W - 96, 14, 78, 36, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#92400e';
    ctx.font = 'bold 8px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SAFETY', W - 57, 28);
    ctx.font = '7px system-ui, sans-serif';
    ctx.fillText('GOGGLES ON', W - 57, 40);

    /* wooden bench */
    var benchY = H * 0.62;
    var benchGrad = ctx.createLinearGradient(0, benchY, 0, H);
    benchGrad.addColorStop(0, '#a67c52');
    benchGrad.addColorStop(0.08, '#8b6914');
    benchGrad.addColorStop(0.15, '#7a5c3a');
    benchGrad.addColorStop(1, '#5c4630');
    ctx.fillStyle = benchGrad;
    ctx.fillRect(0, benchY, W, H - benchY);

    /* bench edge highlight */
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(0, benchY, W, 3);
    ctx.strokeStyle = '#4a3728';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(W, benchY);
    ctx.stroke();

    /* wood grain */
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    for (var g = 0; g < 5; g++) {
      ctx.beginPath();
      ctx.moveTo(0, benchY + 18 + g * 22);
      ctx.bezierCurveTo(W * 0.3, benchY + 14 + g * 22, W * 0.7, benchY + 24 + g * 22, W, benchY + 18 + g * 22);
      ctx.stroke();
    }

    /* subtle vignette */
    var vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
    ctx.textAlign = 'center';
  }

  function drawProgressRing(ctx, W, t) {
    /* outer track */
    ctx.strokeStyle = 'rgba(15,23,42,0.12)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(W - 24, 24, 11, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#e65100';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(W - 24, 24, 11, -Math.PI / 2, -Math.PI / 2 + t * 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#e65100';
    ctx.font = 'bold 8px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(t * 100) + '%', W - 24, 27);
  }

  function drawCaption(ctx, text, W, H) {
    demoPhase.caption = text;
    var stepMatch = /^Step\s+(\d+)/i.exec(text);
    if (stepMatch) {
      demoPhase.step = parseInt(stepMatch[1], 10);
      demoPhase.observation = text.replace(/^Step\s+\d+:\s*/i, '');
    } else if (/^Result/i.test(text)) {
      demoPhase.step = demoPhase.totalSteps;
      demoPhase.observation = text.replace(/^Result:\s*/i, '');
    } else {
      demoPhase.observation = text;
    }

    /* caption bar */
    var barH = 36;
    var barY = H - barH;
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(0, barY, W, barH);
    ctx.fillStyle = '#e65100';
    ctx.fillRect(0, barY, 4, barH);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'left';
    var stepLabel = (/^Result/i.test(text)) ? 'RESULT' : ('STEP ' + demoPhase.step + '/' + demoPhase.totalSteps);
    ctx.fillText(stepLabel, 14, barY + 15);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px system-ui, sans-serif';
    var body = text.replace(/^Step\s+\d+:\s*/i, '').replace(/^Result:\s*/i, '');
    if (body.length > 72) body = body.substring(0, 70) + '…';
    ctx.fillText(body, 14, barY + 30);

    ctx.fillStyle = 'rgba(148,163,184,0.9)';
    ctx.font = '9px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('SIMULATED', W - 12, barY + 22);
  }

  /* A1 — Fractional distillation: flask + fractionating column + condenser */
  function animDistill(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    /* ---- positions ---- */
    var stillX = 170, stillTopY = 140, stillBotY = 305; /* column to flask */
    var flaskX = 150, flaskTopY = 175, flaskBotY = 310, flaskW = 180;

    /* heating phase 0.05-0.35, boiling 0.35-0.75, distill 0.55-0.95 */
    var heat = phase(0.05, 0.35);
    var boil = phase(0.30, 0.55);
    var distil = phase(0.55, 0.95);
    var temp = t < 0.35 ? lerp(25, 78, phase(0.1, 0.35)) : (t < 0.55 ? lerp(78, 100, phase(0.35, 0.55)) : 100);

    /* ---- retort stand + clamps (support column) ---- */
    ctx.fillStyle = '#64748b';
    ctx.fillRect(stillX - 28, stillTopY - 6, 8, stillBotY - stillTopY + 14); /* rod */
    ctx.fillRect(stillX - 40, stillBotY - 2, 190, 10); /* base */

    /* ---- Bunsen burner ---- */
    var flameH = (18 + 14 * heat) * (0.85 + 0.15 * Math.sin(t * 30 * Math.PI));
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(stillX + 8, stillBotY - 8, 22, 8);
    ctx.fillStyle = '#475569';
    ctx.fillRect(stillX + 12, stillBotY - 34, 14, 26);
    /* flame above burner */
    var flameX = stillX + 19;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(flameX - 6, stillBotY - 34);
    ctx.quadraticCurveTo(flameX, stillBotY - 34 - flameH, flameX + 6, stillBotY - 34);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,170,0,0.85)';
    ctx.beginPath();
    ctx.moveTo(flameX - 4, stillBotY - 34);
    ctx.quadraticCurveTo(flameX, stillBotY - 34 - flameH + 4, flameX + 4, stillBotY - 34);
    ctx.closePath();
    ctx.fill();

    /* ---- flask ---- */
    /* liquid */
    var liqY = lerp(flaskTopY + flaskW * 0.35, flaskTopY + flaskW * 0.22, phase(0.15, 0.75));
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, flaskX - 60, liqY, flaskW + 120, (flaskBotY - flaskTopY) - (liqY - flaskTopY), 12);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = 'rgba(200,220,255,0.55)';
    ctx.fillRect(flaskX - 120, liqY, 420, flaskBotY);
    ctx.restore();

    /* flask glass body */
    ctx.beginPath();
    roundRect(ctx, flaskX - 60, flaskTopY, flaskW + 120, flaskBotY - flaskTopY, 14);
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    /* neck to column */
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(flaskX, flaskTopY);
    ctx.lineTo(stillX, stillTopY);
    ctx.stroke();

    /* fractionating column (packed) */
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(stillX - 10, stillTopY, 20, stillBotY - flaskTopY - 12);
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(stillX - 10, stillTopY, 20, stillBotY - flaskTopY - 12);
    /* packing dots */
    for (var p = 1; p < 9; p++) {
      var py = stillTopY + 8 + p * 9;
      var wob = 2.5;
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(stillX + (p % 2 ? -3 : 3) * wob, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    /* thermometer in column head */
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(stillX - 34, stillTopY + 6);
    ctx.lineTo(stillX - 10, stillTopY + 6);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(stillX - 26, stillTopY + 4, 12, 4);
    /* vapor temperature readout */
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(Math.round(temp) + '\u00b0C', stillX - 30, stillTopY - 8);

    /* vapour bubbles rising in flask */
    if (boil > 0) {
      for (var b = 0; b < 6; b++) {
        var bt = (boil + t * 0.02) * 3 - b * 0.5;
        if (bt > 1) continue;
        var by = (flaskBotY - 8) - bt * (flaskBotY - flaskTopY - 20);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath();
        ctx.arc(flaskX + 40 + b * 18, by, 4 + b, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* distillate dripping at column top into condenser */
    if (distil > 0.1) {
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(stillX, stillTopY + 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(stillX - 1, stillTopY + 4, 2, distil * 18);
    }

    /* condenser (slanted tube to right) */
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(stillX + 8, stillTopY);
    ctx.lineTo(stillX + 150, stillBotY - 60);
    ctx.stroke();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(stillX + 8, stillTopY);
    ctx.lineTo(stillX + 150, stillBotY - 60);
    ctx.stroke();
    /* distillate drops entering receiver */
    if (distil > 0.2) {
      ctx.fillStyle = '#93c5fd';
      ctx.beginPath();
      ctx.arc(stillX + 150, stillBotY - 60, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    /* receiving flask */
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    roundRect(ctx, stillX + 120, stillBotY - 96, 70, 70, 10);
    ctx.stroke();
    if (distil > 0.3) {
      var recFill = lerp(stillBotY - 34, stillBotY - 16, phase(0.3, 0.9));
      ctx.fillStyle = 'rgba(147,197,253,0.65)';
      ctx.fillRect(stillX + 122, recFill, 66, (stillBotY - 30) - recFill);
    }

    /* ---- labels ---- */
    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Round-bottom flask', flaskX, flaskBotY + 16);
    ctx.fillText('Fractionating column', stillX, stillTopY - 22);
    ctx.fillText('Receiver', stillX + 155, stillBotY - 20);

    /* ---- caption ---- */
    var caption = '';
    if (t < 0.05) caption = 'Step 1: Assemble the distillation apparatus with a fractionating column.';
    else if (t < 0.30) caption = 'Step 2: Heat the mixture gently \u2014 the temperature begins to rise.';
    else if (t < 0.55) caption = 'Step 3: Alcohol (lower boiling point) vapours rise through the column.';
    else if (t < 0.80) caption = 'Step 4: Collect the first fraction \u2014 it distils at about 78\u00b0C.';
    else caption = 'Result: alcohol distils first at the lower temperature; water remains in the flask.';
    setDemoReadings(
      '<span class="demo-reading"><em>Temp</em><strong>' + Math.round(temp) + '\u00b0C</strong></span>' +
      '<span class="demo-reading"><em>Heat</em><strong>' + (heat > 0.1 ? 'On' : 'Off') + '</strong></span>' +
      '<span class="demo-reading"><em>Distillate</em><strong>' + (distil > 0.3 ? 'Collecting' : '\u2014') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* A3 — Pb²⁺/Cd²⁺ paper chromatography (two ion spots) */
  function animIonChrom(ctx, W, H, t) {
    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    /* beaker */
    var beakerX = 150, beakerTopY = 130, beakerW = 200, beakerH = 200;
    var solventBaseY = beakerTopY + beakerH - 24;
    var solventMaxY = beakerTopY + 150;
    var solventFill = lerp(solventBaseY, solventMaxY, phase(0, 0.12));

    /* paper */
    var paperX = beakerX + 70, paperW = 60, paperTopY = 60, paperBotY = beakerTopY + beakerH - 4;
    var baselineY = paperTopY + 150;
    var solventFrontMaxY = paperTopY + 45;
    var solventFront = lerp(baselineY + 10, solventFrontMaxY, phase(0.12, 0.55));

    var sepProgress = phase(0.45, 0.85);
    var frontTravel = (baselineY + 10) - solventFrontMaxY;
    var pbTravel = 0.72 * frontTravel;   /* Pb²⁺ travels further */
    var cdTravel = 0.45 * frontTravel;   /* Cd²⁺ travels less */
    var pbY = baselineY - pbTravel * sepProgress;
    var cdY = baselineY - cdTravel * sepProgress;

    drawDemoBg(ctx, W, H);

    /* solvent / glass beaker */
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, beakerX, solventFill, beakerW, solventBaseY - solventFill, 6);
    ctx.closePath();
    var solGrad = ctx.createLinearGradient(0, solventFill, 0, solventBaseY);
    solGrad.addColorStop(0, 'rgba(147,197,253,0.55)');
    solGrad.addColorStop(1, 'rgba(37,99,235,0.80)');
    ctx.fillStyle = solGrad;
    ctx.fill();
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

    /* wet region */
    ctx.fillStyle = 'rgba(147,197,253,0.45)';
    ctx.fillRect(paperX + 1, solventFront, paperW - 2, paperBotY - solventFront);

    /* solvent front line */
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

    /* sample spot */
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(paperX + paperW / 2, baselineY, 4, 0, Math.PI * 2);
    ctx.fill();

    /* separated ions */
    if (sepProgress > 0) {
      ctx.fillStyle = '#7c3aed';
      ctx.beginPath();
      ctx.arc(paperX + paperW / 2 - 4, pbY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.arc(paperX + paperW / 2 + 4, cdY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ion labels on result */
    if (sepProgress >= 1) {
      ctx.fillStyle = '#7c3aed';
      ctx.fillText('Pb\u00b2\u207a', paperX + paperW + 8, pbY + 4);
      ctx.fillStyle = '#2563eb';
      ctx.fillText('Cd\u00b2\u207a', paperX + paperW + 8, cdY + 4);
    }

    /* ---- labels ---- */
    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Beaker with solvent', beakerX + beakerW / 2, beakerTopY + beakerH + 20);
    ctx.fillText('Chromatography paper', paperX + paperW / 2, paperTopY - 10);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('Solvent front', paperX + paperW / 2, solventFront - 8);

    var caption = '';
    if (t < 0.12) caption = 'Step 1: Pour solvent into the beaker (below the baseline).';
    else if (t < 0.30) caption = 'Step 2: Apply the Pb\u00b2\u207a/Cd\u00b2\u207a ion mixture at the baseline.';
    else if (t < 0.45) caption = 'Step 3: Place the paper in the beaker and let solvent rise.';
    else if (t < 0.85) caption = 'Step 4: Pb\u00b2\u207a travels further than Cd\u00b2\u207a \u2014 two spots separate.';
    else caption = 'Result: Pb\u00b2\u207a and Cd\u00b2\u207a ions are separated by paper chromatography.';
    setDemoReadings(
      '<span class="demo-reading"><em>Front</em><strong>' + Math.round(phase(0.12, 0.55) * 100) + '%</strong></span>' +
      '<span class="demo-reading"><em>Pb\u00b2\u207a</em><strong>' + (sepProgress >= 1 ? 'Rf 0.72' : '\u2014') + '</strong></span>' +
      '<span class="demo-reading"><em>Cd\u00b2\u207a</em><strong>' + (sepProgress >= 1 ? 'Rf 0.45' : '\u2014') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* A4 — Titration: retort stand + clamped burette tip directly above flask on white tile */
  function animTitration(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var pour = phase(0.1, 0.85);
    var dropPhase = (t * 60) % 1;
    var pink = Math.max(0, 1 - pour); /* pink fades as acid is added */
    var swirl = (pour > 0.08 && pour < 0.92) ? Math.sin(t * 16 * Math.PI) * 3.5 : 0;

    /* aligned layout: stand | burette tip above flask | reagents on right */
    var standBaseX = 200;
    var standRodX = 228;
    var buretteCX = 300;
    var flaskCX = 300;
    var tileTopY = 306;
    var buretteTopY = 48;
    var buretteBotY = 218;
    var tipY = 232;
    var flaskNeckTop = 238;
    var flaskBotY = 304;

    /* reagent bottles (left of stand) */
    function bottle(x, y, w, h, cap, label) {
      ctx.fillStyle = 'rgba(148,163,184,0.35)';
      roundRect(ctx, x, y, w, h, 5);
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,116,139,0.55)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = cap;
      roundRect(ctx, x + w * 0.25, y - 8, w * 0.5, 10, 2);
      ctx.fill();
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 8px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + w / 2, y + h * 0.55);
    }
    bottle(36, 248, 40, 58, '#dc2626', 'HCl');
    bottle(84, 248, 40, 58, '#2563eb', 'NaOH');
    bottle(132, 264, 28, 42, '#f8fafc', 'Pp');

    /* retort stand: base + rod + clamp holding burette */
    ctx.fillStyle = '#64748b';
    roundRect(ctx, standBaseX - 4, 300, 76, 12, 3);
    ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(standRodX, 40, 7, 260);
    ctx.fillStyle = '#475569';
    ctx.fillRect(standRodX - 2, 40, 11, 6);
    /* clamp arm → burette */
    ctx.fillStyle = '#64748b';
    ctx.fillRect(standRodX + 7, 96, buretteCX - standRodX - 8, 7);
    roundRect(ctx, buretteCX - 16, 88, 32, 22, 4);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.stroke();

    /* burette glass */
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    roundRect(ctx, buretteCX - 11, buretteTopY, 22, buretteBotY - buretteTopY, 4);
    ctx.stroke();
    /* acid level lowers as titre is delivered */
    var acidTop = lerp(buretteTopY + 8, buretteBotY - 10, pour);
    ctx.fillStyle = 'rgba(191,219,254,0.9)';
    ctx.fillRect(buretteCX - 9, acidTop, 18, buretteBotY - acidTop - 4);
    /* graduations */
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    for (var g = 0; g < 9; g++) {
      var gy = buretteTopY + 8 + g * 18;
      ctx.beginPath();
      ctx.moveTo(buretteCX + 11, gy);
      ctx.lineTo(buretteCX + 4, gy);
      ctx.stroke();
    }
    ctx.fillStyle = '#475569';
    ctx.font = '9px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('0', buretteCX + 13, buretteTopY + 12);
    ctx.fillText('50', buretteCX + 13, buretteBotY - 6);

    /* stopcock / tap */
    ctx.fillStyle = '#64748b';
    roundRect(ctx, buretteCX - 14, buretteBotY, 28, 9, 2);
    ctx.fill();
    ctx.fillStyle = '#e65100';
    ctx.fillRect(buretteCX - 3, buretteBotY + 9, 6, 10);
    /* taper tip */
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(buretteCX - 4, buretteBotY + 18);
    ctx.lineTo(buretteCX + 4, buretteBotY + 18);
    ctx.lineTo(buretteCX + 1, tipY);
    ctx.lineTo(buretteCX - 1, tipY);
    ctx.closePath();
    ctx.fill();

    /* white tile under flask (procedure step 4) */
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.ellipse(flaskCX, tileTopY + 4, 58, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();

    /* conical flask — mouth centred under burette tip */
    ctx.save();
    ctx.translate(swirl, 0);
    var neckW = 26;
    var bodyTop = flaskNeckTop + 36;
    var liqTop = lerp(bodyTop + 6, bodyTop + 2, pour);
    /* liquid */
    ctx.fillStyle = pink > 0.05 ? 'rgba(236,72,153,' + (0.15 + 0.6 * pink) + ')' : 'rgba(203,213,225,0.55)';
    ctx.beginPath();
    ctx.moveTo(flaskCX - neckW / 2, bodyTop);
    ctx.lineTo(flaskCX + neckW / 2, bodyTop);
    ctx.lineTo(flaskCX + 48, flaskBotY - 4);
    ctx.quadraticCurveTo(flaskCX, flaskBotY + 2, flaskCX - 48, flaskBotY - 4);
    ctx.closePath();
    ctx.fill();
    /* glass outline: neck + shoulders + body */
    ctx.strokeStyle = 'rgba(100,140,180,0.75)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(flaskCX - neckW / 2, flaskNeckTop);
    ctx.lineTo(flaskCX - neckW / 2, bodyTop);
    ctx.lineTo(flaskCX - 48, flaskBotY - 4);
    ctx.quadraticCurveTo(flaskCX, flaskBotY + 2, flaskCX + 48, flaskBotY - 4);
    ctx.lineTo(flaskCX + neckW / 2, bodyTop);
    ctx.lineTo(flaskCX + neckW / 2, flaskNeckTop);
    ctx.stroke();
    /* lip */
    ctx.beginPath();
    ctx.moveTo(flaskCX - neckW / 2 - 3, flaskNeckTop);
    ctx.lineTo(flaskCX + neckW / 2 + 3, flaskNeckTop);
    ctx.stroke();
    ctx.restore();

    /* drops fall from burette tip into flask mouth */
    if (pour > 0 && pour < 0.95) {
      ctx.fillStyle = 'rgba(96,165,250,0.95)';
      ctx.beginPath();
      ctx.arc(buretteCX + swirl * 0.3, tipY + 4 + dropPhase * (flaskNeckTop - tipY - 2), 3.2, 0, Math.PI * 2);
      ctx.fill();
      if (dropPhase > 0.85) {
        ctx.beginPath();
        ctx.arc(buretteCX + swirl * 0.3, tipY + 4 + dropPhase * (flaskNeckTop - tipY - 2), 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* labels — clear of caption bar (starts y=324) */
    ctx.fillStyle = '#475569';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Retort stand', standBaseX + 34, 320);
    ctx.fillText('Burette \u2014 HCl 0.100 M', buretteCX, buretteTopY - 8);
    ctx.fillText('NaOH + phenolphthalein', flaskCX, flaskBotY + 20);
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('White tile', flaskCX + 70, tileTopY + 4);
    ctx.textAlign = 'left';
    ctx.fillText('Reagents', 44, 240);

    var caption = '';
    if (t < 0.1) caption = 'Step 1: Fill the burette with standard HCl and pipette NaOH + indicator.';
    else if (t < 0.55) caption = 'Step 2: Add HCl dropwise while swirling \u2014 pink fades slowly.';
    else if (t < 0.85) caption = 'Step 3: Endpoint \u2014 one extra drop makes pink disappear permanently.';
    else caption = 'Result: record titre. M(NaOH) = M(HCl) \u00d7 V(HCl) \u00f7 V(NaOH).';
    setDemoReadings(
      '<span class="demo-reading"><em>Burette</em><strong>' + (pour * 23.5).toFixed(2) + ' mL</strong></span>' +
      '<span class="demo-reading"><em>Indicator</em><strong>' + (pink > 0.05 ? 'Pink' : 'Colourless') + '</strong></span>' +
      '<span class="demo-reading"><em>Endpoint</em><strong>' + (pour >= 0.85 ? 'Reached' : '\u2014') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* A5 — Gas detection: gas jar + delivery tube → test for NH₃, CO₂, Cl₂ */
  function animGases(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }
    function lerpColor(r1, g1, b1, r2, g2, b2, k) {
      var rr = Math.round(r1 + (r2 - r1) * k);
      var gg = Math.round(g1 + (g2 - g1) * k);
      var bb = Math.round(b1 + (b2 - b1) * k);
      return 'rgb(' + rr + ',' + gg + ',' + bb + ')';
    }

    var active = Math.min(2, Math.floor(t * 0.95 * 3));
    var sub = Math.min(1, ((t * 0.95 * 3) % 1));

    var tests = [
      { gas: 'NH\u2083', full: 'Ammonia', obs: 'Damp red litmus turns blue', jar: 'rgba(236,72,153,0.12)' },
      { gas: 'CO\u2082', full: 'Carbon dioxide', obs: 'Limewater turns milky', jar: 'rgba(148,163,184,0.15)' },
      { gas: 'Cl\u2082', full: 'Chlorine', obs: 'Damp litmus is bleached', jar: 'rgba(132,204,22,0.18)' }
    ];
    var test = tests[active];

    /* ---- left: gas jar on bench with stopper + delivery tube ---- */
    var jarCX = 108, jarTop = 214, jarBot = 292, jarW = 54;
    /* wooden rack base under jar */
    ctx.fillStyle = '#8b6914';
    roundRect(ctx, jarCX - 34, jarBot - 2, 68, 12, 3);
    ctx.fill();
    /* jar glass */
    ctx.fillStyle = test.jar;
    ctx.strokeStyle = 'rgba(100,140,180,0.7)';
    ctx.lineWidth = 2.5;
    roundRect(ctx, jarCX - jarW / 2, jarTop, jarW, jarBot - jarTop, 6);
    ctx.fill();
    ctx.stroke();
    /* gas inside (faint haze rising) */
    var haze = 0.25 + 0.15 * Math.sin(t * 12 * Math.PI);
    ctx.fillStyle = 'rgba(148,163,184,' + haze + ')';
    ctx.beginPath();
    ctx.moveTo(jarCX - jarW / 2 + 4, jarTop + 18);
    ctx.lineTo(jarCX + jarW / 2 - 4, jarTop + 18);
    ctx.lineTo(jarCX + jarW / 2 - 4, jarBot - 4);
    ctx.lineTo(jarCX - jarW / 2 + 4, jarBot - 4);
    ctx.closePath();
    ctx.fill();
    /* stopper */
    ctx.fillStyle = '#92400e';
    roundRect(ctx, jarCX - 16, jarTop - 10, 32, 12, 3);
    ctx.fill();
    /* label on jar */
    ctx.fillStyle = '#fff';
    roundRect(ctx, jarCX - 24, jarTop + 40, 48, 26, 3);
    ctx.fill();
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(test.gas, jarCX, jarTop + 56);
    ctx.font = '7px system-ui, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('GAS JAR', jarCX, jarTop + 66);
    ctx.fillStyle = '#475569';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('Gas jar', jarCX, 318);

    /* delivery tube: jar stopper → active test station */
    var activeTX = [250, 350, 450][active];
    var tubeEndY = active === 1 ? 254 : 220; /* into limewater vs near mouth */
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(jarCX, jarTop - 10);
    ctx.lineTo(jarCX, jarTop - 42);
    ctx.quadraticCurveTo(jarCX, jarTop - 58, jarCX + 40, jarTop - 58);
    ctx.lineTo(activeTX - 30, jarTop - 58);
    ctx.quadraticCurveTo(activeTX, jarTop - 58, activeTX, jarTop - 42);
    ctx.lineTo(activeTX, tubeEndY);
    ctx.stroke();
    /* bore highlight */
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(jarCX, jarTop - 12);
    ctx.lineTo(jarCX, jarTop - 42);
    ctx.quadraticCurveTo(jarCX, jarTop - 57, jarCX + 40, jarTop - 57);
    ctx.lineTo(activeTX - 30, jarTop - 57);
    ctx.quadraticCurveTo(activeTX, jarTop - 57, activeTX, jarTop - 42);
    ctx.lineTo(activeTX, tubeEndY - 2);
    ctx.stroke();

    /* ---- right: wooden test-tube rack with 3 tubes ---- */
    var rackX = 210, rackY = 296, rackW = 300;
    ctx.fillStyle = '#8b6914';
    roundRect(ctx, rackX, rackY, rackW, 14, 4);
    ctx.fill();
    ctx.fillStyle = '#6b4f10';
    ctx.fillRect(rackX + 6, rackY + 14, rackW - 12, 5);
    /* upper rack bar with holes */
    ctx.fillStyle = '#a67c52';
    roundRect(ctx, rackX, rackY - 16, rackW, 10, 3);
    ctx.fill();

    var tubeCXs = [250, 350, 450];
    for (var r = 0; r < 3; r++) {
      var tx = tubeCXs[r];
      var onRack = r === active;

      /* tube body — bottom rests in rack */
      var tubeTop = onRack ? 208 : 216;
      var tubeBot = 292;
      ctx.strokeStyle = onRack ? 'rgba(100,140,180,0.85)' : 'rgba(100,140,180,0.45)';
      ctx.lineWidth = onRack ? 2.5 : 2;
      ctx.beginPath();
      ctx.moveTo(tx - 14, tubeTop);
      ctx.lineTo(tx - 14, tubeBot - 14);
      ctx.quadraticCurveTo(tx, tubeBot + 4, tx + 14, tubeBot - 14);
      ctx.lineTo(tx + 14, tubeTop);
      ctx.stroke();

      /* liquid */
      var liqTop = 252;
      if (r === 1) {
        /* limewater → milky */
        var milk = onRack ? Math.min(1, sub * 2) : 0;
        var mr = Math.round(203 + (226 - 203) * milk);
        var mg = Math.round(213 + (232 - 213) * milk);
        var mb = Math.round(225 + (240 - 225) * milk);
        ctx.fillStyle = 'rgb(' + mr + ',' + mg + ',' + mb + ',' + (0.55 + 0.35 * milk) + ')';
      } else {
        ctx.fillStyle = onRack ? 'rgba(191,219,254,0.55)' : 'rgba(226,232,240,0.4)';
      }
      ctx.beginPath();
      ctx.moveTo(tx - 12, liqTop);
      ctx.lineTo(tx + 12, liqTop);
      ctx.lineTo(tx + 12, tubeBot - 16);
      ctx.quadraticCurveTo(tx, tubeBot, tx - 12, tubeBot - 16);
      ctx.closePath();
      ctx.fill();

      /* bubbles only in active CO₂ limewater tube */
      if (onRack && active === 1 && sub > 0.2) {
        for (var bi = 0; bi < 4; bi++) {
          var by = tubeBot - 14 - ((sub * 40 + bi * 14) % 24);
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.beginPath();
          ctx.arc(tx - 6 + (bi % 3) * 6, by, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* damp litmus held near mouth of active NH₃ / Cl₂ tube */
      if ((r === 0 || r === 2) && onRack) {
        var litColor = r === 0 ? '#ef4444' : '#2563eb';
        if (sub > 0.35) {
          var litK = Math.min(1, (sub - 0.35) / 0.35);
          litColor = r === 0
            ? lerpColor(0xef, 0x44, 0x44, 0x22, 0xc5, 0x5e, litK)
            : lerpColor(0x25, 0x63, 0xeb, 0xe2, 0xe8, 0xf0, litK);
        }
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(tx - 10, tubeTop - 22, 20, 8);
        ctx.fillStyle = litColor;
        ctx.fillRect(tx - 8, tubeTop - 20, 16, 5);
        ctx.fillStyle = '#64748b';
        ctx.font = '8px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(r === 0 ? 'damp red litmus' : 'damp litmus', tx, tubeTop - 28);
      }

      /* single-line gas label under rack (clears caption bar y=324) */
      ctx.fillStyle = onRack ? '#334155' : '#94a3b8';
      ctx.font = onRack ? 'bold 11px system-ui,sans-serif' : '11px system-ui,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(tests[r].gas + '  ' + tests[r].full, tx, 320);

      /* active highlight ring */
      if (onRack) {
        ctx.strokeStyle = '#e65100';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        roundRect(ctx, tx - 22, tubeTop - 34, 44, tubeBot - tubeTop + 48, 6);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    /* result plate above the rack */
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(test.gas + ': ' + test.obs, 360, 176);
    if (sub > 0.6) {
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('\u2713 ' + test.gas + ' confirmed', 360, 194);
    }

    var caption = '';
    if (t < 0.32) caption = 'Step 1: Test NH\u2083 \u2014 damp red litmus turns blue (basic gas).';
    else if (t < 0.64) caption = 'Step 2: Bubble CO\u2082 through limewater \u2014 turns milky.';
    else caption = 'Step 3: Cl\u2082 bleaches damp litmus paper \u2014 all three gases confirmed.';
    setDemoReadings(
      '<span class="demo-reading"><em>Gas</em><strong>' + test.gas + '</strong></span>' +
      '<span class="demo-reading"><em>Test</em><strong>' + (active === 0 ? 'Litmus' : (active === 1 ? 'Limewater' : 'Bleach')) + '</strong></span>' +
      '<span class="demo-reading"><em>Status</em><strong>' + (sub > 0.6 ? 'Confirmed' : 'Testing') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* M7_1 — Sublimation: naphthalene vapour rising to inverted funnel */
  function animSublimation(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var heat = phase(0.05, 0.5);
    var vapour = phase(0.2, 0.75);
    var sublimate = phase(0.35, 0.9);

    /* evaporating dish */
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(150, 260);
    ctx.lineTo(300, 260);
    ctx.lineTo(315, 292);
    ctx.lineTo(135, 292);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    /* mixture inside */
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.ellipse(225, 262, 62, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    for (var s = 0; s < 14; s++) {
      ctx.fillStyle = s % 3 === 0 ? '#b45309' : (s % 3 === 1 ? '#94a3b8' : '#fca5a5');
      ctx.beginPath();
      ctx.arc(163 + s * 9 + (s % 2) * 4, 258 + (s % 2) * 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    /* bunsen burner flame */
    var flick = 0.85 + 0.15 * Math.sin(t * 30 * Math.PI);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(205, 316, 40, 8);
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(215, 316);
    ctx.quadraticCurveTo(225, 316 - (34 * flick), 235, 316);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,170,0,0.85)';
    ctx.beginPath();
    ctx.moveTo(219, 316);
    ctx.quadraticCurveTo(225, 316 - 18, 231, 316);
    ctx.closePath();
    ctx.fill();

    /* inverted funnel with filter paper */
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(160, 110);
    ctx.lineTo(290, 110);
    ctx.lineTo(250, 230);
    ctx.lineTo(200, 230);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();
    /* funnel neck */
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(200, 230, 50, 26);

    /* vapour rising */
    if (vapour > 0) {
      for (var v = 0; v < 5; v++) {
        var vy = 300 - ((vapour * 1.4 + t * 0.1) % 1) * 180 - v * 20;
        if (vy < 120 || vy > 290) continue;
        ctx.fillStyle = 'rgba(148,163,184,' + (0.25 + 0.15 * Math.sin(t * 20 + v)) + ')';
        ctx.beginPath();
        ctx.ellipse(225 + (v % 2 ? 14 : -14), vy, 14, 8, v, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* sublimate crystals on funnel */
    if (sublimate > 0) {
      for (var c2 = 0; c2 < 10; c2++) {
        var cxp = 170 + (c2 * 13) % 105;
        var cyp = 126 + Math.floor(c2 / 3) * 24;
        var a = (0.15 + 0.5 * sublimate) * (0.5 + 0.5 * Math.sin(c2 * 7 + t * 10));
        ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
        ctx.beginPath();
        ctx.moveTo(cxp, cyp - 4);
        ctx.lineTo(cxp + 3, cyp);
        ctx.lineTo(cxp, cyp + 4);
        ctx.lineTo(cxp - 3, cyp);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Evaporating dish (naphthalene + sand + salt)', 225, 306);

    var caption = '';
    if (t < 0.05) caption = 'Step 1: Place the mixture in the dish and cover with an inverted funnel.';
    else if (t < 0.2) caption = 'Step 2: Heat gently \u2014 naphthalene begins to sublime.';
    else if (t < 0.6) caption = 'Step 3: Naphthalene vapour rises and condenses on the cool funnel.';
    else caption = 'Result: white naphthalene collects on the funnel; sand and salt remain.';
    setDemoReadings(
      '<span class="demo-reading"><em>Heat</em><strong>' + (heat > 0.2 ? 'On' : 'Off') + '</strong></span>' +
      '<span class="demo-reading"><em>Vapour</em><strong>' + (vapour > 0.2 ? 'Rising' : '\u2014') + '</strong></span>' +
      '<span class="demo-reading"><em>Sublimate</em><strong>' + (sublimate > 0.4 ? 'Forming' : '\u2014') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* M7_3 — Copper sulphate crystals: dissolve, evaporate, crystallise */
  function animCrystals(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var dissolve = phase(0.05, 0.4);
    var heat = phase(0.25, 0.6);
    var crystal = phase(0.55, 0.95);

    /* beaker */
    var bx = 200, by = 170, bw = 120, bh = 120;
    /* water inside */
    var waterLvl = lerp(by + bh - 22, by + 52, heat * 0.75);
    ctx.fillStyle = 'rgba(56,150,220,' + (0.3 + 0.3 * dissolve) + ')';
    ctx.fillRect(bx + 6, waterLvl, bw - 12, (by + bh - 6) - waterLvl);
    /* glass wall */
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    roundRect(ctx, bx, by, bw, bh, 6);
    ctx.stroke();
    /* undissolved powder dissolving */
    if (dissolve < 1) {
      for (var s2 = 0; s2 < 8; s2++) {
        ctx.fillStyle = 'rgba(96,165,250,0.9)';
        ctx.beginPath();
        ctx.arc(bx + 20 + s2 * 12, by + bh - 14, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    /* boiling bubbles */
    if (heat > 0) {
      for (var b2 = 0; b2 < 5; b2++) {
        var bby = (by + bh - 8) - ((heat + t * 0.1) * 2 - b2 * 0.2 + 1) % 1 * (bh - 50);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(bx + 24 + b2 * 20, bby, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    /* steam above beaker */
    if (heat > 0.3) {
      ctx.fillStyle = 'rgba(203,213,225,0.5)';
      ctx.fillRect(bx + 30, by - 26, 60, 12);
    }

    /* wire gauze + tripod */
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(175, by + bh);
    ctx.lineTo(195, 322);
    ctx.moveTo(345, by + bh);
    ctx.lineTo(325, 322);
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(160, by + bh, 200, 5);
    /* bunsen */
    var flick2 = 0.85 + 0.15 * Math.sin(t * 26 * Math.PI);
    ctx.fillStyle = '#475569';
    ctx.fillRect(232, 322, 24, 14);
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(236, 322);
    ctx.quadraticCurveTo(244, 322 - 38 * flick2, 252, 322);
    ctx.closePath();
    ctx.fill();

    /* crystallising blue crystals on cooling */
    if (crystal > 0.5) {
      for (var cc = 0; cc < 6; cc++) {
        var cw = 8 + (cc % 3) * 4;
        var cy2 = by + bh - 10 - Math.floor(cc / 3) * 22;
        var cx2 = bx + 18 + (cc % 3) * 34;
        ctx.fillStyle = 'rgba(37,99,235,' + (0.4 + 0.5 * crystal) + ')';
        ctx.beginPath();
        ctx.moveTo(cx2 - cw / 2, cy2 + 4);
        ctx.lineTo(cx2, cy2 - cw / 2);
        ctx.lineTo(cx2 + cw / 2, cy2 + 4);
        ctx.lineTo(cx2, cy2 + cw / 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Beaker of CuSO\u2084 solution', bx + bw / 2, by + bh + 32);

    var caption = '';
    if (t < 0.05) caption = 'Step 1: Dissolve CuSO\u2084 powder in warm distilled water.';
    else if (t < 0.3) caption = 'Step 2: Filter if needed, then concentrate by evaporation.';
    else if (t < 0.6) caption = 'Step 3: Heat to concentrate \u2014 allow slow cooling.';
    else caption = 'Result: blue crystals of CuSO\u2084\u00b75H\u2082O form on cooling.';
    setDemoReadings(
      '<span class="demo-reading"><em>Stage</em><strong>' + (dissolve < 1 ? 'Dissolving' : (heat > 0.2 ? 'Evaporating' : (crystal > 0.5 ? 'Crystallising' : 'Ready'))) + '</strong></span>' +
      '<span class="demo-reading"><em>Product</em><strong>' + (crystal > 0.5 ? 'CuSO\u2084\u00b75H\u2082O' : '\u2014') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* M7_4 — Melting point of naphthalene: capillary in a water bath */
  function animMelting(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var heat = phase(0.05, 0.7);
    var melt = phase(0.45, 0.8);

    /* water bath beaker */
    var bx = 190, by = 200, bw = 180, bh = 110;
    /* water */
    ctx.fillStyle = 'rgba(147,197,253,0.4)';
    ctx.fillRect(bx + 5, by + 20, bw - 10, bh - 25);
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    roundRect(ctx, bx, by, bw, bh, 6);
    ctx.stroke();

    /* bunsen burner */
    var flick = 0.85 + 0.15 * Math.sin(t * 28 * Math.PI);
    ctx.fillStyle = '#475569';
    ctx.fillRect(225, 314, 30, 14);
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(230, 314);
    ctx.quadraticCurveTo(240, 314 - 30 * flick, 250, 314);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,170,0,0.85)';
    ctx.beginPath();
    ctx.moveTo(234, 314);
    ctx.quadraticCurveTo(240, 314 - 15, 246, 314);
    ctx.closePath();
    ctx.fill();

    /* thermometer */
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(bx + 26, by - 30, 12, bh + 24);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx + 26, by - 30, 12, bh + 24);
    var temps = lerp(25, 82, heat);
    ctx.fillStyle = '#dc2626';
    var bulbY = by + 8;
    ctx.beginPath();
    ctx.arc(bx + 32, bulbY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(bx + 29, bulbY - 6, 6, bulbY - (by - 22));
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(Math.round(temps) + '\u00b0C', bx + 20, by - 36);

    /* capillary tube */
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(bx + 70, by - 26, 10, 70);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx + 70, by - 26, 10, 70);
    /* naphthalene solid that melts */
    ctx.fillStyle = melt > 0 ? '#f8fafc' : '#d1d5db';
    ctx.fillRect(bx + 72, by + 16, 6, 24);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx + 72, by + 16, 6, 24);
    if (melt > 0) {
      /* melting droplet */
      ctx.fillStyle = 'rgba(96,165,250,0.6)';
      ctx.beginPath();
      ctx.arc(bx + 75, by + 30 + melt * 8, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Water bath + capillary (naphthalene)', bx + bw / 2, by + bh + 28);

    var caption = '';
    if (t < 0.05) caption = 'Step 1: Pack naphthalene into a capillary tube in a water bath.';
    else if (t < 0.4) caption = 'Step 2: Heat gently \u2014 watch the temperature and the sample.';
    else if (t < 0.8) caption = 'Step 3: Record the temperature where the sample just melts (\u224880\u00b0C).';
    else caption = 'Result: the melting point of naphthalene is observed (\u224880\u00b0C, simulated).';
    setDemoReadings(
      '<span class="demo-reading"><em>Temp</em><strong>' + Math.round(temps) + '\u00b0C</strong></span>' +
      '<span class="demo-reading"><em>Sample</em><strong>' + (melt > 0.5 ? 'Liquid' : 'Solid') + '</strong></span>' +
      '<span class="demo-reading"><em>Expected MP</em><strong>\u224880\u00b0C</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* M7_5 — Boiling point of ethyl alcohol */
  function animBoiling(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var heat = phase(0.05, 0.6);
    var boil = phase(0.35, 0.7);
    var temps = lerp(25, 80, heat);

    /* round-bottom flask */
    var fx = 150, fy = 200, fr = 60;
    /* liquid */
    ctx.fillStyle = 'rgba(191,219,254,0.6)';
    ctx.beginPath();
    ctx.arc(fx, fy + 10, fr - 8, 0, Math.PI * 2);
    ctx.fill();
    /* glass */
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(fx, fy + 10, fr, Math.PI, 0);
    ctx.closePath();
    ctx.stroke();
    /* neck */
    ctx.strokeStyle = 'rgba(100,140,180,0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(fx - 20, fy - 50);
    ctx.lineTo(fx - 20, fy - 110);
    ctx.moveTo(fx + 20, fy - 50);
    ctx.lineTo(fx + 20, fy - 110);
    ctx.stroke();
    /* stand base */
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(fx, fy + 70);
    ctx.lineTo(fx, 322);
    ctx.moveTo(fx - 34, 322);
    ctx.lineTo(fx + 34, 322);
    ctx.stroke();

    /* bunsen */
    var flick = 0.85 + 0.15 * Math.sin(t * 30 * Math.PI);
    ctx.fillStyle = '#475569';
    ctx.fillRect(fx - 18, 322, 36, 14);
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(fx - 12, 322);
    ctx.quadraticCurveTo(fx, 322 - 46 * flick, fx + 12, 322);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,170,0,0.85)';
    ctx.beginPath();
    ctx.moveTo(fx - 6, 322);
    ctx.quadraticCurveTo(fx, 322 - 22, fx + 6, 322);
    ctx.closePath();
    ctx.fill();

    /* boiling bubbles */
    if (boil > 0) {
      for (var b = 0; b < 6; b++) {
        var by = (fy + 40) - ((boil * 1.3 + t * 0.1) % 1) * 90 - b * 10;
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(fx - 16 + b * 6, by, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* thermometer through cork */
    ctx.fillStyle = '#64748b';
    ctx.fillRect(fx - 26, fy - 118, 52, 12);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(fx - 10, fy - 130, 7, 24);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.strokeRect(fx - 10, fy - 130, 7, 24);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(fx - 8, fy - 112, 3, 12);
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(Math.round(temps) + '\u00b0C', fx - 8, fy - 136);

    /* vapour / steam at neck */
    if (boil > 0.2) {
      ctx.fillStyle = 'rgba(203,213,225,0.5)';
      ctx.fillRect(fx - 16, fy - 126, 32, 10);
    }

    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Flask of ethyl alcohol', fx, fy + fr + 32);

    var caption = '';
    if (t < 0.05) caption = 'Step 1: Set up distillation with thermometer at the flask neck.';
    else if (t < 0.35) caption = 'Step 2: Heat gently \u2014 temperature rises steadily.';
    else if (t < 0.7) caption = 'Step 3: Bubbles form \u2014 alcohol boils (\u224878\u00b0C, simulated).';
    else caption = 'Result: record the constant boiling temperature of ethyl alcohol.';
    setDemoReadings(
      '<span class="demo-reading"><em>Temp</em><strong>' + Math.round(temps) + '\u00b0C</strong></span>' +
      '<span class="demo-reading"><em>State</em><strong>' + (boil > 0.2 ? 'Boiling' : (heat > 0.2 ? 'Heating' : 'Idle')) + '</strong></span>' +
      '<span class="demo-reading"><em>Expected BP</em><strong>\u224878\u00b0C</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* M7_6 — Displacement: zinc granules sink into CuSO₄ in a rack-held test tube */
  function animDisplacement(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var addZn = phase(0.1, 0.4);
    var react = phase(0.3, 0.9);
    var blue = Math.max(0, 1 - react);

    /* geometry — tube walls x∈[246,314], bottom curve y≈288 at centre */
    var tx = 280;
    var top = 96;
    var wallL = tx - 34;
    var wallR = tx + 34;
    var wallBot = 250;
    var botC = 288;
    var liqTop = top + 28;

    /* wooden rack under tube (keeps tube upright on the bench) */
    ctx.fillStyle = '#8b6914';
    roundRect(ctx, tx - 58, 292, 116, 12, 3);
    ctx.fill();
    ctx.fillStyle = '#6b4f10';
    roundRect(ctx, tx - 10, 278, 20, 16, 3);
    ctx.fill();

    /* glass test tube */
    ctx.strokeStyle = 'rgba(100,140,180,0.75)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(wallL, top);
    ctx.lineTo(wallL, wallBot);
    ctx.quadraticCurveTo(tx, botC, wallR, wallBot);
    ctx.lineTo(wallR, top);
    ctx.stroke();
    /* rim */
    ctx.beginPath();
    ctx.moveTo(wallL - 4, top);
    ctx.lineTo(wallL + 2, top);
    ctx.moveTo(wallR - 2, top);
    ctx.lineTo(wallR + 4, top);
    ctx.stroke();

    /* blue CuSO₄ solution (fades to pale ZnSO₄) */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(wallL + 2, liqTop);
    ctx.lineTo(wallL + 2, wallBot);
    ctx.quadraticCurveTo(tx, botC - 3, wallR - 2, wallBot);
    ctx.lineTo(wallR - 2, liqTop);
    ctx.closePath();
    ctx.clip();

    var liqA = 0.35 + 0.5 * blue;
    ctx.fillStyle = 'rgba(37,99,235,' + liqA + ')';
    ctx.fillRect(wallL, liqTop, wallR - wallL, botC - liqTop + 4);

    /* meniscus */
    ctx.fillStyle = 'rgba(96,165,250,' + (0.25 + 0.35 * blue) + ')';
    ctx.beginPath();
    ctx.ellipse(tx, liqTop + 1, 31, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    /* zinc granules — fall then rest on the inner bottom (clipped inside tube) */
    if (addZn > 0) {
      /* resting spots fully inside walls & above bottom curve */
      var spots = [
        { x: tx - 16, y: 270 },
        { x: tx - 4,  y: 274 },
        { x: tx + 8,  y: 272 },
        { x: tx - 10, y: 262 },
        { x: tx + 2,  y: 260 },
        { x: tx + 14, y: 264 }
      ];
      for (var z = 0; z < spots.length; z++) {
        /* staggered drop-in: each granule finishes a little later */
        var zStart = 0.1 + z * 0.04;
        var zEnd = 0.32 + z * 0.03;
        var zk = phase(zStart, zEnd);
        if (zk <= 0) continue;
        var fallY = lerp(top - 20, spots[z].y, zk);
        /* bounce settle on last 15% */
        if (zk > 0.85) {
          fallY = spots[z].y - Math.sin((zk - 0.85) / 0.15 * Math.PI) * 3;
        }
        var gx = spots[z].x;
        var gy = fallY;
        var grx = 6.5 + (z % 3);
        var gry = 4.5 + (z % 2);

        /* metallic zinc body */
        ctx.fillStyle = '#a8b4c0';
        ctx.beginPath();
        ctx.ellipse(gx, gy, grx, gry, (z * 0.7) % Math.PI, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(71,85,105,0.55)';
        ctx.lineWidth = 1;
        ctx.stroke();
        /* highlight */
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.beginPath();
        ctx.ellipse(gx - grx * 0.25, gy - gry * 0.3, grx * 0.35, gry * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        /* brown copper deposit grows on the granule once reacting */
        if (react > 0.25 && zk >= 1) {
          ctx.fillStyle = 'rgba(180,83,9,' + (0.35 + 0.55 * Math.min(1, react)) + ')';
          ctx.beginPath();
          ctx.ellipse(gx + 1, gy + 1.5, grx * 0.85, gry * 0.7, (z * 0.7) % Math.PI, 0, Math.PI * 2);
          ctx.fill();
          /* darker copper flecks */
          ctx.fillStyle = 'rgba(120,53,15,' + (0.4 + 0.4 * react) + ')';
          ctx.beginPath();
          ctx.arc(gx - 2, gy, 1.6, 0, Math.PI * 2);
          ctx.arc(gx + 3, gy - 1, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }

        /* fine bubbles while reaction runs */
        if (react > 0.15 && react < 0.95 && zk >= 1) {
          var bub = ((t * 20 + z * 0.35) % 1);
          ctx.fillStyle = 'rgba(255,255,255,' + (0.55 * (1 - bub)) + ')';
          ctx.beginPath();
          ctx.arc(gx + ((z % 3) - 1) * 3, gy - 6 - bub * 40, 1.8 + bub, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore(); /* end clip */

    /* glass shine over liquid */
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.moveTo(wallL + 6, liqTop + 8);
    ctx.lineTo(wallL + 12, liqTop + 8);
    ctx.lineTo(wallL + 12, 240);
    ctx.lineTo(wallL + 6, 240);
    ctx.closePath();
    ctx.fill();

    /* empty second tube on rack (procedure: test tubes ×2) */
    ctx.strokeStyle = 'rgba(100,140,180,0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx + 70, 170);
    ctx.lineTo(tx + 70, 268);
    ctx.quadraticCurveTo(tx + 90, 288, tx + 110, 268);
    ctx.lineTo(tx + 110, 170);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('empty', tx + 90, 250);

    /* labels — above caption bar (y=324) */
    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Test tube: CuSO\u2084 (aq) + Zn granules', tx, 318);
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('Tube rack', tx, 306);

    var caption = '';
    if (t < 0.1) caption = 'Step 1: Place blue copper(II) sulphate solution in a test tube.';
    else if (t < 0.35) caption = 'Step 2: Add zinc granules to the solution.';
    else if (t < 0.85) caption = 'Step 3: Blue colour fades; brown copper deposits on zinc.';
    else caption = 'Result: Zn(s) + CuSO\u2084(aq) \u2192 ZnSO\u2084(aq) + Cu(s) \u2014 zinc displaces copper.';
    setDemoReadings(
      '<span class="demo-reading"><em>Solution</em><strong>' + (blue > 0.15 ? 'Blue CuSO\u2084' : 'Pale ZnSO\u2084') + '</strong></span>' +
      '<span class="demo-reading"><em>Deposit</em><strong>' + (react > 0.3 ? 'Cu on Zn' : '\u2014') + '</strong></span>' +
      '<span class="demo-reading"><em>Zn in tube</em><strong>' + (addZn > 0.5 ? 'Yes' : 'Adding\u2026') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  /* M7_7 — Test for water: anhydrous copper sulphate turns blue */
  function animWaterTest(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var addWater = phase(0.1, 0.55);
    var turnBlue = phase(0.2, 0.8);

    /* watch glass */
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.ellipse(280, 232, 110, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.ellipse(280, 232, 80, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    /* white anhydrous powder turning blue */
    var pc = turnBlue > 0.5 ? 'rgb(37,99,235)' : lerpRGB(232, 240, 254, 37, 99, 235, turnBlue);
    ctx.fillStyle = pc;
    ctx.beginPath();
    ctx.ellipse(280, 228, 34, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    /* dropper */
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(280, 60);
    ctx.lineTo(280, 110);
    ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(270, 108, 20, 12);
    /* dropping water */
    var drop = (t * 20) % 1;
    if (addWater > 0 || drop < 0.5) {
      ctx.fillStyle = 'rgba(96,165,250,0.9)';
      ctx.beginPath();
      ctx.arc(280, 122 + drop * 60, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Anhydrous CuSO\u2084 (white) on watch glass', 280, 292);

    var caption = '';
    if (t < 0.1) caption = 'Step 1: Place a little anhydrous copper(II) sulphate on a watch glass.';
    else if (t < 0.35) caption = 'Step 2: Add a few drops of distilled water.';
    else if (t < 0.8) caption = 'Step 3: The white powder turns blue in the presence of water.';
    else caption = 'Result: white \u2192 blue confirms water (CuSO\u2084 + 5H\u2082O \u2192 CuSO\u2084\u00b75H\u2082O).';
    setDemoReadings(
      '<span class="demo-reading"><em>Powder</em><strong>' + (turnBlue > 0.5 ? 'Blue' : 'White') + '</strong></span>' +
      '<span class="demo-reading"><em>Water</em><strong>' + (addWater > 0.2 ? 'Added' : 'Pending') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);

    function lerpRGB(r1, g1, b1, r2, g2, b2, k) {
      return 'rgb(' + Math.round(r1 + (r2 - r1) * k) + ',' + Math.round(g1 + (g2 - g1) * k) + ',' + Math.round(b1 + (b2 - b1) * k) + ')';
    }
  }

  /* M7_8 — Purity of water: melting (0°C) and boiling (100°C) */
  function animPurity(ctx, W, H, t) {
    drawDemoBg(ctx, W, H);

    function phase(a, b) {
      if (t < a) return 0;
      if (t > b) return 1;
      return (t - a) / (b - a);
    }
    function lerp(a, b, k) { return a + (b - a) * k; }

    var mpTest = phase(0, 0.5);
    var bpTest = phase(0.5, 1);

    if (mpTest < 1) {
      /* ---- melting point of ice (0°C) ---- */
      var bx = 190, by = 180, bw = 150, bh = 90;
      ctx.fillStyle = 'rgba(147,197,253,0.4)';
      ctx.fillRect(bx + 5, by + 14, bw - 10, bh - 19);
      ctx.strokeStyle = 'rgba(100,140,180,0.6)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      roundRect(ctx, bx, by, bw, bh, 6);
      ctx.stroke();
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(bx + 20, by + 12, 46, 22);
      ctx.fillRect(bx + 76, by + 20, 42, 14);

      /* thermometer */
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(bx + 118, by + 44, 5, 14);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(bx + 110, by - 16, 12, 80);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx + 110, by - 16, 12, 80);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('0\u00b0C', bx + 104, by - 22);

      ctx.fillStyle = '#475569';
      ctx.font = '12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Melting point of ice', bx + bw / 2, by + bh + 16);
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText('Part 1: Ice melts at 0\u00b0C (pure water)', W / 2, 320);
    } else {
      /* ---- boiling point of water (100°C) ---- */
      var fx = 150, fy = 175, fr = 55;
      ctx.fillStyle = 'rgba(191,219,254,0.6)';
      ctx.beginPath();
      ctx.arc(fx, fy + 10, fr - 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,140,180,0.6)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(fx, fy + 10, fr, Math.PI, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = 'rgba(100,140,180,0.6)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(fx - 20, fy - 40);
      ctx.lineTo(fx - 20, fy - 90);
      ctx.moveTo(fx + 20, fy - 40);
      ctx.lineTo(fx + 20, fy - 90);
      ctx.stroke();
      /* stand */
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fx, fy + 65);
      ctx.lineTo(fx, 322);
      ctx.moveTo(fx - 34, 322);
      ctx.lineTo(fx + 34, 322);
      ctx.stroke();
      /* bunsen */
      var flick = 0.85 + 0.15 * Math.sin(t * 24 * Math.PI);
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.moveTo(fx - 10, 322);
      ctx.quadraticCurveTo(fx, 322 - 34 * flick, fx + 10, 322);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,170,0,0.8)';
      ctx.beginPath();
      ctx.moveTo(fx - 6, 322);
      ctx.quadraticCurveTo(fx, 322 - 18, fx + 6, 322);
      ctx.closePath();
      ctx.fill();
      /* bubbles */
      for (var b = 0; b < 5; b++) {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(fx - 18 + b * 8, fy + 30 - (b * 8) % 30, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      /* thermometer */
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(fx - 8, fy - 100, 7, 18);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.strokeRect(fx - 8, fy - 100, 7, 18);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(fx - 6, fy - 92, 3, 10);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('100\u00b0C', fx - 12, fy - 104);

      ctx.fillStyle = '#475569';
      ctx.font = '12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Boiling point of water', fx, fy + fr + 30);
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText('Part 2: Water boils at 100\u00b0C (pure water)', W / 2, 320);
    }

    var caption = mpTest < 1 ? 'Step 1: Determine the melting point of the sample (\u22480\u00b0C).' : 'Step 2: Determine the boiling point (\u2248100\u00b0C). Pure values confirm purity.';
    setDemoReadings(
      '<span class="demo-reading"><em>Test</em><strong>' + (mpTest < 1 ? 'Melting (0\u00b0C)' : 'Boiling (100\u00b0C)') + '</strong></span>' +
      '<span class="demo-reading"><em>Purity</em><strong>' + (mpTest < 1 ? 'Checking MP' : 'Checking BP') + '</strong></span>'
    );
    drawCaption(ctx, caption, W, H);

    drawProgressRing(ctx, W, t);
  }

  function stopAnimation() {
    if (animReqId) {
      cancelAnimationFrame(animReqId);
      animReqId = null;
    }
    animPaused = false;
    animPauseAccum = 0;
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
      if (ds.practicalView === 'play') {
        runPracticalAnimation(demoAnimKey(ds.practicalId || 'A1'));
      } else {
        stopAnimation();
      }
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
        ds.practicalView = 'list';
        renderInto(appState);
        return;
      }
      if (target.id === 'btn-demo-exit' || target.id === 'btn-demo-exit-complete') {
        stopAnimation();
        appState.demoState = { screen: 'intro', step: 0, practicalId: 'A1', practicalView: 'list' };
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
        runPracticalAnimation(demoAnimKey(ds.practicalId || 'A1'));
        return;
      }
      if (target.closest && target.closest('#btn-demo-anim-stop')) {
        if (animPaused) {
          resumePracticalAnimation();
        } else {
          pausePracticalAnimation();
        }
        return;
      }
      var cardEl = target.closest && target.closest('[data-demo-id]');
      if (cardEl && cardEl.getAttribute('data-demo-id')) {
        ds.practicalId = cardEl.getAttribute('data-demo-id');
        ds.practicalView = 'play';
        renderInto(appState);
        return;
      }
      if (target.id === 'btn-demo-back-list') {
        stopAnimation();
        ds.practicalView = 'list';
        renderInto(appState);
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
    appState.demoState = { screen: 'intro', step: 0, practicalId: 'A1', practicalView: 'list' };
  }
  DemoEngine.attachListeners(appState);
  return ''; /* content rendered by renderInto */
});
