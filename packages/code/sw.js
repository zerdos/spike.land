importScripts("https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js");
const {strategies} = workbox;
self.addEventListener("fetch", (event) => {
  if (event.request.url.endsWith(".js")) {
    const cacheFirst = new strategies.CacheFirst();
    event.respondWith(cacheFirst.handle({request: event.request}));
  }
});
