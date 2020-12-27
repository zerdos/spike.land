import v from "./versions.js";
let ipfsWorker;
export const ipfsKV = {
    add: async (data, options) => (ipfsWorker || await initIpfsKV()).add(data, options),
    addAll: async (files) => (ipfsWorker || await initIpfsKV()).addAll(files),
};
function initIpfsKV() {
    const worker = new Worker(`https://ipfs.io/ipfs/${v.ipfs}/src/ipfsKV.worker.js`);
    const { Comlink } = await import("https://unpkg.com/comlink@4.3.0/dist/esm/comlink.mjs");
    ipfsWorker = Comlink.wrap(worker);
    return ipfsWorker;
}
