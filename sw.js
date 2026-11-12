const CACHE = "bogota-antigua-v2";
const CORE = [
  new URL("./", self.location).href,
  new URL("./index.html", self.location).href,
  new URL("./manifest.webmanifest", self.location).href,
  new URL("./icons/icon-192.png", self.location).href,
  new URL("./icons/icon-512.png", self.location).href,
  new URL("./icons/icon-maskable-512.png", self.location).href,
  new URL("./icons/apple-touch-icon.png", self.location).href
];
const OFFLINE_URL = new URL("./bogota-antigua-offline.html", self.location).href;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "CACHE_OFFLINE") return;
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      if (await cache.match(OFFLINE_URL)) return;
      const response = await fetch(OFFLINE_URL, { cache: "no-cache" });
      if (!response.ok) return;
      await cache.put(OFFLINE_URL, response.clone());
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.postMessage({ type: "OFFLINE_CACHED" }));
    }).catch(() => {})
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request, { cache: "no-store" }).catch(async () => {
        const cache = await caches.open(CACHE);
        return (await cache.match(OFFLINE_URL))
          || (await cache.match(new URL("./index.html", self.location).href))
          || Response.error();
      })
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
          }
          return response;
        });
      })
    );
  }
});
