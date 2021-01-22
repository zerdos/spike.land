export type IPFS = import("./ipfs").IPFS;
export type Time =
  | Date
  | import("ipfs-message-port-protocol/src/data").LooseUnixFSTime
  | import("ipfs-message-port-protocol/src/data").HRTime;
export type UnixFSTime = {
  secs: number;
  nsecs: number;
};
export type Mode = string | number;
export type HashAlg = string;
export type FileType = "directory" | "file";
export type EncodedCID = {
  codec: string;
  multihash: Uint8Array;
  version: number;
};
export type FileOutput = {
  path: string;
  cid: import("cids");
  mode: number;
  mtime: {
    secs: number;
    nsecs: number;
  };
  size: number;
};
export type FileObject = {
  path?: string | undefined;
  content?:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | Iterable<ArrayBufferView | ArrayBuffer>
    | AsyncIterable<ArrayBufferView | ArrayBuffer>
    | undefined;
  mode?: string | number | undefined;
  mtime?:
    | Date
    | import("ipfs-message-port-protocol/src/data").LooseUnixFSTime
    | import("ipfs-message-port-protocol/src/data").HRTime
    | undefined;
};
export type DecodedFileContent =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | Iterable<ArrayBufferView | ArrayBuffer>
  | AsyncIterable<ArrayBufferView | ArrayBuffer>;
export type DecodedFileInput = {
  path?: string | undefined;
  content?:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | Iterable<ArrayBufferView | ArrayBuffer>
    | AsyncIterable<ArrayBufferView | ArrayBuffer>
    | undefined;
  mode?: string | number | void | undefined;
  mtime?:
    | Date
    | import("ipfs-message-port-protocol/src/data").LooseUnixFSTime
    | import("ipfs-message-port-protocol/src/data").HRTime
    | undefined;
};
export type LsEntry = {
  name: string;
  path: string;
  type: import("ipfs-message-port-protocol/src/data").FileType;
  size: number;
  depth: number;
  cid: import("cids");
  mode: string | number;
  mtime?: import("ipfs-message-port-protocol/src/data").UnixFSTime | undefined;
};
export type RemoteCallback = {
  type: "RemoteCallback";
  port: MessagePort;
};
export type RemoteIterable<T> = {
  type: "RemoteIterable";
  port: MessagePort;
};
export type AddOptions = {
  chunker?: string | undefined;
  cidVersion?: number | undefined;
  enableShardingExperiment?: boolean | undefined;
  hashAlg?: string | undefined;
  onlyHash?: boolean | undefined;
  pin?: boolean | undefined;
  progress?:
    | void
    | import("ipfs-message-port-protocol/src/core").RemoteCallback
    | undefined;
  rawLeaves?: boolean | undefined;
  shardSplitThreshold?: number | undefined;
  trickle?: boolean | undefined;
  wrapWithDirectory?: boolean | undefined;
  timeout?: number | undefined;
  signal?: AbortSignal | undefined;
};
export type AddAllInput = {
  input: MultiFileInput;
};
export type AddInput = {
  input: SingleFileInput;
};
export type AddQuery = AddInput & AddOptions;
export type AddAllQuery = AddAllInput & AddOptions;
export type SingleFileInput =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FileInput
  | import("ipfs-message-port-protocol/src/core").RemoteIterable<
    ArrayBufferView | ArrayBuffer
  >;
export type MultiFileInput = {
  type: "RemoteIterable";
  port: MessagePort;
};
export type FileInput = {
  path?: string | undefined;
  content?:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | import("ipfs-message-port-protocol/src/core").RemoteIterable<
      ArrayBufferView
    >
    | import("ipfs-message-port-protocol/src/core").RemoteIterable<ArrayBuffer>
    | undefined;
  mode?: string | number | undefined;
  mtime?:
    | Date
    | import("ipfs-message-port-protocol/src/data").LooseUnixFSTime
    | import("ipfs-message-port-protocol/src/data").HRTime
    | undefined;
};
export type FileContent =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | import("ipfs-message-port-protocol/src/core").RemoteIterable<
    ArrayBufferView
  >
  | import("ipfs-message-port-protocol/src/core").RemoteIterable<ArrayBuffer>;
export type AddedEntry = {
  path: string;
  cid: EncodedCID;
  mode: number;
  mtime: UnixFSTime;
  size: number;
};
export type FileEntry = {
  path: string;
  content: RemoteIterable<Uint8Array>;
  mode?: string | number | undefined;
  mtime?: import("ipfs-message-port-protocol/src/data").UnixFSTime | undefined;
};
export type EncodedLsEntry = {
  cid: EncodedCID;
  type: FileType;
  name: string;
  path: string;
  depth: number;
  size: number;
  mode: Mode;
  mtime?: import("ipfs-message-port-protocol/src/data").UnixFSTime | undefined;
};
export class CoreService {
  /**
     *
     * @param {IPFS} ipfs
     */
  constructor(ipfs: IPFS);
  ipfs: import("./ipfs").IPFS;
  /**
     * @typedef {Object} AddAllResult
     * @property {RemoteIterable<AddedEntry>} data
     * @property {Transferable[]} transfer
     *
     * @param {AddAllQuery} query
     * @returns {AddAllResult}
     */
  addAll(query: AddAllQuery): {
    data: RemoteIterable<AddedEntry>;
    transfer: Transferable[];
  };
  /**
     * @typedef {Object} AddResult
     * @property {AddedEntry} data
     * @property {Transferable[]} transfer
     *
     * @param {AddQuery} query
     * @returns {Promise<AddResult>}
     */
  add(query: AddQuery): Promise<{
    data: AddedEntry;
    transfer: Transferable[];
  }>;
  /**
     * @typedef {Object} CatQuery
     * @property {string|EncodedCID} path
     * @property {number} [offset]
     * @property {number} [length]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @typedef {Object} CatResult
     * @property {RemoteIterable<Uint8Array>} data
     * @property {Transferable[]} transfer
     *
     * @param {CatQuery} query
     * @returns {CatResult}
     */
  cat(query: {
    path: string | EncodedCID;
    offset?: number | undefined;
    length?: number | undefined;
    timeout?: number | undefined;
    signal?: AbortSignal | undefined;
  }): {
    data: RemoteIterable<Uint8Array>;
    transfer: Transferable[];
  };
  /**
     * @typedef {Object} LsQuery
     * @property {string|EncodedCID} path
     * @property {boolean} [preload]
     * @property {boolean} [recursive]
     * @property {number} [timeout]
     * @property {AbortSignal} [signal]
     *
     * @typedef {Object} LsResult
     * @property {RemoteIterable<EncodedLsEntry>} data
     * @property {Transferable[]} transfer
     *
     * @param {LsQuery} query
     * @returns {LsResult}
     */
  ls(query: {
    path: string | EncodedCID;
    preload?: boolean | undefined;
    recursive?: boolean | undefined;
    timeout?: number | undefined;
    signal?: AbortSignal | undefined;
  }): {
    data: RemoteIterable<EncodedLsEntry>;
    transfer: Transferable[];
  };
}
//# sourceMappingURL=core.d.ts.map
