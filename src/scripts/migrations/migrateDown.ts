import "@std/dotenv/load";

import * as path from "@std/path";
import { FileMigrationProvider, Migrator } from "kysely";

import { connectToInfisical } from "../../modules/common/configs/infisical.config.ts";
import {
  connectToDb,
  DB,
  disconnectFromDb,
} from "../../modules/common/configs/db.config.ts";

async function migrateDownDb() {
  try {
    await connectToInfisical();
    await connectToDb();

    const migrator = new Migrator({
      db: DB,
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
        migrationFolder: path.join(Deno.cwd(), "src/migrations"),
      }),
    });

    const { error, results } = await migrator.migrateDown();

    results?.forEach((result) => {
      if (result.status === "Success") {
        console.debug(`Migration "${result.migrationName}" was successful`);
      } else if (result.status === "Error") {
        console.error(
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
    console.error("Migration process failed:", error);

    await disconnectFromDb();

    Deno.exit(1);
  }
}

migrateDownDb();
