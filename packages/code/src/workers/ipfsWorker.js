importScripts(
  "./ipfs/node_legacy/ipfs.min.js",
);

importScripts(
  "./ipfs/dist/ipfs.server.js",
);

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

self.addEventListener(
  "connect", /**
 * 
 * @param {*} event 
 */
  async ({ ports }) => {
    // @ts-ignore
    ipfs = ipfs || await Ipfs.create();

    // @ts-ignore
    const service = new IPFSService(ipfs);
    const server = new Server(service);

    server.connect(ports[0]);
  },
);
