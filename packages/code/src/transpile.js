import { wrap } from "../node_legacy/comlink/comlink.min.mjs";
import { v } from "./versions.js";

/** @type {((arg0: string, arg1: { emotionRenderer: string; }) => any) | null} */
let transform = null;

/**
 *
 * @param {string} code 
 * @param {string} emotionRenderer
 * @returns {Promise<string>}
 */
export async function transpileCode(code, emotionRenderer) {
  if (transform === null) {
    await init();
    return transpileCode(code, emotionRenderer);
  }
  try {
    const transformed = await transform(
      code,
      { emotionRenderer: emotionRenderer || v.emotionRenderer },
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

  //@ts-ignore
  if (typeof SharedWorker === "undefined") {
    const worker = new Worker(`${v.workerPrefix}/transpile.worker.js`);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1,
    };

    //@ts-ignore
    worker.postMessage(msg, [port1]);

    transform = await wrap(port2);
    return transform;
  }

  const worker = new SharedWorker(`${v.workerPrefix}/transpile.worker.js`);
  worker.port.start();

  transform = await wrap(worker.port);

  return transform;
}
