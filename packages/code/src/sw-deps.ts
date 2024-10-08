import { useCodeSpace } from "@/hooks/use-code-space";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import { serveWithCache } from "@/lib/serve-with-cache";
import HTML from "./index.html";
import { CodeSessionBC } from "./services/CodeSessionBc";
import { QueuedFetch } from "@/lib/queued-fetch"; 


export type { CodeSessionBC, HTML, importMapReplace, serveWithCache, useCodeSpace, QueuedFetch, importMap };

Object.assign(globalThis, {
  serveWithCache,
  CodeSessionBC,
  importMapReplace,
  QueuedFetch,
  useCodeSpace,
  HTML,
  importMap,
});
