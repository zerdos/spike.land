import all from "it-all";
import { IPFSClient } from "ipfs-message-port-client";
import { publicIpfsGateways, raceToSuccess } from "./gateways.js";
import { concat, fromString, toString } from "uint8arrays";
export { IPFSClient };
export { all };
export { publicIpfsGateways };
export { raceToSuccess };
export { fromString };
export { toString };
export { concat };
export declare function fetchSignal(signal: string, _retry: number): any;
/**
 * @param {string} signal
 * @param {string} data
 */
export declare function sendSignal(signal: string, data: Object): Promise<{
    success: boolean;
}>;
