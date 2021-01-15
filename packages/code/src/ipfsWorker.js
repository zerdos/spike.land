import {
  Ipfs,
  IPFSService,
  Server,
} from "https://unpkg.com/@zedvision/ipfs@11.9.4/dist/ipfs.js";
/** @type {null} */

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
  "connect", /**
 * 
 * @param {*} event 
 */
  async (event) => {
    ipfs = ipfs || await Ipfs.create();

    const service = new IPFSService(ipfs);
    const server = new Server(service);
    const { ports } = event.data;

    server.connect(ports[0]);
  },
);
