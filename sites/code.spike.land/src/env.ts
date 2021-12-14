import { CodeRateLimiter } from ".";

export interface CodeEnv extends EventInit {
    CODE: DurableObjectNamespace,
    LIMITERS: {
        idFromName: (ip: string) => string
        get: (ip: string)=>CodeRateLimiter
    }
}