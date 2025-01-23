interface CloudflareCache extends Cache {
  default: Cache;
}

declare global {
  interface WindowOrWorkerGlobalScope {
    readonly caches: CloudflareCache;
  }
}

export type { CloudflareCache };
