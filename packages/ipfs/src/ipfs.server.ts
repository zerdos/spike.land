

import * as IPFS from "ipfs/dist/index.min.js"
import { IPFSService, Server } from "ipfs-message-port-server"
const Ipfs = {create: (opts)=>IPFS.create(opts)}

export {IPFSService}
export {Server}
export {Ipfs}
