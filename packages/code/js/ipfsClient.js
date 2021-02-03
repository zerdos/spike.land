import {
  all,
  CID,
  fromHexString,
  IpfsClient,
  raceToSuccess,
  uint8ArrayConcat,
  uint8ArrayToString,
} from "../modules/ipfs.client.js";

/** @type {MessagePort} */
let port;


let forceNormalWorker = false;




if (typeof window !== "undefined") {
  let workerSrc = `./js/workers/ipfsWorker.js`;

  const { pathname } = window.location;
  if (pathname.indexOf("/ipfs/") !== -1) {
    const cid = pathname.slice(6, 52);
    forceNormalWorker = true;
    workerSrc = `/ipfs/${cid}/js/workers/ipfsWorker.js`;
  } else if (location.origin !== "https://code.zed.vision") {
    forceNormalWorker = true;
    workerSrc = `https://unpkg.com/@zedvision/code/js/workers/ipfsWorker.js`;
  }
  
  
  

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
}

export const ipfsClient = IpfsClient.from(port);

export const ipfsCat = async (cid, opts) => {
  const options = opts || {};
  const res = ipfsClient.cat(cid, options);

  const result = uint8ArrayConcat(
    await all(res),
  );
  const resultStr = uint8ArrayToString(result);
  return resultStr;
};
export { CID };
export { all };
export { uint8ArrayConcat };
export { uint8ArrayToString };
export { raceToSuccess };
export { fromHexString };
