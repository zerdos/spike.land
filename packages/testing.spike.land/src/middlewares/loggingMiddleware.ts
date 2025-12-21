import type { Context, MiddlewareHandler } from "hono";

export const loggingMiddleware: MiddlewareHandler = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  console.warn(`Request: ${ctx.req.method} ${ctx.req.url}`);
  const response = await next();
  return response ?? new Response();
};
