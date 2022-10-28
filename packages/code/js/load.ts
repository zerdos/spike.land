import "es-module-shims";

import importmap from "./importmap.json";
import { hydrateRoot } from "./react-jsx-runtime.js";

// importShim.addImportMap(importmap);

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
  importShim(
    `${location.origin}/live/${codeSpace}/index.js`,
  ).then((mod) => hydrateRoot(document.querySelectorAll("#root>div>div")[0], mod.default())).then(() =>
    setTimeout(() => {
      const dry = true;
      start(dry);
      import("./prettierJs").then((x) => x.prettierJs("dry"));
      import("./esbuildEsm").then((x) => x.transform("dry"));
    }, 1000)
  );
} else {
  const dry = false;
  start(dry);
}
