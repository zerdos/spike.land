import localForage from "localforage";
// import { importMapReplace } from "./esbuildEsm";
import { transform } from "./esmTransform";
export type {};

interface MyServiceWorkerScope extends ServiceWorkerGlobalScope {
  memoryCache: LocalForage;
}

declare const self: MyServiceWorkerScope;

self.addEventListener("activate", () => {
  // const bc = new BroadcastChannel(location.origin);

  // bc.onmessage(ev => {
  //   if (ev.data.type === "bundle") {
  //   }
  // });
});
// async function wait(delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, delay);
//   });
// }

self.memoryCache = self.memoryCache || localForage.createInstance({
  name: "memoryCache",
});

let lastChecked = 0;
let npmCache: Cache | null;

let chunkCache: Cache | null;
let fileCache: Cache | null;
let cacheName = "default";
let files: { [k: string]: string } = {};
const assets: { [assetHash: string]: Promise<typeof files> } = {};
// const getCacheName = () =>
//   fetch(location.origin + "/files.json").then((resp) => {
//     if (!resp.ok) return;

//     // Object.keys(files).map(async x=>{

//     // let req = new Request(`${location.origin}/${files[x]}`, )
//     // let response =await  fetch(req);

//     const assetHash = resp.headers.get("asset_hash");
//     if (assetHash === null) return;
//     if (cacheName === assetHash) return;
//     cacheName = assetHash;
//     Object.assign(assets, { [assetHash]: resp.json() });
//     assets[assetHash].then((f) => files = f);
//   });

self.addEventListener("fetch", function(event) {
  return event.respondWith(
    (async () => {
      let url = new URL(event.request.url);

      let isChunk = url.pathname.includes("chunk-");
      if (files && files[url.pathname.slice(1)]) {
        isChunk = true;
        url = new URL(files[url.pathname.slice(1)], url.origin);
      }
      if (
        url.pathname.indexOf("/live/") !== -1
      ) {
        const controller = new AbortController();

        let req = new Request(event.request.url, {
          ...event.request,
          signal: controller.signal,
        });
        let resp = await fetch(req);
        if (!resp.ok) return resp;
        resp = new Response(resp.body, resp);
        // const contentHash = resp.headers.get("content_hash");
        // if (contentHash) {
        //   const { memoryCache } = self;

        //   let body = await memoryCache.getItem<string>(contentHash);
        //   if (body === null) {
        //     body = await resp.text();

        //     await memoryCache.setItem(contentHash, body);
        //   } else {
        //     controller.abort();
        //   }
        //   return new Response(body, resp);
        // }
        return resp;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      const myCache = url.pathname.includes("npm:/v")
        ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
        : (url.pathname.includes("chunk-") || isChunk)
        ? (chunkCache = chunkCache || await caches.open("chunks"))
        : (fileCache = fileCache || await caches.open(`fileCache`));

      // if (Date.now() - lastChecked > 40_000) {
      // lastChecked = Date./now();
      // setTimeout(() => getCacheName());
      // }

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
        request = new Request(request.url, request);
        response = await fetch(request);

        response = new Response(response.body, response);
        if (!response.ok || !response.body) return response;

        if (
          url.pathname.indexOf(".ts") !== -1 && url.pathname.indexOf(".d.ts") === -1
          && url.pathname.indexOf(".tsx") === -1
        ) {
          const transformed =
            (await transform(await response.text(), { format: "esm", loader: "ts", target: "es2022" })).code;
          if (typeof transformed !== "string") return new Response("500 transpile error", { status: 500 });

          response = new Response(transformed, {
            ...response,
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        if (
          response.headers.get("Cache-Control") !== "no-cache" || isChunk
        ) {
          event.waitUntil(myCache.put(cacheKey, response.clone()));
        }
        return response;
      } catch {
        return new Response("oh no!", {
          status: 500,
          statusText: `Could not fetch:  ${request.url}`,
        });
      }
    })(),
  );
});
