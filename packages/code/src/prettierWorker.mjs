import * as Comlink from "comlink";

self._prettierJs = self._prettierJs || null;

const prettier = {
  prettierJs: async (code) => {
    const t0 = performance.now();
    _prettierJs = _prettierJs || (await import("./prettierEsm")).prettierJs;
    const t1 = performance.now();
    console.log(`importing took ${t1 - t0} milliseconds.`);
    const res = _prettierJs(code);
    const t2 = performance.now();
    console.log(`prettier took ${t2 - t1} milliseconds.`);
    return res;
  },
};

onconnect = function(event) {
  const port = event.ports[0];

  Comlink.expose(prettier, port);
};
