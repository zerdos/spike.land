import "es-module-shims";
import "./react-jsx-runtime.mjs";

import importmap from "./importmap.json";

// importShim.addImportMap(importmap);

const {
  React,
  ReactDOM,
  ReactDOMClient,
  ReactJSXRuntime,
  emotionReact,
  emotionReactJsxRuntime,
  ReactDOMServer,
  createEmotionCache,
  styled,
  FramerMotion,
} = globalThis;

const mapTable = {
  "react": React,
  "react-dom": ReactDOM,
  "react-dom/client": ReactDOMClient,
  "@emotion/react": emotionReact,
  "@emotion/styled": styled,
  "@emotion/cache": createEmotionCache,
  "@emotion/react/jsx-runtime": emotionReactJsxRuntime,
  "react/jsx-runtime": ReactJSXRuntime,
  "react-dom/server": ReactDOMServer,
  "framer-motion": FramerMotion,
};

let loading = [];

globalThis.require = (pkg) => {
  if (mapTable[pkg]) return;
  loading.add[pkg];
  window.importShim(pkg).then(x => mapTable[pkg] = x).then(() => loading = loading.filter(x => x !== pkg)).then(() => {
    if (mapTable[pkg]) return;
    console.error("Error - require: " + pkg + " not found");
  });
};

const { hydrateRoot, createRoot } = ReactDOMClient;

const imp = {};

Object.keys(importmap.imports).map((k) => imp[k] = location.origin + importmap.imports[k]);

importShim.addImportMap({ imports: imp });

const codeSpace = location.pathname.slice(1).split("/")[1];

const start = (dry = false) =>
  import(
    `${location.origin}/live/${codeSpace}/mST.mjs`
  ).then(({
    mST,
    codeSpace,
    address,
  }) =>
    import(`${location.origin}/ws.mjs`).then(({ run }) =>
      run({
        mST,
        dry,
        codeSpace,
        address,
      })
    )
  );

if (location.pathname.endsWith("/hydrated")) {
  let i = document.getElementById("root")?.getAttribute("data-i");
  let unmount = () => {};
  const bc = new BroadcastChannel(location.origin);
  bc.onmessage = (event) => {
    if (
      event.data.codeSpace === codeSpace
    ) {
      const rootDiv = document.createElement("div");
      rootDiv.style.height = "100%";

      i = event.data.sess.i;

      const root = createRoot(rootDiv);

      const current = i;
      importShim(
        `${location.origin}/live/${codeSpace}/index.js/${i}`,
      ).then((mod) => i === current && root.render(mod.default())).then(
        () => document.querySelectorAll("#root>div>div")[0].replaceWith(rootDiv),
      ).then(unmount).then(() =>
        unmount = () => {
          root.unmount();
        }
      );
    }
  };
  importShim(
    `${location.origin}/live/${codeSpace}/index.js/${i}`,
  ).then((mod) => hydrateRoot(document.querySelectorAll("#root>div>div")[0], mod.default()));
  // .then(() => {
  //   setTimeout(() => {
  //     const dry = true;
  //     start(dry);
  //     import("./prettierEsm").then((x) => x.prettierJs("dry"));
  //     import("./esbuildEsm").then((x) => x.transform("dry"));
  //   }, 1000);
  // });
} else {
  const dry = false;
  start(dry);
}
