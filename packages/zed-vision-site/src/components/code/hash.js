export const hash = (data, onlyHash) =>
  new Function(
    `return import("https://ipfs.io/ipfs/QmWsNQvhWkQnv1oyEVifraZASN1Ya8Z7g6APfofT54Wpua/src/ipfsKV.js")`,
  )().then((mod) => mod.ipfsKV).then((x) => x.add(data, { onlyHash }));
