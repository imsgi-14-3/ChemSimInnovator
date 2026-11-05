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
    '<path d="M19 6h10" stroke="#0a2a66" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M21 6v11.5L11.5 35a4.6 4.6 0 0 0 4 6.9h17a4.6 4.6 0 0 0 4-6.9L27 17.5V6" fill="#ffffff" stroke="#0a2a66" stroke-width="3.4" stroke-linejoin="round"/>' +
    '<path d="M15.8 30h16.4l3.4 6.2a3.2 3.2 0 0 1-2.8 4.7H15.2a3.2 3.2 0 0 1-2.8-4.7z" fill="#2479e8"/>' +
    '<path d="M36 4c-4.6.4-7.6 3-8.4 7 4.6-.4 7.7-2.9 8.4-7z" fill="#2479e8"/>' +
    '<circle cx="21" cy="34" r="1.6" fill="#ffffff" opacity=".85"/>' +
    '<circle cx="26.5" cy="37" r="1.2" fill="#ffffff" opacity=".7"/>' +
    '</svg>';

  var HEX1 = '<svg width="150" height="170" viewBox="0 0 100 112" fill="none"><polygon points="50,3 93,28 93,80 50,107 7,80 7,28" stroke="rgba(110,170,255,.50)" stroke-width="3"/></svg>';
  var HEX2 = '<svg width="96" height="108" viewBox="0 0 100 112" fill="none"><polygon points="50,3 93,28 93,80 50,107 7,80 7,28" stroke="rgba(110,170,255,.40)" stroke-width="3.5"/></svg>';
  var LEAF = '<svg width="86" height="60" viewBox="0 0 86 60" fill="none"><path d="M4 56C10 24 38 4 82 4c0 36-26 56-62 54A96 96 0 0 1 4 56z" fill="url(#lgLeafG)"/><path d="M10 54C24 34 48 16 76 10" stroke="#0d3f8f" stroke-width="2.4" stroke-linecap="round"/><defs><linearGradient id="lgLeafG" x1="4" y1="56" x2="82" y2="4" gradientUnits="userSpaceOnUse"><stop stop-color="#2479e8"/><stop offset="1" stop-color="#7dc4ff"/></linearGradient></defs></svg>';

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
      out += '<ellipse cx="' + (x + 15) + '" cy="' + (46 + t * 6) + '" rx="13" ry="4" fill="#ffc629" opacity=".85"/>';
      out += '<rect x="' + (x + 5) + '" y="8" width="5" height="30" rx="2.5" fill="#ffffff" opacity=".7"/>';
    }
    out += '<rect x="-6" y="148" width="176" height="10" rx="5" fill="#90a4ae"/>';
    return out + '</g>';
  }

  function illustration() {
    var s = '';
    s += '<svg class="lg-illu" viewBox="0 0 860 560" xmlns="http://www.w3.org/2000/svg">';
    s += '<defs>';
    s += '<linearGradient id="lgLiqG" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#a8d4ff"/><stop offset=".5" stop-color="#2479e8"/><stop offset="1" stop-color="#0d3f8f"/></linearGradient>';
    s += '<radialGradient id="lgBallG" cx=".35" cy=".3" r=".8"><stop stop-color="#8ec8ff"/><stop offset=".55" stop-color="#2479e8"/><stop offset="1" stop-color="#0d3f8f"/></radialGradient>';
    s += '<linearGradient id="lgGlassG" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#ffffff" stop-opacity=".9"/><stop offset=".5" stop-color="#e3f2fd" stop-opacity=".55"/><stop offset="1" stop-color="#ffffff" stop-opacity=".85"/></linearGradient>';
    s += '<radialGradient id="lgGlowG" cx=".5" cy=".5" r=".5"><stop stop-color="#d9ebff"/><stop offset="1" stop-color="#d9ebff" stop-opacity="0"/></radialGradient>';
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
    s += '<ellipse cx="90" cy="168" rx="65" ry="12" fill="#ffc629" opacity=".8"/>';
    s += '<rect x="66" y="6" width="9" height="46" rx="4.5" fill="#ffffff" opacity=".8"/>';
    s += '</g>';
    /* conical flask (front centre) */
    s += '<g transform="translate(210,120)">';
    s += '<path d="M66 6h68v112l84 190a44 44 0 0 1-40 62H112a44 44 0 0 1-40-62l84-190V6z" fill="url(#lgGlassG)" stroke="#7f97ac" stroke-width="6" stroke-linejoin="round"/>';
    s += '<path d="M84 208h112l48 106a30 30 0 0 1-27 44H83a30 30 0 0 1-27-44z" fill="url(#lgLiqG)"/>';
    s += '<ellipse cx="140" cy="210" rx="56" ry="11" fill="#ffd766" opacity=".95"/>';
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
    s += '<g stroke="#8ec8ff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".7">';
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
      '<path d="M0 70C260 10 520 0 800 40s540 110 800 60v50H0z" fill="#cfe5ff"/>' +
      '<path d="M0 100C300 40 560 40 840 78s500 72 760 34v38H0z" fill="#a8d4ff"/>' +
      '<path d="M0 128C320 86 600 92 880 116s460 34 720 10v24H0z" fill="#2479e8"/>' +
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

  function safeItem(ico, title, text) {
    return '<div class="lg-modal-item">' +
      '<span class="lg-modal-ico">' + ico + '</span>' +
      '<div class="lg-modal-txt"><b>' + title + '</b><p>' + text + '</p></div>' +
      '</div>';
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
    h += '<button class="lg-link" data-lg="experiments">' + ICON.flask + '<span>Practical Lab</span></button>';
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
    h += '<img class="lg-hero-photo" src="' + lgAsset + 'assets/landing-hero.png?v=lgpic1" alt="Chemistry laboratory glassware">';
    h += illustration();
    h += '</div>';
    h += '</section>';

    h += '<section class="lg-features">';
    h += card('experiments', ICON.flask, 'Virtual Experiments', 'Perform chemical experiments safely and easily.');
    h += card('apparatus', ICON.atom, 'Apparatus', 'See every piece of equipment used in the experiments.');
    h += card('learn', ICON.book, 'Learn &amp; Grow', 'Build your knowledge with interactive learning.');
    h += card('safe', ICON.shield, 'Safe &amp; Eco-Friendly', 'No real chemicals, no harm to environment.');
    h += '</section>';

    /* Safe & Eco-Friendly modal (opens with a small animation) */
    h += '<div class="lg-modal" id="lg-safe" hidden>';
    h += '<div class="lg-modal-card">';
    h += '<button class="lg-modal-close" data-lg="safe-close" aria-label="Close">&times;</button>';
    h += '<div class="lg-modal-head"><span class="lg-modal-ico lg-modal-ico--head">' + ICON.shield + '</span><h3>Safe &amp; Eco-Friendly</h3></div>';
    h += '<div class="lg-modal-list">';
    h += safeItem('\uD83C\uDF3F', 'No Harmful Chemicals', 'Learn through virtual experiments without handling real chemicals.');
    h += safeItem('\uD83C\uDF0D', 'Reduces Waste and Pollution', 'Practice experiments digitally and reduce material waste.');
    h += safeItem('\u267B\uFE0F', 'Promotes Sustainable Learning', 'Explore chemistry while learning environmentally responsible habits.');
    h += safeItem('\uD83C\uDF31', 'Builds Environmental Awareness', 'Understand how science can support a cleaner future.');
    h += '</div></div></div>';

    h += apparatusMarkup();

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
    }, 0);
  }

  function scrollToAbout() {
    var target = document.getElementById('lg-about');
    var el = document.getElementById('landing');
    if (target && el) el.scrollTo({ top: target.offsetTop - 16, behavior: 'smooth' });
  }

  function openSafeModal() {
    var m = document.getElementById('lg-safe');
    if (!m) return;
    m.hidden = false;
    window.setTimeout(function() { m.className = 'lg-modal lg-modal--open'; }, 20);
  }

  function closeSafeModal() {
    var m = document.getElementById('lg-safe');
    if (!m || m.hidden) return;
    m.className = 'lg-modal';
    window.setTimeout(function() { m.hidden = true; }, 300);
  }


  var APP_SVG_HEAD = '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">';
  var APP_SVG_TAIL = '</svg>';
  var APP_DEFS = '<svg width="0" height="0" style="position:absolute;left:-9999px" aria-hidden="true"><defs>' +
    '<linearGradient id="aGg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".96"/><stop offset=".45" stop-color="#e9f5ff" stop-opacity=".7"/><stop offset="1" stop-color="#cfe6fb" stop-opacity=".92"/></linearGradient>' +
    '<linearGradient id="aGl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ecbff"/><stop offset=".5" stop-color="#2f8bff"/><stop offset="1" stop-color="#1257c4"/></linearGradient>' +
    '<linearGradient id="aGy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe59a"/><stop offset=".5" stop-color="#ffb300"/><stop offset="1" stop-color="#e08900"/></linearGradient>' +
    '<linearGradient id="aGm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4eaf0"/><stop offset=".5" stop-color="#a8b8c4"/><stop offset="1" stop-color="#6f8494"/></linearGradient>' +
    '<radialGradient id="aGs" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0a2a66" stop-opacity=".22"/><stop offset="1" stop-color="#0a2a66" stop-opacity="0"/></radialGradient>' +
    '</defs></svg>';
  var SHD = '<ellipse cx="32" cy="57.5" rx="18" ry="3.6" fill="url(#aGs)"/>';
  var APP_ICON = {
    beaker: SHD +
      '<path d="M19 12h26v7l-3.2 30.5A5.5 5.5 0 0 1 36.4 54H27.6a5.5 5.5 0 0 1-5.4-4.5L19 19z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M21.8 34h20.4l-1.5 11.5A4 4 0 0 1 36.9 49H27.1a4 4 0 0 1-3.8-3.5z" fill="url(#aGl)"/>' +
      '<ellipse cx="32" cy="34" rx="10.2" ry="2.5" fill="#9fd4ff"/>' +
      '<path d="M22.5 16.5v10" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" opacity=".9"/>' +
      '<path d="M45 13l6 3.5" stroke="#8fb8dd" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M39 24h4M39 30h4" stroke="#8fb8dd" stroke-width="1.6" stroke-linecap="round"/>',
    conical: SHD +
      '<path d="M26 8h12v13l11 21a5 5 0 0 1-4.4 7.5H19.4A5 5 0 0 1 15 42l11-21z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M21.5 37h21l2.6 5a3.5 3.5 0 0 1-3.1 5.3H22a3.5 3.5 0 0 1-3.1-5.3z" fill="url(#aGl)"/>' +
      '<ellipse cx="32" cy="37" rx="10.5" ry="2.5" fill="#9fd4ff"/>' +
      '<path d="M29 12.5v9" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" opacity=".9"/>' +
      '<path d="M25 8h14" stroke="#8fb8dd" stroke-width="3" stroke-linecap="round"/>',
    round: SHD +
      '<rect x="27" y="6" width="10" height="22" rx="1.5" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<circle cx="32" cy="41" r="14.5" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M19 42a13 13 0 0 0 26 0z" fill="url(#aGl)"/>' +
      '<ellipse cx="32" cy="42" rx="12.9" ry="2.9" fill="#9fd4ff"/>' +
      '<ellipse cx="32" cy="6.5" rx="5" ry="1.6" fill="none" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M25 34a9 9 0 0 1 5-7" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>',
    burette: SHD +
      '<rect x="28.5" y="6" width="7" height="40" rx="3" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<rect x="30.2" y="10" width="3.6" height="33" fill="url(#aGl)"/>' +
      '<path d="M36 14h4M36 20h4M36 26h4M36 32h4M36 38h4" stroke="#8fb8dd" stroke-width="1.5" stroke-linecap="round"/>' +
      '<rect x="27" y="45" width="10" height="6" rx="2.5" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.4"/>' +
      '<rect x="36.5" y="46.5" width="7" height="3" rx="1.5" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.2"/>' +
      '<path d="M32 52.5c1.5 2.2 2.2 3.4 2.2 4.3a2.2 2.2 0 0 1-4.4 0c0-.9.7-2.1 2.2-4.3z" fill="#5eb2ff"/>' +
      '<path d="M30.4 9v30" stroke="#ffffff" stroke-width="1.6" opacity=".8"/>',
    pipette: SHD +
      '<path d="M25 8h14l-1.8 8.6a5 5 0 0 1-2.9 3.3c1.9 5 2.5 9.6 2.5 14.6v10.6a4.7 4.7 0 0 1-9.4 0V34.5c0-5 .6-9.6 2.5-14.6a5 5 0 0 1-2.9-3.3z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M26.6 11h10.8l-1.1 5.2a3.6 3.6 0 0 1-2.1 2.4h-4.4a3.6 3.6 0 0 1-2.1-2.4z" fill="url(#aGl)"/>' +
      '<path d="M28.6 34h6.8" stroke="#2f8bff" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M27.5 22v8" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>',
    tubes: SHD +
      '<path d="M13 10h12v29a6 6 0 0 1-12 0z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M13.6 30h10.8v9a5.4 5.4 0 0 1-10.8 0z" fill="url(#aGl)"/>' +
      '<ellipse cx="19" cy="30" rx="5.4" ry="1.6" fill="#9fd4ff"/>' +
      '<path d="M39 10h12v29a6 6 0 0 1-12 0z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M39.6 33h10.8v6a5.4 5.4 0 0 1-10.8 0z" fill="url(#aGy)"/>' +
      '<ellipse cx="45" cy="33" rx="5.4" ry="1.6" fill="#ffe59a"/>' +
      '<path d="M12 10h14M38 10h14" stroke="#8fb8dd" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M15.5 14v12M41.5 14v14" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>',
    gasjar: SHD +
      '<path d="M18 16h28v32a5 5 0 0 1-5 5H23a5 5 0 0 1-5-5z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M20 34h24v13a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z" fill="#cfe9ff" opacity=".75"/>' +
      '<rect x="15.5" y="9" width="33" height="7" rx="3.5" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.5"/>' +
      '<circle cx="26" cy="40" r="2.2" fill="#7fb8ef"/><circle cx="34" cy="44" r="2.6" fill="#7fb8ef"/><circle cx="39" cy="38" r="1.9" fill="#7fb8ef"/>' +
      '<path d="M22 20v10" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".85"/>',
    thermo: SHD +
      '<rect x="28.5" y="7" width="7" height="30" rx="3.5" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<circle cx="32" cy="45" r="9" fill="#e53935" stroke="#b71c1c" stroke-width="1.6"/>' +
      '<rect x="30.4" y="22" width="3.2" height="24" fill="#e53935"/>' +
      '<circle cx="29" cy="42.5" r="2.4" fill="#ff8a80" opacity=".8"/>' +
      '<path d="M36 13h4M36 19h4M36 25h4M36 31h4" stroke="#8fb8dd" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M30 10v10" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".9"/>',
    funnel: SHD +
      '<path d="M13 11h38L38 31v16a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V31z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M19.5 14.5h25L36.4 30H27.6z" fill="#ffffff" stroke="#d3e4f5" stroke-width="1.4"/>' +
      '<path d="M28.5 34v13" stroke="#cfe6fb" stroke-width="3"/>' +
      '<ellipse cx="32" cy="54.5" rx="3.5" ry="2.4" fill="#5eb2ff"/>' +
      '<path d="M17 15v8" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>',
    filter: SHD +
      '<circle cx="32" cy="31" r="20" fill="#ffffff" stroke="#cfe0f2" stroke-width="2"/>' +
      '<path d="M32 31V11M32 31 17.9 45.1M32 31l14.1 14.1" stroke="#dbe9f9" stroke-width="1.4"/>' +
      '<circle cx="32" cy="34" r="4.5" fill="#5eb2ff" opacity=".9"/>' +
      '<path d="M20 20a15 15 0 0 1 9-6" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>',
    watch: SHD +
      '<path d="M11 43a21 21 0 0 1 42 0z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M9 43h46" stroke="#8fb8dd" stroke-width="2.6" stroke-linecap="round"/>' +
      '<ellipse cx="32" cy="34" rx="7" ry="3.4" fill="#9fd4ff" opacity=".9"/>' +
      '<path d="M20 36a14 14 0 0 1 8-9" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>',
    dish: SHD +
      '<path d="M13 30h38l-4.5 13.5A6 6 0 0 1 41 48H23a6 6 0 0 1-5.5-4.5z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<ellipse cx="32" cy="30" rx="19" ry="5" fill="#eef7ff" stroke="#8fb8dd" stroke-width="2"/>' +
      '<ellipse cx="32" cy="30.5" rx="12.5" ry="3.1" fill="url(#aGl)"/>' +
      '<path d="M18 36v5" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>',
    rod: SHD +
      '<g transform="rotate(-45 32 32)">' +
      '<rect x="12" y="41" width="40" height="7" rx="3.5" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<rect x="15" y="43" width="34" height="2.4" rx="1.2" fill="#ffffff" opacity=".9"/>' +
      '</g>',
    stand: SHD +
      '<rect x="10" y="49" width="44" height="8" rx="3.5" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.6"/>' +
      '<rect x="17" y="7" width="7" height="42" rx="2" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.6"/>' +
      '<rect x="24" y="20" width="17" height="5.5" rx="2.7" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.4"/>' +
      '<rect x="39" y="14" width="6" height="17" rx="2.5" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.4"/>' +
      '<circle cx="46.5" cy="22.5" r="3.4" fill="#90a4ae" stroke="#607d8b" stroke-width="1.3"/>' +
      '<path d="M19.5 10v36" stroke="#ffffff" stroke-width="2" opacity=".55"/>',
    tripod: SHD +
      '<rect x="13" y="15" width="38" height="7" rx="3" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.6"/>' +
      '<rect x="17" y="11" width="30" height="5" rx="2" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1.3"/>' +
      '<path d="M18 22l-4.5 30M46 22l4.5 30M32 22v30" stroke="#78909c" stroke-width="4.5" stroke-linecap="round"/>' +
      '<path d="M18 22l-4.5 30M32 22v30" stroke="#cfd8dc" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>',
    bunsen: SHD +
      '<path d="M20 52h24l4 5H16z" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.6"/>' +
      '<rect x="28" y="26" width="8" height="26" rx="2" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.5"/>' +
      '<rect x="25.5" y="45" width="13" height="5.5" rx="2.5" fill="#90a4ae" stroke="#607d8b" stroke-width="1.3"/>' +
      '<circle cx="29.5" cy="35" r="1.5" fill="#455a64"/><circle cx="34.5" cy="35" r="1.5" fill="#455a64"/>' +
      '<path d="M32 8c4.5 6.5 7 9.5 7 13a7 7 0 0 1-14 0c0-3.5 2.5-6.5 7-13z" fill="#8ec8ff" opacity=".85"/>' +
      '<path d="M32 15c2.2 3.6 3.5 5.4 3.5 7.3a3.5 3.5 0 0 1-7 0c0-1.9 1.3-3.7 3.5-7.3z" fill="#2f8bff"/>',
    condenser: SHD +
      '<rect x="21" y="9" width="22" height="44" rx="7" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<rect x="23.5" y="26" width="17" height="12" fill="#bfe3ff" opacity=".6"/>' +
      '<rect x="28.5" y="5" width="7" height="52" rx="3.5" fill="#eaf6ff" stroke="#8fb8dd" stroke-width="1.6"/>' +
      '<path d="M21 19h-8M43 41h8" stroke="#8fb8dd" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="9" y="15.5" width="6" height="8" rx="2.5" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.3"/>' +
      '<rect x="49" y="37.5" width="6" height="8" rx="2.5" fill="url(#aGm)" stroke="#607d8b" stroke-width="1.3"/>' +
      '<path d="M24 14v30" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".85"/>',
    column: SHD +
      '<rect x="23" y="7" width="18" height="48" rx="6" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<rect x="25" y="40" width="14" height="12" rx="5" fill="url(#aGl)" opacity=".9"/>' +
      '<circle cx="29" cy="16" r="2.6" fill="#90caf9"/><circle cx="35" cy="16" r="2.6" fill="#64b5f6"/><circle cx="32" cy="24" r="2.6" fill="#90caf9"/><circle cx="29" cy="32" r="2.6" fill="#64b5f6"/><circle cx="35" cy="32" r="2.6" fill="#90caf9"/>' +
      '<path d="M26 11v34" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>',
    delivery: SHD +
      '<path d="M10 42h13a15 15 0 0 0 15-15V13" fill="none" stroke="#a9cbe8" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M10 42h13a15 15 0 0 0 15-15V13" fill="none" stroke="url(#aGg)" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M14 42h9a15 15 0 0 0 15-15v-7" fill="none" stroke="url(#aGl)" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M10 39.5h13a15 15 0 0 0 14.4-14" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".8"/>' +
      '<circle cx="38" cy="4.5" r="3" fill="#5eb2ff"/>',
    chroma: SHD +
      '<rect x="17" y="7" width="30" height="50" rx="3" fill="#ffffff" stroke="#cfe0f2" stroke-width="2"/>' +
      '<path d="M20 45h24" stroke="#5a7fb5" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round"/>' +
      '<circle cx="32" cy="40.5" r="3.4" fill="#2f8bff"/>' +
      '<circle cx="27.5" cy="32" r="2.8" fill="#7c4dff"/>' +
      '<circle cx="36" cy="26" r="2.6" fill="#26c6da"/>' +
      '<circle cx="32" cy="18.5" r="2.2" fill="#66bb6a"/>' +
      '<path d="M20 13h24" stroke="#90a4ae" stroke-width="1.8" stroke-dasharray="4 3" stroke-linecap="round" opacity=".7"/>',
    capillary: SHD +
      '<rect x="29.5" y="7" width="5" height="35" rx="2.5" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="1.8"/>' +
      '<rect x="30.9" y="30" width="2.2" height="10" fill="url(#aGl)"/>' +
      '<circle cx="32" cy="46" r="5" fill="url(#aGl)" stroke="#1565d8" stroke-width="1.4"/>' +
      '<circle cx="30.4" cy="44.3" r="1.6" fill="#9fd4ff"/>' +
      '<path d="M30.8 10v14" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>',
    ruler: SHD +
      '<rect x="8" y="22" width="48" height="21" rx="3.5" fill="#f2f8ff" stroke="#a9c6e6" stroke-width="2"/>' +
      '<path d="M8 36.5h48" stroke="#dbe9f9" stroke-width="1.4"/>' +
      '<path d="M16 22v8M24 22v11M32 22v8M40 22v11M48 22v8" stroke="#3f6fb5" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M16 43v-6M24 43v-4M32 43v-6M40 43v-4M48 43v-6" stroke="#3f6fb5" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M11 25h42" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".9"/>',
    dropper: SHD +
      '<ellipse cx="32" cy="13" rx="8.5" ry="9" fill="#3f8ef7" stroke="#1565d8" stroke-width="1.6"/>' +
      '<ellipse cx="29" cy="9.5" rx="2.8" ry="3.2" fill="#bcdcff" opacity=".85"/>' +
      '<path d="M27.5 21.5h9l-1.3 21.6a3.2 3.2 0 0 1-6.4 0z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="1.8"/>' +
      '<path d="M28.9 33h6.2l-.6 9.9a2.4 2.4 0 0 1-5 0z" fill="url(#aGl)"/>' +
      '<path d="M29.4 24v6" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity=".9"/>',
    loop: SHD +
      '<path d="M13 53c3-12 9.5-20 18.5-23.5" fill="none" stroke="#78909c" stroke-width="4.5" stroke-linecap="round"/>' +
      '<circle cx="43" cy="24" r="10.5" fill="none" stroke="#90a4ae" stroke-width="4"/>' +
      '<path d="M15 50c2.6-10.5 8.4-17.8 16-21" fill="none" stroke="#e2e8ee" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>' +
      '<path d="M37 18a8 8 0 0 1 6 5" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>',
    wash: SHD +
      '<path d="M18 27h28l-2.6 18.5A5.5 5.5 0 0 1 38 51H26a5.5 5.5 0 0 1-5.4-4.5z" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="2"/>' +
      '<path d="M20.7 38h22.6l-1.6 7.6A4.2 4.2 0 0 1 37.6 49H26.4a4.2 4.2 0 0 1-4.1-3.4z" fill="url(#aGl)"/>' +
      '<rect x="26.5" y="14" width="11" height="13" fill="url(#aGg)" stroke="#8fb8dd" stroke-width="1.8"/>' +
      '<rect x="24.5" y="8" width="15" height="7" rx="3" fill="#3f8ef7" stroke="#1565d8" stroke-width="1.5"/>' +
      '<path d="M39 12l8-6" stroke="#a9cbe8" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M39 12l8-6" stroke="#eaf6ff" stroke-width="1.6" stroke-linecap="round"/>' +
      '<circle cx="50" cy="5.5" r="2.6" fill="#5eb2ff"/>' +
      '<path d="M22 31v5" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>',
    tile: SHD +
      '<rect x="9" y="20" width="46" height="27" rx="4.5" fill="#ffffff" stroke="#cfe0f2" stroke-width="2"/>' +
      '<rect x="12" y="23" width="40" height="6" rx="3" fill="#f6fbff"/>' +
      '<circle cx="32" cy="35.5" r="7.5" fill="#eef6ff" stroke="#d8e7f7" stroke-width="1.4"/>' +
      '<circle cx="32" cy="35.5" r="3.6" fill="url(#aGl)"/>' +
      '<path d="M13 24h40" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".9"/>'
  };

  var APPARATUS = [
    ['Beaker', 'beaker'], ['Conical Flask', 'conical'], ['Round-Bottom Flask', 'round'],
    ['Burette', 'burette'], ['Volumetric Pipette', 'pipette'], ['Test Tubes', 'tubes'],
    ['Gas Jar', 'gasjar'], ['Thermometer', 'thermo'], ['Funnel', 'funnel'],
    ['Filter Paper', 'filter'], ['Watch Glass', 'watch'], ['Evaporating Dish', 'dish'],
    ['Glass Rod', 'rod'], ['Retort Stand &amp; Clamp', 'stand'], ['Tripod &amp; Gauze', 'tripod'],
    ['Bunsen Burner', 'bunsen'], ['Condenser', 'condenser'], ['Fractionating Column', 'column'],
    ['Delivery Tube', 'delivery'], ['Chromatography Paper', 'chroma'], ['Capillary Tube', 'capillary'],
    ['Ruler', 'ruler'], ['Dropper', 'dropper'], ['Wire Loop', 'loop'],
    ['Wash Bottle', 'wash'], ['White Tile', 'tile']
  ];

  function apparatusMarkup() {
    var h = APP_DEFS + '<div class="lg-modal" id="lg-apparatus" hidden>';
    h += '<div class="lg-modal-card">';
    h += '<button class="lg-modal-close" data-lg="apparatus-close" aria-label="Close">&times;</button>';
    h += '<div class="lg-modal-head"><span class="lg-modal-ico lg-modal-ico--head">' + ICON.atom + '</span><h3>Lab Apparatus</h3></div>';
    h += '<p class="lg-app-note">Every piece of equipment used across the ChemSim experiments.</p>';
    h += '<div class="lg-app-wrap"><div class="lg-app-grid">';
    for (var i = 0; i < APPARATUS.length; i++) {
      h += '<div class="lg-app-item"><span class="lg-app-ico">' + APP_SVG_HEAD + (APP_ICON[APPARATUS[i][1]] || '') + APP_SVG_TAIL + '</span><b>' + APPARATUS[i][0] + '</b></div>';
    }
    h += '</div></div></div></div>';
    return h;
  }

  function openApparatusModal() {
    var m = document.getElementById('lg-apparatus');
    if (!m) return;
    m.hidden = false;
    window.setTimeout(function() { m.className = 'lg-modal lg-modal--open'; }, 20);
  }

  function closeApparatusModal() {
    var m = document.getElementById('lg-apparatus');
    if (!m || m.hidden) return;
    m.className = 'lg-modal';
    window.setTimeout(function() { m.hidden = true; }, 300);
  }


  var escBound = false;

  function wire(el) {
    var nodes = el.querySelectorAll('[data-lg]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('click', function(ev) {
        ev.preventDefault();
        var action = this.getAttribute('data-lg');
        if (action === 'about') scrollToAbout();
        else if (action === 'safe') openSafeModal();
        else if (action === 'safe-close') closeSafeModal();
        else if (action === 'apparatus') openApparatusModal();
        else if (action === 'apparatus-close') closeApparatusModal();
        else if (action === 'experiments') closeLanding('experiment-select');
        else if (action === 'learn') closeLanding('revision');
        else closeLanding('home');
      });
    }
    var modal = document.getElementById('lg-safe');
    if (modal) {
      modal.addEventListener('click', function(ev) {
        if (ev.target === modal) closeSafeModal();
      });
    }
    var appModal = document.getElementById('lg-apparatus');
    if (appModal) {
      appModal.addEventListener('click', function(ev) {
        if (ev.target === appModal) closeApparatusModal();
      });
    }
    if (!escBound) {
      escBound = true;
      document.addEventListener('keydown', function(ev) {
        if (ev.keyCode === 27) { closeSafeModal(); closeApparatusModal(); }
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

  var lgAsset = /\/frontend\//.test(location.pathname) ? '' : 'frontend/';

  function showLanding() {
    var host = document.getElementById('landing');
    if (!host) {
      host = document.createElement('div');
      host.id = 'landing';
      document.body.insertBefore(host, document.body.firstChild);
    }
    init();
  }

  function init() {
    var host = document.getElementById('landing');
    if (host && host.getAttribute('data-lg-ready') !== '1') {
      host.innerHTML = markup();
      host.setAttribute('data-lg-ready', '1');
      document.body.style.overflow = 'hidden';
      wire(host);
    }
    var backBtn = document.getElementById('btn-landing');
    if (backBtn && backBtn.getAttribute('data-lg-bound') !== '1') {
      backBtn.setAttribute('data-lg-bound', '1');
      backBtn.addEventListener('click', showLanding);
    }
    registerSW();
  }

  return { init: init, show: showLanding };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ChemSimLanding.init);
} else {
  ChemSimLanding.init();
}
