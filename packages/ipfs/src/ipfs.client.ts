

import * as IPFS from "ipfs/dist/index.min.js"
import IpfsClient from "ipfs-message-port-client"
import {publicIpfsGateways, raceToSuccess} from "./gateways"

const CID = IPFS.CID;

export {IpfsClient}
export {CID}
export {publicIpfsGateways}
export {raceToSuccess}