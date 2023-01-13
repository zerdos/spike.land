import type {} from "./transpile";
importScripts("/workerScripts/transpile.js");
importScripts("/workerScripts/prettierEsm.js");

import type * as FS from "./fs";
declare const self:
  & ServiceWorkerGlobalScope
  & { files: { [key: string]: string }; fileCacheName: string }
  & ({ readdir: typeof FS.readdir });
importScripts("/workerScripts/fs.js");
export type {};

// import { randomUUID } from "crypto";
// import throttle from "lodash.throttle";
import { resetCSS } from "./getResetCss";
import { importMapReplace } from "./importMapReplace";
import HTML from "./index.html";
import { md5 } from "./md5";
import ReconnectingWebSocket from "./reconnWs.mjs";
// import { HTML, md5, resetCSS } from "./session";
// import { onConnectToClients } from "./sharedWorker";
// self.ReconnectingWebSocket = ReconnectingWebSocket;
// onConnectToClients();
// var originalFetch = require("isomorphic-fetch");
// var fetch = require("fetch-retry")(originalFetch, {
//   retries: 3,
//   retryDelay: 800,
// });

// const { mkdir } = self;

const connections = self.connections = self.connections || {};

let controller = new AbortController();

self.onmessage = async (event) => {
  controller.abort();
  controller = new AbortController();
  const signal = controller.signal;
  const { data } = event;
  const codeSpace = data.codeSpace;

  connections[codeSpace] = connections[codeSpace] || await (async () => {
    const websocket = new ReconnectingWebSocket(
      `wss://${location.host}/api/room/` + codeSpace + "/websocket",
    );
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

    const session = {
      websocket,
      BC,
      user: md5(self.crypto.randomUUID()),
      i: 0,
    };
    BC.onmessage = async ({ data }) => {
      if (data.i > session.i && (data.hashCode || data.newHash)) {
        session.i = data.i;

        data.name = session.user;
        websocket.send(JSON.stringify(data));
      }
    };

    websocket.onopen = () => console.log("onOpened");
    websocket.onmessage = async ({ data }) => {
      const msg = JSON.parse(data);
      if (data.type === "handShake") {
        websocket.send(JSON.stringify({ name: session.user }));
        return;
      }
      if (data.type === "transpile") {
        const transpiled = await transpile(data.code);
        websocket.send(JSON.stringify({ ...data, transpiled }));
      }

      if (msg.i > session.i) {
        session.i = msg.i;
        BC.postMessage(data);
      }
    };

    return session;
  })();

  if (signal.aborted) return null;

  if (data.type === "prerender") {
    setTimeout(async () => {
      if (signal.aborted) return;
      if (data.type === "prerender" && data.code && !data.html) {
        try {
          await mkdir("/");
          await mkdir("/live");
          await mkdir("/live/" + codeSpace);
          await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
          await writeFile(`/live/${codeSpace}/index.js`, transpiled);
        } catch {
          await unlink(`/live/${codeSpace}/index.tsx`);
          await unlink(`/live/${codeSpace}/index.js`);
          await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
          await writeFile(`/live/${codeSpace}/index.js`, data.transpiled);
        }
      }
    }, 200);
  }
  const transpiled = await transpile(data.code);

  if (signal.aborted) return null;
  return event.ports[0].postMessage({ ...data, transpiled });
};

// let ASSET_HASH = "assetHashNotFound";

// const mutex = new Mutex();
// async function getFiles() {
//   mutex.isLocked() && await mutex.waitForUnlock();

//   try {
//     await mutex.acquire();
//     const files = await (await fetch(location.origin + "/files.json")).json<{ [key: string]: string }>();

//     self.files = files;
//     self.fileCacheName = md5(self.files);
//     ASSET_HASH = files[ASSET_HASH] || "filesDoesntHaveAssetHash";

//     const currentChunks = Object.values(self.files);
//     caches.keys().then(myCaches =>
//       myCaches.map(x => {
//         if (x !== "chunks" && x !== self.fileCacheName) caches.delete(x);
//       })
//     );

//     const chunkCaches = await caches.open("chunks");

//     await (await (await caches.open("chunks")).keys()).filter(x => !currentChunks.includes(new URL(x.url).pathname))
//       .map(
//         x => chunkCaches.delete(x),
//       );
//   } finally {
//     mutex.release();
//   }
// }

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
// let npmCache: Cache | null;

// let chunkCache: Cache | null;
// let fileCache: Cache | null;
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

// const getFilesThrottled = throttle(getFiles, 60_000, { trailing: true, leading: false });

const createResponse = async (request: Request) => {
  // const controller = new AbortController();
  // await getFilesThrottled();
  // if (mutex.isLocked()) {
  //   await mutex.waitForUnlock();
  // }

  let url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method === "POST") {
    return fetch(request);
  }

  // const fs = globalThis.fs;
  const paths = url.pathname.split("/");
  const codeSpace = paths[2];
  if (
    url.pathname === `/live/${codeSpace}/iframe`
    || url.pathname === `/live/${codeSpace}/`
    || url.pathname === `/live/${codeSpace}/public`
    || url.pathname === `/live/${codeSpace}/dehydrated`
  ) {
    // return renderToStream("clock3");

    const { css, html, i } = JSON.parse(
      await readFile(
        `/live/${codeSpace}/session.json`,
      ) as string,
    );

    const respText = HTML.replace(
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
    <script type="module">
    const paths = location.href.split("/");
    const page = paths.pop();
    const codeSpace = paths[2]
      
  
      const BC = new BroadcastChannel("${url.origin}/live/${codeSpace}/");
    
    BC.onmessage = ({data}) => {
      const {html, css, i } = data;
      if (page ==="dehydrated" && html ) document.getElementById("root").innerHTML = ['<div id="', codeSpace, '-css" style="height: 100%"><style>', css, "</style>", html, "<div>" ].join("");
      
    }
    </script>` + (url.pathname !== `/live/${codeSpace}/dehydrated`
        ? `<script type="module">
        import {render} from "${url.origin}/src/render.mjs";
              
        const rootEl = document.getElementById("${codeSpace}-css");

        render(rootEl, "${codeSpace}", ${i});
        </script>`
        : ""),
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
  if (
    url.pathname.startsWith("/live")
    && (url.pathname.indexOf(".js") !== -1
      || url.pathname.indexOf(".mjs") !== -1
      || url.pathname.indexOf(".tsx") !== -1)
  ) {
    try {
      if (url.pathname.indexOf("index.js") !== -1) {
        const file = await readFile(`/live/${codeSpace}/index.tsx`);

        return new Response(await transpile(file), {
          headers: {
            "Content-Type": "application/javascript; charset=UTF-8",
            "Cache-Control": "no-cache",
          },
        });
      }

      const file = await readFile(url.pathname);
      if (file) {
        return new Response(file, {
          headers: {
            "Content-Type": "application/javascript; charset=UTF-8",
            "Cache-Control": "no-cache",
          },
        });
      }
    } catch {
    }
  }
  response = await fetch(request);

  if (!response.ok) return response;

  let response = new Response(response.body, response);
  if (
    response.headers.get("Content-Type").indexOf("application") !== -1
    && response.headers.get("Content-Type").indexOf("charset") !== -1
    && !request.url.endsWith(".json")
  ) {
    return new Response(importMapReplace(prettierJs(await response.text()), location.origin, response.url), response);
  }

  return response;

  // let isChunk = url.pathname.includes("chunk-");
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
  // const myCache = url.pathname.includes("npm:/v")
  // ? (npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)))
  // : (url.pathname.includes("chunk-") || isChunk)
  // ? (chunkCache = chunkCache || await caches.open("chunks"))
  // : (fileCache = fileCache || await caches.open(self.fileCacheName));

  // if (url.pathname.length < 2) return fetch(request);
  // if (Date.now() - lastChecked > 40_000) {
  // lastChecked = Date./now();
  // setTimeout(() => getCacheName());
  // }

  // if (
  //   url.origin !== location.origin
  // ) {
  //   url = new URL(location.origin + "/:z:" + btoa(url.toString()));
  // }

  // const cacheKey = new Request(
  //   url,
  // );

  // let response// = await myCache.match(cacheKey);

  // if (response) return response;

  // try {
  //   request = new Request(request.url, { ...request, redirect: "follow" });
  //   response = await fetch(request);
  //   if (!response.ok) return response;

  //   // response = new Response(response.body, response);
  //   // if (
  //   //   !response.ok
  //   // ) {
  //   //   return response;
  //   // }

  //   // if (
  //   //   (url.pathname.indexOf(".ts") !== -1
  //   //     || url.pathname.indexOf(".tsx") !== -1)
  //   //   && url.pathname.indexOf(".d.ts") === -1
  //   // ) {
  //   //   const transformed = (await transform(await response.text(), {
  //   //     format: "esm",
  //   //     loader: "tsx",
  //   //     target: "es2022",
  //   //   })).code;
  //   //   if (typeof transformed !== "string") {
  //   //     return new Response("500 transpile error", { status: 500 });
  //   //   }

  //   //   response = new Response(transformed, {
  //   //     ...response,
  //   //     status: 200,
  //   //     headers: {
  //   //       "Access-Control-Allow-Origin": "*",
  //   //       "Cache-Control": "no-cache",
  //   //       "Content-Type": "application/json; charset=UTF-8",
  //   //     },
  //   //   });
  //   // }
  //   // if (
  //   //   response.headers.get("Cache-Control") !== "no-cache" || isChunk
  //   // ) {
  //   //   await myCache.put(cacheKey, response.clone());
  //   // }
  //   return response;
  // } catch (err) {
  //   return new Response("oh no! " + JSON.stringify({ err }), {
  //     status: 500,
  //     statusText: `Could not fetch:  ${request.url}`,
  //   });
  // }
};

self.addEventListener("fetch", function(event) {
  return event.respondWith((() => createResponse(event.request))());
});
