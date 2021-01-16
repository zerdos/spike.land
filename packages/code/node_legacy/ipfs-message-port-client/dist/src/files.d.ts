export = FilesClient;
declare const FilesClient_base: typeof import("./client");
/**
 * @typedef {import('ipfs-message-port-server/src/files').FilesService} FilesService
 * @typedef {import('ipfs-message-port-server/src/files').EncodedStat} EncodedStat
 * @typedef {import('./client').MessageTransport} MessageTransport
 */
/**
 * @class
 * @extends {Client<FilesService>}
 */
declare class FilesClient extends FilesClient_base {
    /**
     * @param {MessageTransport} transport
     */
    constructor(transport: MessageTransport);
    /**
     * @typedef {Object} Stat
     * @property {CID} cid Content identifier.
     * @property {number} size File size in bytes.
     * @property {number} cumulativeSize Size of the DAGNodes making up the file in bytes.
     * @property {"directory"|"file"} type
     * @property {number} blocks Number of files making up directory (when a direcotry)
     * or number of blocks that make up the file (when a file)
     * @property {boolean} withLocality True when locality information is present
     * @property {boolean} local True if the queried dag is fully present locally
     * @property {number} sizeLocal Cumulative size of the data present locally
     *
     * @param {string|CID} pathOrCID
     * @param {Object} [options]
     * @param {boolean} [options.hash=false] - If true will only return hash
     * @param {boolean} [options.size=false] - If true will only return size
     * @param {boolean} [options.withLocal=false] - If true computes size of the dag that is local, and total size when possible
     * @param {number} [options.timeout]
     * @param {AbortSignal} [options.signal]
     * @returns {Promise<Stat>}
     */
    stat(pathOrCID: string | import("cids"), options?: {
        hash?: boolean | undefined;
        size?: boolean | undefined;
        withLocal?: boolean | undefined;
        timeout?: number | undefined;
        signal?: AbortSignal | undefined;
    } | undefined): Promise<{
        /**
         * Content identifier.
         */
        cid: import("cids");
        /**
         * File size in bytes.
         */
        size: number;
        /**
         * Size of the DAGNodes making up the file in bytes.
         */
        cumulativeSize: number;
        type: "directory" | "file";
        /**
         * Number of files making up directory (when a direcotry)
         * or number of blocks that make up the file (when a file)
         */
        blocks: number;
        /**
         * True when locality information is present
         */
        withLocality: boolean;
        /**
         * True if the queried dag is fully present locally
         */
        local: boolean;
        /**
         * Cumulative size of the data present locally
         */
        sizeLocal: number;
    }>;
}
declare namespace FilesClient {
    export { FilesService, EncodedStat, MessageTransport };
}
type MessageTransport = import("./client/transport");
type FilesService = import("ipfs-message-port-server/src/files").FilesService;
type EncodedStat = {
    cid: import("ipfs-message-port-server/src/files").EncodedCID;
    size: number;
    cumulativeSize: number;
    type: "file" | "directory";
    blocks: number;
    withLocality: boolean;
    local: boolean;
    sizeLocal: number;
};
//# sourceMappingURL=files.d.ts.map