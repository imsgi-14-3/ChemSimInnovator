/* ================================================================
   ChemSim — PBA Practice Screen
   Interactive PBA practice with inline feedback and final result
   ================================================================ */

function pbaGetQuestionsBySection(section) {
  var questions = PBA_QUESTIONS || [];
  var result = [];
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].section === section) result.push(questions[i]);
  }
  return result;
}

ChemSim.registerScreen('pba', function(appState) {
  var state = appState.pbaState || {
    phase: 'select',
    mode: 'single',
    session: null,
    currentQ: null,
    currentPart: 0,
    answers: {},
    score: 0,
    totalMarks: 0,
    selectedSection: null
  };
  appState.pbaState = state;

  var html = '<div class="pba-screen">';

  if (state.phase === 'select') {
    html += renderSelectPhase(appState, state);
  } else if (state.phase === 'practice') {
    html += renderPracticePhase(appState, state);
  } else if (state.phase === 'result') {
    html += renderResultPhase(appState, state);
  }

  html += '</div>';
  return html;
});

/* ============================================================
   SELECT PHASE — Question List
   ============================================================ */

function renderSelectPhase(appState, state) {
  var h = '';
  h += '<div class="module-header"><h2>PBA Practice</h2>';
  h += '<p>Practice practical assessment skills for the FBISE SSC Chemistry PBA.</p></div>';

  h += '<div class="pba-session-cta">';
  h += '<button class="btn btn-primary pba-session-btn" id="pba-start-session">Start Random Session — 4 to 5 questions</button>';
  h += '<p class="text-secondary">A fresh shuffled set every turn: 3 different major practicals + 2 different minor practicals, with MCQ options in a different order.</p>';
  h += '</div>';

  h += '<div class="pba-overview">';
  h += '<div class="card"><div class="card-body">';
  h += '<h3>PBA Structure</h3>';
  h += '<p><strong>Section A:</strong> Major Practicals — 6 marks each</p>';
  h += '<p><strong>Section B:</strong> Minor Practicals — 4 marks each</p>';
  h += '<p class="text-secondary">Or pick a single question below for targeted practice.</p>';
  h += '</div></div></div>';

  var secA = shuffleArray(pbaGetQuestionsBySection('A'));
  var secB = shuffleArray(pbaGetQuestionsBySection('B'));

  h += '<h3 class="subsection-title">Section A — Major Practicals</h3>';
  h += '<p class="text-secondary">' + secA.length + ' questions — order shuffles each time you open this screen.</p>';
  h += '<div class="pba-question-list">';
  for (var i = 0; i < secA.length; i++) {
    var q = secA[i];
    h += '<button class="card pba-q-card" data-pba-qid="' + q.id + '">';
    h += '<div class="card-body">';
    h += '<div class="pba-q-header">';
    h += '<span class="pba-q-exp">' + ChemSim.escapeHtml(q.experimentId) + '</span>';
    h += '<span class="pba-q-marks">' + q.marks + ' marks</span>';
    h += '</div>';
    h += '<h4>' + ChemSim.escapeHtml(q.title) + '</h4>';
    h += '<p class="text-secondary">' + q.parts.length + ' parts</p>';
    h += '</div></button>';
  }
  h += '</div>';

  h += '<h3 class="subsection-title">Section B — Minor Practicals</h3>';
  h += '<p class="text-secondary">' + secB.length + ' questions — order shuffles each time you open this screen.</p>';
  h += '<div class="pba-question-list">';
  for (var j = 0; j < secB.length; j++) {
    var qb = secB[j];
    h += '<button class="card pba-q-card" data-pba-qid="' + qb.id + '">';
    h += '<div class="card-body">';
    h += '<div class="pba-q-header">';
    h += '<span class="pba-q-exp">' + ChemSim.escapeHtml(qb.experimentId) + '</span>';
    h += '<span class="pba-q-marks">' + qb.marks + ' marks</span>';
    h += '</div>';
    h += '<h4>' + ChemSim.escapeHtml(qb.title) + '</h4>';
    h += '<p class="text-secondary">' + qb.parts.length + ' parts</p>';
    h += '</div></button>';
  }
  h += '</div>';

  setTimeout(function() {
    var startBtn = document.getElementById('pba-start-session');
    if (startBtn) {
      startBtn.addEventListener('click', function() {
        startPbaSession();
      });
    }
    var cards = document.querySelectorAll('[data-pba-qid]');
    for (var k = 0; k < cards.length; k++) {
      cards[k].addEventListener('click', function() {
        startPbaQuestion(this.getAttribute('data-pba-qid'));
      });
    }
  }, 0);

  return h;
}

/* ============================================================
   RANDOM SESSION — fresh shuffled set every turn
   ============================================================ */

function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

function shuffleQuestionOptions(q) {
  var clone = {
    id: q.id,
    experimentId: q.experimentId,
    section: q.section,
    title: q.title,
    marks: q.marks,
    parts: []
  };
  for (var i = 0; i < q.parts.length; i++) {
    var p = q.parts[i];
    var pc = {};
    for (var key in p) {
      if (Object.prototype.hasOwnProperty.call(p, key)) pc[key] = p[key];
    }
    if (p.type === 'mcq' && p.options && p.options.length > 1) {
      var order = [];
      for (var o = 0; o < p.options.length; o++) order.push(o);
      order = shuffleArray(order);
      var newOpts = [];
      var newCorrect = 0;
      for (var n = 0; n < order.length; n++) {
        newOpts.push(p.options[order[n]]);
        if (order[n] === p.correct) newCorrect = n;
      }
      pc.options = newOpts;
      pc.correct = newCorrect;
    }
    if (p.type === 'match' && p.pairs) {
      pc.pairs = shuffleArray(p.pairs);
    }
    clone.parts.push(pc);
  }
  return clone;
}

function drawSessionQuestions() {
  var poolA = shuffleArray(pbaGetQuestionsBySection('A'));
  var poolB = shuffleArray(pbaGetQuestionsBySection('B'));
  var picked = [];
  var usedExp = {};
  var i;

  /* Prefer distinct practicals so one session covers different experiments. */
  for (i = 0; i < poolA.length && picked.length < 3; i++) {
    if (!usedExp[poolA[i].experimentId]) {
      usedExp[poolA[i].experimentId] = true;
      picked.push(poolA[i]);
    }
  }
  for (i = 0; i < poolB.length && picked.length < 5; i++) {
    if (!usedExp[poolB[i].experimentId]) {
      usedExp[poolB[i].experimentId] = true;
      picked.push(poolB[i]);
    }
  }

  /* Top up from whatever remains if distinct-practical draw fell short. */
  for (i = 0; i < poolA.length && picked.length < 4; i++) {
    if (picked.indexOf(poolA[i]) === -1) picked.push(poolA[i]);
  }
  for (i = 0; i < poolB.length && picked.length < 5; i++) {
    if (picked.indexOf(poolB[i]) === -1) picked.push(poolB[i]);
  }

  picked = shuffleArray(picked);
  if (picked.length > 5) picked = picked.slice(0, 5);
  return picked;
}

function startPbaSession() {
  var drawn = drawSessionQuestions();
  if (!drawn.length) return;
  var questions = [];
  for (var i = 0; i < drawn.length; i++) {
    questions.push(shuffleQuestionOptions(drawn[i]));
  }
  var appState = ChemSim.getState();
  appState.pbaState = {
    phase: 'practice',
    mode: 'session',
    session: { questions: questions, index: 0, results: [] },
    currentQ: questions[0],
    currentPart: 0,
    answers: {},
    score: 0,
    totalMarks: 0,
    selectedSection: null
  };
  renderPbaScreen();
}

function recordSessionResult(state) {
  var s = state.session;
  if (!s || !state.currentQ) return;
  if (s.results.length !== s.index) return;
  s.results.push({
    id: state.currentQ.id,
    title: state.currentQ.title,
    section: state.currentQ.section,
    score: state.score,
    marks: state.totalMarks
  });
}

function advanceSession(state) {
  var s = state.session;
  if (!s) {
    state.phase = 'result';
    renderPbaScreen();
    return;
  }
  recordSessionResult(state);
  if (s.index < s.questions.length - 1) {
    s.index++;
    state.currentQ = s.questions[s.index];
    state.currentPart = 0;
    state.answers = {};
    state.score = 0;
    state.totalMarks = 0;
    state.phase = 'practice';
  } else {
    state.phase = 'result';
  }
  renderPbaScreen();
}

function endSession(state) {
  recordSessionResult(state);
  state.phase = 'result';
  renderPbaScreen();
}

function startPbaQuestion(qid) {
  var appState = ChemSim.getState();
  var question = null;
  for (var i = 0; i < PBA_QUESTIONS.length; i++) {
    if (PBA_QUESTIONS[i].id === qid) { question = PBA_QUESTIONS[i]; break; }
  }
  if (!question) return;
  appState.pbaState = {
    phase: 'practice',
    mode: 'single',
    session: null,
    currentQ: question,
    currentPart: 0,
    answers: {},
    score: 0,
    totalMarks: 0,
    selectedSection: question.section
  };
  renderPbaScreen();
}

/* ============================================================
   PBA SCREEN RENDERER
   ============================================================ */

function renderPbaScreen() {
  var workspace = document.getElementById('workspace-content');
  var instructionPanel = document.getElementById('instruction-content');
  var headerCenter = document.getElementById('header-center');
  var headerProgress = document.getElementById('header-progress');
  var btnActionBack = document.getElementById('btn-action-back');
  var btnActionNext = document.getElementById('btn-action-next');
  var btnActionReset = document.getElementById('btn-action-reset');
  var btnBack = document.getElementById('btn-back');
  var actionCenter = document.getElementById('action-center');
  var sidebarExperiments = document.getElementById('sidebar-experiments');

  var appState = ChemSim.getState();
  var state = appState.pbaState;

  if (state.phase === 'select') {
    sidebarExperiments.style.display = 'none';
    headerCenter.innerHTML = '';
    headerProgress.style.display = 'none';
    btnBack.style.display = 'none';
    btnActionBack.style.display = 'none';
    btnActionNext.style.display = 'none';
    btnActionReset.style.display = 'none';
    actionCenter.innerHTML = '';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Start a random session for a fresh shuffled set, or select a single question to begin practice.</p></div>';
    workspace.innerHTML = '<div class="pba-screen">' + renderSelectPhase(appState, state) + '</div>';
    return;
  }

  if (state.phase === 'practice') {
    workspace.innerHTML = renderPracticePhase(appState, state);
    instructionPanel.innerHTML = renderPbaInstructions(state);
    var hdrTitle = 'PBA Practice';
    if (state.mode === 'session' && state.session) {
      hdrTitle = 'PBA Practice — Q' + (state.session.index + 1) + '/' + state.session.questions.length;
    }
    headerCenter.innerHTML = '<span class="header-experiment-title">' + hdrTitle + '</span>';
    headerCenter.style.display = '';
    headerProgress.style.display = 'none';
    btnBack.style.display = '';
    btnActionBack.style.display = 'none';
    btnActionNext.style.display = 'none';
    btnActionReset.style.display = 'none';
    actionCenter.innerHTML = '';
    attachPbaListeners(state);
  } else if (state.phase === 'result') {
    workspace.innerHTML = renderResultPhase(appState, state);
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Your results are shown on the right.</p></div>';
    headerCenter.innerHTML = '<span class="header-experiment-title">PBA Results</span>';
    headerCenter.style.display = '';
    headerProgress.style.display = 'none';
    btnBack.style.display = '';
    btnActionBack.style.display = 'none';
    btnActionNext.style.display = 'none';
    btnActionReset.style.display = 'none';
    actionCenter.innerHTML = '';
    attachPbaResultListeners(state);
  }
}

/* ============================================================
   INSTRUCTION PANEL
   ============================================================ */

function renderPbaInstructions(state) {
  var q = state.currentQ;
  var partIdx = state.currentPart;
  var part = q.parts[partIdx];
  var h = '<div class="pba-instructions">';
  h += '<div class="pba-inst-header">';
  h += '<span class="pba-inst-qnum">Part ' + (partIdx + 1) + ' of ' + q.parts.length + '</span>';
  h += '<span class="pba-inst-marks">' + (part.marks || 1) + ' mark' + ((part.marks || 1) > 1 ? 's' : '') + '</span>';
  h += '</div>';
  if (state.mode === 'session' && state.session) {
    h += '<p class="pba-inst-type">Session: question ' + (state.session.index + 1) + ' of ' + state.session.questions.length + '</p>';
  }
  h += '<p class="pba-inst-type">Type: ' + part.type.toUpperCase() + '</p>';
  if (part.hint) {
    h += '<div class="pba-inst-hint" id="pba-hint-box" style="display:none;"><p><strong>Hint:</strong> ' + ChemSim.escapeHtml(part.hint) + '</p></div>';
    h += '<button class="btn btn-ghost btn-sm" id="pba-show-hint">Show Hint</button>';
  }
  h += '</div>';
  return h;
}

/* ============================================================
   PRACTICE PHASE — Question + Inline Feedback + Final Result
   ============================================================ */

function renderPracticePhase(appState, state) {
  var q = state.currentQ;
  var partIdx = state.currentPart;
  var parts = q.parts;
  var part = parts[partIdx];
  var isScored = state.answers['part_' + partIdx + '_score'] !== undefined;
  var allScored = isAllPartsScored(state);
  var h = '';

  h += '<div class="pba-practice">';
  h += '<div class="pba-q-title">';
  h += '<h3>' + ChemSim.escapeHtml(q.title) + '</h3>';
  h += '<span class="pba-q-exp-tag">' + ChemSim.escapeHtml(q.experimentId) + ' — Section ' + q.section + '</span>';
  if (state.mode === 'session' && state.session) {
    h += '<span class="pba-q-exp-tag pba-session-progress">Question ' + (state.session.index + 1) + ' of ' + state.session.questions.length + '</span>';
  }
  h += '</div>';

  h += '<div class="pba-progress-bar">';
  h += '<div class="pba-progress-fill" style="width:' + Math.round(((partIdx + 1) / parts.length) * 100) + '%"></div>';
  h += '</div>';

  /* --- Current Part --- */
  h += '<div class="pba-question">';
  h += '<div class="pba-part">';
  h += '<p class="pba-part-num">Part ' + (partIdx + 1) + '</p>';
  h += '<p class="pba-part-q"><strong>' + ChemSim.escapeHtml(part.question) + '</strong></p>';

  if (part.type === 'mcq') {
    h += renderMcqPart(part, partIdx, state, isScored);
  } else if (part.type === 'short') {
    h += renderShortPart(part, partIdx, state, isScored);
  } else if (part.type === 'calc') {
    h += renderCalcPart(part, partIdx, state, isScored);
  } else if (part.type === 'match') {
    h += renderMatchPart(part, partIdx, state, isScored);
  }

  /* Inline feedback after answering */
  if (isScored) {
    h += renderPartFeedback(part, partIdx, state);
  }

  h += '</div></div>';

  /* --- Navigation Buttons --- */
  h += '<div class="pba-nav">';
  h += '<button class="btn btn-secondary" id="pba-prev-part"' + (partIdx === 0 ? ' disabled' : '') + '>Previous</button>';
  if (!isScored) {
    h += '<button class="btn btn-primary" id="pba-submit-answer">Submit Answer</button>';
  } else if (partIdx < parts.length - 1) {
    h += '<button class="btn btn-primary" id="pba-next-part">Next Part</button>';
  } else {
    var finishLabel = 'Finish &amp; See Result';
    if (state.mode === 'session' && state.session) {
      finishLabel = (state.session.index < state.session.questions.length - 1)
        ? 'Next Question &rarr;'
        : 'Finish Session &rarr;';
    }
    h += '<button class="btn btn-primary" id="pba-finish">' + finishLabel + '</button>';
  }
  h += '</div>';

  /* --- Final Result (shown after all parts scored) --- */
  if (allScored) {
    h += renderFinalResult(state);
  }

  h += '</div>';
  return h;
}

/* ============================================================
   PART RENDERERS — MCQ, Short, Calc, Match
   ============================================================ */

function renderMcqPart(part, partIdx, state, isScored) {
  var h = '<div class="pba-mcq">';
  var savedAnswer = state.answers['part_' + partIdx];
  for (var i = 0; i < part.options.length; i++) {
    var checked = (savedAnswer === i) ? ' checked' : '';
    var disabled = isScored ? ' disabled' : '';
    h += '<label class="pba-mcq-option">';
    h += '<input type="radio" name="pba_mcq_' + partIdx + '" value="' + i + '"' + checked + disabled + ' data-pba-mcq="' + partIdx + '">';
    h += '<span class="pba-mcq-text">' + ChemSim.escapeHtml(part.options[i]) + '</span>';
    h += '</label>';
  }
  h += '</div>';
  return h;
}

function renderShortPart(part, partIdx, state, isScored) {
  var h = '<div class="pba-short">';
  var savedAnswer = state.answers['part_' + partIdx] || '';
  var attrs = isScored ? ' readonly' : '';
  h += '<textarea class="pba-textarea" id="pba-short-' + partIdx + '" rows="4" placeholder="Type your answer here..."' + attrs + '>' + ChemSim.escapeHtml(savedAnswer) + '</textarea>';
  h += '</div>';
  return h;
}

function renderCalcPart(part, partIdx, state, isScored) {
  var h = '<div class="pba-calc">';
  h += '<p class="pba-calc-formula">Formula: ' + ChemSim.escapeHtml(part.formula) + '</p>';
  if (part.given) {
    h += '<div class="pba-calc-given">';
    h += '<p><strong>Given:</strong></p><ul>';
    if (part.given.mHCl !== undefined) h += '<li>M(HCl) = ' + part.given.mHCl + ' mol/L</li>';
    if (part.given.vHCl !== undefined) h += '<li>V(HCl) = ' + part.given.vHCl + ' mL</li>';
    if (part.given.vNaOH !== undefined) h += '<li>V(NaOH) = ' + part.given.vNaOH + ' mL</li>';
    if (part.given.solventFront !== undefined) h += '<li>Solvent front = ' + part.given.solventFront + ' cm</li>';
    if (part.given.componentDist !== undefined) h += '<li>Component distance = ' + part.given.componentDist + ' cm</li>';
    h += '</ul></div>';
  }
  var savedAnswer = state.answers['part_' + partIdx] || '';
  var attrs = isScored ? ' readonly' : '';
  h += '<div class="pba-calc-input-wrap">';
  h += '<label>Your answer: </label>';
  h += '<input type="number" step="any" class="pba-calc-input" id="pba-calc-' + partIdx + '" value="' + savedAnswer + '" placeholder="Enter value"' + attrs + '>';
  if (part.unit) h += '<span class="pba-calc-unit"> ' + ChemSim.escapeHtml(part.unit) + '</span>';
  h += '</div>';
  h += '</div>';
  return h;
}

function renderMatchPart(part, partIdx, state, isScored) {
  var h = '<div class="pba-match">';
  var savedAnswers = state.answers['part_' + partIdx] || {};
  for (var i = 0; i < part.pairs.length; i++) {
    var pair = part.pairs[i];
    h += '<div class="pba-match-row">';
    h += '<span class="pba-match-left">' + ChemSim.escapeHtml(pair.left) + '</span>';
    h += '<span class="pba-match-arrow">&rarr;</span>';
    h += '<select class="pba-match-select" data-pba-match="' + partIdx + '" data-pair-idx="' + i + '"' + (isScored ? ' disabled' : '') + '>';
    h += '<option value="">Select...</option>';
    for (var j = 0; j < part.pairs.length; j++) {
      var opt = part.pairs[j];
      var selected = (savedAnswers[pair.id] === opt.right) ? ' selected' : '';
      h += '<option value="' + ChemSim.escapeHtml(opt.right) + '"' + selected + '>' + ChemSim.escapeHtml(opt.right) + '</option>';
    }
    h += '</select>';
    h += '</div>';
  }
  h += '</div>';
  return h;
}

/* ============================================================
   INLINE FEEDBACK — Shown after each part is answered
   ============================================================ */

function renderPartFeedback(part, partIdx, state) {
  var ans = state.answers['part_' + partIdx];
  var earned = state.answers['part_' + partIdx + '_score'] || 0;
  var marks = part.marks || 1;
  var isCorrect = earned === marks;
  var h = '';

  h += '<div class="pba-inline-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect') + '">';
  h += '<div class="pba-feedback-header">';
  h += '<span class="pba-feedback-icon">' + (isCorrect ? '&#10003;' : '&#10007;') + '</span>';
  h += '<span class="pba-feedback-score">' + earned + ' / ' + marks + ' mark' + (marks > 1 ? 's' : '') + '</span>';
  h += '</div>';

  if (part.type === 'mcq') {
    h += '<p class="pba-feedback-your">Your answer: <strong>' + (ans !== undefined ? ChemSim.escapeHtml(part.options[ans]) : 'Not answered') + '</strong></p>';
    if (!isCorrect) {
      h += '<p class="pba-feedback-correct-text">Correct answer: <strong>' + ChemSim.escapeHtml(part.options[part.correct]) + '</strong></p>';
    }
  } else if (part.type === 'short') {
    h += '<p class="pba-feedback-your">Your answer: <strong>' + (ans ? ChemSim.escapeHtml(ans) : 'Not answered') + '</strong></p>';
    h += '<p class="pba-feedback-correct-text">Expected: ' + ChemSim.escapeHtml(part.expected) + '</p>';
  } else if (part.type === 'calc') {
    h += '<p class="pba-feedback-your">Your answer: <strong>' + (ans !== '' && ans !== undefined ? ans : 'Not answered') + '</strong></p>';
    h += '<p class="pba-feedback-correct-text">Correct answer: ' + part.correct + ' ' + ChemSim.escapeHtml(part.unit || '') + '</p>';
  } else if (part.type === 'match') {
    h += '<div class="pba-feedback-your"><p>Your answers:</p><ul>';
    for (var j = 0; j < part.pairs.length; j++) {
      var pair = part.pairs[j];
      var userAns = ans ? ans[pair.id] : '';
      var matchCorrect = userAns === pair.right;
      h += '<li>' + ChemSim.escapeHtml(pair.left) + ' &rarr; ' + (userAns || 'Not answered');
      if (!matchCorrect) h += ' <span class="text-secondary">(Correct: ' + ChemSim.escapeHtml(pair.right) + ')</span>';
      h += '</li>';
    }
    h += '</ul></div>';
  }

  h += '</div>';
  return h;
}

/* ============================================================
   FINAL RESULT — Shown at bottom after all parts scored
   ============================================================ */

function renderFinalResult(state) {
  var q = state.currentQ;
  var pct = state.totalMarks > 0 ? Math.round((state.score / state.totalMarks) * 100) : 0;
  var grade = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
  var gradeColor = pct >= 80 ? 'var(--color-success)' : pct >= 60 ? 'var(--color-primary)' : pct >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';

  var h = '';
  h += '<div class="pba-final-result">';
  h += '<h3>' + ((state.mode === 'session' && state.session)
    ? 'Question ' + (state.session.index + 1) + ' of ' + state.session.questions.length + ' Complete'
    : 'Question Complete') + '</h3>';

  h += '<div class="pba-result-score">';
  h += '<div class="pba-score-circle" style="border-color:' + gradeColor + '">';
  h += '<span class="pba-score-num">' + state.score + '</span>';
  h += '<span class="pba-score-total">/ ' + state.totalMarks + '</span>';
  h += '</div>';
  h += '<div class="pba-score-detail">';
  h += '<p class="pba-grade" style="color:' + gradeColor + '">Grade: ' + grade + '</p>';
  h += '<p>Percentage: ' + pct + '%</p>';
  h += '</div></div>';

  h += '<div class="pba-result-breakdown">';
  h += '<h4>Score Breakdown</h4>';
  h += '<table class="pba-breakdown-table">';
  h += '<thead><tr><th>Part</th><th>Type</th><th>Marks</th><th>Earned</th></tr></thead>';
  h += '<tbody>';
  for (var i = 0; i < q.parts.length; i++) {
    var part = q.parts[i];
    var earned = state.answers['part_' + i + '_score'] || 0;
    var marks = part.marks || 1;
    h += '<tr class="' + (earned === marks ? 'row-correct' : 'row-incorrect') + '">';
    h += '<td>' + (i + 1) + '</td>';
    h += '<td>' + part.type.toUpperCase() + '</td>';
    h += '<td>' + marks + '</td>';
    h += '<td>' + earned + '</td>';
    h += '</tr>';
  }
  h += '</tbody></table></div>';

  h += '<div class="pba-nav">';
  if (state.mode === 'session' && state.session) {
    h += '<button class="btn btn-secondary" id="pba-session-end">End Session &amp; See Score</button>';
  } else {
    h += '<button class="btn btn-primary" id="pba-back-to-list">Back to PBA List</button>';
  }
  h += '</div>';
  h += '</div>';
  return h;
}

/* ============================================================
   LISTENERS
   ============================================================ */

function attachPbaListeners(state) {
  /* MCQ change listeners */
  var mcqInputs = document.querySelectorAll('[data-pba-mcq]');
  for (var i = 0; i < mcqInputs.length; i++) {
    mcqInputs[i].addEventListener('change', function() {
      var partIdx = parseInt(this.getAttribute('data-pba-mcq'), 10);
      state.answers['part_' + partIdx] = parseInt(this.value, 10);
    });
  }

  /* Textarea input listeners */
  var textareas = document.querySelectorAll('.pba-textarea:not([readonly])');
  for (var j = 0; j < textareas.length; j++) {
    textareas[j].addEventListener('input', function() {
      var idx = this.id.replace('pba-short-', '');
      state.answers['part_' + idx] = this.value;
    });
  }

  /* Calc input listeners */
  var calcInputs = document.querySelectorAll('.pba-calc-input:not([readonly])');
  for (var c = 0; c < calcInputs.length; c++) {
    calcInputs[c].addEventListener('input', function() {
      var idx = this.id.replace('pba-calc-', '');
      state.answers['part_' + idx] = this.value;
    });
  }

  /* Match select listeners */
  var matchSelects = document.querySelectorAll('[data-pba-mcq]');
  var matchEls = document.querySelectorAll('[data-pba-match]');
  for (var m = 0; m < matchEls.length; m++) {
    matchEls[m].addEventListener('change', function() {
      var partIdx = parseInt(this.getAttribute('data-pba-match'), 10);
      var pairIdx = parseInt(this.getAttribute('data-pair-idx'), 10);
      var part = state.currentQ.parts[partIdx];
      var pair = part.pairs[pairIdx];
      if (!state.answers['part_' + partIdx]) state.answers['part_' + partIdx] = {};
      state.answers['part_' + partIdx][pair.id] = this.value;
    });
  }

  /* Hint toggle */
  var hintBtn = document.getElementById('pba-show-hint');
  if (hintBtn) {
    hintBtn.addEventListener('click', function() {
      var hintBox = document.getElementById('pba-hint-box');
      if (hintBox) {
        hintBox.style.display = hintBox.style.display === 'none' ? 'block' : 'none';
        this.textContent = hintBox.style.display === 'none' ? 'Show Hint' : 'Hide Hint';
      }
    });
  }

  /* Previous Part */
  var prevBtn = document.getElementById('pba-prev-part');
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      saveCurrentAnswer(state);
      if (state.currentPart > 0) {
        state.currentPart--;
        renderPbaScreen();
      }
    });
  }

  /* Submit Answer — score current part and show feedback */
  var submitBtn = document.getElementById('pba-submit-answer');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      saveCurrentAnswer(state);
      scoreCurrentPart(state);
      renderPbaScreen();
    });
  }

  /* Next Part — move to next unanswered part */
  var nextBtn = document.getElementById('pba-next-part');
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (state.currentPart < state.currentQ.parts.length - 1) {
        state.currentPart++;
        renderPbaScreen();
      }
    });
  }

  /* Finish — result phase (single) or advance session (session mode) */
  var finishBtn = document.getElementById('pba-finish');
  if (finishBtn) {
    finishBtn.addEventListener('click', function() {
      if (state.mode === 'session' && state.session) {
        advanceSession(state);
      } else {
        state.phase = 'result';
        renderPbaScreen();
      }
    });
  }

  /* End Session early — record current question and show session score */
  var endBtn = document.getElementById('pba-session-end');
  if (endBtn) {
    endBtn.addEventListener('click', function() {
      endSession(state);
    });
  }

  /* Back to PBA List (from final result) */
  var backToListBtn = document.getElementById('pba-back-to-list');
  if (backToListBtn) {
    backToListBtn.addEventListener('click', function() {
      var appState = ChemSim.getState();
      appState.pbaState = {
        phase: 'select',
        mode: 'single',
        session: null,
        currentQ: null,
        currentPart: 0,
        answers: {},
        score: 0,
        totalMarks: 0,
        selectedSection: null
      };
      renderPbaScreen();
    });
  }
}

/* ============================================================
   SAVE & SCORE
   ============================================================ */

function saveCurrentAnswer(state) {
  var partIdx = state.currentPart;
  var part = state.currentQ.parts[partIdx];
  if (part.type === 'short') {
    var el = document.getElementById('pba-short-' + partIdx);
    if (el) state.answers['part_' + partIdx] = el.value;
  } else if (part.type === 'calc') {
    var el2 = document.getElementById('pba-calc-' + partIdx);
    if (el2) state.answers['part_' + partIdx] = el2.value;
  }
}

function scoreCurrentPart(state) {
  var partIdx = state.currentPart;
  var part = state.currentQ.parts[partIdx];
  var marks = part.marks || 1;
  var ans = state.answers['part_' + partIdx];
  var earned = 0;

  if (part.type === 'mcq') {
    earned = (ans === part.correct) ? marks : 0;
  } else if (part.type === 'calc') {
    var userVal = parseFloat(ans);
    if (!isNaN(userVal) && Math.abs(userVal - part.correct) <= (part.tolerance || 0.05)) {
      earned = marks;
    }
  } else if (part.type === 'short') {
    if (ans && ans.trim().length > 0) {
      var text = ans.toLowerCase();
      var keywordsFound = 0;
      for (var k = 0; k < part.keywords.length; k++) {
        if (text.indexOf(part.keywords[k].toLowerCase()) !== -1) keywordsFound++;
      }
      var pct = keywordsFound / part.keywords.length;
      if (pct >= 0.5) earned = marks;
      else if (pct >= 0.25) earned = Math.ceil(marks / 2);
    }
  } else if (part.type === 'match') {
    if (ans) {
      var allCorrect = true;
      for (var p = 0; p < part.pairs.length; p++) {
        if (ans[part.pairs[p].id] !== part.pairs[p].right) { allCorrect = false; break; }
      }
      earned = allCorrect ? marks : 0;
    }
  }

  state.answers['part_' + partIdx + '_score'] = earned;

  /* Update total score */
  var totalScore = 0;
  var totalMarks = 0;
  for (var i = 0; i < state.currentQ.parts.length; i++) {
    totalMarks += state.currentQ.parts[i].marks || 1;
    totalScore += state.answers['part_' + i + '_score'] || 0;
  }
  state.score = totalScore;
  state.totalMarks = totalMarks;
}

function isAllPartsScored(state) {
  if (!state.currentQ) return false;
  for (var i = 0; i < state.currentQ.parts.length; i++) {
    if (state.answers['part_' + i + '_score'] === undefined) return false;
  }
  return true;
}

/* ============================================================
   RESULT PHASE — Full page result (after Finish button)
   ============================================================ */

function renderResultPhase(appState, state) {
  var isSession = state.mode === 'session' && state.session && state.session.results.length > 0;
  var q = state.currentQ;
  var score = state.score;
  var totalMarks = state.totalMarks;
  var sessionRows = null;
  var headerSub;

  if (isSession) {
    score = 0;
    totalMarks = 0;
    sessionRows = state.session.results;
    for (var r = 0; r < sessionRows.length; r++) {
      score += sessionRows[r].score;
      totalMarks += sessionRows[r].marks;
    }
    headerSub = sessionRows.length + ' question' + (sessionRows.length > 1 ? 's' : '') +
      ' attempted (session average)';
  } else {
    headerSub = q ? q.title : '';
  }

  var pct = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
  var grade = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
  var gradeColor = pct >= 80 ? 'var(--color-success)' : pct >= 60 ? 'var(--color-primary)' : pct >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';

  var h = '';
  h += '<div class="pba-result">';
  h += '<div class="pba-result-header">';
  h += '<h3>' + (isSession ? 'PBA Practice Session Results' : 'PBA Practice Results') + '</h3>';
  h += '<p>' + ChemSim.escapeHtml(headerSub) + '</p>';
  h += '</div>';

  h += '<div class="pba-result-score">';
  h += '<div class="pba-score-circle" style="border-color:' + gradeColor + '">';
  h += '<span class="pba-score-num">' + score + '</span>';
  h += '<span class="pba-score-total">/ ' + totalMarks + '</span>';
  h += '</div>';
  h += '<div class="pba-score-detail">';
  h += '<p class="pba-grade" style="color:' + gradeColor + '">Grade: ' + grade + '</p>';
  h += '<p>Percentage: ' + pct + '%</p>';
  h += '</div></div>';

  h += '<div class="pba-result-breakdown">';
  if (isSession) {
    h += '<h4>Question Breakdown</h4>';
    h += '<table class="pba-breakdown-table">';
    h += '<thead><tr><th>#</th><th>Question</th><th>Section</th><th>Marks</th><th>Earned</th></tr></thead>';
    h += '<tbody>';
    for (var i = 0; i < sessionRows.length; i++) {
      var row = sessionRows[i];
      h += '<tr class="' + (row.marks > 0 && row.score === row.marks ? 'row-correct' : 'row-incorrect') + '">';
      h += '<td>' + (i + 1) + '</td>';
      h += '<td>' + ChemSim.escapeHtml(row.title) + '</td>';
      h += '<td>' + row.section + '</td>';
      h += '<td>' + row.marks + '</td>';
      h += '<td>' + row.score + '</td>';
      h += '</tr>';
    }
    h += '</tbody></table>';
  } else {
    h += '<h4>Score Breakdown</h4>';
    h += '<table class="pba-breakdown-table">';
    h += '<thead><tr><th>Part</th><th>Type</th><th>Marks</th><th>Earned</th></tr></thead>';
    h += '<tbody>';
    for (var j = 0; j < q.parts.length; j++) {
      var part = q.parts[j];
      var earned = state.answers['part_' + j + '_score'] || 0;
      var marks = part.marks || 1;
      h += '<tr class="' + (earned === marks ? 'row-correct' : 'row-incorrect') + '">';
      h += '<td>' + (j + 1) + '</td>';
      h += '<td>' + part.type.toUpperCase() + '</td>';
      h += '<td>' + marks + '</td>';
      h += '<td>' + earned + '</td>';
      h += '</tr>';
    }
    h += '</tbody></table>';
  }
  h += '</div>';

  h += '<div class="pba-nav">';
  h += '<button class="btn btn-primary" id="pba-result-home">Back to PBA List</button>';
  h += '</div>';
  h += '</div>';
  return h;
}

function attachPbaResultListeners(state) {
  var homeBtn = document.getElementById('pba-result-home');
  if (homeBtn) {
    homeBtn.addEventListener('click', function() {
      var appState = ChemSim.getState();
      appState.pbaState = {
        phase: 'select',
        mode: 'single',
        session: null,
        currentQ: null,
        currentPart: 0,
        answers: {},
        score: 0,
        totalMarks: 0,
        selectedSection: null
      };
      renderPbaScreen();
    });
  }
}
