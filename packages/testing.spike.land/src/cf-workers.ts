import chat from "./chat.js";
import { Code } from "./chatRoom.js";
import type Env from "./env.js";
import R2BucketHandler from "./r2bucket.js";

import { CodeRateLimiter } from "./rateLimiter.js";
import { createHandler } from "./types/cloudflare.js";
import { Users } from "./users.js";

async function handleRequest(
  request: Request<unknown, CfProperties<unknown>>,
  env: Env,
  ctx: ExecutionContext,
) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/r2/")) {
    const r2Url = new URL(url.pathname.slice(3), url.origin);
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      headers.append(key, value);
    });

    headers.set("host", r2Url.host);
    const r2Request = new Request(r2Url.toString(), {
      method: request.method,
      headers: headers, // Use the modified headers
      body: request.body,
    });
    return R2BucketHandler.fetch(r2Request, env, ctx);
  }

  return chat.fetch(request, env, ctx) as Promise<Response>;
}

const mainHandler = createHandler<Env>(handleRequest);

export default mainHandler;
export { Code, CodeRateLimiter, R2BucketHandler, Users };
