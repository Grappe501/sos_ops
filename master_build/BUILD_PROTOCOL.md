# SOS OPS — BUILD & DELIVERY PROTOCOL

This document defines the **mechanical build protocol** between the Pilot (builder)
and the Operator (you). It exists to eliminate ambiguity, prevent partial installs,
and guarantee repeatable execution.

If a step is not in this document, it is not part of the build.

---

## 1) Core Build Contract

### 1.1 Delivery Model (Hard Rule)
- The Pilot delivers **ZIP FILES ONLY**
- Each ZIP is unpacked **over the existing project root**
- No patching
- No manual file edits
- No cherry-picking

The filesystem is the API.

---

## 2) Project Root Assumptions

At build start, the project root contains:


No other files or folders are assumed to exist.

Each module ZIP may add:
- new folders
- new files
- new configuration
- new code

But **must not delete** `master_build/`.

---

## 3) ZIP OVERWRITE RULES

### 3.1 Allowed
- Overwrite existing files
- Add new files
- Add new folders

### 3.2 Forbidden
- Silent deletion of files
- Renaming top-level folders without documentation
- Partial zips

If a file must be removed, it must be:
- explicitly documented
- listed in `MODULE_MANIFEST.json`

---

## 4) Module ZIP Contents

Each module ZIP:
- represents **one module only**
- aligns to `MODULE_INDEX.md`
- includes all code, config, and docs needed

Each ZIP must include:
- `MODULE_MANIFEST.json`
- all new/changed source files
- any new config templates
- updated docs (if applicable)

---

## 5) Local-First Execution Model

### 5.1 Local Server
- You run the server locally
- Local Postgres database
- Local auth
- Local dashboard access

Local is the **source of truth** for functional testing.

---

## 6) Vercel Deployment Model

### 6.1 What Goes to Vercel
- Dashboard UI (Next.js app)
- API routes (webhooks, public ingestion)
- Server actions

### 6.2 What Does NOT Go to Vercel
- Local database
- Local seed data
- Local-only admin scripts

---

## 7) Authentication Model (Initial)

### 7.1 Auth Type
- Basic email + password login
- Staff-only initially
- No OAuth in early modules

### 7.2 Environment Split
- Local: simple credentials
- Vercel: env-backed credentials

Auth must work identically in:
- local
- Vercel preview
- staging
- production

---

## 8) Environment Variables (Authoritative)

### 8.1 Source of Truth
- **Vercel Environment Variables UI**
- `.env.local` for local only

No secrets are hardcoded.

---

### 8.2 Canonical Variables (From Your Screenshot)

The following variables are considered **authoritative and approved**:

**Postgres**
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

**Supabase**
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_JWT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

These variables:
- must exist in Vercel
- must be mirrored locally in `.env.local`
- must never be committed

---

## 9) API Keys & Provider Keys

Additional provider keys (added in later modules):
- Twilio
- Email provider
- Redis / Upstash

These will be:
- documented per module
- added to Vercel manually
- referenced in module runbooks

---

## 10) Module Install Procedure (Every Time)

For each module ZIP:

1. Unzip **over project root**
2. Review `MODULE_MANIFEST.json`
3. Install dependencies (if listed)
4. Run migrations (if listed)
5. Start local server
6. Verify local functionality
7. Deploy to Vercel preview
8. Verify Vercel functionality
9. Enter Landing Strip phase

No steps skipped.

---

## 11) Testing Protocol

### 11.1 Local Testing (Required)
- app boots
- auth works
- core flows work
- no runtime errors

### 11.2 Vercel Testing (Required)
- preview deploy succeeds
- env vars resolved
- dashboard loads
- no provider calls to real data unless allowed

---

## 12) Failure Handling

If a module fails:
- stop immediately
- do not layer fixes blindly
- diagnose root cause
- fix inside the same module ZIP if in scope
- otherwise log deferred work

---

## 13) Communication Protocol

- The Pilot declares:
  - module start
  - phase transitions
  - landing strip entry
  - module done
- The Operator applies ZIPs and runs tests
- No silent changes

---

## 14) Authority & Enforcement

- The Pilot controls build order and structure
- The Operator controls deployment and credentials
- Disputes go to `RISKS_DECISIONS.md`

---

## 15) Final Rule

If something is confusing:
- we document it
- then we proceed

We do not proceed on assumptions.

---
