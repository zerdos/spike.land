importScripts("https://unpkg.com/ipfs@$$ipfs$$/dist/index.min.js");
importScripts("https://unpkg.com/comlink@$$comlink$$/dist/umd/comlink.js");

// deno-lint-ignore ban-ts-comment
// @ts-ignore
const IPFS = (() => globalThis.Ipfs)();

/** @type {{ add: (arg0: any, arg1: any) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (cid: string, options: { offset?: number;  length?: number; timeout?: 	number;         signal?: 	AbortSignal;        } ) => AsyncIterable<Uint8Array> }} */
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
   * @param {{
    *          offset?: number;
    *          length?: number;
    *          timeout?: 	number;
    *         signal?: 	AbortSignal;
     *        }}  options 
    */
  cat: async (cid, options) => {
    try {
      ipfsNode = ipfsNode || await IPFS.create();
      const res = [];

      for await (const result of ipfsNode.cat(cid, options)) {
        res.push(new TextDecoder("utf-8").decode(result));
      }

      return res.join("");
    } catch (e) {
      return ({ e });
    }
  },
};

// deno-lint-ignore ban-ts-comment
// @ts-ignore
// deno-lint-ignore no-undef
Comlink.expose(ipfsKV);
