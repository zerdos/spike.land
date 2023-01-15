// import {precacheAndRoute} from 'workbox-precaching';

import type {} from "./transpile";
// importScripts("/workerScripts/transpile.js");
// importScripts("/workerScripts/prettierEsm.js");
import { transpile } from "./shared";

import type * as FS from "./fs";
declare var self:
  & ServiceWorkerGlobalScope
  & { files: { [key: string]: string }; fileCacheName: string }
  // & { transpile: typeof Transpile }
  & ({ readdir: typeof FS.readdir });
importScripts("/workerScripts/fs.js");
import type FSD from "./fs";
const { readFile, unlink, writeFile } = self as unknown as typeof FSD;
// const { transpile } = self;
export type {};

import localforage from "localforage";
import { resetCSS } from "./getResetCss";
import { importMapReplace } from "./importMapReplace";
import HTML from "./index.html";
import { createPatch, ICodeSession, makeHash, makeSession } from "./makeSess";
import { md5 } from "./md5";
// import { ReconnectingWebSocket } from "./ReconnectingWebSocket.js";

const connections: {
  [key: string]: {
    websocket: WebSocket;
    user: {};
    i: number;
    oldSession: ICodeSession;
  };
} = {};

let controller = new AbortController();

self.onmessage = async (event) => {
  if (event.data.type === "ata") {
    globalThis.sharedWorker = event.data;
    event.data.port.start();
  }
  controller.abort();
  console.log({ event });
  controller = new AbortController();

  const signal = controller.signal;
  const { data } = event;
  const codeSpace = data.codeSpace;
  await setConnections(codeSpace);

  if (signal.aborted) return null;

  const transpiled = importMapReplace(await transpile(data.code), location.origin);

  if (data.type === "prerender") {
    // setTimeout(async () => {
    if (signal.aborted) return;
    if (data.type === "prerender" && data.code && !data.html) {
      try {
        // await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
        await writeFile(`/live/${codeSpace}/index.js`, transpiled);
      } catch {
        // await unlink(`/live/${codeSpace}/index.tsx`);
        await unlink(`/live/${codeSpace}/index.js`);
        // await writeFile(`/live/${codeSpace}/index.tsx`, data.code);
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

  if (paths[1] === "live") {
    const codeSpace = paths[2];

    const { code, css, html, i } = JSON.parse(
      await readFile(
        `/live/${codeSpace}/session.json`,
      ) as string || await fetch(`${url.origin}/live/${codeSpace}/session.json`).then(x => x.json()),
    );

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
      if (url.pathname === `/live/${codeSpace}/index.js`) {
        await setConnections(codeSpace);

        // const code = await readFile(
        //   `/live/${codeSpace}/index.tsx`,
        // ) as string;

        const trp = importMapReplace(await transpile(code), location.origin);

        await writeFile(
          `/live/${codeSpace}/index.js`,
          trp,
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
    } catch {
      console.log("some error again");
    }
  }

  return fetch(request);
};

self.addEventListener("fetch", function(event) {
  return event.respondWith((() => createResponse(event.request))());
});

async function setConnections(codeSpace: string) {
  const user = await localforage.getItem("user") || await localforage.setItem("user", md5(self.crypto.randomUUID()));
  connections[codeSpace] = connections[codeSpace] || await (async (codeSpace) => {
    console.log("new WS conn to: " + `wss://${location.host}/live/${codeSpace}/websocket`);
    const websocket = new WebSocket(
      `wss://${location.host}/live/${codeSpace}/websocket`,
    );
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

    const session = {
      BC,
      websocket,
      user,
      i: 0,
      oldSession: makeSession(await (await fetch(`/live/${codeSpace}/session`)).json()),
    };
    BC.onmessage = async ({ data }) => {
      if (data.i > session.i && (data.hashCode || data.newHash)) {
        session.i = data.i;

        data.name = session.user;
        websocket.send(JSON.stringify(data));
      }
      if (data.i >= session.i && data.html && data.code) {
        session.i = data.i;
        if (makeHash(data) !== makeHash(session.oldSession)) {
          const patchMessage = createPatch(session.oldSession, data);

          BC.postMessage({ ...patchMessage, name: session.user });

          websocket.send(JSON.stringify({ ...patchMessage, name: session.user }));
          session.oldSession = makeSession(data);
        }
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
  })(codeSpace);
}
