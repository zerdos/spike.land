// import type { Root } from "react-dom/client";
// import uidV4 from "./uidV4.mjs";

// import type { EmotionCache } from "@emotion/cache";
// import { createRoot } from "react-dom/client";
import { mkdir } from "./fs";
import { md5 } from "./md5";
// import { render } from "./render";
// import { ab2str } from "./sab";
// import type { ICodeSession } from "./session";
// import { wait } from "./wait";
export { md5 };

import { run } from "./ws";

import { Workbox } from "workbox-window";
export const sw = new Workbox("/sw.js");

await sw.register();
import { render } from "./render";

// sw.messageSkipWaiting();
// if ("serviceWorker" in navigator) {

//   navigator.serviceWorker.register("/sw.js").then((sw) => {
//     navigator.serviceWorker.getRegistrations().then(
//       workers =>
//         Promise.all(
//           workers.filter(
//             (x) => x !== sw,
//           ).map(x => x.unregister()),
//         ),
//     )
//       .then(
//         () =>
//           navigator.serviceWorker.getRegistrations().then(r =>
//             r.filter(x => x.active).map(x => x !== sw && x.update())
//           ),
//       );
//   });
// }

const paths = location.pathname.split("/");
const codeSpace = paths[2];
mkdir("/");
mkdir("/live");
mkdir("/live/" + codeSpace);

if (
  location.pathname === `/live/${codeSpace}`
) {
  run();
} else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

  BC.onmessage = ({ data }) => {
    const { html, css, i } = data;
    document.getElementById(`${codeSpace}-css`)!.innerHTML = [`<style>`, css, `</style>`, html].join("");

    // `<div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
    // <style>${css}</style>
    // ${html}
    // </div>`;
  };
} else {
  render(
    document.getElementById(codeSpace + "-css")!,
    codeSpace,
    Number(document.getElementById(codeSpace + "-css")!.getAttribute("i")),
  );
}
