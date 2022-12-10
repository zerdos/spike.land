import {
  run
} from "./chunk-chunk-EHYW5LLA.mjs";
import "./chunk-chunk-TN4QAARL.mjs";
import "./chunk-chunk-SI6HZSFG.mjs";
import "./chunk-chunk-KJNWZ244.mjs";
import "./chunk-chunk-AIF5T3IG.mjs";
import "./chunk-chunk-LRLKPUSO.mjs";
import "./chunk-chunk-YPGGBUFE.mjs";
import "./chunk-chunk-KB2TDL5H.mjs";
import "./chunk-chunk-Y3K3LM36.mjs";
import "./chunk-chunk-TLBU2EEL.mjs";
import "./chunk-chunk-ZR5PUSFB.mjs";
import "./chunk-chunk-L7TXLISO.mjs";
import "./chunk-chunk-I52D4BQZ.mjs";
import "./chunk-chunk-CVEDMV5E.mjs";
import "./chunk-chunk-NWRVLYEP.mjs";
import "./chunk-chunk-FCWF5IZB.mjs";
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
