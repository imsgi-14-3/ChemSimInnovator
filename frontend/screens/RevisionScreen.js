ChemSim.registerScreen('revision', function(appState) {
  var html = '<div class="revision-screen">';
  html += '<div class="module-header"><h2>Learning & Revision</h2><p>Review experiment procedures, apparatus, and concepts.</p></div>';
  var experiments = ApiClient.getExperiments();
  html += '<div class="revision-list">';
  for (var i = 0; i < experiments.length; i++) {
    var exp = experiments[i];
    html += '<div class="card revision-card"><div class="card-body">';
    html += '<h4>' + ChemSim.escapeHtml(exp.id) + ' — ' + ChemSim.escapeHtml(exp.title) + '</h4>';
    html += '<p class="text-secondary">' + (exp.section.charAt(0).toUpperCase() + exp.section.slice(1)) + ' Practical</p>';
    html += '<p>' + ChemSim.escapeHtml(exp.objective) + '</p>';
    html += '<button class="btn btn-primary btn-sm" data-rev-exp="' + exp.id + '">Start Practical</button>';
    html += '</div></div>';
  }
  html += '</div></div>';

  setTimeout(function() {
    document.querySelectorAll('[data-rev-exp]').forEach(function(el) {
      el.addEventListener('click', function() {
        ChemSim.startExperiment(el.getAttribute('data-rev-exp'));
      });
    });
  }, 0);

  return html;
});
