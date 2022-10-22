import "es-module-shims";
import { runtime } from "./react-jsx-runtime.production.min.cjs";

importShim.addImportMap(
  JSON.parse(document.querySelector("script[type=importmap]")?.innerHTML!),
);

const codeSpace = location.pathname.slice(1).split("/")[1];

runtime();

import(`${location.origin}/live/${codeSpace}/mST.mjs`).then(({
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
