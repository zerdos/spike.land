export const hash = (data, onlyHash) =>
  new Function(
    `return import("https://ipfs.io/ipfs/QmUgP6zzm3KDxXRBBiQpPimnkAodzNhXDAePpt7Dy42q65/src/ipfsKV.js")`,
  )().then((mod) => mod.ipfsKV).then((x) => x.add(data, { onlyHash }));

export const getHash = (cid, timeout) =>
new Function(
  `return import("https://ipfs.io/ipfs/QmUgP6zzm3KDxXRBBiQpPimnkAodzNhXDAePpt7Dy42q65/src/ipfsKV.js")`,
)().then((mod) => mod.ipfsKV).then((x) => x.get(cid, timeout));
