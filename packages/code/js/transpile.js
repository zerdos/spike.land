import { wrap } from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.min.mjs";

const { pathname } = window.location;

let workerSrc = `/js/workers/transpile.worker.js`;
let forceNormalWorker = false;

if (pathname.indexOf("/ipfs/") !== -1) {
  const cid = pathname.slice(6, 52);
  forceNormalWorker = true;

  workerSrc = `/ipfs/${cid}/js/workers/transpile.worker.js`;
} else if (location.origin !== "https://code.zed.vision") {
  forceNormalWorker = true;
  workerSrc = `https://unpkg.com/@zedvision/code/js/workers/transpile.worker.js`;
}

let transform = null;

/**
 *
 * @param {string} code 
 * @returns {Promise<string>}
 */
export async function transpileCode(code) {
  if (transform === null) {
    await init();
    return transpileCode(code);
  }
  try {
    const transformed = await transform(
      code,
    );
    return transformed;
  } catch {
    return "";
  }
}

async function init() {
  if (transform) {
    console.log("INIT INIT");
  }

  if (forceNormalWorker || typeof SharedWorker === "undefined") {
    const worker = new Worker(workerSrc);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1,
    };

    worker.postMessage(msg, [port1]);

    transform = await wrap(port2);
    return transform;
  }

  const worker = new SharedWorker(workerSrc);
  worker.port.start();

  transform = await wrap(worker.port);

  return transform;
}
