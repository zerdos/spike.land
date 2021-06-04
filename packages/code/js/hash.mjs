import { CID, fromHexString, ipfsCat, ipfsClient } from "./ipfsClient.mjs";

export { CID };

const log = (msg) => {
  if (typeof mgs === "string") console.log(msg);
  else if (typeof msg === "object") console.table({ msg });
  else console.log(msg);
};

export function sha256ToCid(hash) {
  return (new CID(0, 112, fromHexString("1220" + hash))).toString();
}
// const signalCache = {};

/**
 * @param {string} signal
 * @param {string} data
 */

export async function sendSignal(signal, data) {
  log(`sending signal: ${signal}`);

  if (data) {
    log(`sending data as well....`);
    let toSave = data;

    if (typeof data !== "string") toSave = JSON.stringify(data);

    log(toSave);

    const dataCid = (await ipfsClient.add(toSave)).cid.toString();
    const { pathname } = new URL(signal);

    await fetch(
      `https://spike.land/signal/?cid=${dataCid}&signal=${pathname.slice(1)}`,
    );

    fetch(`https://spike.land/ipfs/${dataCid}`);

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

  const { path } = await ipfsClient.add(signal);
  log(`signal sent --- ${path}`);

  return { success: true };
} // export const sha256ToCID = (str) =>
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
  if (typeof window === "undefined") return;
  const retry = (typeof _retry === "number") ? _retry : 999;
  // console.log("retrying hash fetch");

  // if (window.location.hostname !== "spike.land") {
  //   //   console.log("we are NOT on spike.land");

  //   try {
  //     if (retry === 0) {
  //       throw new Error("No more retry");
  //     }

  //     const smallSignal = signal.slice(-8);

  //     ////    log(`signal to wait: ${smallSignal}`);

  //     // console.log(`https://spike.land/signal?signal=${smallSignal}`);

  //     const cid = await fetch(
  //       `https://spike.land/signal?signal=${smallSignal}&securityrandomparam=${Math
  //         .random() * 10000}`,
  //     ).then(
  //       (x) => x.text(),
  //     );

  //     console.log(cid);
  //     if (String(cid) === "404") {
  //       await wait(3000);
  //       return fetchSignal(signal, retry - 1);
  //     }

  //     //    log(`${cid} is available`);

  //     const resData = await fetch(`https://spike.land/ipfs/${cid}`).then((
  //       x,
  //     ) => x.text());

  //     //  log(`${cid} downloaded - ${resData}`);
  //     return () => parse(resData);
  //   } catch (e) {
  //     await wait(3000);

  //     if (retry > 1) return fetchSignal(signal, retry - 1);
  //     throw new Error("no signal");
  //   }
  // }

  // log(`retry: ${retry}`);
  try {
    if (retry === 0) {
      throw new Error("No more retry");
    }

    const res = await ipfsClient.add(signal, { onlyHash: true });
    const resCID = res.cid.toString();

    //  log(`CID to wait: ${resCID}`);
    //
    await ipfsCat(resCID, { timeout: 1500 });

    const smallSignal = signal.slice(-8);

    const cid = await fetch(
      `https://spike.land/signal?signal=${smallSignal}&securityrandomparam=${Math
        .random() * 10000}`,
    ).then(
      (x) => x.text(),
    );

    const resData = await fetch(
      `https://spike.land/ipfs/${cid}`,
    ).then((
      x,
    ) => x.text());

    //log(`${resCID} downloaded - ${resData}`);
    return () => parse(resData);
  } catch (e) {
    if (retry > 1) return fetchSignal(signal, retry - 1);
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

// /**
//  *
//  * @param {string} signal
//  * @param {number} retry
//  * @returns {Promise<any>}
//  */

// /**
//  * @param {number} delay
//  */

// function wait(delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(delay);
//     }, delay);
//   });
// }

// async function getData(signal, retry) {
//   const { pathname } = new URL(signal);

//   const signalPath = pathname.slice(1);

//   const res = await fetch(`https://spike.land/signal?signal=${signalPath}`);

//   const cid = await res.text();

//   const data = await fetch(`https://spike.land/ipfs/${cid}`);
//   const content = await data.text();
//   return content;

//   // return fetch(`https://spike.land/signal?signal=${signalPath}`).then((x) =>
//   //   x.text()
//   // ).then((cid) => ipfsCat(cid));
// }

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
    //   console.log({ ret });
    return ret;
  } catch (e) {
    //    console.log({ d });
    return d;
  }
}
