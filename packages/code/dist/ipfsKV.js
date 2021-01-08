import versions from "./versions.js";
/** @type {{ add: (arg0: any, arg1: any) => any; addAll: (arg0: any) => any; cat: (arg0: any, arg1: any) => any; }} */
let worker;
export const getIpfsClient = async () => {
    worker = await init();
    return {
        /**
     * @param {any} data
     * @param {{ onlyHash: boolean; }} options
     */
        add: (data, options) => {
            try {
                return worker.add(data, options);
            }
            catch (e) {
                console.log({ "Comlink-add": e });
            }
        },
        /**
       *
       * @param {*} files
       */
        addAll: (files) => worker.addAll(files),
        /**
       *
       * @param {string} cid
       * @param {{
       *          offset?: number;
       *          length?: number;
       *          timeout?: 	number;
       *         signal?: 	AbortSignal;
        *        }}  options
       */
        cat: (cid, { timeout }) => {
            try {
                return worker.cat(cid, { timeout });
            }
            catch (e) {
                console.log({ "comlink-cat": e });
            }
        },
    };
};
async function init() {
    try {
        const v = versions();
        const res = await fetch(window.location.hostname === "[::1]"
            ? `./src/ipfsKV.worker.js`
            : `https://blog.zed.vision/code/src/ipfsKV.worker.js`);
        const workerSource = await res.text();
        const worker = new Worker(URL.createObjectURL(new Blob([
            workerSource
                .replace("$$ipfs$$", v.ipfs)
                .replace("$$comlink$$", v.comlink),
        ])));
        const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);
        return Comlink.wrap(worker);
    }
    catch (e) {
        console.log({ "COMLINK": e });
    }
}
