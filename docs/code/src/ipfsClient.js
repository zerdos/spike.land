import { importScript } from "./importScript.js";

//@ts-ignore
let ipfs;

export const getIpfs = async () => {
  //@ts-ignore
  if (ipfs) return ipfs;

  // @ts-ignore
  const { IpfsMessagePortClient } = await importScript(
    "https://unpkg.com/ipfs-message-port-client@0.4.3/dist/index.min.js",
  );

  const workerSrc = window.location.hostname === "blog.zed.vision"
    ? `https://blog.zed.vision/code/src/ipfsWorker.js`
    : window.location.hostname === "[::1]"
    ? `${location.href}src/ipfsWorker.js`
    : `${location.origin}/src/ipfsWorker.js`;

  if (typeof SharedWorker !== "undefined") {
    const ipfsWorker = new SharedWorker(workerSrc);
    //@ts-ignore
    window.ipfsWorker = ipfsWorker;
    ipfs = IpfsMessagePortClient.from(ipfsWorker.port);
    return ipfs;
  }
  const ipfsWorker = new Worker(workerSrc);
  //@ts-ignore
  window.ipfsWorker = ipfsWorker;

  const { port1, port2 } = new MessageChannel();
  const msg = {
    clientInit: true,
    port: port1,
  };

  ipfsWorker.postMessage(msg, [port1]);

  ipfs = IpfsMessagePortClient.from(port2);

  return ipfs;
};
