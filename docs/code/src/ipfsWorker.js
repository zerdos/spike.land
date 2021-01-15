import {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  Ipfs,
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  IpfsServer,
} from "./ipfs.js";

/** @type {null} */
let normalWorkerPort = null;
// deno-lint-ignore ban-ts-comment
// @ts-ignore
self.addEventListener("message", (event) => {
  if (event.data.clientInit) {
    //@ts
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    normalWorkerPort = event.data.port;

    return;
  }
});

const main = async () => {
  // deno-lint-ignore ban-ts-comment
  //@ts-ignore
  /** @type {any[]} */
  const connections = [];
  // queue connections that occur while node was starting.
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  self.onconnect = ({ ports }) => connections.push(...ports);

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const ipfs = await Ipfs.create(
    // {
    //   EXPERIMENTAL: { ipnsPubsub: true, sharding: false },
    //   relay: { enabled: true, hop: { enabled: true, active: true } },
    // },
  );
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  self.ipfsNode = ipfs;

  // setInterval(()=>{
  //   ipfs.pubsub.publish("zolika84", Math.random()+"ddd")
  // }, 1000)
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
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
  // deno-lint-ignore ban-ts-comment
  //@ts-ignore
  self.onconnect = ({ ports }) => server.connect(ports[0]);

  if (normalWorkerPort) {
    server.connect(normalWorkerPort);
  }

  for (const port of connections.splice(0)) {
    server.connect(port);
  }
};

main();
