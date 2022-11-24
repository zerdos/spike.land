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
let files: { [k: string]: string } = {};

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

  return event.respondWith((async () => {
    const reqUrl = event.request.url;
    if (
      !event.request.url.includes(location.origin)
      || event.request.url.includes("/live/")
    ) {
      // let response;
      try {
        let response = await fetch(event.request);

        return response;
      } catch {
        console.error("fetch error", reqUrl);
        // console.log())
      }
    }
    const cacheKey = new Request(
      event.request.url,
    );
    const url = new URL(cacheKey.url);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const myCache = url.pathname.includes("npm:/v")
      ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
      : url.pathname.includes("chunk-")
      ? (chunkCache = chunkCache || await caches.open("chunks"))
      : (fileCache = fileCache || await caches.open(`f-${cacheName}`));

    if (Date.now() - lastChecked > 10_000) {
      lastChecked = Date.now();
      getCacheName();
    }

    const cachedResp = await myCache.match(cacheKey);

    if (cachedResp) return cachedResp;

    const resp = await fetch(event.request);
    if (!resp.ok) return resp;

    const maybeFilename = cacheKey.url.split("/").pop();

    if (
      resp.ok && (
          resp.headers.get("Cache-Control") !== "no-cache"
          //    && !resp.headers.get("Location")
        )
      || (myCache === fileCache && maybeFilename && files[maybeFilename])
    ) {
      await myCache.put(cacheKey, resp.clone());
    }
    return resp;
  })());
});
