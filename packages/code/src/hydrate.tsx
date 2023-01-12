// import type { Root } from "react-dom/client";
// import uidV4 from "./uidV4.mjs";

// import type { EmotionCache } from "@emotion/cache";
// import { createRoot } from "react-dom/client";
import { md5 } from "./md5";
// import { render } from "./render";
// import { ab2str } from "./sab";
// import type { ICodeSession } from "./session";
// import { wait } from "./wait";
import "./superFetch";
export { md5 };

import { run } from "./ws";

// import { Workbox } from "workbox-window";

// const wb = new Workbox("/sw.js");

//  wb.register();

globalThis.assetHash = new URL(import.meta.url).searchParams.get("ASSET_HASH")!;
const paths = location.pathname.split("/");
const codeSpace = paths[2];

if (
  location.pathname === `/live/${codeSpace}`
) {
  run();
}

if (
  location.pathname !== `/live/${codeSpace}`
  && !location.pathname.endsWith("worker")
) {
  // const bc = new SharedWorker("/sharedWorker.js?ASSET_HASH=" + assetHash);
  // const name = md5(((self && self.crypto && self.crypto.randomUUID
  //   && self.crypto.randomUUID()) || (uidV4())).slice(
  //     0,
  //     8,
  //   ));
  // messagePort = bc.port;

  // bc.port.start();

  if (location.pathname.endsWith(`/live/${codeSpace}`)) {
    // run();
  } else {
    // const bc = new SharedWorker("/sharedWorker.js");
    // bc.port.addEventListener("message", async (event) => {
    //   if (event.data.type === "onconnect") {
    //     bc.port.postMessage({ codeSpace, name, type: "handshake" });
    //   } else {
    //     // const data = JSON.parse(ab2str(event.data))
    //     //          const { html, css, transpiled, i } = event.data.sess;
    //     //     unmountComponentAtNode(document.getElementById(codeSpace+"-css"));

    //     const { render } = (await import(
    //       `${location.origin}/live/${codeSpace}/index.js?refresh=${Math.random()}`
    //     ));
    //     //      document.body = `<div id="root" data-i="${i}" style="height: 100%;">${html.split(md5(transpiled)).join(`css`)}</div>`,
    //     render(document.getElementById(codeSpace+"-css"));
    //   }
    // });
    // load();
  }
}

// async function hydrate(
//   codeSpace: string,
//   sess?: ICodeSession,
//   port?: MessagePort,
// ) {
//   // if (sess?.i && sess.i === lastI) return;
//   // if (sess && md5(sess.transpiled) === hashToRendered) return;

//   // if (sess && sess.transpiled) {
//   //   hashToRendered = md5(sess.transpiled);
//   //   session = startSession(codeSpace, {
//   //     name: user,
//   //     state: sess,
//   //   });
//   // }

//   // if (sess && sess.i <= counterMax) return;
//   // requestAnimationFrame(async () => {

//   // if (r) {
//   //   r.unmount();
//   //   r = null;
//   // }
//   // const rt = document.getElementById("root")!;

//   // if (sess && sess.i && sess.html && sess.transpiled) {
//   //   const { i, css, html, transpiled } = sess;
//   //   rt?.setAttribute("data-i", String(i));
//   //   rt.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(
//   //     `css`,
//   //   );
//   // }
//   // const i = rt?.getAttribute("data-i") || 1;
//   // lastI = +i;
//   // counterMax = lastI;

//   // const {default: App, render} = (await import(`${location.origin}/live/${codeSpace}/index.js?refresh=${Math.random()}`));

//   // root = document.getElementById(
//   //   codeSpace + "-css",
//   // ) as unknown as HTMLDivElement;

//   // if (!root) {
//   //   document.getElementById("root")!.innerHTML = `<div style="height: 100%" id="${codeSpace}-css"></>`;
//   //   root = document.getElementById(
//   //     codeSpace + "-css",
//   //   ) as unknown as HTMLDivElement;
//   // }
//   // if (render) return render(root);
// }
