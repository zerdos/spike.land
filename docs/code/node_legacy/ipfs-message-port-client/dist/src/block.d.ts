export = BlockClient;
declare const BlockClient_base: typeof import("./client");
/**
 * @typedef {import('cids')} CID
 * @typedef {import('ipfs-message-port-server/src/block').Block} Block
 * @typedef {import('ipfs-message-port-server/src/block').EncodedBlock} EncodedBlock
 * @typedef {import('ipfs-message-port-server/src/block').Rm} EncodedRmEntry
 * @typedef {import('ipfs-message-port-server/src/block').BlockService} BlockService
 * @typedef {import('./client').MessageTransport} MessageTransport
 */
/**
 * @class
 * @extends {Client<BlockService>}
 */
declare class BlockClient extends BlockClient_base {
    /**
     * @param {MessageTransport} transport
     */
    constructor(transport: MessageTransport);
    /**
     * Get a raw IPFS block.
     *
     * @param {CID} cid - A CID that corresponds to the desired block
     * @param {Object} [options]
     * @param {number} [options.timeout] - A timeout in ms
     * @param {AbortSignal} [options.signal] - Can be used to cancel any long
     * running requests started as a result of this call
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * worker if passed.
     * @returns {Promise<Block>}
     */
    get(cid: CID, options?: {
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
        transfer?: Transferable[] | undefined;
    } | undefined): Promise<Block>;
    /**
     * Stores input as an IPFS block.
     *
     * @param {Block|Uint8Array} block - A Block or Uint8Array of block data
     * @param {Object} [options]
     * @param {CID} [options.cid] - A CID to store the block under (if block is
     * `Uint8Array`)
     * @param {string} [options.format='dag-pb'] - The codec to use to create the
     * CID (if block is `Uint8Array`)
     * @param {string} [options.mhtype='sha2-256'] - The hashing algorithm to use
     * to create the CID (if block is `Uint8Array`)
     * @param {0|1} [options.version=0] - The version to use to create the CID
     * (if block is `Uint8Array`)
     * @param {number} [options.mhlen]
     * @param {boolean} [options.pin=false] - If true, pin added blocks recursively
     * @param {number} [options.timeout] - A timeout in ms
     * @param {AbortSignal} [options.signal] - Can be used to cancel any long
     * running requests started as a result of this call
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * worker if passed.
     * @returns {Promise<Block>}
     */
    put(block: Block | Uint8Array, options?: {
        cid?: import("cids") | undefined;
        format?: string | undefined;
        mhtype?: string | undefined;
        version?: 0 | 1 | undefined;
        mhlen?: number | undefined;
        pin?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
        transfer?: Transferable[] | undefined;
    } | undefined): Promise<Block>;
    /**
     * Remove one or more IPFS block(s).
     *
     * @param {CID|CID[]} cids - Block(s) to be removed
     * @param {Object} [options]
     * @param {boolean} [options.force=false] - Ignores nonexistent blocks
     * @param {boolean} [options.quiet=false] - Write minimal output
     * @param {number} [options.timeout] - A timeout in ms
     * @param {AbortSignal} [options.signal] - Can be used to cancel any long
     * running requests started as a result of this call
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * worker if passed.
     * @returns {AsyncIterable<RmEntry>}
     *
     * @typedef {Object} RmEntry
     * @property {CID} cid
     * @property {Error|void} [error]
     */
    rm(cids: CID | CID[], options?: {
        force?: boolean | undefined;
        quiet?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
        transfer?: Transferable[] | undefined;
    } | undefined): AsyncIterable<{
        cid: CID;
        error?: void | Error | undefined;
    }>;
    /**
     * Returns information about a raw IPFS block.
     *
     * @param {CID} cid - Block to get information about.
     * @param {Object} [options]
     * @param {number} [options.timeout] - A timeout in ms
     * @param {AbortSignal} [options.signal] - Can be used to cancel any long
     * running requests started as a result of this call
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * worker if passed.
     * @returns {Promise<Stat>}
     *
     * @typedef {Object} Stat
     * @property {CID} cid
     * @property {number} size
     */
    stat(cid: CID, options?: {
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
        transfer?: Transferable[] | undefined;
    } | undefined): Promise<{
        cid: CID;
        size: number;
    }>;
}
declare namespace BlockClient {
    export { CID, Block, EncodedBlock, EncodedRmEntry, BlockService, MessageTransport };
}
type CID = import("cids");
type Block = any;
type MessageTransport = import("./client/transport");
type EncodedBlock = {
    data: Uint8Array;
    cid: import("ipfs-message-port-protocol/src/block").EncodedCID;
};
type EncodedRmEntry = {
    cid: import("ipfs-message-port-server/src/block").EncodedCID;
    error?: Error | import("ipfs-message-port-protocol/src/error").ErrorData | undefined;
};
type BlockService = import("ipfs-message-port-server/src/block").BlockService;
//# sourceMappingURL=block.d.ts.map