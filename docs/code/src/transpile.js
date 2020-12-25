import * as Comlink from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.mjs";
import { shaDB } from "./db.js";
import v4 from "https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js";

// import * as Comlink from "../../../dist/esm/comlink.mjs";

let transform;
export async function transpileCode(code, hasToReport) {
  transform = transform || await init();

  return await transform(code, hasToReport);
}

let node = null;

export async function getIpfsiD() {
  if (node) return node;

  let ipfsId = await shaDB.get("ipfs");
  if (!ipfsId) {
    ipfsId = v4();

    await shaDB.put("ipfs", ipfsId);
  }

  return ipfsId;
}

let ipfsNode;
export async function ipfsAdd(code, hasToReport) {
  ipfsNode = ipfsNode || await Ipfs.create({ repo: await getIpfsiD() });

  return await transform(code, hasToReport);
}

function init() {
  const worker = new Worker(
    "./src/transpile.worker.js",
  );
  // WebWorkers use `postMessage` and therefore work with Comlink.
  transform = Comlink.wrap(worker);
  return transform;
}
init();
