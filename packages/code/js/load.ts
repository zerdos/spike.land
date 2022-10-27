import "es-module-shims";
import importmap from "./importmap.json";
import { runtime } from "./react-jsx-runtime.production.min.cjs";

// importShim.addImportMap(importmap);
importShim.addImportMap(
  importmap,
);

const codeSpace = location.pathname.slice(1).split("/")[1];

runtime();

if (location.pathname.endsWith("/hydrated")) {
  import(
    `${location.origin}/live/${codeSpace}/index.js`
  ).then((mod) => {
    globalThis.ReactDOMClient.hydrateRoot(document.querySelectorAll("#root>div>div")[0], mod.default());
  });
} else {
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
        codeSpace,
        address,
      })
    )
  );
}
