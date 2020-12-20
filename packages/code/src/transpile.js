import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
// import * as Comlink from "../../../dist/esm/comlink.mjs";

let transform;
export async function transpileCode(code, hasToReport) {
  transform = transform || await init();

  return await transform(code, hasToReport);
}
function init() {
  const worker = new Worker(
    "/code/src/transpile.worker.js",
    { type: "module" },
  );
  // WebWorkers use `postMessage` and therefore work with Comlink.
  transform = Comlink.wrap(worker);
  return transform;
}
init();
