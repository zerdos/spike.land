export declare type Procedure<T> = T extends (arg: infer I) => infer O
  ? (query: I & QueryOptions) => Return<O>
  : void;
export declare type Remote<T extends Record<string, unknown>> = {
  [K in keyof T]: Procedure<T[K]>;
};
declare type Return<T> = T extends Promise<infer U>
  ? Promise<U & TransferOptions>
  : Promise<T & TransferOptions>;
export declare type QueryOptions = {
  signal?: AbortSignal;
  timeout?: number;
  transfer?: Transferable[];
};
export declare type TransferOptions = {
  transfer?: Transferable[];
};
export declare type NonUndefined<A> = A extends undefined ? never : A;
export declare type ProcedureNames<T extends Record<string, unknown>> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T][];
/**
 * Any method name of the associated with RPC service.
 */
export declare type Method<T extends Record<string, unknown>> = ServiceQuery<
  T
>["method"];
/**
 * Namespace of the RCP service
 */
export declare type Namespace<T extends Record<string, unknown>> = ServiceQuery<
  T
>["namespace"];
export declare type Values<T extends Record<string, unknown>> = T[keyof T];
export declare type Keys<T extends Record<string, unknown>> = keyof T;
export declare type Inn<T extends Record<string, unknown>> = ServiceQuery<
  T
>["input"];
export declare type Out<T extends Record<string, unknown>> = ServiceQuery<
  T
>["result"];
export declare type RPCQuery<T extends Record<string, unknown>> = Pick<
  ServiceQuery<T>,
  "method" | "namespace" | "input" | "timeout" | "signal"
>;
export declare type ServiceQuery<T> = Values<
  {
    [NS in keyof T]: NamespacedQuery<T[NS], NS>;
  }
>;
export declare type NamespacedQuery<S, NS> = Values<
  {
    [M in keyof S]-?: S[M] extends (input: infer I) => infer O ? {
      namespace: NS;
      method: M;
      input: I & QueryOptions;
      result: R<O>;
    } & QueryOptions
      : never;
  }
>;
declare type R<O> = O extends Promise<infer T> ? Promise<WithTransferOptions<T>>
  : Promise<WithTransferOptions<O>>;
declare type WithTransferOptions<O> = O extends Record<string, unknown>
  ? O & TransferOptions
  : O;
export declare type MultiService<T> = {
  [NS in keyof T]: NamespacedService<NS, T[NS]>;
};
declare type NamespacedService<NS, S> = {
  [M in keyof S]: NamespacedMethod<NS, S, S[M]>;
};
export declare type NamespacedMethod<NS, M, T> = T extends
  (arg: infer I) => infer O ? (query: I & QueryOptions) => Return<O> : never;
export {};
//# sourceMappingURL=rpc.d.ts.map
