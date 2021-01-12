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
    const workerSrc = window.location.hostname === "blog.zed.vision"
        ? `https://blog.zed.vision/code/src/transpile.worker.js`
        : window.location.hostname === "[::1]"
            ? `${location.href}/src/transpile.worker.js`
            : `${location.origin}/src/transpile.worker.js`;
    //@ts-ignore
    if (typeof SharedWorker === "undefined") {
        const worker = new Worker(workerSrc);
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
    const worker = new SharedWorker(workerSrc);
    worker.port.start();
    const swProxy = await Comlink.wrap(worker.port);
    return swProxy;
}
