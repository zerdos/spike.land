export = Service;
declare class Service<T> {
  /**
     * @param {string} namespace - Namespace that remote API is served under.
     * @param {ProcedureNames<T>} methods - Method names of the remote API.
     * @param {MessageTransport} transport - Transport to issue queries over.
     */
  constructor(
    namespace: string,
    methods: ProcedureNames<T>,
    transport: MessageTransport,
  );
  transport: import("./transport");
}
declare namespace Service {
  export { MessageTransport, ProcedureNames };
}
type ProcedureNames<T_1> = {
  [K in keyof T_1]-?:
    import("ipfs-message-port-protocol/src/rpc").NonUndefined<T_1[K]> extends
      Function ? K : never;
}[keyof T_1][];
type MessageTransport = import("./transport");
//# sourceMappingURL=service.d.ts.map
