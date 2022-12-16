import {
  run
} from "./chunk-chunk-D4CMAV5G.mjs";
import "./chunk-chunk-KF2G5IYO.mjs";
import "./chunk-chunk-D3EKHBUS.mjs";
import "./chunk-chunk-3LGVA7LC.mjs";
import "./chunk-chunk-I52D4BQZ.mjs";
import "./chunk-chunk-2ID5YM7I.mjs";
import {
  __name,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/load.ts
init_define_process();
var load_default = /* @__PURE__ */ __name(async () => {
  const codeSpace = location.pathname.slice(1).split("/")[1];
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
}, "default");
export {
  load_default as default
};
