import type { Config } from "drizzle-kit";

export default {
  /**
   * Point directly at the canonical schema file to avoid
   * NodeNext/ESM resolution surprises on Windows.
   */
  schema: "./src/schema/core.ts",

  /**
   * Drizzle output directory (migrations + meta).
   */
  out: "./drizzle",

  dialect: "postgresql",

  /**
   * DATABASE_URL is required for generate/migrate/studio commands.
   */
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },

  strict: true,
  verbose: true
} satisfies Config;
