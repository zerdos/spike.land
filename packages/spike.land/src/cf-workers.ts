import type { ExportedHandler } from "@cloudflare/workers-types";
import chat from "./chat";
import { Code } from "./chatRoom";
import type MyEnv from "./env";
import R2BucketHandler from "./r2bucket";
import { CodeRateLimiter } from "./rateLimiter";
import { Users } from "./users";

const mainHandler: ExportedHandler<MyEnv> = {
  async fetch(request: Request, env: MyEnv, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/r2/")) {
      const r2Request = new Request(new URL(url.pathname.slice(3), url.origin), request);
      return R2BucketHandler.fetch(r2Request, env, ctx);
    }

    return chat.fetch(request, env, ctx);
  },
};

export default mainHandler;
export { Code, CodeRateLimiter, R2BucketHandler, Users };
