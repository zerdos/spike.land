export const hash = (data, onlyHash) =>
  new Function(`return import("./code/src/ipfsKV.js")`)().then((mod) =>
    mod.ipfsKV
  ).then((x) => x.add(data, { onlyHash }));
