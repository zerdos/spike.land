importScripts("https://unpkg.com/ipfs@$$ipfs$$/dist/index.min.js");
importScripts("https://unpkg.com/comlink@$$comlink$$/dist/umd/comlink.js");

//   };ya
// deno-lint-ignore ban-ts-comment
// @ts-ignore

/**
 * {
 * create: ()=> Promise<{add: (data: s)=>void }>
 * }
 */

// deno-lint-ignore ban-ts-comment
// @ts-ignore
const IPFS = (() => globalThis.Ipfs)();

/** @type {{ add: (arg0: any, arg1: any) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (arg0: any, arg1: { timeout: any; }) => any; }} */
let ipfsNode;

const ipfsKV = {
  /**
 * @param {string} data
 * @param {{ onlyHash: boolean; }} options
 */
  add: async (data, options) => {
    ipfsNode = ipfsNode || await IPFS.create();

    const { cid } = await ipfsNode.add(data, options);

    if (
      options && options.onlyHash
    ) {
      return (new IPFS.CID(0, 112, cid.multihash)).toString();
    }

    return cid.string;
  },
  /**
   * 
   * @param {*} files 
   */
  addAll: async (files) => {
    try {
      ipfsNode = ipfsNode || await IPFS.create();
      const res = [];

      for await (const result of ipfsNode.addAll(files)) {
        const { path, cid } = result;
        const CID = cid.string;
        res.push({ path, CID });
      }

      return res;
    } catch (e) {
      return ({ e });
    }
  },
  /**
   * 
   * @param {string} cid 
   * @param {any} options 
   */
  cat: async (cid, options) => {
    ipfsNode = ipfsNode || await IPFS.create();
    const res = [];

    for await (const result of ipfsNode.cat(cid, options)) {
      const { path, cid } = result;
      const CID = cid.string;
      res.push({ path, CID });
    }

    return res;
  },
};

// deno-lint-ignore ban-ts-comment
// @ts-ignore
// deno-lint-ignore no-undef
Comlink.expose(ipfsKV);
