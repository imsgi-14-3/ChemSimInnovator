ChemSim.registerScreen('log', function(appState) {
  var entries = [];
  try { entries = JSON.parse(localStorage.getItem('chemsim_log') || '[]'); } catch(e) { entries = []; }
  var html = '<div class="log-screen">';
  html += '<div class="module-header"><h2>Experiment Log</h2><p>View and manage your experiment records.</p></div>';
  if (entries.length === 0) {
    html += '<div class="card"><div class="card-body"><p>No experiment records yet. Complete an experiment to see it here.</p></div></div>';
  } else {
    html += '<div class="log-entries">';
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      html += '<div class="card log-entry"><div class="card-body">';
      html += '<h4>' + ChemSim.escapeHtml(e.title || e.experimentId) + '</h4>';
      html += '<p class="text-secondary">' + (e.date ? new Date(e.date).toLocaleDateString() : '') + '</p>';
      if (e.conclusion) html += '<p>' + ChemSim.escapeHtml(e.conclusion) + '</p>';
      html += '</div></div>';
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
});
