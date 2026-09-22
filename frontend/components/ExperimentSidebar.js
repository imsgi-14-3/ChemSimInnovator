var ExperimentSidebar = {
  render: function(experiments) {
    var html = '<div class="experiment-sidebar">';
    var major = experiments.filter(function(e) { return e.section === 'major'; });
    var minor = experiments.filter(function(e) { return e.section !== 'major'; });
    html += '<div class="experiment-group"><h4 class="experiment-group-title">Major Practicals</h4>';
    for (var i = 0; i < major.length; i++) {
      html += '<button class="experiment-item" data-exp-id="' + major[i].id + '"><span class="experiment-item-id">' + major[i].id + '</span><span class="experiment-item-title">' + ChemSim.escapeHtml(major[i].title.substring(0, 45)) + '</span></button>';
    }
    html += '</div>';
    html += '<div class="experiment-group"><h4 class="experiment-group-title">Minor Practicals</h4>';
    for (var j = 0; j < minor.length; j++) {
      html += '<button class="experiment-item" data-exp-id="' + minor[j].id + '"><span class="experiment-item-id">' + minor[j].id + '</span><span class="experiment-item-title">' + ChemSim.escapeHtml(minor[j].title.substring(0, 45)) + '</span></button>';
    }
    html += '</div></div>';
    return html;
  }
};
