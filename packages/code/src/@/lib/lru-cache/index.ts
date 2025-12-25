/**
 * LRU Cache - A high-performance Least Recently Used cache implementation.
 *
 * This module re-exports the LRUCache class and all associated types to maintain
 * backward compatibility with existing imports from '@/lib/lru-cache'.
 */

// Import LRUCache for default export
import { LRUCache } from "./core";

// Re-export the main LRUCache class
export { LRUCache } from "./core";
export default LRUCache;

// Re-export all types
export type {
  BackgroundFetch,
  DisposeTask,
  Index,
  LRUCacheCount,
  LRUCacheDisposer,
  LRUCacheDisposeReason,
  LRUCacheEntry,
  LRUCacheFetcher,
  LRUCacheFetcherFetchOptions,
  LRUCacheFetcherOptions,
  LRUCacheFetchOptions,
  LRUCacheFetchOptionsNoContext,
  LRUCacheFetchOptionsWithContext,
  LRUCacheGetOptions,
  LRUCacheHasOptions,
  LRUCacheInserter,
  LRUCacheInsertReason,
  LRUCacheMemoizer,
  LRUCacheMemoizerMemoOptions,
  LRUCacheMemoizerOptions,
  LRUCacheMemoOptions,
  LRUCacheMemoOptionsNoContext,
  LRUCacheMemoOptionsWithContext,
  LRUCacheMilliseconds,
  LRUCacheOptions,
  LRUCacheOptionsBase,
  LRUCacheOptionsMaxLimit,
  LRUCacheOptionsSizeLimit,
  LRUCacheOptionsTTLLimit,
  LRUCachePeekOptions,
  LRUCacheSetOptions,
  LRUCacheSize,
  LRUCacheSizeCalculator,
  LRUCacheStatus,
  NumberArray,
  PosInt,
  UintArray,
} from "./types";

// Re-export Stack-related types for advanced usage
export type { StackLike } from "./stack";
