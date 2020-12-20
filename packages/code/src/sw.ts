importScripts(
  "https://cdn.skypack.dev/workbox-sw@6.0.2/build/workbox-sw.js",
);
// This will trigger the importScripts() for workbox.strategies and its dependencies:
const { strategies } = workbox;

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const { url } = request;
  if (
    !url.endsWith("sw.js") &&
    (url.endsWith(".js") && url.endsWith(".html") || url.endsWith(".woff") ||
      url.endsWith(".png") || url.endsWith(".ts"))
  ) {
    // Using the previously-initialized strategies will work as expected.
    const cacheFirst = new strategies.CacheFirst();
    event.respondWith(cacheFirst.handle({ event, request }));
  }
});
