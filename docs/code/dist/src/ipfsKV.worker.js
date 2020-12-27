"use strict";
try {
    const runner = async () => {
        const versions = (await import("https://ipfs.io/ipfs/$$ipfs$$/src/versions.js")).default;
        const v = versions();
        const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);
        const getIpfs = async () => {
            try {
                const ipfs = (await import(`https://ipfs.io/ipfs/${v.ipfs}/vendor/ipfs/ipfs.esm.js`)).default;
                return ipfs;
            }
            catch (e) {
                //noise canceling
            }
        };
        let ipfsNode;
        const ipfsKV = {
            add: async (data, options) => {
                ipfsNode = ipfsNode || await (await getIpfs()).create();
                const { cid } = await ipfsNode.add(data, options);
                if (options && options.onlyHash) {
                    return (new Ipfs.CID(1, 112, cid.multihash)).toString();
                }
                return cid.string;
            },
            addAll: async (files) => {
                try {
                    ipfsNode = ipfsNode || await (await getIpfs()).create();
                    const res = [];
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
            init: async () => {
                ipfsNode = ipfsNode || await (await getIpfs()).create();
                return "ok";
            }
        };
        Comlink.expose(ipfsKV);
    };
    runner();
}
catch (_a) {
    //just noise reducing c:)
}
