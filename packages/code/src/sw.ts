// import {precacheAndRoute} from 'workbox-precaching';
importScripts("/swVersion.js");

import { mkdir, readFile, writeFile } from "./memfs";

import { build, init, transpile } from "./shared";

// importScripts("/workerScripts/prettierEsm.js");

// import { transpile } from "./transpile.ts";

// import type FSD from "./memfs";
// import type * as FS from "./memfs";
declare const self:
  & ServiceWorkerGlobalScope
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };
// & ({ readdir: typeof FS.readdir });

// const { readFile, mkdir, writeFile } = self as unknown as typeof FSD;

export type {};

import { resetCSS } from "./getResetCss";
import HTML from "./index.html";
import { ICodeSession } from "./makeSess";
import { md5 } from "./md5";

// import { ReconnectingWebSocket } from "./ReconnectingWebSocket.js";

// let controller = new AbortController();
let started = false;

self.onmessage = async (event) => {
  if (event.data.type === "sharedworker") {
    globalThis.sharedWorker = event.data;
    const port = event.data.sharedWorkerPort;
    port.start();

    init(swVersion, port);
    started = true;
  }
};
//   controller.abort();
//   console.log({ event });
//   controller = new AbortController();

//   const signal = controller.signal;
//   const { data } = event;
//   const codeSpace = data.codeSpace;

//   if (signal.aborted) return null;

//   if (data.type === "prerender") {
//     // setTimeout(async () => {
//     if (signal.aborted) return;
//     // if (data.type === "prerender" && data.code && !data.html) {
//       // try {
//         // await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
//         // await writeFile(`/live/${codeSpace}/index.js`, transpiled);
//       // } catch {
//         // await unlink(`/live/${codeSpace}/index.tsx`);
//         // await unlink(`/live/${codeSpace}/index.js`);
//         // await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
//         // await writeFile(`/live/${codeSpace}/index.js`, transpiled);
//       // }
//     }
//     //  }, 200);
//   }

//   if (signal.aborted) return null;
//   return event.ports[0].postMessage({ ...data, transpiled });
// };

const putInCache = async (request: Request, response: Response) => {
  const cache = await caches.open(self.swVersion);
  await cache.put(request, response);
};

const cacheFirst = async (request: Request) => {
  if (request.url.indexOf("/live/") === -1) {
    const cache = await caches.open(self.swVersion);
    const responseFromCache = await cache.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

const fakeBackend = async (request: Request) => {
  const url = new URL(
    request.url,
  );

  if (url.origin !== self.location.origin || request.method === "POST") {
    return fetch(request);
  }

  const paths = url.pathname.split("/");

  if (paths[1] === "live") {
    const codeSpacePath = paths[2];
    const isFile = codeSpacePath.indexOf(".") !== -1;
    const codeSpace = isFile ? codeSpacePath.split(".")[0] : codeSpacePath;

    const { code, css, html, i } = await fetch(
      `${url.origin}/live/${codeSpace}/session.json`,
    ).then((x) => x.json() as unknown as ICodeSession);

    if (codeSpacePath.endsWith(".mjs")) {
      const resp = await build({ codeSpace, origin: url.origin });

      return new Response(resp, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cache-Control": "no-cache",

          content_hash: md5(resp),
          "Content-Type": "application/javascript; charset=UTF-8",
        },
      });
    }

    if (
      url.pathname === `/live/${codeSpace}/iframe`
      || url.pathname === `/live/${codeSpace}/`
      || url.pathname === `/live/${codeSpace}/public`
      || url.pathname === `/live/${codeSpace}/dehydrated`
    ) {
      // return renderToStream("clock3");

      const respText = HTML.replace(
        "/**reset*/",
        resetCSS + css,
      ).replace(
        "<script src=\"/swVersion.js\"></script>",
        `<script>
      window.swVersion = "${self.swVersion}"
      </script>`,
      )
        .replace("ASSET_HASH", self.swVersion)
        .replace(
          `<div id="root"></div>`,
          `<div id="root" style="height: 100%;">
        <div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
          ${html}
        </div>
    </div>`,
        );

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
    try {
      if (url.pathname.startsWith(`/live/${codeSpace}/index.js`) && started) {
        // const code = await readFile(
        //   `/live/${codeSpace}/index.tsx`,
        // ) as string;
        const trp = await Promise.race([
          fetch(
            `${url.origin}/live/${codeSpace}/index.js`,
          ).then((x) => x.text()),
          (async () => {
            const trp = await transpile({ code, originToUse: location.origin });

            await mkdir(`/live/${codeSpace}`);
            await writeFile(
              `/live/${codeSpace}/index.js`,
              trp,
            );
            return trp;
          })(),
        ]);

        return new Response(trp, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",

            content_hash: md5(trp),
            "Content-Type": "application/javascript; charset=UTF-8",
          },
        });
      }
      if (url.pathname.startsWith(`/live/${codeSpace}/index.mjs`)) {
        // const code = await readFile(
        //   `/live/${codeSpace}/index.tsx`,
        // ) as string;

        const trp = await readFile(`/live/${codeSpace}/index.mjs`).catch(
          async () => fetch(location.origin + `/live/${codeSpace}/index.mjs`).then((x) => x.text()),
        );

        return new Response(trp, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",

            content_hash: md5(trp),
            "Content-Type": "application/javascript; charset=UTF-8",
          },
        });
      }
    } catch (err) {
      console.error({ err }, "some error again");
    }
  }

  return cacheFirst(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(fakeBackend(event.request));
});

// self.onfetch = (event)=>event.respondWith(fakeBackend((event.request)));
