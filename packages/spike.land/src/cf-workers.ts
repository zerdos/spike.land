import chat from "./chat";
import { Code } from "./chatRoom";
import type MyEnv from "./env";
import R2BucketHandler from "./r2bucket";
import { CodeRateLimiter } from "./rateLimiter";
import { createCFResponse, createHandler } from "./types/cloudflare";
import { Users } from "./users";

async function handleRequest(
  request: Request,
  env: MyEnv,
  ctx: ExecutionContext,
) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/r2/")) {
    const r2Url = new URL(url.pathname.slice(3), url.origin);
    return R2BucketHandler.fetch!(
      new Request(r2Url),
      env,
      ctx,
    );
  }

  if (!chat.fetch) {
    return createCFResponse("Chat handler not available", { status: 503 });
  }
  return chat.fetch(request, env, ctx);
}

const mainHandler = createHandler<MyEnv>(handleRequest);

export default mainHandler;
export { Code, CodeRateLimiter, R2BucketHandler, Users };
