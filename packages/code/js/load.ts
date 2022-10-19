import "es-module-shims";

importShim.addImportMap(
  JSON.parse(document.querySelector("script[type=importmap]").innerHTML),
);
const codeSpace = location.pathname.slice(1).split("/")[1];

(async () => {
  const mod = await Promise.all([
    importShim(`/live/${codeSpace}/mST.mjs`),
    importShim("ws.mjs"),
    importShim(`/live/${codeSpace}/index.js`),
  ]);

  const { mST, assets, address } = mod[0];
  const { run } = mod[1];
  run({
    mST,
    codeSpace,
    address,
    assets,
  });
})();
