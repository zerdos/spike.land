import { v } from "./versions.js";
export async function workBox() {
    // deno-lint-ignore ban-ts-comment
    //@ts-ignore
    const { Workbox } = await import(`https://storage.googleapis.com/workbox-cdn/releases/${v.workbox}/workbox-window.prod.mjs`);
    if ("serviceWorker" in window.navigator) {
        const wb = new Workbox(`${v.workerPrefix}/sw.js`);
        wb.register();
    }
}
