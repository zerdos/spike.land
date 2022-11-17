import {
  __name,
  init_define_process
} from "./chunk-chunk-CIPP7HWN.mjs";

// js/load.ts
init_define_process();
var codeSpace = location.pathname.slice(1).split("/")[1];
async function start() {
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
__name(start, "start");
start();

export {
  codeSpace
};
