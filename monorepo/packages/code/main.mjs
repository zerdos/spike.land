import * as OrbitModule from "orbit-db/dist/orbitdb"
import { IPFSClient } from '../../node_modules/ipfs-message-port-client/'
// URL to the script containing ipfs-message-port-server.
const IPFS_SERVER_URL = './worker.js'

const {default: OrbitDb} = OrbitModule;

const load = async (path) => {
  const [, protocol] = path.split("/");
  switch (protocol) {
    case "ipfs":
    case "ipns": {
      document.body.innerHTML =
        `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
    }
  }
};

const getIpfsPort= ()=>(new SharedWorker(  
    new URL(IPFS_SERVER_URL, import.meta.url),  { name: "IPFS" })).port


export const ipfsSw = async () => {
 
  const ipfs = IPFSClient.from(getIpfsPort());
  window.ipfs = ipfs
  window.OrbitDb =OrbitDb;

console.log({OrbitDb})

navigator.serviceWorker.onmessage = onServiceWorkerMessage;

    // @ts-ignore - register expects string but weback requires this URL hack.
    await navigator.serviceWorker.register(new URL("./sw.js", import.meta.url), {
      scope: "/",
    });
  
    await navigator.serviceWorker.ready;
  
    // This is just for testing, lets us know when SW is ready.
  
    console.log("*******ready******");
    // URLs like `localhost:3000/ipfs/Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD`
    // are loaded from service worker. However it could be that such a URL is loaded
    // before the service worker was registered in which case our server just loads a blank
    if (document.documentElement.dataset.viewer == null) {
      load(location.pathname);
    }
  
}


const createIPFSClient = async (context) => {
  // Selects a service worker client that can be used to obtain a message port
  // from, then sends a request to it and once a response is obtained, creates a
  // IPFS client and returns it
  const client = await selectClient(context.target);
  const port = await requestIPFSPort(client);
  return IPFSClient.from(port);
};

const onServiceWorkerMessage = (event) => {
  /** @type {null|ServiceWorker} */
  const serviceWorker = (event.source);
  if (serviceWorker == null) return;
  switch (event.data.method) {
    case "ipfs-message-port": 
      // Receives request from service worker, creates a new shared worker and
      // responds back with the message port.
      // Note: MessagePort can be transferred only once which is why we need to
      // create a SharedWorker each time. However a ServiceWorker is only created
      // once (in main function) all other creations just create port to it.
     const onServiceWorkerMessage = (event) => {
      /** @type {null|ServiceWorker} */
      const serviceWorker = (event.source);
      if (serviceWorker == null) return;


      switch (event.data.method) {
        case "ipfs-message-port":
          // Receives request from service worker, creates a new shared worker and
          // responds back with the message port.
          // Note: MessagePort can be transferred only once which is why we need to
          // create a SharedWorker each time. However a ServiceWorker is only created
          // once (in main function) all other creations just create port to it.
        //  const worker = createIPFSWorker();
        const port = getIpfsPort()
        return serviceWorker.postMessage({
          method: "ipfs-message-port",
          id: event.data.id,
          port
        }, [port]);
      }     
  }
  }}
