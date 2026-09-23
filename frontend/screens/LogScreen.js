/* ================================================================
   Experiment Log Screen — Full implementation
   Storage, record builders, renderers, event handlers
   ================================================================ */

var ExpLog = (function() {
  'use strict';

  var STORAGE_KEY = 'chemsim_experiment_log';

  /* ---- Storage Layer ---- */

  function load() {
    try {
      if (typeof localStorage === 'undefined') return [];
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (e) {
      return [];
    }
  }

  function save(records) {
    try {
      if (typeof localStorage === 'undefined') return false;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return true;
    } catch (e) {
      return false;
    }
  }

  function add(record) {
    var records = load();
    records.unshift(record);
    return save(records);
  }

  function del(recordId) {
    var records = load();
    var found = false;
    for (var i = 0; i < records.length; i++) {
      if (records[i].id === recordId) {
        records.splice(i, 1);
        found = true;
        break;
      }
    }
    if (found) save(records);
    return found;
  }

  function clearAll() {
    return save([]);
  }

  function getById(recordId) {
    var records = load();
    for (var i = 0; i < records.length; i++) {
      if (records[i].id === recordId) return records[i];
    }
    return null;
  }

  /* ---- Timestamp Helper ---- */

  function timestamp() {
    var now = new Date();
    var date = now.getFullYear() + '-' +
      ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1) + '-' +
      (now.getDate() < 10 ? '0' : '') + now.getDate();
    var time = ((now.getHours() < 10 ? '0' : '') + now.getHours()) + ':' +
      ((now.getMinutes() < 10 ? '0' : '') + now.getMinutes()) + ':' +
      ((now.getSeconds() < 10 ? '0' : '') + now.getSeconds());
    return { date: date, time: time, ts: now.getTime() };
  }

  /* ---- Record Builders ---- */

  function buildPracticalRecord(exp, state) {
    var ts = timestamp();
    var id = 'LOG-' + ts.ts + '-' + Math.random().toString(36).substring(2, 6);

    var observations = '';
    var measurements = '';
    var calculations = '';
    var result = '';
    var conclusion = state.conclusion || '';

    if (typeof SIMULATION_CONFIG !== 'undefined') {
      if (exp.id === 'A1') {
        var sim = SIMULATION_CONFIG['A1'];
        if (sim) {
          observations = 'First fraction: ' + sim.firstFraction.name + ' at ' + sim.firstFraction.boilingPoint + ' C. ' +
            'Second fraction: ' + sim.secondFraction.name + ' at ' + sim.secondFraction.boilingPoint + ' C.';
          measurements = 'Temperature monitored throughout distillation. Distillate collected at stabilised boiling points.';
          result = sim.firstFraction.name + ' distils first at the lower boiling point, while ' + sim.secondFraction.name + ' remains in the flask.';
        }
      } else if (exp.id === 'A2' || exp.id === 'A3') {
        var simC = SIMULATION_CONFIG[exp.id];
        if (simC) {
          var parts = [];
          for (var i = 0; i < simC.components.length; i++) {
            var c = simC.components[i];
            var dist = state.measuredComponents && state.measuredComponents[i] ? state.measuredComponents[i].distance : 0;
            var rf = (state.rfAnswers && state.rfAnswers['rf_' + i]) || '\u2014';
            parts.push(c.name + ': distance=' + dist.toFixed(2) + ' cm, Rf=' + rf);
          }
          observations = parts.join('; ');
          measurements = 'Component distances and Rf values measured. Solvent front: ' + (state.solventFrontDist ? state.solventFrontDist.toFixed(2) + ' cm' : '\u2014') + '.';
          result = 'Components separated by paper chromatography based on different Rf values.';
        }
      } else if (exp.id === 'A4') {
        var simT = SIMULATION_CONFIG['A4'];
        if (simT) {
          observations = 'HCl concentration: ' + simT.hclConcentration.toFixed(4) + ' mol/L. NaOH volume: ' + simT.naohVolume.toFixed(2) + ' mL. Mean titre: ' + simT.meanTitre.toFixed(2) + ' mL.';
          measurements = 'Mean titre value used for molarity calculation.';
          calculations = 'NaOH molarity = ' + simT.expectedMolarity.toFixed(4) + ' mol/L.';
          result = 'Exact molarity of NaOH determined volumetrically as ' + simT.expectedMolarity.toFixed(4) + ' mol/L.';
        }
      } else if (exp.id === 'A5') {
        var simG = SIMULATION_CONFIG['A5'];
        if (simG) {
          var gasObs = [];
          for (var gi = 0; gi < simG.gases.length; gi++) {
            var g = simG.gases[gi];
            var res = (state.gasResults && state.gasResults[g.id]) || {};
            gasObs.push(g.name + ': test=' + g.correctTestLabel + ', observation=' + (res.recorded || '\u2014') + ', interpretation=' + (res.interpretation || '\u2014') + ', confirmed=' + (res.confirmed ? 'yes' : 'no'));
          }
          observations = gasObs.join('; ');
          measurements = 'Three gases tested and confirmed using appropriate chemical tests.';
          result = 'NH\u2083 confirmed with damp red litmus, CO\u2082 confirmed with limewater, Cl\u2082 confirmed with damp litmus.';
        }
      } else if (exp.id && exp.id.indexOf('M7') === 0) {
        observations = state.interpretation || '';
        measurements = 'Observations recorded during the practical.';
        result = 'Experiment completed. Observations recorded.';
      }
    }

    return {
      id: id,
      experimentId: exp.id,
      title: exp.title,
      section: exp.section,
      type: 'practical',
      date: ts.date,
      time: ts.time,
      slos: exp.slos || [],
      objective: exp.objective || '',
      apparatus: exp.apparatus || [],
      materials: exp.materials || [],
      procedure: exp.procedure || [],
      observations: observations,
      measurements: measurements,
      calculations: calculations,
      result: result,
      conclusion: conclusion,
      sourceLabel: 'FBISE prescribed practical',
      simulatedNotice: 'All measurements and values are simulated educational values, not real laboratory measurements.'
    };
  }

  function buildMysteryRecord(mysteryState) {
    var ts = timestamp();
    var id = 'LOG-' + ts.ts + '-' + Math.random().toString(36).substring(2, 6);
    var sample = mysteryState.currentSample;

    var evidenceText = [];
    if (sample && sample.tests) {
      for (var i = 0; i < sample.tests.length; i++) {
        var test = sample.tests[i];
        if (mysteryState.testsPerformed[test.id]) {
          evidenceText.push(test.name + ': ' + test.observation + ' (interpretation: ' + test.interpretation + ')');
        }
      }
    }

    return {
      id: id,
      experimentId: 'mystery',
      title: 'Mystery Lab Investigation',
      section: 'investigation',
      type: 'mystery',
      date: ts.date,
      time: ts.time,
      sampleId: sample ? sample.id : 'unknown',
      sampleTitle: sample ? sample.title : 'Unknown Sample',
      sampleIdentity: sample ? sample.identity : 'Unknown',
      testsPerformed: evidenceText.length,
      evidence: evidenceText,
      score: mysteryState.score || 0,
      totalMarks: mysteryState.totalMarks || 0,
      conclusion: sample ? sample.conclusion : '',
      sourceLabel: 'ChemSim Mystery Lab \u2014 Educational Simulation',
      simulatedNotice: 'All observations are simulated educational values, not real laboratory measurements.'
    };
  }

  /* ---- Renderers ---- */

  function renderMenu() {
    var records = load();
    var count = records.length;

    var h = '<div class="log-panel log-menu">';
    h += '<div class="log-menu-header">';
    h += '<h2>Experiment Log</h2>';
    h += '<p class="text-secondary">A browser-local record of your ChemSim educational investigations.</p>';
    h += '</div>';
    h += '<p class="log-menu-desc">Review your completed practicals and Mystery Lab investigations. Records are stored locally in your browser.</p>';
    h += '<div class="log-menu-actions">';
    h += '<button class="btn btn-primary log-open-btn" id="btn-log-open">Open Experiment Log (' + count + ' record' + (count !== 1 ? 's' : '') + ')</button>';
    h += '</div>';
    h += '<div class="log-sim-notice">';
    h += '<p><strong>About the Experiment Log:</strong> Records are created automatically when you finish a practical or Mystery Lab investigation.</p>';
    h += '<p><em>Simulation values are educationally simulated and are not real laboratory measurements.</em></p>';
    h += '</div>';
    h += '</div>';
    return h;
  }

  function renderList() {
    var records = load();
    var h = '<div class="log-panel">';
    h += '<div class="log-list-header">';
    h += '<div><h3>Experiment Log</h3>';
    h += '<p class="text-secondary">' + records.length + ' record' + (records.length !== 1 ? 's' : '') + ' saved</p></div>';
    if (records.length > 0) {
      h += '<button class="btn btn-secondary log-clear-btn" id="btn-log-clear-all">Clear All</button>';
    }
    h += '</div>';

    if (records.length === 0) {
      h += '<div class="log-empty">';
      h += '<p class="log-empty-title">No experiment records yet.</p>';
      h += '<p class="log-empty-desc">Complete a practical or Mystery Lab investigation to create your first record.</p>';
      h += '</div>';
    } else {
      h += '<div class="log-entries">';
      for (var i = 0; i < records.length; i++) {
        var r = records[i];
        var typeLabel = r.type === 'mystery' ? 'Mystery Lab' : (r.section === 'major' ? 'Major' : 'Minor');
        var typeColor = r.type === 'mystery' ? '#6a1b9a' : (r.section === 'major' ? 'var(--color-primary)' : 'var(--color-accent, #ff9800)');
        h += '<div class="log-card">';
        h += '<div class="log-card-content">';
        h += '<div class="log-card-header">';
        h += '<span class="log-badge" style="background:' + typeColor + ';">' + typeLabel + '</span>';
        h += '<strong class="log-card-title">' + escapeHtml(r.title) + '</strong>';
        h += '</div>';
        h += '<p class="log-card-meta">' + r.date + ' at ' + r.time + '</p>';
        if (r.type === 'mystery' && r.sampleTitle) {
          h += '<p class="log-card-meta">Sample: ' + escapeHtml(r.sampleTitle) + '</p>';
        }
        h += '</div>';
        h += '<div class="log-card-actions">';
        h += '<button class="btn btn-secondary btn-log-view" data-log-id="' + r.id + '">View</button>';
        h += '<button class="btn btn-secondary btn-log-delete" data-log-id="' + r.id + '" style="color:var(--color-error, #d32f2f);">Delete</button>';
        h += '</div>';
        h += '</div>';
      }
      h += '</div>';
    }

    h += '<div class="log-list-footer">';
    h += '<button class="btn btn-secondary" id="btn-log-back-from-list">Back to Menu</button>';
    h += '</div>';
    h += '</div>';
    return h;
  }

  function renderDetail(recordId) {
    var record = getById(recordId);
    if (!record) return renderList();

    var h = '<div class="log-panel log-detail">';
    h += '<div class="log-detail-header">';
    h += '<h3>' + escapeHtml(record.title) + '</h3>';
    h += '<button class="btn btn-secondary btn-log-delete" data-log-id="' + record.id + '" style="color:var(--color-error, #d32f2f);font-size:0.85rem;">Delete</button>';
    h += '</div>';

    /* Metadata */
    h += '<div class="log-detail-meta">';
    var typeLabel = record.type === 'mystery' ? 'Mystery Lab Investigation' : (record.section === 'major' ? 'Major Practical' : 'Minor Practical');
    h += '<p><strong>Type:</strong> ' + typeLabel + '</p>';
    h += '<p><strong>Date:</strong> ' + record.date + ' at ' + record.time + '</p>';
    if (record.slos && record.slos.length > 0) {
      h += '<p><strong>SLOs:</strong> ' + record.slos.join(', ') + '</p>';
    }
    h += '</div>';

    if (record.type === 'mystery') {
      /* Mystery Lab detail */
      h += '<div class="log-detail-section">';
      if (record.sampleTitle) h += '<p><strong>Sample:</strong> ' + escapeHtml(record.sampleTitle) + '</p>';
      if (record.sampleIdentity) h += '<p><strong>Identity:</strong> ' + escapeHtml(record.sampleIdentity) + '</p>';
      if (record.testsPerformed) h += '<p><strong>Tests Performed:</strong> ' + record.testsPerformed + '</p>';
      if (record.score !== undefined && record.totalMarks) h += '<p><strong>Score:</strong> ' + record.score + ' / ' + record.totalMarks + '</p>';
      if (record.evidence && record.evidence.length > 0) {
        h += '<h4>Evidence</h4>';
        for (var i = 0; i < record.evidence.length; i++) {
          h += '<div class="log-evidence-entry"><p>' + escapeHtml(record.evidence[i]) + '</p></div>';
        }
      }
      if (record.conclusion) {
        h += '<h4>Conclusion</h4>';
        h += '<p>' + escapeHtml(record.conclusion) + '</p>';
      }
      h += '</div>';
    } else {
      /* Practical detail */
      if (record.objective) {
        h += '<div class="log-detail-section"><h4>Objective</h4>';
        h += '<p>' + escapeHtml(record.objective) + '</p></div>';
      }
      if (record.apparatus && record.apparatus.length > 0) {
        h += '<div class="log-detail-section"><h4>Apparatus</h4><ul>';
        for (var ai = 0; ai < record.apparatus.length; ai++) {
          var a = record.apparatus[ai];
          h += '<li>' + escapeHtml(a.name) + (a.desc ? ' \u2014 ' + escapeHtml(a.desc) : '') + '</li>';
        }
        h += '</ul></div>';
      }
      if (record.materials && record.materials.length > 0) {
        h += '<div class="log-detail-section"><h4>Materials</h4><ul>';
        for (var mi = 0; mi < record.materials.length; mi++) {
          h += '<li>' + escapeHtml(record.materials[mi].name) + '</li>';
        }
        h += '</ul></div>';
      }
      if (record.procedure && record.procedure.length > 0) {
        h += '<div class="log-detail-section"><h4>Procedure</h4><ol>';
        for (var pi = 0; pi < record.procedure.length; pi++) {
          h += '<li>' + escapeHtml(record.procedure[pi]) + '</li>';
        }
        h += '</ol></div>';
      }
      if (record.observations) {
        h += '<div class="log-detail-section"><h4>Observations</h4>';
        h += '<p>' + escapeHtml(record.observations) + '</p></div>';
      }
      if (record.measurements) {
        h += '<div class="log-detail-section"><h4>Measurements</h4>';
        h += '<p>' + escapeHtml(record.measurements) + '</p></div>';
      }
      if (record.calculations) {
        h += '<div class="log-detail-section"><h4>Calculations</h4>';
        h += '<p>' + escapeHtml(record.calculations) + '</p></div>';
      }
      if (record.result) {
        h += '<div class="log-detail-section"><h4>Result</h4>';
        h += '<p>' + escapeHtml(record.result) + '</p></div>';
      }
      if (record.conclusion) {
        h += '<div class="log-detail-section"><h4>Conclusion</h4>';
        h += '<p>' + escapeHtml(record.conclusion) + '</p></div>';
      }
    }

    /* Simulation notice */
    h += '<div class="log-sim-notice">';
    h += '<p>' + escapeHtml(record.simulatedNotice || 'All measurements are simulated educational values.') + '</p>';
    h += '</div>';

    h += '<div class="log-detail-footer">';
    h += '<button class="btn btn-secondary" id="btn-log-back-from-detail">Back to Log</button>';
    h += '</div>';
    h += '</div>';
    return h;
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

      if (target.id === 'btn-log-open') {
        appState.logState.screen = 'list';
        renderInto(appState);
        return;
      }
      if (target.id === 'btn-log-back-from-list') {
        appState.logState.screen = 'menu';
        renderInto(appState);
        return;
      }
      if (target.id === 'btn-log-back-from-detail') {
        appState.logState.screen = 'list';
        appState.logState.detailId = null;
        renderInto(appState);
        return;
      }
      if (target.id === 'btn-log-clear-all') {
        if (confirm('Are you sure you want to delete ALL experiment log records? This cannot be undone.')) {
          clearAll();
          renderInto(appState);
        }
        return;
      }
      if (target.classList.contains('btn-log-view')) {
        var viewId = target.getAttribute('data-log-id');
        appState.logState.detailId = viewId;
        appState.logState.screen = 'detail';
        renderInto(appState);
        return;
      }
      if (target.classList.contains('btn-log-delete')) {
        var delId = target.getAttribute('data-log-id');
        del(delId);
        if (appState.logState.screen === 'detail') {
          appState.logState.screen = 'list';
          appState.logState.detailId = null;
        }
        renderInto(appState);
        return;
      }
    });
  }

  function renderInto(appState) {
    var workspace = document.getElementById('workspace-content');
    if (!workspace) return;
    attachListeners(appState);
    var screen = appState.logState.screen;
    if (screen === 'list') {
      workspace.innerHTML = renderList();
    } else if (screen === 'detail') {
      workspace.innerHTML = renderDetail(appState.logState.detailId);
    } else {
      workspace.innerHTML = renderMenu();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return {
    load: load,
    add: add,
    del: del,
    clearAll: clearAll,
    getById: getById,
    buildPracticalRecord: buildPracticalRecord,
    buildMysteryRecord: buildMysteryRecord,
    renderMenu: renderMenu,
    renderList: renderList,
    renderDetail: renderDetail,
    renderInto: renderInto,
    attachListeners: attachListeners
  };
})();

/* Register log screen with ChemSim */
ChemSim.registerScreen('log', function(appState) {
  if (!appState.logState) {
    appState.logState = { screen: 'menu', detailId: null };
  }
  var screen = appState.logState.screen;
  if (screen === 'list') {
    return ExpLog.renderList();
  } else if (screen === 'detail') {
    return ExpLog.renderDetail(appState.logState.detailId);
  }
  return ExpLog.renderMenu();
});
