import * as comlink from "comlink";
import { getWorker } from "./workers/getWorker";

const { wrap } = comlink;

const { workerSrc, forceNormalWorker } = getWorker("transpile.worker.js");

let transform: ((code: string) => string) | null = null;

export async function transpileCode(code: string) {
  if (transform === null) {
    await init();
    const res: string = await transpileCode(code);
    return res;
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
