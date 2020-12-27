import versions from "./versions.js";
let ipfsWorker;
export const ipfsKV = {
    add: async (data, options) => await (await getWorker()).add(data, options),
    addAll: async (files) =>await  (await getWorker()).addAll(files),
};

async function getWorker(){
    if (ipfsWorker) retur ipfsWorker;
    const worker= await(initIpfsKV());
    const init = await(worker.init());
    ipfsWorker=worker;
}

async function initIpfsKV() {
    const v = versions();
    const res = await fetch(`https://ipfs.io/ipfs/${v.ipfs}/src/ipfsKV.worker.js`);
    const workerSource = await res.text();
    const worker = new Worker(URL.createObjectURL(new Blob([workerSource.replace("$$ipfs$$", v.ipfs)])));
    const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);

    return ipfsWorker = await Comlink.wrap(worker);
}
