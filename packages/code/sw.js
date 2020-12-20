importScripts("https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js");
const {strategies} = workbox;
self.addEventListener("fetch", (event) => {
  const {request} = event;
  const {url} = request;
  if (!url.endsWith("sw.js") && (url.endsWith(".js") && url.endsWith(".html") || url.endsWith(".woff") || url.endsWith(".png") || url.endsWith(".ts"))) {
    const cacheFirst = new strategies.CacheFirst();
    event.respondWith(cacheFirst.handle({event, request}));
  }
});
