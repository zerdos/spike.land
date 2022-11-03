// js/load.ts
var codeSpace = location.pathname.slice(1).split("/")[1];
async function start() {
  if (!globalThis.React?.Children) {
    queueMicrotask(() => start());
    return;
  }
  const { run } = await importShim(`${location.origin}/ws.mjs`);
  const {
    mST,
    address
  } = await import(`${location.origin}/live/${codeSpace}/mST.mjs`);
  run({
    mST,
    dry: false,
    codeSpace,
    address
  });
}
start();
export {
  codeSpace
};
