export = MessageTransport;
declare class MessageTransport {
    /**
     * Invoked on query timeout. If query is still pending it will fail and
     * abort message will be send to a the server.
     *
     * @param {MessageTransport} self
     * @param {string} id
     */
    static timeout(self: MessageTransport, id: string): void;
    /**
     * Sends a given `query` with a given `id` over the message channel.
     *
     * @param {MessagePort} port
     * @param {string} id
     * @param {Query<any, any>} query
     */
    static postQuery(port: MessagePort, id: string, query: Query<any, any>): void;
    /**
     * Create transport for the underlying message port.
     *
     * @param {MessagePort} [port]
     */
    constructor(port?: MessagePort | undefined);
    port: MessagePort | null;
    id: string;
    nextID: number;
    /** @type {Record<string, Query<any, any>>} */
    queries: Record<string, Query<any, any>>;
    /**
     * Executes given query with this transport and returns promise for it's
     * result. Promise fails with an error if query fails.
     *
     * @template I, O
     * @param {Query<I, O>} query
     * @returns {Promise<O>}
     */
    execute<I, O>(query: import("./query")<I, O>): Promise<O>;
    /**
     * Connects this transport to the given message port. Throws `Error` if
     * transport is already connected. All the pending queries will be executed
     * as connection occurs.
     *
     * @param {MessagePort} port
     */
    connect(port: MessagePort): void;
    /**
     * Disconnects this transport. This will cause all the pending queries
     * to be aborted and undelying message port to be closed.
     *
     * Once disconnected transport can not be reconnected back.
     */
    disconnect(): void;
    /**
     * Aborts this query by failing with `AbortError` and sending an abort message
     * to the server. If query is no longer pending this has no effect.
     *
     * @param {string} id
     */
    abort(id: string): void;
    /**
     * Handler is invoked when message on the message port is received.
     *
     * @param {MessageEvent} event
     */
    handleEvent(event: MessageEvent): void;
}
declare namespace MessageTransport {
    export { Query };
}
type Query<I, O> = import("./query")<I, O>;
//# sourceMappingURL=transport.d.ts.map