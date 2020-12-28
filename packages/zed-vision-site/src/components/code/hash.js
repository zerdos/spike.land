let ipfsClient;
async function getClient() {
  if (ipfsClient) {
    return ipfsClient;
  }

  ipfsClient = (await (await new Function(
    `return import("https://ipfs.io/ipfs/QmSCb1JmrpKQaj6bZYJCEsFfV4w6aomgjDR1zdT9Zu9tFY/src/ipfsKV.js")`,
  )()).getIpfsClient());
  return ipfsClient;
}

 const hash = async (data, onlyHash) =>
  (await getClient()).add(data, { onlyHash });

 const getHash = async (cid, timeout) =>
  (await getClient()).get(cid, timeout);
