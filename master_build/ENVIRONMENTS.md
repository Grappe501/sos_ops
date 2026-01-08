# SOS OPS — ENVIRONENTS (Local / Dev / Staging / Prod)

This document defines the environment model, deployment flow, and configuration standards.
No module ships unless it conforms to this environment policy.

---

## 1) Canonical Environments

### 1.1 local
**Purpose:** developer machine workflow and rapid iteration  
**Traits:**
- local Postgres (or Neon/Supabase dev db if preferred)
- local `.env.local`
- local webhooks via tunneling (ngrok) when needed
- test phone numbers and email sinks only

### 1.2 dev
**Purpose:** shared team environment for active development  
**Traits:**
- shared dev database
- dev Twilio Messaging Service / numbers
- dev email sender
- webhook endpoints deployed on Vercel dev
- used for integration testing and demoing

### 1.3 staging
**Purpose:** production mirror and release candidate verification  
**Traits:**
- production-like database structure
- staging Twilio/email provider credentials
- strict RBAC on
- used for release rehearsals and restore drills
- **only approved branches deploy**

### 1.4 prod
**Purpose:** real campaign operations  
**Traits:**
- strongest protection
- audit always on
- backups enabled
- minimal admin access
- strict webhook verification required
- rate limiting enabled

---

## 2) Vercel Projects & Branching

### 2.1 Vercel projects
Recommended:
- **Single Vercel project** with:
  - preview deployments for PRs
  - staging environment variables
  - production environment variables

Alternate (only if needed):
- separate Vercel projects for staging and prod

### 2.2 Branching model (recommended)
- `main` → staging
- `prod` → production
- feature branches → preview deployments

Rules:
- No direct pushes to `prod`
- Every production release requires:
  - tests passing
  - staging validation
  - tagged release

---

## 3) Databases per Environment

### 3.1 Database separation (hard rule)
Each environment has its own Postgres instance/database:
- `sos_ops_local`
- `sos_ops_dev`
- `sos_ops_staging`
- `sos_ops_prod`

Never reuse credentials across environments.

### 3.2 Migration flow
- Migrations are applied:
  1) local
  2) dev
  3) staging
  4) prod
- No migration runs on prod unless it has been proven on staging.

### 3.3 Backups & restore drills
- prod: daily backups + monthly snapshot
- staging: weekly backups
- Restore drill: quarterly (restore prod snapshot into staging)

---

## 4) Provider Config per Environment

### 4.1 Twilio
Each environment must have:
- its own API key/token
- its own Messaging Service SID
- its own set of numbers (or pool)
- its own webhook URLs

**Hard rule:** dev/staging must not send to real voter/volunteer lists unless explicitly authorized and labeled.

### 4.2 Email provider
Each environment must have:
- its own API key
- its own sender identity
- its own webhook endpoints (bounces/unsubs)

Recommended:
- dev uses a sandbox or a dedicated dev subdomain
- staging uses a staging subdomain
- prod uses the official sending domain

---

## 5) Environment Variables (Standard Names)

### 5.1 Required variables (baseline)
These names are canonical. Adjust only with explicit documentation.

**Core**
- `APP_ENV` = `local|dev|staging|prod`
- `APP_URL` = base URL
- `AUTH_SECRET`
- `LOG_LEVEL`

**Database**
- `DATABASE_URL`

**Twilio**
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_MESSAGING_SERVICE_SID`
- `TWILIO_WEBHOOK_SIGNING_SECRET` (if used / recommended)

**Email provider**
- `EMAIL_PROVIDER` = `sendgrid|postmark`
- `EMAIL_API_KEY`
- `EMAIL_FROM_NAME`
- `EMAIL_FROM_EMAIL`
- `EMAIL_WEBHOOK_SIGNING_SECRET`

**Queues / jobs**
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

**Files**
- `BLOB_READ_WRITE_TOKEN` (if using Vercel Blob)

### 5.2 Prohibited variables
- Any secret hardcoded in code
- Any shared token across environments
- Any “temporary” secret left in `.env.example`

---

## 6) Webhooks per Environment

### 6.1 Required endpoints
- `POST /api/webhooks/twilio/inbound`
- `POST /api/webhooks/twilio/status`
- `POST /api/webhooks/email/events` (bounces/unsubs)

### 6.2 Verification
- Verify provider signatures where available
- If signature verification is not available, implement:
  - strict allowlist
  - token-based verification
  - rate limiting
  - logging

### 6.3 Failure policy
Webhook failures must:
- log an error with request id
- store a failure record (so we can replay)
- alert in staging/prod

---

## 7) Test Data Policy

### 7.1 What counts as test data
- fake voters
- test volunteers
- internal staff numbers/emails

### 7.2 Rules
- dev/staging messaging only to allowlisted numbers/emails by default
- prod can message real lists only with staff authorization

---

## 8) Deployment Checklist (per environment)

### 8.1 Pre-deploy
- tests pass
- migrations reviewed
- env vars present
- webhook endpoints configured

### 8.2 Deploy
- deploy to dev or staging
- run smoke tests

### 8.3 Post-deploy
- verify auth
- verify db connectivity
- verify webhook health endpoints (if present)
- verify message send to test recipient

---

## 9) Environment Exception Process
Any exception must be logged in:
- `master_build/RISKS_DECISIONS.md`

It must include:
- rationale
- timebox
- rollback plan
- approval record

---
