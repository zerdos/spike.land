import { wrap } from "comlink";
import { getWorker } from "./workers/getWorker";

const { workerSrc, forceNormalWorker } = getWorker("prettierWorker.js");

let format: ((code:string)=>string)|null = null;

/**
 *
 * @param {string} code 
 * @returns {Promise<string>}
 */
export async function formatter(code: string) {
  if (format === null) {
    await init();
    const res: string = await formatter(code);
    return res;
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
    const worker = new Worker("./src/workers/prettierWorker");
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1,
    };

    worker.postMessage(msg, [port1]);

    format = await wrap(port2);
    return format;
  }

  const worker = new SharedWorker("./src/workers/prettierWorker");
  worker.port.start();

  format = await wrap(worker.port);

  return format;
}
