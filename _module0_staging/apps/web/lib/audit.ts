import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export type AuditEvent = {
  at?: string;
  requestId?: string;
  actorEmail?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  before: unknown | null;
  after: unknown | null;
  source: "ui" | "import" | "job" | "api";
};

function getLogPath(): string {
  return process.env.AUDIT_LOG_PATH || "./var/audit.log";
}

export async function audit(event: AuditEvent): Promise<void> {
  const p = getLogPath();
  const dir = path.dirname(p);
  await fs.mkdir(dir, { recursive: true });

  const requestId = event.requestId || crypto.randomUUID();
  const line: AuditEvent = { ...event, at: new Date().toISOString(), requestId };

  await fs.appendFile(p, JSON.stringify(line) + "\n", "utf8");
}

export async function readAuditTail(lines: number): Promise<string[]> {
  const p = getLogPath();
  try {
    const content = await fs.readFile(p, "utf8");
    const arr = content.trim().split(/\r?\n/).filter(Boolean);
    return arr.slice(-Math.max(1, lines));
  } catch {
    return [];
  }
}
