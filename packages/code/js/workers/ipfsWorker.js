self.importScripts(
  "https://unpkg.com/ipfs@0.57.0/dist/index.min.js",
);

self.importScripts(
  "https://unpkg.com/ipfs-message-port-server@0.9.0/dist/index.min.js",
);

const { Ipfs, IpfsMessagePortServer } = self;
const { IPFSService, Server } = IpfsMessagePortServer;

/** @type {{ add: (arg0: string, arg1: { onlyHash: boolean; }) => Promise<any>; }} */
let ipfs;

self.addEventListener("message", async (event) => {
  if (event.data.clientInit) {
    ipfs = ipfs || await Ipfs.create();

    const service = new IPFSService(ipfs);
    const server = new Server(service);

    server.connect(event.data.port);
  }
});

self.addEventListener(
  "connect",
  async ({ ports }) => {
    ipfs = ipfs || await Ipfs.create();

    const service = new IPFSService(ipfs);
    const server = new Server(service);

    server.connect(ports[0]);
  },
);
