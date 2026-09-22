var LaboratoryWorkspace = {
  render: function(content) {
    return '<div class="lab-workspace"><div class="lab-bench">' + content + '</div></div>';
  },
  renderCanvas: function() {
    return '<div class="canvas-container"><canvas id="lab-canvas" width="550" height="620"></canvas></div>';
  }
};
