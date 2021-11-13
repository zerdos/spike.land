import { getWorker } from "./workers/getWorker.mjs";
import {
  all,
  concat,
  IPFSClient,
  toString,
} from "@spike.land/ipfs";

const { workerSrc, forceNormalWorker } = getWorker("ipfsWorker.js");

/** @type {MessagePort} */
let port;

if (typeof SharedWorker !== "undefined" && !forceNormalWorker) {
  const ipfsWorker = new SharedWorker(
    workerSrc,
  );
  port = ipfsWorker.port;
} else {
  const worker = new Worker(workerSrc);

  const { port1, port2 } = new MessageChannel();
  const msg = {
    clientInit: true,
    port: port1,
  };

  worker.postMessage(msg, [port1]);

  port = port2;
}

export const ipfsClient = IPFSClient.from(port);

export const ipfsCat = async (cid, opts) => {
  const options = opts || {};
  const res = ipfsClient.cat(cid, options);

  const result = concat(
    await all(res),
  );
  const resultStr = toString(result);
  return resultStr;
};
globalThis.ipfsClient = ipfsClient;
globalThis.ipfsCat = ipfsCat;
export { all };
export { concat };
export { toString };
