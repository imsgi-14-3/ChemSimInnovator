var ToolsPanel = {
  render: function(exp) {
    if (!exp) return '';
    var html = '<div class="tools-panel">';
    html += '<h3 class="panel-title">Tools & Materials</h3>';
    html += '<h4 class="panel-subtitle">Apparatus</h4>';
    html += '<div class="tools-list">';
    for (var i = 0; i < exp.apparatus.length; i++) {
      var a = exp.apparatus[i];
      html += '<div class="tool-item"><span class="tool-name">' + ChemSim.escapeHtml(a.name) + '</span><span class="tool-desc">' + ChemSim.escapeHtml(a.desc) + '</span></div>';
    }
    html += '</div>';
    html += '<h4 class="panel-subtitle">Materials</h4>';
    html += '<div class="tools-list">';
    for (var j = 0; j < exp.materials.length; j++) {
      var m = exp.materials[j];
      html += '<div class="tool-item"><span class="tool-name">' + ChemSim.escapeHtml(m.name) + '</span><span class="chip chip-sm">' + ChemSim.escapeHtml(m.type) + '</span></div>';
    }
    html += '</div></div>';
    return html;
  }
};
