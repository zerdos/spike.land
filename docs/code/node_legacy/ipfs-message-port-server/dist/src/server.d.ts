export var Query: {
    new <T>(namespace: Namespace<T>, method: Method<T>, input: Inn<T>): {
        result: Promise<any>;
        succeed: (value?: any) => void;
        fail: (reason?: any) => void;
        namespace: import("ipfs-message-port-protocol/src/rpc").Namespace<T>;
        method: import("ipfs-message-port-protocol/src/rpc").Method<T>;
        input: import("ipfs-message-port-protocol/src/rpc").Inn<T>;
        abortController: AbortController;
        signal: AbortSignal;
        /**
         * Aborts this query if it is still pending.
         */
        abort(): void;
    };
};
export var UnsupportedMessageError: {
    new (event: MessageEvent): {
        event: MessageEvent<any>;
        readonly name: string;
        message: string;
        stack?: string | undefined;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
    prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
    stackTraceLimit: number;
};
export var AbortError: {
    new (message?: string | undefined): {
        readonly name: string;
        message: string;
        stack?: string | undefined;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
    prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
    stackTraceLimit: number;
};
export type EncodedError = {
    message: string;
    name: string;
    stack: string;
};
export type Result<X, T_1> = {
    ok: true;
    value: T_1;
} | {
    ok: false;
    error: X;
};
export type ProcedureNames<T_1> = { [K in keyof T_1]-?: import("ipfs-message-port-protocol/src/rpc").NonUndefined<T_1[K]> extends Function ? K : never; }[keyof T_1][];
export type Method<T_1> = import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
    namespace: NS;
    method: M;
    input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
    result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
     * @param {Namespace<T>} namespace
     * @param {Method<T>} method
     * @param {Inn<T>} input
     */
} & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["method"];
export type Namespace<T_1> = import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
    namespace: NS;
    method: M;
    input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
    result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
     * @param {Namespace<T>} namespace
     * @param {Method<T>} method
     * @param {Inn<T>} input
     */
} & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["namespace"];
export type ServiceQuery<T_1> = { [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
    namespace: NS;
    method: M;
    input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
    result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
     * @param {Namespace<T>} namespace
     * @param {Method<T>} method
     * @param {Inn<T>} input
     */
} & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }[keyof T_1];
export type RPCQuery<T_1> = {
    input: import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
        namespace: NS;
        method: M;
        input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
        result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
         * @param {Namespace<T>} namespace
         * @param {Method<T>} method
         * @param {Inn<T>} input
         */
    } & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["input"];
    timeout?: import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
        namespace: NS;
        method: M;
        input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
        result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
         * @param {Namespace<T>} namespace
         * @param {Method<T>} method
         * @param {Inn<T>} input
         */
    } & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["timeout"] | undefined;
    signal?: import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
        namespace: NS;
        method: M;
        input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
        result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
         * @param {Namespace<T>} namespace
         * @param {Method<T>} method
         * @param {Inn<T>} input
         */
    } & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["signal"] | undefined;
    method: import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
        namespace: NS;
        method: M;
        input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
        result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
         * @param {Namespace<T>} namespace
         * @param {Method<T>} method
         * @param {Inn<T>} input
         */
    } & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["method"];
    namespace: import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
        namespace: NS;
        method: M;
        input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
        result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
         * @param {Namespace<T>} namespace
         * @param {Method<T>} method
         * @param {Inn<T>} input
         */
    } & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["namespace"];
};
export type Inn<T_1> = import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
    namespace: NS;
    method: M;
    input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
    result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
     * @param {Namespace<T>} namespace
     * @param {Method<T>} method
     * @param {Inn<T>} input
     */
} & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["input"];
export type Out<T_1> = import("ipfs-message-port-protocol/src/rpc").Values<{ [NS in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Values<{ [M in keyof T_1[NS]]-?: T_1[NS][M] extends (input: infer I) => infer O ? {
    namespace: NS;
    method: M;
    input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
    result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
     * @param {Namespace<T>} namespace
     * @param {Method<T>} method
     * @param {Inn<T>} input
     */
} & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }>; }>["result"];
export type QueryMessage<T_1> = {
    type: 'query';
    namespace: import("ipfs-message-port-protocol/src/rpc").Namespace<T_1>;
    method: import("ipfs-message-port-protocol/src/rpc").Method<T_1>;
    id: string;
    input: import("ipfs-message-port-protocol/src/rpc").Inn<T_1>;
};
export type AbortMessage = {
    type: 'abort';
    id: string;
};
export type TransferOptions = {
    transfer?: Transferable[] | undefined;
};
export type QueryResult<O> = O & TransferOptions;
export type Message<T_1> = AbortMessage | QueryMessage<T_1>;
export type NamespacedQuery<T_1, K> = { [M in keyof T_1]-?: T_1[M] extends (input: infer I) => infer O ? {
    namespace: K;
    method: M;
    input: I & import("ipfs-message-port-protocol/src/rpc").QueryOptions;
    result: O extends Promise<infer T_2> ? Promise<T_2 extends Record<string, unknown> ? T_2 & import("ipfs-message-port-protocol/src/rpc").TransferOptions : T_2> : Promise<O extends Record<string, unknown> ? O & import("ipfs-message-port-protocol/src/rpc").TransferOptions : O>; /**
     * @param {Namespace<T>} namespace
     * @param {Method<T>} method
     * @param {Inn<T>} input
     */
} & import("ipfs-message-port-protocol/src/rpc").QueryOptions : never; }[keyof T_1];
export type MultiService<T_1> = { [NS in keyof T_1]: { [M in keyof T_1[NS]]: import("ipfs-message-port-protocol/src/rpc").NamespacedMethod<NS, T_1[NS], T_1[NS][M]>; }; };
export class Server<T> {
    /**
     * @param {MultiService<T>} services
     */
    constructor(services: MultiService<T>);
    services: import("ipfs-message-port-protocol/src/rpc").MultiService<T>;
    /** @type {Record<string, Query<T>>} */
    queries: Record<string, {
        result: Promise<any>;
        succeed: (value?: any) => void;
        fail: (reason?: any) => void;
        namespace: import("ipfs-message-port-protocol/src/rpc").Namespace<T>;
        method: import("ipfs-message-port-protocol/src/rpc").Method<T>;
        input: import("ipfs-message-port-protocol/src/rpc").Inn<T>;
        abortController: AbortController;
        signal: AbortSignal;
        /**
         * Aborts this query if it is still pending.
         */
        abort(): void;
    }>;
    /**
     * @param {MessagePort} port
     */
    connect(port: MessagePort): void;
    /**
     * @param {MessagePort} port
     */
    disconnect(port: MessagePort): void;
    /**
     * Handles messages received from connected clients
     *
     * @param {MessageEvent} event
     * @returns {void}
     */
    handleEvent(event: MessageEvent): void;
    /**
     * Abort query for the given id.
     *
     * @param {string} id
     */
    abort(id: string): void;
    /**
     * Handles query received from the client.
     *
     * @param {string} id
     * @param {Query<T>} query
     * @param {MessagePort} port
     */
    handleQuery(id: string, query: {
        result: Promise<any>;
        succeed: (value?: any) => void;
        fail: (reason?: any) => void;
        namespace: import("ipfs-message-port-protocol/src/rpc").Namespace<T>;
        method: import("ipfs-message-port-protocol/src/rpc").Method<T>;
        input: import("ipfs-message-port-protocol/src/rpc").Inn<T>;
        abortController: AbortController;
        signal: AbortSignal;
        /**
         * Aborts this query if it is still pending.
         */
        abort(): void;
    }, port: MessagePort): Promise<void>;
    /**
     * @param {Query<T>} query
     * @returns {void}
     */
    run(query: {
        result: Promise<any>;
        succeed: (value?: any) => void;
        fail: (reason?: any) => void;
        namespace: import("ipfs-message-port-protocol/src/rpc").Namespace<T>;
        method: import("ipfs-message-port-protocol/src/rpc").Method<T>;
        input: import("ipfs-message-port-protocol/src/rpc").Inn<T>;
        abortController: AbortController;
        signal: AbortSignal;
        /**
         * Aborts this query if it is still pending.
         */
        abort(): void;
    }): void;
    /**
     * @param {RPCQuery<T>} data
     * @returns {Out<T>}
     */
    execute(data: RPCQuery<T>): Out<T>;
}
//# sourceMappingURL=server.d.ts.map