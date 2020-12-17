import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
// import * as Comlink from "../../../dist/esm/comlink.mjs";

let transform;
export async function transpileCode(code) {
    transform = transform || await init();

    
    return await transform(code)

}
function init() {
    const worker = new Worker("./dist/transpile.worker.js");
    // WebWorkers use `postMessage` and therefore work with Comlink.
    transform = Comlink.wrap(worker);
    return transform;
}
init();
