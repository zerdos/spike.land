// module-private names and types
type Perf = { now: () => number; };
const perf: Perf = typeof performance === "object" &&
    performance &&
    typeof performance.now === "function"
  ? performance
  : { now: () => Date.now() };

const warned = new Set<string>();

const emitSimplifiedWarning = (message: string, code: string) => {
  if (!warned.has(code)) {
    console.warn(`[LRUCache:${code}] ${message}`);
    warned.add(code);
  }
};

let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;

/* c8 ignore start */
if (typeof AC === "undefined") {
  // @ts-expect-error Polyfill for environments without AbortSignal
  AS = class AbortSignal {
    onabort?: (...a: unknown[]) => unknown;
    _onabort: Array<(...a: unknown[]) => unknown> = [];
    reason?: unknown;
    aborted = false;
    addEventListener(_: string, fn: (...a: unknown[]) => unknown) {
      this._onabort.push(fn);
    }
  };
  AC = class AbortController {
    signal: InstanceType<typeof AS>;
    constructor() {
      this.signal = new AS() as InstanceType<typeof AS>;
      emitSimplifiedWarning(
        "AbortController is not defined. A minimal polyfill is provided for use by LRUCache.fetch(). " +
          "This polyfill may not be fully spec-compliant. " +
          "If using in an environment without native AbortController, consider a full polyfill for broader compatibility.",
        "NO_ABORT_CONTROLLER",
      );
    }
    abort(reason: unknown) {
      const signal = this.signal as any;
      if (signal.aborted) return;
      signal.reason = reason;
      signal.aborted = true;
      for (const fn of signal._onabort) {
        fn(reason);
      }
      if (typeof signal.onabort === "function") {
        signal.onabort(reason);
      }
    }
  };
}
/* c8 ignore stop */

const TYPE = Symbol("type");
export type PosInt = number & { [TYPE]: "Positive Integer"; };
export type Index = number & { [TYPE]: "LRUCache Index"; };

const isPosInt = (n: unknown): n is PosInt =>
  typeof n === "number" && n === Math.floor(n) && n > 0 && isFinite(n);

export type UintArray = Uint8Array | Uint16Array | Uint32Array;
export type NumberArray = UintArray | number[];

/* c8 ignore start */
const getUintArray = (max: number) =>
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
/* c8 ignore stop */

class ZeroArray extends Array<number> {
  constructor(size: number) {
    super(size);
    this.fill(0);
  }
}

export type StackLike = Stack | Index[];
class Stack {
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

/**
 * Promise representing an in-progress {@link LRUCache#fetch} call
 */
export type BackgroundFetch<V> = Promise<V | undefined> & {
  __returned: BackgroundFetch<V> | undefined;
  __abortController: AbortController; // Will be the polyfilled or native version
  __staleWhileFetching: V | undefined;
};

export type DisposeTask<K, V> = [
  value: V,
  key: K,
  reason: LRUCacheDisposeReason,
];

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

export interface LRUCacheFetcherFetchOptions<K, V, FC = unknown> extends
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
  >
{
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

export interface LRUCacheMemoOptions<K, V, FC = unknown> extends
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
  >
{
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

export interface LRUCacheMemoizerMemoOptions<K, V, FC = unknown> extends
  Pick<
    LRUCacheOptionsBase<K, V, FC>,
    | "allowStale"
    | "updateAgeOnGet"
    | "noDeleteOnStaleGet"
    | "sizeCalculation"
    | "ttl"
    | "noDisposeOnSet"
    | "noUpdateTTL"
  >
{
  status?: LRUCacheStatus<V>;
  size?: LRUCacheSize;
  start?: LRUCacheMilliseconds;
}

export interface LRUCacheHasOptions<K, V, FC>
  extends Pick<LRUCacheOptionsBase<K, V, FC>, "updateAgeOnHas">
{
  status?: LRUCacheStatus<V>;
}

export interface LRUCacheGetOptions<K, V, FC> extends
  Pick<
    LRUCacheOptionsBase<K, V, FC>,
    "allowStale" | "updateAgeOnGet" | "noDeleteOnStaleGet"
  >
{
  status?: LRUCacheStatus<V>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Intentionally an empty interface for type clarity/extension
export interface LRUCachePeekOptions<K, V, FC>
  extends Pick<LRUCacheOptionsBase<K, V, FC>, "allowStale">
{}

export interface LRUCacheSetOptions<K, V, FC> extends
  Pick<
    LRUCacheOptionsBase<K, V, FC>,
    "sizeCalculation" | "ttl" | "noDisposeOnSet" | "noUpdateTTL"
  >
{
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

export class LRUCache<
  K extends object | string | number,
  V extends object,
  FC = unknown,
> {
  readonly #max: LRUCacheCount;
  readonly #maxSize: LRUCacheSize;
  readonly #dispose?: LRUCacheDisposer<K, V>;
  readonly #onInsert?: LRUCacheInserter<K, V>;
  readonly #disposeAfter?: LRUCacheDisposer<K, V>;
  readonly #fetchMethod?: LRUCacheFetcher<K, V, FC>;
  readonly #memoMethod?: LRUCacheMemoizer<K, V, FC>;

  ttl: LRUCacheMilliseconds;
  ttlResolution: LRUCacheMilliseconds;
  ttlAutopurge: boolean;
  updateAgeOnGet: boolean;
  updateAgeOnHas: boolean;
  allowStale: boolean;
  noDisposeOnSet: boolean;
  noUpdateTTL: boolean;
  maxEntrySize: LRUCacheSize;
  sizeCalculation?: LRUCacheSizeCalculator<K, V>;
  noDeleteOnFetchRejection: boolean;
  noDeleteOnStaleGet: boolean;
  allowStaleOnFetchAbort: boolean;
  allowStaleOnFetchRejection: boolean;
  ignoreFetchAbort: boolean;

  #size: LRUCacheCount;
  #calculatedSize: LRUCacheSize;
  #keyMap: Map<K, Index>;
  #keyList: Array<K | undefined>;
  #valList: Array<V | BackgroundFetch<V> | undefined>;
  #next: NumberArray;
  #prev: NumberArray;
  #head: Index;
  #tail: Index;
  #free: StackLike;
  #disposed?: Array<DisposeTask<K, V>>;
  #sizes?: ZeroArray;
  #starts?: ZeroArray;
  #ttls?: ZeroArray;

  #hasDispose: boolean;
  #hasFetchMethod: boolean;
  #hasDisposeAfter: boolean;
  #hasOnInsert: boolean;

  static unsafeExposeInternals<
    Ki extends object,
    Vi extends object,
    FCi = unknown,
  >(c: LRUCache<Ki, Vi, FCi>) {
    return {
      starts: c.#starts,
      ttls: c.#ttls,
      sizes: c.#sizes,
      keyMap: c.#keyMap as Map<Ki, number>,
      keyList: c.#keyList,
      valList: c.#valList,
      next: c.#next,
      prev: c.#prev,
      get head() {
        return c.#head;
      },
      get tail() {
        return c.#tail;
      },
      free: c.#free,
      isBackgroundFetch: (p: unknown) => c.#isBackgroundFetch(p),
      backgroundFetch: (
        k: Ki,
        index: number | undefined,
        options: LRUCacheFetchOptions<Ki, Vi, FCi>,
        context: unknown,
      ): BackgroundFetch<Vi> =>
        c.#backgroundFetch(
          k,
          index as Index | undefined,
          options,
          context,
        ),
      moveToTail: (index: number): void => c.#moveToTail(index as Index),
      indexes: (options?: { allowStale: boolean; }) => c.#indexes(options),
      rindexes: (options?: { allowStale: boolean; }) => c.#rindexes(options),
      isStale: (index: number | undefined) => c.#isStale(index as Index),
    };
  }

  get max(): LRUCacheCount {
    return this.#max;
  }
  get maxSize(): LRUCacheCount {
    return this.#maxSize;
  }
  get calculatedSize(): LRUCacheSize {
    return this.#calculatedSize;
  }
  get size(): LRUCacheCount {
    return this.#size;
  }
  get fetchMethod(): LRUCacheFetcher<K, V, FC> | undefined {
    return this.#fetchMethod;
  }
  get memoMethod(): LRUCacheMemoizer<K, V, FC> | undefined {
    return this.#memoMethod;
  }
  get dispose() {
    return this.#dispose;
  }
  get onInsert() {
    return this.#onInsert;
  }
  get disposeAfter() {
    return this.#disposeAfter;
  }

  constructor(
    options: LRUCacheOptions<K, V, FC> | LRUCache<K, V, FC>,
  ) {
    const {
      max = 0,
      ttl,
      ttlResolution = 1,
      ttlAutopurge,
      updateAgeOnGet,
      updateAgeOnHas,
      allowStale,
      dispose,
      onInsert,
      disposeAfter,
      noDisposeOnSet,
      noUpdateTTL,
      maxSize = 0,
      maxEntrySize = 0,
      sizeCalculation,
      fetchMethod,
      memoMethod,
      noDeleteOnFetchRejection,
      noDeleteOnStaleGet,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
    } = options;

    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }

    const ResolvedUintArray = max ? getUintArray(max) : Array;
    if (!ResolvedUintArray) {
      throw new Error("invalid max value: " + max);
    }

    this.#max = max;
    this.#maxSize = maxSize;
    this.maxEntrySize = maxEntrySize || this.#maxSize;
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!this.#maxSize && !this.maxEntrySize) {
        throw new TypeError(
          "cannot set sizeCalculation without setting maxSize or maxEntrySize",
        );
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }

    if (
      memoMethod !== undefined &&
      typeof memoMethod !== "function"
    ) {
      throw new TypeError("memoMethod must be a function if defined");
    }
    this.#memoMethod = memoMethod;

    if (
      fetchMethod !== undefined &&
      typeof fetchMethod !== "function"
    ) {
      throw new TypeError(
        "fetchMethod must be a function if specified",
      );
    }
    this.#fetchMethod = fetchMethod;
    this.#hasFetchMethod = !!fetchMethod;

    this.#keyMap = new Map();
    this.#keyList = new Array(max).fill(undefined);
    this.#valList = new Array(max).fill(undefined);
    this.#next = new ResolvedUintArray(max);
    this.#prev = new ResolvedUintArray(max);
    this.#head = 0 as Index;
    this.#tail = 0 as Index;
    this.#free = Stack.create(max);
    this.#size = 0;
    this.#calculatedSize = 0;

    if (typeof dispose === "function") {
      this.#dispose = dispose;
    }
    if (typeof onInsert === "function") {
      this.#onInsert = onInsert;
    }
    if (typeof disposeAfter === "function") {
      this.#disposeAfter = disposeAfter;
      this.#disposed = [];
    } else {
      this.#disposeAfter = undefined;
      this.#disposed = undefined;
    }
    this.#hasDispose = !!this.#dispose;
    this.#hasOnInsert = !!this.#onInsert;
    this.#hasDisposeAfter = !!this.#disposeAfter;

    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;

    if (this.maxEntrySize !== 0) {
      if (this.#maxSize !== 0) {
        if (!isPosInt(this.#maxSize)) {
          throw new TypeError(
            "maxSize must be a positive integer if specified",
          );
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError(
          "maxEntrySize must be a positive integer if specified",
        );
      }
      this.#initializeSizeTracking();
    }

    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0
      ? ttlResolution
      : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError(
          "ttl must be a positive integer if specified",
        );
      }
      this.#initializeTTLTracking();
    }

    if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
      throw new TypeError(
        "At least one of max, maxSize, or ttl is required",
      );
    }
    if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
      emitSimplifiedWarning(
        "TTL caching without ttlAutopurge, max, or maxSize can " +
          "result in unbounded memory consumption.",
        "UNBOUNDED_CACHE",
      );
    }
  }

  getRemainingTTL(key: K) {
    return this.#keyMap.has(key) ? Infinity : 0;
  }

  #initializeTTLTracking() {
    const ttls = new ZeroArray(this.#max);
    const starts = new ZeroArray(this.#max);
    this.#ttls = ttls;
    this.#starts = starts;

    this.#setItemTTL = (index, ttl, start = perf.now()) => {
      starts[index] = ttl !== 0 ? start : 0;
      ttls[index] = ttl;
      if (ttl !== 0 && this.ttlAutopurge) {
        const t = setTimeout(() => {
          if (this.#isStale(index)) {
            this.#delete(this.#keyList[index] as K, "expire");
          }
        }, ttl + 1);
        /* c8 ignore start */
        if (t.unref) {
          t.unref();
        }
        /* c8 ignore stop */
      }
    };

    this.#updateItemAge = (index) => {
      starts[index] = ttls[index] !== 0 ? perf.now() : 0;
    };

    this.#statusTTL = (status, index) => {
      if (ttls[index]) {
        const ttl = ttls[index];
        const start = starts[index];
        /* c8 ignore next */
        if (!ttl || !start) return;
        status.ttl = ttl;
        status.start = start;
        status.now = cachedNow || getNow();
        const age = status.now - start;
        status.remainingTTL = ttl - age;
      }
    };

    let cachedNow = 0;
    const getNow = () => {
      const n = perf.now();
      if (this.ttlResolution > 0) {
        cachedNow = n;
        const t = setTimeout(
          () => (cachedNow = 0),
          this.ttlResolution,
        );
        /* c8 ignore start */
        if (t.unref) {
          t.unref();
        }
        /* c8 ignore stop */
      }
      return n;
    };

    this.getRemainingTTL = (key) => {
      const index = this.#keyMap.get(key);
      if (index === undefined) {
        return 0;
      }
      const ttl = ttls[index];
      const start = starts[index];
      if (!ttl || !start) {
        return Infinity;
      }
      const age = (cachedNow || getNow()) - start;
      return ttl - age;
    };

    this.#isStale = (index) => {
      const s = starts[index];
      const t = ttls[index];
      return !!t && !!s && (cachedNow || getNow()) - s > t;
    };
  }

  #updateItemAge: (index: Index) => void = () => {};
  #statusTTL: (status: LRUCacheStatus<V>, index: Index) => void = () => {};
  #setItemTTL: (
    index: Index,
    ttl: LRUCacheMilliseconds,
    start?: LRUCacheMilliseconds,
  ) => void = () => {};

  #isStale: (index: Index) => boolean = () => false;

  #initializeSizeTracking() {
    const sizes = new ZeroArray(this.#max);
    this.#calculatedSize = 0;
    this.#sizes = sizes;
    this.#removeItemSize = (index) => {
      this.#calculatedSize -= sizes[index] as number;
      sizes[index] = 0;
    };
    this.#requireSize = (k, v, size, sizeCalculation) => {
      if (this.#isBackgroundFetch(v)) {
        return 0;
      }
      if (!isPosInt(size)) {
        if (sizeCalculation) {
          if (typeof sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation must be a function");
          }
          size = sizeCalculation(v, k);
          if (!isPosInt(size)) {
            throw new TypeError(
              "sizeCalculation return invalid (expect positive integer)",
            );
          }
        } else {
          throw new TypeError(
            "invalid size value (must be positive integer). " +
              "When maxSize or maxEntrySize is used, sizeCalculation " +
              "or size must be set.",
          );
        }
      }
      return size;
    };
    this.#addItemSize = (
      index: Index,
      size: LRUCacheSize,
      status?: LRUCacheStatus<V>,
    ) => {
      sizes[index] = size;
      if (this.#maxSize) {
        const maxSize = this.#maxSize - (sizes[index] as number);
        while (this.#calculatedSize > maxSize) {
          this.#evict(true);
        }
      }
      this.#calculatedSize += sizes[index] as number;
      if (status) {
        status.entrySize = size;
        status.totalCalculatedSize = this.#calculatedSize;
      }
    };
  }

  #removeItemSize: (index: Index) => void = (_i) => {};
  #addItemSize: (
    index: Index,
    size: LRUCacheSize,
    status?: LRUCacheStatus<V>,
  ) => void = (_i, _s, _st) => {};
  #requireSize: (
    k: K,
    v: V | BackgroundFetch<V>,
    size?: LRUCacheSize,
    sizeCalculation?: LRUCacheSizeCalculator<K, V>,
  ) => LRUCacheSize = (
    _k: K,
    _v: V | BackgroundFetch<V>,
    size?: LRUCacheSize,
    sizeCalculation?: LRUCacheSizeCalculator<K, V>,
  ) => {
    if (size || sizeCalculation) {
      throw new TypeError(
        "cannot set size without setting maxSize or maxEntrySize on cache",
      );
    }
    return 0;
  };

  *#indexes({ allowStale = this.allowStale } = {}) {
    if (this.#size) {
      for (let i = this.#tail; true;) {
        if (!this.#isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.#isStale(i)) {
          yield i;
        }
        if (i === this.#head) {
          break;
        } else {
          i = this.#prev[i] as Index;
        }
      }
    }
  }

  *#rindexes({ allowStale = this.allowStale } = {}) {
    if (this.#size) {
      for (let i = this.#head; true;) {
        if (!this.#isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.#isStale(i)) {
          yield i;
        }
        if (i === this.#tail) {
          break;
        } else {
          i = this.#next[i] as Index;
        }
      }
    }
  }

  #isValidIndex(index: Index) {
    return (
      index !== undefined &&
      this.#keyMap.get(this.#keyList[index] as K) === index
    );
  }

  *entries() {
    for (const i of this.#indexes()) {
      if (
        this.#valList[i] !== undefined &&
        this.#keyList[i] !== undefined &&
        !this.#isBackgroundFetch(this.#valList[i])
      ) {
        yield [this.#keyList[i], this.#valList[i]] as [K, V];
      }
    }
  }

  *rentries() {
    for (const i of this.#rindexes()) {
      if (
        this.#valList[i] !== undefined &&
        this.#keyList[i] !== undefined &&
        !this.#isBackgroundFetch(this.#valList[i])
      ) {
        yield [this.#keyList[i], this.#valList[i]] as [K, V];
      }
    }
  }

  *keys() {
    for (const i of this.#indexes()) {
      const k = this.#keyList[i];
      if (
        k !== undefined &&
        !this.#isBackgroundFetch(this.#valList[i])
      ) {
        yield k;
      }
    }
  }

  *rkeys() {
    for (const i of this.#rindexes()) {
      const k = this.#keyList[i];
      if (
        k !== undefined &&
        !this.#isBackgroundFetch(this.#valList[i])
      ) {
        yield k;
      }
    }
  }

  *values() {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      if (
        v !== undefined &&
        !this.#isBackgroundFetch(this.#valList[i])
      ) {
        yield this.#valList[i] as V;
      }
    }
  }

  *rvalues() {
    for (const i of this.#rindexes()) {
      const v = this.#valList[i];
      if (
        v !== undefined &&
        !this.#isBackgroundFetch(this.#valList[i])
      ) {
        yield this.#valList[i] as V;
      }
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  [Symbol.toStringTag] = "LRUCache";

  find(
    fn: (v: V, k: K, self: LRUCache<K, V, FC>) => boolean,
    getOptions: LRUCacheGetOptions<K, V, FC> = {},
  ) {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === undefined) continue;
      if (fn(value, this.#keyList[i] as K, this)) {
        return this.get(this.#keyList[i] as K, getOptions);
      }
    }
  }

  forEach(
    fn: (v: V, k: K, self: LRUCache<K, V, FC>) => any,
    thisp: any = this,
  ) {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === undefined) continue;
      fn.call(thisp, value, this.#keyList[i] as K, this);
    }
  }

  rforEach(
    fn: (v: V, k: K, self: LRUCache<K, V, FC>) => any,
    thisp: any = this,
  ) {
    for (const i of this.#rindexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === undefined) continue;
      fn.call(thisp, value, this.#keyList[i] as K, this);
    }
  }

  purgeStale() {
    let deleted = false;
    for (const i of this.#rindexes({ allowStale: true })) {
      if (this.#isStale(i)) {
        this.#delete(this.#keyList[i] as K, "expire");
        deleted = true;
      }
    }
    return deleted;
  }

  info(key: K): LRUCacheEntry<V> | undefined {
    const i = this.#keyMap.get(key);
    if (i === undefined) return undefined;
    const v = this.#valList[i];
    const value: V | undefined = this.#isBackgroundFetch(v)
      ? v.__staleWhileFetching
      : v as V;
    if (value === undefined) return undefined;
    const entry: LRUCacheEntry<V> = { value };
    if (this.#ttls && this.#starts) {
      const ttl = this.#ttls[i];
      const start = this.#starts[i];
      if (ttl && start) {
        const remain = ttl - (perf.now() - start);
        entry.ttl = remain;
        entry.start = Date.now();
      }
    }
    if (this.#sizes) {
      entry.size = this.#sizes[i];
    }
    return entry;
  }

  dump() {
    const arr: Array<[K, LRUCacheEntry<V>]> = [];
    for (const i of this.#indexes({ allowStale: true })) {
      const key = this.#keyList[i];
      const v = this.#valList[i];
      const value: V | undefined = this.#isBackgroundFetch(v)
        ? v.__staleWhileFetching
        : v as V;
      if (value === undefined || key === undefined) continue;
      const entry: LRUCacheEntry<V> = { value };
      if (this.#ttls && this.#starts) {
        entry.ttl = this.#ttls[i];
        const age = perf.now() - (this.#starts[i] as number);
        entry.start = Math.floor(Date.now() - age);
      }
      if (this.#sizes) {
        entry.size = this.#sizes[i];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }

  load(arr: Array<[K, LRUCacheEntry<V>]>) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }

  set(
    k: K,
    v: V | BackgroundFetch<V> | undefined,
    setOptions: LRUCacheSetOptions<K, V, FC> = {},
  ) {
    if (v === undefined) {
      this.delete(k);
      return this;
    }
    const {
      ttl = this.ttl,
      start,
      noDisposeOnSet = this.noDisposeOnSet,
      sizeCalculation = this.sizeCalculation,
      status,
    } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;

    const size = this.#requireSize(
      k,
      v,
      setOptions.size || 0,
      sizeCalculation,
    );
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.#delete(k, "set");
      return this;
    }
    const index = this.#size === 0 ? undefined : this.#keyMap.get(k);
    if (index === undefined) {
      const newIndex = (
        this.#size === 0
          ? this.#tail
          : this.#free.length !== 0
          ? this.#free.pop()
          : this.#size === this.#max
          ? this.#evict(false)
          : this.#size
      ) as Index;

      this.#keyList[newIndex] = k;
      this.#valList[newIndex] = v;
      this.#keyMap.set(k, newIndex);
      this.#next[this.#tail as Index] = newIndex;
      this.#prev[newIndex] = this.#tail as Index;
      this.#tail = newIndex;
      this.#size++;
      this.#addItemSize(newIndex, size, status);
      if (status) status.set = "add";
      noUpdateTTL = false;
      if (this.#hasOnInsert) {
        this.#onInsert?.(v as V, k, "add");
      }
    } else {
      this.#moveToTail(index);
      const oldVal = this.#valList[index] as V | BackgroundFetch<V>;
      if (v !== oldVal) {
        if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
          const { __staleWhileFetching: s } = oldVal;
          if (s !== undefined && !noDisposeOnSet) {
            if (this.#hasDispose) {
              this.#dispose?.(s as V, k, "set");
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([s as V, k, "set"]);
            }
          }
        } else if (!noDisposeOnSet) {
          if (this.#hasDispose) {
            this.#dispose?.(oldVal as V, k, "set");
          }
          if (this.#hasDisposeAfter) {
            this.#disposed?.push([oldVal as V, k, "set"]);
          }
        }
        this.#removeItemSize(index);
        this.#addItemSize(index, size, status);
        this.#valList[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && this.#isBackgroundFetch(oldVal)
            ? oldVal.__staleWhileFetching
            : oldVal;
          if (oldValue !== undefined) status.oldValue = oldValue as V;
        }
      } else if (status) {
        status.set = "update";
      }

      if (this.#hasOnInsert) {
        this.onInsert?.(v as V, k, v === oldVal ? "update" : "replace");
      }
    }
    if (ttl !== 0 && !this.#ttls) {
      this.#initializeTTLTracking();
    }
    if (this.#ttls && index !== undefined) {
      if (!noUpdateTTL) {
        this.#setItemTTL(index, ttl, start);
      }
      if (status) this.#statusTTL(status, index);
    }
    if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
      const dt = this.#disposed;
      let task: DisposeTask<K, V> | undefined;
      while ((task = dt?.shift())) {
        this.#disposeAfter?.(...task);
      }
    }
    return this;
  }

  pop(): V | undefined {
    try {
      while (this.#size) {
        const val = this.#valList[this.#head];
        this.#evict(true);
        if (this.#isBackgroundFetch(val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== undefined) {
          return val as V;
        }
      }
    } finally {
      if (this.#hasDisposeAfter && this.#disposed) {
        const dt = this.#disposed;
        let task: DisposeTask<K, V> | undefined;
        while ((task = dt?.shift())) {
          this.#disposeAfter?.(...task);
        }
      }
    }
    return undefined;
  }

  #evict(free: boolean) {
    const head = this.#head;
    const k = this.#keyList[head] as K;
    const v = this.#valList[head] as V | BackgroundFetch<V>;
    if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
      v.__abortController.abort(new Error("evicted"));
    } else if (this.#hasDispose || this.#hasDisposeAfter) {
      if (this.#hasDispose) {
        this.#dispose?.(v as V, k, "evict");
      }
      if (this.#hasDisposeAfter) {
        this.#disposed?.push([v as V, k, "evict"]);
      }
    }
    this.#removeItemSize(head);
    if (free) {
      this.#keyList[head] = undefined;
      this.#valList[head] = undefined;
      this.#free.push(head);
    }
    if (this.#size === 1) {
      this.#head = this.#tail = 0 as Index;
      this.#free.length = 0;
    } else {
      this.#head = this.#next[head] as Index;
    }
    this.#keyMap.delete(k);
    this.#size--;
    return head;
  }

  has(k: K, hasOptions: LRUCacheHasOptions<K, V, FC> = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = this.#keyMap.get(k);
    if (index !== undefined) {
      const v = this.#valList[index];
      if (
        this.#isBackgroundFetch(v) &&
        v.__staleWhileFetching === undefined
      ) {
        if (status) status.has = "miss"; // Treat as miss if only background fetch without stale data
        return false;
      }
      if (!this.#isStale(index)) {
        if (updateAgeOnHas) {
          this.#updateItemAge(index);
        }
        if (status) {
          status.has = "hit";
          this.#statusTTL(status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        this.#statusTTL(status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }

  peek(k: K, peekOptions: LRUCachePeekOptions<K, V, FC> = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = this.#keyMap.get(k);
    if (
      index === undefined ||
      (!allowStale && this.#isStale(index))
    ) {
      return undefined;
    }
    const v = this.#valList[index];
    return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v as V;
  }

  #backgroundFetch(
    k: K,
    index: Index | undefined,
    options: LRUCacheFetchOptions<K, V, FC>,
    context: any,
  ): BackgroundFetch<V> {
    const v = index === undefined
      ? undefined
      : this.#valList[index] as V | undefined; // Stale value if present
    if (this.#isBackgroundFetch(this.#valList[index!])) { // Check if already fetching
      return this.#valList[index!] as BackgroundFetch<V>;
    }

    const ac = new AC() as AbortController; // Use the (potentially polyfilled) AC
    const { signal: userSignal } = options;
    userSignal?.addEventListener("abort", () => ac.abort(userSignal.reason), {
      signal: ac.signal,
    });

    const fetchOpts = {
      signal: ac.signal,
      options,
      context,
    };

    const cb = (
      fetchedValue: V | undefined,
      updateCache = false,
    ): V | undefined => {
      const { aborted } = ac.signal;
      const ignoreAbort = options.ignoreFetchAbort &&
        fetchedValue !== undefined;
      if (options.status) {
        if (aborted && !updateCache) {
          options.status.fetchAborted = true;
          options.status.fetchError = ac.signal.reason;
          if (ignoreAbort) options.status.fetchAbortIgnored = true;
        } else {
          options.status.fetchResolved = true;
        }
      }
      if (aborted && !ignoreAbort && !updateCache) {
        return fetchFail(ac.signal.reason);
      }

      if (index === undefined) {
        // If index is undefined, we cannot safely access the array
        return fetchedValue;
      }
      // Ensure index is not undefined before using as an index
      if (typeof index === "number") {
        const currentValInMap: V | BackgroundFetch<V> | undefined = this.#valList[index];
        if (currentValInMap === p) { // Ensure this promise is still the one in cache for this key
          if (fetchedValue === undefined) {
            if (p.__staleWhileFetching) { // If fetch returned undefined, but we had a stale value
              this.#valList[index] = p.__staleWhileFetching; // Restore stale value
            } else {
              this.#delete(k, "fetch"); // Or delete if no stale value
            }
          } else {
            if (options.status) options.status.fetchUpdated = true;
            this.set(k, fetchedValue, fetchOpts.options);
          }
        }
      }
      return fetchedValue;
    };

    const eb = (er: any) => {
      if (options.status) {
        options.status.fetchRejected = true;
        options.status.fetchError = er;
      }
      return fetchFail(er);
    };

    const fetchFail = (er: any): V | undefined => {
      const { aborted } = ac.signal;
      const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
      const allowStale = allowStaleAborted ||
        options.allowStaleOnFetchRejection;
      const noDelete = allowStale || options.noDeleteOnFetchRejection;

      let currentValInMap: V | BackgroundFetch<V> | undefined;
      if (typeof index === "number") {
        currentValInMap = this.#valList[index];
      } else {
        const idx = this.#keyMap.get(k);
        currentValInMap = idx !== undefined ? this.#valList[idx] : undefined;
      }
      if (currentValInMap === p) {
        const del = !noDelete || p.__staleWhileFetching === undefined;
        if (del) {
          this.#delete(k, "fetch");
        } else if (!allowStaleAborted && typeof index === "number") {
          this.#valList[index] = p.__staleWhileFetching;
        }
      }
      if (allowStale) {
        if (options.status && p.__staleWhileFetching !== undefined) {
          options.status.returnedStale = true;
        }
        return p.__staleWhileFetching;
      } else if (p.__returned === p) { // Only throw if this promise was the one returned to user
        throw er;
      }
      return undefined; // Suppress error if not the returned promise
    };

    const pcall = (
      res: (v: V | undefined) => void,
      rej: (e: any) => void,
    ) => {
      const fmp = this.#fetchMethod?.(k, v, fetchOpts); // v is staleValue here
      if (fmp && fmp instanceof Promise) {
        fmp.then((val) => {
          if (typeof val === "undefined") {
            res(undefined);
          } else {
            res(val as V | undefined);
          }
        }, rej);
      } else {
        // Handle synchronous return from fetchMethod
        res(fmp as (V | undefined));
      }

      ac.signal.addEventListener("abort", () => {
        if (
          !options.ignoreFetchAbort ||
          options.allowStaleOnFetchAbort // If allowStaleOnFetchAbort, we resolve to undefined to trigger stale return
        ) {
          res(undefined);
          if (options.allowStaleOnFetchAbort && fmp && fmp instanceof Promise) {
            // If we allow stale on abort, but the fetch is still going,
            // we need to ensure the cache gets updated when it eventually finishes.
            fmp.then((val) => {
              if (typeof val === "undefined") {
                cb(undefined, true);
              } else {
                cb(val as V | undefined, true);
              }
            }).catch(() => {}); // Update cache, ignore errors here as main promise resolved
          }
        }
      });
    };

    if (options.status) options.status.fetchDispatched = true;
    const prom = new Promise(pcall).then(cb, eb);
    const p: BackgroundFetch<V> = Object.assign(prom, {
      __abortController: ac,
      __staleWhileFetching: v, // v is the stale value
      __returned: undefined,
    });

    if (index === undefined) {
      this.set(k, p, { ...fetchOpts.options, status: undefined });
      index = this.#keyMap.get(k)!; // Should exist now
    } else {
      this.#valList[index] = p;
    }
    return p;
  }

  #isBackgroundFetch(p: any): p is BackgroundFetch<V> {
    if (!this.#hasFetchMethod) return false;
    const b = p as BackgroundFetch<V>;
    return (
      !!b &&
      b instanceof Promise &&
      Object.prototype.hasOwnProperty.call(b, "__staleWhileFetching") &&
      b.__abortController instanceof AC // Check against the (potentially polyfilled) AC
    );
  }

  fetch(
    k: K,
    fetchOptions?: unknown extends FC ? LRUCacheFetchOptions<K, V, FC>
      : FC extends undefined | void ? LRUCacheFetchOptionsNoContext<K, V>
      : LRUCacheFetchOptionsWithContext<K, V, FC>,
  ): Promise<undefined | V>;

  fetch(
    k: unknown extends FC ? K
      : FC extends undefined | void ? K
      : never,
    fetchOptions?: unknown extends FC ? LRUCacheFetchOptions<K, V, FC>
      : FC extends undefined | void ? LRUCacheFetchOptionsNoContext<K, V>
      : never,
  ): Promise<undefined | V>;

  async fetch(
    k: K,
    fetchOptions: LRUCacheFetchOptions<K, V, FC> = {},
  ): Promise<undefined | V> {
    const {
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal,
    } = fetchOptions;

    if (!this.#hasFetchMethod) {
      if (status) status.fetch = "get";
      return this.get(k, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status,
      });
    }

    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal,
    };

    const index = this.#keyMap.get(k);
    if (index === undefined) {
      if (status) status.fetch = "miss";
      const p = this.#backgroundFetch(k, index, options, context);
      return (p.__returned = p);
    } else {
      const v = this.#valList[index];
      if (this.#isBackgroundFetch(v)) {
        const staleReturn = allowStale && v.__staleWhileFetching !== undefined;
        if (status) {
          status.fetch = "inflight";
          if (staleReturn) status.returnedStale = true;
        }
        return staleReturn ? v.__staleWhileFetching : (v.__returned = v);
      }

      const isStale = this.#isStale(index);
      if (!forceRefresh && !isStale) {
        if (status) status.fetch = "hit";
        this.#moveToTail(index);
        if (updateAgeOnGet) {
          this.#updateItemAge(index);
        }
        if (status) this.#statusTTL(status, index);
        return v as V;
      }

      const p = this.#backgroundFetch(k, index, options, context);
      const hasStaleData = p.__staleWhileFetching !== undefined;
      const staleReturn = hasStaleData && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleReturn && isStale) status.returnedStale = true;
      }
      return staleReturn ? p.__staleWhileFetching : (p.__returned = p);
    }
  }

  forceFetch(
    k: K,
    fetchOptions?: unknown extends FC ? LRUCacheFetchOptions<K, V, FC>
      : FC extends undefined | void ? LRUCacheFetchOptionsNoContext<K, V>
      : LRUCacheFetchOptionsWithContext<K, V, FC>,
  ): Promise<V>;
  forceFetch(
    k: unknown extends FC ? K
      : FC extends undefined | void ? K
      : never,
    fetchOptions?: unknown extends FC ? LRUCacheFetchOptions<K, V, FC>
      : FC extends undefined | void ? LRUCacheFetchOptionsNoContext<K, V>
      : never,
  ): Promise<V>;
  async forceFetch(
    k: K,
    fetchOptions: LRUCacheFetchOptions<K, V, FC> = {},
  ): Promise<V> {
    const v = await this.fetch(
      k,
      fetchOptions as any, // Cast to avoid complex conditional type error in implementation
    );
    if (v === undefined) throw new Error("fetch() returned undefined");
    return v;
  }

  memo(
    k: K,
    memoOptions?: unknown extends FC ? LRUCacheMemoOptions<K, V, FC>
      : FC extends undefined | void ? LRUCacheMemoOptionsNoContext<K, V>
      : LRUCacheMemoOptionsWithContext<K, V, FC>,
  ): V;
  memo(
    k: unknown extends FC ? K
      : FC extends undefined | void ? K
      : never,
    memoOptions?: unknown extends FC ? LRUCacheMemoOptions<K, V, FC>
      : FC extends undefined | void ? LRUCacheMemoOptionsNoContext<K, V>
      : never,
  ): V;
  memo(k: K, memoOptions: LRUCacheMemoOptions<K, V, FC> = {}): V {
    const memoMethod = this.#memoMethod;
    if (!memoMethod) {
      throw new Error("no memoMethod provided to constructor");
    }
    const { context, forceRefresh, ...options } = memoOptions;
    const v = this.get(k, options);
    if (!forceRefresh && v !== undefined) return v;
    const vv = memoMethod(k, v, {
      options,
      context,
    } as LRUCacheMemoizerOptions<K, V, FC>);
    this.set(k, vv, options);
    return vv;
  }

  get(k: K, getOptions: LRUCacheGetOptions<K, V, FC> = {}) {
    const {
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      status,
    } = getOptions;
    const index = this.#keyMap.get(k);
    if (index !== undefined) {
      const value = this.#valList[index];
      const fetching = this.#isBackgroundFetch(value);
      if (status) this.#statusTTL(status, index);
      if (this.#isStale(index)) {
        if (status) status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.#delete(k, "expire");
          }
          if (status && allowStale) status.returnedStale = true;
          return allowStale ? value as V : undefined;
        } else {
          if (
            status &&
            allowStale &&
            value.__staleWhileFetching !== undefined
          ) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : undefined;
        }
      } else {
        if (status) status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        this.#moveToTail(index);
        if (updateAgeOnGet) {
          this.#updateItemAge(index);
        }
        return value as V;
      }
    } else if (status) {
      status.get = "miss";
    }
    return undefined;
  }

  #connect(p: Index, n: Index) {
    this.#prev[n] = p;
    this.#next[p] = n;
  }

  #moveToTail(index: Index): void {
    if (index !== this.#tail) {
      if (index === this.#head) {
        this.#head = this.#next[index] as Index;
      } else {
        this.#connect(
          this.#prev[index] as Index,
          this.#next[index] as Index,
        );
      }
      this.#connect(this.#tail, index);
      this.#tail = index;
    }
  }

  delete(k: K) {
    return this.#delete(k, "delete");
  }

  #delete(k: K, reason: LRUCacheDisposeReason) {
    let deleted = false;
    if (this.#size !== 0) {
      const index = this.#keyMap.get(k);
      if (index !== undefined) {
        deleted = true;
        if (this.#size === 1) {
          this.#clear(reason); // Pass reason to #clear
        } else {
          this.#removeItemSize(index);
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error(reason)); // Pass reason to abort
          } else if (this.#hasDispose || this.#hasDisposeAfter) {
            if (this.#hasDispose) {
              this.#dispose?.(v as V, k, reason);
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([v as V, k, reason]);
            }
          }
          this.#keyMap.delete(k);
          this.#keyList[index] = undefined;
          this.#valList[index] = undefined;
          if (index === this.#tail) {
            this.#tail = this.#prev[index] as Index;
          } else if (index === this.#head) {
            this.#head = this.#next[index] as Index;
          } else {
            const pi = this.#prev[index] as Index; // Ensure type
            this.#next[pi] = this.#next[index] as Index; // Ensure type
            const ni = this.#next[index] as Index; // Ensure type
            this.#prev[ni] = this.#prev[index] as Index; // Ensure type
          }
          this.#size--;
          this.#free.push(index);
        }
      }
    }
    if (this.#hasDisposeAfter && this.#disposed?.length) {
      const dt = this.#disposed;
      let task: DisposeTask<K, V> | undefined;
      while ((task = dt?.shift())) {
        this.#disposeAfter?.(...task);
      }
    }
    return deleted;
  }

  clear() {
    return this.#clear("delete");
  }
  #clear(reason: LRUCacheDisposeReason) {
    for (const index of this.#rindexes({ allowStale: true })) { // Iterate over all, including stale
      const v = this.#valList[index];
      const k = this.#keyList[index]; // Get key before clearing
      if (this.#isBackgroundFetch(v)) {
        v.__abortController.abort(new Error(reason)); // Pass reason
      } else if (k !== undefined && v !== undefined) { // Ensure key and value exist for dispose
        if (this.#hasDispose) {
          this.#dispose?.(v as V, k as K, reason);
        }
        if (this.#hasDisposeAfter) {
          this.#disposed?.push([v as V, k as K, reason]);
        }
      }
    }

    this.#keyMap.clear();
    this.#valList.fill(undefined);
    this.#keyList.fill(undefined);
    if (this.#ttls && this.#starts) {
      this.#ttls.fill(0);
      this.#starts.fill(0);
    }
    if (this.#sizes) {
      this.#sizes.fill(0);
    }
    this.#head = 0 as Index;
    this.#tail = 0 as Index;
    this.#free.length = 0;
    this.#calculatedSize = 0;
    this.#size = 0;
    if (this.#hasDisposeAfter && this.#disposed) {
      const dt = this.#disposed;
      let task: DisposeTask<K, V> | undefined;
      while ((task = dt?.shift())) {
        this.#disposeAfter?.(...task);
      }
    }
  }
}
