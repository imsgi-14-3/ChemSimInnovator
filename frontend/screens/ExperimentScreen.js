var ExperimentScreen = {
  renderStage: function(exp, stage, state, appState) {
    var id = exp.id;
    var html = '<div class="experiment-screen">';
    
    switch(stage) {
      case 'select':
        html += ExperimentScreen.renderSelectStage(exp, state);
        break;
      case 'objective':
        html += ExperimentScreen.renderObjectiveStage(exp, state);
        break;
      case 'apparatus':
        html += ExperimentScreen.renderApparatusStage(exp, state);
        break;
      default:
        if (id === 'A2' || id === 'A3') {
          html += ChromatographyRenderer.renderStage(stage, exp, state, appState);
        } else if (id === 'A1') {
          html += DistillationRenderer.renderStage(stage, exp, state, appState);
        } else if (id === 'A4') {
          html += TitrationRenderer.renderStage(stage, exp, state, appState);
        } else if (id === 'A5') {
          html += GasRenderer.renderStage(stage, exp, state, appState);
        } else {
          html += MinorExperimentRenderer.renderStage(stage, exp, state, appState);
        }
        break;
    }
    
    html += '</div>';
    return html;
  },
  
  renderSelectStage: function(exp, state) {
    return '<div class="stage-select"><h2>Select a Practical</h2><p>Choose an experiment from the sidebar to begin.</p></div>';
  },
  
  renderObjectiveStage: function(exp, state) {
    var html = '<div class="stage-objective">';
    html += '<div class="stage-card"><h3 class="stage-card-title">Objective</h3>';
    html += '<div class="detail-row"><span class="detail-label">Practical</span><span class="detail-value">' + ChemSim.escapeHtml(exp.title) + '</span></div>';
    html += '<div class="detail-row"><span class="detail-label">Section</span><span class="detail-value">' + (exp.section.charAt(0).toUpperCase() + exp.section.slice(1)) + ' Practical</span></div>';
    html += '<div class="detail-row"><span class="detail-label">SLO</span><span class="detail-value">' + exp.slos.map(function(s) { return '<span class="chip chip-info">' + ChemSim.escapeHtml(s) + '</span>'; }).join(' ') + '</span></div>';
    html += '<div class="detail-row" style="margin-top:1rem;"><span class="detail-label">Objective</span><span class="detail-value">' + ChemSim.escapeHtml(exp.objective) + '</span></div>';
    html += '</div></div>';
    return html;
  },
  
  renderApparatusStage: function(exp, state) {
    var html = '<div class="stage-apparatus">';
    html += '<div class="stage-card"><h3 class="stage-card-title">Apparatus & Materials</h3>';
    html += '<h4 class="subsection-title">Apparatus</h4>';
    html += '<div class="equipment-list">';
    for (var i = 0; i < exp.apparatus.length; i++) {
      var a = exp.apparatus[i];
      html += '<div class="equipment-item"><span class="equipment-name">' + ChemSim.escapeHtml(a.name) + '</span><span class="equipment-desc">' + ChemSim.escapeHtml(a.desc) + '</span></div>';
    }
    html += '</div>';
    html += '<h4 class="subsection-title">Materials</h4>';
    html += '<div class="equipment-list">';
    for (var j = 0; j < exp.materials.length; j++) {
      var m = exp.materials[j];
      html += '<div class="equipment-item"><span class="equipment-name">' + ChemSim.escapeHtml(m.name) + '</span><span class="chip chip-sm">' + ChemSim.escapeHtml(m.type) + '</span></div>';
    }
    html += '</div></div></div>';
    return html;
  }
};
