import * as path from "@std/path";
import { FileMigrationProvider, Migrator } from "kysely";

import { initLogger } from "../../configs/logger.config.ts";
import { connectToInfisical } from "../../configs/infisical.config.ts";
import { connectToDb, db, disconnectFromDb } from "../../configs/db.config.ts";
import { LOGGER } from "../../configs/logger.config.ts";

export async function migrateUpDb() {
  try {
    initLogger();
    await connectToInfisical();
    await connectToDb();

    const migrator = new Migrator({
      db,
      provider: new FileMigrationProvider({
        fs: {
          readdir: async (dirPath: string) => {
            const entries = [];
            for await (const entry of Deno.readDir(dirPath)) {
              if (entry.isFile) {
                entries.push(entry.name);
              }
            }
            return entries;
          },
        },
        path,
        migrationFolder: path.join(Deno.cwd(), "migrations"),
      }),
    });

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((result) => {
      if (result.status === "Success") {
        LOGGER.debug(`Migration "${result.migrationName}" was successful`);
      } else if (result.status === "Error") {
        LOGGER.error(
          `Migration "${result.migrationName}" failed:`,
          result,
        );
      }
    });

    if (error) {
      throw error;
    }

    await disconnectFromDb();
  } catch (error) {
    LOGGER.error("Migration process failed:", error);

    await disconnectFromDb();

    Deno.exit(1);
  }
}
