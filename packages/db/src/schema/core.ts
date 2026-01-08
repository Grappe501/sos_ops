import {
    pgTable,
    uuid,
    text,
    timestamp,
    pgEnum,
    jsonb,
    inet,
    index
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
  
      // Future-facing fields (safe to add now; may be null initially)
      role: text("role").notNull().default("staff"),
      isActive: text("is_active").notNull().default("true"),
  
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
      updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow()
    },
    (t) => ({
      emailIdx: index("app_user_email_idx").on(t.email)
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
  