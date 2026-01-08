import {
    boolean,
    index,
    inet,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid
  } from "drizzle-orm/pg-core";
  
  /**
   * Core enums
   */
  export const actorTypeEnum = pgEnum("actor_type", ["system", "staff"]);
  export const auditActionEnum = pgEnum("audit_action", [
    "auth.login",
    "auth.logout",
    "auth.failed",
    "staff.create",
    "staff.update",
    "staff.deactivate",
    "config.update",
    "data.create",
    "data.update",
    "data.delete"
  ]);
  
  /**
   * Module 2: Import Center enums
   */
  export const importSourceEnum = pgEnum("import_source", [
    "csv",
    "xlsx",
    "json",
    "unknown"
  ]);
  
  export const importStatusEnum = pgEnum("import_status", [
    "staged", // file accepted + stored, not yet mapped
    "mapped", // mapping configured
    "validated", // rows validated (may still contain errors)
    "committed", // committed into canonical tables
    "aborted" // intentionally stopped
  ]);
  
  export const importRowStatusEnum = pgEnum("import_row_status", [
    "pending",
    "valid",
    "invalid",
    "skipped",
    "committed"
  ]);
  
  /**
   * app_user
   *
   * Represents staff/operator identities.
   * NOTE: password hashing + auth provider integration are later modules.
   */
  export const appUser = pgTable(
    "app_user",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      email: text("email").notNull(),
      displayName: text("display_name").notNull(),
  
      role: text("role").notNull().default("staff"),
      isActive: boolean("is_active").notNull().default(true),
  
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
  
      // NOTE: application code should set this on update; DB triggers are also valid.
      updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow()
    },
    (t) => ({
      emailIdx: uniqueIndex("app_user_email_uidx").on(t.email),
      // Retained for compatibility / explicitness (uniqueIndex is already indexed)
      emailLookupIdx: index("app_user_email_idx").on(t.email)
    })
  );
  
  /**
   * audit_event
   *
   * Canonical audit log in the database.
   * Keeps payload flexible via jsonb.
   */
  export const auditEvent = pgTable(
    "audit_event",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      actorType: actorTypeEnum("actor_type").notNull(),
      actorUserId: uuid("actor_user_id").references(() => appUser.id, {
        onDelete: "set null"
      }),
  
      action: auditActionEnum("action").notNull(),
      summary: text("summary").notNull(),
  
      // structured details for forensics/debugging
      payload: jsonb("payload").notNull().default({}),
  
      // optional request context
      ip: inet("ip"),
      userAgent: text("user_agent"),
  
      occurredAt: timestamp("occurred_at", { withTimezone: true })
        .notNull()
        .defaultNow()
    },
    (t) => ({
      actorIdx: index("audit_event_actor_idx").on(t.actorType, t.actorUserId),
      actionIdx: index("audit_event_action_idx").on(t.action),
      occurredAtIdx: index("audit_event_occurred_at_idx").on(t.occurredAt)
    })
  );
  
  /**
   * Module 2: imports
   *
   * High-level import record (one file / payload).
   * Stores minimal file metadata + lifecycle status.
   */
  export const imports = pgTable(
    "imports",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      createdByUserId: uuid("created_by_user_id").references(() => appUser.id, {
        onDelete: "set null"
      }),
  
      source: importSourceEnum("source").notNull().default("unknown"),
      status: importStatusEnum("status").notNull().default("staged"),
  
      // File-ish metadata (even if content is stored elsewhere)
      originalName: text("original_name"),
      storedName: text("stored_name"),
      mimeType: text("mime_type"),
      sha256: text("sha256"),
      sizeBytes: integer("size_bytes"),
  
      // Flexible metadata (e.g., delimiter, sheet name, detected headers, notes)
      meta: jsonb("meta").notNull().default({}),
  
      // Aggregate stats (e.g., totalRows, validRows, invalidRows) updated by workers/routes
      stats: jsonb("stats").notNull().default({}),
  
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
      updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow()
    },
    (t) => ({
      statusIdx: index("imports_status_idx").on(t.status),
      sourceIdx: index("imports_source_idx").on(t.source),
      createdAtIdx: index("imports_created_at_idx").on(t.createdAt)
    })
  );
  
  /**
   * Module 2: import_mappings
   *
   * The mapping configuration for an import.
   * This can evolve (multiple mapping versions per import).
   */
  export const importMappings = pgTable(
    "import_mappings",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      importId: uuid("import_id")
        .notNull()
        .references(() => imports.id, { onDelete: "cascade" }),
  
      createdByUserId: uuid("created_by_user_id").references(() => appUser.id, {
        onDelete: "set null"
      }),
  
      // e.g., { columns: { "First Name": "person.firstName", ... }, transforms: {...} }
      mapping: jsonb("mapping").notNull().default({}),
      notes: text("notes"),
  
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow()
    },
    (t) => ({
      importIdx: index("import_mappings_import_idx").on(t.importId),
      createdAtIdx: index("import_mappings_created_at_idx").on(t.createdAt)
    })
  );
  
  /**
   * Module 2: import_rows
   *
   * Row-level staging, validation, and enrichment.
   */
  export const importRows = pgTable(
    "import_rows",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      importId: uuid("import_id")
        .notNull()
        .references(() => imports.id, { onDelete: "cascade" }),
  
      rowNumber: integer("row_number").notNull(),
  
      // Raw row as parsed from file
      raw: jsonb("raw").notNull().default({}),
  
      // Normalized representation after mapping/transforms
      normalized: jsonb("normalized").notNull().default({}),
  
      // Validation errors/warnings
      issues: jsonb("issues").notNull().default({}),
  
      status: importRowStatusEnum("status").notNull().default("pending"),
  
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
      updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow()
    },
    (t) => ({
      importIdx: index("import_rows_import_idx").on(t.importId),
      importRowNumIdx: index("import_rows_import_rownum_idx").on(
        t.importId,
        t.rowNumber
      ),
      // Prevent duplicate staging rows for the same import
      importRowNumUidx: uniqueIndex("import_rows_import_rownum_uidx").on(
        t.importId,
        t.rowNumber
      ),
      statusIdx: index("import_rows_status_idx").on(t.status)
    })
  );
  
  /**
   * Module 2: import_commits
   *
   * Records a commit operation (when staged rows are written into canonical tables).
   * Payload can include IDs created/updated, counts, and any reconciliation notes.
   */
  export const importCommits = pgTable(
    "import_commits",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      importId: uuid("import_id")
        .notNull()
        .references(() => imports.id, { onDelete: "cascade" }),
  
      committedByUserId: uuid("committed_by_user_id").references(() => appUser.id, {
        onDelete: "set null"
      }),
  
      summary: text("summary").notNull().default("Import committed"),
      payload: jsonb("payload").notNull().default({}),
  
      committedAt: timestamp("committed_at", { withTimezone: true })
        .notNull()
        .defaultNow()
    },
    (t) => ({
      importIdx: index("import_commits_import_idx").on(t.importId),
      committedAtIdx: index("import_commits_committed_at_idx").on(t.committedAt)
    })
  );
  