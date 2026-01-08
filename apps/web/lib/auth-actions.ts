"use server";

import { redirect } from "next/navigation";
import { createSession, setSessionCookie } from "./auth";
import { audit } from "./audit";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error("Missing required env var: " + name);
  return v;
}

export async function login(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const staffEmail = requireEnv("AUTH_STAFF_EMAIL").toLowerCase();
  const staffPassword = requireEnv("AUTH_STAFF_PASSWORD");

  if (email !== staffEmail) {
    throw new Error("Invalid credentials.");
  }

  if (password !== staffPassword) {
    throw new Error("Invalid credentials.");
  }

  const jwt = await createSession(email);
  setSessionCookie(jwt);

  await audit({
    action: "auth.login",
    entityType: "user",
    entityId: email,
    before: null,
    after: { email },
    source: "ui"
  });

  redirect("/app");
}
