import { run } from "./ws";
import "es-module-shims";

importShim.addImportMap(
  JSON.parse(document.querySelector("script[type=importmap]")?.innerHTML!),
);

const codeSpace = location.pathname.slice(1).split("/")[1];

import(`${location.origin}/live/${codeSpace}/mST.mjs`).then(({
  mST,
  codeSpace,
  address,
}) =>
  run({
    mST,
    codeSpace,
    address,
  })
);
