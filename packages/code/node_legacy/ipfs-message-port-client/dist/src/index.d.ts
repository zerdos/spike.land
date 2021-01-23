export = IPFSClient;
declare const IPFSClient_base: typeof import("./core");
/**
 * @typedef {import('./client').MessageTransport} MessageTransport
 *
 * @typedef {Object} ClientOptions
 * @property {MessagePort} port
 */
declare class IPFSClient extends IPFSClient_base {
  /**
     * Attaches IPFS client to the given message port. Throws
     * exception if client is already attached.
     *
     * @param {IPFSClient} self
     * @param {MessagePort} port
     */
  static attach(self: IPFSClient, port: MessagePort): void;
  /**
     * Creates IPFS client that is detached from the `ipfs-message-port-service`.
     * This can be useful when in a scenario where obtaining message port happens
     * later on in the application logic. Datached IPFS client will queue all the
     * API calls and flush them once client is attached.
     *
     * @returns {IPFSClient}
     */
  static detached(): IPFSClient;
  /**
     * Creates IPFS client from the message port (assumes that
     * `ipfs-message-port-service` is instantiated on the other end)
     *
     * @param {MessagePort} port
     * @returns {IPFSClient}
     */
  static from(port: MessagePort): IPFSClient;
  /**
     * @param {MessageTransport} transport
     */
  constructor(transport: MessageTransport);
  transport: import("./client/transport");
  dag: import("./dag");
  files: import("./files");
  block: import("./block");
}
declare namespace IPFSClient {
  export {
    AbortOptions,
    APIWithExtraOptions,
    ClientOptions,
    Implements,
    ImplementsMethod,
    MessagePortOptions,
    MessageTransport,
  };
}
declare const MessageTransport_1: typeof import("./client/transport");
type MessageTransport = import("./client/transport");
type ClientOptions = {
  port: MessagePort;
};
type MessagePortOptions = {
  /**
     * - A list of ArrayBuffers whose ownership will be transferred to the shared worker
     */
  transfer?: any[] | undefined;
};
/**
 * }
 */
type AbortOptions = import("ipfs-core-types").AbortOptions;
/**
 * This is an utility type that can be used to derive type of the HTTP Client
 * API from the Core API. It takes type of the API factory (from ipfs-core),
 * derives API from it's return type and extends it last `options` parameter
 * with `HttpOptions`.
 *
 * This can be used to avoid (re)typing API interface when implementing it in
 * http client e.g you can annotate `ipfs.addAll` implementation with
 *
 * `@type {Implements<typeof import('ipfs-core/src/components/add-all')>}`
 *
 * **Caution**: This supports APIs with up to four parameters and last optional
 * `options` parameter, anything else will result to `never` type.
 */
type Implements<APIFactory extends (config: any) => any> = (
  ...args: Parameters<ReturnType<APIFactory>> extends never[] ? []
    : Parameters<ReturnType<APIFactory>> extends
      [options?: infer Options | undefined, ...end: never[]]
      ? [options?: (Options & MessagePortOptions) | undefined]
    : Parameters<ReturnType<APIFactory>> extends
      [a1: infer A1, options?: infer Options_1 | undefined, ...end: never[]]
      ? [a1: A1, options?: (Options_1 & MessagePortOptions) | undefined]
    : Parameters<ReturnType<APIFactory>> extends [
      a1?: infer A1_1 | undefined,
      options?: infer Options_2 | undefined,
      ...end: never[],
    ] ? [
      a1?: A1_1 | undefined,
      options?: (Options_2 & MessagePortOptions) | undefined,
    ]
    : Parameters<ReturnType<APIFactory>> extends [
      a1: infer A1_2,
      a2: infer A2,
      options?: infer Options_3 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_2,
      a2: A2,
      options?: (Options_3 & MessagePortOptions) | undefined,
    ]
    : Parameters<ReturnType<APIFactory>> extends [
      a1: infer A1_3,
      a2?: infer A2_1 | undefined,
      options?: infer Options_4 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_3,
      a2?: A2_1 | undefined,
      options?: (Options_4 & MessagePortOptions) | undefined,
    ]
    : Parameters<ReturnType<APIFactory>> extends [
      a1?: infer A1_4 | undefined,
      a2?: infer A2_2 | undefined,
      options?: infer Options_5 | undefined,
      ...end: never[],
    ] ? [
      a1?: A1_4 | undefined,
      a2?: A2_2 | undefined,
      options?: (Options_5 & MessagePortOptions) | undefined,
    ]
    : Parameters<ReturnType<APIFactory>> extends [
      a1: infer A1_5,
      a2: infer A2_3,
      a3: infer A3,
      options?: infer Options_6 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_5,
      a2: A2_3,
      a3: A3,
      options?: (Options_6 & MessagePortOptions) | undefined,
    ]
    : Parameters<ReturnType<APIFactory>> extends [
      a1: infer A1_6,
      a2: infer A2_4,
      a3?: infer A3_1 | undefined,
      options?: infer Options_7 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_6,
      a2: A2_4,
      a3?: A3_1 | undefined,
      options?: (Options_7 & MessagePortOptions) | undefined,
    ]
    : Parameters<ReturnType<APIFactory>> extends [
      a1: infer A1_7,
      a2?: infer A2_5 | undefined,
      a3?: infer A3_2 | undefined,
      options?: infer Options_8 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_7,
      a2?: A2_5 | undefined,
      a3?: A3_2 | undefined,
      options?: (Options_8 & MessagePortOptions) | undefined,
    ]
    : Parameters<ReturnType<APIFactory>> extends [
      a1?: infer A1_8 | undefined,
      a2?: infer A2_6 | undefined,
      a3?: infer A3_3 | undefined,
      options?: infer Options_9 | undefined,
      ...end: never[],
    ] ? [
      a1?: A1_8 | undefined,
      a2?: A2_6 | undefined,
      a3?: A3_3 | undefined,
      options?: (Options_9 & MessagePortOptions) | undefined,
    ]
    : never
) => ReturnType<ReturnType<APIFactory>>;
type ImplementsMethod<Key, APIFactory extends (config: any) => any> =
  ReturnType<APIFactory>[Key] extends (...args: any[]) => any
    ? import("./interface").APIWithExtraOptions<
      ReturnType<APIFactory>[Key],
      MessagePortOptions
    >
    : never;
type APIWithExtraOptions<API, Extra> = (
  ...args: Parameters<API> extends never[] ? []
    : Parameters<API> extends
      [options?: infer Options | undefined, ...end: never[]]
      ? [options?: (Options & Extra) | undefined]
    : Parameters<API> extends
      [a1: infer A1, options?: infer Options_1 | undefined, ...end: never[]]
      ? [a1: A1, options?: (Options_1 & Extra) | undefined]
    : Parameters<API> extends [
      a1?: infer A1_1 | undefined,
      options?: infer Options_2 | undefined,
      ...end: never[],
    ] ? [a1?: A1_1 | undefined, options?: (Options_2 & Extra) | undefined]
    : Parameters<API> extends [
      a1: infer A1_2,
      a2: infer A2,
      options?: infer Options_3 | undefined,
      ...end: never[],
    ] ? [a1: A1_2, a2: A2, options?: (Options_3 & Extra) | undefined]
    : Parameters<API> extends [
      a1: infer A1_3,
      a2?: infer A2_1 | undefined,
      options?: infer Options_4 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_3,
      a2?: A2_1 | undefined,
      options?: (Options_4 & Extra) | undefined,
    ]
    : Parameters<API> extends [
      a1?: infer A1_4 | undefined,
      a2?: infer A2_2 | undefined,
      options?: infer Options_5 | undefined,
      ...end: never[],
    ] ? [
      a1?: A1_4 | undefined,
      a2?: A2_2 | undefined,
      options?: (Options_5 & Extra) | undefined,
    ]
    : Parameters<API> extends [
      a1: infer A1_5,
      a2: infer A2_3,
      a3: infer A3,
      options?: infer Options_6 | undefined,
      ...end: never[],
    ] ? [a1: A1_5, a2: A2_3, a3: A3, options?: (Options_6 & Extra) | undefined]
    : Parameters<API> extends [
      a1: infer A1_6,
      a2: infer A2_4,
      a3?: infer A3_1 | undefined,
      options?: infer Options_7 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_6,
      a2: A2_4,
      a3?: A3_1 | undefined,
      options?: (Options_7 & Extra) | undefined,
    ]
    : Parameters<API> extends [
      a1: infer A1_7,
      a2?: infer A2_5 | undefined,
      a3?: infer A3_2 | undefined,
      options?: infer Options_8 | undefined,
      ...end: never[],
    ] ? [
      a1: A1_7,
      a2?: A2_5 | undefined,
      a3?: A3_2 | undefined,
      options?: (Options_8 & Extra) | undefined,
    ]
    : Parameters<API> extends [
      a1?: infer A1_8 | undefined,
      a2?: infer A2_6 | undefined,
      a3?: infer A3_3 | undefined,
      options?: infer Options_9 | undefined,
      ...end: never[],
    ] ? [
      a1?: A1_8 | undefined,
      a2?: A2_6 | undefined,
      a3?: A3_3 | undefined,
      options?: (Options_9 & Extra) | undefined,
    ]
    : never
) => ReturnType<API>;
//# sourceMappingURL=index.d.ts.map
