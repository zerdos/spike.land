// import { importMapReplace } from "./esbuildEsm";
export type {};
import { readFile } from "./fs";
import { HTML, md5, resetCSS } from "./session";
import { onConnectToClients } from "./sharedWorker";
import "./superFetch";

// var originalFetch = require("isomorphic-fetch");
// var fetch = require("fetch-retry")(originalFetch, {
//   retries: 3,
//   retryDelay: 800,
// });

onConnectToClients();

// import { renderToStream } from "./renderToStream";
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("activate", () => {
  // globalThis.fs = new FS(location.origin);

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
  let url = new URL(request.url);
  if (url.origin.indexOf("spike.land") === -1 && request.method === "POST") {
    return fetch(request);
  }

  // const fs = globalThis.fs;

  const prerender = url.pathname.endsWith("prerender");
  if (
    url.pathname.startsWith("/live") && url.pathname.endsWith("public")
    || url.pathname.endsWith("prerender")
  ) {
    const paths = url.pathname.split("/");
    // return renderToStream("clock3");
    const codeSpace = paths[2];

    const { css, html, transpiled, i } = JSON.parse(
      await readFile(
        `/live/${codeSpace}/session.json`,
      ) as string,
    );

    const ASSET_HASH = md5(transpiled);

    const respText = HTML.replace(
      "/**reset*/",
      resetCSS,
    )
      .replace(
        `<div id="root"></div>`,
        `
          <div id="root" data-i="${i}" style="height: 100%;">

          ${
          prerender ? "" : `<style>${css}</style>
          <div id="${codeSpace}-css" style="height: 100%;">
            ${html}
          </div>`
        }
          
          </div>
          <script type="module">

          import {render, prerender} from "${url.origin}/src/render.mjs";
       

          let ModASSET_HASH;

          const preRender = ${prerender ? "true" : "false"};
         (async ()=>{

          // try{
            // ModASSET_HASH = (await import("${url.origin}/live/${codeSpace}/index.mjs")).default;
          // } catch{
            ModASSET_HASH = (await import("${url.origin}/live/${codeSpace}/index.js")).default;
          // }
          if (preRender){
            prerender(ModASSET_HASH).then(res=>window.parent.postMessage(res))
          } else {
              const rootEl = document.getElementById("${codeSpace}-css");
              render(rootEl, ModASSET_HASH, "${codeSpace}");          
            render(rootEl, ModASSET_HASH, "${codeSpace}");          
              render(rootEl, ModASSET_HASH, "${codeSpace}");          
            }

         })();
         

              
              
          

          
         
          </script>`,
      ).split("ASSET_HASH").join(ASSET_HASH);

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

    // headers.set('Etag', newEtag);

    // if (Etag === newEtag) {
    //   // headers.set('CF-Cache-Status', 'HIT');
    //   return new Response(null, {
    //     status: 304,
    //     statusText: "Not modified",
    //     headers,
    //   });
    // }

    headers.set("Content-Type", "text/html; charset=UTF-8");
    headers.set("content_hash", md5(respText));
    // headers.set("Etag", newEtag)
    // headers.set("x-content-digest", `SHA-256=${newEtag}`);÷≥≥÷÷÷
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
    : (fileCache = fileCache || await caches.open(`fileCache`));

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

self.addEventListener("fetch", function(event) {
  return event.respondWith(
    createResponse(event.request),
  );
});
