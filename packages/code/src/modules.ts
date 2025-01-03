import { importMap, importMapReplace } from "@/lib/importmap-utils.ts";
export type {
  ImageData,
  IRenderApp,
  LanguageMap,
  Message,
  MessageContent,
  MessagePart,
  RenderedApp,
} from "@/lib/interfaces.ts";
import HTML from "./index.html";

export { HTML };
export { serveWithCache } from "@/lib/serve-with-cache.ts";

export { md5 } from "@/lib/md5.ts";
export { routes } from "@/lib/routes.ts";

import type { Diff } from "@/lib/text-diff";
export { importMapReplace };

export { serverFetchUrl } from "@/lib/enhanced-fetch";

import type { ICodeSession } from "@/lib/interfaces";
import type { CodePatch } from "@/lib/make-sess.ts";

import {
  applySessionPatch,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
  sessionToJSON,
} from "@/lib/common-functions";

export { importMap };

export { computeSessionHash, generateSessionPatch, sessionToJSON };
export type { CodePatch, Diff, ICodeSession };
export { applySessionPatch, sanitizeSession };
