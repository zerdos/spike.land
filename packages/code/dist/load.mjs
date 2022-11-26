import {
  run
} from "./chunk-chunk-URBLGNEU.mjs";
import "./chunk-chunk-K4ZDFRUQ.mjs";
import "./chunk-chunk-WXF4QHVQ.mjs";
import "./chunk-chunk-FFMS35Y7.mjs";
import "./chunk-chunk-JMEQZLMX.mjs";
import "./chunk-chunk-TIL35SAU.mjs";
import "./chunk-chunk-CTKH5FCC.mjs";
import "./chunk-chunk-MYCITQ4M.mjs";
import "./chunk-chunk-FJRKYGWZ.mjs";
import "./chunk-chunk-FHIP3LN4.mjs";
import "./chunk-chunk-ZL6L5B7C.mjs";
import "./chunk-chunk-5TECY34M.mjs";
import "./chunk-chunk-M3XF32XQ.mjs";
import "./chunk-chunk-UX3KX3KY.mjs";
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
