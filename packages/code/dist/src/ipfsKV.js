import v from "./versions.js";
// import * as Comlink from "../../../dist/esm/comlink.mjs";
let ipfsWorker;
export const ipfsKV = {
    add: async (data, options) => (ipfsWorker || await initIpfsKV()).add(data, options),
    addAll: async (files) => (ipfsWorker || await initIpfsKV()).addAll(files),
};
async function initIpfsKV() {
    const {Comlink} = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`)
    
    const worker = new Worker("https://ipfs.io/ipfs/QmUXAFUtFGSmSNv5SMv5Q7jg2EdcC5UUFdzWdxQYk1SWCZ");
    ipfsWorker = Comlink.wrap(worker);
    return ipfsWorker;
}

