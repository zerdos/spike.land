/**
 * @typedef {import('./data').JSONValue} JSONValue
 */
/**
 * @template T
 * @typedef {import('./data').StringEncoded<T>} StringEncoded
 */
/**
 * @typedef {Object} EncodedCID
 * @property {string} codec
 * @property {Uint8Array} multihash
 * @property {number} version
 * @typedef {JSONValue} DAGNode
 *
 * @typedef {Object} EncodedDAGNode
 * @property {DAGNode} dagNode
 * @property {CID[]} cids
 */
/**
 * @param {EncodedDAGNode} encodedNode
 * @returns {DAGNode}
 */
export function decodeNode({ dagNode, cids }: EncodedDAGNode): DAGNode;
/**
 * Encodes DAG node for over the message channel transfer by collecting all
 * the CID instances into an array so they could be turned back into CIDs
 * without traversal on the other end.
 *
 * If `transfer` array is provided all the encountered `ArrayBuffer`s within
 * this node will be added to transfer so they are moved across without copy.
 *
 * @param {DAGNode} dagNode
 * @param {Transferable[]} [transfer]
 * @returns {EncodedDAGNode}
 */
export function encodeNode(
  dagNode: DAGNode,
  transfer?: Transferable[] | undefined,
): EncodedDAGNode;
export type JSONValue =
  | string
  | number
  | boolean
  | import("./data").JSONArray
  | import("./data").JSONObject
  | null;
export type StringEncoded<T> = string;
export type EncodedCID = {
  codec: string;
  multihash: Uint8Array;
  version: number;
};
export type DAGNode =
  | string
  | number
  | boolean
  | import("./data").JSONArray
  | import("./data").JSONObject
  | null;
export type EncodedDAGNode = {
  dagNode: DAGNode;
  cids: import("cids")[];
};
//# sourceMappingURL=dag.d.ts.map
