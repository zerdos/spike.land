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
    ? `https://blog.zed.vision/code/src/ipfs.shared.worker.js`
    : window.location.hostname === "[::1]"
    ? `${location.href}src/ipfsKV.worker.js`
    : `${location.origin}/src/ipfsKV.worker.js`;

  if (typeof SharedWorker !== "undefined") {
    const worker = new SharedWorker(workerSrc);
    ipfs = IpfsMessagePortClient.from(worker.port);
  } else {
    const worker = new Worker(workerSrc);
    ipfs = IpfsMessagePortClient.from(worker);
  }

  return ipfs;
};
