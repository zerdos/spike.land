import versions from "./versions.js";
let ipfsWorker;
export const ipfsKV = {
    add: async (data, options) => (ipfsWorker || await initIpfsKV()).add(data, options),
    addAll: async (files) => (ipfsWorker || await initIpfsKV()).addAll(files),
};
async function initIpfsKV() {
    const v = versions();
    const res = await fetch(`https://ipfs.io/ipfs/${v.ipfs}/src/ipfsKV.worker.js`);
    const workerSource = await res.text();
    const worker = new Worker(URL.createObjectURL(new Blob([workerSource])));
    const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);
    ipfsWorker = Comlink.wrap(worker);
    return ipfsWorker;
}
