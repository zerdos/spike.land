import chat from "./chat";
import { Code } from "./chatRoom";
import type Env from "./env";
import R2BucketHandler from "./r2bucket";

import { CodeRateLimiter } from "./rateLimiter";
import { createResponse, createHandler } from "./types/cloudflare";
import { Users } from "./users";

async function handleRequest(
  request: Request<unknown, CfProperties<unknown>>,
  env: Env,
  ctx: ExecutionContext,
) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/r2/")) {
    const r2Url = new URL(url.pathname.slice(3), url.origin);
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      headers.append(key, value);
    }
    
    headers.set("host", r2Url.host);
    const r2Request = new Request(r2Url.toString(), {
      method: request.method,
      headers: new Headers(request.headers),
      body: request.body,
    });
    return R2BucketHandler.fetch(r2Request, env, ctx);
  }

  if (!chat.fetch) {
    return createResponse("Chat handler not available", { status: 503 });
  }
  return chat.fetch(request, env, ctx) as Promise<Response>;
}

const mainHandler = createHandler<Env>(handleRequest);

export default mainHandler;
export { Code, CodeRateLimiter, R2BucketHandler, Users };
