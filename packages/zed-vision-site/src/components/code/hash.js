let ipfsClient;
async function getClient() {
  if (ipfsClient) {
    return ipfsClient;
  }

  ipfsClient = (await (await new Function(
    `return import("https://ipfs.io/ipfs/QmTYsX4dvCBM5CaVmbqTvZz4aD9hJAv1DRW4x4fYZMTsux/src/ipfsKV.js")`,
  )()).getIpfsClient());
  return ipfsClient;
}

export const hash = async (data, onlyHash) =>
  (await getClient()).add(data, { onlyHash });

export const getHash = async (cid, timeout) =>
  (await getClient()).get(cid, timeout);
