export type IPFS = import("./ipfs").IPFS;
export type CID = import("cids");
export type EncodedCID = {
    codec: string;
    multihash: Uint8Array;
    version: number;
};
export type DAGNode = string | number | boolean | import("ipfs-message-port-protocol/src/data").JSONArray | import("ipfs-message-port-protocol/src/data").JSONObject | null;
export type EncodedDAGNode = {
    dagNode: import("ipfs-message-port-protocol/src/dag").DAGNode;
    cids: import("cids")[];
};
export type DAGEntry = {
    value: DAGNode;
    remainderPath: string;
};
export class DAGService {
    /**
     * @param {IPFS} ipfs
     */
    constructor(ipfs: IPFS);
    ipfs: import("./ipfs").IPFS;
    /**
     * @typedef {Object} PutDag
     * @property {EncodedDAGNode} dagNode
     * @property {string} [hashAlg]
     * @property {EncodedCID|void} [cid]
     * @property {boolean} [pin]
     * @property {boolean} [preload]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @param {PutDag} query
     * @returns {Promise<EncodedCID>}
     */
    put(query: {
        dagNode: EncodedDAGNode;
        hashAlg?: string | undefined;
        cid?: void | import("ipfs-message-port-protocol/src/cid").EncodedCID | undefined;
        pin?: boolean | undefined;
        preload?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<EncodedCID>;
    /**
     * @typedef {Object} GetResult
     * @property {Transferable[]} transfer
     * @property {string} remainderPath
     * @property {EncodedDAGNode} value
     *
     * @typedef {Object} GetDAG
     * @property {EncodedCID} cid
     * @property {string} [path]
     * @property {boolean} [localResolve]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @param {GetDAG} query
     * @returns {Promise<GetResult>}
     */
    get(query: {
        cid: EncodedCID;
        path?: string | undefined;
        localResolve?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<{
        transfer: Transferable[];
        remainderPath: string;
        value: EncodedDAGNode;
    }>;
    /**
     * @typedef {Object} ResolveQuery
     * @property {EncodedCID|string} cid
     * @property {string} [path]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @typedef {Object} ResolveResult
     * @property {EncodedCID} cid
     * @property {string|void} remainderPath
     *
     * @param {ResolveQuery} query
     * @returns {Promise<ResolveResult>}
     */
    resolve(query: {
        cid: EncodedCID | string;
        path?: string | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<{
        cid: EncodedCID;
        remainderPath: string | void;
    }>;
    /**
     * @typedef {Object} EnumerateDAG
     * @property {EncodedCID} cid
     * @property {string} [path]
     * @property {boolean} [recursive]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @param {EnumerateDAG} query
     * @returns {Promise<string[]>}
     */
    tree(query: {
        cid: EncodedCID;
        path?: string | undefined;
        recursive?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<string[]>;
}
//# sourceMappingURL=dag.d.ts.map