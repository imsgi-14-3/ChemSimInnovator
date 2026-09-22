var InstructionPanel = {
  render: function(exp, stage, state) {
    if (!exp) return '<div class="instruction-placeholder"><p>Select an experiment to begin</p></div>';
    var html = '<div class="instruction-panel-content">';
    html += '<div class="instruction-card">';
    html += '<h4 class="instruction-stage">' + InstructionPanel.getStageLabel(stage) + '</h4>';
    html += '<div class="instruction-body">' + InstructionPanel.getStageInstruction(exp, stage, state) + '</div>';
    html += '</div></div>';
    return html;
  },
  getStageLabel: function(stage) {
    var labels = {
      select: 'Select Experiment', objective: 'Objective', apparatus: 'Apparatus & Materials',
      prepare: 'Prepare', baseline: 'Draw Baseline', sample: 'Apply Sample',
      setup: 'Setup', run: 'Run', observe: 'Observe', markFront: 'Mark Solvent Front',
      measure: 'Measure', calculate: 'Calculate', interpret: 'Interpret', conclude: 'Conclusion',
      complete: 'Complete', setUp: 'Set Up', checkSetup: 'Check Setup',
      startHeating: 'Start Heating', monitor: 'Monitor', collect: 'Collect',
      fillBurette: 'Fill Burette', measureSample: 'Measure Sample', titrate: 'Titrate',
      endpoint: 'Endpoint', record: 'Record', selectGas: 'Select Gas',
      selectTest: 'Select Test', performTest: 'Perform Test', confirm: 'Confirm',
      nextGas: 'Next Gas', summary: 'Summary', selectIon: 'Select Ion',
      identify: 'Identify', nextIon: 'Next Ion', dissolve: 'Dissolve',
      concentrate: 'Concentrate', crystallize: 'Crystallize', heat: 'Heat',
      selectMaterials: 'Select Materials', performReaction: 'Perform Reaction',
      selectSample: 'Select Sample', meltingPointTest: 'Melting Point Test',
      recordMP: 'Record MP', boilingPointTest: 'Boiling Point Test', recordBP: 'Record BP'
    };
    return labels[stage] || stage;
  },
  getStageInstruction: function(exp, stage, state) {
    var html = '';
    switch(stage) {
      case 'objective':
        html = '<p>Read the experiment objective and understand the goals.</p>';
        break;
      case 'apparatus':
        html = '<p>Review the apparatus and materials needed for this experiment.</p>';
        break;
      case 'prepare':
        html = '<p>Prepare the necessary tools and materials.</p>';
        if ((exp.id === 'A2' || exp.id === 'A3') && !state.prepareTool) {
          html += '<p class="instruction-highlight">Select the correct tool for drawing the baseline.</p>';
        }
        break;
      case 'baseline':
        html = '<p>Click on the chromatography paper to draw the baseline with pencil.</p>';
        if (state.baselineDrawn) html += '<div class="feedback feedback-correct">Baseline drawn.</div>';
        break;
      case 'sample':
        html = '<p>Click on the baseline to place the ink sample spot.</p>';
        if (state.sampleApplied) html += '<div class="feedback feedback-correct">Sample applied.</div>';
        break;
      case 'setup':
        html = '<p>Adjust the solvent level so it is below the baseline.</p>';
        html += '<p>Key conditions:</p><ul><li>Solvent below baseline</li><li>Paper not touching walls</li></ul>';
        break;
      case 'run':
        html = '<p>The solvent is rising by capillary action.</p>';
        html += '<p>Observe the components separating.</p>';
        break;
      case 'observe':
        html = '<p>Examine the separated spots on the chromatogram.</p>';
        break;
      case 'markFront':
        html = '<p>Click on the paper to mark the solvent front position.</p>';
        break;
      case 'measure':
        html = '<p>Click the baseline, then the solvent front, then each spot to measure distances.</p>';
        break;
      case 'calculate':
        html = '<p>Calculate the Rf value for each component.</p>';
        html += '<p class="instruction-formula">Rf = Distance of component / Distance of solvent front</p>';
        break;
      case 'interpret':
        html = '<p>Based on your observations, interpret the results.</p>';
        break;
      case 'conclude':
        html = '<p>Write your conclusion addressing the experiment objectives.</p>';
        break;
      case 'complete':
        html = '<div class="feedback feedback-correct">Experiment complete!</div>';
        break;
      case 'setUp':
        html = '<p>Position the thermometer at the column head and connect the condenser.</p>';
        break;
      case 'checkSetup':
        html = '<p>Verify the apparatus is correctly assembled before heating.</p>';
        break;
      case 'startHeating':
        html = '<p>Begin heating the flask gently and steadily.</p>';
        break;
      case 'monitor':
        html = '<p>Watch the temperature and distillation process.</p>';
        break;
      case 'collect':
        html = '<p>The first fraction has been collected. Record the collection.</p>';
        break;
      case 'fillBurette':
        html = '<p>Fill the burette with HCl solution and adjust to 0.00 mL.</p>';
        break;
      case 'measureSample':
        html = '<p>Pipette 25.00 mL of NaOH into the conical flask. Add indicator.</p>';
        break;
      case 'titrate':
        html = '<p>Use the stopcock slider to add HCl slowly.</p>';
        html += '<p>Watch for the endpoint (pink to colourless).</p>';
        break;
      case 'endpoint':
        html = '<p>The endpoint has been reached.</p>';
        html += '<p>The pink colour has disappeared permanently.</p>';
        break;
      case 'record':
        html = '<p>Record your observations and measurements.</p>';
        break;
      case 'selectGas':
        html = '<p>Choose the next gas to test.</p>';
        break;
      case 'selectTest':
        html = '<p>Select the correct test for this gas.</p>';
        break;
      case 'performTest':
        html = '<p>Perform the virtual test and observe the result.</p>';
        break;
      case 'confirm':
        html = '<p>Confirm the identity of this gas based on your evidence.</p>';
        break;
      case 'nextGas':
        html = '<p>Gas confirmed. Proceed to test the next gas.</p>';
        break;
      case 'summary':
        html = '<p>Review the summary of all tests performed.</p>';
        break;
      case 'heat':
        html = '<p>Heat the sample and observe the changes.</p>';
        break;
      case 'dissolve':
        html = '<p>Dissolve the sample in warm distilled water.</p>';
        break;
      case 'concentrate':
        html = '<p>Heat the solution to concentrate by evaporation.</p>';
        break;
      case 'crystallize':
        html = '<p>Allow the solution to cool slowly for crystal formation.</p>';
        break;
      case 'selectIon':
        html = '<p>Choose the next ion to test.</p>';
        break;
      case 'identify':
        html = '<p>Identify the ion based on the flame colour.</p>';
        break;
      case 'nextIon':
        html = '<p>Ion identified. Test the next ion.</p>';
        break;
      default:
        html = '<p>Follow the instructions for this step.</p>';
    }
    return html;
  }
};
