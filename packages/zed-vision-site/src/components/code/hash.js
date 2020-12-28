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

const hash = async (data, onlyHash) =>{

const client = await getClient();
return (await Promise.all([
  await client.add(`${data}N${data}`, {onlyHash}),
  await client.add(`${data}O${data}`, {onlyHash}),
  await client.add(`${data}I${data}`, {onlyHash}),
  await client.add(`${data}S${data}`, {onlyHash}),
  await client.add(`${data}E${data}`, {onlyHash}),
  await client.add(`${data}!${data}`, {onlyHash})
]));

}
 

const getHash = async (cid, timeout) => (await getClient()).get(cid , timeout);

export { hash };
export { getHash };
