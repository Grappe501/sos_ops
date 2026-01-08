CREATE TYPE "public"."actor_type" AS ENUM('system', 'staff');--> statement-breakpoint
CREATE TYPE "public"."audit_action" AS ENUM('auth.login', 'auth.logout', 'auth.failed', 'staff.create', 'staff.update', 'staff.deactivate', 'config.update', 'data.create', 'data.update', 'data.delete');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"display_name" text NOT NULL,
	"role" text DEFAULT 'staff' NOT NULL,
	"is_active" text DEFAULT 'true' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_type" "actor_type" NOT NULL,
	"actor_user_id" uuid,
	"action" "audit_action" NOT NULL,
	"summary" text NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"ip" "inet",
	"user_agent" text,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "audit_event" ADD CONSTRAINT "audit_event_actor_user_id_app_user_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."app_user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "app_user_email_idx" ON "app_user" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_event_actor_idx" ON "audit_event" USING btree ("actor_type","actor_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_event_action_idx" ON "audit_event" USING btree ("action");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_event_occurred_at_idx" ON "audit_event" USING btree ("occurred_at");