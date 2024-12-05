import { Hono } from "@hono/hono";

export const SAMPLE_ROUTER = new Hono();

SAMPLE_ROUTER.get("/", (c) => {
  return c.text("sample route");
});
