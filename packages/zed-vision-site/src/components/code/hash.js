export const hash = (data, onlyHash) =>
  new Function(`return import("https://ipfs.io/ipfs/QmZhJ28SpQWuG4BMebfB6XYt99kErQ5NVnpQGWgDEHsJqo/src/ipfsKV.js")`)().then((mod) =>
    mod.ipfsKV
  ).then((x) => x.add(data, { onlyHash }));
