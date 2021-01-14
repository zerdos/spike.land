/**
 *
 * @param {string} cid
 */
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const feedTheCache = (cid) => {
    // const controller = new AbortController();
    // fetch(`https://zed.vision/ipfs/${cid}`).then((x) => x.text());
    // const random5GatewaysFetch = publicIpfsGateways.sort(() =>
    //   0.5 - Math.random()
    // ).slice(0, 5).map((gw) => gw.replace("/ipfs/:hash", `/ipfs/${cid}`)).map((
    //   x,
    // ) =>
    //   fetch(x, { signal: controller.signal }).then((res) =>
    //     res.status === 200 ? res.text() : (() => {
    //       throw new Error("Not found");
    //     })()
    //   ).then(console.log)
    // );
    // raceToSuccess(random5GatewaysFetch).then(() => controller.abort());
    // console.log(cid);
    return cid;
};
async function getClient() {
    const { getIpfs } = await import("./ipfsClient.js");
    return getIpfs();
}
// @ts-ignore
const hash = async (data, { onlyHash, signal, timeout }) => {
    const ipfs = await getClient();
    // @ts-ignore
    const cid = await ipfs.add(`${data}`, { onlyHash }).then((d) => d.cid.toString());
    if (!onlyHash) {
        console.log(`adding data to ipfs: ${data} `);
        await feedTheCache(cid);
        return cid;
    }
    try {
        // @ts-ignore
        const res = await getHash(cid, { signal, timeout, onlyHash }).then((x) => ({
            success: x === data,
        }));
        return res;
    }
    catch (_a) {
        return { success: false };
    }
};
const cidCache = {};
const cidLock = {
    semaphore: 0,
};
/**
 * @param {string} cid
 * @param {AbortSignal} signal
 */
// @ts-ignore
const getHash = async (cid, { signal, timeout }) => {
    var e_1, _a;
    //@ts-ignore
    if (cidCache[cid])
        return cidCache[cid];
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
        //@ts-ignore
        if (cidCache[cid])
            return cidCache[cid];
        // @ts-ignore
        while (cidLock.semaphore > 128) {
            await wait(Math.random() * 100);
        }
        cidLock.semaphore++;
        // @ts-ignore
        if (!cidLock[cid]) {
            // console.log(`in :  ${cidLock.semaphore}   cat cat cat `);
            // @ts-ignore
            cidLock[cid] = ipfs.cat(cid, { timeout: timeout || 300 });
        }
        // @ts-ignore
        const data = await cidLock[cid];
        // @ts-ignore
        if (cidCache[cid])
            return cidCache[cid];
        /** @type {Uint8Array | null} */
        let resultUintArr = null;
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
        //@ts-ignore
        const result = new TextDecoder().decode(resultUintArr);
        //@ts-ignore
        cidCache[cid] = result;
        cidLock.semaphore--;
        return result;
        // console.error({ data });
    }
    catch (e) {
        cidLock.semaphore--;
        // @ts-ignore
        cidLock[cid] = null;
        // console.log({});
    }
};
/**
 * @param {string} signal => Promise<{success: boolean}>
 * @param {AbortSignal} abortSignal
 */
const _waitForSignal = async (signal, abortSignal) => {
    // @ts-ignore
    return hash(signal, { onlyHash: true, signal: abortSignal, timeout: 5000 })
        // @ts-ignore
        .then((x) => (typeof x === "string" || (x && x.success))
        ? { success: true }
        : { success: false }).catch(() => ({ success: false }));
};
/**
 * @param {string} signal
 * @param {string} data
 */
export const sendSignal = async (signal, data) => {
    // @ts-ignore
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
        const allHash = new Array(hexHash.length).fill(signal).map((x, i) => x + new Array(i).fill("x").join("") + hexHash.slice(i, i + 1));
        await Promise.all(
        // @ts-ignore
        allHash.slice(0, 5).map((x) => hash(x, false)));
        await Promise.all(
        // @ts-ignore
        allHash.slice(5).map((x) => hash(x, false)));
    }
    return { success: true };
};
const signalDataCache = {};
// @ts-ignore
export const fetchSignal = 
/**
* @param {string} signal
* @param {number} _retry
* @returns ()=>any
*/
// @ts-ignore
async (signal, _retry) => {
    const retry = (typeof _retry === "number") ? _retry : 999;
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
        const getData = 
        /**
     *
     * @param {number} retry
     * @returns *
     */
        // @ts-ignore
        async (retry = 20) => {
            //@ts-ignore
            if (signalDataCache[signal])
                return signalDataCache[signal];
            if (retry === 0)
                return "";
            /**
       * @param {number} delay
       */
            // @ts-ignore
            const run = async (delay) => {
                //@ts-ignore
                if (signalDataCache[signal])
                    return signalDataCache[signal];
                console.log(`delay: ${delay}`);
                try {
                    const CID = (await import("./vendor/cids.js")).default;
                    const hashArr = new Array(68).fill(0).map((_x, i) => i);
                    const restRes = hashArr.map((i) => getCharAt(signal, i));
                    const hashHex = (await Promise.all(restRes)).join("");
                    //@ts-ignore
                    if (signalDataCache[signal])
                        return signalDataCache[signal];
                    const cid = new CID(0, 112, fromHexString(hashHex));
                    const data = await getHash(cid.toString(), 
                    // @ts-ignore
                    { signal: abort.signal, timeout: 1500 });
                    //@ts-ignore
                    if (signalDataCache[signal])
                        return signalDataCache[signal];
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
                    const ret = parse(data);
                    if (!ret)
                        throw new Error("No data");
                    console.log(`got the result and putting it to cache, the delay was: ${delay}`, { ret });
                    //@ts-ignore
                    signalDataCache[signal] = ret;
                    return ret;
                }
                catch (e) {
                    return getData(retry - 1);
                }
            };
            return run(0);
        };
        return getData;
    }
    catch (e) {
        isSignalReceived = false;
        console.log(`Bad news! No signal, and it seems there is an error.`);
    }
};
const signalCache = {};
export const getCharAt = 
/**
* @param {string} signal
* @param {number} i
*/
async (signal, i) => {
    //@ts-ignore
    if (!signalCache[signal]) {
        //@ts-ignore
        signalCache[signal] = {};
    }
    //@ts-ignore
    if (signalCache[signal][i])
        return signalCache[signal][i];
    const chars = [..."0123456789abcdef"];
    const controller = new AbortController();
    const prefix = new Array(i).fill("x").join("");
    //@ts-ignore
    if (signalCache[signal][i])
        return signalCache[signal][i];
    const raceArray = chars.map((x) => _waitForSignal(signal + prefix + x, controller.signal).then((s) => {
        if (s.success)
            return x;
        throw new Error("nope");
    }));
    //@ts-ignore
    if (signalCache[signal][i])
        return signalCache[signal][i];
    const nextChar = await raceToSuccess(raceArray);
    //@ts-ignore
    if (signalCache[signal][i])
        return signalCache[signal][i];
    console.log(`${signal} data hash char ${i}: ${nextChar}`);
    //@ts-ignore
    signalCache[signal][i] = nextChar;
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
 * @param {number} delay
 */
// @ts-ignore
function wait(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(delay);
        }, delay);
    });
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
const publicIpfsGateways = [
    "https://ipfs.io/ipfs/:hash",
    "https://dweb.link/ipfs/:hash",
    "https://gateway.ipfs.io/ipfs/:hash",
    "https://ipfs.infura.io/ipfs/:hash",
    "https://ninetailed.ninja/ipfs/:hash",
    "https://10.via0.com/ipfs/:hash",
    "https://ipfs.eternum.io/ipfs/:hash",
    "https://hardbin.com/ipfs/:hash",
    "https://cloudflare-ipfs.com/ipfs/:hash",
    "https://cf-ipfs.com/ipfs/:hash",
    "https://gateway.pinata.cloud/ipfs/:hash",
    "https://ipfs.sloppyta.co/ipfs/:hash",
    "https://ipfs.greyh.at/ipfs/:hash",
    "https://jorropo.ovh/ipfs/:hash",
    "https://jorropo.net/ipfs/:hash",
    "https://gateway.temporal.cloud/ipfs/:hash",
    "https://ipfs.runfission.com/ipfs/:hash",
    "https://trusti.id/ipfs/:hash",
    "https://ipfs.overpi.com/ipfs/:hash",
    "https://ipfs.ink/ipfs/:hash",
    "https://gateway.ravenland.org/ipfs/:hash",
    "https://ipfs.smartsignature.io/ipfs/:hash",
    "https://ipfs.telos.miami/ipfs/:hash",
    "https://robotizing.net/ipfs/:hash",
    "https://ipfs.mttk.net/ipfs/:hash",
    "https://ipfs.fleek.co/ipfs/:hash",
    "https://ipfs.jbb.one/ipfs/:hash",
    "https://jacl.tech/ipfs/:hash",
    "https://ipfs.k1ic.com/ipfs/:hash",
    "https://ipfs.drink.cafe/ipfs/:hash",
    "https://ipfs.azurewebsites.net/ipfs/:hash",
    "https://gw.ipfspin.com/ipfs/:hash",
    "https://ipfs.denarius.io/ipfs/:hash",
];
