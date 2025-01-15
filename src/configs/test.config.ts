import "@std/dotenv/load";

import { connectToInfisical } from "./infisical.config.ts";
import { initLogger, LOGGER } from "./logger.config.ts";

let isSetup = false;

export async function testSetup() {
  if (!isSetup) {
    try {
      initLogger();
      await connectToInfisical();

      isSetup = true;
    } catch (error) {
      LOGGER.error(error);

      Deno.exit(1);
    }
  }
}
