import { Kysely, PostgresDialect } from "kysely";
import Pool from "pg-pool";

import { LOGGER } from "./logger.config.ts";
import { SampleTable } from "../modules/sample/sample.model.ts";

interface Database {
  sample: SampleTable;
}

export let db: Kysely<Database>;

export async function connectToDb() {
  try {
    const pool = new Pool({
      database: "",
      host: "",
      user: "",
      password: "",
      port: 5432,
      max: 10,
    });

    await pool.query("SELECT NOW()");

    const dialect = new PostgresDialect({
      pool: pool,
    });

    db = new Kysely<Database>({
      dialect,
    });

    LOGGER.debug("Connected to DB");
  } catch (error) {
    LOGGER.error(error);

    throw error;
  }
}
