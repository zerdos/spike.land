importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
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

try{

const ipfsKV = {
  add: async (data) => {
    ipfsNode = ipfsNode || await Ipfs.create();
    const { cid } = await ipfsNode.add(Ipfs.urlSource(data));
    return cid.string;
  },
  get: async (key) => {
    return Promise.resolve("degjreoige");
  },
};

Comlink.expose(ipfsKV);
}
catch{
  //just noise reducing c:)
}