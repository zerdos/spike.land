import {
  expose
} from "./chunk-chunk-MIVI5CB5.mjs";
import {
  init_define_process
} from "./chunk-chunk-3B7BB7RQ.mjs";
import "./chunk-chunk-J5KS4AN4.mjs";

// js/prettierWorker.mjs
init_define_process();
self._prettierJs = self._prettierJs || null;
var prettier = {
  prettierJs: async (code) => {
    const t0 = performance.now();
    _prettierJs = _prettierJs || (await import("./chunk-prettierEsm-O72JWOX6.mjs")).prettierJs;
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
