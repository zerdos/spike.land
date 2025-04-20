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
export { tryCatch } from "@/lib/try-catch.ts";

import HTML from "./index.html";
export { HTML };

export { serveWithCache } from "@/lib/serve-with-cache.ts";

export { md5 } from "@/lib/md5.ts";
export { routes } from "@/lib/routes.ts";

export { importMapReplace };

export { serverFetchUrl } from "@/lib/enhanced-fetch";

import type { ICodeSession } from "@/lib/interfaces";
import type { SessionDelta } from "@/lib/make-sess.ts";
export { fakeServer } from "./sw-local-fake-server";

import {
  applySessionDelta,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
  sessionToJSON,
} from "@/lib/common-functions";

export { importMap };

export { computeSessionHash, generateSessionPatch, sessionToJSON };
export type { ICodeSession, SessionDelta };
export { applySessionDelta, sanitizeSession };
