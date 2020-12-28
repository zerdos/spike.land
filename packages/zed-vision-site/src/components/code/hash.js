export const hash = (data, onlyHash) =>
  new Function(
    `return import("https://ipfs.io/ipfs/QmP1VWYt6UWuNoB1xyqrK9yjgXkXcLqgtktnGYAUSVh1zL/src/ipfsKV.js")`,
  )().then((mod) => mod.ipfsKV).then((x) => x.add(data, { onlyHash }));

export const getHash = (cid, timeout) =>
new Function(
  `return import("https://ipfs.io/ipfs/QmP1VWYt6UWuNoB1xyqrK9yjgXkXcLqgtktnGYAUSVh1zL/src/ipfsKV.js")`,
)().then((mod) => mod.ipfsKV).then((x) => x.get(cid, timeout));
