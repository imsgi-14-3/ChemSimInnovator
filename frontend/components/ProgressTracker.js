var ProgressTracker = {
  render: function(stages, currentIndex) {
    var html = '<div class="progress-tracker">';
    for (var i = 0; i < stages.length; i++) {
      var cls = 'progress-step';
      if (i < currentIndex) cls += ' completed';
      else if (i === currentIndex) cls += ' current';
      else cls += ' locked';
      var label = stages[i].replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      html += '<div class="' + cls + '"><span class="step-dot"></span><span class="step-label">' + label + '</span></div>';
    }
    html += '</div>';
    return html;
  }
};
