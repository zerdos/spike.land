import type { Root } from "react-dom/client";
import uidV4 from "./uidV4.mjs";

import type { EmotionCache } from "@emotion/cache";
import { createRoot } from "react-dom/client";
import { md5 } from "./md5";
import { ab2str } from "./sab";
import type { ICodeSession } from "./session";
import { wait } from "./wait";

export { md5 };

import { run } from "./ws";

import { Workbox } from "workbox-window";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");

  wb.register();
}

globalThis.assetHash = new URL(import.meta.url).searchParams.get("ASSET_HASH")!;
const paths = location.pathname.split("/");
const codeSpace = paths[2];

if (
  location.pathname === `/live/${codeSpace}`
  || location.pathname === `/live/${codeSpace}/`
) {
  run();
}

if (
  location.pathname !== `/live/${codeSpace}`
  && !location.pathname.endsWith("worker")
) {
  const bc = new SharedWorker("/sharedWorker.js?ASSET_HASH=" + assetHash);
  const name = md5(((self && self.crypto && self.crypto.randomUUID
    && self.crypto.randomUUID()) || (uidV4())).slice(
      0,
      8,
    ));
  // messagePort = bc.port;

  bc.port.addEventListener("message", async (event) => {
    if (event.data.type === "onconnect") {
      bc.port.postMessage({ codeSpace, name, type: "handshake" });
    } else {
      const data = JSON.parse(ab2str(event.data));
      //          const { html, css, transpiled, i } = event.data.sess;
      //     unmountComponentAtNode(document.getElementById(codeSpace+"-css"));

      const { render } = (await import(
        `${location.origin}/live/${codeSpace}/index.js?refresh=${Math.random()}`
      ));
      //      document.body = `<div id="root" data-i="${i}" style="height: 100%;">${html.split(md5(transpiled)).join(`css`)}</div>`,
      render;
      await hydrate(data.codeSpace, data.sess, bc.port);
    }
  });
  bc.port.start();

  if (!location.pathname.endsWith("worker")) {
    const { appFactory } = await import("./starter");

    const BC = new BroadcastChannel(location.href);
    BC.onmessage = async (e) => {
      if (e.data.html) return;
      if (e.data.codeSpace !== codeSpace) return;
      if (e.data.counter <= counterMax) return;
      counterMax = e.data.counter;
      controller.abort();
      controller = new AbortController();
      const data = e.data;
      // render(data.transpiled);
      const appId = md5(data.transpiled);
      if (hashToRendered === appId) return;
      const App = await (appFactory(data.transpiled));
      // const rootDiv = document.createElement("div");
      // divs[appId] = rootDiv;
      // const root = createRoot(rootDiv);
      if (!r) {
        root = document.getElementById("root")!;
        r = createRoot(document.getElementById("root")!);
      }
      r.render(<App appId={appId}></App>);

      while (true) {
        await wait(50);
        if (controller.signal.aborted) return;
        const html = root.innerHTML;

        if (html.indexOf(appId)) {
          const css = mineFromCaches(globalThis.eCaches[appId]);
          BC.postMessage({ ...data, html, css });
        }
      }
    };
  } else {
  }
  // hydrate(codeSpace);
}
if (location.pathname.endsWith(`/live/${codeSpace}`)) {
  // run();
} else {
  const bc = new SharedWorker("/sharedWorker.js");
  bc.port.addEventListener("message", async (event) => {
    if (event.data.type === "onconnect") {
      bc.port.postMessage({ codeSpace, name, type: "handshake" });
    } else {
      // const data = JSON.parse(ab2str(event.data))
      //          const { html, css, transpiled, i } = event.data.sess;
      //     unmountComponentAtNode(document.getElementById(codeSpace+"-css"));

      const { render } = (await import(
        `${location.origin}/live/${codeSpace}/index.js?refresh=${Math.random()}`
      ));
      //      document.body = `<div id="root" data-i="${i}" style="height: 100%;">${html.split(md5(transpiled)).join(`css`)}</div>`,
      render(document.getElementById("root"));
    }
  });
  // load();
}

let counterMax = 0;
let hashToRendered = "";
const divs = {};
let r: Root | null;
let root: HTMLElement;

let controller = new AbortController();

async function hydrate(
  codeSpace: string,
  sess?: ICodeSession,
  port?: MessagePort,
) {
  // if (sess?.i && sess.i === lastI) return;
  // if (sess && md5(sess.transpiled) === hashToRendered) return;

  // if (sess && sess.transpiled) {
  //   hashToRendered = md5(sess.transpiled);
  //   session = startSession(codeSpace, {
  //     name: user,
  //     state: sess,
  //   });
  // }

  // if (sess && sess.i <= counterMax) return;
  // requestAnimationFrame(async () => {

  // if (r) {
  //   r.unmount();
  //   r = null;
  // }
  // const rt = document.getElementById("root")!;

  // if (sess && sess.i && sess.html && sess.transpiled) {
  //   const { i, css, html, transpiled } = sess;
  //   rt?.setAttribute("data-i", String(i));
  //   rt.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(
  //     `css`,
  //   );
  // }
  // const i = rt?.getAttribute("data-i") || 1;
  // lastI = +i;
  // counterMax = lastI;

  // const {default: App, render} = (await import(`${location.origin}/live/${codeSpace}/index.js?refresh=${Math.random()}`));

  // root = document.getElementById(
  //   codeSpace + "-css",
  // ) as unknown as HTMLDivElement;

  // if (!root) {
  //   document.getElementById("root")!.innerHTML = `<div style="height: 100%" id="${codeSpace}-css"></>`;
  //   root = document.getElementById(
  //     codeSpace + "-css",
  //   ) as unknown as HTMLDivElement;
  // }
  // if (render) return render(root);
}

function mineFromCaches(cache: EmotionCache) {
  const key = cache.key;
  try {
    return Array.from(
      document.querySelectorAll(`style[data-emotion="${cache.key}"]`),
    ).map((x) => x.textContent).join(
      "\n",
    );
  } catch {
    // const keys = Object.keys(cache.inserted).map((x) => `.${cache.key}-${x}`);
    return Array.from(document.styleSheets).map((x) => {
      try {
        return x.cssRules[0] as CSSPageRule;
      } catch {
        return null;
      }
    }).filter((x) => x && x.selectorText && x.selectorText.indexOf(key) !== -1)
      .map((x) => x!.cssText)
      // .filter((x) => x && keys.includes(x.selectorText)).map((x) => x!.cssText)
      .join("\n");
  }
}
