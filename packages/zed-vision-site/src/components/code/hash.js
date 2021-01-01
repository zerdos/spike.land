let ipfsClient = null;

const half = (data) => {
  const halfLength = (data.length - data.length % 2) / 2;

  if (
    data.slice(0, halfLength) === data.slice(halfLength - 1, 2 * halfLength - 1)
  ) {
    return (data.slice(0, halfLength));
  }

  // console.log({
  //   slice1: data.slice(0, halfLength) ,
  //   slice2: data.slice(halfLength-1, 2 * halfLength-1)
  // })

  return data;
};

async function getClient() {
  if (ipfsClient) {
    return ipfsClient;
  }

  ipfsClient = (await (await new Function(
    `return import("https://unpkg.com/@zedvision/code@11.1.7/src/ipfsKV.js")`,
  )()).getIpfsClient());
  return ipfsClient;
}

const hash = async (data, onlyHash) => {
  const client = await getClient();
  return (await Promise.all([
    await client.add(data, { onlyHash }),
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
  return half(data);
};

export { hash };
export { getHash };
