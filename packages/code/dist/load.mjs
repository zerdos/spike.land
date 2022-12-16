import {
  run
} from "./chunk-chunk-BF5EDLAE.mjs";
import "./chunk-chunk-GCCGEDAP.mjs";
import "./chunk-chunk-GRIIDPXN.mjs";
import "./chunk-chunk-VZGGKRO6.mjs";
import "./chunk-chunk-PPQZUDJA.mjs";
import "./chunk-chunk-I52D4BQZ.mjs";
import "./chunk-chunk-YT4MUIZR.mjs";
import "./chunk-chunk-P7I5TL5D.mjs";
import "./chunk-chunk-AAAHZKB5.mjs";
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
