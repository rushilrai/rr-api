import "@std/dotenv/load";

import { connectToInfisical } from "./configs/infisical.config.ts";
import { initLogger, LOGGER } from "./configs/logger.config.ts";
import { initRouters } from "./configs/hono.config.ts";
import { connectToDb } from "./configs/db.config.ts";
import { initResend } from "./configs/resend.config.ts";

async function main() {
  try {
    initLogger();
    initRouters();
    await initResend();
    await connectToInfisical();
    await connectToDb();

    LOGGER.debug("rr-api");
  } catch (error) {
    LOGGER.error(error);

    Deno.exit(1);
  }
}

main();
