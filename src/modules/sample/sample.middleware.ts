import { Context, Next } from "@hono/hono";

export async function sampleMiddleware(c: Context, next: Next) {
  try {
    const now = new Date();

    c.set("timeOfRequest", now);

    await next();
  } catch (error) {
    console.error("sampleMiddleware error:", error);

    return c.json({ error: "Server Error" }, 500);
  }
}
