export const hash = (data, onlyHash) =>
  new Function(
    `return import("https://ipfs.io/ipfs/QmUnzntbvHKjADyKdUNmYLmWrwvdYkqoC6CKg127pgLM2K/src/ipfsKV.js")`,
  )().then((mod) => mod.getIpfsClient()).then((x) => x.add(data, { onlyHash }));

export const getHash = (cid, timeout) =>
new Function(
  `return import("https://ipfs.io/ipfs/QmUnzntbvHKjADyKdUNmYLmWrwvdYkqoC6CKg127pgLM2K/src/ipfsKV.js")`,
)().then((mod) => mod.getIpfsClient()).then((x) => x.get(cid, timeout));
