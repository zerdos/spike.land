import { create } from "../../node_modules/ipfs-core/index.min.js";
import {
  IPFSService,
  Server,
} from "../../node_modules/ipfs-message-port-server/index.min.js";
import { WebRTCStar } from "@libp2p/webrtc-star";
// importScripts('https://unpkg.com/ipfs@0.62.3/index.min.js');
// importScripts('https://unpkg.com/ipfs-message-port-server@0.11.3/index.min.js');

const main = async () => {
  try {
    // start listening to all incoming connections - they will be from browsing
    // contexts that run `new SharedWorker(...)`
    // Note: It is important to start listening before we do any async work to
    //  ensure that connections aren't missed while awaiting

    const connections = [];
    // queue connections that occur while node was starting.
    self.onconnect = ({ ports }) => connections.push(...ports);

    const ipfs = await create({
      isNode: false,
      isWebWorker: true,
      ...libp2pConfig(),
    });
    // And add hello world for tests
    await ipfs.add({ content: "hello world" });

    const service = new IPFSService(ipfs);
    const server = new Server(service);
    self.server = server;
    self.ipfs = ipfs;

    //   console.log(db.iterator({ limit: -1 }).collect())
    // })

    // Create / Open a database
    // const db = await orbit.log("hello")
    // await db.load()

    // connect every queued and future connection to the server
    self.onconnect = ({ ports }) => server.connect(ports[0]);
    for (const port of connections.splice(0)) {
      server.connect(port);
    }
    // const result = db.iterator({ limit: -1 }).collect()
    // console.log(JSON.stringify(result, null, 2))
  } catch (err) {
    console.error(err);
  }
};

main();

function libp2pConfig() {
  const webRtcStar = new WebRTCStar();

  /** @type {import('libp2p').Libp2pOptions} */
  const options = {
    transports: [
      webRtcStar,
    ],
    peerDiscovery: [
      webRtcStar.discovery,
    ],
    connectionManager: {
      maxParallelDials: 150, // 150 total parallel multiaddr dials
      maxDialsPerPeer: 4, // Allow 4 multiaddrs to be dialed per peer in parallel
      dialTimeout: 10e3, // 10 second dial timeout per peer dial
      autoDial: true,
    },
    nat: {
      enabled: false,
    },
    metrics: {
      enabled: true,
    },
  };

  return options;
}
