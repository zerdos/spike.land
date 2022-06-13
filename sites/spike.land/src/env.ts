import { CodeRateLimiter } from ".";

export interface CodeEnv extends EventInit {
  CODE: DurableObjectNamespace;
  __STATIC_CONTENT: KVNamespace;

  LIMITERS: {
    idFromName: (ip: string) => string;
    get: (ip: string) => CodeRateLimiter;
  };
}
