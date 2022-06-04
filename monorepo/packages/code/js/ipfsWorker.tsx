import "core-js/full";

Object.assign(self, require("buffer"));
Object.assign(self, require("path-browserify"));

const OrbitDB = require("orbit-db");
const bc = new BroadcastChannel("spike.land");

  

import { create } from "ipfs";
import { IPFSService, Server } from "ipfs-message-port-server";
// import { WebRTCStar } from "@libp2p/webrtc-star";

import config from "ipfs-core-config/config";

//import OrbitDB from "orbit-db"
//import { create } from "../../node_modules/ipfs-core/index.min.js"//;
//import { create,  } from "ipfs-core"//;

import type {} from "orbit-db";
// } from "../../node_modules/ipfs-message-port-server/index.min.js";
// importScripts('https://unpkg.com/ipfs@0.62.3/index.min.js');
// importScripts('https://unpkg.com/ipfs-message-port-server@0.11.3/index.min.js');

const orbitDbs = {};

self.orbitDbs = orbitDbs;

export const ipfsWorker = async () => {
  try {
    console.log("Ipfs worker start");
    // start listening to all incoming connections - they will be from browsing
    // contexts that run `new SharedWorker(...)`
    // Note: It is important to start listening before we do any async work to
    //  ensure that connections aren't missed while awaiting

    // const webRtcStar = new WebRTCStar();

    const connections: MessagePort[][] = [];
    self.addEventListener(
      "connect",
      ({ ports }: MessageEventInit) => ports && connections.push(ports),
    );
    // queue connections that occur while node was starting.

    const defaultConfig = config();
    const ipfs = await create({
      config: {
        ...defaultConfig,
        // Addresses: {
        // ...defaultConfig?.Addresses,
        // Swarm: [...defaultConfig?.Addresses?.Swarm, "/dns4/ws-star0discovery.spike.land/tcp/443/wss/p2p-websocket-star"]
        // },
        Pubsub: { Enabled: true },
        // ...libp2pConfig()
      },
      // libp2p: libp2pConfig(),
      //isWebWorker: true
      // ...libp2pConfig(),
    });
   

    // And add hello world for tests
    await ipfs.add({ content: "hello world" });

    try {
      await ipfs.swarm.connect(
        "/dns4/spike.land/tcp/443/wss/api/rtc/websocket",
      );
    } catch {
      console.log("Error connecting swarm");
    }
    const service = new IPFSService(ipfs);
    const server = new Server(service);

    self.ipfs = ipfs;

    const orbitdb = await OrbitDB.createInstance(ipfs, {
      id: ipfs.id().toString(),
    });
    
    bc.onmessage = async (event) => {
      console.log({ event });

      if (event.data.codeSpace && event.data.address) {
        const { codeSpace, address } = event.data;

        if (!Object.prototype.hasOwnProperty(codeSpace)) {
          startOrbit(orbitdb,codeSpace, address);
        }
      }

      if (
        event.data.codeSpace && event.data.messageData
      ) {
        const hash = await db.add({
          ...event.data.messageData,
          codeSpace: event.data.codeSpace,
        });
        console.log(hash);
      }
    };
    //   console.log(db.iterator({ limit: -1 }).collect())
    // })

    // Create / Open a database
    // const db = await orbit.log("hello")
    // await db.load()

    // connect every queued and future connection to the server
    // self.onconnect = ({ ports }) => server.connect(ports[0]);

    addEventListener(
      "connect",
      ({ ports }: MessageEventInit) => ports && server.connect(ports[0]),
    );

    connections.map((ports) => server.connect(ports[0]));

    // function libp2pConfig() {
    //   /** @type {import('libp2p').Libp2pOptions} */
    //   const options = {
    //     // peerDiscovery: [
    //     //   webRtcStar.discovery,
    //     // ],
    //     connectionManager: {
    //       maxParallelDials: 150, // 150 total parallel multiaddr dials
    //       maxDialsPerPeer: 4, // Allow 4 multiaddr to be dialed per peer in parallel
    //       dialTimeout: 10e3, // 10 second dial timeout per peer dial
    //       autoDial: true,
    //     },
    //     nat: {
    //       enabled: false,
    //     },
    //     metrics: {
    //       enabled: true,
    //     },
    //   };

    //   return options;
    // }

    // const result = db.iterator({ limit: -1 }).collect()
    // console.log(JSON.stringify(result, null, 2))
  } catch (err) {
    console.error(err);
  }
};


async function startOrbit(orbitdb: OrbitDB,codeSpace: string, address: string) {
  console.log("startorbit", codeSpace, address, {orbitDbs})
  if (orbitDbs[codeSpace] ) return;
  orbitDbs[codeSpace] = address || codeSpace;
  const db = await orbitdb.open(address || codeSpace, {
    // If database doesn't exist, create it
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

  // Listen for updates from peers
  db.events.on("replicated", (_address: string) => {
    if (address !== _address) {
      orbitDbs[codeSpace] = _address;
      bc.postMessage({ codeSpace, address: _address });
    }
    console.log(db.iterator({ limit: -1 }).collect());
  });

  const query = (db: OrbitDB) => {
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
      throw new Error("Unknown database type: ", db.type);
    }
  };

  let dbAddress = address;

  const queryAndRender = async (db: typeof OrbitDB) => {
    //const networkPeers =
    await ipfs.swarm.peers();
    //const databasePeers = await
    ipfs.pubsub.peers(db.address.toString());

    const result = query(db);
    let dbType = result && result.type;

    console.log({ result });
    if (dbType !== db.type || dbAddress !== db.address) {
      dbType = db.type;
      dbAddress = db.address;
    }
  };

  db.events.on("write", () => queryAndRender(db));

  // Add an x``s

  // Query
  const result = db.iterator({ limit: -1 }).collect();
  console.log(JSON.stringify(result, null, 2));
}