export const hash = (data, onlyHash) =>
  new Function(
    `return import("https://ipfs.io/ipfs/QmP1d2vY5wHmxLnAYDx4oXEDZsMSDr8oxeESGZH8KAFFco/src/ipfsKV.js")`,
  )().then((mod) => mod.getIpfsClient()).then((x) => x.add(data, { onlyHash }));

export const getHash = (cid, timeout) =>
new Function(
  `return import("https://ipfs.io/ipfs/QmP1d2vY5wHmxLnAYDx4oXEDZsMSDr8oxeESGZH8KAFFco/src/ipfsKV.js")`,
)().then((mod) => mod.getIpfsClient()).then((x) => x.get(cid, timeout));
