/**
 * SOS OPS — Database Core
 *
 * Package entrypoint.
 *
 * Owns:
 * - canonical schema definitions
 * - database client construction
 * - migrations + seed orchestration
 *
 * Runtime connections are intentionally thin.
 * Higher-level modules import from this package,
 * but do not create their own DB primitives.
 *
 * Constraints:
 * - No side effects at import time
 * - No implicit connections
 * - No module-level singletons
 */

// Re-export schema surface (tables, enums, views)
export * from "./schema/index.js";

// Re-export client factory (lazy, env-bound)
export * from "./client.js";
