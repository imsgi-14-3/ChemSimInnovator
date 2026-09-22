var ActionBar = {
  render: function(exp, stage, state, appState) {
    if (!exp) return '';
    var html = '';
    var id = exp.id;
    
    if (stage === 'complete') {
      html += '<button class="btn btn-primary" data-action="finish-experiment">Finish Experiment</button>';
      return html;
    }
    
    if (id === 'A2' || id === 'A3') {
      html += ActionBar.renderChromActions(stage, state);
    } else if (id === 'A1') {
      html += ActionBar.renderDistillActions(stage, state);
    } else if (id === 'A4') {
      html += ActionBar.renderTitrationActions(stage, state);
    } else if (id === 'A5') {
      html += ActionBar.renderGasActions(stage, state);
    } else {
      html += ActionBar.renderM7Actions(stage, state, id);
    }
    
    return html;
  },
  
  renderChromActions: function(stage, state) {
    var html = '';
    if (stage === 'setup') {
      html += '<button class="btn btn-accent" data-action="check-setup">Check Setup</button>';
    } else if (stage === 'run' && (!state.simulation || !state.simulation.done)) {
      html += '<button class="btn btn-primary" data-action="start-run">Start Chromatography</button>';
    } else if (stage === 'calculate') {
      html += '<button class="btn btn-accent" data-action="check-rf">Check Rf Values</button>';
    }
    return html;
  },
  
  renderDistillActions: function(stage, state) {
    var html = '';
    if (stage === 'startHeating' && !state.distHeating) {
      html += '<button class="btn btn-primary" data-action="start-heating">Start Heating</button>';
    } else if (stage === 'collect' && !state.distCollected) {
      html += '<button class="btn btn-accent" data-action="record-collection">Record Collection</button>';
    }
    return html;
  },
  
  renderTitrationActions: function(stage, state) {
    var html = '';
    if (stage === 'fillBurette' && !state.titrationBuretteFilled) {
      html += '<button class="btn btn-primary" data-action="fill-burette">Fill Burette</button>';
    } else if (stage === 'measureSample' && !state.titrationSampleMeasured) {
      html += '<button class="btn btn-primary" data-action="measure-sample">Measure Sample</button>';
    } else if (stage === 'titrate' && (state.titrationEndpointReached || state.titrationEndpointPassed)) {
      html += '<button class="btn btn-accent" data-action="record-titre">Record Titre</button>';
    } else if (stage === 'calculate') {
      html += '<button class="btn btn-accent" data-action="check-calc">Check Calculation</button>';
    }
    return html;
  },
  
  renderGasActions: function(stage, state) {
    var html = '';
    if (stage === 'performTest' && (!state.gasTestPerformed || !state.simulation || !state.simulation.done)) {
      html += '<button class="btn btn-primary" data-action="perform-test">Start Test</button>';
    } else if (stage === 'performTest' && state.gasTestPerformed && state.simulation && state.simulation.done) {
      html += '<button class="btn btn-accent" data-action="go-next-gas">Next</button>';
    } else if (stage === 'record') {
      html += '<button class="btn btn-accent" data-action="record-gas">Record & Continue</button>';
    } else if (stage === 'interpret') {
      html += '<button class="btn btn-accent" data-action="interpret-gas">Submit Interpretation</button>';
    } else if (stage === 'confirm') {
      html += '<button class="btn btn-primary" data-action="confirm-gas">Confirm Gas</button>';
    } else if (stage === 'nextGas') {
      var sim = SIMULATION_CONFIG['A5'];
      var confirmedCount = 0;
      for (var i = 0; i < sim.gases.length; i++) {
        if (state.gasResults[sim.gases[i].id] && state.gasResults[sim.gases[i].id].confirmed) confirmedCount++;
      }
      if (confirmedCount < sim.gases.length) {
        html += '<button class="btn btn-accent" data-action="go-next-gas">Test Next Gas</button>';
      } else {
        html += '<button class="btn btn-accent" data-action="go-summary">View Summary</button>';
      }
    } else if (stage === 'conclude') {
      html += '<button class="btn btn-accent" data-action="go-summary">View Summary</button>';
    }
    return html;
  },
  
  renderM7Actions: function(stage, state, id) {
    var html = '';
    if (stage === 'selectMaterials' || stage === 'selectSample') {
      return '';
    }
    if (stage === 'selectIon') {
      return '';
    }
    if (stage === 'identify') {
      html += '<button class="btn btn-accent" data-action="m7-confirm-ion">Confirm Identification</button>';
    } else if (stage === 'nextIon') {
      var sim2 = SIMULATION_CONFIG['M7_2'];
      var doneCount = 0;
      for (var j = 0; j < sim2.ions.length; j++) {
        if (state.m7_ionResults[sim2.ions[j].id]) doneCount++;
      }
      html += '<button class="btn btn-accent" data-action="m7-go-next">' + (doneCount < sim2.ions.length ? 'Test Next Ion' : 'View Summary') + '</button>';
    } else if (stage === 'record' || stage === 'recordMP' || stage === 'recordBP') {
      html += '<button class="btn btn-accent" data-action="m7-record">Record & Continue</button>';
    } else if (stage === 'interpret') {
      html += '<button class="btn btn-accent" data-action="m7-interpret">Submit Interpretation</button>';
    } else if (state.simulation && state.simulation.done) {
      html += '<button class="btn btn-accent" data-action="m7-go-next">Next</button>';
    } else if (!state.m7ActionDone && ['heat','performTest','dissolve','crystallize','performReaction','meltingPointTest','boilingPointTest'].indexOf(stage) !== -1) {
      var label = 'Start';
      if (stage === 'heat') label = 'Start Heating';
      else if (stage === 'performTest' && id === 'M7_2') label = 'Start Flame Test';
      else if (stage === 'performTest' && id === 'M7_7') label = 'Add Water';
      else if (stage === 'performReaction') label = 'Start Reaction';
      else if (stage === 'meltingPointTest' || stage === 'boilingPointTest') label = 'Start Test';
      html += '<button class="btn btn-primary" data-action="m7-start">' + label + '</button>';
    }
    return html;
  }
};
