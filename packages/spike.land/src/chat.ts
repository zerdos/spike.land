import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { importMap } from "../../code/src/importMap";
import { importMapReplace } from "../../code/src/importMapReplace";
import { md5 } from "../../code/src/md5";
import { handleAiFetchApi } from "./ai";
import ASSET_HASH from "./dist.shasum";
import Env from "./env";
import { handleErrors } from "./handleErrors";
import { ASSET_MANIFEST, files } from "./staticContent.mjs";
import { handleApiRequest } from "./apiHandler";
import { handleFetchApi } from "./fetchHandler";
import { handleAnthropicRequest } from "./anthropicHandler";
import { handleMainFetch } from "./mainFetchHandler";
import { handleCORS, handleUnauthorizedRequest, handleRedirectResponse } from "./utils";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.url.includes('anthropic')) {
      return handleAnthropicRequest(request, env, ctx);
    }

    return handleMainFetch(request, env, ctx);
  }
};

