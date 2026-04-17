const CACHE_NAME = "kanaltech-v1";

const urlsToCache = [
  "/ktx-protokoll-v7/",
  "/ktx-protokoll-v7/index.html",
  "/ktx-protokoll-v7/manifest.json",
  "/ktx-protokoll-v7/file_000000001a1c7243a0ca80606ae181fa.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch (Turbo)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
