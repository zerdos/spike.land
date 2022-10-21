import { run } from "./ws";
import "es-module-shims";

importShim.addImportMap(
  JSON.parse(document.querySelector("script[type=importmap]").innerHTML),
);

const codeSpace = location.pathname.slice(1).split("/")[1];
(async () => {
  const {
    mST,
    address,
  } = await import(`${location.origin}/live/${codeSpace}/mST.mjs`);

  await run({
    mST,
    codeSpace,
    address,
  });
})();
