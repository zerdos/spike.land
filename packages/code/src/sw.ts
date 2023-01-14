import type {} from "./transpile";
importScripts("/workerScripts/transpile.js");
// importScripts("/workerScripts/ipfs-core.js");
importScripts("/workerScripts/prettierEsm.js");

import type * as FS from "./fs";
declare const self:
  & ServiceWorkerGlobalScope
  & { files: { [key: string]: string }; fileCacheName: string }
  & ({ readdir: typeof FS.readdir });
importScripts("/workerScripts/fs.js");
export type {};

import { resetCSS } from "./getResetCss";
import { importMapReplace } from "./importMapReplace";
import HTML from "./index.html";
import { md5 } from "./md5";
import ReconnectingWebSocket from "./reconnWs.mjs";

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
        const transpiled = importMapReplace(await transpile(data.code), location.origin);
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

  const transpiled = importMapReplace(await transpile(data.code), location.origin);

  if (data.type === "prerender") {
    // setTimeout(async () => {
    if (signal.aborted) return;
    if (data.type === "prerender" && data.code && !data.html) {
      try {
        await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
        await writeFile(`/live/${codeSpace}/index.js`, transpiled);
      } catch {
        await unlink(`/live/${codeSpace}/index.tsx`);
        await unlink(`/live/${codeSpace}/index.js`);
        await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
        await writeFile(`/live/${codeSpace}/index.js`, transpiled);
      }
    }
    //  }, 200);
  }

  if (signal.aborted) return null;
  return event.ports[0].postMessage({ ...data, transpiled });
};

const createResponse = async (request: Request) => {
  let url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method === "POST") {
    return fetch(request);
  }

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
    </div>`,
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

  return fetch(request);
};

self.addEventListener("fetch", function(event) {
  return event.respondWith((() => createResponse(event.request))());
});
