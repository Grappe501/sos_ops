import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";
import { getRoleForEmail } from "@sos-ops/core/rbac";

const SESSION_COOKIE = "sosops_session";

const sessionSchema = z.object({
  email: z.string().email(),
  role: z.string(),
  iat: z.number().optional(),
  exp: z.number().optional()
});

export type Session = z.infer<typeof sessionSchema>;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error("Missing required env var: " + name);
  return v;
}

function getKey() {
  const secret = requireEnv("AUTH_SECRET");
  return new TextEncoder().encode(secret);
}

export function getAuthConfig() {
  return {
    staffEmail: requireEnv("AUTH_STAFF_EMAIL"),
    staffPasswordBcrypt: requireEnv("AUTH_STAFF_PASSWORD_BCRYPT")
  };
}

export async function createSession(email: string): Promise<string> {
  const role = getRoleForEmail(email);
  const now = Math.floor(Date.now() / 1000);
  const key = getKey();

  return await new SignJWT({ email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + 60 * 60 * 12)
    .sign(key);
}

export async function readSession(): Promise<Session | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getKey());
    const parsed = sessionSchema.safeParse(payload);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const s = await readSession();
  if (!s) throw new Error("UNAUTHORIZED");
  return s;
}

export function setSessionCookie(jwt: string) {
  cookies().set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.APP_ENV === "prod",
    sameSite: "strict",
    path: "/"
  });
}

export function clearSessionCookie() {
  cookies().set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}
