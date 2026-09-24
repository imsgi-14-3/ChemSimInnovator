/* ================================================================
   ChemSim — Mystery Lab Screen
   Unknown sample identification through chemical testing
   Detective case-file mode: test budget, countdown, paid hints,
   keyword-scored interpretation and decoy-candidate identification.
   ================================================================ */

var mysteryTimerHandle = null;
var mysteryTimeUpHandled = false;

ChemSim.registerScreen('mystery', function(appState) {
  if (!appState.mysteryState) {
    appState.mysteryState = newMysteryState();
  }
  return '<div class="mystery-screen" id="mystery-root"></div>';
});

function newMysteryState() {
  return {
    phase: 'select',
    currentSample: null,
    currentTestIdx: -1,
    testsPerformed: {},
    observations: {},
    interpretations: {},
    hintsUsed: {},
    identification: '',
    selectedCandidate: '',
    score: 0,
    totalMarks: 0,
    testBudget: 0,
    timeLimit: 0,
    deadline: 0,
    timeUp: false,
    scoreDetail: null
  };
}

/* ============================================================
   RENDER ENTRY POINT
   ============================================================ */

function renderMysteryScreen() {
  var root = document.getElementById('mystery-root');
  var workspace = document.getElementById('workspace-content');
  var appState = ChemSim.getState();
  var state = appState.mysteryState;

  if (!state) {
    state = newMysteryState();
    appState.mysteryState = state;
  }

  if (typeof MysteryToolRenderer !== 'undefined') MysteryToolRenderer.stop();

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
    stopMysteryTimer();
    headerCenter.innerHTML = '';
    headerCenter.style.display = 'none';
    btnBack.style.display = 'none';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Select a mystery case file to investigate.</p></div>';
    workspace.innerHTML = renderMysterySelectHTML(state);
    attachSelectListeners(state);
  } else if (state.phase === 'investigate') {
    ensureMysteryTimer(state);
    btnBack.style.display = '';
    headerCenter.innerHTML = '<span class="header-experiment-title">Mystery Lab</span>';
    headerCenter.style.display = '';
    instructionPanel.innerHTML = renderMysteryInstructions(state);
    workspace.innerHTML = renderMysteryInvestigateHTML(state);
    attachInvestigateListeners(state);
  } else if (state.phase === 'identify') {
    ensureMysteryTimer(state);
    btnBack.style.display = '';
    headerCenter.innerHTML = '<span class="header-experiment-title">Mystery Lab</span>';
    headerCenter.style.display = '';
    instructionPanel.innerHTML = renderMysteryInstructions(state);
    workspace.innerHTML = renderMysteryIdentifyHTML(state);
    attachIdentifyListeners(state);
  } else if (state.phase === 'result') {
    stopMysteryTimer();
    btnBack.style.display = '';
    headerCenter.innerHTML = '<span class="header-experiment-title">Mystery Lab</span>';
    headerCenter.style.display = '';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Review your investigation results.</p></div>';
    workspace.innerHTML = renderMysteryResultHTML(state);
    attachMysteryResultListeners(state);
  }

  updateMysteryTimerDisplay(state);
}

/* ============================================================
   CASE TIMER — counts down across investigate + identify
   ============================================================ */

function mysteryTimeLeft(state) {
  if (!state.deadline) return (state.timeLimit || 0) * 1000;
  return Math.max(0, state.deadline - Date.now());
}

function fmtMysteryTime(seconds) {
  if (isNaN(seconds) || seconds < 0) seconds = 0;
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function ensureMysteryTimer(state) {
  if (state.timeUp) return;
  if (!state.deadline) {
    state.deadline = Date.now() + (state.timeLimit || 300) * 1000;
  }
  if (mysteryTimerHandle) return;
  mysteryTimeUpHandled = false;
  mysteryTimerHandle = setInterval(function() {
    onMysteryTick(state);
  }, 250);
}

function stopMysteryTimer() {
  if (mysteryTimerHandle) {
    clearInterval(mysteryTimerHandle);
    mysteryTimerHandle = null;
  }
}

function onMysteryTick(state) {
  updateMysteryTimerDisplay(state);
  if (mysteryTimeLeft(state) <= 0 && !mysteryTimeUpHandled) {
    mysteryTimeUpHandled = true;
    stopMysteryTimer();
    finalizeMystery(state, true);
  }
}

function updateMysteryTimerDisplay(state) {
  var el = document.getElementById('mystery-timer');
  if (!el) return;
  var seconds = Math.ceil(mysteryTimeLeft(state) / 1000);
  el.textContent = fmtMysteryTime(seconds);
  if (seconds <= 30) {
    el.classList.add('mystery-timer-danger');
  } else {
    el.classList.remove('mystery-timer-danger');
  }
}

/* ============================================================
   SHARED CASE BAR — case number, timer, test budget
   ============================================================ */

function renderMysteryCaseBar(state) {
  var sample = state.currentSample;
  var h = '<div class="mystery-casebar">';
  h += '<span class="mystery-case-badge">🔍 CASE #' + esc(sample.id) + '</span>';
  h += '<span class="mystery-case-difficulty">' + esc(sample.difficulty) + '</span>';
  h += '<span class="mystery-timer-chip" id="mystery-timer">' + fmtMysteryTime(Math.ceil(mysteryTimeLeft(state) / 1000)) + '</span>';
  h += '<span class="mystery-budget-chip">🧪 ' + countPerformed(state) + ' / ' + state.testBudget + ' tests used</span>';
  h += '</div>';
  return h;
}

function countPerformed(state) {
  var n = 0;
  if (!state.currentSample) return 0;
  for (var i = 0; i < state.currentSample.tests.length; i++) {
    if (state.testsPerformed[state.currentSample.tests[i].id]) n++;
  }
  return n;
}

function countHints(state) {
  var n = 0;
  for (var k in state.hintsUsed) {
    if (state.hintsUsed[k]) n++;
  }
  return n;
}

function isCorrectCandidate(sample, candId) {
  if (!sample || !sample.candidates) return false;
  for (var i = 0; i < sample.candidates.length; i++) {
    if (sample.candidates[i].id === candId) return !!sample.candidates[i].correct;
  }
  return false;
}

function candidateLabel(sample, candId) {
  if (!sample || !sample.candidates) return '';
  for (var i = 0; i < sample.candidates.length; i++) {
    if (sample.candidates[i].id === candId) return sample.candidates[i].label;
  }
  return '';
}

/* ============================================================
   SELECT PHASE — Case Files
   ============================================================ */

function renderMysterySelectHTML(state) {
  var samples = MysteryService.getSamples();
  var h = '';
  h += '<div class="module-header"><h2>Mystery Lab</h2>';
  h += '<p>Open a case file, gather evidence within your test budget, and name the unknown substance.</p></div>';

  if (!samples || samples.length === 0) {
    h += '<div class="card"><div class="card-body"><p>No mystery cases available.</p></div></div>';
    return h;
  }

  h += '<div class="mystery-samples-grid">';
  for (var i = 0; i < samples.length; i++) {
    var s = samples[i];
    h += '<button class="card mystery-sample-card" data-mystery-id="' + s.id + '">';
    h += '<div class="card-body">';
    h += '<div class="mystery-sample-header">';
    h += '<span class="mystery-case-badge">🔍 CASE #' + esc(s.id) + '</span>';
    h += '<span class="mystery-sample-badge">' + esc(s.difficulty) + '</span>';
    h += '<span class="mystery-sample-marks">' + s.marks + ' marks</span>';
    h += '</div>';
    h += '<h3>' + esc(s.title) + '</h3>';
    h += '<p class="text-secondary">' + esc(s.description) + '</p>';
    h += '<p class="mystery-sample-rules">🧪 ' + (s.maxTests || 3) + ' test budget · ⏱ ' + fmtMysteryTime(s.timeLimit || 300) + ' · 💡 hints cost ' + (s.hintCost || 1) + ' mark</p>';
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
      var fresh = newMysteryState();
      fresh.phase = 'investigate';
      fresh.currentSample = sample;
      fresh.currentTestIdx = 0;
      fresh.testBudget = sample.maxTests || 3;
      fresh.timeLimit = sample.timeLimit || 300;
      fresh.deadline = Date.now() + fresh.timeLimit * 1000;
      appState.mysteryState = fresh;
      stopMysteryTimer();
      mysteryTimeUpHandled = false;
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
  var performedCount = countPerformed(state);
  var budgetLeft = state.testBudget - performedCount;
  var budgetExhausted = budgetLeft <= 0;

  var h = '';
  h += '<div class="mystery-investigate">';

  h += renderMysteryCaseBar(state);

  /* Title */
  h += '<div class="mystery-q-title">';
  h += '<h3>' + esc(sample.title) + '</h3>';
  h += '<span class="mystery-badge">' + esc(sample.difficulty) + ' — ' + sample.marks + ' marks</span>';
  h += '</div>';

  h += '<div class="mystery-description"><p>' + esc(sample.description) + '</p></div>';

  /* Budget progress — out of budget, not out of available tests */
  h += '<div class="mystery-progress-bar">';
  h += '<div class="mystery-progress-fill" style="width:' + Math.round((performedCount / state.testBudget) * 100) + '%"></div>';
  h += '</div>';
  h += '<p class="mystery-progress-text">' + performedCount + ' / ' + state.testBudget + ' test budget used';
  if (budgetExhausted) {
    h += ' — <strong>budget exhausted</strong>';
  } else {
    h += ' — ' + budgetLeft + ' left of ' + tests.length + ' available tests';
  }
  h += '</p>';

  /* Test Buttons with tool icons */
  h += '<div class="mystery-test-buttons">';
  for (var i = 0; i < tests.length; i++) {
    var test = tests[i];
    var done = state.testsPerformed[test.id];
    var isActive = (state.currentTestIdx === i);
    var locked = !done && budgetExhausted;
    var cls = 'mystery-test-btn';
    if (done) cls += ' mystery-test-done';
    if (isActive) cls += ' mystery-test-active';
    if (locked) cls += ' mystery-test-locked';
    h += '<button class="' + cls + '" data-test-idx="' + i + '"' + (locked ? ' disabled' : '') + '>';
    h += '<span class="mystery-test-icon">' + test.icon + '</span>';
    h += '<span class="mystery-test-name">' + esc(test.name) + '</span>';
    if (done) h += '<span class="mystery-test-check">&#10003;</span>';
    if (locked) h += '<span class="mystery-test-lock">🔒</span>';
    if (state.hintsUsed[test.id]) h += '<span class="mystery-test-hint">💡</span>';
    h += '</button>';
  }
  h += '</div>';

  /* Test Detail with Tool Visual */
  if (state.currentTestIdx >= 0 && state.currentTestIdx < tests.length) {
    var currentTest = tests[state.currentTestIdx];
    var isPerformed = state.testsPerformed[currentTest.id];
    var isLocked = !isPerformed && budgetExhausted;
    var hintUsed = !!state.hintsUsed[currentTest.id];

    h += '<div class="mystery-test-detail">';
    h += '<div class="mystery-test-detail-header">';
    h += '<h4>' + currentTest.icon + ' ' + esc(currentTest.name) + '</h4>';
    if (hintUsed) h += '<span class="mystery-hint-used">💡 Hint used (−' + (sample.hintCost || 1) + ' mark)</span>';
    h += '</div>';

    /* Tool Visual — interactive wide canvas apparatus */
    h += renderToolVisual(currentTest, isPerformed, isLocked);

    h += '<div class="mystery-test-steps">';
    h += '<p><strong>Procedure:</strong> ' + esc(currentTest.description) + '</p>';

    /* Hint — costs marks, available before spending a budget slot */
    if (hintUsed) {
      h += '<div class="mystery-hint-box">' + esc(currentTest.hint) + '</div>';
    } else {
      h += '<button class="btn btn-secondary mystery-hint-btn" id="mystery-use-hint">💡 Reveal Hint (−' + (sample.hintCost || 1) + ' mark)</button>';
    }

    if (isLocked) {
      h += '<p class="mystery-budget-note">🔒 Your test budget is used up. Reveal a performed test, or proceed to identification.</p>';
    } else if (!isPerformed) {
      h += '<button class="btn btn-secondary mystery-perform-btn" id="mystery-perform-test">Perform Test (skip apparatus)</button>';
    } else {
      /* Observation */
      h += '<div class="mystery-observation">';
      h += '<h5>Observation</h5>';
      h += '<p class="mystery-obs-text">' + esc(currentTest.observation) + '</p>';
      h += '</div>';

      /* Ask student for their own interpretation instead of revealing it */
      h += '<div class="mystery-interpretation">';
      h += '<h5>Your Interpretation</h5>';
      h += '<p class="text-secondary" style="font-size:0.88rem;margin-bottom:0.4rem;">What does this observation tell you about the sample?</p>';
      h += '<textarea class="mystery-textarea" id="mystery-interpret-' + currentTest.id + '" rows="2" placeholder="Write your interpretation here...">' + esc(state.interpretations[currentTest.id] || '') + '</textarea>';
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
  if (performedCount >= 1) {
    h += '<button class="btn btn-primary" id="mystery-go-identify">Proceed to Identification →</button>';
  } else {
    h += '<span class="text-secondary">Perform at least one test to continue</span>';
  }
  h += '</div>';

  h += '</div>';
  return h;
}

/* ============================================================
   TOOL VISUAL — Equipment Graphics for Each Test
   ============================================================ */

function renderToolVisual(test, performed, locked) {
  var h = '<div class="mystery-tool-visual">';
  h += '<canvas id="mystery-tool-canvas" width="720" height="330"></canvas>';
  h += '<div class="tool-prompt" id="tool-prompt">Preparing apparatus…</div>';
  h += '<p class="tool-label">' + esc(test.name) + ' — interactive apparatus</p>';
  if (performed) {
    h += '<div class="tool-status performed">&#10003; Test Performed</div>';
  } else if (locked) {
    h += '<div class="tool-status pending">🔒 Test budget used up</div>';
  } else {
    h += '<div class="tool-status pending">Follow the prompt — finishing the interaction performs the test</div>';
  }
  h += '</div>';
  return h;
}

function getToolType(testId) {
  if (testId.indexOf('burning') !== -1) return 'splint';
  if (testId.indexOf('flame') !== -1) return 'flame';
  if (testId.indexOf('litmus') !== -1) return 'litmus';
  if (testId.indexOf('naoh') !== -1 || testId.indexOf('nh3') !== -1 || testId.indexOf('silver') !== -1) return 'testtube';
  if (testId.indexOf('dissolve') !== -1 || testId.indexOf('solub') !== -1) return 'beaker';
  if (testId.indexOf('limewater') !== -1 || testId.indexOf('hcl') !== -1) return 'bottle';
  if (testId.indexOf('sublim') !== -1 || testId.indexOf('residue') !== -1) return 'funnel';
  if (testId.indexOf('displace') !== -1) return 'testtube';
  if (testId.indexOf('appearance') !== -1 || testId.indexOf('smell') !== -1) return 'beaker';
  return 'beaker';
}

function deriveSampleColour(sample) {
  if (!sample || !sample.tests) return null;
  for (var i = 0; i < sample.tests.length; i++) {
    var t = sample.tests[i];
    if (t.id === 'appearance') {
      var o = (t.observation || '').toLowerCase();
      if (o.indexOf('blue-green') !== -1 || o.indexOf('blue green') !== -1) return '#1f8fbf';
      if (o.indexOf('blue') !== -1) return '#2b9ad6';
    }
  }
  return null;
}

function renderMysteryInstructions(state) {
  var sample = state.currentSample;
  if (!sample) return '<div class="instruction-placeholder"><p>Select a mystery case file.</p></div>';
  var h = '<div class="pba-instructions">';
  h += '<div class="pba-inst-header">';
  h += '<span class="pba-inst-qnum">Case #' + esc(sample.id) + '</span>';
  h += '<span class="pba-inst-marks">' + sample.marks + ' marks</span>';
  h += '</div>';
  if (state.phase === 'investigate') {
    h += '<p>You may perform only <strong>' + state.testBudget + ' tests</strong> out of ' + sample.tests.length + '. Choose them wisely.</p>';
    h += '<p>Interact with the apparatus on the bench: follow the numbered prompt under the canvas to run each test.</p>';
    h += '<p>For each test, write your own interpretation of what the observation means.</p>';
    h += '<p>Hints cost ' + (sample.hintCost || 1) + ' mark each. The clock is running — finish early for a time bonus.</p>';
  } else {
    h += '<p>Your evidence board is complete. One of the three suspects is the real identity — the others are look-alikes.</p>';
    h += '<p>Select the suspect your evidence supports, then submit your identification.</p>';
  }
  h += '</div>';
  return h;
}

function attachInvestigateListeners(state) {
  /* Interactive apparatus canvas */
  var canvasEl = document.getElementById('mystery-tool-canvas');
  if (canvasEl && typeof MysteryToolRenderer !== 'undefined') {
    var cur = state.currentSample && state.currentSample.tests[state.currentTestIdx];
    if (cur) {
      var locked = !state.testsPerformed[cur.id] && countPerformed(state) >= state.testBudget;
      MysteryToolRenderer.mount(canvasEl, cur, {
        type: getToolType(cur.id),
        performed: !!state.testsPerformed[cur.id],
        locked: locked,
        solid: state.currentSample.id === 'M5',
        sampleColour: deriveSampleColour(state.currentSample),
        onComplete: function() {
          if (state.testsPerformed[cur.id]) return;
          if (countPerformed(state) >= state.testBudget) return;
          state.testsPerformed[cur.id] = true;
          MysteryToolRenderer.stop();
          renderMysteryScreen();
        }
      });
    }
  }

  /* Test selection — locked buttons do nothing */
  var testBtns = document.querySelectorAll('[data-test-idx]');
  for (var i = 0; i < testBtns.length; i++) {
    testBtns[i].addEventListener('click', function() {
      if (this.disabled) return;
      state.currentTestIdx = parseInt(this.getAttribute('data-test-idx'), 10);
      renderMysteryScreen();
    });
  }

  /* Perform test — consumes one budget slot (skip shortcut) */
  var performBtn = document.getElementById('mystery-perform-test');
  if (performBtn) {
    performBtn.addEventListener('click', function() {
      var test = state.currentSample.tests[state.currentTestIdx];
      if (!test) return;
      if (state.testsPerformed[test.id]) return;
      if (countPerformed(state) >= state.testBudget) return;
      if (typeof MysteryToolRenderer !== 'undefined') MysteryToolRenderer.stop();
      state.testsPerformed[test.id] = true;
      renderMysteryScreen();
    });
  }

  /* Reveal hint — costs marks */
  var hintBtn = document.getElementById('mystery-use-hint');
  if (hintBtn) {
    hintBtn.addEventListener('click', function() {
      var test = state.currentSample.tests[state.currentTestIdx];
      if (!test) return;
      state.hintsUsed[test.id] = true;
      renderMysteryScreen();
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

  /* Save student interpretations */
  var ints = document.querySelectorAll('[id^="mystery-interpret-"]');
  for (var k = 0; k < ints.length; k++) {
    ints[k].addEventListener('input', function() {
      var testId = this.id.replace('mystery-interpret-', '');
      state.interpretations[testId] = this.value;
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

  /* Proceed to identification — never auto-answers */
  var identifyBtn = document.getElementById('mystery-go-identify');
  if (identifyBtn) {
    identifyBtn.addEventListener('click', function() {
      if (countPerformed(state) < 1) return;
      state.phase = 'identify';
      renderMysteryScreen();
    });
  }
}

/* ============================================================
   IDENTIFY PHASE — Suspect Line-up (decoy candidates)
   ============================================================ */

function renderMysteryIdentifyHTML(state) {
  var sample = state.currentSample;
  var h = '';
  h += '<div class="mystery-identify">';
  h += renderMysteryCaseBar(state);

  h += '<div class="mystery-q-title">';
  h += '<h3>Identify: ' + esc(sample.title) + '</h3>';
  h += '<span class="mystery-badge">Suspect line-up</span>';
  h += '</div>';

  h += '<div class="mystery-identify-form">';
  h += '<p><strong>Which substance does your evidence support?</strong> Two of the three are deliberate look-alikes.</p>';

  h += '<div class="mystery-candidates">';
  for (var i = 0; i < sample.candidates.length; i++) {
    var cand = sample.candidates[i];
    var selected = state.selectedCandidate === cand.id;
    h += '<label class="mystery-candidate' + (selected ? ' selected' : '') + '">';
    h += '<input type="radio" name="mystery-candidate" value="' + cand.id + '"' + (selected ? ' checked' : '') + '>';
    h += '<span class="mystery-candidate-letter">' + String.fromCharCode(65 + i) + '</span>';
    h += '<span class="mystery-candidate-label">' + esc(cand.label) + '</span>';
    h += '</label>';
  }
  h += '</div>';

  h += '<div class="mystery-note">';
  h += '<label><strong>Your reasoning (optional):</strong></label>';
  h += '<textarea class="mystery-textarea" id="mystery-identification" rows="2" placeholder="Which tests decided it for you?...">' + esc(state.identification) + '</textarea>';
  h += '</div>';
  h += '</div>';

  /* Evidence board */
  h += '<div class="mystery-test-summary">';
  h += '<h4>🖼 Evidence Board — ' + countPerformed(state) + ' of ' + state.testBudget + ' tests used</h4>';
  for (var j = 0; j < sample.tests.length; j++) {
    var test = sample.tests[j];
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
  h += '<button class="btn btn-primary" id="mystery-submit-identification"' + (state.selectedCandidate ? '' : ' disabled') + '>Submit Identification</button>';
  h += '</div>';
  h += '</div>';
  return h;
}

function attachIdentifyListeners(state) {
  var textarea = document.getElementById('mystery-identification');
  if (textarea) {
    textarea.addEventListener('input', function() { state.identification = this.value; });
  }

  var radios = document.querySelectorAll('input[name="mystery-candidate"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function() {
      state.selectedCandidate = this.value;
      var cards = document.querySelectorAll('.mystery-candidate');
      for (var c = 0; c < cards.length; c++) {
        var input = cards[c].querySelector('input');
        if (input && input.value === state.selectedCandidate) {
          cards[c].classList.add('selected');
        } else {
          cards[c].classList.remove('selected');
        }
      }
      var submit = document.getElementById('mystery-submit-identification');
      if (submit) submit.disabled = !state.selectedCandidate;
    });
  }

  var backBtn = document.getElementById('mystery-back-investigate');
  if (backBtn) {
    backBtn.addEventListener('click', function() { state.phase = 'investigate'; renderMysteryScreen(); });
  }

  var submitBtn = document.getElementById('mystery-submit-identification');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      if (!state.selectedCandidate) return;
      finalizeMystery(state, false);
    });
  }
}

/* ============================================================
   FINALIZE — score once, log once, reveal once
   ============================================================ */

function finalizeMystery(state, timeExpired) {
  stopMysteryTimer();
  state.timeUp = !!timeExpired;
  scoreMystery(state);
  state.phase = 'result';
  try {
    var logRecord = ExpLog.buildMysteryRecord(state);
    ExpLog.add(logRecord);
  } catch (e) {}
  renderMysteryScreen();
}

/* ============================================================
   SCORING
   ============================================================ */

function scoreMystery(state) {
  var sample = state.currentSample;
  var marks = sample.marks || 10;
  var hintCost = sample.hintCost || 1;
  var budget = state.testBudget || sample.maxTests || 3;
  var timeBonusMax = 2;

  /* Split: 60% interpretations, 40% identification */
  var interpMax = Math.round(marks * 0.6);
  var identMax = marks - interpMax;
  var perTest = budget > 0 ? interpMax / budget : 0;

  var interpScore = 0;
  for (var i = 0; i < sample.tests.length; i++) {
    var test = sample.tests[i];
    if (!state.testsPerformed[test.id]) continue;
    interpScore += perTest * keywordRatio(test, state.interpretations[test.id] || '');
  }

  var correct = isCorrectCandidate(sample, state.selectedCandidate);
  var identScore = correct ? identMax : 0;

  var timeBonus = 0;
  if (!state.timeUp && state.timeLimit > 0) {
    var frac = Math.min(1, Math.max(0, mysteryTimeLeft(state) / (state.timeLimit * 1000)));
    timeBonus = Math.round(timeBonusMax * frac);
  }

  var hintCount = countHints(state);
  var hintPenalty = hintCount * hintCost;

  var total = Math.round(interpScore + identScore + timeBonus - hintPenalty);
  if (total < 0) total = 0;
  if (total > marks + timeBonusMax) total = marks + timeBonusMax;

  state.score = total;
  state.totalMarks = marks + timeBonusMax;
  state.scoreDetail = {
    interpMax: interpMax,
    identMax: identMax,
    timeBonusMax: timeBonusMax,
    interpScore: interpScore,
    identScore: identScore,
    timeBonus: timeBonus,
    hintPenalty: hintPenalty,
    hintCount: hintCount,
    perTest: perTest,
    budget: budget,
    correct: correct,
    selectedLabel: candidateLabel(sample, state.selectedCandidate),
    correctLabel: sample.identity,
    timeUp: state.timeUp
  };
}

function keywordRatio(test, text) {
  var keywords = test.keywords || [];
  if (!keywords.length) return 0;
  var lowered = (text || '').toLowerCase();
  if (!lowered) return 0;
  var hits = 0;
  for (var i = 0; i < keywords.length; i++) {
    if (lowered.indexOf(String(keywords[i]).toLowerCase()) !== -1) hits++;
  }
  return hits / keywords.length;
}

/* ============================================================
   RESULT PHASE — Evidence board + animated reveal
   ============================================================ */

function renderMysteryResultHTML(state) {
  var sample = state.currentSample;
  var d = state.scoreDetail || {};
  var pct = state.totalMarks > 0 ? Math.round((state.score / state.totalMarks) * 100) : 0;
  var grade = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
  var gc = pct >= 80 ? 'var(--color-success)' : pct >= 60 ? 'var(--color-primary)' : pct >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';
  var correct = !!d.correct;

  var h = '';
  h += '<div class="mystery-result">';
  h += '<div class="mystery-result-header"><h3>🔍 Case #' + esc(sample.id) + ' Closed</h3><p>' + esc(sample.title) + '</p></div>';

  /* Animated reveal */
  h += '<div class="mystery-reveal">';
  h += '<div class="mystery-reveal-stamp ' + (correct ? 'stamp-good' : 'stamp-bad') + '">' + (correct ? 'IDENTITY CONFIRMED' : 'CASE MISSED') + '</div>';
  h += '<p class="mystery-reveal-label">' + (correct ? 'Your suspect was correct' : 'You named: ' + esc(d.selectedLabel || '—')) + '</p>';
  h += '<p class="mystery-reveal-identity">' + esc(sample.identity) + '</p>';
  h += '</div>';

  h += '<div class="pba-result-score">';
  h += '<div class="pba-score-circle" style="border-color:' + gc + '">';
  h += '<span class="pba-score-num">' + state.score + '</span>';
  h += '<span class="pba-score-total">/ ' + state.totalMarks + '</span>';
  h += '</div>';
  h += '<div class="pba-score-detail">';
  h += '<p class="pba-grade" style="color:' + gc + '">Grade: ' + grade + '</p>';
  h += '<p>Percentage: ' + pct + '%</p>';
  h += (d.timeUp ? '<p class="mystery-timeup">⏱ Time expired — no time bonus</p>' : '');
  h += '</div></div>';

  /* Score breakdown */
  h += '<div class="mystery-score-breakdown"><h4>Mark Breakdown</h4>';
  h += '<table class="pba-breakdown-table"><tbody>';
  h += '<tr class="row-correct"><td>Interpretations (' + d.budget + ' test budget, keyword graded)</td><td>' + (Math.round((d.interpScore || 0) * 10) / 10) + ' / ' + d.interpMax + '</td></tr>';
  h += '<tr class="' + (correct ? 'row-correct' : 'row-incorrect') + '"><td>Identification' + (correct ? '' : ' (wrong suspect)') + '</td><td>' + (d.identScore || 0) + ' / ' + d.identMax + '</td></tr>';
  h += '<tr class="row-correct"><td>Time bonus</td><td>+' + (d.timeBonus || 0) + ' / +' + d.timeBonusMax + '</td></tr>';
  h += '<tr class="' + (d.hintCount ? 'row-incorrect' : 'row-correct') + '"><td>Hints used (' + (d.hintCount || 0) + ' × ' + (sample.hintCost || 1) + ')</td><td>−' + (d.hintPenalty || 0) + '</td></tr>';
  h += '<tr><td><strong>Total</strong></td><td><strong>' + state.score + ' / ' + state.totalMarks + '</strong></td></tr>';
  h += '</tbody></table></div>';

  h += '<div class="mystery-conclusion"><h4>Conclusion</h4><p>' + esc(sample.conclusion) + '</p></div>';

  /* Evidence board */
  h += '<div class="mystery-result-breakdown"><h4>🖼 Evidence Board</h4>';
  h += '<div class="mystery-evidence-board">';
  for (var i = 0; i < sample.tests.length; i++) {
    var test = sample.tests[i];
    var performed = state.testsPerformed[test.id];
    var ratio = performed ? keywordRatio(test, state.interpretations[test.id] || '') : 0;
    var kwTotal = (test.keywords || []).length;
    h += '<div class="mystery-evidence-card' + (performed ? '' : ' evidence-missing') + '">';
    h += '<div class="mystery-evidence-head"><span>' + test.icon + ' ' + esc(test.name) + '</span>';
    if (performed) {
      h += '<span class="mystery-evidence-score">★ ' + Math.round(ratio * kwTotal) + '/' + kwTotal + ' key ideas</span>';
    } else {
      h += '<span class="mystery-evidence-score evidence-none">not performed</span>';
    }
    h += '</div>';
    h += '<p class="mystery-evidence-obs">' + esc(performed ? test.observation : 'No evidence collected.') + '</p>';
    h += '<p class="mystery-evidence-int"><strong>Your interpretation:</strong> ' + esc(performed ? (state.interpretations[test.id] || '—') : '—') + '</p>';
    h += '<p class="mystery-evidence-correct"><strong>Correct:</strong> ' + esc(performed ? test.interpretation : test.interpretation) + '</p>';
    if (state.hintsUsed[test.id]) h += '<p class="mystery-evidence-hint">💡 Hint used (−' + (sample.hintCost || 1) + ')</p>';
    h += '</div>';
  }
  h += '</div></div>';

  if (state.identification) {
    h += '<div class="mystery-conclusion"><h4>Your Reasoning</h4><p>' + esc(state.identification) + '</p></div>';
  }

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

function attachMysteryResultListeners(state) {
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
