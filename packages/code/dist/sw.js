"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // js/sw.ts
  self.addEventListener("activate", () => {
    let lastChecked = 0;
    let npmCache;
    let chunkCache;
    let fileCache;
    let cacheName = "default";
    let files = {};
    const getCacheName = /* @__PURE__ */ __name(() => fetch(location.origin + "/files.json").then((resp) => {
      if (!resp.ok)
        return;
    }), "getCacheName");
    self.addEventListener("fetch", function(event) {
      return event.respondWith(async () => {
        let url = new URL(event.request.url);
        let isChunk = url.pathname.includes("chunk-");
        if (files && files[url.pathname.slice(1)]) {
          isChunk = true;
          url = new URL(files[url.pathname.slice(1)], url.origin);
        }
        if (url.pathname.indexOf("/live/") !== -1) {
          const myCache = url.pathname.includes("npm:/v") ? npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)) : url.pathname.includes("chunk-") || isChunk ? chunkCache = chunkCache || await caches.open("chunks") : fileCache = fileCache || await caches.open(`fileCache`);
          if (Date.now() - lastChecked > 4e4) {
            lastChecked = Date.now();
            setTimeout(() => getCacheName());
          }
          if (url.origin !== location.origin) {
            url = new URL(location.origin + "/:z:" + btoa(url.toString()));
          }
          let request = event.request;
          const cacheKey = new Request(
            url
          );
          let response = await myCache.match(cacheKey);
          if (response && response.ok)
            return response;
          response = await fetch(request);
          if (response === void 0 || !response.ok) {
            return new Response(response && response.body || "no response", { ...response, status: 500 });
          }
          response = new Response(response.body, response);
          if (response.headers.get("Cache-Control") !== "no-cache" || isChunk) {
            event.waitUntil(myCache.put(cacheKey, response.clone()));
          }
          return response;
        }
      });
    });
  });
})();
