self.importScripts(
  "https://unpkg.com/ipfs@0.54.1/dist/index.min.js",
);

self.importScripts(
  "https://unpkg.com/ipfs-message-port-server@0.6.1/dist/index.min.js",
);

// @ts-ignore
const { Ipfs, IpfsMessagePortServer } = self;
const { IPFSService, Server } = IpfsMessagePortServer;

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
