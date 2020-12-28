export const hash = (data, onlyHash) =>
  new Function(
    `return import("https://ipfs.io/ipfs/QmS7exUuYvwCiX9aFCmiQ43JQAPPvgV4KZTmEnKZF3cwyF/src/ipfsKV.js")`,
  )().then((mod) => mod.getIpfsClient()).then((x) => x.add(data, { onlyHash }));

export const getHash = (cid, timeout) =>
new Function(
  `return import("https://ipfs.io/ipfs/QmS7exUuYvwCiX9aFCmiQ43JQAPPvgV4KZTmEnKZF3cwyF/src/ipfsKV.js")`,
)().then((mod) => mod.getIpfsClient()).then((x) => x.get(cid, timeout));
