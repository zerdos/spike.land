import {
  Ipfs,
  IpfsServer
} from "https://unpkg.com/@zedvision/ipfs@11.9.1/dist/ipfs.js";

/** @type {null} */
let normalWorkerPort = null;

// @ts-ignore
self.addEventListener("message", (event) => {
  if (event.data.clientInit) {
    //@ts
    // @ts-ignore
    normalWorkerPort = event.data.port;

    return;
  }
});

const main = async () => {
  //@ts-ignore
  /** @type {any[]} */
  const connections = [];
  // queue connections that occur while node was starting.
  // @ts-ignore
  self.onconnect = ({ ports }) => connections.push(...ports);

  const ipfs = await Ipfs.create(
    // {
    //   EXPERIMENTAL: { ipnsPubsub: true, sharding: false },
    //   relay: { enabled: true, hop: { enabled: true, active: true } },
    // },
  );

  // @ts-ignore
  self.ipfsNode = ipfs;

  // setInterval(()=>{
  //   ipfs.pubsub.publish("zolika84", Math.random()+"ddd")
  // }, 1000)


  const ipfs = await Ipfs.create(
    // {
    //   EXPERIMENTAL: { ipnsPubsub: true, sharding: false },
    //   relay: { enabled: true, hop: { enabled: true, active: true } },
    // },
  );


  const { IPFSService, Server } = IpfsServer;

  const service = new IPFSService(ipfs);
  const server = new Server(service);

  // connect new ports and queued ports with the server.
  //@ts-ignore
  self.onconnect = ({ ports }) => server.connect(ports[0]);
  //@ts-ignore

  // @ts-ignore

  if (normalWorkerPort) {
    server.connect(normalWorkerPort);
  }

  for (const port of connections.splice(0)) {
    server.connect(port);
  }
};

main();
