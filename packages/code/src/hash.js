import versions from "./versions.js";
const v = versions();

/**
 * @param {string | any[]} data
 */
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

/** @type {null | {add: (data: string)=>Promise<string>}} */
let ipfsClient = null;

async function getClient() {
  if (ipfsClient) {
    return ipfsClient;
  }

  ipfsClient = (await (await new Function(
    `return import("https://unpkg.com/@zedvision/code@${v.code}/src/ipfsKV.js")`,
  )()).getIpfsClient());
  return ipfsClient;
}

/**
 * @param {any} data
 * @param {any} onlyHash
 */
const hash = async (data, onlyHash) => {
  /** @type {{ add: (arg0: string, arg1: { onlyHash: any; }) => any; } | null} */
  const client = await getClient();
  if (client === null) {
    return null;
  }
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

/**
 * @param {any} cid
 * @param {any} timeout
 */
const getHash = async (cid, timeout) => {
  try {
    /** @type {{ get: (arg0: any, arg1: any) => any; } | null} */
    const client = (await getClient());

    if (client === null) {
      return null;
    }

    const data = await client.get(cid, timeout);

    return half(data);
  } catch (e) {
    console.log({ e });
  }
};

export { hash };
export { getHash };
