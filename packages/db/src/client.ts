import postgres from "postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

/**
 * Database client factory.
 *
 * Rules:
 * - No implicit connections at import time
 * - No global singletons
 * - Caller controls lifecycle
 *
 * This function may be wrapped by higher-level
 * runtime helpers (API routes, jobs, etc).
 */

export type DbClient = PostgresJsDatabase;

export function createDbClient(connectionString: string): {
  client: DbClient;
  sql: postgres.Sql;
} {
  if (!connectionString) {
    throw new Error("Database connection string is required");
  }

  const sql = postgres(connectionString, {
    prepare: false
  });

  const client = drizzle(sql);

  return { client, sql };
}
