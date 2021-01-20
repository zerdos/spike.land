importScripts(
  "../../node_legacy/workbox-sw.js",
);
importScripts("./shasums.umd.js")

// @ts-ignore
workbox.loadModule("workbox-strategies");

// @ts-ignore
workbox.routing.registerRoute(
  /**
   * 
   * @param {{url: {origin: string}}} opts 
   */
  ({ url }) =>
    url.origin === "https://unpkg.com" ||
    url.origin === "https://zed.vision" ||
    url.origin === "https://code.zed.vision" ||
    url.origin === "https://blog.zed.vision",
  // @ts-ignore
  new workbox.strategies.CacheFirst(),
);
// @ts-ignore
self.addEventListener(
  "fetch", /**
 * @param {{ respondWith?: any; request?: any; }} event
 */
  (event) => {
    const { request } = event;
    const { url } = request;
    if (
      !url.endsWith("sw.js") && (
        url.endsWith(".js") || url.endsWith(".mjs") || url.endsWith(".json") ||
        url.endsWith(".map") ||
        url.endsWith(".html") || url.endsWith(".woff") ||
        url.endsWith(".jpg") || url.endsWith(".css") ||
        url.endsWith(".png") || url.endsWith(".ts")
      )
    ) {
      console.log("workbox cache!", { url });
      // Using the previously-initialized strategies will work as expected.
      // @ts-ignore
      const cacheFirst = new workbox.strategies.CacheFirst();
      event.respondWith(cacheFirst.handle({ event, request }));
    } else if (
      url.indexOf("/ipfs/") !== -1
    ) {
      const request = fetch(url.replace("blog.", "").replace("code.", ""));
      // @ts-ignore
      const cacheFirst = new workbox.strategies.CacheFirst();
      event.respondWith(cacheFirst.handle({ event, request }));
    }
  },
);
