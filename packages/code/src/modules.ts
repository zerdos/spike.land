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

import type { Delta } from "./textDiff";
export { importMapReplace };

export { serverFetchUrl } from "@/lib/enhanced-fetch";

import type { ICodeSession } from "@/lib/interfaces";
import type { CodePatch } from "@/lib/make-sess.ts";
import { applyCodePatch, createPatch, makeHash, makeSession, stringifySession } from "@/lib/make-sess.ts";

export { importMap };

export { createPatch, makeHash, stringifySession };
export type { CodePatch, Delta, ICodeSession };
export { applyCodePatch, makeSession };
