# make_module0_min.ps1
# Minimal, line-wrap-safe generator for Module 0 scaffold zip.

$ErrorActionPreference = "Stop"
$version = "0.1.0"
$zipName = "sosops_module_0_v$version.zip"
$staging = Join-Path $PWD "_module0_staging"

if (Test-Path $staging) { Remove-Item -Recurse -Force $staging }
New-Item -ItemType Directory -Path $staging | Out-Null

function W([string]$rel, [string]$content) {
  $full = Join-Path $staging $rel
  $dir = Split-Path $full -Parent
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  Set-Content -Path $full -Value $content -Encoding UTF8
}

# Root workspace
W "package.json" @'
{
  "name": "sos-ops",
  "private": true,
  "packageManager": "pnpm@9.12.3",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "pnpm -C apps/web dev",
    "build": "pnpm -C apps/web build",
    "start": "pnpm -C apps/web start",
    "lint": "pnpm -C apps/web lint",
    "typecheck": "pnpm -C apps/web typecheck"
  }
}
'@

W "pnpm-workspace.yaml" @'
packages:
  - "apps/*"
  - "packages/*"
'@

W ".gitignore" @'
node_modules
.next
dist
.env
.env.*
!.env.example
.DS_Store
var
'@

W ".env.example" @'
APP_ENV=local
APP_URL=http://localhost:3000

AUTH_SECRET=replace-me-with-long-random-string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sos_ops

AUTH_STAFF_EMAIL=admin@example.com
AUTH_STAFF_PASSWORD_BCRYPT=$2b$12$replace_with_bcrypt_hash

AUDIT_LOG_PATH=./var/audit.log
'@

W "README.md" @'
# SOS OPS — Module 0 (Foundation Scaffold)

Run locally:
1) Copy .env.example -> .env.local and set values.
2) pnpm install
3) pnpm dev
4) http://localhost:3000/login

Note: Module 0 uses file-based audit logging. DB-backed audit arrives Module 1.
'@

# Module docs
W "module_0/MODULE_MANIFEST.json" @'
{
  "module_id": "module_0_foundation",
  "module_name": "Foundation Scaffold",
  "version": "0.1.0",
  "depends_on": [],
  "adds": {
    "routes": ["/", "/login", "/app", "/app/admin"],
    "db_tables": [],
    "db_views": [],
    "jobs": [],
    "env_vars": ["AUTH_SECRET", "DATABASE_URL", "AUTH_STAFF_EMAIL", "AUTH_STAFF_PASSWORD_BCRYPT", "AUDIT_LOG_PATH"],
    "feature_flags": []
  },
  "manual_steps": [
    "Copy .env.example to .env.local and set AUTH_SECRET, DATABASE_URL, AUTH_STAFF_EMAIL, AUTH_STAFF_PASSWORD_BCRYPT",
    "Run pnpm install",
    "Run pnpm dev",
    "For Vercel: set env vars in project settings; deploy apps/web"
  ],
  "rollback_steps": [
    "Replace project root with prior module zip/tag (no DB changes in Module 0)."
  ],
  "notes": [
    "Module 0 uses file-based audit logging; DB audit arrives Module 1.",
    "Auth is env-backed (single staff user) to satisfy early deployment."
  ]
}
'@

W "module_0/MODULE_README.md" @'
# Module 0 — Foundation Scaffold

Scope:
- Monorepo skeleton (apps/packages)
- Next.js dashboard shell
- Env-backed credentials login (email + password)
- RBAC skeleton rails
- Nav registry
- File-based audit logging

Non-goals:
- No DB migrations
- No imports
- No messaging
- No voter registration flows

Acceptance:
- Runs locally
- Deploys to Vercel
- Protected routes enforced
- Audit event written on sample action
'@

W "module_0/TEST_PLAN.md" @'
# Module 0 Test Plan

Local:
- pnpm install
- set .env.local (bcrypt required)
- pnpm dev
- login at /login
- go to /app
- click "Create sample audit event"
- verify var/audit.log updated

Vercel:
- set env vars
- deploy
- repeat login and audit
'@

W "module_0/RUNBOOK.md" @'
# Module 0 Runbook

- Login uses AUTH_STAFF_EMAIL and AUTH_STAFF_PASSWORD_BCRYPT.
- Audit writes JSONL to AUDIT_LOG_PATH.

Rollback:
- replace project root with previous zip/tag
'@

W "module_0/CHANGELOG.md" @'
# Changelog — Module 0

0.1.0
- monorepo skeleton
- next.js dashboard shell
- env-backed login
- minimal RBAC rails
- file-based audit
'@

# apps/web
W "apps/web/package.json" @'
{
  "name": "@sos-ops/web",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "next": "14.2.11",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "zod": "3.23.8",
    "bcryptjs": "2.4.3",
    "jose": "5.9.6"
  },
  "devDependencies": {
    "@types/node": "20.14.12",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "typescript": "5.5.4",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.11"
  }
}
'@

W "apps/web/next.config.mjs" @'
/** @type {import("next").NextConfig} */
const nextConfig = { reactStrictMode: true };
export default nextConfig;
'@

W "apps/web/tsconfig.json" @'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@sos-ops/core/*": ["../../packages/core/src/*"] }
  },
  "include": ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@

W "apps/web/app/globals.css" @'
:root { color-scheme: light; }
*{ box-sizing:border-box; }
body{ margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background:#f6f7f9; color:#111; }
a{ color:inherit; text-decoration:none; }
.container{ max-width:1100px; margin:0 auto; padding:24px; }
.card{ background:white; border-radius:14px; padding:16px; box-shadow:0 1px 2px rgba(0,0,0,.06); border:1px solid rgba(0,0,0,.06); }
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:10px; padding:10px 12px; border:1px solid rgba(0,0,0,.12); background:#111; color:white; cursor:pointer; }
.btn.secondary{ background:white; color:#111; }
.input{ width:100%; padding:10px 12px; border-radius:10px; border:1px solid rgba(0,0,0,.18); }
.muted{ color:#555; }
.nav{ display:flex; flex-direction:column; gap:8px; }
.badge{ font-size:12px; padding:4px 8px; border-radius:999px; background:#eef2ff; border:1px solid #dbe2ff; }
'@

W "apps/web/app/layout.tsx" @'
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "SOS OPS",
  description: "Kelly Grappe Campaign Operating System"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
'@

W "apps/web/app/page.tsx" @'
export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
          <div>
            <h1 style={{margin:"0 0 6px 0"}}>SOS OPS</h1>
            <p className="muted" style={{margin:0}}>
              Foundation scaffold is live. Use the dashboard to operate campaign programs.
            </p>
          </div>
          <a className="btn" href="/login">Staff Login</a>
        </div>
      </div>
    </main>
  );
}
'@

W "apps/web/app/(auth)/login/page.tsx" @'
import LoginForm from "../../../components/LoginForm";
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="container" style={{maxWidth:520}}>
      <div className="card">
        <h1 style={{marginTop:0}}>Staff Login</h1>
        <p className="muted">Use your configured email and password.</p>
        <LoginForm />
      </div>
      <p className="muted" style={{fontSize:12, marginTop:12}}>
        Module 0 auth is env-backed for speed. DB-backed users arrive in Module 1.
      </p>
    </main>
  );
}
'@

W "apps/web/app/app/layout.tsx" @'
import type { ReactNode } from "react";
import { requireSession } from "../lib/auth";
import { AppShell } from "../../components/AppShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();
  return <AppShell session={session}>{children}</AppShell>;
}
'@

W "apps/web/app/app/page.tsx" @'
import { audit } from "../lib/audit";
export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  async function createSampleAudit() {
    "use server";
    await audit({
      action: "sample.write",
      entityType: "system",
      entityId: "module_0",
      after: { hello: "world" },
      before: null,
      source: "ui"
    });
  }

  return (
    <main className="container">
      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
          <div>
            <h1 style={{margin:"0 0 6px 0"}}>Dashboard</h1>
            <p className="muted" style={{margin:0}}>
              You are authenticated. Module 0 provides shell, auth, RBAC rails, and audit logging.
            </p>
          </div>
          <form action={createSampleAudit}>
            <button className="btn" type="submit">Create sample audit event</button>
          </form>
        </div>
      </div>

      <div style={{height:16}} />

      <div className="card">
        <h2 style={{marginTop:0}}>Next Modules</h2>
        <ol className="muted" style={{marginTop:8}}>
          <li>Module 1 — Database core (tables + views + migrations)</li>
          <li>Module 2 — Import center</li>
          <li>Module 3 — Volunteer CRM</li>
          <li>Module 4 — Messaging</li>
        </ol>
      </div>
    </main>
  );
}
'@

W "apps/web/app/app/admin/page.tsx" @'
import { readAuditTail } from "../../lib/audit";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const tail = await readAuditTail(50);
  return (
    <main className="container">
      <div className="card">
        <h1 style={{marginTop:0}}>Admin</h1>
        <p className="muted">Module 0 shows file-based audit tail (latest events).</p>
      </div>

      <div style={{height:16}} />

      <div className="card" style={{overflow:"auto"}}>
        <h2 style={{marginTop:0}}>Audit Tail</h2>
        <pre style={{whiteSpace:"pre-wrap", margin:0, fontSize:12}}>
{tail.length ? tail.join("\n") : "No audit events yet."}
        </pre>
      </div>
    </main>
  );
}
'@

W "apps/web/app/logout/route.ts" @'
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
'@

W "apps/web/middleware.ts" @'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "sosops_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/app")) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/app/:path*"] };
'@

W "apps/web/components/AppShell.tsx" @'
import type { ReactNode } from "react";
import Link from "next/link";
import { navItems } from "@sos-ops/core/nav";
import type { Session } from "../lib/auth";

export function AppShell({ children, session }: { children: ReactNode; session: Session }) {
  return (
    <div style={{display:"grid", gridTemplateColumns:"260px 1fr", minHeight:"100vh"}}>
      <aside style={{padding:16, borderRight:"1px solid rgba(0,0,0,.08)", background:"#fff"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
          <div>
            <div style={{fontWeight:800}}>SOS OPS</div>
            <div className="muted" style={{fontSize:12}}>Module 0</div>
          </div>
          <span className="badge">{session.role}</span>
        </div>

        <div style={{height:16}} />
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} className="card" style={{padding:10}} href={item.href}>
              <div style={{fontWeight:700}}>{item.label}</div>
              {item.description ? <div className="muted" style={{fontSize:12}}>{item.description}</div> : null}
            </Link>
          ))}
        </nav>

        <div style={{height:16}} />
        <Link className="btn secondary" href="/logout">Logout</Link>
      </aside>

      <div>
        <header style={{padding:16, borderBottom:"1px solid rgba(0,0,0,.08)", background:"#fff"}}>
          <div className="container" style={{padding:0, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <div className="muted">Kelly Grappe — Arkansas SOS Ops</div>
            <div className="muted" style={{fontSize:12}}>Logged in as {session.email}</div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
'@

W "apps/web/components/LoginForm.tsx" @'
"use client";

import { useState } from "react";
import { login } from "../lib/auth-actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        try {
          await login(formData);
        } catch (e: any) {
          setError(e?.message ?? "Login failed");
        }
      }}
      style={{display:"grid", gap:12}}
    >
      <label>
        <div style={{fontWeight:600, marginBottom:6}}>Email</div>
        <input className="input" name="email" type="email" required />
      </label>

      <label>
        <div style={{fontWeight:600, marginBottom:6}}>Password</div>
        <input className="input" name="password" type="password" required />
      </label>

      {error ? <div style={{color:"#b00020", fontSize:13}}>{error}</div> : null}
      <button className="btn" type="submit">Sign in</button>
    </form>
  );
}
'@

W "apps/web/lib/auth.ts" @'
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
'@

W "apps/web/lib/auth-actions.ts" @'
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
'@

W "apps/web/lib/audit.ts" @'
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
'@

# packages/core
W "packages/core/package.json" @'
{ "name": "@sos-ops/core", "version": "0.1.0", "main": "src/index.ts", "type": "module" }
'@

W "packages/core/src/index.ts" @'
export * from "./nav";
export * from "./rbac";
'@

W "packages/core/src/nav.ts" @'
export type NavItem = { href: string; label: string; description?: string };

export const navItems: NavItem[] = [
  { href: "/app", label: "Home", description: "Dashboard overview" },
  { href: "/app/admin", label: "Admin", description: "Audit tail and system status" }
];
'@

W "packages/core/src/rbac.ts" @'
export type Role = "admin" | "staff" | "organizer" | "volunteer" | "read_only";

/**
 * Module 0 RBAC is intentionally minimal:
 * - Single env-backed staff login treated as admin.
 * - Module 1 introduces DB-backed roles and scoping.
 */
export function getRoleForEmail(_email: string): Role {
  return "admin";
}
'@

# placeholder packages
foreach ($p in @("ui","messaging","db")) {
  W ("packages/{0}/package.json" -f $p) ('{ "name": "@sos-ops/' + $p + '", "version": "0.1.0", "main": "src/index.ts", "type": "module" }')
  W ("packages/{0}/src/index.ts" -f $p) ("// " + $p + " placeholder — implemented in later modules.`n")
}

# Zip
if (Test-Path $zipName) { Remove-Item $zipName -Force }
Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $zipName -Force

Write-Host ("Created {0}" -f $zipName)
Write-Host "Unzip over project root."
Write-Host "Then run: pnpm install; copy .env.example to .env.local; pnpm dev"
