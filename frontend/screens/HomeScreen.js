ChemSim.registerScreen('home', function(appState) {
  var html = '<div class="home-screen">';
  html += '<div class="home-hero">';
  html += '<h1 class="home-title">ChemSim</h1>';
  html += '<p class="home-subtitle">Interactive Virtual Chemistry Laboratory</p>';
  html += '<p class="home-description">Practice FBISE SSC Chemistry experiments in a virtual laboratory environment.</p>';
  html += '</div>';
  html += '<div class="home-modules">';
  html += '<button class="module-card" data-action="navigate" data-screen="experiment-select"><div class="module-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3h6v11l-3 3-3-3V3z"/><path d="M6 21h12"/></svg></div><h3>Practical Lab</h3><p>Perform virtual experiments with realistic equipment and procedures.</p></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="pba"><div class="module-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><h3>PBA Practice</h3><p>Practice practical assessment skills for the FBISE PBA.</p></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="mystery"><div class="module-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div><h3>Mystery Lab</h3><p>Investigate unknown substances using chemical tests.</p></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="log"><div class="module-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><h3>Experiment Log</h3><p>View and manage your experiment records.</p></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="revision"><div class="module-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div><h3>Learning & Revision</h3><p>Review experiment procedures, apparatus, and concepts.</p></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="demo"><div class="module-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg></div><h3>Demo Mode</h3><p>Watch guided demonstrations of experiments.</p></button>';
  html += '</div>';
  html += '<div class="home-footer"><p class="sim-note">ChemSim is an educational simulation. Simulated values are not real laboratory measurements.</p></div>';
  html += '</div>';
  
  setTimeout(function() {
    document.querySelectorAll('.module-card[data-screen]').forEach(function(el) {
      el.addEventListener('click', function() {
        ChemSim.navigateTo(el.getAttribute('data-screen'));
      });
    });
  }, 0);
  
  return html;
});
