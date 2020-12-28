let ipfsClient = null;
async function getClient() {
  if (ipfsClient) {
    return ipfsClient;
  }

  ipfsClient = (await (await new Function(
    `return import("https://ipfs.io/ipfs/QmWoMiLNqEY6S3GWXgxrZVZvuUYeFSJMjyo1gmtcWUgDwp/src/ipfsKV.js")`,
  )()).getIpfsClient());
  return ipfsClient;
}

const hash = async (data, onlyHash) => {
  const client = await getClient();
  return (await Promise.all([
    await client.add(`${data}N${data}`, { onlyHash }),
    await client.add(`${data}O${data}`, { onlyHash }),
    await client.add(`${data}I${data}`, { onlyHash }),
    await client.add(`${data}S${data}`, { onlyHash }),
    await client.add(`${data}E${data}`, { onlyHash }),
    await client.add(`${data}!${data}`, { onlyHash }),
  ]));
};

const getHash = async (cid, timeout) => {
  const client = (await getClient());

  const data = await client.get(cid, timeout);

  const halfLength = (data.length - data.length % 2) / 2;

  if (data.slice(0, halfLength) === data.slice(halfLength, 2 * halfLength)) {
    return (data.slice(0, halfLength));
  }
  return data;
};

export { hash };
export { getHash };
