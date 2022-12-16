import {
  run
} from "./chunk-chunk-S2GYK2GU.mjs";
import "./chunk-chunk-E2GQOZNW.mjs";
import "./chunk-chunk-C5ADGSEC.mjs";
import "./chunk-chunk-6RTOW2HB.mjs";
import "./chunk-chunk-QRXQG7Z4.mjs";
import "./chunk-chunk-ZZXLQP5V.mjs";
import {
  __name,
  init_define_process
} from "./chunk-chunk-MD2AOK3Y.mjs";

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
