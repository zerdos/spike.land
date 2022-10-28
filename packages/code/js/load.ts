import "es-module-shims";
import importmap from "./importmap.json";
import { ReactDOMClient } from "./react-jsx-runtime.js";

// importShim.addImportMap(importmap);
importShim.addImportMap(
  importmap,
);

const codeSpace = location.pathname.slice(1).split("/")[1];

if (location.pathname.endsWith("/hydrated")) {
  import(
    `${location.origin}/live/${codeSpace}/index.js`
  ).then((mod) => {
    ReactDOMClient.hydrateRoot(document.querySelectorAll("#root>div>div")[0], mod.default());
    setTimeout(() => {
      imort
    }, 1000));
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
