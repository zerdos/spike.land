import {
  umdTransform
} from "./chunk-chunk-3JD6LKV7.mjs";
import "./chunk-chunk-EXKZY7I4.mjs";
import "./chunk-chunk-TZJXJSL2.mjs";
import {
  init_define_process
} from "./chunk-chunk-AIJYQNQW.mjs";

// js/load.ts
init_define_process();
Object.assign(globalThis, { umdTransform });
(async () => {
  await import("./react-jsx-runtime.mjs");
  const { hydrateRoot, createRoot } = ReactDOMClient;
  const codeSpace = location.pathname.slice(1).split("/")[1];
  const start = (dry = false) => import(`${location.origin}/live/${codeSpace}/mST.mjs`).then(
    ({
      mST,
      codeSpace: codeSpace2,
      address
    }) => import(`${location.origin}/ws.mjs`).then(
      ({ run }) => run({
        mST,
        dry,
        codeSpace: codeSpace2,
        address
      })
    )
  );
  if (location.pathname.endsWith("/hydrated")) {
    let i = document.getElementById("root")?.getAttribute("data-i");
    let unmount = () => {
    };
    const bc = new BroadcastChannel(location.origin);
    bc.onmessage = (event) => {
      if (event.data.codeSpace === codeSpace) {
        const rootDiv = document.createElement("div");
        rootDiv.style.height = "100%";
        i = event.data.sess.i;
        const root = createRoot(rootDiv);
        const current = i;
        importShim(
          `${location.origin}/live/${codeSpace}/index.js/${i}`
        ).then((mod) => i === current && root.render(mod.default())).then(
          () => document.querySelectorAll("#root>div>div")[0].replaceWith(rootDiv)
        ).then(unmount).then(
          () => unmount = () => {
            root.unmount();
          }
        );
      }
    };
    importShim(
      `${location.origin}/live/${codeSpace}/index.js/${i}`
    ).then((mod) => hydrateRoot(document.querySelectorAll("#root>div>div")[0], mod.default()));
  } else {
    const dry = false;
    start(dry);
  }
})();
