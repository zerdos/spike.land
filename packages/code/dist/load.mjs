import {
  run
} from "./chunk-chunk-KZBX7RW7.mjs";
import "./chunk-chunk-6V226VSY.mjs";
import "./chunk-chunk-5MM6HVLC.mjs";
import "./chunk-chunk-YT4MUIZR.mjs";
import "./chunk-chunk-55HSG64V.mjs";
import "./chunk-chunk-AQ4T23TJ.mjs";
import "./chunk-chunk-VJ4PDW5K.mjs";
import "./chunk-chunk-3LGVA7LC.mjs";
import "./chunk-chunk-JCFFDELF.mjs";
import "./chunk-chunk-IUZYA32I.mjs";
import "./chunk-chunk-6WNVMO5F.mjs";
import "./chunk-chunk-QZAQGZXD.mjs";
import "./chunk-chunk-I52D4BQZ.mjs";
import "./chunk-chunk-EBBCSVKI.mjs";
import "./chunk-chunk-3VTVDFXV.mjs";
import "./chunk-chunk-WOINJVTR.mjs";
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
