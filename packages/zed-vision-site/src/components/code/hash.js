let ipfsClient;
async function getClient() {
  if (ipfsClient) {
    return ipfsClient;
  }

  ipfsClient = (await (await new Function(
    `return import("https://ipfs.io/ipfs/QmS7exUuYvwCiX9aFCmiQ43JQAPPvgV4KZTmEnKZF3cwyF/src/ipfsKV.js")`,
  )()).getIpfsClient());
}

export const hash = async (data, onlyHash) =>
  (await getClient()).add(data, { onlyHash });

export const getHash = async (cid, timeout) =>
  (await getClient()).get(cid, timeout);
