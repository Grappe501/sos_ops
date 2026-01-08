# SOS OPS — VERCEL OPERATIONS & DEPLOYMENT RULES

This document defines how SOS OPS is deployed, operated, and hardened on Vercel.
The goal is boring deploys, predictable behavior, and zero surprises during GOTV.

---

## 1) Vercel-First Doctrine

- Vercel is the canonical runtime
- No shadow infrastructure
- All deploy behavior must be reproducible across environments
- Preview deploys are used aggressively to reduce risk

---

## 2) Vercel Project Configuration

### 2.1 Project Setup
- Single Vercel project preferred
- Environments:
  - Preview (PRs)
  - Staging (`main` branch)
  - Production (`prod` branch)

### 2.2 Branch Rules
- `main` → staging
- `prod` → production
- feature branches → preview deploys

No direct pushes to `prod`.

---

## 3) Runtime & Performance Rules

### 3.1 Runtime Selection
- Default runtime: **Node.js**
- Edge runtime only when explicitly justified (documented in RISKS_DECISIONS)
- Webhooks must run on Node (signature verification reliability)

### 3.2 Cold Start Strategy
- Prefer server actions over API routes
- Avoid heavy initialization in request scope
- Reuse DB connections via pooled client

---

## 4) Environment Variables

### 4.1 Source of Truth
- All non-local secrets live in Vercel
- No fallback values in code
- Missing env vars fail fast at startup

### 4.2 Environment Scoping
- Variables must be scoped to:
  - Preview
  - Staging
  - Production

Never rely on Preview vars in prod.

---

## 5) API Route Conventions

### 5.1 When to use API routes
API routes are allowed only for:
- webhooks (Twilio, email)
- unauthenticated public ingestion endpoints
- cron-triggered endpoints (if needed)

All authenticated writes should prefer server actions.

### 5.2 Route Structure
- `/api/webhooks/*`
- `/api/public/*`
- `/api/internal/*` (cron / system)

---

## 6) Webhook Hardening

### 6.1 Required Controls
Every webhook route must:
- verify provider signature
- validate timestamp / replay window
- log raw payload checksum
- persist a `webhook_event` record

### 6.2 Failure Handling
- failures logged with request id
- retries handled safely
- alerting enabled for repeated failures

---

## 7) Cron Jobs (Vercel Cron)

### 7.1 Canonical Cron Registry
All cron jobs must be documented in:
- this file
- module runbooks

### 7.2 Initial Cron Jobs (Planned)
- nightly stewardship task reconciliation
- overdue task escalation check
- messaging delivery reconciliation
- data quality checks

### 7.3 Cron Rules
- cron endpoints must be authenticated
- no heavy processing inline (enqueue jobs)
- idempotent execution required

---

## 8) Build & Deploy Pipeline

### 8.1 Build Steps
- install dependencies
- typecheck
- lint
- run tests (where configured)

### 8.2 Deployment Gates
- staging deploy requires tests passing
- prod deploy requires:
  - staging validation
  - tagged release
  - rollback plan confirmed

---

## 9) Logging & Observability on Vercel

### 9.1 Required Logging
- request id
- environment
- user id (if authenticated)
- error stack traces (sanitized)

### 9.2 Error Tracking
- Sentry (or equivalent) recommended
- staging + prod only
- alert thresholds configured

---

## 10) File Uploads & Size Limits

### 10.1 Upload Strategy
- large files uploaded directly to blob storage
- metadata passed to server for processing
- avoid large request bodies

### 10.2 Limits
- enforce file size limits
- enforce file type validation

---

## 11) Preview Deployment Rules

- preview deploys are not allowed to:
  - send real SMS
  - send real bulk email
- preview environments use:
  - test providers
  - allowlists

---

## 12) GOTV Freeze Protocol

During final GOTV window:
- schema changes frozen
- non-critical deploys paused
- increased monitoring
- emergency fixes only (logged)

---

## 13) Vercel Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Include:
- reason
- scope
- mitigation
- timebox

---
