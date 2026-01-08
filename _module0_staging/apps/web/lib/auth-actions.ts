"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, getAuthConfig, setSessionCookie } from "./auth";
import { audit } from "./audit";

export async function login(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const { staffEmail, staffPasswordBcrypt } = getAuthConfig();

  if (!staffPasswordBcrypt.startsWith("$2")) {
    throw new Error("Server misconfigured: AUTH_STAFF_PASSWORD_BCRYPT missing/invalid.");
  }

  if (email !== staffEmail.trim().toLowerCase()) throw new Error("Invalid credentials.");

  const ok = await bcrypt.compare(password, staffPasswordBcrypt);
  if (!ok) throw new Error("Invalid credentials.");

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
