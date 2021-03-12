import { wrap } from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.min.mjs";
import { getWorker } from "./workers/getWorker.mjs";

const { workerSrc, forceNormalWorker } = getWorker("transpile.worker.js");

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

  const transformed = await transform(
    code,
  );
  return transformed;
}

async function init() {
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
