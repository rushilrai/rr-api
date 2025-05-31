import "@std/dotenv/load";

import { connectToDb } from "../modules/common/configs/db.config.ts";
import { connectToInfisical } from "../modules/common/configs/infisical.config.ts";

async function playground() {
  try {
    await connectToInfisical();
    await connectToDb();
  } catch (error) {
    console.error(error);

    return;
  }
}

playground();
