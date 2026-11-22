const CACHE_NAME = 'ctb-lecip-web-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/lecip_faytech_controller.png',
  './assets/lecip_faytech_controller_lm.png',
  './assets/lecip_button_invisible.png',
  './data/routes.json',
  './data/stops.json',
  './data/announcements.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
