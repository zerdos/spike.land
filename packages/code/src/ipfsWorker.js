import { v } from "./versions.js";

const getIpfs = async () => {
  const {
    Ipfs,
    IPFSService,
    Server,
  } = await import(v.ipfs);

  const ipfs = await Ipfs.create();
  return {
    ipfs,
    IPFSService,
    Server,
  };
};

/** @type {{ ipfs: any; IPFSService: any; Server: any; }} */
let mods;

self.addEventListener("message", async (event) => {
  if (event.data.clientInit) {
    mods = mods || await getIpfs();

    const { ipfs, IPFSService, Server } = mods;

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
  async (event) => {
    mods = mods || await getIpfs();

    const { ipfs, IPFSService, Server } = mods;

    const service = new IPFSService(ipfs);
    const server = new Server(service);
    const { ports } = event.data;

    server.connect(ports[0]);
  },
);
