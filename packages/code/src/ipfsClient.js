import { CID, IpfsClient } from "https://unpkg.com/@zedvision/ipfs";

const workerSrc = window.location.hostname === "blog.zed.vision"
  ? `https://blog.zed.vision/code/src/ipfsWorker.js`
  : window.location.hostname === "[::1]"
  ? `${location.href}/src/ipfsWorker.js`
  : `${location.origin}/src/ipfsWorker.js`;

let port;

if (typeof SharedWorker !== "undefined") {
  const ipfsWorker = new SharedWorker(
    workerSrc,
    { name: "ipfs shared worker", type: "module" },
  );
  port = ipfsWorker.port;
} else {
  const worker = new Worker(workerSrc, { type: "module" });

  const { port1, port2 } = new MessageChannel();
  const msg = {
    clientInit: true,
    port: port1,
  };

  worker.postMessage(msg, [port1]);

  port = port2;
}

export const ipfsClient = IpfsClient.from(port);
export { CID };
