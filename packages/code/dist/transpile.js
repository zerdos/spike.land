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
