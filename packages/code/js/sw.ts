export type {};

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("activate", () => {
  // const bc = new BroadcastChannel(location.origin);

  // bc.onmessage(ev => {
  //   if (ev.data.type === "bundle") {
  //   }
  // });

  // if (assets[content)])
  let lastChecked = 0;
  let npmCache: Cache | null;

  let chunkCache: Cache | null;
  let fileCache: Cache | null;
  let cacheName = "default";
  let files: { [k: string]: string } = {};
  // const assets: { [assetHash: string]: Promise<typeof files> } = {};
  const getCacheName = () =>
    fetch(location.origin + "/files.json").then((resp) => {
      if (!resp.ok) return;
    });

  self.addEventListener("fetch", function(event) {
    return event.respondWith(async () => {
      let url = new URL(event.request.url);
      let isChunk = url.pathname.includes("chunk-");

      if (files && files[url.pathname.slice(1)]) {
        isChunk = true;
        url = new URL(files[url.pathname.slice(1)], url.origin);
      }

      if (
        url.pathname.indexOf("/live/") !== -1
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        const myCache = url.pathname.includes("npm:/v")
          ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
          : (url.pathname.includes("chunk-") || isChunk)
          ? (chunkCache = chunkCache || await caches.open("chunks"))
          : (fileCache = fileCache || await caches.open(`fileCache`));

        if (Date.now() - lastChecked > 40_000) {
          lastChecked = Date.now();
          setTimeout(() => getCacheName());
        }

        if (
          url.origin !== location.origin
        ) {
          url = new URL(location.origin + "/:z:" + btoa(url.toString()));
        }

        let request = event.request;

        const cacheKey = new Request(
          url,
        );

        let response = await myCache.match(cacheKey);

        if (response && response.ok) return response;

        response = await fetch(request);

        if (response === undefined || !response.ok) {
          return new Response((response && response.body) || "no response", { ...response, status: 500 });
        }

        response = new Response(response.body, response);
        if (
          response.headers.get("Cache-Control") !== "no-cache" || isChunk
        ) {
          event.waitUntil(myCache.put(cacheKey, response.clone()));
        }
        return response;
      }
    });
  });
});
