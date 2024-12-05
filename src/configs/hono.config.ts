import { Hono } from "@hono/hono";

import { SAMPLE_ROUTER } from "../modules/sample/sample.router.ts";

const HONO_APP = new Hono();

type Router = {
  path: string;
  router: Hono;
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
