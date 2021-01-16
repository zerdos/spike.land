export type IPFS = import("./ipfs").IPFS;
export class IPFSService {
    /**
     *
     * @param {IPFS} ipfs
     */
    constructor(ipfs: IPFS);
    dag: {
        ipfs: import("./ipfs").IPFS;
        put(query: {
            dagNode: import("ipfs-message-port-protocol/src/dag").EncodedDAGNode;
            hashAlg?: string | undefined;
            cid?: void | import("ipfs-message-port-protocol/src/cid").EncodedCID | undefined;
            pin?: boolean | undefined;
            preload?: boolean | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<import("ipfs-message-port-protocol/src/cid").EncodedCID>;
        get(query: {
            cid: import("ipfs-message-port-protocol/src/cid").EncodedCID;
            path?: string | undefined;
            localResolve?: boolean | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<{
            transfer: Transferable[];
            remainderPath: string;
            value: import("ipfs-message-port-protocol/src/dag").EncodedDAGNode;
        }>;
        resolve(query: {
            cid: string | import("ipfs-message-port-protocol/src/cid").EncodedCID;
            path?: string | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<{
            cid: import("ipfs-message-port-protocol/src/cid").EncodedCID;
            remainderPath: string | void;
        }>;
        tree(query: {
            cid: import("ipfs-message-port-protocol/src/cid").EncodedCID;
            path?: string | undefined;
            recursive?: boolean | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<string[]>;
    };
    core: {
        ipfs: import("./ipfs").IPFS;
        addAll(query: import("./core").AddAllInput & import("./core").AddOptions): {
            data: import("ipfs-message-port-protocol/src/core").RemoteIterable<import("./core").AddedEntry>;
            transfer: Transferable[];
        };
        add(query: import("./core").AddInput & import("./core").AddOptions): Promise<{
            data: import("./core").AddedEntry;
            transfer: Transferable[];
        }>;
        cat(query: {
            path: string | import("ipfs-message-port-protocol/src/cid").EncodedCID;
            offset?: number | undefined;
            length?: number | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): {
            data: import("ipfs-message-port-protocol/src/core").RemoteIterable<Uint8Array>;
            transfer: Transferable[];
        };
        ls(query: {
            path: string | import("ipfs-message-port-protocol/src/cid").EncodedCID;
            preload?: boolean | undefined;
            recursive?: boolean | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): {
            data: import("ipfs-message-port-protocol/src/core").RemoteIterable<import("./core").EncodedLsEntry>;
            transfer: Transferable[];
        };
    };
    files: {
        ipfs: import("./ipfs").IPFS;
        stat(input: {
            path: string;
            hash?: boolean | undefined;
            size?: boolean | undefined;
            withLocal?: boolean | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<{
            stat: {
                cid: import("ipfs-message-port-protocol/src/dag").EncodedCID;
                size: number;
                cumulativeSize: number;
                type: import("ipfs-message-port-protocol/src/data").FileType;
                blocks: number;
                withLocality: boolean;
                local: boolean;
                sizeLocal: number;
            };
            transfer: Transferable[];
        }>;
    };
    block: {
        ipfs: import("./ipfs").IPFS;
        get(query: {
            cid: import("ipfs-message-port-protocol/src/cid").EncodedCID;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<{
            block: import("ipfs-message-port-protocol/src/block").EncodedBlock;
            transfer: Transferable[];
        }>;
        put(query: {
            block: Uint8Array | import("ipfs-message-port-protocol/src/block").EncodedBlock;
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
            block: import("ipfs-message-port-protocol/src/block").EncodedBlock;
            transfer: Transferable[];
        }>;
        rm(query: {
            cids: import("ipfs-message-port-protocol/src/cid").EncodedCID[];
            force?: boolean | undefined;
            quiet?: boolean | undefined;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<{
            cid: import("ipfs-message-port-protocol/src/cid").EncodedCID;
            /**
             * Remove one or more IPFS block(s).
             */
            error?: Error | import("ipfs-message-port-protocol/src/error").ErrorData | undefined;
        }[]>;
        stat(query: {
            cid: import("ipfs-message-port-protocol/src/cid").EncodedCID;
            timeout?: number | undefined;
            signal?: AbortSignal | undefined;
        }): Promise<{
            cid: import("ipfs-message-port-protocol/src/cid").EncodedCID;
            /**
             * Gets information of a raw IPFS block.
             */
            size: number;
        }>;
    };
}
//# sourceMappingURL=service.d.ts.map