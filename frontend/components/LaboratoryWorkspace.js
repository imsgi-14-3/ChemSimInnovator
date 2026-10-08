var LaboratoryWorkspace = {
  render: function(content) {
    return '<div class="lab-workspace"><div class="lab-bench">' + content + '</div></div>';
  },
  renderCanvas: function(w, h) {
    w = w || 550;
    h = h || 640;
    return '<div class="canvas-container"><canvas id="lab-canvas" width="' + w + '" height="' + h + '"></canvas></div>';
  }
};
