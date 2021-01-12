import versions from "./versions.js";
/** @type {{ add: (arg0: any, arg1: { onlyHash: boolean; }) => any; addAll: (arg0: any) => any; cat: (arg0: string, arg1: { timeout: number | undefined; }) => any; getData: (arg0: string, arg1: { timeout: number | undefined; }) => any; }} */
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
        getData: (cid, { timeout }) => {
            try {
                return worker.getData(cid, { timeout });
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
        const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);
        const res = await fetch(window.location.hostname === "[::1]"
            ? `./src/ipfsKV.worker.js`
            : `https://blog.zed.vision/code/src/ipfsKV.worker.js`);
        const workerSource = await res.text();
        const worker = new SharedWorker(URL.createObjectURL(new Blob([
            workerSource
                .replace("$$ipfs$$", v.ipfs)
                .replace("$$comlink$$", v.comlink),
        ])));
        worker.port.start();
        const { port1, port2 } = new MessageChannel();
        const msg = {
            comlinkInit: true,
            port: port1,
        };
        worker.port.postMessage(msg, [port1]);
        const swProxy = await Comlink.wrap(port2);
        return swProxy;
    }
    catch (e) {
        console.log({ "COMLINK": e });
    }
}
