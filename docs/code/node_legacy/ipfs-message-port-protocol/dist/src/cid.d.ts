/**
 * @typedef {Object} EncodedCID
 * @property {string} codec
 * @property {Uint8Array} multihash
 * @property {number} version
 */
/**
 * Encodes CID (well not really encodes it as all own properties are going to be
 * be cloned anyway). If `transfer` array is passed underlying `ArrayBuffer`
 * will be added for the transfer list.
 *
 * @param {CID} cid
 * @param {Transferable[]} [transfer]
 * @returns {EncodedCID}
 */
export function encodeCID(cid: import("cids"), transfer?: Transferable[] | undefined): EncodedCID;
/**
 * Decodes encoded CID (well sort of instead it makes nasty mutations to turn
 * structure cloned CID back into itself).
 *
 * @param {EncodedCID} encodedCID
 * @returns {CID}
 */
export function decodeCID(encodedCID: EncodedCID): import("cids");
export var CID: typeof import("cids");
export type EncodedCID = {
    codec: string;
    multihash: Uint8Array;
    version: number;
};
//# sourceMappingURL=cid.d.ts.map