export = Query;
declare class Query<I, O> {
  /**
     * @param {string} namespace - component namespace on the server.
     * @param {string} method - remote method this is a query of.
     * @param {QueryInput<I>} input - query input.
     */
  constructor(namespace: string, method: string, input: QueryInput<I>);
  /** @type {Promise<O>} */
  result: Promise<O>;
  succeed: (value?: O | PromiseLike<O> | undefined) => void;
  fail: (reason?: any) => void;
  signal: AbortSignal | undefined;
  input: I & QueryOptions;
  namespace: string;
  method: string;
  timeout: number;
  /** @type {number|null} */
  timerID: number | null;
  /**
     * Data that will be structure cloned over message channel.
     *
     * @returns {Object}
     */
  toJSON(): any;
  /**
     * Data that will be transferred over message channel.
     *
     * @returns {Transferable[]|void}
     */
  transfer(): Transferable[] | void;
}
declare namespace Query {
  export { QueryInput, QueryOptions };
}
type QueryOptions = {
  signal?: AbortSignal | undefined;
  timeout?: number | undefined;
  transfer?: Transferable[] | undefined;
};
type QueryInput<I_1> = I_1 & QueryOptions;
//# sourceMappingURL=query.d.ts.map
