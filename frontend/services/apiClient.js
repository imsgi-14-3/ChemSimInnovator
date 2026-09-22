var ApiClient = {
  _useRemote: false,
  _baseUrl: '',

  init: function() {
    this._useRemote = false;
  },

  getExperiments: function() { return ExperimentService.getExperiments(); },
  getExperiment: function(id) { return ExperimentService.getExperiment(id); },
  getStages: function(id) { return ExperimentService.getStages(id); },
  getSimulationConfig: function(id) { return ExperimentService.getSimulationConfig(id); },
  validateAction: function(action, state) { return ExperimentService.validateAction(action, state); },
  calculate: function(type, params) { return ExperimentService.calculate(type, params); },
  getInitialState: function() { return ExperimentService.getInitialState(); },
  getPbaQuestions: function() { return PbaService.getQuestions(); },
  getMysteryConfig: function() { return MysteryService.getConfig(); },
  getLogEntries: function() { return LogService.getEntries(); },
  addLogEntry: function(entry) { LogService.addEntry(entry); },
  deleteLogEntry: function(index) { LogService.deleteEntry(index); },
  clearLog: function() { LogService.clearAll(); }
};
