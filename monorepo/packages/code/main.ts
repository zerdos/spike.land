const loadApp = async () => {
  console.log("es-module-shims import and start the app!");
  if (window.startedWithNativeEsmModules) return;

  await import("es-module-shims");
};

setTimeout(loadApp, 200);


const sw = async () => {
  try {
    navigator.serviceWorker.onmessage = onServiceWorkerMessage;

    // @ts-ignore - register expects string but webPack requires this URL hack.
    navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    await navigator.serviceWorker.ready;

    // This is just for testing, lets us know when SW is ready.

    // URLs like `localhost:3000/ipfs/Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD`
    // are loaded from service worker. However it could be that such a URL is loaded
    // before the service worker was registered in which case our server just loads a blank
    if (document.documentElement.dataset.viewer) {
      return load(location.pathname);
    }
  } catch {
    console.log("ipfs load error");
  }
};



async function onServiceWorkerMessage(event) {
  /** @type {null|ServiceWorker} */
  const serviceWorker = (event.source);
  if (serviceWorker == null) return;
  switch (event.data.method) {
    case "ipfs-message-port":
      // await ipfsWorker();
// 
      // const port = new MessageChannel();
      // ipfsMessagePortServer.connect(port[0]);
      // const port = getIpfsPort();
      // return serviceWorker.postMessage({
        // method: "ipfs-message-port",
        // id: event.data.id,
        // port,
      // }, [port]);
      // Receives request from service worker, creates a new shared worker and
      // responds back with the message port.
      // Note: MessagePort can be transferred only once which is why we need to
      // create a SharedWorker each time. However a ServiceWorker is only created
      // once (in main function) all other creations just create port to it.
  }
}

sw();
