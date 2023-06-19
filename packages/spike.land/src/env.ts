/// <reference types="@cloudflare/workers-types" />

// import {DurableObjectNamespace, KVNamespace} from "@cloudflare/workers-types"
export default interface Env {
  ESM_ORIGIN?: string;
  ESM_TOKEN?: string;
  NPM_REGISTRY?: string;
  NPM_TOKEN?: string;
  CODE: DurableObjectNamespace;
  __STATIC_CONTENT: KVNamespace;
  LIMITERS: DurableObjectNamespace;
  R2: R2Bucket;
}
