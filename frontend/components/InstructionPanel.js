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


/* ---- Lab side panel: explanation + live status + observation table ---- */
InstructionPanel.SIDE_EXPLAIN_GENERIC = {
  prepare: '<p>Prepare the apparatus and materials as shown on the canvas. All values shown are simulated educational values.</p>',
  observe: '<p>Observe the canvas carefully. Note colours, temperatures and any changes before moving on.</p>',
  record: '<p>Write down exactly what you observed — colours, temperatures, volumes and any other visible change.</p>',
  interpret: '<p>Explain your observations in terms of the chemistry involved (boiling points, reactions, indicators).</p>',
  conclude: '<p>Summarise what the experiment shows and whether the aim was achieved.</p>',
  complete: '<p>Experiment complete. Review your observation table and conclusion.</p>'
};

InstructionPanel.SIDE_EXPLAIN = {
  A1: {
    setUp: '<p>Assemble the distillation flask, fractionating column, thermometer (bulb level with the side arm) and condenser. Cold water enters the condenser at the lower outlet and leaves at the top.</p>',
    checkSetup: '<p>Check all connections are tight and the thermometer bulb sits level with the side arm so it measures the vapour temperature.</p>',
    startHeating: '<p>The mixture contains ethanol (boiling point 78 °C) and water (boiling point 100 °C). Heating first vaporises the more volatile ethanol.</p>',
    monitor: '<p>Ethanol-rich vapour rises past the thermometer (about 78 °C), enters the condenser and liquefies. Collect this first fraction.</p>',
    collect: '<p>The distillate collected is the ethanol-rich fraction. Continued heating to about 100 °C would give the water fraction.</p>',
    observe: '<p>Fractions separate because of the difference in boiling points (78 °C vs 100 °C). The thermometer stays near the boiling point of the vapour passing it.</p>',
    record: '<p>Record the boiling points, the order of fractions and the appearance of each distillate.</p>'
  },
  A2: {
    prepare: '<p>Draw the baseline in pencil about 2 cm from the bottom edge. The baseline must sit ABOVE the solvent level so the spot does not wash away.</p>',
    baseline: '<p>Click the paper to draw a straight pencil baseline. Pencil is insoluble in the solvent, so the line will not run.</p>',
    sample: '<p>Spot the ink on the baseline with a fine capillary. Keep the spot small; dry it between applications.</p>',
    setup: '<p>Adjust the solvent level so it stays below the baseline. The paper must not touch the beaker walls.</p>',
    run: '<p>The solvent climbs the paper by capillary action. Each dye partitions between solvent and paper — dyes with greater affinity for the solvent travel faster and further.</p>',
    observe: '<p>Notice the dyes have separated into coloured bands at different heights on the paper.</p>',
    markFront: '<p>Mark the solvent front with a pencil immediately, before the solvent evaporates.</p>',
    measure: '<p>Measure each dye distance and the solvent-front distance from the same baseline.</p>',
    calculate: '<p>Rf = distance travelled by the component ÷ distance travelled by the solvent front. Rf is always less than 1 and is characteristic for a dye in a given solvent.</p>'
  },
  A3: {
    prepare: '<p>Separate Pb\u00b2\u207a and Cd\u00b2\u207a ions by paper chromatography. Draw the baseline in pencil above the solvent level.</p>',
    baseline: '<p>Click the paper to draw a straight pencil baseline above the eventual solvent level.</p>',
    sample: '<p>Spot the metal-ion solution on the baseline with a capillary; keep the spot small.</p>',
    setup: '<p>Keep the solvent level below the baseline so the spots are not washed into the beaker.</p>',
    run: '<p>The solvent carries the ions up the paper. Pb\u00b2\u207a and Cd\u00b2\u207a travel at different rates because their affinity for solvent vs paper differs.</p>',
    observe: '<p>The two ions appear as separate coloured spots at different heights.</p>',
    markFront: '<p>Mark the solvent front with a pencil before the solvent evaporates.</p>',
    measure: '<p>Measure each spot distance and the solvent-front distance from the baseline.</p>',
    calculate: '<p>Rf = spot distance ÷ solvent-front distance. Each ion has its own characteristic Rf, which identifies it.</p>'
  },
  A4: {
    prepare: '<p>Set up the burette in the stand and rinse it with NaOH solution. The conical flask takes 25.00 mL of HCl measured with a pipette.</p>',
    fillBurette: '<p>Fill the burette with standard NaOH (0.1 M) and remove the air bubble from the tip. Read the meniscus at eye level.</p>',
    measureSample: '<p>Pipette 25.00 mL of HCl into the conical flask and add 2\u20133 drops of phenolphthalein — it stays colourless in acid.</p>',
    titrate: '<p>Run NaOH in with constant swirling. Near the endpoint add drop by drop. At about 23.50 mL the faint pink colour persists for 30 seconds.</p>',
    endpoint: '<p>The endpoint is where the faint pink colour just persists (about pH 8.2). Repeat until titres agree within 0.10 mL.</p>',
    record: '<p>Record each titre. Concordant titres give the most reliable mean titre.</p>',
    calculate: '<p>At the endpoint, moles NaOH = moles HCl: M(HCl) \u00d7 25.00 = 0.1 \u00d7 mean titre. Expected molarity about 0.0938 M.</p>'
  },
  A5: {
    prepare: '<p>The prescribed practical tests for NH\u2083, CO\u2082 and Cl\u2082. Choose a gas, then its confirmatory test.</p>',
    selectGas: '<p>Pick the gas to identify. Use fresh reagents for every test.</p>',
    selectTest: '<p>Choose the confirmatory test for the selected gas.</p>',
    performTest: '<p>NH\u2083: moist red litmus turns blue. CO\u2082: lime water turns milky. Cl\u2082: damp blue litmus is bleached white.</p>',
    observe: '<p>Note the positive result — colour change or precipitate — that confirms the gas.</p>',
    record: '<p>Record the gas, the test used and the positive observation.</p>',
    confirm: '<p>Confirm the identification, then move on to test the next gas.</p>'
  },
  M7_1: {
    prepare: '<p>Place the naphthalene\u2013sand\u2013salt mixture in the evaporating dish and cover it with an inverted funnel lined with filter paper.</p>',
    heat: '<p>On heating, naphthalene turns directly to vapour (sublimation) near 80 °C. Sand and salt stay behind as residue.</p>',
    collect: '<p>The vapour deposits as shiny crystals on the cool funnel. This solid deposit is called the sublimate.</p>',
    observe: '<p>Sublimation is solid \u2192 vapour with no liquid state. The pure sublimate melts sharply at 80\u201382 °C.</p>',
    record: '<p>Record what remained in the dish and what collected on the funnel.</p>'
  },
  M7_2: {
    selectIon: '<p>Pick an ion to test. Clean the wire loop in acid between tests to avoid contamination.</p>',
    performTest: '<p>Dip the loop in the salt and hold it in the flame — each metal ion gives its own characteristic colour.</p>',
    observe: '<p>Na\u207a yellow, K\u207a lilac, Ca\u00b2\u207a brick red, Cu\u00b2\u207a blue-green, Ba\u00b2\u207a apple green.</p>',
    record: '<p>Record the flame colour for the ion tested.</p>',
    identify: '<p>Match the flame colour with the known colours to identify the ion, then confirm.</p>'
  },
  M7_3: {
    dissolve: '<p>Dissolve the copper sulfate crystals in the minimum amount of hot water to make a concentrated solution.</p>',
    concentrate: '<p>Evaporate gently until a thin skin of crystals appears on the surface of the solution.</p>',
    crystallize: '<p>Cool the concentrated solution slowly. Large blue crystals of hydrated copper sulfate (CuSO\u2084\u00b75H\u2082O) separate out.</p>',
    observe: '<p>Slow cooling gives bigger, purer crystals. The remaining liquid is the mother liquor.</p>',
    record: '<p>Record the shape, colour and size of the crystals obtained.</p>'
  },
  M7_4: {
    prepare: '<p>Set up the naphthalene in the apparatus with the thermometer. Pure naphthalene melts at 80.26 °C.</p>',
    heat: '<p>Heating pure naphthalene: the thermometer rises steadily to 80\u201382 °C, then stays constant while the solid melts.</p>',
    monitor: '<p>A pure substance melts over a sharp range. The constant temperature during melting shows the naphthalene is pure.</p>',
    observe: '<p>Record the melting-point range. An impure sample would melt over a broader range and below 80 °C.</p>',
    record: '<p>Record the melting-point range and note that temperature stayed constant during melting.</p>'
  },
  M7_5: {
    prepare: '<p>Set up the ethanol\u2013water mixture with the thermometer, condenser and receiving flask.</p>',
    heat: '<p>Ethanol boils at 78.37 °C. The thermometer reads the boiling vapour; temperature holds at the boiling point while liquid distils over.</p>',
    monitor: '<p>While distilling, the temperature stays at about 78.37 °C — the heat is used to change state, not to raise temperature.</p>',
    observe: '<p>The first distillate is ethanol-rich. A steady reading near 78 °C means pure ethanol vapour is condensing.</p>',
    record: '<p>Record the boiling point observed and the appearance of the distillate.</p>'
  },
  M7_6: {
    selectMaterials: '<p>Zinc and copper sulfate solution are provided. Zn is more reactive than Cu in the reactivity series.</p>',
    performReaction: '<p>Zinc displaces copper from CuSO\u2084: Zn + CuSO\u2084 \u2192 ZnSO\u2084 + Cu. The blue colour fades as Cu\u00b2\u207a ions are removed.</p>',
    observe: '<p>Red-brown copper deposits on the zinc and the zinc slowly dissolves. This is a displacement (redox) reaction.</p>',
    record: '<p>Record the colour before and after the reaction and what deposited on the zinc.</p>'
  },
  M7_7: {
    selectSample: '<p>Choose the water sample and note its initial colour and appearance.</p>',
    performTest: '<p>Add the reagent and observe the colour change — it indicates the dissolved substance in the water sample.</p>',
    observe: '<p>Compare the colour before and after adding the reagent.</p>',
    record: '<p>Record the initial appearance, the reagent used and the final colour.</p>'
  },
  M7_8: {
    meltingPointTest: '<p>Heating ice: the thermometer stays at 0 °C while it melts — temperature is constant during a change of state.</p>',
    recordMP: '<p>Record the melting point: 0 °C at standard pressure.</p>',
    boilingPointTest: '<p>Heating water: at 100 °C the temperature stops rising while it boils.</p>',
    recordBP: '<p>Record the boiling point: 100 °C at standard pressure.</p>',
    interpret: '<p>During melting and boiling the heat supplied breaks intermolecular forces instead of raising the temperature.</p>'
  }
};

InstructionPanel.sideExplain = function(expId, stage) {
  var map = InstructionPanel.SIDE_EXPLAIN;
  if (map[expId] && map[expId][stage]) return map[expId][stage];
  if (InstructionPanel.SIDE_EXPLAIN_GENERIC[stage]) return InstructionPanel.SIDE_EXPLAIN_GENERIC[stage];
  return '<p>Follow the procedure on the canvas. All values shown are simulated educational values.</p>';
};

InstructionPanel.sideStatusText = function(state) {
  var sim = state && state.simulation;
  if (sim && !sim.done) return 'In progress\u2026';
  if (sim && sim.done) return 'Completed';
  if (state && state.m7ActionDone) return 'Completed';
  return 'Not started';
};

InstructionPanel.sideLive = function(expId, state) {
  var st = state || {};
  var rows = [];
  var sim = st.simulation;
  var busy = !!(sim && !sim.done);
  var done = !!(sim && sim.done);
  if (expId === 'A1') {
    rows.push(['Temperature', st.distCollected ? '78 \u00b0C (fraction collected)' : (st.distHeating ? 'Heating \u2192 78 \u00b0C' : '25 \u00b0C (room)')]);
    rows.push(['Boiling points', 'Ethanol 78 \u00b0C \u00b7 Water 100 \u00b0C']);
  } else if (expId === 'A2' || expId === 'A3') {
    rows.push(['Solvent front', st.solventFrontDist ? st.solventFrontDist.toFixed(1) + ' cm' : 'not measured yet']);
    var dists = [];
    if (st.measuredComponents) {
      for (var i = 0; i < st.measuredComponents.length; i++) {
        if (st.measuredComponents[i] && st.measuredComponents[i].distance) dists.push(st.measuredComponents[i].distance.toFixed(1));
      }
    }
    rows.push(['Spot distances', dists.length ? dists.join(' \u00b7 ') + ' cm' : 'measure on the paper']);
    rows.push(['Rf formula', 'component \u00f7 solvent front']);
  } else if (expId === 'A4') {
    var maxML = (typeof SIMULATION_CONFIG !== 'undefined' && SIMULATION_CONFIG['A4'] && SIMULATION_CONFIG['A4'].burette) ? SIMULATION_CONFIG['A4'].burette.maxML : 50;
    rows.push(['Burette reading', (st.titrationVolume || 0).toFixed(2) + ' / ' + maxML + ' mL']);
    rows.push(['Endpoint \u2248', '23.50 mL NaOH']);
    rows.push(['Trials recorded', (st.titrationTrials ? st.titrationTrials.length : 0) + ' / 3']);
  } else if (expId === 'A5') {
    var gs = (typeof SIMULATION_CONFIG !== 'undefined' && SIMULATION_CONFIG['A5'] && SIMULATION_CONFIG['A5'].gases) ? SIMULATION_CONFIG['A5'].gases : [];
    var gnow = gs[st.gasCurrentIndex || 0];
    rows.push(['Current gas', gnow ? (gnow.name || gnow.id) : '\u2014']);
    rows.push(['Test status', done || st.gasTestPerformed ? 'Completed' : (busy ? 'Testing\u2026' : 'Not started')]);
    var conf = 0;
    for (var gi = 0; gi < gs.length; gi++) {
      if (st.gasResults && st.gasResults[gs[gi].id] && st.gasResults[gs[gi].id].confirmed) conf++;
    }
    rows.push(['Gases confirmed', conf + ' / ' + gs.length]);
  } else if (expId === 'M7_1') {
    rows.push(['Sublimation', 'naphthalene \u2248 80 \u00b0C']);
    rows.push(['Status', InstructionPanel.sideStatusText(st)]);
  } else if (expId === 'M7_2') {
    var msim = (typeof SIMULATION_CONFIG !== 'undefined' && SIMULATION_CONFIG['M7_2']) ? SIMULATION_CONFIG['M7_2'] : null;
    var mc = 0;
    if (msim && msim.ions && st.m7_ionResults) {
      for (var mi = 0; mi < msim.ions.length; mi++) {
        if (st.m7_ionResults[msim.ions[mi].id]) mc++;
      }
    }
    rows.push(['Ions identified', mc + ' / ' + (msim && msim.ions ? msim.ions.length : 5)]);
    rows.push(['Flame test', 'characteristic colours']);
  } else if (expId === 'M7_3') {
    rows.push(['Process', 'crystallization']);
    rows.push(['Status', InstructionPanel.sideStatusText(st)]);
  } else if (expId === 'M7_4') {
    rows.push(['Melting point', '80.26 \u00b0C (pure naphthalene)']);
    rows.push(['Status', busy ? 'Heating\u2026' : (done ? 'Melted \u2014 temp held 80\u201382 \u00b0C' : 'Not started')]);
  } else if (expId === 'M7_5') {
    rows.push(['Boiling point', '78.37 \u00b0C (ethanol)']);
    rows.push(['Status', busy ? 'Distilling\u2026' : (done ? 'Distillation complete' : 'Not started')]);
  } else if (expId === 'M7_6') {
    rows.push(['Reaction', 'Zn + CuSO\u2084 \u2192 ZnSO\u2084 + Cu']);
    rows.push(['Status', InstructionPanel.sideStatusText(st)]);
  } else if (expId === 'M7_7') {
    rows.push(['Process', 'water sample test']);
    rows.push(['Status', InstructionPanel.sideStatusText(st)]);
  } else if (expId === 'M7_8') {
    rows.push(['Melting point', '0 \u00b0C (ice)']);
    rows.push(['Boiling point', '100 \u00b0C (water)']);
    rows.push(['Status', InstructionPanel.sideStatusText(st)]);
  }
  var h = '';
  for (var r = 0; r < rows.length; r++) {
    h += '<div class="lab-side-kv"><span>' + rows[r][0] + '</span><strong>' + ChemSim.escapeHtml('' + rows[r][1]) + '</strong></div>';
  }
  return h || '<p class="lab-side-empty">\u2014</p>';
};

InstructionPanel.sideTable = function(expId, stage, state) {
  var st = state || {};
  var headers = [];
  var rows = [];
  if (expId === 'A1') {
    headers = ['Fraction', 'Temp (\u00b0C)', 'Observation'];
    if (st.distCollected) rows.push(['First fraction', '78', 'Colourless distillate collected']);
  } else if (expId === 'A2' || expId === 'A3') {
    headers = ['Component', 'Distance (cm)', 'Rf'];
    var csim = (typeof SIMULATION_CONFIG !== 'undefined' && SIMULATION_CONFIG[expId]) ? SIMULATION_CONFIG[expId] : null;
    if (csim && csim.components && st.measuredComponents && st.solventFrontDist) {
      for (var i = 0; i < csim.components.length; i++) {
        var d = st.measuredComponents[i] ? st.measuredComponents[i].distance : 0;
        var rf = st.solventFrontDist ? (d / st.solventFrontDist) : 0;
        rows.push([csim.components[i].name, d ? d.toFixed(1) : '\u2014', rf ? rf.toFixed(2) : '\u2014']);
      }
    }
  } else if (expId === 'A4') {
    headers = ['Trial', 'Titre (mL)'];
    if (st.titrationTrials && st.titrationTrials.length) {
      var sum = 0;
      for (var t = 0; t < st.titrationTrials.length; t++) {
        var v = st.titrationTrials[t].volume || 0;
        sum += v;
        rows.push(['' + (t + 1), v.toFixed(2)]);
      }
      if (st.titrationTrials.length >= 2) rows.push(['Mean', (sum / st.titrationTrials.length).toFixed(2)]);
    }
  } else if (expId === 'A5') {
    headers = ['Gas', 'Test', 'Result'];
    var gsim = (typeof SIMULATION_CONFIG !== 'undefined' && SIMULATION_CONFIG['A5'] && SIMULATION_CONFIG['A5'].gases) ? SIMULATION_CONFIG['A5'].gases : [];
    for (var g = 0; g < gsim.length; g++) {
      var res = st.gasResults ? st.gasResults[gsim[g].id] : null;
      if (res && res.confirmed) rows.push([gsim[g].name || gsim[g].id, res.selectedTest || gsim[g].correctTest || '\u2014', 'Confirmed']);
    }
  } else if (expId === 'M7_1') {
    headers = ['Stage', 'Observation'];
    if (st.simulation && st.simulation.done) rows.push(['Heating', 'Naphthalene sublimed \u2014 crystals on funnel']);
  } else if (expId === 'M7_2') {
    headers = ['Ion', 'Flame colour'];
    var msim = (typeof SIMULATION_CONFIG !== 'undefined' && SIMULATION_CONFIG['M7_2']) ? SIMULATION_CONFIG['M7_2'] : null;
    if (msim && msim.ions && st.m7_ionResults) {
      for (var k = 0; k < msim.ions.length; k++) {
        if (st.m7_ionResults[msim.ions[k].id]) rows.push([msim.ions[k].name, msim.ions[k].flameColour]);
      }
    }
  } else if (expId === 'M7_3') {
    headers = ['Step', 'Observation'];
    var order3 = ['dissolve', 'concentrate', 'crystallize', 'observe', 'record'];
    var si = order3.indexOf(stage);
    if (st.simulation && st.simulation.done) rows.push(['Dissolve', 'Crystals dissolved in hot water']);
    if (si >= 1) rows.push(['Concentrate', 'Concentrated until a skin forms']);
    if (si >= 2) rows.push(['Crystallize', 'Blue CuSO\u2084\u00b75H\u2082O crystals separated']);
  } else if (expId === 'M7_4') {
    headers = ['Stage', 'Temp (\u00b0C)', 'Observation'];
    if (st.simulation && st.simulation.done) rows.push(['Melting', '80\u201382', 'Solid melted; temperature held constant']);
  } else if (expId === 'M7_5') {
    headers = ['Fraction', 'Temp (\u00b0C)', 'Observation'];
    if (st.simulation && st.simulation.done) rows.push(['First fraction', '78.37', 'Ethanol-rich distillate collected']);
  } else if (expId === 'M7_6') {
    headers = ['Mixture', 'Observation'];
    if (st.simulation && st.simulation.done) rows.push(['Zn + CuSO\u2084', 'Blue fades; red-brown Cu deposited']);
  } else if (expId === 'M7_7') {
    headers = ['Test', 'Observation'];
    if (st.simulation && st.simulation.done) rows.push(['Water sample', 'Colour change observed (see canvas)']);
  } else if (expId === 'M7_8') {
    headers = ['Property', 'Value (\u00b0C)', 'Observation'];
    var order8 = ['meltingPointTest', 'recordMP', 'boilingPointTest', 'recordBP', 'interpret', 'conclude'];
    var m8i = order8.indexOf(stage);
    if (m8i >= 0) rows.push(['Melting point', '0', 'Ice melts; temp constant at 0 \u00b0C']);
    if (m8i >= 2) rows.push(['Boiling point', '100', 'Water boils; temp constant at 100 \u00b0C']);
  }
  if (!rows.length) return '<p class="lab-side-empty">Observations fill in here as the experiment proceeds.</p>';
  var h = '<table class="lab-side-table"><tr>';
  for (var c = 0; c < headers.length; c++) h += '<th>' + headers[c] + '</th>';
  h += '</tr>';
  for (var r2 = 0; r2 < rows.length; r2++) {
    h += '<tr>';
    for (var c2 = 0; c2 < rows[r2].length; c2++) h += '<td>' + ChemSim.escapeHtml('' + rows[r2][c2]) + '</td>';
    h += '</tr>';
  }
  h += '</table>';
  return h;
};

InstructionPanel.renderSide = function(exp, stage, state) {
  if (!exp) return '';
  var h = '<aside class="lab-side">';
  h += '<div class="lab-side-card lab-side-explain"><h4 class="lab-side-title">What\u2019s Happening</h4><div class="lab-side-body">' +
    InstructionPanel.sideExplain(exp.id, stage) +
    '<div class="sim-note" style="margin-top:8px;">Simulated educational values \u2014 not real lab measurements.</div></div></div>';
  h += '<div class="lab-side-card"><h4 class="lab-side-title">Live Status</h4><div class="lab-side-body">' +
    InstructionPanel.sideLive(exp.id, state) + '</div></div>';
  h += '<div class="lab-side-card"><h4 class="lab-side-title">Observation Table</h4>' +
    InstructionPanel.sideTable(exp.id, stage, state) + '</div>';
  h += '</aside>';
  return h;
};
