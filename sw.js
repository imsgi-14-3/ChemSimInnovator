/* ChemSim service worker — app-like offline support */
var CACHE = 'chemsim-v1';

var CORE = [
  './',
  'index.html',
  'manifest.json',
  'frontend/styles/landing.css',
  'frontend/styles/design-system.css',
  'frontend/styles/layout.css',
  'frontend/styles/components.css',
  'frontend/styles/laboratory.css',
  'frontend/styles/responsive.css',
  'frontend/landing.js',
  'frontend/app.js',
  'frontend/assets/icon.svg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(CORE); }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return k === CACHE ? null : caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  /* pages: network first (always fresh), cache only when offline */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function(res) {
        var copy = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        return res;
      }).catch(function() {
        return caches.match(e.request).then(function(hit) {
          return hit || caches.match('index.html');
        });
      })
    );
    return;
  }
  /* assets: cache first */
  e.respondWith(
    caches.match(e.request).then(function(hit) {
      if (hit) return hit;
      return fetch(e.request).then(function(res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function() {
        return new Response('', { status: 504, statusText: 'offline' });
      });
    })
  );
});
