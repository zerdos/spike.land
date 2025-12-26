/**
 * LRU Cache Type Definitions
 * All interfaces, types, and type aliases used by the LRU Cache implementation.
 */

const TYPE = Symbol("type");

export type PosInt = number & { [TYPE]: "Positive Integer" };
export type Index = number & { [TYPE]: "LRUCache Index" };

export type UintArray = Uint8Array | Uint16Array | Uint32Array;
export type NumberArray = UintArray | number[];

export type LRUCacheSize = number;
export type LRUCacheMilliseconds = number;
export type LRUCacheCount = number;

export type LRUCacheDisposeReason =
  | "evict"
  | "set"
  | "delete"
  | "expire"
  | "fetch";

export type LRUCacheDisposer<K, V> = (
  value: V,
  key: K,
  reason: LRUCacheDisposeReason,
) => void;

export type LRUCacheInsertReason = "add" | "update" | "replace";

export type LRUCacheInserter<K, V> = (
  value: V,
  key: K,
  reason: LRUCacheInsertReason,
) => void;

export type LRUCacheSizeCalculator<K, V> = (value: V, key: K) => LRUCacheSize;

/**
 * Promise representing an in-progress fetch call
 */
export type BackgroundFetch<V> = Promise<V | undefined> & {
  __returned: BackgroundFetch<V> | undefined;
  __abortController: AbortController;
  __staleWhileFetching: V | undefined;
};

export type DisposeTask<K, V> = [
  value: V,
  key: K,
  reason: LRUCacheDisposeReason,
];

export interface LRUCacheFetcherOptions<K, V, FC = unknown> {
  signal: AbortSignal;
  options: LRUCacheFetcherFetchOptions<K, V, FC>;
  context: FC;
}

export interface LRUCacheStatus<V> {
  set?: "add" | "update" | "replace" | "miss";
  ttl?: LRUCacheMilliseconds;
  start?: LRUCacheMilliseconds;
  now?: LRUCacheMilliseconds;
  remainingTTL?: LRUCacheMilliseconds;
  entrySize?: LRUCacheSize;
  totalCalculatedSize?: LRUCacheSize;
  maxEntrySizeExceeded?: true;
  oldValue?: V;
  has?: "hit" | "stale" | "miss";
  fetch?: "get" | "inflight" | "miss" | "hit" | "stale" | "refresh";
  fetchDispatched?: true;
  fetchUpdated?: true;
  fetchError?: Error;
  fetchAborted?: true;
  fetchAbortIgnored?: true;
  fetchResolved?: true;
  fetchRejected?: true;
  get?: "stale" | "hit" | "miss";
  returnedStale?: true;
}

export interface LRUCacheFetcherFetchOptions<K, V, FC = unknown>
  extends
    Pick<
      LRUCacheOptionsBase<K, V, FC>,
      | "allowStale"
      | "updateAgeOnGet"
      | "noDeleteOnStaleGet"
      | "sizeCalculation"
      | "ttl"
      | "noDisposeOnSet"
      | "noUpdateTTL"
      | "noDeleteOnFetchRejection"
      | "allowStaleOnFetchRejection"
      | "ignoreFetchAbort"
      | "allowStaleOnFetchAbort"
    > {
  status?: LRUCacheStatus<V>;
  size?: LRUCacheSize;
}

export interface LRUCacheFetchOptions<K, V, FC> extends LRUCacheFetcherFetchOptions<K, V, FC> {
  forceRefresh?: boolean;
  context?: FC;
  signal?: AbortSignal;
  status?: LRUCacheStatus<V>;
}

export interface LRUCacheFetchOptionsWithContext<K, V, FC> extends LRUCacheFetchOptions<K, V, FC> {
  context: FC;
}

export interface LRUCacheFetchOptionsNoContext<K, V> extends LRUCacheFetchOptions<K, V, undefined> {
  context?: undefined;
}

export interface LRUCacheMemoOptions<K, V, FC = unknown>
  extends
    Pick<
      LRUCacheOptionsBase<K, V, FC>,
      | "allowStale"
      | "updateAgeOnGet"
      | "noDeleteOnStaleGet"
      | "sizeCalculation"
      | "ttl"
      | "noDisposeOnSet"
      | "noUpdateTTL"
      | "noDeleteOnFetchRejection"
      | "allowStaleOnFetchRejection"
      | "ignoreFetchAbort"
      | "allowStaleOnFetchAbort"
    > {
  forceRefresh?: boolean;
  context?: FC;
  status?: LRUCacheStatus<V>;
}

export interface LRUCacheMemoOptionsWithContext<K, V, FC> extends LRUCacheMemoOptions<K, V, FC> {
  context: FC;
}

export interface LRUCacheMemoOptionsNoContext<K, V> extends LRUCacheMemoOptions<K, V, undefined> {
  context?: undefined;
}

export interface LRUCacheMemoizerOptions<K, V, FC = unknown> {
  options: LRUCacheMemoizerMemoOptions<K, V, FC>;
  context: FC;
}

export interface LRUCacheMemoizerMemoOptions<K, V, FC = unknown>
  extends
    Pick<
      LRUCacheOptionsBase<K, V, FC>,
      | "allowStale"
      | "updateAgeOnGet"
      | "noDeleteOnStaleGet"
      | "sizeCalculation"
      | "ttl"
      | "noDisposeOnSet"
      | "noUpdateTTL"
    > {
  status?: LRUCacheStatus<V>;
  size?: LRUCacheSize;
  start?: LRUCacheMilliseconds;
}

export interface LRUCacheHasOptions<K, V, FC>
  extends Pick<LRUCacheOptionsBase<K, V, FC>, "updateAgeOnHas"> {
  status?: LRUCacheStatus<V>;
}

export interface LRUCacheGetOptions<K, V, FC>
  extends
    Pick<
      LRUCacheOptionsBase<K, V, FC>,
      "allowStale" | "updateAgeOnGet" | "noDeleteOnStaleGet"
    > {
  status?: LRUCacheStatus<V>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Intentionally an empty interface for type clarity/extension
export interface LRUCachePeekOptions<K, V, FC>
  extends Pick<LRUCacheOptionsBase<K, V, FC>, "allowStale"> {}

export interface LRUCacheSetOptions<K, V, FC>
  extends
    Pick<
      LRUCacheOptionsBase<K, V, FC>,
      "sizeCalculation" | "ttl" | "noDisposeOnSet" | "noUpdateTTL"
    > {
  size?: LRUCacheSize;
  start?: LRUCacheMilliseconds;
  status?: LRUCacheStatus<V>;
}

export type LRUCacheFetcher<K, V, FC = unknown> = (
  key: K,
  staleValue: V | undefined,
  options: LRUCacheFetcherOptions<K, V, FC>,
) => Promise<V | undefined | void> | V | undefined | void;

export type LRUCacheMemoizer<K, V, FC = unknown> = (
  key: K,
  staleValue: V | undefined,
  options: LRUCacheMemoizerOptions<K, V, FC>,
) => V;

export interface LRUCacheOptionsBase<K, V, FC> {
  max?: LRUCacheCount;
  ttl?: LRUCacheMilliseconds;
  ttlResolution?: LRUCacheMilliseconds;
  ttlAutopurge?: boolean;
  updateAgeOnGet?: boolean;
  updateAgeOnHas?: boolean;
  allowStale?: boolean;
  dispose?: LRUCacheDisposer<K, V>;
  onInsert?: LRUCacheInserter<K, V>;
  disposeAfter?: LRUCacheDisposer<K, V>;
  noDisposeOnSet?: boolean;
  noUpdateTTL?: boolean;
  maxSize?: LRUCacheSize;
  maxEntrySize?: LRUCacheSize;
  sizeCalculation?: LRUCacheSizeCalculator<K, V>;
  fetchMethod?: LRUCacheFetcher<K, V, FC>;
  memoMethod?: LRUCacheMemoizer<K, V, FC>;
  noDeleteOnFetchRejection?: boolean;
  noDeleteOnStaleGet?: boolean;
  allowStaleOnFetchRejection?: boolean;
  allowStaleOnFetchAbort?: boolean;
  ignoreFetchAbort?: boolean;
}

export interface LRUCacheOptionsMaxLimit<K, V, FC> extends LRUCacheOptionsBase<K, V, FC> {
  max: LRUCacheCount;
}

export interface LRUCacheOptionsTTLLimit<K, V, FC> extends LRUCacheOptionsBase<K, V, FC> {
  ttl: LRUCacheMilliseconds;
  ttlAutopurge: boolean;
}

export interface LRUCacheOptionsSizeLimit<K, V, FC> extends LRUCacheOptionsBase<K, V, FC> {
  maxSize: LRUCacheSize;
}

export type LRUCacheOptions<K, V, FC> =
  | LRUCacheOptionsMaxLimit<K, V, FC>
  | LRUCacheOptionsSizeLimit<K, V, FC>
  | LRUCacheOptionsTTLLimit<K, V, FC>;

export interface LRUCacheEntry<V> {
  value: V;
  ttl?: LRUCacheMilliseconds;
  size?: LRUCacheSize;
  start?: LRUCacheMilliseconds;
}
