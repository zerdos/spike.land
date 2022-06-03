import { IPFSClient } from "ipfs-message-port-client";
import "es-module-shims";

// URL to the script containing ipfs-message-port-server.
const IPFS_SERVER_URL = new URL("worker.js", location.host);
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

const getIpfsPort = () =>(new SharedWorker(IPFS_SERVER_URL, { name: "IPFS" })).port;
const ipfs = IPFSClient.from(getIpfsPort());
const ipfsSw = async () => {
  
  navigator.serviceWorker.onmessage = (e) => onServiceWorkerMessage(e);

  // @ts-ignore - register expects string but webPack requires this URL hack.
  await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });
  
  await navigator.serviceWorker.ready;

  // This is just for testing, lets us know when SW is ready.

  // URLs like `localhost:3000/ipfs/Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD`
  // are loaded from service worker. However it could be that such a URL is loaded
  // before the service worker was registered in which case our server just loads a blank
  if (document.documentElement.dataset.viewer == null) {
  return  load(location.pathname);
  }
await  loadApp()
  
};
ipfsSw();


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


const loadApp =async () => {

const {run} = await importShim("./ws.mjs", import.meta.url)
if (window.startedWithNativeEsmModules) return;
await run();

}

async function syncCachesLater() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.çƒ.register('sync-cache');
  } catch {
    console.log('Background Sync could not be registered!');
  }
}