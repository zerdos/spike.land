/**
 * @typedef {import('./cid').EncodedCID} EncodedCID
 * @typedef {Object} EncodedBlock
 * @property {Uint8Array} data
 * @property {EncodedCID} cid
 */
/**
 * Encodes Block for over the message channel transfer.
 *
 * If `transfer` array is provided all the encountered `ArrayBuffer`s within
 * this block will be added to the transfer so they are moved across without
 * copy.
 *
 * @param {Block} block
 * @param {Transferable[]} [transfer]
 * @returns {EncodedBlock}
 */
export function encodeBlock(
  { cid, data }: import("ipld-block/src"),
  transfer?: Transferable[] | undefined,
): EncodedBlock;
/**
 * @param {EncodedBlock} encodedBlock
 * @returns {Block}
 */
export function decodeBlock(
  { cid, data }: EncodedBlock,
): import("ipld-block/src");
export var Block: typeof import("ipld-block/src");
export type EncodedCID = {
  codec: string;
  multihash: Uint8Array;
  version: number;
};
export type EncodedBlock = {
  data: Uint8Array;
  cid: EncodedCID;
};
//# sourceMappingURL=block.d.ts.map
