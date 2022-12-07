import {
  run
} from "./chunk-chunk-AX7X5SXZ.mjs";
import "./chunk-chunk-PKGMXMSM.mjs";
import "./chunk-chunk-OFBUCJBB.mjs";
import "./chunk-chunk-ISWAK2FR.mjs";
import "./chunk-chunk-KPX7O56F.mjs";
import "./chunk-chunk-TJMFR74C.mjs";
import "./chunk-chunk-OOGKLUN3.mjs";
import "./chunk-chunk-66CUMYIH.mjs";
import "./chunk-chunk-T4T4TGH4.mjs";
import "./chunk-chunk-FJRKYGWZ.mjs";
import "./chunk-chunk-YJ6EJ55D.mjs";
import "./chunk-chunk-URQXE74X.mjs";
import "./chunk-chunk-I52D4BQZ.mjs";
import "./chunk-chunk-OIMXIXUK.mjs";
import "./chunk-chunk-DRFYPBHK.mjs";
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
