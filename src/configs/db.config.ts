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
    const DB_NAME = Deno.env.get("DB_NAME");
    const DB_HOST = Deno.env.get("DB_HOST");
    const DB_USER = Deno.env.get("DB_USER");
    const DB_PASSWORD = Deno.env.get("DB_PASSWORD");
    const DB_PORT = Deno.env.get("DB_PORT");

    if (
      DB_NAME === undefined ||
      DB_HOST === undefined ||
      DB_USER === undefined ||
      DB_PASSWORD === undefined ||
      DB_PORT === undefined
    ) {
      throw new Error("DB environment variables not set");
    }

    const pool = new Pool({
      database: DB_NAME,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
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
