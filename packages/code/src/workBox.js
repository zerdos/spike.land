export async function workBox() {
  if ("serviceWorker" in window.navigator) {
    const { Workbox } = await import(
      "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-window.prod.mjs"
    );

    window.navigator.serviceWorker &&
      window.navigator.serviceWorker.controller &&
      window.navigator.serviceWorker.controller.unregister();
    const wb = new Workbox(`./src/workers/sw.js`);

    wb.register();
  }
}
