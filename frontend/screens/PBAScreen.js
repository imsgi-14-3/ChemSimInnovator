ChemSim.registerScreen('pba', function(appState) {
  var html = '<div class="pba-screen">';
  html += '<div class="module-header"><h2>PBA Practice</h2><p>Practice practical assessment skills for the FBISE SSC Chemistry PBA.</p></div>';
  html += '<div class="pba-info">';
  html += '<div class="card"><div class="card-body"><h3>PBA Structure</h3>';
  html += '<p><strong>Section A:</strong> 2 Major questions x 6 marks = 12 marks (60%)</p>';
  html += '<p><strong>Section B:</strong> 2 Minor questions x 4 marks = 8 marks (40%)</p>';
  html += '<p><strong>Total:</strong> 20 marks | 2 hours</p>';
  html += '</div></div>';
  html += '<div class="card" style="margin-top:1rem;"><div class="card-body"><h3>Coming Soon</h3><p>PBA practice questions will be available here.</p></div></div>';
  html += '</div></div>';
  return html;
});
