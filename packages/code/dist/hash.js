var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import versions from "./versions.js";
// @ts-ignore
const v = versions();
/**
 *
 * @param {string} cid
 */
const feedTheCache = (cid) => {
    //fetch(`https://zed.vision/ipfs/${cid}`).then((resp) => resp.text());
    // console.log(cid);
    return cid;
};
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
async function getClient() {
    const { getIpfs } = await import("./ipfsClient.js");
    return getIpfs();
}
/**
 * @param {any} data
 * @param {any} onlyHash
 */
const hash = async (data, { onlyHash, signal }) => {
    /** @type {{ add: (arg0: string, arg1: { onlyHash: any; }) => any; } | null} */
    const ipfs = await getClient();
    const noisyHashes = (await Promise.all([
        // @ts-ignore
        await ipfs.add(`${data}`, { onlyHash }).then((d) => d.cid.toString()),
    ]));
    if (!onlyHash) {
        const data = await Promise.all(noisyHashes.map(feedTheCache));
        return data[0];
    }
    const res = await Promise.all(noisyHashes.map((cid) => getHash(cid, signal).then((x) => ({ success: x === data }))));
    return res[0];
};
/**
 * @param {string} cid
 * @param {AbortSignal} signal
 */
const getHash = async (cid, signal) => {
    var e_1, _a;
    signal.onabort = function () {
        aborted = 1;
    };
    let aborted = 0;
    try {
        /** @type {{ cat: (arg0: any, arg1: any) => any; } | null} */
        const ipfs = await getClient();
        if (aborted)
            return "";
        // @ts-ignore
        const data = await ipfs.cat(cid);
        /** @type {Uint8Array | null} */
        let resultUintArr = null;
        if (aborted)
            return "";
        try {
            for (var data_1 = __asyncValues(data), data_1_1; data_1_1 = await data_1.next(), !data_1_1.done;) {
                let res = data_1_1.value;
                if (resultUintArr !== null) {
                    //@ts-ignore
                    resultUintArr.concat(res);
                }
                else {
                    resultUintArr = res;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) await _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (aborted)
            return "";
        //@ts-ignore
        const result = new TextDecoder().decode(resultUintArr);
        if (typeof result === "string")
            return half(result);
        // console.error({ data });
    }
    catch (e) {
        console.log({ e });
    }
};
/**
 * @param {string} signal => Promise<{success: boolean}>
 * @param {AbortSignal} abortSignal
 */
const _waitForSignal = (signal, abortSignal) => {
    return hash(signal, { onlyHash: true, signal: abortSignal }).then((x) => (typeof x === "string" || (x && x.success))
        ? { success: true }
        : { success: false }).catch(() => ({ success: false }));
};
/**
 * @param {string} signal
 * @param {string} data
 */
export const sendSignal = async (signal, data) => {
    await hash(signal, false);
    if (data) {
        const CID = (await import("./vendor/cids.js")).default;
        // @ts-ignore
        let toSave = data;
        if (typeof data !== "string")
            toSave = JSON.stringify(data);
        //@ts-ignore
        const dataCid = await hash(data, false);
        const hexHash = Array.from((new CID(dataCid)).multihash).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
        const allHash = new Array(hexHash.length).fill(signal).map((x, i) => x + hexHash.slice(0, i + 1));
        await Promise.all(allHash.slice(0, 5).map((x) => hash(x, false)));
        await Promise.all(allHash.slice(5).map((x) => hash(x, false)));
    }
    return { success: true };
};
/**
 * @param {string} signal
 * @param {number} _retry
 * @returns {Promise<()=>Promise<any>>} result
 */
export const fetchSignal = async (signal, _retry) => {
    const retry = (typeof _retry === "number") ? _retry : 5;
    const abort = new AbortController();
    let isSignalReceived = null;
    try {
        if (retry === 0)
            throw new Error("No more retry");
        console.log(`Waiting for "${signal}"  (the content to be available on IPFS = we know what will be it's address)`);
        const res = await _waitForSignal(signal, abort.signal);
        if (!res.success)
            return fetchSignal(signal, retry - 1);
        isSignalReceived = true;
        console.log(`Signal received!`, { res });
        const getData = async () => {
            const CID = (await import("./vendor/cids.js")).default;
            let hashHex = "";
            while (hashHex.length < 68) {
                console.log(`Getting ${hashHex.length + 1} from 68 `);
                hashHex += await getNextChar(signal + hashHex);
            }
            const cid = new CID(0, 112, fromHexString(hashHex));
            const data = await getHash(cid.toString(), abort.signal);
            /**
               * @param {string | any[] | { success: boolean; } | undefined} d
               */
            const parse = (d) => {
                try {
                    if (typeof d !== "string")
                        return d;
                    const ret = JSON.parse(d);
                    return ret;
                }
                catch (e) {
                    return d;
                }
            };
            return parse(data);
        };
        return getData;
    }
    catch (e) {
        isSignalReceived = false;
        console.log(`Bad news! No signal, and it seems there is an error.`);
        throw new Error("No signal, and it seems there is an error");
    }
    finally {
        if (isSignalReceived === null) {
            console.log("What WHAT? This is unexpected, we are in the finally part - without error.");
        }
    }
};
export const getNextChar = 
/**
* @param {string} signal
*/
async (signal) => {
    const chars = [..."0123456789abcdef"];
    const controller = new AbortController();
    const raceArray = chars.map((x) => _waitForSignal(signal + x, controller.signal).then((s) => {
        if (s.success)
            return x;
        throw new Error("nope");
    }));
    const nextChar = await raceToSuccess(raceArray);
    controller.abort();
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
/**
 * @param {string} hexString
 */
const fromHexString = (hexString) => new Uint8Array(
/**
* @param {string} byte
*/
//@ts-ignore
hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
// const toHexString = bytes =>
//   bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
// console.log(toHexString(new Uint8Array([0, 1, 2, 42, 100, 101, 102, 255])))
// console.log(fromHexString('1220ea7802d96f792f9015d67fd65eac5b2ecc4a1b8682e9c73f76fd3ec7efc1af24'))
// import("./code/src/vendor/cids.js").then(m=>m.default).then(CID=>new CID(1,112,fromHexString("1220ea7802d96f792f9015d67fd65eac5b2ecc4a1b8682e9c73f76fd3ec7efc1af24"))).then(x=>Array.from(x.multihash))
// import("./code/src/vendor/cids.js").then(m=>m.default).then(CID=>new CID("Qme7vFQnRzk2AoEgWMkQ8PDujZmUb3BoR1kEtSa1s83fQP")).then(x=>Array.from(x.multihash).map((b) => ("00" + b.toString(16)).slice(-2)).join(""))
///  fetchSignal( {signal, onSignal: async (data)=> {const nextChar = await(getData()); console.log(nextChar)  }})
