import { useCodeSpace } from "@/hooks/use-code-space";
import { importMapReplace } from "@/lib/importmap-utils";
import { serveWithCache } from "@/lib/serve-with-cache";
import { CodeSessionBC } from "./services/CodeSessionBc";

export type { CodeSessionBC, importMapReplace, serveWithCache, useCodeSpace };

Object.assign(globalThis, { serveWithCache, CodeSessionBC, importMapReplace, useCodeSpace });
