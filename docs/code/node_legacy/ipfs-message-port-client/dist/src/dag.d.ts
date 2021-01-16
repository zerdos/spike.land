export = DAGClient;
declare const DAGClient_base: typeof import("./client");
/**
 * @typedef {import('cids')} CID
 * @typedef {import('ipfs-message-port-server/src/dag').EncodedCID} EncodedCID
 * @typedef {import('ipfs-message-port-server/src/dag').DAGNode} DAGNode
 * @typedef {import('ipfs-message-port-server/src/dag').EncodedDAGNode} EncodedDAGNode
 * @typedef {import('ipfs-message-port-server/src/dag').DAGEntry} DAGEntry
 * @typedef {import('ipfs-message-port-server/src/dag').DAGService} DagService
 * @typedef {import('./client').MessageTransport} MessageTransport
 */
/**
 * @class
 * @extends {Client<DagService>}
 */
declare class DAGClient extends DAGClient_base {
    /**
     * @param {MessageTransport} transport
     */
    constructor(transport: MessageTransport);
    /**
     * @param {DAGNode} dagNode
     * @param {Object} [options]
     * @param {string} [options.format="dag-cbor"] - The IPLD format multicodec
     * @param {string} [options.hashAlg="sha2-256"] - The hash algorithm to be used over the serialized DAG node
     * @param {CID} [options.cid]
     * @param {boolean} [options.pin=false] - Pin this node when adding to the blockstore
     * @param {boolean} [options.preload=true]
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * @param {number} [options.timeout] - A timeout in ms
     * @param {AbortSignal} [options.signal] - Can be used to cancel any long running requests started as a result of this call.
     * @returns {Promise<CID>}
     */
    put(dagNode: DAGNode, options?: {
        format?: string | undefined;
        hashAlg?: string | undefined;
        cid?: import("cids") | undefined;
        pin?: boolean | undefined;
        preload?: boolean | undefined;
        transfer?: Transferable[] | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    } | undefined): Promise<CID>;
    /**
     * @param {CID} cid
     * @param {Object} [options]
     * @param {string} [options.path]
     * @param {boolean} [options.localResolve]
     * @param {number} [options.timeout]
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * @param {AbortSignal} [options.signal]
     * @returns {Promise<DAGEntry>}
     */
    get(cid: CID, options?: {
        path?: string | undefined;
        localResolve?: boolean | undefined;
        timeout?: number | undefined;
        transfer?: Transferable[] | undefined;
        signal?: AbortSignal | undefined;
    } | undefined): Promise<DAGEntry>;
    /**
     * @typedef {Object} ResolveResult
     * @property {CID} cid
     * @property {string|void} remainderPath
     *
     * @param {CID} cid
     * @param {Object} [options]
     * @param {string} [options.path]
     * @param {number} [options.timeout]
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * @param {AbortSignal} [options.signal]
     * @returns {Promise<ResolveResult>}
     */
    resolve(cid: CID, options?: {
        path?: string | undefined;
        timeout?: number | undefined;
        transfer?: Transferable[] | undefined;
        signal?: AbortSignal | undefined;
    } | undefined): Promise<{
        cid: CID;
        remainderPath: string | void;
    }>;
    /**
     * Enumerate all the entries in a graph
     *
     * @param {CID} cid - CID of the DAG node to enumerate
     * @param {Object} [options]
     * @param {string} [options.path]
     * @param {boolean} [options.recursive]
     * @param {Transferable[]} [options.transfer] - References to transfer to the
     * @param {number} [options.timeout]
     * @param {AbortSignal} [options.signal]
     * @returns {AsyncIterable<string>}
     */
    tree(cid: CID, options?: {
        path?: string | undefined;
        recursive?: boolean | undefined;
        transfer?: Transferable[] | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    } | undefined): AsyncIterable<string>;
}
declare namespace DAGClient {
    export { CID, EncodedCID, DAGNode, EncodedDAGNode, DAGEntry, DagService, MessageTransport };
}
type DAGNode = string | number | boolean | import("ipfs-message-port-protocol/src/data").JSONArray | import("ipfs-message-port-protocol/src/data").JSONObject | null;
type CID = import("cids");
type DAGEntry = {
    value: import("ipfs-message-port-server/src/dag").DAGNode;
    remainderPath: string;
};
type MessageTransport = import("./client/transport");
type EncodedCID = {
    codec: string;
    multihash: Uint8Array;
    version: number;
};
type EncodedDAGNode = {
    dagNode: import("ipfs-message-port-server/src/dag").DAGNode;
    cids: import("cids")[];
};
type DagService = import("ipfs-message-port-server/src/dag").DAGService;
//# sourceMappingURL=dag.d.ts.map