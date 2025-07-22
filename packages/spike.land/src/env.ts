/// <reference types="@cloudflare/workers-types" />

export default interface Env {
  ESM_ORIGIN?: string;
  ESM_TOKEN?: string;
  OPENAI_API_KEY: string;
  AI: Ai;
  KV: KVNamespace;
  __STATIC_CONTENT: KVNamespace;
  NPM_REGISTRY?: string;
  REPLICATE_API_TOKEN: string;
  ANTHROPIC_API_KEY: string;
  CLERK_SECRET_KEY: string;
  CF_REAL_TURN_TOKEN: string;
  ESBUILD: Fetcher;
  NPM_TOKEN?: string;
  CODE: DurableObjectNamespace;
  LIMITERS: DurableObjectNamespace;
  R2: R2Bucket;
  X9: R2Bucket;
  DISABLE_AI_TOOLS?: string; // Set to "true" to disable AI tools (workaround for AI SDK v4 issue)
}
