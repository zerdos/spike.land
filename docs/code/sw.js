importScripts("https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js");
const {strategies} = workbox;
self.addEventListener("fetch", (event) => {
  if (!event.request.url.endsWith("sw.js") && (event.request.url.endsWith(".js") && event.request.url.endsWith(".html") || event.request.url.endsWith(".woff") || event.request.url.endsWith(".png") || event.request.url.endsWith(".ts"))) {
    const cacheFirst = new strategies.CacheFirst();
    event.respondWith(cacheFirst.handle({request: event.request}));
  }
});
