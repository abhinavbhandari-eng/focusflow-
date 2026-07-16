const CACHE = 'focusflow-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Never cache API calls to AI providers
  if (e.request.url.includes('/v1/') || e.request.url.includes('generativelanguage')) return;

  // Network-First strategy for the main HTML document to avoid caching stale app code
  const isDoc = e.request.mode === 'navigate' || 
                e.request.url.endsWith('/') || 
                e.request.url.endsWith('index.html');

  if (isDoc) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
  } else {
    // Cache-First strategy for static CDN assets and manifest
    e.respondWith(
      caches.match(e.request).then(hit => {
        return hit || fetch(e.request).then(res => {
          if (res.ok && (e.request.url.startsWith(self.location.origin) || e.request.url.includes('cdnjs'))) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => caches.match('./index.html'));
      })
    );
  }
});
