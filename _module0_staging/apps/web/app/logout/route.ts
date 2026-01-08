import { NextResponse } from "next/server";
import { clearSessionCookie } from "../../lib/auth";
import { audit } from "../../lib/audit";

export async function GET() {
  clearSessionCookie();
  await audit({
    action: "auth.logout",
    entityType: "user",
    entityId: "unknown",
    before: null,
    after: null,
    source: "ui"
  });
  return NextResponse.redirect(new URL("/", process.env.APP_URL ?? "http://localhost:3000"));
}
