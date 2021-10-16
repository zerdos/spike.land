import all from "it-all";
import { IPFSClient } from "ipfs-message-port-client";
import CID from "cids";
import { publicIpfsGateways, raceToSuccess } from "./gateways.js";

import { concat, fromString, toString } from "uint8arrays";

export { IPFSClient };
export const fromHexString = (hexString: string) =>
  new Uint8Array(
    (hexString.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16)),
  );
export { CID };
export { all };
export { publicIpfsGateways };
export { raceToSuccess };
export { fromString };
export { toString };
export { concat };

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
      `https://spike.land/signal?signal=${smallSignal}&securityrandomparam=${
        Math
          .random() * 10000
      }`,
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
}
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
}
