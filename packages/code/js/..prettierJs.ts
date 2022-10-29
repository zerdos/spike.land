import { wrap } from "comlink";
type PrettierFN = {
  prettierJs: (code: string) => Promise<string | null>;
};

export const prettierJs = async (code: string) => {
  const prettier = init();
  return prettier.prettierJs(code);
};

let _prettierJs: ((code: string) => string | null) | null = null;

const fallback = {
  prettierJs: async (code: string) => {
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

let _prettier: PrettierFN | null = null;
function init() {
  if (_prettier) return _prettier;

  if (!supportsWorkerType()) return _prettier = fallback;
  try {
    const worker = new SharedWorker(
      new URL("prettierWorker.mjs", location.origin),
      { type: "module" },
    );
    const wrapped = wrap<PrettierFN>(worker.port);
    return _prettier = wrapped;
  } catch {
    return _prettier = fallback;
  }
}

function supportsWorkerType() {
  let supports = false;
  const tester = {
    get type() {
      supports = true;
      return "module";
    }, // it's been called, it's supported
  };
  try {
    // We use "blob://" as url to avoid an useless network request.
    // This will either throw in Chrome
    // either fire an error event in Firefox
    // which is perfect since
    // we don't need the worker to actually start,
    // checking for the type of the script is done before trying to load it.
    new Worker("blob://", tester as { type: "module" });
  } finally {
    return supports;
  }
}
