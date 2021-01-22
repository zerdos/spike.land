export = CoreClient;
declare const CoreClient_base: typeof import("./client");
/**
 * @template T
 * @typedef {import('ipfs-message-port-protocol/src/core').RemoteIterable<T>} RemoteIterable
 */
/**
 * @typedef {import('ipfs-message-port-protocol/src/data').Time} Time
 * @typedef {import('ipfs-message-port-protocol/src/data').UnixFSTime} UnixFSTime
 * @typedef {import('ipfs-message-port-protocol/src/dag').EncodedCID} EncodedCID
 * @typedef {import('ipfs-message-port-server/src/core').SingleFileInput} EncodedAddInput
 * @typedef {import('ipfs-message-port-server/src/core').MultiFileInput} EncodedAddAllInput
 * @typedef {import('ipfs-message-port-server/src/core').FileInput} FileInput
 * @typedef {import('ipfs-message-port-server/src/core').FileContent} EncodedFileContent
 *
 * @typedef {Object} NoramilzedFileInput
 * @property {string} path
 * @property {AsyncIterable<ArrayBuffer>} content
 *
 * @typedef {ArrayBuffer|ArrayBufferView} Bytes
 *
 * @typedef {Blob|Bytes|string|Iterable<number>|Iterable<Bytes>|AsyncIterable<Bytes>} FileContent
 *
 * @typedef {Object} FileObject
 * @property {string} [path]
 * @property {FileContent} [content]
 * @property {string|number} [mode]
 * @property {UnixFSTime} [mtime]
 *
 *
 * @typedef {Blob|Bytes|string|FileObject|Iterable<number>|Iterable<Bytes>|AsyncIterable<Bytes>|ReadableStream} AddInput
 *
 * @typedef {Iterable<Blob|string|FileObject>|AsyncIterable<Blob|string|FileObject>} AddAllInput
 */
/**
 * @typedef {import('ipfs-message-port-server/src/core').CoreService} CoreService
 * @typedef {import('ipfs-message-port-server/src/core').AddedEntry} AddedEntry
 * @typedef {import('ipfs-message-port-server/src/core').EncodedLsEntry} EncodedLsEntry
 * @typedef {import('ipfs-message-port-server/src/core').LsEntry} LsEntry
 * @typedef {import('./client').MessageTransport} MessageTransport
 */
/**
 * @class
 * @extends {Client<CoreService>}
 */
declare class CoreClient extends CoreClient_base {
  /**
     * @param {MessageTransport} transport
     */
  constructor(transport: MessageTransport);
  /**
     * Import files and data into IPFS.
     *
     * If you pass binary data like `Uint8Array` it is recommended to provide
     * `transfer: [input.buffer]` which would allow transferring it instead of
     * copying.
     *
     * @type {import('.').Implements<typeof import('ipfs-core/src/components/add-all')>}
     */
  addAll(
    input: any,
    options?: {},
  ): AsyncIterable<import("ipfs-core-types/src/files").UnixFSEntry>;
  /**
     * Add file to IPFS.
     *
     * If you pass binary data like `Uint8Array` it is recommended to provide
     * `transfer: [input.buffer]` which would allow transferring it instead of
     * copying.
     *
     * @type {import('.').Implements<typeof import('ipfs-core/src/components/add')>}
     */
  add(
    input: any,
    options?: {},
  ): Promise<import("ipfs-core-types/src/files").UnixFSEntry>;
  /**
     * Returns content addressed by a valid IPFS Path.
     *
     * @param {string|CID} inputPath
     * @param {Object} [options]
     * @param {number} [options.offset]
     * @param {number} [options.length]
     * @param {number} [options.timeout]
     * @param {AbortSignal} [options.signal]
     * @returns {AsyncIterable<Uint8Array>}
     */
  cat(
    inputPath: string | import("cids"),
    options?: {
      offset?: number | undefined;
      length?: number | undefined;
      timeout?: number | undefined;
      signal?: AbortSignal | undefined;
    } | undefined,
  ): AsyncIterable<Uint8Array>;
  /**
     * Returns content addressed by a valid IPFS Path.
     *
     * @param {string|CID} inputPath
     * @param {Object} [options]
     * @param {boolean} [options.recursive]
     * @param {boolean} [options.preload]
     * @param {number} [options.timeout]
     * @param {AbortSignal} [options.signal]
     * @returns {AsyncIterable<LsEntry>}
     */
  ls(
    inputPath: string | import("cids"),
    options?: {
      recursive?: boolean | undefined;
      preload?: boolean | undefined;
      timeout?: number | undefined;
      signal?: AbortSignal | undefined;
    } | undefined,
  ): AsyncIterable<LsEntry>;
}
declare namespace CoreClient {
  export {
    AddAllInput,
    AddedEntry,
    AddInput,
    Bytes,
    CoreService,
    EncodedAddAllInput,
    EncodedAddInput,
    EncodedCID,
    EncodedFileContent,
    EncodedLsEntry,
    FileContent,
    FileInput,
    FileObject,
    LsEntry,
    MessageTransport,
    NoramilzedFileInput,
    RemoteIterable,
    Time,
    UnixFSTime,
  };
}
type LsEntry = {
  name: string;
  path: string;
  type: "file" | "directory";
  size: number;
  depth: number;
  cid: import("cids");
  mode: import("ipfs-core-types/src/files").ToMode;
  mtime?: import("ipfs-message-port-protocol/src/data").UnixFSTime | undefined;
};
type MessageTransport = import("./client/transport");
type RemoteIterable<T> = {
  type: "RemoteIterable";
  port: MessagePort;
};
type Time =
  | Date
  | import("ipfs-message-port-protocol/src/data").LooseUnixFSTime
  | import("ipfs-message-port-protocol/src/data").HRTime;
type UnixFSTime = {
  secs: number;
  nsecs: number;
};
type EncodedCID = {
  codec: string;
  multihash: Uint8Array;
  version: number;
};
type EncodedAddInput =
  | string
  | ArrayBuffer
  | Blob
  | ArrayBufferView
  | import("ipfs-message-port-server/src/core").FileInput
  | import("ipfs-message-port-protocol/src/core").RemoteIterable<
    ArrayBuffer | ArrayBufferView
  >;
type EncodedAddAllInput = {
  type: "RemoteIterable";
  port: MessagePort;
};
type FileInput = {
  path?: string | undefined;
  content?:
    | string
    | ArrayBuffer
    | Blob
    | ArrayBufferView
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
type EncodedFileContent =
  | string
  | ArrayBuffer
  | Blob
  | ArrayBufferView
  | import("ipfs-message-port-protocol/src/core").RemoteIterable<
    ArrayBufferView
  >
  | import("ipfs-message-port-protocol/src/core").RemoteIterable<ArrayBuffer>;
type NoramilzedFileInput = {
  path: string;
  content: AsyncIterable<ArrayBuffer>;
};
type Bytes = ArrayBuffer | ArrayBufferView;
type FileContent =
  | string
  | ArrayBuffer
  | Blob
  | ArrayBufferView
  | Iterable<number>
  | Iterable<ArrayBuffer | ArrayBufferView>
  | AsyncIterable<ArrayBuffer | ArrayBufferView>;
type FileObject = {
  path?: string | undefined;
  content?:
    | string
    | ArrayBuffer
    | Blob
    | ArrayBufferView
    | Iterable<number>
    | Iterable<ArrayBuffer | ArrayBufferView>
    | AsyncIterable<ArrayBuffer | ArrayBufferView>
    | undefined;
  mode?: string | number | undefined;
  mtime?: import("ipfs-message-port-protocol/src/data").UnixFSTime | undefined;
};
type AddInput =
  | string
  | ArrayBuffer
  | Blob
  | ArrayBufferView
  | ReadableStream<any>
  | Iterable<number>
  | Iterable<ArrayBuffer | ArrayBufferView>
  | AsyncIterable<ArrayBuffer | ArrayBufferView>
  | FileObject;
type AddAllInput =
  | Iterable<string | Blob | FileObject>
  | AsyncIterable<string | Blob | FileObject>;
type CoreService = import("ipfs-message-port-server/src/core").CoreService;
type AddedEntry = {
  path: string;
  cid: import("ipfs-message-port-server/src/core").EncodedCID;
  mode: number;
  mtime: import("ipfs-message-port-server/src/core").UnixFSTime;
  size: number;
};
type EncodedLsEntry = {
  cid: import("ipfs-message-port-server/src/core").EncodedCID;
  type: "file" | "directory";
  name: string;
  path: string;
  depth: number;
  size: number;
  mode: import("ipfs-core-types/src/files").ToMode;
  mtime?: import("ipfs-message-port-protocol/src/data").UnixFSTime | undefined;
};
//# sourceMappingURL=core.d.ts.map
