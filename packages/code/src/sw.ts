// import { importMapReplace } from "./esbuildEsm";
importScripts("/workerScripts/superFetch.js");
self.fetch = globalThis.superFetch;

export type {};
import { Mutex } from "async-mutex";
import throttle from "lodash.throttle";
import { readFile } from "./fs";
import { HTML, md5, resetCSS } from "./session";
import { onConnectToClients } from "./sharedWorker";

// var originalFetch = require("isomorphic-fetch");
// var fetch = require("fetch-retry")(originalFetch, {
//   retries: 3,
//   retryDelay: 800,
// });
declare const self: ServiceWorkerGlobalScope & { files: { [key: string]: string }; fileCacheName: string };

const mutex = new Mutex();
async function getFiles() {
  mutex.isLocked() && await mutex.waitForUnlock();

  try {
    await mutex.acquire();
    self.files = await (await fetch(location.origin + "/files.json")).json<{ [key: string]: string }>();

    self.fileCacheName = md5(self.files);

    const currentChunks = Object.values(self.files);
    caches.keys().then(myCaches =>
      myCaches.map(x => {
        if (x !== "chunks" && x !== self.fileCacheName) caches.delete(x);
      })
    );

    const chunkCaches = await caches.open("chunks");

    await (await (await caches.open("chunks")).keys()).filter(x => !currentChunks.includes(new URL(x.url).pathname))
      .map(
        x => chunkCaches.delete(x),
      );
  } finally {
    mutex.release();
  }
}

onConnectToClients();

// import { renderToStream } from "./renderToStream";

// globalThis.fs = new FS(location.origin);

// const bc = new BroadcastChannel(location.origin);

// bc.onmessage(ev => {
//   if (ev.data.type === "bundle") {
//   }
// });
// });
// async function wait(delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, delay);
//   });
// }

// let lastChecked = 0;
let npmCache: Cache | null;

let chunkCache: Cache | null;
let fileCache: Cache | null;
// let cacheName = "default";
// let files: { [k: string]: string } = {};
// const assets: { [assetHash: string]: Promise<typeof files> } = {};
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

const createResponse = async (request: Request) => {
  if (mutex.isLocked()) {
    mutex.waitForUnlock();
  }

  let url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method === "POST") {
    return fetch(request);
  }

  // const fs = globalThis.fs;
  const paths = url.pathname.split("/");
  const codeSpace = paths[2];

  if (
    url.pathname === `/live/${codeSpace}/iframe` || url.pathname === `/live/${codeSpace}/`
    || url.pathname === `/live/${codeSpace}/public` || url.pathname === `/live/${codeSpace}/dehydrated`
  ) {
    // return renderToStream("clock3");
    const codeSpace = paths[2];

    const { css, html, i } = JSON.parse(
      await readFile(
        `/live/${codeSpace}/session.json`,
      ) as string,
    );

    const ASSET_HASH = self.files.ASSET_HASH.trim();

    const respText = HTML.replace("sw.js", "sw.js?version=" + self.files["sw.js"].split(".")[1]).replace(
      "/**reset*/",
      resetCSS,
    ).replace(
      `<div id="root"></div>`,
      `<div id="root" style="height: 100%;">
    <style>${css}</style>
      <div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
        ${html}
        </div>

    </div>              
    ` + url.pathname.endsWith("dehydrated")
        ? `<script>

    const paths = location.href.split("/");
    const page = paths.pop();
    const codeSpace = paths[2]
      
  
      const BC = new BroadcastChannel("${url.origin}/live/${codeSpace}/");
    
    BC.onmessage = ({data}) => {
      const {html, css, i } = data;
      if (page ==="dehydrated" && html ) document.getElementById("root").innerHTML = ['<div id="', codeSpace, '-css" style="height: 100%"><style>', css, "</style>", html, "<div>" ].join("");
      
    }
    </script>`
        : `<script type="module">
        import {render} from "${url.origin}/src/render.mjs?v=${ASSET_HASH}";
              
        const rootEl = document.getElementById("${codeSpace}-css");

        render(rootEl, "${codeSpace}", ${i});
        </script>`,
    );

    // const Etag = request.headers.get("Etag");
    // const newEtag = await sha256(respText);
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");

    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set(
      "Cache-Control",
      "no-cache",
    );

    headers.set("Content-Type", "text/html; charset=UTF-8");
    headers.set("content_hash", md5(respText));
    return new Response(respText, {
      status: 200,
      headers,
    });
  }
  if (url.pathname.startsWith("/live")) {
    try {
      const file = await readFile(url.pathname);
      if (file) {
        return new Response(file, {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      }
    } catch {
    }
  }

  let isChunk = url.pathname.includes("chunk-");
  // if (files && files[url.pathname.slice(1)]) {
  //   isChunk = true;
  //   url = new URL(files[url.pathname.slice(1)], url.origin);
  // }
  // if (
  //   url.pathname.indexOf("/live/") !== -1
  // ) {
  //   const controller = new AbortController();

  //   let req = new Request(request.url, {
  //     ...request,
  //     signal: controller.signal,
  //   });
  //   let resp = await fetch(req);
  //   if (!resp.ok) return resp;
  //   resp = new Response(resp.body, resp);
  //   const contentHash = resp.headers.has("content_hash")
  //     ? resp.headers.get("content_hash")
  //     : null;
  //   if (contentHash) {
  //     chunkCache = chunkCache || await caches.open("chunks");

  //     let cacheKey = new Request(
  //       new URL("/" + contentHash, url).toString(),
  //     );

  //     let cachedResp = await chunkCache.match(cacheKey);
  //     if (cachedResp) {
  //       controller.abort();
  //       return cachedResp;
  //     }

  //     cachedResp = new Response(await resp.blob(), resp);

  //     await chunkCache.put(cacheKey, cachedResp.clone());
  //     return cachedResp;
  //   }

  //   resp = new Response(resp.body, resp);

  //   return resp;
  // }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const myCache = url.pathname.includes("npm:/v")
    ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
    : (url.pathname.includes("chunk-") || isChunk)
    ? (chunkCache = chunkCache || await caches.open("chunks"))
    : (fileCache = fileCache || await caches.open(self.fileCacheName));

  if (url.pathname.length < 2) return fetch(request);
  // if (Date.now() - lastChecked > 40_000) {
  // lastChecked = Date./now();
  // setTimeout(() => getCacheName());
  // }

  // if (
  //   url.origin !== location.origin
  // ) {
  //   url = new URL(location.origin + "/:z:" + btoa(url.toString()));
  // }

  const cacheKey = new Request(
    url,
  );

  let response = await myCache.match(cacheKey);

  if (response) return response;

  try {
    request = new Request(request.url, { ...request, redirect: "follow" });
    response = await fetch(request);
    if (!response.ok) return response;

    // response = new Response(response.body, response);
    if (
      !response.ok
    ) {
      return response;
    }

    // if (
    //   (url.pathname.indexOf(".ts") !== -1
    //     || url.pathname.indexOf(".tsx") !== -1)
    //   && url.pathname.indexOf(".d.ts") === -1
    // ) {
    //   const transformed = (await transform(await response.text(), {
    //     format: "esm",
    //     loader: "tsx",
    //     target: "es2022",
    //   })).code;
    //   if (typeof transformed !== "string") {
    //     return new Response("500 transpile error", { status: 500 });
    //   }

    //   response = new Response(transformed, {
    //     ...response,
    //     status: 200,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Cache-Control": "no-cache",
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   });
    // }
    if (
      response.headers.get("Cache-Control") !== "no-cache" || isChunk
    ) {
      await myCache.put(cacheKey, response.clone());
    }
    return response;
  } catch (err) {
    return new Response("oh no! " + JSON.stringify({ err }), {
      status: 500,
      statusText: `Could not fetch:  ${request.url}`,
    });
  }
};

const getFilesThrottled = throttle(getFiles, 60_000, { trailing: true, leading: false });
self.addEventListener("fetch", async function(event) {
  await getFilesThrottled();

  return event.respondWith(createResponse(event.request));
});
