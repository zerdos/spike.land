export type EncodedCID = {
    codec: string;
    multihash: Uint8Array;
    version: number;
};
export type HashAlg = string;
export type Mode = string | number;
export type IPFS = import("./ipfs").IPFS;
export type EncodedStat = {
    cid: EncodedCID;
    size: number;
    cumulativeSize: number;
    type: 'file' | 'directory';
    blocks: number;
    withLocality: boolean;
    local: boolean;
    sizeLocal: number;
};
export class FilesService {
    /**
     *
     * @param {IPFS} ipfs
     */
    constructor(ipfs: IPFS);
    ipfs: import("./ipfs").IPFS;
    /**
     * @typedef {Object} StatQuery
     * @property {string} path
     * @property {boolean} [hash=false]
     * @property {boolean} [size=false]
     * @property {boolean} [withLocal=false]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @typedef {Object} Stat
     * @property {EncodedCID} cid
     * @property {number} size
     * @property {number} cumulativeSize
     * @property {'file'|'directory'} type
     * @property {number} blocks
     * @property {boolean} withLocality
     * @property {boolean} local
     * @property {number} sizeLocal
     *
     * @typedef {Object} StatResult
     * @property {Stat} stat
     * @property {Transferable[]} transfer
     *
     * @param {StatQuery} input
     * @returns {Promise<StatResult>}
     */
    stat(input: {
        path: string;
        hash?: boolean | undefined;
        size?: boolean | undefined;
        withLocal?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<{
        stat: {
            cid: EncodedCID;
            size: number;
            cumulativeSize: number;
            type: 'file' | 'directory';
            blocks: number;
            withLocality: boolean;
            local: boolean;
            sizeLocal: number;
        };
        transfer: Transferable[];
    }>;
}
//# sourceMappingURL=files.d.ts.map