import { Workbox } from "../node_legacy/workbox-window.prod.mjs";

export function workBox() {
  if ("serviceWorker" in window.navigator) {
    const wb = new Workbox(`src/workers/sw.js`);

    wb.register();
  }
}
