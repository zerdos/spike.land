import type { Context } from "hono";

export const errorMiddleware = async (
  c: Context,
  next: () => Promise<Response>,
) => {
  try {
    return await next();
  } catch (err: unknown) {
    console.error("Error middleware caught:", err);
    const message = err instanceof Error
      ? err.message
      : "Internal Server Error";
    return c.json({ error: message }, 500);
  }
};
