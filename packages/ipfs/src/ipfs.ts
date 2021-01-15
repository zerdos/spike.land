

import * as IPFS from "ipfs/dist/index.min.js"
import IpfsClient from "ipfs-message-port-client"
import { IPFSService, Server } from "ipfs-message-port-server"
import CID from "cids"

const Ipfs = {create: (opts)=>IPFS.create(opts)}

// export const Ipfs = {Ipfs: {create: IPFS.create}}
export {IpfsClient}
export {IPFSService}
export {Server}
export {Ipfs}
export {CID}
