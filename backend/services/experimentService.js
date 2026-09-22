var ExperimentService = {
  getExperiments: function() { return EXPERIMENTS; },
  getExperiment: function(id) { return findExperiment(EXPERIMENTS, id); },
  getStages: function(id) { var exp = findExperiment(EXPERIMENTS, id); return exp ? exp.stages : []; },
  getSimulationConfig: function(id) { return SIMULATION_CONFIG[id] || null; },
  validateAction: function(action, state) {
    if (!action || !action.type) return false;
    switch (action.type) {
      case 'chromatography_setup':
        return checkChromatographySetup(action.solventLevel, action.baseAbsY) === 'setup_ok';
      case 'rf_values':
        return checkRfValues(action.userAnswers, action.expectedValues, action.tolerance);
      case 'titration_endpoint':
        return checkTitrationEndpoint(action.volume, action.endpointVolume, action.tolerance) === 'reached';
      case 'gas_confirmed':
        return allGasesConfirmed(action.gasResults, action.gases);
      case 'm7_done':
        return m7AllDone(state);
      case 'm7_5ion_done':
        return m7_5ionAllDone(action.ionResults, action.ions);
      default:
        return false;
    }
  },
  calculate: function(type, params) {
    if (!type || !params) return null;
    switch (type) {
      case 'rf':
        return calculateRf(params.componentDistance, params.solventFrontDistance);
      case 'naoh_molarity':
        return calculateNaOHMolarity(params.hclConc, params.hclVolume, params.naohVolume);
      case 'mean_titre':
        return calculateMeanTitre(params.trials);
      default:
        return null;
    }
  },
  getPbaQuestions: function() { return PBA_QUESTIONS; },
  getInitialState: function() { return createInitialState(); }
};
