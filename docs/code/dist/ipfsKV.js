import * as Comlink from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.mjs";
// import * as Comlink from "../../../dist/esm/comlink.mjs";
let ipfsWorker;
export const ipfsKV = {
    add: async (data) => (ipfsWorker || await initIpfsKV()).add(data),
};
function initIpfsKV() {
    const worker = new Worker("./src/ipfsKV.worker.js");
    ipfsWorker = Comlink.wrap(worker);
    return ipfsWorker;
}
initIpfsKV();
