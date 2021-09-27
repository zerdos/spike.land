import all from "it-all";
import  {IPFSClient}  from "ipfs-message-port-client";
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
