/**
 * Utility functions and constants for LRU Cache.
 * Includes performance timing, warning system, and validation helpers.
 */

import type { PosInt } from "./types";

// Performance timing abstraction
type Perf = { now: () => number };

export const perf: Perf = typeof performance === "object" &&
    performance &&
    typeof performance.now === "function"
  ? performance
  : { now: () => Date.now() };

// Warning deduplication
const warned = new Set<string>();

export const emitSimplifiedWarning = (message: string, code: string) => {
  if (!warned.has(code)) {
    console.warn(`[LRUCache:${code}] ${message}`);
    warned.add(code);
  }
};

// Validation helper
export const isPosInt = (n: unknown): n is PosInt =>
  typeof n === "number" && n === Math.floor(n) && n > 0 && isFinite(n);
