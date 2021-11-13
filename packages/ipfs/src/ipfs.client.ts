import all from "it-all";
import { IPFSClient } from "ipfs-message-port-client";
import { publicIpfsGateways, raceToSuccess } from "./gateways.js";

import { concat, fromString, toString } from "uint8arrays";

export { IPFSClient };
export const fromHexString = (hexString: string) =>
  new Uint8Array(
    (hexString.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16)),
  );
export { all };
export { publicIpfsGateways };
export { raceToSuccess };
export { fromString };
export { toString };
export { concat };

//@ts-ignore
export async function fetchSignal(
  signal: string,
  _retry: number,
) {
  if (typeof window === "undefined") return;
  const retry = (typeof _retry === "number") ? _retry : 999;

  try {
    const { ipfsClient, ipfsCat } = globalThis as unknown as {
      ipfsClient: IPFSClient;
      ipfsCat: (cid: string, opt: unknown) => Promise<string>;
    };
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
      `https://code.spike.land/signal?signal=${smallSignal}&securityrandomparam=${
        Math
          .random() * 10000
      }`,
    ).then(
      (x) => x.text(),
    );

    const resData = await fetch(
      `https://code.spike.land/ipfs/${cid}`,
    ).then((
      x,
    ) => x.text());

    //log(`${resCID} downloaded - ${resData}`);
    return () => parse(resData);
  } catch (e) {
    if (retry > 1) return fetchSignal(signal, retry - 1);
  }
}
function parse(d: string) {
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

const log = (msg: string | Object) => {
  if (typeof msg === "string") console.log(msg);
  else if (typeof msg === "object") console.table({ msg });
  else console.log(msg);
};


/**
 * @param {string} signal
 * @param {string} data
 */

export async function sendSignal(signal: string, data: Object) {
  const { ipfsClient } = globalThis as unknown as { ipfsClient: IPFSClient };

  log(`sending signal: ${signal}`);

  if (data) {
    log(`sending data as well....`);

    const toSave = (typeof data !== "string") ? JSON.stringify(data) : data;

    log(toSave);

    const dataCid = (await ipfsClient.add(toSave)).cid.toString();
    const { pathname } = new URL(signal);

    await fetch(
      `https://code.spike.land/signal/?cid=${dataCid}&signal=${
        pathname.slice(1)
      }`,
    );

    fetch(`https://code.spike.land/ipfs/${dataCid}`);
  }

  const { path } = await ipfsClient.add(signal);
  log(`signal sent --- ${path}`);

  return { success: true };
}
