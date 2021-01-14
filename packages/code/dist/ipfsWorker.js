"use strict";
// @ts-nocheck
importScripts("https://unpkg.com/ipfs@0.52.3/dist/index.min.js");
importScripts("https://unpkg.com/ipfs-message-port-server@0.4.3/dist/index.min.js");
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
    const connections = [];
    // queue connections that occur while node was starting.
    self.onconnect = ({ ports }) => connections.push(...ports);
    const ipfs = await Ipfs.create(
    // {
    //   EXPERIMENTAL: { ipnsPubsub: true, sharding: false },
    //   relay: { enabled: true, hop: { enabled: true, active: true } },
    // },
    );
    self.ipfsNode = ipfs;
    // setInterval(()=>{
    //   ipfs.pubsub.publish("zolika84", Math.random()+"ddd")
    // }, 1000)
    const { IPFSService, Server } = IpfsMessagePortServer;
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
