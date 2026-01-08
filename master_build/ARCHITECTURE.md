# SOS OPS — ARCHITECTURE (Vercel-First)

This document defines the canonical technical architecture for SOS OPS.
All build decisions must conform to this architecture unless an explicit exception is documented in `RISKS_DECISIONS.md`.

---

## 1) North Star Outcomes (What the system must do)

### 1.1 Two initial operating cockpits
1) **Volunteer Management**
- ingest volunteers/contacts from spreadsheets
- dedupe + source provenance
- segment, assign, and manage lifecycle
- email + text 1:1 and bulk from inside the dashboard

2) **Voter Registration Drive (50,000 by October)**
- public landing for volunteers/partners to log new registrations
- stewardship pipeline: confirm registration → education → polling info → vote plan → ballot help → voted
- task generation and reminders for volunteers and staff
- pace reporting by county/volunteer/week

### 1.2 Campaign-grade constraints
- withstand turnover
- keep PII safe
- audit all writes
- no “spreadsheet shadow systems”
- ship in zip modules without rewrites

---

## 2) System Topology

### 2.1 Runtime components
- **Web App (Dashboard + Public pages):** Next.js on Vercel
- **API surface:** Next.js Server Actions + API Routes for webhooks
- **Database:** Postgres (Neon or Supabase Postgres)
- **Queue/Jobs:** Upstash Redis + Vercel Cron
- **SMS:** Twilio (Messaging Service recommended)
- **Email:** SendGrid or Postmark
- **Files:** Vercel Blob (or S3-compatible storage)

### 2.2 Trust boundaries
- Browser is untrusted
- Public forms are untrusted
- All business logic and validation execute on server
- All writes are audited
- All reads are served through permissioned DB views

---

## 3) Monorepo Layout (Canonical)

