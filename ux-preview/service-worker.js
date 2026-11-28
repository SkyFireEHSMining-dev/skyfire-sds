/* SkyFire SDS v0.1 demo: app-shell caching only.
   This is NOT production SDS storage or genuine offline worker-report delivery. */
const CACHE_PREFIX = 'skyfire-sds-ux-shell-';
const CACHE_NAME = `${CACHE_PREFIX}v0.1-uxpreview-1`;
const SHELL_URLS = [
  './',
  './index.html',
  './styles.css?v=skyfire-ux-preview-v1',
  './app.mjs?v=skyfire-ux-preview-v1',
  './model.mjs',
  './manifest.webmanifest',
  './icons/skyfire-logo-192.jpg',
  './icons/skyfire-home-icon-v2.jpg',
  './icons/skyfire-logo-512.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(SHELL_URLS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;

  // This single-page demonstration has no backend, no personal data uploads, and no real SDS documents.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) (await caches.open(CACHE_NAME)).put('./index.html', fresh.clone());
        return fresh;
      } catch (_) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const stored = await cache.match(request);
    if (stored) return stored;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});