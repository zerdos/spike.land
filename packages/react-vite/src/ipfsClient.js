import { getWorker } from "./workers/getWorker";
import {
  all,
  CID,
  concat,
  fromHexString,
  IpfsClient,
  raceToSuccess,
  toString,
} from "@zedvision/ipfs";

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

export const ipfsClient = IpfsClient.from(port);

export const ipfsCat = async (cid, opts) => {
  const options = opts || {};
  const res = ipfsClient.cat(cid, options);

  const result = concat(
    await all(res),
  );
  const resultStr = toString(result);
  return resultStr;
};

Object.assign(globalThis, { ipfsCat });

export { CID };
export { all };
export { concat };
export { toString };
export { raceToSuccess };
export { fromHexString };
