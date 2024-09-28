import { serveWithCache } from "@/lib/serve-with-cache";
import { CodeSessionBC } from "./services/CodeSessionBc";

export { CodeSessionBC, serveWithCache };

Object.assign(globalThis, { serveWithCache, CodeSessionBC });
