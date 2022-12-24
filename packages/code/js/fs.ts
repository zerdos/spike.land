import FS from "@isomorphic-git/lightning-fs";
import * as Comlink from "comlink";

let _fs: FS.PromisifiedFS;
async function init() {
  const worker = new SharedWorker("/fs.worker.js");

  /**
   * SharedWorkers communicate via the `postMessage` function in their `port` property.
   * Therefore you must use the SharedWorker's `port` property when calling `Comlink.wrap`.
   */
  _fs = Comlink.wrap(worker.port);

  return _fs;
}
init();

export const fs = async () => (_fs || await init());
