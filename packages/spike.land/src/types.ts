interface CloudflareCache extends CacheStorage {
  default: Cache;
}

export interface Env {
  ESM_ORIGIN: string;
  ESM_TOKEN: string;
  OPENAI_API_KEY: string;
  AI: unknown;
  KV: KVNamespace;
  __STATIC_CONTENT: KVNamespace;
  NPM_REGISTRY: string;
  REPLICATE_API_TOKEN: string;
  ANTHROPIC_API_KEY: string;
  CLERK_SECRET_KEY: string;
  readonly caches: CloudflareCache;
}

export type { CloudflareCache };
