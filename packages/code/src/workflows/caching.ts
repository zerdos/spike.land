import {
  codeAnalysisCacheMetrics,
  hashCacheMetrics,
  metrics,
  toolResponseCacheMetrics,
} from "@/lib/metrics";
import { LRUCache } from "lru-cache";

type CacheValue = string | {
  hash?: string;
  modifiedCodeHash?: string;
  compilationError: boolean;
  codeWasReturned: boolean;
};

/**
 * Generic cache store with LRU eviction policy
 */
interface CacheMetricsInterface {
  recordHit: () => void;
  recordMiss: () => void;
}

interface CacheStoreOptions {
  maxSize?: number;
  ttl?: number;
  name?: string;
  metrics?: CacheMetricsInterface;
}

export class CacheStore<T extends CacheValue> {
  private cache: LRUCache<string, T>;
  private metrics: CacheMetricsInterface;
  private name: string;

  constructor(options: CacheStoreOptions = {}) {
    this.cache = new LRUCache({
      max: options.maxSize || 500,
      ttl: options.ttl || 1000 * 60 * 30, // 30 minutes default TTL
    });

    this.name = options.name || "default";
    this.metrics = options.metrics || {
      recordHit: () => {},
      recordMiss: () => {},
    };
  }

  get(key: string): T | undefined {
    const start = Date.now();
    const value = this.cache.get(key);
    const duration = Date.now() - start;

    if (value !== undefined) {
      this.metrics.recordHit();
      metrics.recordOperation("cache.get.hit", duration);
    } else {
      this.metrics.recordMiss();
      metrics.recordOperation("cache.get.miss", duration);
    }

    return value;
  }

  set(key: string, value: T): void {
    const start = Date.now();
    this.cache.set(key, value);
    metrics.recordOperation("cache.set", Date.now() - start);
  }

  has(key: string): boolean {
    const exists = this.cache.has(key);
    if (exists) {
      this.metrics.recordHit();
    } else {
      this.metrics.recordMiss();
    }
    return exists;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Create singleton instances for different types of caches with metrics
export const hashCache = new CacheStore<string>({
  name: "hash",
  metrics: hashCacheMetrics,
});

interface ToolResponse {
  hash?: string;
  modifiedCodeHash?: string;
  compilationError: boolean;
  codeWasReturned: boolean;
}

export const toolResponseCache = new CacheStore<ToolResponse>({
  name: "toolResponse",
  metrics: toolResponseCacheMetrics,
});

// Export cache operation tracking
export function logCacheStats(): void {
  console.log("\n=== Cache Performance Stats ===\n");
  console.log("Hash Cache:", hashCacheMetrics.getStats());
  console.log("Code Analysis Cache:", codeAnalysisCacheMetrics.getStats());
  console.log("Tool Response Cache:", toolResponseCacheMetrics.getStats());
  console.log(
    "\nTotal Operations:",
    metrics.getMetrics("cache.set")?.count || 0,
  );
  console.log(
    "Average Set Duration:",
    metrics.getMetrics("cache.set")?.avgTime.toFixed(2),
    "ms",
  );
  console.log(
    "Cache Hit Rate:",
    (
      (metrics.getMetrics("cache.get.hit")?.count || 0) /
      ((metrics.getMetrics("cache.get.hit")?.count || 0) +
        (metrics.getMetrics("cache.get.miss")?.count || 0)) *
      100
    ).toFixed(1),
    "%",
  );
}
