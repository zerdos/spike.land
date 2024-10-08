import { useCodeSpace } from "@/hooks/use-code-space";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import { QueuedFetch } from "@/lib/queued-fetch";
import { serveWithCache } from "@/lib/serve-with-cache";
import HTML from "./index.html";
import { CodeSessionBC } from "./services/CodeSessionBc";

export type { CodeSessionBC, HTML, importMap, importMapReplace, QueuedFetch, serveWithCache, useCodeSpace };

Object.assign(globalThis, {
  serveWithCache,
  CodeSessionBC,
  importMapReplace,
  QueuedFetch,
  useCodeSpace,
  HTML,
  importMap,
});
