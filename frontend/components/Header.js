var Header = {
  render: function(appState) {
    var html = '';
    if (appState.experiment) {
      html += '<span class="header-experiment-title">' + ChemSim.escapeHtml(appState.experiment.title) + '</span>';
      html += '<span class="header-experiment-id">' + ChemSim.escapeHtml(appState.experimentId) + '</span>';
    }
    return html;
  }
};
