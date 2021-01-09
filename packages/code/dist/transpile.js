import versions from "./versions.js";
/** @type {(arg0: string, arg1: boolean) => any} */
let transform;
/**
 *
 * @param {string} code
 * @param {boolean} hasToReport
 */
export async function transpileCode(code, hasToReport) {
    transform = transform || await (await init());
    return await transform(code, hasToReport);
}
async function init() {
    const v = versions();
    const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);
    const res = await fetch(`https://blog.zed.vision/code/src/transpile.worker.js`);
    const workerSource = await res.text();
    const worker = new Worker(URL.createObjectURL(new Blob([
        workerSource.replace("$$emotionRenderer$$", v.emotionRenderer)
            .replace("$$comlink$$", v.comlink)
            .replace("$$babel$$", v.babel),
    ])));
    // WebWorkers use `postMessage` and therefore work with Comlink.
    transform = Comlink.wrap(worker);
    return transform;
}
init();
