"use strict";
import { __asyncValues } from "tslib";
importScripts("https://unpkg.com/ipfs@$$ipfs$$/dist/index.min.js");
importScripts("https://unpkg.com/comlink@$$comlink$$/dist/umd/comlink.js");
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
        if (options && options.onlyHash) {
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
        var e_1, _a;
        try {
            //@ts-ignore
            ipfsNode = ipfsNode || await Ipfs.create();
            const res = [];
            //@ts-ignore
            ipfsNode = ipfsNode || await (await getIpfs()).create();
            try {
                for (var _b = __asyncValues(ipfsNode.addAll(files)), _c; _c = await _b.next(), !_c.done;) {
                    const result = _c.value;
                    const { path, cid } = result;
                    const CID = cid.string;
                    res.push({ path, CID });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return res;
        }
        catch (e) {
            return ({ e });
        }
    },
    /**
     *
     * @param {string} cid
     * @param {number} timeout
     */
    get: async (cid, timeout) => {
        var e_2, _a;
        let result = "";
        //@ts-ignore
        ipfsNode = ipfsNode || await Ipfs.create();
        try {
            for (var _b = __asyncValues(ipfsNode.cat(cid, { timeout })), _c; _c = await _b.next(), !_c.done;) {
                let res = _c.value;
                result = result + res;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    },
};
//@ts-ignore
Comlink.expose(ipfsKV);
