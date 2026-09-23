/* ================================================================
   ChemSim — Mystery Lab Screen
   Unknown sample identification through chemical testing
   ================================================================ */

ChemSim.registerScreen('mystery', function(appState) {
  if (!appState.mysteryState) {
    appState.mysteryState = {
      phase: 'select',
      currentSample: null,
      currentTestIdx: -1,
      testsPerformed: {},
      observations: {},
      identification: '',
      score: 0
    };
  }
  return '<div class="mystery-screen" id="mystery-root"></div>';
});

/* ============================================================
   RENDER ENTRY POINT
   ============================================================ */

function renderMysteryScreen() {
  var root = document.getElementById('mystery-root');
  var workspace = document.getElementById('workspace-content');
  var appState = ChemSim.getState();
  var state = appState.mysteryState;

  if (!state) {
    state = { phase: 'select', currentSample: null, currentTestIdx: -1, testsPerformed: {}, observations: {}, identification: '', score: 0 };
    appState.mysteryState = state;
  }

  /* Full workspace render */
  var instructionPanel = document.getElementById('instruction-content');
  var headerCenter = document.getElementById('header-center');
  var headerProgress = document.getElementById('header-progress');
  var btnBack = document.getElementById('btn-back');
  var btnActionBack = document.getElementById('btn-action-back');
  var btnActionNext = document.getElementById('btn-action-next');
  var btnActionReset = document.getElementById('btn-action-reset');
  var actionCenter = document.getElementById('action-center');
  var sidebarExperiments = document.getElementById('sidebar-experiments');

  sidebarExperiments.style.display = 'none';
  headerProgress.style.display = 'none';
  btnActionBack.style.display = 'none';
  btnActionNext.style.display = 'none';
  btnActionReset.style.display = 'none';
  actionCenter.innerHTML = '';

  if (state.phase === 'select') {
    headerCenter.innerHTML = '';
    headerCenter.style.display = 'none';
    btnBack.style.display = 'none';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Select a mystery sample to investigate.</p></div>';
    workspace.innerHTML = renderMysterySelectHTML(state);
    attachSelectListeners(state);
  } else if (state.phase === 'investigate') {
    btnBack.style.display = '';
    headerCenter.innerHTML = '<span class="header-experiment-title">Mystery Lab</span>';
    headerCenter.style.display = '';
    instructionPanel.innerHTML = renderMysteryInstructions(state);
    workspace.innerHTML = renderMysteryInvestigateHTML(state);
    attachInvestigateListeners(state);
  } else if (state.phase === 'identify') {
    btnBack.style.display = '';
    headerCenter.innerHTML = '<span class="header-experiment-title">Mystery Lab</span>';
    headerCenter.style.display = '';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Based on your test results, identify the unknown substance.</p></div>';
    workspace.innerHTML = renderMysteryIdentifyHTML(state);
    attachIdentifyListeners(state);
  } else if (state.phase === 'result') {
    btnBack.style.display = '';
    headerCenter.innerHTML = '<span class="header-experiment-title">Mystery Lab</span>';
    headerCenter.style.display = '';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Review your investigation results.</p></div>';
    workspace.innerHTML = renderMysteryResultHTML(state);
    attachResultListeners(state);
  }
}

/* ============================================================
   SELECT PHASE — Choose a Mystery Sample
   ============================================================ */

function renderMysterySelectHTML(state) {
  var samples = MysteryService.getSamples();
  var h = '';
  h += '<div class="module-header"><h2>Mystery Lab</h2>';
  h += '<p>Investigate unknown substances using chemical tests and evidence-based reasoning.</p></div>';

  if (!samples || samples.length === 0) {
    h += '<div class="card"><div class="card-body"><p>No mystery samples available.</p></div></div>';
    return h;
  }

  h += '<div class="mystery-samples-grid">';
  for (var i = 0; i < samples.length; i++) {
    var s = samples[i];
    h += '<button class="card mystery-sample-card" data-mystery-id="' + s.id + '">';
    h += '<div class="card-body">';
    h += '<div class="mystery-sample-header">';
    h += '<span class="mystery-sample-badge">' + esc(s.difficulty) + '</span>';
    h += '<span class="mystery-sample-marks">' + s.marks + ' marks</span>';
    h += '</div>';
    h += '<h3>' + esc(s.title) + '</h3>';
    h += '<p class="text-secondary">' + esc(s.description) + '</p>';
    h += '<p class="mystery-sample-tests">' + s.tests.length + ' tests available</p>';
    h += '</div></button>';
  }
  h += '</div>';
  return h;
}

function attachSelectListeners(state) {
  var cards = document.querySelectorAll('[data-mystery-id]');
  for (var k = 0; k < cards.length; k++) {
    cards[k].addEventListener('click', function() {
      var sampleId = this.getAttribute('data-mystery-id');
      var sample = MysteryService.getSample(sampleId);
      if (!sample) return;
      var appState = ChemSim.getState();
      appState.mysteryState = {
        phase: 'investigate',
        currentSample: sample,
        currentTestIdx: 0,
        testsPerformed: {},
        observations: {},
        identification: '',
        score: 0
      };
      renderMysteryScreen();
    });
  }
}

/* ============================================================
   INVESTIGATE PHASE — Perform Tests with Tool Visuals
   ============================================================ */

function renderMysteryInvestigateHTML(state) {
  var sample = state.currentSample;
  if (!sample) return '<p>No sample selected.</p>';
  var tests = sample.tests;
  var performedCount = 0;
  for (var c = 0; c < tests.length; c++) {
    if (state.testsPerformed[tests[c].id]) performedCount++;
  }
  var allDone = performedCount === tests.length;

  var h = '';
  h += '<div class="mystery-investigate">';

  /* Title */
  h += '<div class="mystery-q-title">';
  h += '<h3>' + esc(sample.title) + '</h3>';
  h += '<span class="mystery-badge">' + esc(sample.difficulty) + ' — ' + sample.marks + ' marks</span>';
  h += '</div>';

  h += '<div class="mystery-description"><p>' + esc(sample.description) + '</p></div>';

  /* Progress */
  h += '<div class="mystery-progress-bar">';
  h += '<div class="mystery-progress-fill" style="width:' + Math.round((performedCount / tests.length) * 100) + '%"></div>';
  h += '</div>';
  h += '<p class="mystery-progress-text">' + performedCount + ' / ' + tests.length + ' tests performed</p>';

  /* Test Buttons with tool icons */
  h += '<div class="mystery-test-buttons">';
  for (var i = 0; i < tests.length; i++) {
    var test = tests[i];
    var done = state.testsPerformed[test.id];
    var isActive = (state.currentTestIdx === i);
    var cls = 'mystery-test-btn';
    if (done) cls += ' mystery-test-done';
    if (isActive) cls += ' mystery-test-active';
    h += '<button class="' + cls + '" data-test-idx="' + i + '">';
    h += '<span class="mystery-test-icon">' + test.icon + '</span>';
    h += '<span class="mystery-test-name">' + esc(test.name) + '</span>';
    if (done) h += '<span class="mystery-test-check">&#10003;</span>';
    h += '</button>';
  }
  h += '</div>';

  /* Test Detail with Tool Visual */
  if (state.currentTestIdx >= 0 && state.currentTestIdx < tests.length) {
    var currentTest = tests[state.currentTestIdx];
    var isPerformed = state.testsPerformed[currentTest.id];

    h += '<div class="mystery-test-detail">';
    h += '<div class="mystery-test-detail-header">';
    h += '<h4>' + currentTest.icon + ' ' + esc(currentTest.name) + '</h4>';
    h += '</div>';

    /* Tool Visual — shows the equipment/procedure */
    h += renderToolVisual(currentTest, isPerformed);

    h += '<div class="mystery-test-steps">';
    h += '<p><strong>Procedure:</strong> ' + esc(currentTest.description) + '</p>';

    if (!isPerformed) {
      h += '<button class="btn btn-primary mystery-perform-btn" id="mystery-perform-test">Perform Test</button>';
    } else {
      /* Observation */
      h += '<div class="mystery-observation">';
      h += '<h5>Observation</h5>';
      h += '<p class="mystery-obs-text">' + esc(currentTest.observation) + '</p>';
      h += '</div>';

      /* Interpretation */
      h += '<div class="mystery-interpretation">';
      h += '<h5>Interpretation</h5>';
      h += '<p class="mystery-int-text">' + esc(currentTest.interpretation) + '</p>';
      h += '</div>';

      /* Optional student note */
      h += '<div class="mystery-note">';
      h += '<label><strong>Optional Note (your own observation):</strong></label>';
      h += '<textarea class="mystery-textarea" id="mystery-note-' + currentTest.id + '" rows="2" placeholder="Add your own observation note (optional)...">' + esc(state.observations[currentTest.id] || '') + '</textarea>';
      h += '</div>';
    }
    h += '</div></div>';
  }

  /* Navigation */
  h += '<div class="pba-nav">';
  h += '<button class="btn btn-secondary" id="mystery-back-to-select">Back to List</button>';
  if (allDone) {
    h += '<button class="btn btn-primary" id="mystery-go-result">See Result</button>';
  } else {
    h += '<span class="text-secondary">Perform all tests to see result</span>';
  }
  h += '</div>';

  h += '</div>';
  return h;
}

/* ============================================================
   TOOL VISUAL — Equipment Graphics for Each Test
   ============================================================ */

function renderToolVisual(test, performed) {
  var h = '<div class="mystery-tool-visual">';
  h += '<div class="tool-visual-inner">';

  var toolType = getToolType(test.id);

  if (toolType === 'flame') {
    h += '<div class="tool-equipment">';
    h += '<div class="tool-bunsen">';
    h += '<div class="bunsen-base"></div>';
    h += '<div class="bunsen-tube"></div>';
    if (performed) {
      h += '<div class="bunsen-flame active">';
      h += '<div class="flame-inner"></div>';
      h += '<div class="flame-outer"></div>';
      h += '</div>';
    } else {
      h += '<div class="bunsen-flame"></div>';
    }
    h += '</div>';
    if (performed) {
      h += '<div class="tool-wire">';
        h += '<div class="wire-handle"></div>';
        h += '<div class="wire-rod"></div>';
        h += '<div class="wire-sample"></div>';
      h += '</div>';
    }
    h += '<p class="tool-label">Bunsen Burner + Platinum Wire</p>';
    h += '</div>';
  } else if (toolType === 'testtube') {
    h += '<div class="tool-equipment">';
    h += '<div class="tool-rack">';
    h += '<div class="rack-base"></div>';
    for (var t = 0; t < 3; t++) {
      var filled = performed && t === 1;
      h += '<div class="rack-tube' + (filled ? ' filled' : '') + '">';
      h += '<div class="tube-body"></div>';
      if (filled) h += '<div class="tube-liquid"></div>';
      h += '</div>';
    }
    h += '</div>';
    h += '<p class="tool-label">Test Tubes + Rack</p>';
    h += '</div>';
  } else if (toolType === 'beaker') {
    h += '<div class="tool-equipment">';
    h += '<div class="tool-beaker">';
    h += '<div class="beaker-body">';
    if (performed) h += '<div class="beaker-liquid"></div>';
    h += '<div class="beaker-markings"></div>';
    h += '</div>';
    h += '<div class="beaker-spout"></div>';
    h += '</div>';
    if (performed) {
      h += '<div class="tool-dropper">';
      h += '<div class="dropper-bulb"></div>';
      h += '<div class="dropper-tube"></div>';
      h += '<div class="dropper-drop"></div>';
      h += '</div>';
    }
    h += '<p class="tool-label">Beaker + Dropper</p>';
    h += '</div>';
  } else if (toolType === 'bottle') {
    h += '<div class="tool-equipment">';
    h += '<div class="tool-reagent-bottle">';
    h += '<div class="bottle-cap"></div>';
    h += '<div class="bottle-neck"></div>';
    h += '<div class="bottle-body">';
    if (performed) h += '<div class="bottle-liquid"></div>';
    h += '</div>';
    h += '<div class="bottle-label">Reagent</div>';
    h += '</div>';
    h += '<p class="tool-label">Reagent Bottle</p>';
    h += '</div>';
  } else if (toolType === 'litmus') {
    h += '<div class="tool-equipment">';
    h += '<div class="tool-litmus">';
    h += '<div class="litmus-paper red">';
    if (performed) h += '<div class="litmus-change"></div>';
    h += '<span>Red</span>';
    h += '</div>';
    h += '<div class="litmus-paper blue">';
    if (performed) h += '<div class="litmus-change blue-change"></div>';
    h += '<span>Blue</span>';
    h += '</div>';
    h += '</div>';
    h += '<p class="tool-label">Litmus Paper</p>';
    h += '</div>';
  } else if (toolType === 'funnel') {
    h += '<div class="tool-equipment">';
    h += '<div class="tool-funnel-set">';
    h += '<div class="funnel-dish">';
    if (performed) h += '<div class="dish-steam"></div>';
    h += '</div>';
    h += '<div class="funnel-body">';
    h += '<div class="funnel-cone"></div>';
    h += '<div class="funnel-stem"></div>';
    if (performed) h += '<div class="funnel-collect"></div>';
    h += '</div>';
    h += '</div>';
    h += '<p class="tool-label">Evaporating Dish + Funnel</p>';
    h += '</div>';
  } else {
    h += '<div class="tool-equipment">';
    h += '<div class="tool-generic">';
    h += '<div class="generic-icon">' + test.icon + '</div>';
    h += '</div>';
    h += '<p class="tool-label">' + esc(test.name) + '</p>';
    h += '</div>';
  }

  if (performed) {
    h += '<div class="tool-status performed">&#10003; Test Performed</div>';
  } else {
    h += '<div class="tool-status pending">Click "Perform Test" to begin</div>';
  }

  h += '</div></div>';
  return h;
}

function getToolType(testId) {
  if (testId.indexOf('flame') !== -1) return 'flame';
  if (testId.indexOf('litmus') !== -1) return 'litmus';
  if (testId.indexOf('naoh') !== -1 || testId.indexOf('nh3') !== -1 || testId.indexOf('silver') !== -1) return 'testtube';
  if (testId.indexOf('dissolve') !== -1 || testId.indexOf('solub') !== -1) return 'beaker';
  if (testId.indexOf('limewater') !== -1 || testId.indexOf('hcl') !== -1) return 'bottle';
  if (testId.indexOf('sublim') !== -1 || testId.indexOf('residue') !== -1) return 'funnel';
  if (testId.indexOf('displace') !== -1) return 'testtube';
  if (testId.indexOf('appearance') !== -1 || testId.indexOf('smell') !== -1) return 'beaker';
  if (testId.indexOf('burning') !== -1) return 'flame';
  return 'beaker';
}

function renderMysteryInstructions(state) {
  var sample = state.currentSample;
  var h = '<div class="pba-instructions">';
  h += '<div class="pba-inst-header">';
  h += '<span class="pba-inst-qnum">Investigation</span>';
  h += '<span class="pba-inst-marks">' + sample.marks + ' marks</span>';
  h += '</div>';
  h += '<p>Click a test button to select it, then perform the test to see the observation and equipment.</p>';
  h += '<p class="text-secondary" style="margin-top:var(--space-3);">After performing all tests, click "Identify the Substance".</p>';
  h += '</div>';
  return h;
}

function attachInvestigateListeners(state) {
  /* Test selection */
  var testBtns = document.querySelectorAll('[data-test-idx]');
  for (var i = 0; i < testBtns.length; i++) {
    testBtns[i].addEventListener('click', function() {
      state.currentTestIdx = parseInt(this.getAttribute('data-test-idx'), 10);
      renderMysteryScreen();
    });
  }

  /* Perform test */
  var performBtn = document.getElementById('mystery-perform-test');
  if (performBtn) {
    performBtn.addEventListener('click', function() {
      var test = state.currentSample.tests[state.currentTestIdx];
      if (test) {
        state.testsPerformed[test.id] = true;
        renderMysteryScreen();
      }
    });
  }

  /* Save notes */
  var notes = document.querySelectorAll('[id^="mystery-note-"]');
  for (var n = 0; n < notes.length; n++) {
    notes[n].addEventListener('input', function() {
      var testId = this.id.replace('mystery-note-', '');
      state.observations[testId] = this.value;
    });
  }

  /* Back */
  var backBtn = document.getElementById('mystery-back-to-select');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      var appState = ChemSim.getState();
      appState.mysteryState.phase = 'select';
      appState.mysteryState.currentSample = null;
      renderMysteryScreen();
    });
  }

  /* See Result — score and show result directly */
  var resultBtn = document.getElementById('mystery-go-result');
  if (resultBtn) {
    resultBtn.addEventListener('click', function() {
      state.identification = state.currentSample.identity;
      scoreMystery(state);
      state.phase = 'result';
      /* Create log record */
      try {
        var logRecord = ExpLog.buildMysteryRecord(state);
        ExpLog.add(logRecord);
      } catch(e) {}
      renderMysteryScreen();
    });
  }
}

/* ============================================================
   IDENTIFY PHASE
   ============================================================ */

function renderMysteryIdentifyHTML(state) {
  var sample = state.currentSample;
  var h = '';
  h += '<div class="mystery-identify">';
  h += '<div class="mystery-q-title">';
  h += '<h3>Identify: ' + esc(sample.title) + '</h3>';
  h += '</div>';

  h += '<div class="mystery-identify-form">';
  h += '<p><strong>Based on your test results, what is the unknown substance?</strong></p>';
  h += '<textarea class="mystery-textarea" id="mystery-identification" rows="3" placeholder="Type your identification here...">' + esc(state.identification) + '</textarea>';
  h += '</div>';

  /* Summary */
  h += '<div class="mystery-test-summary">';
  h += '<h4>Tests Performed</h4>';
  for (var i = 0; i < sample.tests.length; i++) {
    var test = sample.tests[i];
    if (state.testsPerformed[test.id]) {
      h += '<div class="mystery-summary-item">';
      h += '<span class="mystery-summary-icon">' + test.icon + '</span>';
      h += '<span class="mystery-summary-name">' + esc(test.name) + '</span>';
      h += '<span class="mystery-summary-obs">' + esc(test.observation) + '</span>';
      h += '</div>';
    }
  }
  h += '</div>';

  h += '<div class="pba-nav">';
  h += '<button class="btn btn-secondary" id="mystery-back-investigate">Back to Tests</button>';
  h += '<button class="btn btn-primary" id="mystery-submit-identification">Submit Identification</button>';
  h += '</div>';
  h += '</div>';
  return h;
}

function attachIdentifyListeners(state) {
  var textarea = document.getElementById('mystery-identification');
  if (textarea) {
    textarea.addEventListener('input', function() { state.identification = this.value; });
  }
  var backBtn = document.getElementById('mystery-back-investigate');
  if (backBtn) {
    backBtn.addEventListener('click', function() { state.phase = 'investigate'; renderMysteryScreen(); });
  }
  var submitBtn = document.getElementById('mystery-submit-identification');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      scoreMystery(state);
      state.phase = 'result';
      renderMysteryScreen();
    });
  }
}

/* ============================================================
   SCORING
   ============================================================ */

function scoreMystery(state) {
  var sample = state.currentSample;
  var testsPerformedCount = 0;
  for (var i = 0; i < sample.tests.length; i++) {
    if (state.testsPerformed[sample.tests[i].id]) testsPerformedCount++;
  }
  state.score = Math.round((testsPerformedCount / sample.tests.length) * sample.marks);
  state.totalMarks = sample.marks;
}

/* ============================================================
   RESULT PHASE
   ============================================================ */

function renderMysteryResultHTML(state) {
  var sample = state.currentSample;
  var pct = state.totalMarks > 0 ? Math.round((state.score / state.totalMarks) * 100) : 0;
  var grade = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
  var gc = pct >= 80 ? 'var(--color-success)' : pct >= 60 ? 'var(--color-primary)' : pct >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';

  var h = '';
  h += '<div class="mystery-result">';
  h += '<div class="mystery-result-header"><h3>Investigation Complete</h3><p>' + esc(sample.title) + '</p></div>';

  h += '<div class="pba-result-score">';
  h += '<div class="pba-score-circle" style="border-color:' + gc + '">';
  h += '<span class="pba-score-num">' + state.score + '</span>';
  h += '<span class="pba-score-total">/ ' + state.totalMarks + '</span>';
  h += '</div>';
  h += '<div class="pba-score-detail">';
  h += '<p class="pba-grade" style="color:' + gc + '">Grade: ' + grade + '</p>';
  h += '<p>Percentage: ' + pct + '%</p>';
  h += '</div></div>';

  /* Revealed identity */
  h += '<div class="mystery-id-result">';
  h += '<h4>The Unknown Substance Is</h4>';
  h += '<p class="mystery-id-your">' + esc(sample.identity) + '</p>';
  h += '</div>';

  h += '<div class="mystery-conclusion"><h4>Conclusion</h4><p>' + esc(sample.conclusion) + '</p></div>';

  /* Evidence summary */
  h += '<div class="mystery-result-breakdown"><h4>Evidence Summary</h4>';
  h += '<table class="pba-breakdown-table"><thead><tr><th>Test</th><th>Observation</th><th>What It Tells Us</th></tr></thead><tbody>';
  for (var i = 0; i < sample.tests.length; i++) {
    var test = sample.tests[i];
    var performed = state.testsPerformed[test.id];
    h += '<tr class="' + (performed ? 'row-correct' : 'row-incorrect') + '">';
    h += '<td>' + test.icon + ' ' + esc(test.name) + '</td>';
    h += '<td>' + esc(performed ? test.observation : 'Not performed') + '</td>';
    h += '<td>' + esc(performed ? test.interpretation : '—') + '</td>';
    h += '</tr>';
  }
  h += '</tbody></table></div>';

  /* Student notes if any */
  var hasNotes = false;
  for (var n = 0; n < sample.tests.length; n++) {
    if (state.observations[sample.tests[n].id]) { hasNotes = true; break; }
  }
  if (hasNotes) {
    h += '<div class="mystery-result-breakdown"><h4>Your Notes</h4>';
    for (var j = 0; j < sample.tests.length; j++) {
      var t = sample.tests[j];
      if (state.observations[t.id]) {
        h += '<div class="mystery-summary-item">';
        h += '<span class="mystery-summary-icon">' + t.icon + '</span>';
        h += '<span class="mystery-summary-obs">' + esc(state.observations[t.id]) + '</span>';
        h += '</div>';
      }
    }
    h += '</div>';
  }

  h += '<div class="pba-nav"><button class="btn btn-primary" id="mystery-back-to-list">Back to Mystery Lab</button></div>';
  h += '</div>';
  return h;
}

function attachResultListeners(state) {
  var homeBtn = document.getElementById('mystery-back-to-list');
  if (homeBtn) {
    homeBtn.addEventListener('click', function() {
      var appState = ChemSim.getState();
      appState.mysteryState.phase = 'select';
      appState.mysteryState.currentSample = null;
      renderMysteryScreen();
    });
  }
}

/* ============================================================
   UTILITY
   ============================================================ */

function esc(str) {
  if (!str) return '';
  return ChemSim.escapeHtml(str);
}
