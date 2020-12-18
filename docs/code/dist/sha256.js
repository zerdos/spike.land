import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

let wArrBuffSha256;

export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  return arrBuffSha256(msgBuffer);
}

export async function arrBuffSha256(msgBuffer) {
  wArrBuffSha256 = wArrBuffSha256 || await init();
  return wArrBuffSha256(msgBuffer);
}

function init() {
  const worker = new Worker("./dist/sha256.worker.js");
  // WebWorkers use `postMessage` and therefore work with Comlink.
  wArrBuffSha256 = Comlink.wrap(worker);
  return wArrBuffSha256;
}
init();
