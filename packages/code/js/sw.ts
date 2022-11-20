import "core-js/stable";

import { md5 } from "./md5";

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
let files = {};

const getCacheName = () =>
  fetch(location.origin + "/files.json").then((files) => files.ok ? files.text() : null).then((content) => {
    if (content !== null) files = JSON.parse(content);
    return md5(content);
  })
    .then(
      (cn) => (cn === cacheName || (fileCache = null) || (cacheName = cn)),
    ).finally(() => cacheName);

addEventListener("fetch", async (_event) => {
  const event = _event as unknown as FetchEvent;

  const request = event.request;
  const url = new URL(request.url);

  return event.respondWith((async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    let myCache = url.pathname.includes("npm:/v9") || url.pathname.includes("npm:/v1")
      ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
      : url.pathname.includes("chunk-")
      ? (chunkCache = chunkCache || await caches.open("chunks"))
      : (fileCache = fileCache || await caches.open("files"));

    if (Date.now() - lastChecked > 10_000) {
      lastChecked = Date.now();
      getCacheName();
    }

    const cacheKey = new Request(
      request.url,
    );
    const cachedResp = await myCache.match(cacheKey);

    if (cachedResp) return cachedResp.clone();

    if (!url.toString().includes(location.origin)) return fetch(request);

    const resp = await fetch(request);

    if (
      resp.ok && (resp.headers.get("Cache-Control") !== "no-cache"
          && !resp.headers.get("Location"))
      || (myCache == fileCache && Object.hasOwn(files, request.url.split("/").pop()!))
    ) {
      await myCache.put(cacheKey, resp.clone());
    }
    return resp;
  })());
});
