import { useCodeSpace } from "@/hooks/use-code-space";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import { serveWithCache } from "@/lib/serve-with-cache";
import HTML from "./index.html";
import { CodeSessionBC } from "./services/CodeSessionBc";

export type { CodeSessionBC, HTML, importMapReplace, serveWithCache, useCodeSpace };

Object.assign(globalThis, { serveWithCache, CodeSessionBC, importMapReplace, useCodeSpace, HTML, importMap });
