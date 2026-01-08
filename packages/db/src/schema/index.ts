/**
 * SOS OPS — Database Core
 *
 * This package owns:
 * - canonical schema definitions
 * - database client construction
 * - migrations + seed orchestration
 *
 * Runtime connections are intentionally thin.
 * Higher-level modules import from this package,
 * but do not create their own DB primitives.
 */

// Re-export schema surface (tables, enums, views)
export * from "./schema/index";

// Re-export client factory (lazy, env-bound)
export * from "./client";

// NOTE:
// - No side effects at import time
// - No implicit connections
// - No module-level singletons
//
// Concrete usage begins in Module 1+ consumers.
