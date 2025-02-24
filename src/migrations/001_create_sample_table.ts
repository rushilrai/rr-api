// deno-lint-ignore-file no-explicit-any

import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("sample")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn(
      "created_at",
      "timestamptz",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn(
      "updated_at",
      "timestamptz",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("sample").execute();
}
