importScripts("https://unpkg.com/ipfs@0.52.3/dist/index.min.js");
importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.js");

// @ts-ignore
addEventListener("install", () => skipWaiting());
// @ts-ignore
addEventListener("activate", () => clients.claim());

// deno-lint-ignore ban-ts-comment
// @ts-ignore
const IPFS = (() => globalThis.Ipfs)();

/** @type {{ add: (arg0: string, arg1: { onlyHash: boolean; }) => PromiseLike<{ cid: any; }> | { cid: any; }; addAll: (arg0: any) => any; cat: (arg0: string, arg1: { offset?: number | undefined; length?: number | undefined; timeout?: number | undefined; signal?: AbortSignal | undefined; }) => any; pubsub: { subscribe: (arg0: string, arg1: (msg: any) => void) => void; }; get: (arg0: string, arg1: { offset?: number | undefined; length?: number | undefined; timeout?: number | undefined; signal?: AbortSignal | undefined; }) => any; }} */ let ipfsNode;

const ipfsKV = {
  ipfsNode: null,
  /**
 * @param {string} data
 * @param {{ onlyHash: boolean; }} options
 */
  add: async (data, options) => {
    try {
      ipfsKV.ipfsNode = ipfsKV.ipfsNode || await IPFS.create({ silent: true });

      // console.log(await ipfsNode.config.getAll())

      const { cid } = await ipfsNode.add(data, options);

      if (
        options && options.onlyHash
      ) {
        return (new IPFS.CID(0, 112, cid.multihash)).toString();
      }

      return cid.string;
    } catch (e) {
      console.info({ e });
    }
  },
  /**
   * 
   * @param {*} files 
   */
  addAll: async (files) => {
    try {
      ipfsKV.ipfsNode = ipfsKV.ipfsNode || await IPFS.create({ silent: true });
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
      ipfsKV.ipfsNode = ipfsKV.ipfsNode || await IPFS.create({ silent: true });
      const res = [];

      for await (const result of ipfsNode.cat(cid, options)) {
        console.log("RES", result);
        res.push(new TextDecoder("utf-8").decode(result));
      }

      return res.join("");
    } catch (e) {
      return (JSON.stringify({ e }));
    }
  },

  pubsubSubscribe:
    /**
   * 
   * @param {string} topic 
   */
    async (topic) => {
      try {
        ipfsKV.ipfsNode = ipfsKV.ipfsNode ||
          await IPFS.create({ silent: true });
        const res = [];

        const receiveMsg =
          /**
       * 
       * @param {*} msg 
       */
          (msg) => console.log(msg.data.toString());

        ipfsNode.pubsub.subscribe(topic, receiveMsg);

        // @ts-ignore
        for await (const result of ipfsNode.cat(cid, options)) {
          console.log("RES", result);
          res.push(new TextDecoder("utf-8").decode(result));
        }

        return res.join("");
      } catch (e) {
        return (JSON.stringify({ e }));
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
  // @ts-ignore
  getData: async (cid, options) => {
    try {
      ipfsKV.ipfsNode = ipfsKV.ipfsNode || await IPFS.create({ silent: true });
      const res = [];

      for await (const result of ipfsNode.get(cid, options)) {
        console.log("RES", result);
        res.push(new TextDecoder("utf-8").decode(result));
      }

      return res.join("");
    } catch (e) {
      return (JSON.stringify({ e }));
    }
  },
  // @ts-ignore
};
// deno-lint-ignore no-undef
// @ts-ignore
self.addEventListener(
  "connect",
  // @ts-ignore
  (e) => Comlink.expose(ipfsKV, e.ports[0]),
);

// deno-lint-ignore no-undef
// @ts-ignore
addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    //@ts
    // @ts-ignore
    Comlink.expose(ipfsKV, event.data.port);
    return;
  }
});
