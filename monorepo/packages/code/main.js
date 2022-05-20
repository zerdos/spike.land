// import "orbit-db/dist/orbitdb.min.js"
import { IPFSClient } from '../../node_modules/ipfs-message-port-client/'


// URL to the script containing ipfs-message-port-server.
const IPFS_SERVER_URL = 'https://spike.land/worker.js'

const {OrbitDB}=self


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

const getIpfsPort= ()=>(new SharedWorker(  IPFS_SERVER_URL,  { name: "IPFS" })).port


const ipfsSw = async () => {
 
  const ipfs = IPFSClient.from(getIpfsPort());


  ;(async function () {

    const orbitdb = await OrbitDB.createInstance(ipfs, {id: "tester"});
  

    window.OrbitDB =OrbitDB;
    
    // Create / Open a database
    const db = await orbitdb.log("hello")
    await db.load()
  
    // Listen for updates from peers
    db.events.on("replicated", address => {
      console.log(db.iterator({ limit: -1 }).collect())
    })
  
    // Add an s
    const hash = await db.add("world")
    console.log(hash)
  
    // Query
    const result = db.iterator({ limit: -1 }).collect()
    console.log(JSON.stringify(result, null, 2))

    window.orbitdb = orbitdb;
  })()

navigator.serviceWorker.onmessage = onServiceWorkerMessage;

    // @ts-ignore - register expects string but webPack requires this URL hack.
    await navigator.serviceWorker.register("/sw.js", {
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
ipfsSw();

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
