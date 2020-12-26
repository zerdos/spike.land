"use strict";
importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.js");
importScripts("https://unpkg.com/ipfs@0.52.3/dist/index.min.js");
// async function getIpfsiD() {
//   const { shaDB } = await import("./db.js");
//   const v4 =
//     (await import("https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js"))
//       .default;
//   let ipfsId = await shaDB.get("ipfs");
//   if (!ipfsId) {
//     ipfsId = v4();
//     await shaDB.put("ipfs", ipfsId);
//   }
//   return ipfsId;
// }
let ipfsNode;
try {
    const ipfsKV = {
        add: async (data, options) => {
            ipfsNode = ipfsNode || await Ipfs.create();
            const { cid } = await ipfsNode.add(typeof data === "string" ? data : Ipfs.urlSource(data), options);
            if (options && options.onlyHash)
                return (new Ipfs.CID(1, 112, cid.multihash)).toString();
            return cid.string;
        },
        get: async (key) => {
            return Promise.resolve("degjreoige");
        },
    };
    Comlink.expose(ipfsKV);
}
catch (_a) {
    //just noise reducing c:)
}
