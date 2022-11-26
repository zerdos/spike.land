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
let files: { [k: string]: string } = {};

const getCacheName = () =>
  fetch(location.origin + "/files.json").then((files) => files.ok ? files.text() : null).then((content) => {
    if (content !== null) files = JSON.parse(content);
    return md5(content);
  }).then((cn) => (cn === cacheName || (fileCache = null) || (cacheName = cn))).finally(() => cacheName);

self.addEventListener("fetch", function(event) {
  return event.respondWith((async () => {
    let url = new URL(event.request.url);

    if (
      url.pathname.includes("/live/") || url.pathname.includes("ze3w")
    ) {
      return fetch(event.request);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const myCache = url.pathname.includes("npm:/v")
      ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
      : url.pathname.includes("chunk-")
      ? (chunkCache = chunkCache || await caches.open("chunks"))
      : (fileCache = fileCache || await caches.open(`f-${cacheName}`));

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
      request.url,
    );

    let response = await myCache.match(cacheKey);

    if (response) return response;

    response = await fetch(request);
    if (!response.ok) return response;

    response = new Response(response.body, response);

    const maybeFilename = url.pathname.split("/").pop();

    if (
      response.headers.get("Cache-Control") !== "no-cache"
      || (myCache === fileCache && maybeFilename && files[maybeFilename])
    ) {
      event.waitUntil(myCache.put(cacheKey, response.clone()));
    }
    return response;
  })());
});
