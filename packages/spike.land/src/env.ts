export interface CodeEnv extends EventInit {
  CODE: DurableObjectNamespace;
  __STATIC_CONTENT: KVNamespace;

  LIMITERS: DurableObjectNamespace;
}
