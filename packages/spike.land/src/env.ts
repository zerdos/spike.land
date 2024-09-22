/// <reference types="@cloudflare/workers-types" />

// import {DurableObjectNamespace, KVNamespace} from "@cloudflare/workers-types"
export default interface Env {
  ESM_ORIGIN?: string;
  ESM_TOKEN?: string;
  OPENAI_API_KEY: string;
  KV: KVNamespace;
  NPM_REGISTRY?: string;
  REPLICATE_API_TOKEN: string;
  ANTHROPIC_API_KEY: string;
  CLERK_SECRET_KEY: string;
  CF_REAL_TURN_TOKEN: string;
  NPM_TOKEN?: string;
  CODE: DurableObjectNamespace;
  LIMITERS: DurableObjectNamespace;
  R2: R2Bucket;
}
