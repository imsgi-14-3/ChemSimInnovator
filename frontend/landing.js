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

  var HEX1 = '<svg width="150" height="170" viewBox="0 0 100 112" fill="none"><polygon points="50,3 93,28 93,80 50,107 7,80 7,28" stroke="rgba(34,197,94,.30)" stroke-width="3"/></svg>';
  var HEX2 = '<svg width="96" height="108" viewBox="0 0 100 112" fill="none"><polygon points="50,3 93,28 93,80 50,107 7,80 7,28" stroke="rgba(34,197,94,.22)" stroke-width="3.5"/></svg>';
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
    }, 300);
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
  var APP_ICON_G = '<g fill="none" stroke="#0a2a66" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">';
  var APP_ICON = {
    beaker: APP_ICON_G + '<path d="M22 10h20v6l-2.5 30a5 5 0 0 1-5 4.5h-5a5 5 0 0 1-5-4.5L20 16z"/><path d="M22.8 32h18.4l-1.8 14.5H24.6z" fill="#2479e8" opacity=".55" stroke="none"/><path d="M22 10h20"/><path d="M42 10l5 3"/></g>',
    conical: APP_ICON_G + '<path d="M26 10h12v14l10 22a4 4 0 0 1-3.6 5.8H19.6A4 4 0 0 1 16 46l10-22z"/><path d="M22 36h20l3.5 10H18.5z" fill="#2479e8" opacity=".55" stroke="none"/><path d="M24 10h16"/></g>',
    round: APP_ICON_G + '<circle cx="32" cy="36" r="16"/><path d="M27 10h10v11"/><path d="M18.5 38h27a13.5 13.5 0 0 1-27 0z" fill="#2479e8" opacity=".55" stroke="none"/><path d="M27 10h10"/></g>',
    burette: APP_ICON_G + '<path d="M29 6h6v36h-6z"/><circle cx="32" cy="46" r="4"/><path d="M32 50v6"/><path d="M29 12h4M29 18h4M29 24h4M29 30h4M29 36h4"/></g>',
    pipette: APP_ICON_G + '<path d="M28 8h8l4 16a5 5 0 0 1-4 6h-8a5 5 0 0 1-4-6z"/><path d="M30 30h4v22h-4z"/><path d="M26 8h12"/></g>',
    tubes: APP_ICON_G + '<path d="M18 10h10v28a5 5 0 0 1-10 0z"/><path d="M18.4 32h9.2l-.8 6h-7.6z" fill="#2479e8" opacity=".55" stroke="none"/><path d="M36 10h10v28a5 5 0 0 1-10 0z"/><path d="M36.4 34h9.2l-.8 4h-7.6z" fill="#2479e8" opacity=".55" stroke="none"/><path d="M17 10h12M35 10h12"/></g>',
    gasjar: APP_ICON_G + '<path d="M20 14h24v36H20z"/><path d="M18 8h28v5H18z"/><path d="M24 24h4M34 30h4M26 38h4" opacity=".7"/></g>',
    thermo: APP_ICON_G + '<path d="M29 8h6v28h-6z"/><circle cx="32" cy="44" r="8"/><path d="M32 20v18" stroke="#dc3545"/><circle cx="32" cy="44" r="4.5" fill="#dc3545" stroke="none"/><path d="M35 14h-3M35 20h-3M35 26h-3"/></g>',
    funnel: APP_ICON_G + '<path d="M14 12h36L37 32v18h-10V32z"/><path d="M19 18h26l-6 10H25z" fill="#2479e8" opacity=".5" stroke="none"/></g>',
    filter: APP_ICON_G + '<circle cx="32" cy="32" r="18"/><path d="M32 14v36"/><path d="M18 24l20 16"/></g>',
    watch: APP_ICON_G + '<path d="M10 30a22 14 0 0 0 44 0z"/><path d="M10 30h44"/></g>',
    dish: APP_ICON_G + '<path d="M12 28h40l-5 16a5 5 0 0 1-5 4H22a5 5 0 0 1-5-4z"/><path d="M17 36h30l-2.5 8h-25z" fill="#2479e8" opacity=".55" stroke="none"/></g>',
    rod: APP_ICON_G + '<path d="M16 48L48 16"/><path d="M20 44l4 4" opacity=".6"/></g>',
    stand: APP_ICON_G + '<path d="M12 52h40v5H12z"/><path d="M20 8h5v44h-5z"/><path d="M25 22h14v5H25z"/><circle cx="41" cy="24.5" r="3"/></g>',
    tripod: APP_ICON_G + '<path d="M12 18h40v7H12z"/><path d="M20 18v7M32 18v7M44 18v7" opacity=".6"/><path d="M17 25l-3 27M47 25l3 27M32 25v27"/></g>',
    bunsen: APP_ICON_G + '<path d="M20 50h24v5H20z"/><path d="M28 22h8v28h-8z"/><path d="M28 34h-6" opacity=".7"/><path d="M32 4c4 8 6 11 6 15a6 6 0 0 1-12 0c0-4 2-7 6-15z" fill="#ffc629" stroke="#0a2a66"/></g>',
    condenser: APP_ICON_G + '<path d="M24 8h16v40H24z"/><path d="M29 8v40M35 8v40" opacity=".7"/><path d="M24 18h-8M40 38h8"/><path d="M16 15v6M48 35v6"/></g>',
    column: APP_ICON_G + '<path d="M24 8h16v44H24z"/><circle cx="32" cy="16" r="2.5" fill="#8ec8ff" stroke="none"/><circle cx="28" cy="24" r="2.5" fill="#8ec8ff" stroke="none"/><circle cx="36" cy="24" r="2.5" fill="#8ec8ff" stroke="none"/><circle cx="32" cy="32" r="2.5" fill="#8ec8ff" stroke="none"/><circle cx="28" cy="40" r="2.5" fill="#8ec8ff" stroke="none"/><circle cx="36" cy="40" r="2.5" fill="#8ec8ff" stroke="none"/></g>',
    delivery: APP_ICON_G + '<path d="M12 42h18a12 12 0 0 0 12-12V14" stroke-width="6"/><path d="M12 42h18a12 12 0 0 0 12-12V14" stroke="#eaf3ff" stroke-width="2.5"/></g>',
    chroma: APP_ICON_G + '<path d="M20 8h24v48H20z"/><path d="M22 44h20" stroke-dasharray="4 3"/><circle cx="32" cy="40" r="3" fill="#2479e8" stroke="none"/><path d="M22 16h20" stroke-dasharray="4 3" opacity=".7"/></g>',
    capillary: APP_ICON_G + '<path d="M30 8h4v36h-4z"/><circle cx="32" cy="48" r="3.5" fill="#2479e8" stroke="none"/></g>',
    ruler: APP_ICON_G + '<path d="M10 24h44v16H10z"/><path d="M18 24v6M26 24v8M34 24v6M42 24v8M50 24v6"/></g>',
    dropper: APP_ICON_G + '<circle cx="32" cy="14" r="7"/><path d="M29 21h6l-1.5 21h-3z"/><circle cx="32" cy="48" r="2.5" fill="#2479e8" stroke="none"/></g>',
    loop: APP_ICON_G + '<path d="M14 50c2-14 10-22 18-24"/><circle cx="40" cy="20" r="8"/><path d="M36 4l1 6M48 12l-5 3M50 28l-6-2" opacity=".6"/></g>',
    wash: APP_ICON_G + '<path d="M20 26h24v22a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z"/><path d="M27 26v-5h10v5"/><path d="M44 30l8-8"/><path d="M50 18l4 2-2 4" opacity=".7"/><path d="M24 36h16" opacity=".5"/></g>',
    tile: APP_ICON_G + '<rect x="12" y="20" width="40" height="24" rx="4" fill="#f0f6ff"/><path d="M12 32h40" opacity=".5"/></g>'
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
    var h = '<div class="lg-modal" id="lg-apparatus" hidden>';
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
