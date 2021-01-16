import CID from "cids"
import IpfsClient from "ipfs-message-port-client"
import {publicIpfsGateways, raceToSuccess} from "./gateways.js"

export {IpfsClient}
export const fromHexString = (hexString: string) =>    new Uint8Array(
      (hexString.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16)),
    );

export {CID}
export {publicIpfsGateways}
export {raceToSuccess}