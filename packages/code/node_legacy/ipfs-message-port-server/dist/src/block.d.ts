export type IPFS = import("./ipfs").IPFS;
export type CID = import("cids");
export type EncodedError = Error | import("ipfs-message-port-protocol/src/error").ErrorData;
export type Block = any;
export type EncodedCID = {
    codec: string;
    multihash: Uint8Array;
    version: number;
};
export type EncodedBlock = {
    data: Uint8Array;
    cid: import("ipfs-message-port-protocol/src/block").EncodedCID;
};
export type Rm = {
    cid: EncodedCID;
    /**
     * Remove one or more IPFS block(s).
     */
    error?: EncodedError | undefined;
};
export type Stat = {
    cid: EncodedCID;
    /**
     * Gets information of a raw IPFS block.
     */
    size: number;
};
export class BlockService {
    /**
     * @param {IPFS} ipfs
     */
    constructor(ipfs: IPFS);
    ipfs: import("./ipfs").IPFS;
    /**
     * @typedef {Object} GetResult
     * @property {EncodedBlock} block
     * @property {Transferable[]} transfer
     *
     * @typedef {Object} GetQuery
     * @property {EncodedCID} cid
     * @property {number} [timeout]
     * @property {AbortSignal} [query.signal]
     *
     * @param {GetQuery} query
     * @returns {Promise<GetResult>}
     */
    get(query: {
        cid: EncodedCID;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<{
        block: EncodedBlock;
        transfer: Transferable[];
    }>;
    /**
     * @typedef {Object} PutResult
     * @property {EncodedBlock} block
     * @property {Transferable[]} transfer
     *
     * @typedef {Object} PutQuery
     * @property {EncodedBlock|Uint8Array} block
     * @property {EncodedCID|void} [cid]
     * @property {string} [format]
     * @property {string} [mhtype]
     * @property {number} [mhlen]
     * @property {number} [version]
     * @property {boolean} [pin]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * Stores input as an IPFS block.
     *
     * @param {PutQuery} query
     * @returns {Promise<PutResult>}
     */
    put(query: {
        block: EncodedBlock | Uint8Array;
        cid?: void | import("ipfs-message-port-protocol/src/cid").EncodedCID | undefined;
        format?: string | undefined;
        mhtype?: string | undefined;
        mhlen?: number | undefined;
        version?: number | undefined;
        pin?: boolean | undefined;
        timeout?: number | undefined;
        /**
         * Stores input as an IPFS block.
         */
        signal?: AbortSignal | undefined;
    }): Promise<{
        block: EncodedBlock;
        transfer: Transferable[];
    }>;
    /**
     * @typedef {Object} RmQuery
     * @property {EncodedCID[]} cids
     * @property {boolean} [force]
     * @property {boolean} [quiet]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @typedef {RmEntry[]} RmResult
     *
     * @typedef {Object} RmEntry
     * @property {EncodedCID} cid
     * @property {EncodedError|undefined} [error]
     *
     * Remove one or more IPFS block(s).
     * @param {RmQuery} query
     * @returns {Promise<RmResult>}
     */
    rm(query: {
        cids: EncodedCID[];
        force?: boolean | undefined;
        quiet?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<{
        cid: EncodedCID;
        /**
         * Remove one or more IPFS block(s).
         */
        error?: EncodedError | undefined;
    }[]>;
    /**
     * @typedef {Object} StatQuery
     * @property {EncodedCID} cid
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @typedef {Object} StatResult
     * @property {EncodedCID} cid
     * @property {number} size
     *
     * Gets information of a raw IPFS block.
     *
     * @param {StatQuery} query
     * @returns {Promise<StatResult>}
     */
    stat(query: {
        cid: EncodedCID;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<{
        cid: EncodedCID;
        /**
         * Gets information of a raw IPFS block.
         */
        size: number;
    }>;
}
//# sourceMappingURL=block.d.ts.map