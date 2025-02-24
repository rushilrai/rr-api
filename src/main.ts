import "@std/dotenv/load";

import { connectToInfisical } from "./configs/infisical.config.ts";
import { initRouters } from "./configs/hono.config.ts";
import { connectToDb } from "./configs/db.config.ts";
import { initResend } from "./configs/resend.config.ts";

async function main() {
  try {
    initRouters();
    await initResend();
    await connectToInfisical();
    await connectToDb();

    console.debug("rr-api");
  } catch (error) {
    console.error(error);

    Deno.exit(1);
  }
}

main();
