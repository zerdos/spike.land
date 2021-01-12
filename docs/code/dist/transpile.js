import versions from "./versions.js";
/** @type {(arg0: string, arg1: boolean) => any} */
let transform;
/**
 *
 * @param {string} code
 */
export async function transpileCode(code) {
    transform = transform || await (await init());
    const transformed = await transform(code, false);
    return transformed;
}
async function init() {
    console.log("INIT INIT");
    const v = versions();
    const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);
    let shared;
    let worker = (typeof SharedWorker === "undefined")
        ? new Worker(`src/transpile.worker.js`)
        : (shared = new SharedWorker(
        // window.location.hostname === "[::1]"
        `src/transpile.worker.js`)).port.start();
    //@ts-ignore
    if (shared)
        worker = shared.port;
    const { port1, port2 } = new MessageChannel();
    const msg = {
        comlinkInit: true,
        port: port1,
    };
    //@ts-ignore
    worker.postMessage(msg, [port1]);
    const swProxy = await Comlink.wrap(port2);
    return swProxy;
}
