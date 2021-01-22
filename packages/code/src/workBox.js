import { Workbox } from "../node_legacy/workbox-window.prod.mjs";

export function workBox() {
  if ("serviceWorker" in window.navigator) {
    window.navigator.serviceWorker &&
      window.navigator.serviceWorker.controller &&
      window.navigator.serviceWorker.controller.unregister();
    const wb = new Workbox(`src/workers/sw.js`);

    wb.register();
  }
}
