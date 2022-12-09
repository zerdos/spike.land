import {
  run
} from "./chunk-chunk-UQZETIPT.mjs";
import "./chunk-chunk-ZA2JVZ6G.mjs";
import "./chunk-chunk-64YS76IM.mjs";
import "./chunk-chunk-MJOZDA7L.mjs";
import "./chunk-chunk-YELOM6WC.mjs";
import "./chunk-chunk-E4MXU7FZ.mjs";
import "./chunk-chunk-GX2FQOMI.mjs";
import "./chunk-chunk-ERWO6XQY.mjs";
import "./chunk-chunk-J7YAFKFM.mjs";
import "./chunk-chunk-T5KQ322J.mjs";
import "./chunk-chunk-DAKTFMGQ.mjs";
import "./chunk-chunk-WVRKRCYU.mjs";
import "./chunk-chunk-EPWX73L4.mjs";
import "./chunk-chunk-TV72YX6Y.mjs";
import "./chunk-chunk-FUR34L7E.mjs";
import "./chunk-chunk-J2SPE25R.mjs";
import {
  __name,
  init_define_process
} from "./chunk-chunk-QZIPOEMS.mjs";

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
