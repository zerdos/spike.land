import { handleAnthropicRequest } from "./anthropicHandler";
import Env from "./env";
import { handleMainFetch } from "./mainFetchHandler";
import { handleGPT4Request } from "./openaiHandler";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.url.includes("anthropic")) {
      return handleAnthropicRequest(request, env, ctx);
    }
    if (request.url.includes("openai")) {
      return handleGPT4Request(request, env, ctx);
    }

    return handleMainFetch(request, env, ctx);
  },
};
