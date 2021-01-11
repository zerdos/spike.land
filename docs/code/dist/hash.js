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
        : `return import("https://blog.zed.vision/code/src/ipfsKV.js")`)()).getIpfsClient());
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
        return { success: false };
    }
    const noisyHashes = (await Promise.all([
        await client.add(`${data}`, { onlyHash }),
    ]));
    if (!onlyHash) {
        await Promise.all(noisyHashes.map(feedTheCache));
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
        /** @type {{ get: (arg0: any, arg1: any) => any; } | null} */
        const client = (await getClient());
        if (client === null) {
            return { success: false };
        }
        const data = await client.get(cid, { timeout });
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
    try {
        const { success } = await waitForSignal(url);
        if (success) {
            window.location.href = url;
        }
    }
    catch (e) {
        console.log({ msg: "SignalAndJump error", e });
    }
    finally {
        console.log({ msg: "SignalAndJump Final" });
    }
};
/**
 * @param {{signal: string, onSignal: (getData: ()=> any)=>any, onError?: ()=>any, onExpired?: ()=>any }} opts
 */
export const waitForSignalAndRun = async ({ signal, onSignal, onError, onExpired }) => {
    try {
        const { success } = await waitForSignal(signal);
        if (success) {
            if (typeof onSignal === "function") {
                return onSignal(async () => {
                    const char = await getNextChar(signal);
                    return char;
                });
            }
            return 0;
        }
        return 1;
    }
    catch (e) {
        if (typeof onError === "function") {
            return onError();
        }
        return 1;
    }
    finally {
        if (typeof onExpired === "function")
            return onExpired();
        return -1;
    }
};
export const getNextChar = 
/**
* @param {string} signal
*/
async (signal) => {
    const chars = [..."0123456789abcdef"];
    const nextChar = await raceToSuccess(chars.map((x) => waitForSignal(signal + x).then((s) => {
        if (s.success)
            return x;
        throw new Error("nope");
    })));
    return nextChar;
};
/**
 * @param {any[]} promises
 */
function raceToSuccess(promises) {
    let numRejected = 0;
    return new Promise(
    /**
     * @param {Promise<any>} promise
     */
    (resolve, reject) => promises.forEach((promise) => promise
        .then(resolve)
        .catch(() => {
        if (++numRejected === promises.length)
            reject();
    })));
}
