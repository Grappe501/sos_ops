import { eq } from "drizzle-orm";
import { createDbClient } from "./client.js";
import { appUser, auditEvent } from "./schema/core.js";

/**
 * Seed script (idempotent).
 *
 * Required:
 * - DATABASE_URL
 *
 * Optional:
 * - SOS_OPS_SEED_STAFF_EMAIL (default: "admin@sos-ops.local")
 * - SOS_OPS_SEED_STAFF_NAME  (default: "SOS OPS Admin")
 *
 * Usage:
 *   pnpm -C packages/db db:seed
 */
async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to run seeds");
  }

  const seedEmail = process.env.SOS_OPS_SEED_STAFF_EMAIL ?? "admin@sos-ops.local";
  const seedName = process.env.SOS_OPS_SEED_STAFF_NAME ?? "SOS OPS Admin";

  const { client, sql } = createDbClient(databaseUrl);

  try {
    // Ensure seed staff user exists
    const existing = await client
      .select({ id: appUser.id })
      .from(appUser)
      .where(eq(appUser.email, seedEmail))
      .limit(1);

    let userId: string | null = existing.length ? (existing[0]!.id as string) : null;

    if (!userId) {
      const inserted = await client
        .insert(appUser)
        .values({
          email: seedEmail,
          displayName: seedName,
          role: "admin",
          isActive: true
        })
        .returning({ id: appUser.id });

      userId = inserted[0]!.id as string;
      // eslint-disable-next-line no-console
      console.log(`Seeded staff user: ${seedEmail} (${userId})`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Seed staff user already exists: ${seedEmail} (${userId})`);
    }

    // Record an audit event using an existing enum action.
    await client.insert(auditEvent).values({
      actorType: "system",
      actorUserId: userId,
      action: "config.update",
      summary: "Database seed executed",
      payload: { seedEmail, seedName }
    });

    // eslint-disable-next-line no-console
    console.log("Seed audit event recorded.");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
