/* ================================================================
   ChemSim — Landing page (front page shown before the app)
   Vanilla JS, ES5. Injects #landing markup, wires every button,
   registers the service worker (app-like install / offline).
   ================================================================ */

var ChemSimLanding = (function() {
  'use strict';

  var SWR = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';

  var ICON = {
    home: SWR + '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    flask: SWR + '<path d="M9 3h6"/><path d="M10 3v6.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.5V3"/><path d="M7.5 15h9"/></svg>',
    atom: SWR + '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.4"/><ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(120 12 12)"/></svg>',
    book: SWR + '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    shield: SWR + '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11.5 14.5 16 9.5"/></svg>',
    play: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 21 12 6 21 6 3"/></svg>',
    arrow: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>'
  };

  var LOGO_BADGE =
    '<svg width="36" height="36" viewBox="0 0 48 48" fill="none">' +
    '<path d="M19 6h10" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M21 6v11.5L11.5 35a4.6 4.6 0 0 0 4 6.9h17a4.6 4.6 0 0 0 4-6.9L27 17.5V6" fill="#ffffff" stroke="#15803d" stroke-width="3.4" stroke-linejoin="round"/>' +
    '<path d="M15.8 30h16.4l3.4 6.2a3.2 3.2 0 0 1-2.8 4.7H15.2a3.2 3.2 0 0 1-2.8-4.7z" fill="#22c55e"/>' +
    '<path d="M36 4c-4.6.4-7.6 3-8.4 7 4.6-.4 7.7-2.9 8.4-7z" fill="#16a34a"/>' +
    '<circle cx="21" cy="34" r="1.6" fill="#ffffff" opacity=".85"/>' +
    '<circle cx="26.5" cy="37" r="1.2" fill="#ffffff" opacity=".7"/>' +
    '</svg>';

  var HEX1 = '<svg width="150" height="170" viewBox="0 0 100 112" fill="none"><polygon points="50,3 93,28 93,80 50,107 7,80 7,28" stroke="rgba(34,197,94,.30)" stroke-width="3"/></svg>';
  var HEX2 = '<svg width="96" height="108" viewBox="0 0 100 112" fill="none"><polygon points="50,3 93,28 93,80 50,107 7,80 7,28" stroke="rgba(34,197,94,.22)" stroke-width="3.5"/></svg>';
  var LEAF = '<svg width="86" height="60" viewBox="0 0 86 60" fill="none"><path d="M4 56C10 24 38 4 82 4c0 36-26 56-62 54A96 96 0 0 1 4 56z" fill="url(#lgLeafG)"/><path d="M10 54C24 34 48 16 76 10" stroke="#0f7a37" stroke-width="2.4" stroke-linecap="round"/><defs><linearGradient id="lgLeafG" x1="4" y1="56" x2="82" y2="4" gradientUnits="userSpaceOnUse"><stop stop-color="#16a34a"/><stop offset="1" stop-color="#5ee88b"/></linearGradient></defs></svg>';

  function molecule(bx, by, s) {
    var pts = [[0, 0], [34, -22], [68, -4], [34, 26], [86, -34]];
    var links = [[0, 1], [1, 2], [1, 3], [2, 4]];
    var out = '<g transform="translate(' + bx + ',' + by + ') scale(' + s + ')">';
    for (var i = 0; i < links.length; i++) {
      var a = pts[links[i][0]], b = pts[links[i][1]];
      out += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#9aa4ad" stroke-width="6" stroke-linecap="round"/>';
    }
    for (var j = 0; j < pts.length; j++) {
      out += '<circle cx="' + pts[j][0] + '" cy="' + pts[j][1] + '" r="13" fill="url(#lgBallG)"/>';
      out += '<circle cx="' + (pts[j][0] - 4) + '" cy="' + (pts[j][1] - 4.5) + '" r="4" fill="#ffffff" opacity=".75"/>';
    }
    return out + '</g>';
  }

  function tubeRack() {
    var out = '<g transform="translate(600,248)">';
    out += '<rect x="-6" y="118" width="176" height="16" rx="6" fill="#cfd8dc"/>';
    out += '<rect x="-6" y="118" width="176" height="6" rx="3" fill="#eceff1"/>';
    out += '<rect x="6" y="8" width="12" height="130" rx="5" fill="#b0bec5"/>';
    out += '<rect x="148" y="8" width="12" height="130" rx="5" fill="#b0bec5"/>';
    for (var t = 0; t < 3; t++) {
      var x = 34 + t * 44;
      out += '<path d="M' + x + ' 0h30v96a15 15 0 0 1-30 0z" fill="rgba(255,255,255,.55)" stroke="#90a4ae" stroke-width="3"/>';
      out += '<path d="M' + (x + 2) + ' ' + (46 + t * 6) + 'h26v' + (50 - t * 6) + 'a13 13 0 0 1-26 0z" fill="url(#lgLiqG)" opacity=".92"/>';
      out += '<ellipse cx="' + (x + 15) + '" cy="' + (46 + t * 6) + '" rx="13" ry="4" fill="#a3e635" opacity=".85"/>';
      out += '<rect x="' + (x + 5) + '" y="8" width="5" height="30" rx="2.5" fill="#ffffff" opacity=".7"/>';
    }
    out += '<rect x="-6" y="148" width="176" height="10" rx="5" fill="#90a4ae"/>';
    return out + '</g>';
  }

  function illustration() {
    var s = '';
    s += '<svg class="lg-illu" viewBox="0 0 860 560" xmlns="http://www.w3.org/2000/svg">';
    s += '<defs>';
    s += '<linearGradient id="lgLiqG" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#7dff9b"/><stop offset=".5" stop-color="#31d35f"/><stop offset="1" stop-color="#12913f"/></linearGradient>';
    s += '<radialGradient id="lgBallG" cx=".35" cy=".3" r=".8"><stop stop-color="#6ff592"/><stop offset=".55" stop-color="#22c55e"/><stop offset="1" stop-color="#0e7a37"/></radialGradient>';
    s += '<linearGradient id="lgGlassG" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#ffffff" stop-opacity=".9"/><stop offset=".5" stop-color="#e3f2fd" stop-opacity=".55"/><stop offset="1" stop-color="#ffffff" stop-opacity=".85"/></linearGradient>';
    s += '<radialGradient id="lgGlowG" cx=".5" cy=".5" r=".5"><stop stop-color="#c9ffd8"/><stop offset="1" stop-color="#c9ffd8" stop-opacity="0"/></radialGradient>';
    s += '</defs>';
    s += '<g opacity=".8">';
    s += '<g transform="translate(30,120)">' + HEX2 + '</g>';
    s += '<g transform="translate(250,10)">' + HEX1 + '</g>';
    s += '<g transform="translate(150,330)">' + HEX2 + '</g>';
    s += '</g>';
    s += '<ellipse cx="440" cy="500" rx="330" ry="42" fill="url(#lgGlowG)"/>';
    s += molecule(120, 60, 1.15);
    s += molecule(660, 210, 0.95);
    /* round-bottom flask (back right) */
    s += '<g transform="translate(455,150)">';
    s += '<path d="M62 0h44v58l52 108a72 72 0 1 1-148 0L62 58V0z" fill="url(#lgGlassG)" stroke="#8fa8bc" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M25 168a66 66 0 0 0 130 0z" fill="url(#lgLiqG)" opacity=".9"/>';
    s += '<ellipse cx="90" cy="168" rx="65" ry="12" fill="#a3e635" opacity=".8"/>';
    s += '<rect x="66" y="6" width="9" height="46" rx="4.5" fill="#ffffff" opacity=".8"/>';
    s += '</g>';
    /* conical flask (front centre) */
    s += '<g transform="translate(210,120)">';
    s += '<path d="M66 6h68v112l84 190a44 44 0 0 1-40 62H112a44 44 0 0 1-40-62l84-190V6z" fill="url(#lgGlassG)" stroke="#7f97ac" stroke-width="6" stroke-linejoin="round"/>';
    s += '<path d="M84 208h112l48 106a30 30 0 0 1-27 44H83a30 30 0 0 1-27-44z" fill="url(#lgLiqG)"/>';
    s += '<ellipse cx="140" cy="210" rx="56" ry="11" fill="#b7ff69" opacity=".95"/>';
    s += '<rect x="72" y="14" width="12" height="88" rx="6" fill="#ffffff" opacity=".85"/>';
    s += '<path d="M66 6h68" stroke="#5f768a" stroke-width="7" stroke-linecap="round"/>';
    s += '<circle cx="118" cy="270" r="9" fill="#ffffff" opacity=".55"/>';
    s += '<circle cx="152" cy="300" r="7" fill="#ffffff" opacity=".5"/>';
    s += '<circle cx="128" cy="330" r="10" fill="#ffffff" opacity=".42"/>';
    s += '<circle cx="164" cy="252" r="6" fill="#ffffff" opacity=".55"/>';
    s += '</g>';
    s += tubeRack();
    /* leaves */
    s += '<g transform="translate(40,330) rotate(-18)">' + LEAF + '</g>';
    s += '<g transform="translate(330,40) rotate(24)">' + LEAF + '</g>';
    s += '<g transform="translate(690,410) rotate(160)">' + LEAF + '</g>';
    s += '<g transform="translate(560,60) rotate(-30)">' + LEAF + '</g>';
    /* rising vapour */
    s += '<g stroke="#6ee7a0" stroke-width="7" stroke-linecap="round" fill="none" opacity=".7">';
    s += '<path d="M300 118c-14-16 12-26 0-44"/>';
    s += '<path d="M330 100c-12-14 10-22 0-38"/>';
    s += '<path d="M508 132c-12-14 10-22 0-38"/>';
    s += '</g>';
    s += '</svg>';
    return s;
  }

  function wave() {
    return '<div class="lg-wave">' +
      '<svg viewBox="0 0 1600 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M0 70C260 10 520 0 800 40s540 110 800 60v50H0z" fill="#bbf0cb"/>' +
      '<path d="M0 100C300 40 560 40 840 78s500 72 760 34v38H0z" fill="#8ce6a9"/>' +
      '<path d="M0 128C320 86 600 92 880 116s460 34 720 10v24H0z" fill="#16a34a"/>' +
      '</svg></div>';
  }

  function card(id, icon, title, text) {
    return '<button class="lg-card" data-lg="' + id + '">' +
      '<span class="lg-card-icon">' + icon + '</span>' +
      '<h3>' + title + '</h3>' +
      '<p>' + text + '</p>' +
      '<span class="lg-card-rule"></span>' +
      '</button>';
  }

  function markup() {
    var h = '';
    h += '<div class="lg-hex" style="left:-40px;top:120px;">' + HEX1 + '</div>';
    h += '<div class="lg-hex" style="right:44%;top:16px;">' + HEX1 + '</div>';
    h += '<div class="lg-hex" style="left:36%;bottom:24%;">' + HEX2 + '</div>';
    h += '<div class="lg-leafbg" style="left:-18px;top:-10px;transform:rotate(24deg);">' + LEAF + '</div>';
    h += '<div class="lg-leafbg" style="right:-14px;bottom:34%;">' + LEAF + '</div>';
    h += '<div class="lg-wrap">';

    h += '<header class="lg-nav">';
    h += '<a class="lg-logo" href="#" data-lg="home">';
    h += '<span class="lg-logo-badge">' + LOGO_BADGE + '</span>';
    h += '<span class="lg-logo-text"><b>Chem<span>Sim</span></b><small>VIRTUAL CHEMISTRY LAB</small></span>';
    h += '</a>';
    h += '<span class="lg-nav-div"></span>';
    h += '<nav class="lg-links">';
    h += '<button class="lg-link lg-link--active" data-lg="home">' + ICON.home + '<span>Home</span></button>';
    h += '<button class="lg-link" data-lg="experiments">' + ICON.flask + '<span>Experiments</span></button>';
    h += '<button class="lg-link" data-lg="about">' + ICON.atom + '<span>About</span></button>';
    h += '<button class="lg-link" data-lg="learn">' + ICON.book + '<span>Learn</span></button>';
    h += '</nav>';
    h += '<button class="lg-cta" data-lg="start"><span class="lg-cta-play">' + ICON.play + '</span>Get Started</button>';
    h += '</header>';

    h += '<section class="lg-hero">';
    h += '<div class="lg-hero-left">';
    h += '<div class="lg-eyebrow">' + ICON.atom.replace('width="17" height="17"', 'width="18" height="18"') + 'YOUR DIGITAL CHEMISTRY LAB</div>';
    h += '<span class="lg-title">Welcome to<br>Chem<span>Sim</span></span>';
    h += '<div class="lg-underline"></div>';
    h += '<p class="lg-lead">Explore, experiment and discover the fascinating world of chemistry through an interactive virtual laboratory.</p>';
    h += '<div class="lg-enter-row"><button class="lg-enter" data-lg="start"><span class="lg-enter-play">' + ICON.play + '</span>Enter Virtual Lab<span class="lg-enter-arrow">' + ICON.arrow + '</span></button>';
    h += '<span class="lg-sparks"><i></i><i></i><i></i></span></div>';
    h += '</div>';
    h += '<div class="lg-hero-right">';
    h += '<div class="lg-slogan">Think. Experiment.<br>Discover.</div>';
    h += illustration();
    h += '</div>';
    h += '</section>';

    h += '<section class="lg-features">';
    h += card('experiments', ICON.flask, 'Virtual Experiments', 'Perform chemical experiments safely and easily.');
    h += card('experiments', ICON.atom, 'Chemical Reactions', 'Explore reactions and understand the science.');
    h += card('learn', ICON.book, 'Learn &amp; Grow', 'Build your knowledge with interactive learning.');
    h += card('about', ICON.shield, 'Safe &amp; Eco-Friendly', 'No real chemicals, no harm to environment.');
    h += '</section>';

    h += '<section class="lg-about" id="lg-about">';
    h += '<h3>About ChemSim</h3>';
    h += '<p>ChemSim is an interactive virtual chemistry laboratory for FBISE SSC students. Practise prescribed practicals, PBA assessment skills, Mystery Lab investigations and revision — entirely on screen. All values shown are clearly labelled simulated educational values, not real laboratory measurements.</p>';
    h += '</section>';

    h += '</div>';
    h += wave();
    return h;
  }

  function closeLanding(screen) {
    var el = document.getElementById('landing');
    if (!el) return;
    el.classList.add('lg-hiding');
    document.body.style.overflow = '';
    window.setTimeout(function() {
      if (el && el.parentNode) el.parentNode.removeChild(el);
      try {
        if (window.ChemSim && screen) ChemSim.navigateTo(screen);
      } catch (e) { /* app still usable without landing */ }
    }, 300);
  }

  function scrollToAbout() {
    var target = document.getElementById('lg-about');
    var el = document.getElementById('landing');
    if (target && el) el.scrollTo({ top: target.offsetTop - 16, behavior: 'smooth' });
  }

  function wire(el) {
    var nodes = el.querySelectorAll('[data-lg]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('click', function(ev) {
        ev.preventDefault();
        var action = this.getAttribute('data-lg');
        if (action === 'about') scrollToAbout();
        else if (action === 'experiments') closeLanding('experiment-select');
        else if (action === 'learn') closeLanding('revision');
        else closeLanding('home');
      });
    }
  }

  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
    var isSub = /\/frontend\//.test(location.pathname);
    var url = isSub ? '../sw.js' : './sw.js';
    try {
      navigator.serviceWorker.register(url).catch(function() { /* offline install is optional */ });
    } catch (e) { /* older browsers */ }
  }

  function init() {
    var host = document.getElementById('landing');
    if (!host) return;
    host.innerHTML = markup();
    document.body.style.overflow = 'hidden';
    wire(host);
    registerSW();
  }

  return { init: init };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ChemSimLanding.init);
} else {
  ChemSimLanding.init();
}
