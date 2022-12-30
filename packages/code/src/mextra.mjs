import * as Comlink from "comlink";

const myWorker = new Worker(`${location.origin}/mWorker.mjs`);

const __worker = Comlink.wrap(myWorker);

export const w = {
  extraStuff: __worker.extraStuff,
};
