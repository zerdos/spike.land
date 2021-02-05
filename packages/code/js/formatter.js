import { wrap } from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.min.mjs";
import { getWorker } from "./workers/getWorker.js";

const { workerSrc, forceNormalWorker } = getWorker("prettierWorker.js");

let format = null;

/**
 *
 * @param {string} code 
 * @returns {Promise<string>}
 */
export async function formatter(code) {
  if (format === null) {
    await init();
    return formatter(code);
  }
  try {
    const formatted = await format(
      code,
    );
    return formatted;
  } catch {
    return "";
  }
}

async function init() {
  if (format) {
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

    format = await wrap(port2);
    return format;
  }

  const worker = new SharedWorker(workerSrc);
  worker.port.start();

  format = await wrap(worker.port);

  return format;
}
