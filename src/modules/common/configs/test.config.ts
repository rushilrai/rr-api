import "@std/dotenv/load";

import { connectToInfisical } from "./infisical.config.ts";
import { connectToDb, disconnectFromDb } from "./db.config.ts";
import { initResend } from "./resend.config.ts";

let isSetup = false;

export async function testSetup() {
  if (!isSetup) {
    try {
      await connectToInfisical();
      await connectToDb();
      await initResend();

      isSetup = true;
    } catch (error) {
      console.error(error);

      Deno.exit(1);
    }
  }
}

export async function testCleanup() {
  try {
    await disconnectFromDb();

    isSetup = false;
  } catch (error) {
    console.error(error);

    Deno.exit(1);
  }
}
