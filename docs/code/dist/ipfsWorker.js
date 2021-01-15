"use strict";
importScripts("https://unpkg.com/@zedvision/ipfs@11.9.7/dist/ipfs.server.js");
// @ts-ignore
const { Ipfs, IPFSService, Server } = self;
/** @type {{ add: (arg0: string, arg1: { onlyHash: boolean; }) => Promise<any>; }} */
let ipfs;
self.addEventListener("message", async (event) => {
    if (event.data.clientInit) {
        // @ts-ignore
        ipfs = ipfs || await Ipfs.create();
        // @ts-ignore
        const service = new IPFSService(ipfs);
        const server = new Server(service);
        server.connect(event.data.port);
    }
});
self.addEventListener("connect", /**
*
* @param {*} event
*/ async (event) => {
    // @ts-ignore
    ipfs = ipfs || await Ipfs.create();
    // @ts-ignore
    const service = new IPFSService(ipfs);
    const server = new Server(service);
    const { ports } = event.data;
    server.connect(ports[0]);
});
