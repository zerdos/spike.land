import { md5 } from "./md5";
export type {};
declare const self: ServiceWorkerGlobalScope;

// async function wait(delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, delay);
//   });
// }

let lastChecked = 0;
let npmCache: Cache | null;

let chunkCache: Cache | null;
let fileCache: Cache | null;
let cacheName = "default";
const memoryCache: { [k: string]: Response } = {};

let files: { [k: string]: string } = {};
const assets: { [assetHash: string]: Promise<typeof files> } = {};
const getCacheName = () =>
  fetch(location.origin + "/files.json").then((resp) => {
    if (!resp.ok) return;

    const assetHash = resp.headers.get("asset_hash");
    if (assetHash === null) return;
    if (cacheName === assetHash) return;
    cacheName = assetHash;
    Object.assign(assets, { [assetHash]: resp.json() });
    assets[assetHash].then(f => files = f);
  });

self.addEventListener("fetch", function(event) {
  return event.respondWith((async () => {
    let url = new URL(event.request.url);
    let isChunk = false;
    if (files && files[url.pathname.slice(1)]) {
      isChunk = true;
      url = new URL(files[url.pathname.slice(1)], url.origin);
    }
    if (
      url.pathname.includes("/live/")
    ) {
      const resp = await fetch(event.request);
      if (!resp.ok) return resp;
      const contentHash = resp.headers.get("content_hash");
      if (contentHash) {
        if (memoryCache[contentHash]) return memoryCache[contentHash];
        memoryCache[contentHash] = resp.clone();
      }
      return resp;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const myCache = url.pathname.includes("npm:/v")
      ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
      : (url.pathname.includes("chunk-") || isChunk)
      ? (chunkCache = chunkCache || await caches.open("chunks"))
      : (fileCache = fileCache || await caches.open(`fileCache`));

    if (Date.now() - lastChecked > 40_000) {
      lastChecked = Date.now();
      setTimeout(getCacheName);
    }

    // if (
    //   url.origin !== location.origin
    // ) {
    //   url = new URL(location.origin + "/:z:" + btoa(url.toString()));
    // }

    let request = event.request;
    const cacheKey = new Request(
      url,
    );

    let response = await myCache.match(cacheKey);

    if (response) return response;

    try {
      response = await fetch(request);
      if (!response.ok) return response;
    } catch {
      return new Response("oh no!", { status: 500, statusText: `Could not fetch:  ${request.url}` });
    }
    response = new Response(response.body, response);

    if (
      response.headers.get("Cache-Control") !== "no-cache"
    ) {
      event.waitUntil(myCache.put(cacheKey, response.clone()));
    }
    return response;
  })());
});
