/* ================================================================
   Demo Mode Screen — Full guided demonstration engine
   ================================================================ */

var DemoEngine = (function() {
  'use strict';

  var STEPS = [
    { id: 'practical', label: 'Practical Lab', instruction: 'Demonstrate the experiment workflow. Complete the paper chromatography practical to see how ChemSim guides students through apparatus, setup, observation, and conclusion.' },
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
    h += '<h3>Paper Chromatography (A2)</h3>';
    h += '<p class="text-secondary">Separate a mixture of inks by paper chromatography</p>';
    if (demoState.practicalFinished) {
      h += '<div class="demo-completed-badge">Practical completed! The record has been saved to the Experiment Log.</div>';
      h += '<button class="btn btn-primary demo-continue-btn" id="btn-demo-next-step">Continue Demo &rarr;</button>';
    } else {
      h += '<button class="btn btn-primary" id="btn-demo-launch-practical">Launch Practical &rarr;</button>';
    }
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

  function renderInto(appState) {
    var workspace = document.getElementById('workspace-content');
    if (!workspace) return;
    var ds = appState.demoState;
    var screen = ds.screen;

    if (screen === 'practical') {
      workspace.innerHTML = renderStepPractical(ds);
    } else if (screen === 'log') {
      workspace.innerHTML = renderStepLog();
    } else if (screen === 'revision') {
      workspace.innerHTML = renderStepRevision();
    } else if (screen === 'mystery') {
      workspace.innerHTML = renderStepMystery();
    } else if (screen === 'pba') {
      workspace.innerHTML = renderStepPBA();
    } else if (screen === 'complete') {
      workspace.innerHTML = renderComplete();
    } else {
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
        appState.demoState = { screen: 'intro', step: 0, practicalFinished: false };
        appState.screen = 'home';
        ChemSim.goHome();
        return;
      }
      if (target.id === 'btn-demo-launch-practical') {
        ChemSim.navigateTo('experiment', { experimentId: 'A2' });
        return;
      }
      if (target.id === 'btn-demo-next-step') {
        ds.step++;
        if (ds.step >= STEPS.length) {
          ds.screen = 'complete';
        } else {
          ds.screen = STEPS[ds.step].id;
        }
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
        ds.screen = 'intro';
        ds.step = 0;
        ds.practicalFinished = false;
        renderInto(appState);
        return;
      }
    });
  }

  /* ---- Finish Detection ---- */

  function checkPracticalFinish(appState) {
    var ds = appState.demoState;
    if (!ds || ds.screen !== 'practical') return;
    if (ds.practicalFinished) return;
    /* If we're back on demo screen and no experiment is active, practical was finished */
    if (appState.screen === 'demo' && !appState.experiment) {
      ds.practicalFinished = true;
      renderInto(appState);
    }
  }

  return {
    STEPS: STEPS,
    renderInto: renderInto,
    attachListeners: attachListeners,
    checkPracticalFinish: checkPracticalFinish
  };
})();

/* Register demo screen with ChemSim */
ChemSim.registerScreen('demo', function(appState) {
  if (!appState.demoState) {
    appState.demoState = { screen: 'intro', step: 0, practicalFinished: false };
  }
  DemoEngine.attachListeners(appState);
  return ''; /* content rendered by renderInto */
});
