import "@std/dotenv/load";

import { connectToInfisical } from "./modules/common/configs/infisical.config.ts";
import { initRouters } from "./modules/common/configs/hono.config.ts";
import { connectToDb } from "./modules/common/configs/db.config.ts";
import { initResend } from "./modules/common/configs/resend.config.ts";

async function main() {
  try {
    await connectToInfisical();
    await connectToDb();
    await initResend();
    initRouters();

    console.debug("rr-api");
  } catch (error) {
    console.error(error);

    Deno.exit(1);
  }
}

main();
