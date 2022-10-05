// Require("../../ipfs-core/dist/index.min.js");
// import { IPFSService, Server } from "ipfs-message-port-server";

// import defaultConfig from "../../ipfs-core-config/src/config.browser.js";
// import { libp2pConfig } from "../../ipfs-core-config/src/libp2p.browser.js";
// // import repo from "../../ipfs-core-config/repo.browser.js"
// // import {routers} from "../../ipfs-core-config/libp2p-pubsub-routers.browser.js"

// const { IpfsCore } = self;

// //import OrbitDB from "orbit-db"
// //import { create } from "../ipfs-core/index.min.js"//;
// //import { create,  } from "ipfs-core"//;

// // } from "../ipfs-message-port-server/index.min.js";
// // importScripts('https://unpkg.com/ipfs@0.62.3/index.min.js');
// // importScripts('https://unpkg.com/ipfs-message-port-server@0.11.3/index.min.js');

// const orbitDbs = {};

// self.orbitDbs = orbitDbs;

// let ipfsServer = null;

// export const connect = async (channel) => {
//   ipfsServer = ipfsServer || new Server(
//     new IPFSService(
//       await IpfsCore.create({
//         start: true,
//         preload: {
//           enabled: false,
//         },
//         config: {
//           ...defaultConfig(),
//           ...libp2pConfig(),
//         },
//       }),
//     ),
//   );

//   return ipfsServer.connect(channel.port1);
// };

// // async function startOrbit(
// //   orbitdb: OrbitDB,
// //   codeSpace: string,
// //   address: string,
// //   messageData: Object,
// // ) {
// //   console.log("startorbit", codeSpace, address, { orbitDbs });

// //   const init = orbitDbs[codeSpace];
// //   orbitDbs[codeSpace] = orbitDbs[codeSpace] ||
// //     await orbitdb.open(
// //       "/orbitdb/zdpuAp2ZthtbiECNgbTyuUazbQ3xTejnxTRT6D9JXrt7LzfQY/test", //address || codeSpace,
// //       {
// //         // If database doesn't exist, create it
// //         create: true,
// //         overwrite: true,
// //         // Load only the local version of the database,
// //         // don't load the latest from the network yet
// //         localOnly: false,
// //         type: "eventlog",

// //         // If "Public" flag is set, allow anyone to write to the database,
// //         // otherwise only the creator of the database can write
// //         accessController: {
// //           write: ["*"],
// //         },
// //       },
// //     );

// //   const db = orbitDbs[codeSpace];

// //   // Create / Open a database

// //   // Listen for updates from peers
// //   if (!init) {
// //     db.events.on("replicated", (_address: string) => {
// //       if (address !== _address) {
// //         orbitDbs[codeSpace] = _address;
// //         bc.postMessage({ codeSpace, address: _address });
// //       }
// //       console.log(db.iterator({ limit: -1 }).collect());
// //     });

// //     const query = (db: OrbitDB) => {
// //       if (db.type === "eventlog") {
// //         return db.iterator({ limit: 5 }).collect();
// //       } else if (db.type === "feed") {
// //         return db.iterator({ limit: 5 }).collect();
// //       } else if (db.type === "docstore") {
// //         return db.get("peer1");
// //       } else if (db.type === "keyvalue") {
// //         return db.get("mykey");
// //       } else if (db.type === "counter") {
// //         return db.value;
// //       } else {
// //         throw new Error("Unknown database type: ", db.type);
// //       }
// //     };

// //     let dbAddress = address;

// //     const queryAndRender = async (db: typeof OrbitDB) => {
// //       await ipfs.swarm.peers();
// //       //const databasePeers = await
// //       ipfs.pubsub.peers(db.address.toString());

// //       const result = query(db);
// //       let dbType = result && result.type;

// //       console.log({ result });
// //       if (dbType !== db.type || dbAddress !== db.address) {
// //         dbType = db.type;
// //         dbAddress = db.address;
// //       }
// //     };

// //     db.events.on("write", () => queryAndRender(db));

// //     // Add a

// //     const all = db.iterator({ limit: -1 })
// //       .collect().map((e) => e.payload.value);

// //     console.log({ all });
// //   }

// //   if (messageData) {
// //     console.log("adding", { messageData });
// //     await db.add(messageData);
// //   }
// // }

// // // URL to the script containing ipfs-message-port-server.

// // const ipfsSw = async () => {
// //   try {
// //     navigator.serviceWorker.onmessage = onServiceWorkerMessage;

// //     // @ts-ignore - register expects string but webPack requires this URL hack.
// //     navigator.serviceWorker.register("/sw.js", {
// //       scope: "/",
// //     });
// //     await navigator.serviceWorker.ready;

// //     // This is just for testing, lets us know when SW is ready.

// //     // URLs like `localhost:3000/ipfs/Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD`
// //     // are loaded from service worker. However it could be that such a URL is loaded
// //     // before the service worker was registered in which case our server just loads a blank
// // if (document.documentElement.dataset.viewer) {
// //   return load(location.pathname);
// // }
// //   } catch {
// //     console.log("ipfs load error");
// //   }
// // };

// // ipfsSw();
// // // const getIpfsPort = () =>
// // //   new SharedWorker(new URL("./worker.js", location.origin), {
// // //     name: "IPFS",
// // //   }).port;

// // async function onServiceWorkerMessage(event) {
// //   /** @type {null|ServiceWorker} */
// //   const serviceWorker = (event.source);
// //   if (serviceWorker == null) return;
// //   switch (event.data.method) {
// //     case "ipfs-message-port":
// //       await ipfsWorker();

// //       const port = new MessageChannel();
// //       ipfsMessagePortServer.connect(port[0]);
// //       // const port = getIpfsPort();
// //       return serviceWorker.postMessage({
// //         method: "ipfs-message-port",
// //         id: event.data.id,
// //         port,
// //       }, [port]);
// //       // Receives request from service worker, creates a new shared worker and
// //       // responds back with the message port.
// //       // Note: MessagePort can be transferred only once which is why we need to
// //       // create a SharedWorker each time. However a ServiceWorker is only created
// //       // once (in main function) all other creations just create port to it.
// //   }
// // }

// // const loadApp = async () => {
// //   console.log("es-module-shims import and start the app!");
// //   if (window.startedWithNativeEsmModules) return;

// //   await import("es-module-shims");
// // };

// // setTimeout(loadApp, 200);

// // async function syncCachesLater() {
// //   const registration = await navigator.serviceWorker.ready;
// //   try {
// //     await registration.çƒ.register("sync-cache");
// //   } catch {
// //     console.log("Background Sync could not be registered!");
// //   }
// // }
