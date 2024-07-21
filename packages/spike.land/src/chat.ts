import Env from "./env";
import { handleAnthropicRequest } from "./anthropicHandler";
import { handleMainFetch } from "./mainFetchHandler";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.url.includes('anthropic')) {
      return handleAnthropicRequest(request, env, ctx);
    }

    return handleMainFetch(request, env, ctx);
  }
};

