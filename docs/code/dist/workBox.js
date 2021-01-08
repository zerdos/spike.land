/**
 *
 * @param {string} version
 */
export async function workBox(version) {
    // deno-lint-ignore ban-ts-comment
    //@ts-ignore
    const { Workbox } = await import(`https://storage.googleapis.com/workbox-cdn/releases/${version}/workbox-window.prod.mjs`);
    if ("serviceWorker" in window.navigator) {
        const wb = new Workbox("src/sw.js");
        wb.register();
    }
}
