

import * as IPFS from "ipfs/dist/index.min.js"
import IpfsClient from "ipfs-message-port-client"
import { IPFSService, Server } from "ipfs-message-port-server"

const Ipfs = {create: (opts)=>IPFS.create(opts)}
const CID = IPFS.CID;
export {IpfsClient}
export {IPFSService}
export {Server}
export {Ipfs}
export {CID}
