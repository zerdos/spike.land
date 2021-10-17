"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignal = exports.sha256ToCid = exports.fetchSignal = exports.concat = exports.toString = exports.fromString = exports.raceToSuccess = exports.publicIpfsGateways = exports.all = exports.CID = exports.fromHexString = exports.IPFSClient = void 0;
const it_all_1 = __importDefault(require("it-all"));
exports.all = it_all_1.default;
const ipfs_message_port_client_1 = require("ipfs-message-port-client");
Object.defineProperty(exports, "IPFSClient", { enumerable: true, get: function () { return ipfs_message_port_client_1.IPFSClient; } });
const cids_1 = __importDefault(require("cids"));
exports.CID = cids_1.default;
const gateways_js_1 = require("./gateways.js");
Object.defineProperty(exports, "publicIpfsGateways", { enumerable: true, get: function () { return gateways_js_1.publicIpfsGateways; } });
Object.defineProperty(exports, "raceToSuccess", { enumerable: true, get: function () { return gateways_js_1.raceToSuccess; } });
const uint8arrays_1 = require("uint8arrays");
Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return uint8arrays_1.concat; } });
Object.defineProperty(exports, "fromString", { enumerable: true, get: function () { return uint8arrays_1.fromString; } });
Object.defineProperty(exports, "toString", { enumerable: true, get: function () { return uint8arrays_1.toString; } });
const fromHexString = (hexString) => new Uint8Array((hexString.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16)));
exports.fromHexString = fromHexString;
//@ts-ignore
async function fetchSignal(signal, _retry) {
    if (typeof window === "undefined")
        return;
    const retry = (typeof _retry === "number") ? _retry : 999;
    try {
        const { ipfsClient, ipfsCat } = globalThis;
        if (retry === 0) {
            throw new Error("No more retry");
        }
        const res = await ipfsClient.add(signal, { onlyHash: true });
        const resCID = res.cid.toString();
        //  log(`CID to wait: ${resCID}`);
        //
        await ipfsCat(resCID, { timeout: 1500 });
        const smallSignal = signal.slice(-8);
        const cid = await fetch(`https://spike.land/signal?signal=${smallSignal}&securityrandomparam=${Math
            .random() * 10000}`).then((x) => x.text());
        const resData = await fetch(`https://spike.land/ipfs/${cid}`).then((x) => x.text());
        //log(`${resCID} downloaded - ${resData}`);
        return () => parse(resData);
    }
    catch (e) {
        if (retry > 1)
            return fetchSignal(signal, retry - 1);
    }
}
exports.fetchSignal = fetchSignal;
function parse(d) {
    try {
        if (typeof d !== "string")
            return d;
        const ret = JSON.parse(d);
        //   console.log({ ret });
        return ret;
    }
    catch (e) {
        //    console.log({ d });
        return d;
    }
}
const log = (msg) => {
    if (typeof msg === "string")
        console.log(msg);
    else if (typeof msg === "object")
        console.table({ msg });
    else
        console.log(msg);
};
function sha256ToCid(hash) {
    return (new cids_1.default(0, 112, (0, exports.fromHexString)("1220" + hash))).toString();
}
exports.sha256ToCid = sha256ToCid;
/**
 * @param {string} signal
 * @param {string} data
 */
async function sendSignal(signal, data) {
    const { ipfsClient } = globalThis;
    log(`sending signal: ${signal}`);
    if (data) {
        log(`sending data as well....`);
        const toSave = (typeof data !== "string") ? JSON.stringify(data) : data;
        log(toSave);
        const dataCid = (await ipfsClient.add(toSave)).cid.toString();
        const { pathname } = new URL(signal);
        await fetch(`https://spike.land/signal/?cid=${dataCid}&signal=${pathname.slice(1)}`);
        fetch(`https://spike.land/ipfs/${dataCid}`);
    }
    const { path } = await ipfsClient.add(signal);
    log(`signal sent --- ${path}`);
    return { success: true };
}
exports.sendSignal = sendSignal;
