/**
 * Stack implementation for LRU Cache free list management.
 * Uses typed arrays for memory-efficient storage.
 */

import type { Index, NumberArray, PosInt, UintArray } from "./types";

class ZeroArray extends Array<number> {
  constructor(size: number) {
    super(size);
    this.fill(0);
  }
}

const isPosInt = (n: unknown): n is PosInt =>
  typeof n === "number" && n === Math.floor(n) && n > 0 && isFinite(n);

const getUintArray = (max: number): (new(n: number) => NumberArray) | null =>
  !isPosInt(max)
    ? null
    : max <= Math.pow(2, 8)
      ? Uint8Array
      : max <= Math.pow(2, 16)
        ? Uint16Array
        : max <= Math.pow(2, 32)
          ? Uint32Array
          : max <= Number.MAX_SAFE_INTEGER
            ? ZeroArray
            : null;

export type StackLike = Stack | Index[];

export class Stack {
  heap: NumberArray;
  length = 0;
  static #constructing = false;

  static create(max: number): StackLike {
    const HeapCls = getUintArray(max);
    if (!HeapCls) return [];
    Stack.#constructing = true;
    const s = new Stack(max, HeapCls);
    Stack.#constructing = false;
    return s;
  }

  constructor(
    max: number,
    HeapCls: new(n: number) => NumberArray,
  ) {
    /* c8 ignore start */
    if (!Stack.#constructing) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    /* c8 ignore stop */
    this.heap = new HeapCls(max);
  }

  push(n: Index) {
    this.heap[this.length++] = n;
  }

  pop(): Index {
    return this.heap[--this.length] as Index;
  }
}

export { ZeroArray, isPosInt, getUintArray };
export type { UintArray };
