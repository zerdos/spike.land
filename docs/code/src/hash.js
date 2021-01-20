import {
  CID,
  fromHexString,
  ipfsCat,
  ipfsClient,
  multihashes,
  raceToSuccess,
} from "./ipfsClient.js";

const log = (msg) => {
  if (typeof mgs === "string") console.log(msg);
  else if (typeof msg === "object") console.table({ msg });
  else console.log(msg);
};

/**
 * @type {
 * [string]  
 * }
 */

const signalCache = {};

/**
 * @param {string} signal 
 * @param {string} data
 */
export const sendSignal = async (signal, data) => {
  if (typeof window === "undefined") return "no webpack please";

  log(`sending signal: ${signal}`);

  const { path } = await ipfsClient.add(signal);

  log(`signal sent --- ${path}`);

  if (data) {
    log(`sending data as well....`);
    let toSave = data;

    if (typeof data !== "string") toSave = JSON.stringify(data);

    log(toSave);

    const dataCid = (await ipfsClient.add(toSave)).cid.toString();
    fetch(`https://zed.vision/ipfs/${dataCid}`);

    const { pathname } = new URL(signal);

    await fetch(
      `https://zed.vision/signal/?cid=${dataCid}&signal=${pathname.slice(1)}`,
    );

    // const hexHash = Array.from((new CID(dataCid)).multihash).map((b) =>
    //   ("00" + b.toString(16)).slice(-2)
    // ).join("");

    // const allHash = new Array(hexHash.length).fill(signal).map((x, i) =>
    //   x + new Array(i).fill("x").join("") + hexHash.slice(i, i + 1)
    // );

    // log({ allHash });

    // log("adding the fist 5");
    // await Promise.all(
    //   allHash.map(async (x) => {
    //     const { path } = await ipfsClient.add(x);

    //     log(path);
    //   }),
    // );

    // log(`rest is uploaded`);
  }
  return { success: true };
};

// export const sha256ToCID = (str) =>
//   (new CID(0, 112, fromHexString("1220" + str))).toString();

/**
 * @param {string} signal
 * @param {number} _retry
 * @returns {Promise<()=>any>}
 */

export async function fetchSignal(
  signal,
  _retry,
) {
  const retry = (typeof _retry === "number") ? _retry : 999;
  log(`retry: ${retry}`);
  try {
    if (retry === 0) {
      throw new Error("No more retry");
    }

    const res = await ipfsClient.add(signal, { onlyHash: true });

    const resCID = res.cid.toString();

    log(`CID to wait: ${resCID}`);

    const resData = await ipfsCat(resCID, { timeout: 1500 });

    log(`${resCID} downloaded - ${resData}`);
    return async () => parse(await getData(signal, 20));
  } catch (e) {
    if (retry > 1) return fetchSignal(signal, retry - 1);
    throw new Error("no signal");
  }
} /****
 * 
 * 
 * 
 * UTILS
 * 
 * 
 * 
 * 
 */

/**
 * 
 * @param {string} signal
 * @param {number} retry 
 * @returns {Promise<any>}
 */

/**
 * @param {number} delay
 */

function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

async function getData(signal, retry) {
  const { pathname } = new URL(signal);

  const signalPath = pathname.slice(1);

  return fetch(`https://zed.vision/signal?signal=${signalPath}`).then((x) =>
    x.body()
  ).then((cid) => ipfsCat(cid));
}

// if (retry === 0) throw new Error("Cant fetch data");
// log(`GET data, retry: ${retry}`);

// try {
//   const hashArr = new Array(68).fill(0).map((_x, i) => i);
//   const restRes = hashArr.map((i) =>
//     wait(Math.random() * 2000).then(() => getCharAt(signal, i))
//   );
//   const hashHex = (await Promise.all(restRes)).join("");

//   const cid = new CID(0, 112, fromHexString(hashHex));
//   log(`We got the data, its hash: ${cid.toString()}`);
//   return await ipfsCat(
//     cid.toString(),
//     { timeout: 1500 },
//   );
// } catch (e) {
//   return getData(signal, retry - 1);
// }

/**
       * @param {string} signal
       * @param {number} i
       */
//   async function getCharAt(signal, i) {
//     if (!signalCache[signal]) {
//       signalCache[signal] = {
//         "0": "1",
//         "1": "2",
//         "2": "2",
//         "3": "0",
//       };
//     }

//     if (signalCache[signal][i]) return signalCache[signal][i];

//     const chars = [..."0123456789abcdef"];

//     const prefix = new Array(i).fill("x").join("");

//     if (signalCache[signal][i]) return signalCache[signal][i];

//     log(`fetching char ${i}`);
//     const nextChar = await raceToSuccess(
//       chars.map(async (xx) => {
//         await wait(Math.random() * 1000);
//         if (signalCache[signal][i]) return signalCache[signal][i];
//         return await fetchSignal(signal + prefix + xx, 1).then(() => xx);
//       }),
//     );

//     signalCache[signal][i] = nextChar;
//     log(signalCache[signal]);

//     return nextChar;
//   }
// }

/**
 * @param {sting} d
 */
function parse(d) {
  try {
    if (typeof d !== "string") return d;

    const ret = JSON.parse(d);
    return ret;
  } catch (e) {
    return d;
  }
}
export { ipfsCat };
export { multihashes };
