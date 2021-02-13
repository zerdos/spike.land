import all from "it-all";
import IpfsClient from "ipfs-message-port-client";
import CID from "cids";
import { publicIpfsGateways, raceToSuccess } from "./gateways.js";

import uint8ArrayFromString from "uint8arrays/from-string";
import uint8ArrayToString from "uint8arrays/to-string";
import uint8ArrayConcat from "uint8arrays/concat";

export { IpfsClient };
export const fromHexString = (hexString: string) =>
  new Uint8Array(
    (hexString.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16)),
  );
export { CID };
export { all };
export { publicIpfsGateways };
export { raceToSuccess };
export { uint8ArrayFromString };
export { uint8ArrayToString };
export { uint8ArrayConcat };
