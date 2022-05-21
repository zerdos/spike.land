// import "orbit-db/dist/orbitdb.min.js"
import { IPFSClient } from "../../node_modules/ipfs-message-port-client/";

// URL to the script containing ipfs-message-port-server.
const IPFS_SERVER_URL = "https://spike.land/worker.js";

const { OrbitDB } = self;

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

const getIpfsPort = () =>
  (new SharedWorker(IPFS_SERVER_URL, { name: "IPFS" })).port;

const ipfsSw = async () => {
  const ipfs = IPFSClient.from(getIpfsPort());

  (async function () {
    const { codeSpace } = window;
    if (!codeSpace) return;
    const orbitdb = await OrbitDB.createInstance(ipfs, {
      id: codeSpace,
      create: true,
      overwrite: true,
      // Load only the local version of the database,
      // don't load the latest from the network yet
      localOnly: false,
      type: "eventlog",
      // If "Public" flag is set, allow anyone to write to the database,
      // otherwise only the creator of the database can write
      accessController: {
        write: ["*"],
      },
    });

    // Create / Open a database
    const db = await orbitdb.log(codeSpace, {}); //options
    await db.load();

    // Listen for updates from peers
    db.events.on("replicated", (address) => {
      console.log(db.iterator({ limit: -1 }).collect());
    });

    const query = (db) => {
      if (db.type === "eventlog") {
        return db.iterator({ limit: 5 }).collect();
      } else if (db.type === "feed") {
        return db.iterator({ limit: 5 }).collect();
      } else if (db.type === "docstore") {
        return db.get("peer1");
      } else if (db.type === "keyvalue") {
        return db.get("mykey");
      } else if (db.type === "counter") {
        return db.value;
      } else {
        throw new Error("Unknown datatbase type: ", db.type);
      }
    };

    const queryAndRender = async (db) => {
      const networkPeers = await ipfs.swarm.peers();
      const databasePeers = await ipfs.pubsub.peers(db.address.toString());

      const result = query(db);

      console.log({ result });
      if (dbType !== db.type || dbAddress !== db.address) {
        dbType = db.type;
        dbAddress = db.address;
      }
    };

    db.events.on("write", () => queryAndRender(db));

    const bc = new BroadcastChannel("spike.land");
    bc.onmessage = async (event) => {
      console.log({ event });

      if (
        event.data.codeSpace === codeSpace && event.data.messageData
      ) {
        const hash = await db.add({ ...event.data.messageData });
        console.log(hash);
      }
    };
    // Add an x``s

    // Query
    const result = db.iterator({ limit: -1 }).collect();
    console.log(JSON.stringify(result, null, 2));
  })();

  navigator.serviceWorker.onmessage = (e) => onServiceWorkerMessage(e);

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
};
ipfsSw();

function onServiceWorkerMessage(event) {
  console.log("SW MESSAGE");
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
