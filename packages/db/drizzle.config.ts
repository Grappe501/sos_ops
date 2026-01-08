import type { Config } from "drizzle-kit";

export default {
  // Use a single schema entry to avoid CJS/ESM + TS path resolution issues on Windows.
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  strict: true,
  verbose: true
} satisfies Config;
