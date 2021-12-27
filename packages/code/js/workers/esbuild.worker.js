self.importScripts("https://unpkg.com/comlink@4.3.1/dist/umd/comlink.min.js");
self.importScripts(
  "https://unpkg.com/esbuild-wasm@0.14.8/lib/browser.min.js",
);

const { Comlink } = self;
// const { transform } = Babel;
const { expose } = Comlink;

let initializedEsbuild = null;

const init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.8/esbuild.wasm",
});

const transform = (code) => esbuild.transform(code, { loader: "tsx" });

addEventListener(
  "connect",
  async (e) => await init && expose(transform, e.ports[0]),
);

addEventListener("message", async (event) => {
  if (event.data.comlinkInit) {
    await init;
    expose(transform, event.data.port);
  }
});
