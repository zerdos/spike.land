/**
 * @template T
 * @typedef {Object} RemoteIterable
 * @property {'RemoteIterable'} type
 * @property {MessagePort} port
 */
/**
 * @typedef {Object} RemoteCallback
 * @property {'RemoteCallback'} type
 * @property {MessagePort} port
 */
/**
 * @template T
 * @typedef {Object} RemoteYield
 * @property {false} done
 * @property {T} value
 * @property {void} error
 */
/**
 * @template T
 * @typedef {Object} RemoteDone
 * @property {true} done
 * @property {T|void} value
 * @property {void} error
 */
/**
 * @typedef {import('./error').EncodedError} EncodedError
 * @typedef {Object} RemoteError
 * @property {true} done
 * @property {void} value
 * @property {EncodedError} error
 */
/**
 * @template T
 * @typedef {RemoteYield<T>|RemoteDone<T>|RemoteError} RemoteNext
 */
/**
 * @template I, O
 * @param {RemoteIterable<I>} remote
 * @param {function(I):O} decode
 * @returns {AsyncIterable<O>}
 */
export function decodeIterable<I, O>({ port }: RemoteIterable<I>, decode: (arg0: I) => O): AsyncIterable<O>;
/**
 * @template I,O
 * @param {AsyncIterable<I>|Iterable<I>} iterable
 * @param {function(I, Transferable[]):O} encode
 * @param {Transferable[]} transfer
 * @returns {RemoteIterable<O>}
 */
export function encodeIterable<I, O>(iterable: AsyncIterable<I> | Iterable<I>, encode: (arg0: I, arg1: Transferable[]) => O, transfer: Transferable[]): RemoteIterable<O>;
/**
 * @param {Function} callback
 * @param {Transferable[]} transfer
 * @returns {RemoteCallback}
 */
export function encodeCallback(callback: Function, transfer: Transferable[]): RemoteCallback;
/**
 * @template T
 * @param {RemoteCallback} remote
 * @returns {function(T[]):void | function(T[], Transferable[]):void}
 */
export function decodeCallback<T>({ port }: RemoteCallback): (arg0: T[]) => void | ((arg0: T[], arg1: Transferable[]) => void);
export type RemoteIterable<T> = {
    type: 'RemoteIterable';
    port: MessagePort;
};
export type RemoteCallback = {
    type: 'RemoteCallback';
    port: MessagePort;
};
export type RemoteYield<T> = {
    done: false;
    value: T;
    error: void;
};
export type RemoteDone<T> = {
    done: true;
    value: void | T;
    error: void;
};
export type EncodedError = Error | import("./error").ErrorData;
export type RemoteError = {
    done: true;
    value: void;
    error: EncodedError;
};
export type RemoteNext<T> = RemoteYield<T> | RemoteDone<T> | RemoteError;
//# sourceMappingURL=core.d.ts.map