import { wrap } from "comlink";
import { getWorker } from "./workers/getWorker.mjs";

const { workerSrc, forceNormalWorker } = getWorker("prettierWorker.js");

let format = null;

/**
 * @param {string} code
 * @returns {Promise<string>}
 */
export async function formatter(code) {
  if (format === null) {
    format = await init();
    const formatted = await format(
      code,
    );
    return formatted;
  }

  const formatted = await format(
    code,
  );
  return formatted;
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
