"use strict";
importScripts("https://unpkg.com/ipfs@0.52.3/dist/index.min.js");
importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.js");
//   };
let ipfsNode;
const ipfsKV = {
    add: async (data, options) => {
        ipfsNode = ipfsNode || await Ipfs.create();
        const { cid } = await ipfsNode.add(data, options);
        if (options && options.onlyHash) {
            return (new Ipfs.CID(1, 112, cid.multihash)).toString();
        }
        return cid.string;
    },
    addAll: async (files) => {
        try {
            ipfsNode = ipfsNode || await Ipfs.create();
            const res = [];
            ipfsNode = ipfsNode || await (await getIpfs()).create();
            for await (const result of ipfsNode.addAll(files)) {
                const { path, cid } = result;
                const CID = cid.string;
                res.push({ path, CID });
            }
            return res;
        }
        catch (e) {
            return ({ e });
        }
    },
    get: async (cid, timeout) => {
        let result = "";
        ipfsNode = ipfsNode || await Ipfs.create();
        for await (let res of ipfsNode.cat(cid, { timeout: 30000 })) {
            result = result + res;
        }
        return result;
    },
};
Comlink.expose(ipfsKV);
