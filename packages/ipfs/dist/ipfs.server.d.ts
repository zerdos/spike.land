import type { create as IPFSCreate } from "ipfs";
import { IPFSService, Server } from "ipfs-message-port-server";
declare const Ipfs: {
    create: typeof IPFSCreate;
};
export { IPFSService };
export { Server };
export { Ipfs };
