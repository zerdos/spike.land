export = Client;
declare class Client<T> {
    /**
     * @param {string} namespace
     * @param {ProcedureNames<T>} methods
     * @param {MessageTransport} transport
     */
    constructor(namespace: string, methods: ProcedureNames<T>, transport: MessageTransport);
    /** @type {RemoteService<T>} */
    remote: RemoteService<T>;
}
declare namespace Client {
    export { Remote, ProcedureNames, Keys, RemoteService, MessageTransport };
}
type RemoteService<T_1> = import("ipfs-message-port-protocol/src/rpc").Remote<T_1> & import("./client/service")<T_1>;
type ProcedureNames<T_1> = { [K in keyof T_1]-?: import("ipfs-message-port-protocol/src/rpc").NonUndefined<T_1[K]> extends Function ? K : never; }[keyof T_1][];
type MessageTransport = import("./client/transport");
type Remote<T_1> = { [K in keyof T_1]: import("ipfs-message-port-protocol/src/rpc").Procedure<T_1[K]>; };
type Keys<T_1> = (keyof T_1)[];
//# sourceMappingURL=client.d.ts.map