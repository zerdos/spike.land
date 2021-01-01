import versions from "./versions.js";

/** @type {{ add: (arg0: any, arg1: any) => any; addAll: (arg0: any) => any; get: (arg0: any, arg1: any) => any; }} */
let worker;
export const getIpfsClient = async () => {
  worker = await init();

  return {
    /**
 * @param {any} data
 * @param {{ onlyHash: boolean; }} options
 */

    add: (data, options) => worker.add(data, options),

    /**
   * 
   * @param {*} files 
   */
    addAll: (files) => worker.addAll(files),

    /**
   * 
   * @param {string} cid 
   * @param {number} timeout 
   */
    get: (cid, timeout) => worker.get(cid, timeout),
  };
};

async function init() {
  const v = versions();
  const res = await fetch(
    `https://unpkg.com/@zedvision/code@${v.code}/src/ipfsKV.worker.js`,
  );
  const workerSource = await res.text();
  const worker = new Worker(
    URL.createObjectURL(
      new Blob([
        workerSource
          .replace("$$ipfs$$", v.ipfs)
          .replace("$$comlinks$$", v.comlink),
      ]),
    ),
  );
  const Comlink = await import(
    `https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`
  );

  return Comlink.wrap(worker);
}
