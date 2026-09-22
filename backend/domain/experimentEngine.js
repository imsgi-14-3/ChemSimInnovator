var getStages = function(experiment) {
  if (!experiment || !experiment.stages) return [];
  return experiment.stages;
};

var stageIndex = function(stages, stageName) {
  if (!stages) return -1;
  return stages.indexOf(stageName);
};

var nextStage = function(stages, currentStage) {
  var idx = stageIndex(stages, currentStage);
  if (idx < 0 || idx >= stages.length - 1) return null;
  return stages[idx + 1];
};

var prevStage = function(stages, currentStage) {
  var idx = stageIndex(stages, currentStage);
  if (idx <= 0) return null;
  return stages[idx - 1];
};

var canGoNext = function(stages, currentStage) {
  return nextStage(stages, currentStage) !== null;
};

var canGoBack = function(stages, currentStage) {
  return prevStage(stages, currentStage) !== null;
};

var findExperiment = function(experiments, id) {
  if (!experiments) return null;
  for (var i = 0; i < experiments.length; i++) {
    if (experiments[i].id === id) return experiments[i];
  }
  return null;
};

var createInitialState = function() {
  return {
    currentStage: null,
    selectedExperimentId: null,
    experiment: null,
    simulation: null,
    baselineDrawn: false,
    sampleApplied: false,
    solventPositioned: false,
    solventFrontMarked: false,
    paperInBeaker: false,
    measurePhase: "idle",
    measuredComponents: [],
    measuredSolventFront: false,
    solventFrontDist: 0,
    rfAnswers: {},
    interpretation: "",
    conclusion: "",
    prepareTool: null,
    feedback: "",
    distSetupComplete: false,
    distThermometerOk: false,
    distCondenserOk: false,
    distHeating: false,
    distTemperature: 25,
    distPhase: "idle",
    distCollected: false,
    distObservations: "",
    titrationRinseDone: false,
    titrationApparatusChoice1: null,
    titrationApparatusChoice2: null,
    titrationBuretteFilled: false,
    titrationSampleMeasured: false,
    titrationVolume: 0,
    titrationEndpointReached: false,
    titrationEndpointPassed: false,
    titrationReadingRecorded: false,
    titrationTrialIndex: 0,
    titrationTrials: [],
    titrationCalcAnswer: "",
    titrationCalcChecked: false,
    gasCurrentIndex: 0,
    gasResults: {},
    gasTestPerformed: false,
    gasTestObserved: false,
    m7_ionIndex: 0,
    m7_ionResults: {},
    m7ActionDone: false,
    m7ObservationDone: false
  };
};

var resetExperimentState = function(state) {
  var appState = {
    currentStage: state.currentStage,
    selectedExperimentId: state.selectedExperimentId,
    experiment: state.experiment,
    simulation: state.simulation
  };

  var fresh = createInitialState();
  fresh.currentStage = appState.currentStage;
  fresh.selectedExperimentId = appState.selectedExperimentId;
  fresh.experiment = appState.experiment;
  fresh.simulation = appState.simulation;

  return fresh;
};
