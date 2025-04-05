import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

import { SAMPLE_ROUTER } from "../../sample/sample.router.ts";

type ContextVariables = {
  timeOfRequest: Date;
};

export function createHonoInstance() {
  return new Hono<{ Variables: ContextVariables }>();
}

const HONO_APP = createHonoInstance();

HONO_APP.use("/*", cors());

type Router = {
  path: string;
  router: Hono<{ Variables: ContextVariables }>;
};

const ROUTERS: Router[] = [
  { path: "/sample", router: SAMPLE_ROUTER },
];

export function initRouters() {
  for (let index = 0; index < ROUTERS.length; index++) {
    HONO_APP.route(ROUTERS[index].path, ROUTERS[index].router);
  }

  Deno.serve(HONO_APP.fetch);
}
