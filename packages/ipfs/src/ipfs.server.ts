

import * as IPFS from "ipfs/dist/index.min.js"
import type { create as IPFSCreate }from "ipfs"
import { IPFSService, Server } from "ipfs-message-port-server"

const Ipfs = IPFS as  {create: typeof IPFSCreate};

export {IPFSService}
export {Server}
export {Ipfs}

//@ts-ignore
globalThis.Ipfs = Ipfs
//@ts-ignore

globalThis.IPFSService = IPFSService;

//@ts-ignore
globalThis.Server = Server;
