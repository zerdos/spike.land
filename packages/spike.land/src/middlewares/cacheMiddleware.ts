import type { Context, MiddlewareHandler } from "hono";

export const cacheMiddleware: MiddlewareHandler = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  await next();
  ctx.res.headers.set("Cache-Control", "public, max-age=3600");
};
