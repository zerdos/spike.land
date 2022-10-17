import {
  expose
} from "./chunk-chunk-466MU7CN.mjs";
import {
  init_define_process
} from "./chunk-chunk-VOIE2EHU.mjs";
import "./chunk-chunk-VTSDAELY.mjs";

// js/prettierWorker.mjs
init_define_process();
self._prettierJs = self._prettierJs || null;
var prettier = {
  prettierJs: async (code) => {
    const t0 = performance.now();
    _prettierJs = _prettierJs || (await import("./chunk-prettierEsm-EP2UXCAA.mjs")).prettierJs;
    const t1 = performance.now();
    console.log(`importing took ${t1 - t0} milliseconds.`);
    const res = _prettierJs(code);
    const t2 = performance.now();
    console.log(`prettier took ${t2 - t1} milliseconds.`);
    return res;
  }
};
onconnect = function(event) {
  const port = event.ports[0];
  expose(prettier, port);
};
