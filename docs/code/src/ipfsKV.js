import versions from "./versions.js";
let ipfsWorker;
export const ipfsKV = {
    add: async (data, options) => (await init()).add(data, options),
    addAll: async (files) => (await init()).addAll(files),
};

async function init(){

    if (ipfsWorker) return ipfsWorker;
    const workerCom = await( await initIpfsKV());

    
    return new Promise((resolve=>{
        const checkSave = () =>  setTimeout(async()=>{

            const init = await (await(workerCom)).add("ddd");

            if (typeof init ==="string") {

                ipfsWorker=workerCom;
                resolve(workerCom);

            }
            else{
                checkSave();
            }}, 10)
    

    }));    
}
async function initIpfsKV() {
    const v = versions();
    const res = await fetch(`https://ipfs.io/ipfs/${v.ipfs}/src/ipfsKV.worker.js`);
    const workerSource = await res.text();
    const worker = new Worker(URL.createObjectURL(new Blob([workerSource.replace("$$ipfs$$", v.ipfs)])));
    const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);

    return ipfsWorker = await Comlink.wrap(worker);
}
