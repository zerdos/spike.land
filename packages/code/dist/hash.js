import versions from "./versions.js";
const v = versions();
/**
 *
 * @param {string} cid
 */
const feedTheCache = (cid) => fetch(`https://code.zed.vision/ipfs/${cid}`).then((resp) => resp.text()).then(console.log);
/**
 * @param {string | any[]} data
 */
const half = (data) => {
    const halfLength = (data.length - data.length % 2) / 2;
    if (data.slice(0, halfLength) === data.slice(halfLength - 1, 2 * halfLength - 1)) {
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
    ipfsClient = (await (await new Function(`return import("https://unpkg.com/@zedvision/code@${v.code}/src/ipfsKV.js")`)()).getIpfsClient());
    return ipfsClient;
}
/**
 * @param {any} data
 * @param {any} onlyHash
 */
const hash = async (data, onlyHash) => {
    console.log("asking for client");
    /** @type {{ add: (arg0: string, arg1: { onlyHash: any; }) => any; } | null} */
    const client = await getClient();
    if (client === null) {
        console.log("no client - exiting");
        return null;
    }
    const noisyHashes = (await Promise.all([
        await client.add(data, { onlyHash }),
        await client.add(`${data}N${data}`, { onlyHash }),
        await client.add(`${data}O${data}`, { onlyHash }),
        await client.add(`${data}I${data}`, { onlyHash }),
        await client.add(`${data}S${data}`, { onlyHash }),
        await client.add(`${data}E${data}`, { onlyHash }),
        await client.add(`${data}!${data}`, { onlyHash }),
    ]));
    if (!onlyHash) {
        console.log("feeding the cache");
        await Promise.all(noisyHashes.map(feedTheCache));
        console.log("cahce is fed");
    }
    if (onlyHash) {
        noisyHashes.map(getHash);
    }
    return noisyHashes;
};
/**
 * @param {string} cid
 * @param {number|undefined} _timeOut
 */
const getHash = async (cid, _timeOut) => {
    const timeout = _timeOut || 20000;
    try {
        /** @type {{ cat: (arg0: any, arg1: any) => any; } | null} */
        const client = (await getClient());
        if (client === null) {
            return null;
        }
        const data = await client.cat(cid, { timeout });
        return half(data);
    }
    catch (e) {
        console.log({ e });
    }
};
export { hash };
export { getHash };
