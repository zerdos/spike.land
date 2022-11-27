"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // js/md5.js
  var cache = globalThis.md5cache = globalThis.md5cache || /* @__PURE__ */ new Map();

  // js/sw.ts
  var lastChecked = 0;
  var npmCache;
  var chunkCache;
  var fileCache;
  var cacheName = "default";
  var memoryCache = {};
  var files = {};
  var assets = {};
  var getCacheName = /* @__PURE__ */ __name(() => fetch(location.origin + "/files.json").then((resp) => {
    if (!resp.ok)
      return;
    const assetHash = resp.headers.get("asset_hash");
    if (assetHash === null)
      return;
    if (cacheName === assetHash)
      return;
    cacheName = assetHash;
    Object.assign(assets, { [assetHash]: resp.json() });
    assets[assetHash].then((f) => files = f);
  }), "getCacheName");
  self.addEventListener("fetch", function(event) {
    return event.respondWith((async () => {
      let url = new URL(event.request.url);
      let isChunk = false;
      if (files && files[url.pathname.slice(1)]) {
        isChunk = true;
        url = new URL(files[url.pathname.slice(1)], url.origin);
      }
      if (url.pathname.includes("/live/")) {
        let resp = await fetch(event.request);
        if (!resp.ok)
          return resp;
        const contentHash = resp.headers.get("content_hash");
        if (contentHash) {
          if (memoryCache[contentHash])
            return memoryCache[contentHash];
          resp = new Response(await resp.blob(), resp);
          memoryCache[contentHash] = resp.clone();
        }
        return resp;
      }
      const myCache = url.pathname.includes("npm:/v") ? npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)) : url.pathname.includes("chunk-") || isChunk ? chunkCache = chunkCache || await caches.open("chunks") : fileCache = fileCache || await caches.open(`fileCache`);
      if (Date.now() - lastChecked > 4e4) {
        lastChecked = Date.now();
        setTimeout(getCacheName);
      }
      let request = event.request;
      const cacheKey = new Request(
        url
      );
      let response = await myCache.match(cacheKey);
      if (response)
        return response;
      try {
        response = await fetch(request);
        if (!response.ok)
          return response;
      } catch {
        return new Response("oh no!", { status: 500, statusText: `Could not fetch:  ${request.url}` });
      }
      response = new Response(response.body, response);
      if (response.headers.get("Cache-Control") !== "no-cache") {
        event.waitUntil(myCache.put(cacheKey, response.clone()));
      }
      return response;
    })());
  });
})();
