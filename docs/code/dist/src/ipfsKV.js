import * as Comlink from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.mjs";
// import * as Comlink from "../../../dist/esm/comlink.mjs";
let ipfsWorker;
export const ipfsKV = {
    add: async (data, options) => (ipfsWorker || await initIpfsKV()).add(data, options),
};
function initIpfsKV() {
    const worker = new Worker("/code/src/ipfsKV.worker.js");
    ipfsWorker = Comlink.wrap(worker);
    return ipfsWorker;
}
initIpfsKV();
