

// async function getIpfsiD() {
//   const { shaDB } = await import("./db.js");
//   const v4 =
//     (await import("https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js"))
//       .default;

import { func } from "prop-types";

//   let ipfsId = await shaDB.get("ipfs");
//   if (!ipfsId) {
//     ipfsId = v4();

//     await shaDB.put("ipfs", ipfsId);
//   }

//   return ipfsId;
// }

let ipfsNode;

try {




  const runner = async ()=>{
    const versions= await(import("https://ipfs.io/ipfs/$$ipfs$$/src/versions.js")).default;

    const v = versions();

    const Comlink = await import(`https://unpkg.com/comlink@${v.comlink}/dist/esm/comlink.mjs`);

    const getIpfs = async () =>{
      const ipfs = (await import(`https://ipfs.io/ifps/${v.ipfs}/vendor/ipfs.min.js`).default)
      return ipfs;
    }

    const ipfsKV = {
      add: async (data, options) => {
        ipfsNode = ipfsNode || await (await getIpfs()).create();
  
        const { cid } = await ipfsNode.add(data, options);
  
        if (
          options && options.onlyHash
        ) {
          return (new Ipfs.CID(1, 112, cid.multihash)).toString();
        }
  
        return cid.string;
      },
      addAll: async (files)=>{
        try{
        ipfsNode = ipfsNode || await (await getIpfs().create();
  
        const res = []
        for await (const result of ipfsNode.addAll(files)) {
          const {path, cid} = result
          const CID = cid.string
          res.push({path, CID});
        }
  
        return res;
        }catch(e)
        {
          return ({e})
        }
      }
    };

    Comlink.expose(ipfsKV);
  }
runner();
} catch {
  //just noise reducing c:)
}
