import { Kysely, PostgresDialect } from "kysely";
import Pool from "pg-pool";

import { LOGGER } from "./logger.config.ts";
import { SampleTable } from "../modules/sample/sample.model.ts";

interface Database {
  sample: SampleTable;
}

export let DB: Kysely<Database>;

export async function connectToDb() {
  try {
    const pool = new Pool({
      database: "",
      host: "",
      user: "",
      password: "",
      port: 5432,
    });

    await pool.query("SELECT NOW()");

    const dialect = new PostgresDialect({
      pool: pool,
    });

    DB = new Kysely<Database>({
      dialect,
    });

    LOGGER.debug("Connected to DB");
  } catch (error) {
    LOGGER.error("Could not connect to DB", error);

    throw error;
  }
}

export async function disconnectFromDb() {
  try {
    await DB.destroy();

    LOGGER.debug("Disconnected from DB");
  } catch (error) {
    LOGGER.error("Could not connect to DB", error);

    throw error;
  }
}
