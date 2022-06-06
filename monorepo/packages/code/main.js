import "core-js/full";
navigator.serviceWorker.onmessage = onServiceWorkerMessage;

// @ts-ignore - register expects string but webPack requires this URL hack.
navigator.serviceWorker.register("/sw.js", {
  scope: "/",
});

// URL to the script containing ipfs-message-port-server.
const load = async (path) => {
  const paths = path && path.split("/") || [];
  const protocol = path.length || "";
  switch (protocol) {
    case "ipfs":
    case "ipns": {
      document.body.innerHTML =
        `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
    }
  }
};

const ipfsSw = async () => {
  await navigator.serviceWorker.ready;

  // This is just for testing, lets us know when SW is ready.

  // URLs like `localhost:3000/ipfs/Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD`
  // are loaded from service worker. However it could be that such a URL is loaded
  // before the service worker was registered in which case our server just loads a blank
  if (document.documentElement.dataset.viewer) {
    return load(location.pathname);
  }
}
  setTimeout(loadApp,200);

ipfsSw();
const getIpfsPort = () =>
  new SharedWorker(new URL("./worker.js", location.origin), {
    name: "IPFS",
  }).port;

function onServiceWorkerMessage(event) {
  /** @type {null|ServiceWorker} */
  const serviceWorker = (event.source);
  if (serviceWorker == null) return;
  switch (event.data.method) {
    case "ipfs-message-port":
      const port = getIpfsPort();
      return serviceWorker.postMessage({
        method: "ipfs-message-port",
        id: event.data.id,
        port,
      }, [port]);
      // Receives request from service worker, creates a new shared worker and
      // responds back with the message port.
      // Note: MessagePort can be transferred only once which is why we need to
      // create a SharedWorker each time. However a ServiceWorker is only created
      // once (in main function) all other creations just create port to it.
  }
}

const loadApp = async () => {
  console.log("es-module-shims import and start the app!");
  if (window.startedWithNativeEsmModules) return;

  await import("es-module-shims");
};

async function syncCachesLater() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.çƒ.register("sync-cache");
  } catch {
    console.log("Background Sync could not be registered!");
  }
}
