ChemSim.registerScreen('home', function(appState) {
  var ico = function(inner) {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  };
  var IC = {
    home: ico('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>'),
    flask: ico('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 15h9"/>'),
    pba: ico('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8.5 9 1.5 1.5L12.5 8"/><path d="m8.5 15 1.5 1.5L12.5 14"/><path d="M15 9h2M15 15h2"/>'),
    mystery: ico('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 0 1 5 1c0 1.7-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>'),
    log: ico('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4"/><path d="M9 10h6M9 14h6"/>'),
    book: ico('<path d="M2.5 5.5A3.5 3.5 0 0 1 6 4h5v16H6a3.5 3.5 0 0 0-3.5 1.5z"/><path d="M21.5 5.5A3.5 3.5 0 0 0 18 4h-5v16h5a3.5 3.5 0 0 1 3.5 1.5z"/>'),
    play: ico('<circle cx="12" cy="12" r="9"/><polygon points="10 8.5 16 12 10 15.5" fill="currentColor" stroke="none"/>'),
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="m12.5 6 6 6-6 6"/></svg>',
    atom: '<svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="#2479e8" stroke-width="1.6"><ellipse cx="20" cy="20" rx="17" ry="7"/><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(120 20 20)"/><circle cx="20" cy="20" r="2.6" fill="#2479e8"/></svg>',
    atomLight: '<svg width="46" height="46" viewBox="0 0 40 40" fill="none" stroke="#7dc4ff" stroke-width="1.4"><ellipse cx="20" cy="20" rx="17" ry="7"/><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(120 20 20)"/><circle cx="20" cy="20" r="2.4" fill="#7dc4ff"/></svg>'
  };
  var sideItems = [
    ['home', 'Home', IC.home, true],
    ['experiment-select', 'Practical Lab', IC.flask, false],
    ['pba', 'PBA Practice', IC.pba, false],
    ['mystery', 'Mystery Lab', IC.mystery, false],
    ['log', 'Experiment Log', IC.log, false],
    ['revision', 'Learning & Revision', IC.book, false],
    ['demo', 'Demo Mode', IC.play, false]
  ];



  var HB_IC = {
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a6577" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2"/></svg>',
    bell: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d2f6e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
    chev: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d2f6e" stroke-width="2.6" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>',
    close: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };
  var hbNavList = [
    ['home', 'Home'], ['experiment-select', 'Practical Lab'], ['pba', 'PBA Practice'],
    ['mystery', 'Mystery Lab'], ['log', 'Experiment Log'], ['revision', 'Learning & Revision'],
    ['demo', 'Demo Mode']
  ];

  function hbTopbar() {
    var h = '<div class="home-topbar">';
    h += '<div class="hb-search">' + HB_IC.search +
      '<input id="hb-search-input" type="text" placeholder="Search experiments, topics..." autocomplete="off">' +
      '<div class="hb-results" id="hb-results" hidden></div></div>';
    h += '<button class="hb-icon-btn" id="hb-bell" aria-label="Notifications">' + HB_IC.bell + '<span class="hb-dot"></span></button>';
    h += '<button class="hb-student" id="hb-student"><span class="hb-avatar">' + HB_IC.user + '</span>Student' + HB_IC.chev + '</button>';
    h += '<div class="hb-menu" id="hb-student-menu" hidden>' +
      '<div class="hb-menu-head">Student</div>' +
      '<button data-screen="experiment-select">Practical Lab</button>' +
      '<button data-screen="pba">PBA Practice</button>' +
      '<button data-screen="log">Experiment Log</button>' +
      '<button data-screen="revision">Learning &amp; Revision</button>' +
      '<button id="hb-to-landing">Back to Landing</button>' +
      '</div>';
    h += '<div class="hb-note" id="hb-note" hidden><span>Welcome to ChemSim! Open <b>Practical Lab</b> to start experimenting.</span><button id="hb-note-close" aria-label="Dismiss">' + HB_IC.close + '</button></div>';
    h += '</div>';
    return h;
  }

  function hbWire(scope) {
    var results = document.getElementById('hb-results');
    var searchEl = document.getElementById('hb-search-input');

    function goScreen(s) {
      if (results) { results.hidden = true; }
      if (searchEl) { searchEl.value = ''; }
      ChemSim.navigateTo(s);
    }

    function hbMatch(hay, q) {
      hay = String(hay || '').toLowerCase();
      var words = q.split(/\s+/);
      for (var w = 0; w < words.length; w++) {
        if (words[w] && hay.indexOf(words[w]) === -1) return false;
      }
      return true;
    }
    function goExp(id) {
      if (results) { results.hidden = true; }
      if (searchEl) { searchEl.value = ''; }
      ChemSim.navigateTo('experiment-select', { experimentId: id });
    }

    if (searchEl && results) {
      searchEl.addEventListener('input', function() {
        var q = searchEl.value.trim().toLowerCase();
        if (!q) { results.hidden = true; results.innerHTML = ''; return; }
        var h = '';
        var hits = 0;
        for (var i = 0; i < hbNavList.length; i++) {
          if (hbMatch(hbNavList[i][1], q)) {
            h += '<button data-screen="' + hbNavList[i][0] + '">' + hbNavList[i][1] + '</button>';
            hits++;
          }
        }
        if (typeof EXPERIMENTS !== 'undefined' && EXPERIMENTS && EXPERIMENTS.length) {
          var shown = 0;
          for (var e = 0; e < EXPERIMENTS.length && shown < 6; e++) {
            var ex = EXPERIMENTS[e];
            var exHay = (ex.id || '') + ' ' + (ex.title || '') + ' ' + (ex.section || '');
            if (hbMatch(exHay, q)) {
              h += '<button data-exp="' + ex.id + '"><span class="hb-res-tag">Experiment</span>' + ex.title + '</button>';
              hits++; shown++;
            }
          }
        }
        if (!hits) h = '<div class="hb-nores">No matches &mdash; press Enter for Practical Lab</div>';
        results.innerHTML = h;
        results.hidden = false;
      });
      searchEl.addEventListener('keydown', function(ev) {
        if (ev.keyCode === 13) {
          var first = results.querySelector('[data-screen],[data-exp]');
          if (!first) goScreen('experiment-select');
          else if (first.getAttribute('data-exp')) goExp(first.getAttribute('data-exp'));
          else goScreen(first.getAttribute('data-screen'));
        }
      });
      results.addEventListener('click', function(ev) {
        var t = ev.target;
        while (t && t !== results && (!t.getAttribute || (!t.getAttribute('data-screen') && !t.getAttribute('data-exp')))) t = t.parentNode;
        if (!t || t === results || !t.getAttribute) return;
        if (t.getAttribute('data-exp')) goExp(t.getAttribute('data-exp'));
        else if (t.getAttribute('data-screen')) goScreen(t.getAttribute('data-screen'));
      });
    }

    var bell = document.getElementById('hb-bell');
    var note = document.getElementById('hb-note');
    if (bell && note) {
      bell.addEventListener('click', function() { note.hidden = !note.hidden; });
    }
    var noteClose = document.getElementById('hb-note-close');
    if (noteClose && note) {
      noteClose.addEventListener('click', function() { note.hidden = true; });
    }

    var student = document.getElementById('hb-student');
    var menu = document.getElementById('hb-student-menu');
    if (student && menu) {
      student.addEventListener('click', function() { menu.hidden = !menu.hidden; });
    }
    if (menu) {
      menu.addEventListener('click', function(ev) {
        var t = ev.target;
        while (t && t !== menu && (!t.getAttribute || !t.getAttribute('data-screen'))) t = t.parentNode;
        if (t && t.getAttribute && t.getAttribute('data-screen')) goScreen(t.getAttribute('data-screen'));
      });
    }
    var toLanding = document.getElementById('hb-to-landing');
    if (toLanding) {
      toLanding.addEventListener('click', function() {
        if (window.ChemSimLanding && ChemSimLanding.showLanding) ChemSimLanding.showLanding();
        else if (window.ChemSimLanding && ChemSimLanding.show) ChemSimLanding.show();
      });
    }
  }

  var assetBase = location.pathname.indexOf('/frontend/') !== -1 ? '' : 'frontend/';
  var html = '<div class="home-screen"><div class="home-shell">';

  /* Navy sidebar navigation */
  html += '<aside class="home-side">';
  html += '<div class="hs-brand"><span class="hs-brand-ico">' + IC.flask + '</span><span><b>Chem<span class="hs-brand-sim">Sim</span></b><small>Your Virtual Chemistry Lab</small></span></div>';
  html += '<nav class="hs-nav">';
  for (var i = 0; i < sideItems.length; i++) {
    html += '<button class="hs-link' + (sideItems[i][3] ? ' active' : '') + '" data-action="navigate" data-screen="' + sideItems[i][0] + '">' + sideItems[i][2] + '<span>' + sideItems[i][1] + '</span></button>';
  }
  html += '</nav>';
  html += '<div class="hs-deco">' + IC.atomLight + '<p>Better Prepared<br>for the Real Lab</p></div>';
  html += '</aside>';

  /* Main area */
  html += '<div class="home-main">';
  html += hbTopbar();

  /* Welcome banner */
  html += '<section class="home-hero2">';
  html += '<div class="hero-copy">';
  html += '<div class="hero-eyebrow">&mdash; WELCOME TO CHEMSIM &mdash;</div>';
  html += '<h1 class="hero-title">Explore. Experiment.<br>Understand.</h1>';
  html += '<p class="hero-text">A virtual chemistry lab designed to help you build skills, gain confidence and be ready for the real lab.</p>';
  html += '</div>';
  html += '<div class="hero-art" aria-hidden="true">';
  html += '<img class="hero-photo" src="' + assetBase + 'assets/home-hero.png?v=pic1" alt="Chemistry lab glassware">';
  html += '<svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg">';
  html += '<rect x="96" y="18" width="66" height="118" rx="10" fill="#eaf3ff" stroke="#b9d6f2" stroke-width="3"/>';
  html += '<rect x="104" y="44" width="50" height="84" rx="7" fill="#2479e8" opacity=".75"/>';
  html += '<rect x="112" y="60" width="34" height="52" rx="5" fill="#1a55b8" opacity=".6"/>';
  html += '<path d="M28 66h26v10l14 42a6 6 0 0 1-5.6 8H19.6A6 6 0 0 1 14 118l14-42z" fill="#eaf3ff" stroke="#0a2a66" stroke-width="3"/>';
  html += '<path d="M24 96h34l8 24H16z" fill="#2b8fff" opacity=".8"/>';
  html += '<path d="M25 66h28" stroke="#0a2a66" stroke-width="3"/>';
  html += '<g stroke="#12428f" stroke-width="3" fill="none">';
  html += '<path d="M186 60h14v46a7 7 0 0 1-14 0z"/><path d="M214 60h14v46a7 7 0 0 1-14 0z"/><path d="M242 60h14v46a7 7 0 0 1-14 0z"/>';
  html += '</g>';
  html += '<path d="M186.5 84h13l-1 22h-11z" fill="#2479e8" opacity=".7" stroke="none"/>';
  html += '<path d="M214.5 90h13l-1 16h-11z" fill="#2b8fff" opacity=".7" stroke="none"/>';
  html += '<path d="M242.5 80h13l-1 26h-11z" fill="#1a55b8" opacity=".7" stroke="none"/>';
  html += '<path d="M184 60h18M212 60h18M240 60h18" stroke="#0a2a66" stroke-width="3"/>';
  html += '</svg>';
  html += '</div>';
  html += '</section>';

  /* Module cards */
  html += '<div class="home-modules">';
  html += '<button class="module-card" data-action="navigate" data-screen="experiment-select"><div class="module-icon">' + IC.flask + '</div><h3>Practical Lab</h3><p>Perform simulated experiments and observe real results.</p><span class="card-arrow">' + IC.arrow + '</span></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="pba"><div class="module-icon">' + IC.pba + '</div><h3>PBA Practice</h3><p>Get ready for your PBA assessments with realistic questions.</p><span class="card-arrow">' + IC.arrow + '</span></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="mystery"><div class="module-icon">' + IC.mystery + '</div><h3>Mystery Lab</h3><p>Solve clues, find the right experiment and discover more.</p><span class="card-arrow">' + IC.arrow + '</span></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="log"><div class="module-icon">' + IC.log + '</div><h3>Experiment Log</h3><p>Record your observations, results and conclusions in one place.</p><span class="card-arrow">' + IC.arrow + '</span></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="revision"><div class="module-icon">' + IC.book + '</div><h3>Learning &amp; Revision</h3><p>Explore key concepts, review notes and strengthen your understanding.</p><span class="card-arrow">' + IC.arrow + '</span></button>';
  html += '<button class="module-card" data-action="navigate" data-screen="demo"><div class="module-icon">' + IC.play + '</div><h3>Demo Mode</h3><p>Watch step-by-step demonstrations before you try it yourself.</p><span class="card-arrow">' + IC.arrow + '</span></button>';
  html += '</div>';

  /* Footer tagline */
  html += '<div class="home-footer2">';
  html += '<div class="hf-rule"><span class="hf-atom">' + IC.atom + '</span></div>';
  html += '<p class="hf-tag">Small Steps&nbsp;&nbsp;&rarr;&nbsp;&nbsp;Big Discoveries</p>';
  html += '<p class="sim-note">ChemSim is an educational simulation. Simulated values are not real laboratory measurements.</p>';
  html += '</div>';

  html += '</div>'; /* home-main */
  html += '</div>'; /* home-shell */
  html += '</div>';

  setTimeout(function() {
    var scope = document.querySelector('.home-shell');
    if (!scope) return;
    var navs = scope.querySelectorAll('[data-screen]');
    for (var n = 0; n < navs.length; n++) {
      (function(el) {
        el.addEventListener('click', function() {
          ChemSim.navigateTo(el.getAttribute('data-screen'));
        });
      })(navs[n]);
    }
    hbWire(scope);
  }, 0);

  return html;
});
