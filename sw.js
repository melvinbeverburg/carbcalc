/* Service Worker für den Carb Calculator.
   Die Version kommt aus der Adresse (sw.js?v=1.1.0) und wird in index.html gesetzt.
   Ändert sich die Version, legt der Browser einen neuen Cache an und räumt die alten weg. */
const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev';
const PREFIX = 'carb-calculator-';
const CACHE = PREFIX + VERSION;
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Die Seite selbst: erst das Netz (damit Updates sofort ankommen), nach 3,5 s oder offline der Cache
function networkFirst(request) {
  return new Promise(resolve => {
    let done = false;
    const fromCache = () => caches.match('./index.html').then(hit => hit || Response.error());
    const timer = setTimeout(() => {
      fromCache().then(res => { if (!done) { done = true; resolve(res); } });
    }, 3500);
    fetch(request, { cache: 'no-cache' }).then(res => {
      clearTimeout(timer);
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
      if (!done) { done = true; resolve(res); }
    }).catch(() => {
      clearTimeout(timer);
      if (!done) { done = true; fromCache().then(resolve); }
    });
  });
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Die Update-Prüfung der App fragt bewusst am Cache vorbei
  if (request.cache === 'no-store' || request.cache === 'reload') return;

  const isPage = request.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
  if (isPage) { event.respondWith(networkFirst(request)); return; }

  event.respondWith(
    caches.match(request).then(hit => hit || fetch(request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(request, copy)); }
      return res;
    }))
  );
});
