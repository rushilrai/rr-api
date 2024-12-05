import "@std/dotenv/load";

import { connectToInfisical } from "./configs/infisical.config.ts";
import { initLogger, LOGGER } from "./configs/logger.config.ts";
import { initRouters } from "./configs/hono.config.ts";

async function main() {
  try {
    initLogger();
    initRouters();
    await connectToInfisical();

    LOGGER.debug("rr-api");
  } catch (error) {
    LOGGER.error(error);

    Deno.exit(1);
  }
}

main();
