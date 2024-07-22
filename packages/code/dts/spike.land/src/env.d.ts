export default interface Env {
  ESM_ORIGIN?: string;
  ESM_TOKEN?: string;
  OPENAI_API_KEY: string;
  NPM_REGISTRY?: string;
  ANTHROPIC_API_KEY: string;
  NPM_TOKEN?: string;
  CODE: DurableObjectNamespace;
  __STATIC_CONTENT: KVNamespace;
  LIMITERS: DurableObjectNamespace;
  R2: R2Bucket;
}
