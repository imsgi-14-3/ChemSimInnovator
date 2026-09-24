/* ================================================================
   ChemSim — Main Application Controller
   ================================================================ */

var ChemSim = (function() {
  'use strict';

  var appState = {
    screen: 'home',
    experiment: null,
    experimentId: null,
    stages: [],
    currentStage: null,
    stageIndex: -1,
    state: null,
    simulation: null,
    logState: { screen: 'menu', detailId: null },
    demoState: { screen: 'intro', step: 0, practicalKind: 'major' }
  };

  var screens = {};

  function registerScreen(name, handler) {
    screens[name] = handler;
  }

  function navigateTo(screen, options) {
    options = options || {};
    if (options.experimentId) {
      startExperiment(options.experimentId);
      return;
    }
    if (screen === 'experiment-select') {
      showExperimentListing();
      return;
    }
    appState.screen = screen;
    renderCurrentScreen();
    updateSidebarActive();
  }

  function showExperimentListing() {
    var workspace = document.getElementById('workspace-content');
    var instructionPanel = document.getElementById('instruction-content');
    var sidebarExperiments = document.getElementById('sidebar-experiments');
    var headerCenter = document.getElementById('header-center');
    var headerProgress = document.getElementById('header-progress');
    var btnBack = document.getElementById('btn-back');
    var btnActionBack = document.getElementById('btn-action-back');
    var btnActionNext = document.getElementById('btn-action-next');
    var btnActionReset = document.getElementById('btn-action-reset');
    var actionCenter = document.getElementById('action-center');

    headerCenter.innerHTML = '';
    headerProgress.style.display = 'none';
    btnBack.style.display = 'none';
    btnActionBack.style.display = 'none';
    btnActionNext.style.display = 'none';
    btnActionReset.style.display = 'none';
    actionCenter.innerHTML = '';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Select an experiment from the sidebar or below to begin.</p></div>';
    if (sidebarExperiments) sidebarExperiments.style.display = '';

    var experiments = ApiClient.getExperiments();
    var majorHtml = '<div class="experiment-group"><h3 class="subsection-title">Major Practicals</h3><div class="home-modules">';
    var minorHtml = '<div class="experiment-group"><h3 class="subsection-title">Minor Practicals</h3><div class="home-modules">';
    for (var i = 0; i < experiments.length; i++) {
      var exp = experiments[i];
      var cardHtml = '<button class="module-card" data-exp-id="' + exp.id + '">' +
        '<h3>' + escapeHtml(exp.id) + '</h3>' +
        '<p>' + escapeHtml(exp.title.substring(0, 60)) + '</p>' +
        '<span class="module-tag ' + (exp.section === 'major' ? 'module-tag--major' : 'module-tag--minor') + '">' +
        (exp.section === 'major' ? 'Major' : 'Minor') + '</span></button>';
      if (exp.section === 'major') majorHtml += cardHtml; else minorHtml += cardHtml;
    }
    majorHtml += '</div></div>';
    minorHtml += '</div></div>';
    workspace.innerHTML = '<div class="home-screen">' + majorHtml + minorHtml + '</div>';

    workspace.querySelectorAll('[data-exp-id]').forEach(function(el) {
      el.addEventListener('click', function() {
        startExperiment(el.getAttribute('data-exp-id'));
      });
    });
  }

  function goHome() {
    appState.screen = 'home';
    appState.experiment = null;
    appState.experimentId = null;
    appState.stages = [];
    appState.currentStage = null;
    appState.stageIndex = -1;
    appState.state = null;
    appState.simulation = null;
    appState.pbaState = null;
    appState.mysteryState = null;
    appState.logState = { screen: 'menu', detailId: null };
    appState.demoState = { screen: 'intro', step: 0, practicalKind: 'major' };
    renderCurrentScreen();
    updateSidebarActive();
  }

  function goBack() {
    if (appState.screen === 'experiment' && appState.experiment) {
      if (appState.stageIndex > 0) {
        appState.stageIndex--;
        appState.currentStage = appState.stages[appState.stageIndex];
        renderExperimentStage();
      } else {
        goHome();
      }
    } else if (appState.screen === 'pba' && appState.pbaState) {
      var pba = appState.pbaState;
      if (pba.phase === 'practice' && pba.currentPart > 0) {
        pba.currentPart--;
        renderPbaScreen();
      } else if (pba.phase === 'result') {
        pba.phase = 'select';
        pba.currentQ = null;
        renderPbaScreen();
      } else {
        pba.phase = 'select';
        pba.currentQ = null;
        renderCurrentScreen();
      }
    } else if (appState.screen === 'mystery' && appState.mysteryState) {
      var mystery = appState.mysteryState;
      if (mystery.phase === 'investigate') {
        mystery.phase = 'select';
        mystery.currentSample = null;
        renderMysteryScreen();
      } else if (mystery.phase === 'identify') {
        mystery.phase = 'investigate';
        renderMysteryScreen();
      } else if (mystery.phase === 'result') {
        mystery.phase = 'select';
        mystery.currentSample = null;
        renderMysteryScreen();
      } else {
        goHome();
      }
    } else if (appState.screen === 'log' && appState.logState) {
      var log = appState.logState;
      if (log.screen === 'detail') {
        log.screen = 'list';
        log.detailId = null;
        renderCurrentScreen();
      } else if (log.screen === 'list') {
        log.screen = 'menu';
        renderCurrentScreen();
      } else {
        goHome();
      }
    } else if (appState.screen === 'demo') {
      goHome();
    } else {
      goHome();
    }
  }

  function isStageCompleted(expId, stage, state) {
    if (!state) return false;
    if (expId === 'A4') {
      switch(stage) {
        case 'select': return true;
        case 'objective': return true;
        case 'apparatus': return true;
        case 'prepare': return state.titrationApparatusChoice1 === 'burette' && state.titrationApparatusChoice2 === 'volumetric-pipette';
        case 'fillBurette': return state.titrationBuretteFilled === true;
        case 'measureSample': return state.titrationSampleMeasured === true;
        case 'titrate': return state.titrationEndpointReached === true || state.titrationEndpointPassed === true;
        case 'endpoint': return true;
        case 'record': return true;
        case 'calculate': return state.titrationCalcChecked === true;
        case 'interpret': return state.interpretation && state.interpretation.trim().length > 0;
        case 'conclude': return state.conclusion && state.conclusion.trim().length > 0;
        case 'complete': return true;
        default: return true;
      }
    }
    return true;
  }

  function goNext() {
    if (appState.screen === 'experiment' && appState.experiment) {
      if (appState.stageIndex < appState.stages.length - 1) {
        var currentStage = appState.stages[appState.stageIndex];
        if (!isStageCompleted(appState.experimentId, currentStage, appState.state)) {
          return;
        }
        appState.stageIndex++;
        appState.currentStage = appState.stages[appState.stageIndex];
        renderExperimentStage();
      }
    }
  }

  function startExperiment(id) {
    var exp = ApiClient.getExperiment(id);
    if (!exp) return;
    appState.screen = 'experiment';
    appState.experiment = exp;
    appState.experimentId = id;
    appState.stages = exp.stages || [];
    appState.state = ApiClient.getInitialState();
    appState.state.experiment = exp;
    appState.state.selectedExperimentId = id;
    appState.simulation = null;
    appState.stageIndex = 1;
    appState.currentStage = appState.stages[1] || 'objective';
    renderCurrentScreen();
    updateSidebarActive();
  }

  function finishExperiment() {
    if (appState.experiment && appState.state) {
      try {
        var record = ExpLog.buildPracticalRecord(appState.experiment, appState.state);
        ExpLog.add(record);
        console.log('Experiment log record created:', record.id);
      } catch(e) {
        console.error('Failed to create experiment log record:', e);
      }
    }
    /* Demo mode is fully animated — completing a practical does not alter demo state */
    goHome();
  }

  function resetExperiment() {
    if (appState.experimentId) {
      startExperiment(appState.experimentId);
    }
  }

  function renderCurrentScreen() {
    var workspace = document.getElementById('workspace-content');
    var instructionPanel = document.getElementById('instruction-content');
    var sidebarExperiments = document.getElementById('sidebar-experiments');
    var headerCenter = document.getElementById('header-center');
    var headerProgress = document.getElementById('header-progress');
    var btnBack = document.getElementById('btn-back');
    var btnActionBack = document.getElementById('btn-action-back');
    var btnActionNext = document.getElementById('btn-action-next');
    var btnActionReset = document.getElementById('btn-action-reset');
    var actionCenter = document.getElementById('action-center');

    if (appState.screen === 'experiment') {
      sidebarExperiments.style.display = '';
      headerCenter.style.display = '';
      headerProgress.style.display = '';
      btnBack.style.display = '';
      renderExperimentStage();
      updateSidebarActive();
      return;
    }

    sidebarExperiments.style.display = 'none';
    headerCenter.innerHTML = '';
    headerProgress.style.display = 'none';
    btnBack.style.display = 'none';
    btnActionBack.style.display = 'none';
    btnActionNext.style.display = 'none';
    btnActionReset.style.display = 'none';
    actionCenter.innerHTML = '';
    instructionPanel.innerHTML = '<div class="instruction-placeholder"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-light)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><p>Select an experiment to begin</p></div>';

    if (appState.screen === 'pba' && appState.pbaState && appState.pbaState.phase !== 'select') {
      headerCenter.innerHTML = '<span class="header-experiment-title">PBA Practice</span>';
      headerCenter.style.display = '';
      btnBack.style.display = '';
      renderPbaScreen();
      updateSidebarActive();
      return;
    }

    if (appState.screen === 'mystery' && appState.mysteryState && appState.mysteryState.phase !== 'select') {
      headerCenter.innerHTML = '<span class="header-experiment-title">Mystery Lab</span>';
      headerCenter.style.display = '';
      btnBack.style.display = '';
      renderMysteryScreen();
      updateSidebarActive();
      return;
    }

    if (appState.screen === 'mystery') {
      headerCenter.innerHTML = '';
      headerCenter.style.display = 'none';
      btnBack.style.display = 'none';
      instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Select a mystery sample to investigate.</p></div>';
      renderMysteryScreen();
      updateSidebarActive();
      return;
    }

    if (appState.screen === 'log') {
      headerCenter.innerHTML = '<span class="header-experiment-title">Experiment Log</span>';
      headerCenter.style.display = '';
      btnBack.style.display = '';
      instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>View your completed experiment records.</p></div>';
      ExpLog.renderInto(appState);
      updateSidebarActive();
      return;
    }

    if (appState.screen === 'demo') {
      headerCenter.innerHTML = '<span class="header-experiment-title">Demo Mode</span>';
      headerCenter.style.display = '';
      btnBack.style.display = '';
      instructionPanel.innerHTML = '<div class="instruction-placeholder"><p>Guided demonstration of ChemSim features.</p></div>';
      DemoEngine.renderInto(appState);
      updateSidebarActive();
      return;
    }

    var handler = screens[appState.screen];
    if (handler) {
      workspace.innerHTML = handler(appState);
    } else {
      workspace.innerHTML = screens.home(appState);
    }
  }

  function renderExperimentStage() {
    var workspace = document.getElementById('workspace-content');
    var instructionPanel = document.getElementById('instruction-content');
    var headerCenter = document.getElementById('header-center');
    var headerProgress = document.getElementById('header-progress');
    var btnActionBack = document.getElementById('btn-action-back');
    var btnActionNext = document.getElementById('btn-action-next');
    var btnActionReset = document.getElementById('btn-action-reset');
    var actionCenter = document.getElementById('action-center');

    var exp = appState.experiment;
    var stage = appState.currentStage;
    var idx = appState.stageIndex;
    var total = appState.stages.length;

    headerCenter.innerHTML = '<span class="header-experiment-title">' + escapeHtml(exp.title) + '</span><span class="header-experiment-id">' + escapeHtml(exp.id) + '</span>';
    headerCenter.style.display = '';

    var pct = total > 0 ? Math.round((idx / (total - 1)) * 100) : 0;
    document.getElementById('progress-label').textContent = 'Step ' + (idx + 1) + ' of ' + total;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-pct').textContent = pct + '%';
    headerProgress.style.display = '';

    btnActionBack.style.display = idx > 0 ? '' : 'none';
    btnActionReset.style.display = appState.screen === 'experiment' ? '' : 'none';
    var hasNext = idx < total - 1 && stage !== 'complete';
    btnActionNext.style.display = hasNext ? '' : 'none';

    var isLastStage = stage === 'complete';
    var stageHtml = ExperimentScreen.renderStage(exp, stage, appState.state, appState);
    if (hasNext) {
      var completed = isStageCompleted(exp.id, stage, appState.state);
      stageHtml += '<div class="stage-next-btn-wrap"><button class="btn btn-primary stage-next-btn" id="stage-next-btn"' + (completed ? '' : ' disabled') + '>Next Step →</button></div>';
    }
    workspace.innerHTML = stageHtml;

    var instrHtml = InstructionPanel.render(exp, stage, appState.state);
    instructionPanel.innerHTML = instrHtml;

    var actionHtml = ActionBar.render(exp, stage, appState.state, appState);
    actionCenter.innerHTML = actionHtml;

    attachStageListeners(exp, stage);
    renderCanvasForStage(exp, stage);
    var stageNextBtn = document.getElementById('stage-next-btn');
    if (stageNextBtn) {
      stageNextBtn.addEventListener('click', goNext);
    }
  }

  function renderCanvasForStage(exp, stage) {
    var canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    var simStages = getSimStagesForExp(exp.id);
    if (simStages.indexOf(stage) === -1) {
      var canvasWrap = canvas.parentElement;
      if (canvasWrap) canvasWrap.style.display = 'none';
      return;
    }
    var canvasWrap = canvas.parentElement;
    if (canvasWrap) canvasWrap.style.display = '';
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var id = exp.id;
    if (id === 'A2' || id === 'A3') {
      ChromatographyRenderer.draw(canvas, ctx, appState.state, exp);
    } else if (id === 'A1') {
      DistillationRenderer.draw(canvas, ctx, appState.state, exp);
    } else if (id === 'A4') {
      TitrationRenderer.draw(canvas, ctx, appState.state, exp);
    } else if (id === 'A5') {
      GasRenderer.draw(canvas, ctx, appState.state, exp);
    } else {
      MinorExperimentRenderer.draw(canvas, ctx, appState.state, exp);
    }
  }

  function getSimStagesForExp(id) {
    if (id === 'A2' || id === 'A3') return ['prepare','baseline','sample','setup','run','observe','markFront','measure','calculate'];
    if (id === 'A1') return ['setUp','checkSetup','startHeating','monitor','observe','collect'];
    if (id === 'A4') return ['fillBurette','measureSample','titrate','endpoint'];
    if (id === 'A5') return ['performTest'];
    if (id === 'M7_1') return ['heat'];
    if (id === 'M7_2') return ['performTest'];
    if (id === 'M7_3') return ['dissolve','concentrate','crystallize'];
    if (id === 'M7_4' || id === 'M7_5') return ['heat'];
    if (id === 'M7_6') return ['performReaction'];
    if (id === 'M7_7') return ['performTest'];
    if (id === 'M7_8') return ['meltingPointTest','boilingPointTest'];
    return [];
  }

  function attachStageListeners(exp, stage) {
    var workspace = document.getElementById('workspace-content');
    if (!workspace) return;

    workspace.querySelectorAll('[data-action]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        handleAction(el.getAttribute('data-action'), el, exp, stage);
      });
    });

    var actionCenter = document.getElementById('action-center');
    if (actionCenter) {
      actionCenter.querySelectorAll('[data-action]').forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          handleAction(el.getAttribute('data-action'), el, exp, stage);
        });
      });
    }

    workspace.querySelectorAll('[data-tool]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        handleToolClick(el.getAttribute('data-tool'), exp, stage);
      });
    });

    workspace.querySelectorAll('[data-gas]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        handleGasSelect(el.getAttribute('data-gas'));
      });
    });

    workspace.querySelectorAll('[data-test]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        handleTestSelect(el.getAttribute('data-test'));
      });
    });

    workspace.querySelectorAll('[data-ion]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        handleIonSelect(el.getAttribute('data-ion'));
      });
    });

    var canvas = document.getElementById('lab-canvas');
    if (canvas) {
      canvas.removeEventListener('click', canvasClickHandler);
      canvas.addEventListener('click', canvasClickHandler);
    }

    var sliders = workspace.querySelectorAll('input[type="range"]');
    for (var i = 0; i < sliders.length; i++) {
      sliders[i].addEventListener('input', function() {
        handleSliderInput(this);
      });
    }

    var textInputs = workspace.querySelectorAll('textarea, input[type="text"], input[type="number"]');
    for (var j = 0; j < textInputs.length; j++) {
      textInputs[j].addEventListener('input', function() {
        handleTextInput(this);
      });
    }
  }

  function canvasClickHandler(e) {
    var canvas = e.currentTarget;
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    var mx = (e.clientX - rect.left) * scaleX;
    var my = (e.clientY - rect.top) * scaleY;
    var id = appState.experimentId;
    var st = appState.state;
    var stage = appState.currentStage;

    if (id === 'A2' || id === 'A3') {
      ChromatographyRenderer.handleClick(mx, my, st, stage, appState);
    } else if (id === 'A1') {
      DistillationRenderer.handleClick(mx, my, st, stage, appState);
    } else if (id === 'A4') {
      TitrationRenderer.handleClick(mx, my, st, stage, appState);
    }
    renderExperimentStage();
  }

  function handleAction(action, el, exp, stage) {
    var st = appState.state;
    switch(action) {
      case 'select-pencil':
        st.prepareTool = 'pencil';
        renderExperimentStage();
        break;
      case 'select-pen':
        st.prepareTool = 'pen';
        renderExperimentStage();
        break;
      case 'check-setup':
        handleChromCheckSetup();
        break;
      case 'start-run':
        handleChromStartRun();
        break;
      case 'check-rf':
        handleChromCheckRf();
        break;
      case 'start-heating':
        handleDistillStartHeating();
        break;
      case 'record-collection':
        st.distCollected = true;
        renderExperimentStage();
        break;
      case 'fill-burette':
        st.titrationBuretteFilled = true;
        renderExperimentStage();
        break;
      case 'measure-sample':
        st.titrationSampleMeasured = true;
        renderExperimentStage();
        break;
      case 'record-titre':
        handleTitrationRecordTitre();
        break;
      case 'check-calc':
        st.titrationCalcChecked = true;
        renderExperimentStage();
        break;
      case 'perform-test':
        handleGasPerformTest();
        break;
      case 'record-gas':
        handleGasRecord();
        break;
      case 'interpret-gas':
        handleGasInterpret();
        break;
      case 'confirm-gas':
        handleGasConfirm();
        break;
      case 'go-next-gas':
        handleGasGoNext();
        break;
      case 'go-summary':
        appState.currentStage = 'summary';
        appState.stageIndex = appState.stages.indexOf('summary');
        renderExperimentStage();
        break;
      case 'm7-start':
        handleM7Start();
        break;
      case 'm7-confirm-ion':
        handleM7ConfirmIon();
        break;
      case 'm7-record':
        handleM7Record();
        break;
      case 'm7-interpret':
        handleM7Interpret();
        break;
      case 'm7-go-next':
        handleM7GoNext();
        break;
      case 'finish-experiment':
        finishExperiment();
        break;
    }
  }

  function handleToolClick(tool, exp, stage) {
    var st = appState.state;
    var id = exp.id;
    if (stage === 'prepare' && (id === 'A2' || id === 'A3')) {
      st.prepareTool = tool;
      renderExperimentStage();
    } else if (stage === 'prepare' && id === 'A4') {
      if (tool === 'burette' || tool === 'measuring-cylinder' || tool === 'beaker') {
        st.titrationApparatusChoice1 = tool;
      } else if (tool === 'volumetric-pipette' || tool === 'burette2' || tool === 'dropper') {
        st.titrationApparatusChoice2 = tool;
      }
      renderExperimentStage();
    }
  }

  function handleGasSelect(gasId) {
    var sim = SIMULATION_CONFIG['A5'];
    for (var i = 0; i < sim.gases.length; i++) {
      if (sim.gases[i].id === gasId) {
        appState.state.gasCurrentIndex = i;
        appState.state.gasTestPerformed = false;
        appState.state.gasTestObserved = false;
        appState.currentStage = 'selectTest';
        appState.stageIndex = appState.stages.indexOf('selectTest');
        renderExperimentStage();
        break;
      }
    }
  }

  function handleTestSelect(testId) {
    var gas = getGasByIndex(appState.state.gasCurrentIndex);
    if (gas) {
      appState.state.gasResults[gas.id] = appState.state.gasResults[gas.id] || {};
      appState.state.gasResults[gas.id].selectedTest = testId;
      appState.currentStage = 'performTest';
      appState.stageIndex = appState.stages.indexOf('performTest');
      renderExperimentStage();
    }
  }

  function handleGasPerformTest() {
    var st = appState.state;
    st.simulation = { startTime: Date.now(), done: false };
    st.gasTestPerformed = false;
    renderExperimentStage();
    setTimeout(function() {
      st.simulation.done = true;
      st.gasTestPerformed = true;
      st.gasTestObserved = true;
      var gas = getGasByIndex(st.gasCurrentIndex);
      if (gas) {
        st.gasResults[gas.id] = st.gasResults[gas.id] || {};
        st.gasResults[gas.id].gas = gas.id;
        st.gasResults[gas.id].selectedTest = gas.correctTest;
        st.gasResults[gas.id].performed = true;
        st.gasResults[gas.id].observed = true;
      }
      renderExperimentStage();
    }, 2500);
  }

  function handleGasRecord() {
    var st = appState.state;
    var gas = getGasByIndex(st.gasCurrentIndex);
    var recEl = document.getElementById('gas-record-input');
    if (gas && recEl && recEl.value.trim()) {
      st.gasResults[gas.id] = st.gasResults[gas.id] || {};
      st.gasResults[gas.id].recorded = recEl.value.trim();
      st.currentStage = 'interpret';
      st.stageIndex = st.currentStage === 'interpret' ? appState.stages.indexOf('interpret') : appState.stageIndex;
      renderExperimentStage();
    }
  }

  function handleGasInterpret() {
    var st = appState.state;
    var gas = getGasByIndex(st.gasCurrentIndex);
    var interpEl = document.getElementById('gas-interpret-input');
    if (gas && interpEl && interpEl.value.trim()) {
      st.gasResults[gas.id] = st.gasResults[gas.id] || {};
      st.gasResults[gas.id].interpretation = interpEl.value.trim();
      st.currentStage = 'confirm';
      st.stageIndex = appState.stages.indexOf('confirm');
      renderExperimentStage();
    }
  }

  function handleGasConfirm() {
    var st = appState.state;
    var gas = getGasByIndex(st.gasCurrentIndex);
    if (gas) {
      st.gasResults[gas.id] = st.gasResults[gas.id] || {};
      st.gasResults[gas.id].confirmed = true;
      st.currentStage = 'nextGas';
      st.stageIndex = appState.stages.indexOf('nextGas');
      renderExperimentStage();
    }
  }

  function handleGasGoNext() {
    var st = appState.state;
    var sim = SIMULATION_CONFIG['A5'];
    var confirmedCount = 0;
    for (var i = 0; i < sim.gases.length; i++) {
      if (st.gasResults[sim.gases[i].id] && st.gasResults[sim.gases[i].id].confirmed) confirmedCount++;
    }
    if (confirmedCount < sim.gases.length) {
      st.currentStage = 'selectGas';
      st.stageIndex = appState.stages.indexOf('selectGas');
    } else {
      st.currentStage = 'summary';
      st.stageIndex = appState.stages.indexOf('summary');
    }
    renderExperimentStage();
  }

  function handleChromCheckSetup() {
    var slider = document.getElementById('solvent-slider');
    var val = slider ? parseInt(slider.value, 10) : 50;
    var canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    var st = appState.state;
    var sim = SIMULATION_CONFIG[appState.experimentId];
    var cw = canvas.width, ch = canvas.height;
    var paperW = sim.paper.width, paperH = sim.paper.height;
    var paperX = (cw - paperW) / 2;
    var paperTop = (ch - paperH) / 2;
    var baseAbsY = paperTop + sim.paper.baselineY;
    var bx = paperX - 35;
    var bw = paperW + 70;
    var bh = paperH + 50;
    var by = paperTop + paperH - bh + 65;
    var solventLevel = by + bh - (val / 100) * bh * 0.4;
    if (solventLevel > baseAbsY) {
      st.feedback = 'setup_ok';
      st.paperInBeaker = true;
    } else {
      st.feedback = 'solvent_above_baseline';
      st.paperInBeaker = false;
    }
    renderExperimentStage();
  }

  function handleChromStartRun() {
    var st = appState.state;
    var sim = SIMULATION_CONFIG[appState.experimentId];
    st.simulation = { startTime: Date.now(), done: false };
    st.currentStage = 'run';
    st.stageIndex = appState.stages.indexOf('run');
    renderExperimentStage();
    setTimeout(function() {
      st.simulation.done = true;
      renderExperimentStage();
    }, sim.animationDurationMs + 200);
  }

  function handleChromCheckRf() {
    var st = appState.state;
    var sim = SIMULATION_CONFIG[appState.experimentId];
    var solventDist = st.solventFrontDist;
    for (var i = 0; i < sim.components.length; i++) {
      var dist = st.measuredComponents[i] ? st.measuredComponents[i].distance : 0;
      var expectedRf = dist / solventDist;
      var key = 'rf_' + i;
      var userVal = parseFloat(st.rfAnswers[key]);
      var fbEl = document.getElementById('rf-fb-' + key);
      if (isNaN(userVal) || userVal === 0) {
        if (fbEl) fbEl.textContent = 'Enter a value';
      } else if (Math.abs(userVal - expectedRf) < 0.05) {
        if (fbEl) { fbEl.textContent = '\u2713 Correct'; fbEl.className = 'rf-feedback rf-correct'; }
      } else {
        if (fbEl) { fbEl.textContent = '\u2717 Expected ~' + expectedRf.toFixed(3); fbEl.className = 'rf-feedback rf-incorrect'; }
      }
    }
  }

  function handleDistillStartHeating() {
    var st = appState.state;
    st.distHeating = true;
    st.simulation = { startTime: Date.now(), done: false };
    st.currentStage = 'monitor';
    st.stageIndex = appState.stages.indexOf('monitor');
    renderExperimentStage();
  }

  function handleTitrationRecordTitre() {
    var st = appState.state;
    var sim = SIMULATION_CONFIG['A4'];
    if (sim && st.titrationTrialIndex < sim.trials.length) {
      st.titrationTrials.push({ volume: st.titrationVolume, endpointReached: st.titrationEndpointReached });
      st.titrationTrialIndex++;
      st.titrationVolume = 0;
      st.titrationEndpointReached = false;
      st.titrationEndpointPassed = false;
      renderExperimentStage();
    }
  }

  function handleIonSelect(ionId) {
    var sim = SIMULATION_CONFIG['M7_2'];
    for (var i = 0; i < sim.ions.length; i++) {
      if (sim.ions[i].id === ionId && !appState.state.m7_ionResults[ionId]) {
        appState.state.m7_ionIndex = i;
        appState.state.m7ActionDone = false;
        appState.currentStage = 'performTest';
        appState.stageIndex = appState.stages.indexOf('performTest');
        renderExperimentStage();
        break;
      }
    }
  }

  function handleM7Start() {
    var st = appState.state;
    st.simulation = { startTime: Date.now(), done: false };
    st.m7ActionDone = false;
    renderExperimentStage();
    setTimeout(function() {
      st.simulation.done = true;
      st.m7ActionDone = true;
      st.m7ObservationDone = true;
      renderExperimentStage();
    }, 2500);
  }

  function handleM7ConfirmIon() {
    var sim = SIMULATION_CONFIG['M7_2'];
    var ion = sim.ions[appState.state.m7_ionIndex];
    if (ion) {
      appState.state.m7_ionResults[ion.id] = true;
      appState.currentStage = 'nextIon';
      appState.stageIndex = appState.stages.indexOf('nextIon');
      renderExperimentStage();
    }
  }

  function handleM7Record() {
    var st = appState.state;
    var recEl = document.getElementById('m7-record-input') || document.getElementById('m7-mp-record') || document.getElementById('m7-bp-record');
    if (recEl && recEl.value.trim()) {
      st.interpretation = recEl.value.trim();
    }
    if (st.currentStage === 'recordMP') {
      st.currentStage = 'boilingPointTest';
      st.stageIndex = appState.stages.indexOf('boilingPointTest');
    } else if (st.currentStage === 'recordBP') {
      st.currentStage = 'interpret';
      st.stageIndex = appState.stages.indexOf('interpret');
    } else {
      st.currentStage = 'interpret';
      st.stageIndex = appState.stages.indexOf('interpret');
    }
    st.m7ActionDone = false;
    renderExperimentStage();
  }

  function handleM7Interpret() {
    var st = appState.state;
    var interpEl = document.getElementById('m7-interpret-input');
    if (interpEl && interpEl.value.trim()) {
      st.interpretation = interpEl.value.trim();
      st.currentStage = 'conclude';
      st.stageIndex = appState.stages.indexOf('conclude');
      renderExperimentStage();
    }
  }

  function handleM7GoNext() {
    var st = appState.state;
    var id = appState.experimentId;
    if (id === 'M7_1') {
      st.currentStage = 'collect';
      st.stageIndex = appState.stages.indexOf('collect');
    } else if (id === 'M7_2') {
      var sim = SIMULATION_CONFIG['M7_2'];
      var doneCount = 0;
      for (var k = 0; k < sim.ions.length; k++) {
        if (st.m7_ionResults[sim.ions[k].id]) doneCount++;
      }
      if (doneCount < sim.ions.length) {
        st.m7ActionDone = false;
        st.currentStage = 'selectIon';
        st.stageIndex = appState.stages.indexOf('selectIon');
      } else {
        st.currentStage = 'summary';
        st.stageIndex = appState.stages.indexOf('summary');
      }
    } else if (id === 'M7_3') {
      var stages = appState.stages;
      var ci = stages.indexOf(st.currentStage);
      if (ci < stages.length - 1) {
        st.m7ActionDone = false;
        st.currentStage = stages[ci + 1];
        st.stageIndex = ci + 1;
      }
    } else if (id === 'M7_8') {
      if (st.currentStage === 'meltingPointTest') {
        st.m7ActionDone = false;
        st.currentStage = 'recordMP';
        st.stageIndex = appState.stages.indexOf('recordMP');
      } else if (st.currentStage === 'boilingPointTest') {
        st.m7ActionDone = false;
        st.currentStage = 'recordBP';
        st.stageIndex = appState.stages.indexOf('recordBP');
      }
    } else {
      goNext();
      return;
    }
    renderExperimentStage();
  }

  function handleSliderInput(slider) {
    var st = appState.state;
    var id = appState.experimentId;
    if (id === 'A2' || id === 'A3') {
      if (appState.currentStage === 'setup') {
        var sim = SIMULATION_CONFIG[id];
        sim.beaker.solventLevel = parseInt(slider.value, 10) / 100;
        st.solventPositioned = true;
        var lbl = document.getElementById('solvent-level-val');
        if (lbl) lbl.textContent = slider.value + '%';
        renderCanvasForStage(appState.experiment, appState.currentStage);
      }
    } else if (id === 'A4') {
      if (appState.currentStage === 'titrate') {
        var sim = SIMULATION_CONFIG['A4'];
        var newVolume = (parseInt(slider.value, 10) / 100) * sim.burette.maxML;
        st.titrationVolume = Math.min(newVolume, sim.burette.maxML);
        if (st.titrationVolume >= sim.endpointVolume - sim.endpointTolerance && st.titrationVolume <= sim.endpointVolume + sim.endpointTolerance) {
          st.titrationEndpointReached = true;
          st.titrationEndpointPassed = false;
        } else if (st.titrationVolume > sim.endpointVolume + sim.endpointTolerance) {
          st.titrationEndpointReached = false;
          st.titrationEndpointPassed = true;
        } else {
          st.titrationEndpointReached = false;
          st.titrationEndpointPassed = false;
        }
        renderExperimentStage();
      }
    }
  }

  function handleTextInput(el) {
    var st = appState.state;
    var id = el.id;
    var val = el.value;
    if (id === 'interpretation-input') st.interpretation = val;
    else if (id === 'conclusion-input') st.conclusion = val;
    else if (id && id.indexOf('rf_') === 0) st.rfAnswers[id] = val;
    else if (id === 'calc-answer') st.titrationCalcAnswer = val;
  }

  function getGasByIndex(index) {
    var sim = SIMULATION_CONFIG['A5'];
    if (!sim || !sim.gases[index]) return null;
    return sim.gases[index];
  }

  function updateSidebarActive() {
    var items = document.querySelectorAll('.sidebar-nav .sidebar-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
      if (items[i].getAttribute('data-screen') === appState.screen) {
        items[i].classList.add('active');
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function init() {
    ApiClient.init();
    renderExperimentList();
    bindNavigation();
    renderCurrentScreen();
  }

  function renderExperimentList() {
    var list = document.getElementById('experiment-list');
    if (!list) return;
    var experiments = ApiClient.getExperiments();
    var majorHtml = '<div class="experiment-group"><h4 class="experiment-group-title">Major Practicals</h4>';
    var minorHtml = '<div class="experiment-group"><h4 class="experiment-group-title">Minor Practicals</h4>';
    for (var i = 0; i < experiments.length; i++) {
      var exp = experiments[i];
      var isMajor = exp.section === 'major';
      var html = '<button class="experiment-item" data-exp-id="' + exp.id + '">' +
        '<span class="experiment-item-id">' + exp.id + '</span>' +
        '<span class="experiment-item-title">' + escapeHtml(exp.title.substring(0, 50)) + '</span>' +
        '</button>';
      if (isMajor) majorHtml += html; else minorHtml += html;
    }
    majorHtml += '</div>';
    minorHtml += '</div>';
    list.innerHTML = majorHtml + minorHtml;

    list.querySelectorAll('.experiment-item').forEach(function(el) {
      el.addEventListener('click', function() {
        var expId = el.getAttribute('data-exp-id');
        navigateTo('experiment', { experimentId: expId });
      });
    });
  }

  function bindNavigation() {
    document.getElementById('btn-home').addEventListener('click', goHome);
    document.getElementById('btn-back').addEventListener('click', goBack);
    document.getElementById('btn-action-back').addEventListener('click', goBack);
    document.getElementById('btn-action-next').addEventListener('click', goNext);
    document.getElementById('btn-action-reset').addEventListener('click', resetExperiment);

    document.querySelectorAll('.sidebar-nav .sidebar-item').forEach(function(el) {
      el.addEventListener('click', function() {
        var screen = el.getAttribute('data-screen');
        navigateTo(screen);
      });
    });
  }

  return {
    init: init,
    navigateTo: navigateTo,
    goHome: goHome,
    goBack: goBack,
    goNext: goNext,
    startExperiment: startExperiment,
    finishExperiment: finishExperiment,
    resetExperiment: resetExperiment,
    registerScreen: registerScreen,
    getState: function() { return appState; },
    escapeHtml: escapeHtml
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  ChemSim.init();
});
