import * as Comlink from "comlink";
import { createJsBlob } from "./starter";
const workers = {};
export { Comlink };
export const wrkModuleImport = (src, exp = ["default"]) => {
  if (workers[src]) return workers[src];
  // if (supportsWorkerType()) {

  const worker = new Worker(
    createJsBlob(
      `
    import {Comlink} from "${new URL("moduleWorker.mjs", location.origin).toString()}"
    import {${exp.join(", ")}} from ${new URL(src, location.origin).toString()};
    const workerMods = { ${exp.join(",")} };
console.log({workerMods})

    Comlink.expose(workerMods );

    `,
      src,
    ),
    { type: "module" },
  );

  const mod = {};

  workers[src] = Comlink.wrap(worker);

  return workers[src];
};
