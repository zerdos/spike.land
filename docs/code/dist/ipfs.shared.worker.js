"use strict";
// @ts-nocheck
importScripts("https://unpkg.com/ipfs@0.52.3/dist/index.min.js");
importScripts("https://unpkg.com/ipfs-message-port-server@0.4.3/dist/index.min.js");
const main = async () => {
    //@ts-ignore
    const connections = [];
    // queue connections that occur while node was starting.
    self.onconnect = ({ ports }) => connections.push(...ports);
    const ipfs = await IPFS.create();
    const service = new IPFSService(ipfs);
    const server = new Server(service);
    // connect new ports and queued ports with the server.
    //@ts-ignore
    self.onconnect = ({ ports }) => server.connect(ports[0]);
    //@ts-ignore
    for (const port of connections.splice(0)) {
        server.connect(port);
    }
    const channel = new MessageChannel();
    onmessage = (e) => {
        channel.port1.postMessage(e.data);
    };
    channel.port2.onmessage = (e) => {
        postMessage(e.data);
    };
    server.connect(channel.port2);
};
main();
