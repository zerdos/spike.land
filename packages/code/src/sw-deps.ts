import { serveWithCache } from "@/lib/serve-with-cache";
import { CodeSessionBC } from "./services/CodeSessionBc";

export type { CodeSessionBC, serveWithCache };

Object.assign(globalThis, { serveWithCache, CodeSessionBC });
