import * as Ipfs from "ipfs-core";
import type * as IPFS from "ipfs-core/dist/src/index";
import { getResponse } from "ipfs-http-response";

const init = Ipfs.create().then((ipfs: IPFS.IPFS) => {
  Object.assign(globalThis, { ipfs });
  Object.assign(self, { ipfs });
  return ipfs;
});

export const getIpfs = async () => {
  return globalThis.ipfs ? globalThis.ipfs : await init;
};
export const getIpfsResponse = async (ipfsPath: string) => await getResponse(await getIpfs(), ipfsPath);

Object.assign(self, { getIpfsResponse });
