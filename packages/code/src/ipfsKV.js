import versions from "./versions.js";

let worker = null;
export const getIpfsClient = async () => {
  worker = await init();

  return {
    add: (data, options) => worker.add(data, options),
    addAll: (files) => worker.addAll(files),
    get: (cid, timeout) => worker.get(cid, timeout),
  };
};

async function init() {
  const v = versions();
  const res = await fetch(
    `${v.ipfs}/src/ipfsKV.worker.js`,
  );
  const workerSource = await res.text();
  const worker = new Worker(
    URL.createObjectURL(new Blob([workerSource.replace("$$ipfs$$", v.ipfs)])),
  );
  const Comlink = await import(
    `https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`
  );

  return Comlink.wrap(worker);
}
