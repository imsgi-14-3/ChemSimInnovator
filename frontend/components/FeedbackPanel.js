var FeedbackPanel = {
  render: function(message, type) {
    if (!message) return '';
    type = type || 'info';
    return '<div class="feedback feedback-' + type + '">' + ChemSim.escapeHtml(message) + '</div>';
  }
};
