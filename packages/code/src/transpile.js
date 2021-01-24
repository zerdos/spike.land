import { wrap } from "../node_legacy/comlink/comlink.min.mjs";
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

  if (typeof SharedWorker === "undefined") {
    const worker = new Worker(`/src/workers/transpile.worker.js`);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1,
    };

    worker.postMessage(msg, [port1]);

    transform = await wrap(port2);
    return transform;
  }

  const worker = new SharedWorker(`/src/workers/transpile.worker.js`);
  worker.port.start();

  transform = await wrap(worker.port);

  return transform;
}
