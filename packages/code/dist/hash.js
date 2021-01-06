import versions from "./versions.js";
const v = versions();
/**
 *
 * @param {string} cid
 */
const feedTheCache = (cid) => console.log(cid);
// fetch(`https://code.zed.vision/ipfs/${cid}`).then((resp) => resp.text()).then(
//   console.log,
// );
/**
 * @param {string | any[]} data
 */
const half = (data) => {
    const halfLength = (data.length - (data.length % 2)) / 2;
    if (data.slice(0, halfLength - 1) === data.slice(halfLength + 1, 2 * halfLength)) {
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
    ipfsClient = (await (await new Function(window.location.hostname === "[::1]"
        ? `return import("./ipfsKV.js")`
        : `return import("https://unpkg.com/@zedvision/code@${v.code}/src/ipfsKV.js")`)()).getIpfsClient());
    return ipfsClient;
}
/**
 * @param {any} data
 * @param {any} onlyHash
 */
const hash = async (data, onlyHash) => {
    //  console.log("asking for client");
    /** @type {{ add: (arg0: string, arg1: { onlyHash: any; }) => any; } | null} */
    const client = await getClient();
    if (client === null) {
        //  console.log("no client - exiting");
        return { success: false };
    }
    const noisyHashes = (await Promise.all([
        await client.add(`${data}`, { onlyHash }),
    ]));
    if (!onlyHash) {
        // console.log("feeding the cache");
        await Promise.all(noisyHashes.map(feedTheCache));
        //console.log("cahce is fed");
    }
    if (onlyHash) {
        const res = await Promise.all(noisyHashes.map((cid) => getHash(cid, 20000).then((x) => ({ success: x === data }))));
        return res[0];
    }
    return { success: true };
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
            return { success: false };
        }
        const data = await client.cat(cid, { timeout });
        if (typeof data === "string")
            return half(data);
        console.error({ data });
    }
    catch (e) {
        console.log({ e });
    }
};
/**
 * @param {string} signal => Promise<{success: boolean}>
 */
export const waitForSignal = (signal) => {
    return hash(signal, true).catch(() => ({ success: false }));
};
/**
 * @param {string} signal => Promise<{success: boolean}>
 */
export const sendSignal = (signal) => {
    return hash(signal, false);
};
/**
 * @param {string} url
 */
export const waitForSignalAndJump = async (url) => {
    const { success } = await waitForSignal(url);
    if (success) {
        window.location.href = url;
    }
};
