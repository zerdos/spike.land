export async function workBox() {
  if ("serviceWorker" in window.navigator) {
    // const { serviceWorker } = window.navigator;

    const { Workbox } = await import(
      "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-window.prod.mjs"
    );

    // const { controller } = serviceWorker;
    // if (controller && controller.unregister) {
    //   await controller.unregister();
    // }

    const wb = new Workbox(`./js/workers/sw.js`);

    wb.addEventListener("activated", (event) => {
      // `event.isUpdate` will be true if another version of the service
      // worker was controlling the page when this version was registered.
      if (!event.isUpdate && !window.monaco) {
        console.log("Service worker activated for the first time!");

        // (async () => {
        //    const { run } = await import("src/codeLoader.js");
        // run("window", window);
        // });

        // If your service worker is configured to precache assets, those
        // assets should all be available now.
      }
    });

    return wb.register();
  }
}
