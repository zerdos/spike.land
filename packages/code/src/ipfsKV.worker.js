importScripts("https://unpkg.com/ipfs@0.52.3/dist/index.min.js");
importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.js");

//   };ya

/** @type {{ add: (arg0: any, arg1: any) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (arg0: any, arg1: { timeout: any; }) => any; }} */
let ipfsNode;

const ipfsKV = {
  /**
 * @param {any} data
 * @param {{ onlyHash: any; }} options
 */
  add: async (data, options) => {
    //@ts-ignore
    ipfsNode = ipfsNode || await Ipfs.create();

    const { cid } = await ipfsNode.add(data, options);

    if (
      options && options.onlyHash
    ) {
      //@ts-ignore
      return (new Ipfs.CID(1, 112, cid.multihash)).toString();
    }

    return cid.string;
  },
  /**
   * 
   * @param {*} files 
   */
  addAll: async (files) => {
    try {
      //@ts-ignore
      ipfsNode = ipfsNode || await Ipfs.create();

      const res = [];
      //@ts-ignore
      ipfsNode = ipfsNode || await (await getIpfs()).create();

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
   * @param {number} timeout 
   */
  get: async (cid, timeout) => {
    let result = "";
    //@ts-ignore
    ipfsNode = ipfsNode || await Ipfs.create();
    for await (let res of ipfsNode.cat(cid, { timeout })) {
      result = result + res;
    }
    return result;
  },
};

//@ts-ignore
Comlink.expose(ipfsKV);
