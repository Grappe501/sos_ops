# SOS OPS — MODULE INDEX (Zip Modules)

This document defines the canonical zip-module build sequence, deliverables, and acceptance criteria.
No module begins unless its scope and DoD are listed here.

---

## Module 0 — Foundation Scaffold (Vercel-first)
**Goal:** Create the stable shell every future module snaps into.

### Deliverables
- Monorepo skeleton (apps/packages/docs)
- Next.js app shell (App Router)
- Auth scaffold (staff login)
- RBAC skeleton (Admin/Staff/Organizer/Volunteer/Read-only)
- Audit logging helper (writes only)
- Dashboard layout + navigation
- Error handling baseline (logging + boundary)

### Acceptance Criteria
- Deploys to Vercel
- Staff can login and reach dashboard shell
- RBAC enforcement exists (even if minimal scopes)
- Every write action generates an audit record

### Non-Goals
- No imports
- No messaging
- No voter registration features

---

## Module 1 — Database Core (Schema + Views)
**Goal:** Establish the canonical tables and read views.

### Deliverables
- Postgres schema for:
  - users, roles, audit_log
  - people, volunteers
  - voters, registrations
  - tasks
- View layer:
  - v_volunteers_list
  - v_volunteer_profile
  - v_registrations_list
  - v_voter_profile
  - v_tasks_due
- Migration system and seed data

### Acceptance Criteria
- Dashboard lists render from DB views (not tables)
- Migrations run clean in local/dev/staging
- Seed data produces usable demo rows

---

## Module 2 — Import Center (Spreadsheet Ingestion)
**Goal:** Convert volunteer/contact spreadsheets into durable database records.

### Deliverables
- Upload CSV/XLSX
- Column mapping UI (save profiles)
- Validation + preview (error report)
- Commit pipeline with dedupe rules
- Import audit report + commit summary
- “Possible duplicates” queue (flag only)

### Acceptance Criteria
- You can import volunteer & contact spreadsheets end-to-end
- Dedupe works for email and phone normalization
- Every import commit is auditable and reversible (logical rollback)

---

## Module 3 — Volunteer Management Dashboard (CRM v1)
**Goal:** Operate volunteer program from one cockpit.

### Deliverables
- Volunteer list (filters, tags, county, status)
- Volunteer profile (notes, assignments, history)
- Onboarding stages
- Basic assignment capability (county/program)
- Activity feed from audit logs

### Acceptance Criteria
- Staff can manage volunteer lifecycle and assignments
- Views are fast and consistent
- Volunteer record is a single canonical person entity

---

## Module 4 — Messaging v1 (Twilio + Email)
**Goal:** Send 1:1 and bulk communications directly from the database.

### Deliverables
- Provider integration:
  - Twilio SMS (Messaging Service)
  - Email provider (SendGrid or Postmark)
- 1:1 message composer on profiles
- Bulk composer (segment-based)
- Templates (versioned)
- Delivery status tracking
- STOP/opt-out handling
- Quiet hours + throttling

### Acceptance Criteria
- Staff can send SMS/email 1:1 and bulk
- Replies/STOP are recorded and suppress future sends
- Delivery statuses populate correctly

---

## Module 5 — Voter Registration Logging (Public Landing)
**Goal:** Allow volunteers and partners to log newly registered voters statewide.

### Deliverables
- Public, mobile-first “Log a Registration” flow
- Create voter + registration record
- Capture volunteer attribution
- Minimal PII and consent fields
- Success confirmation and next-step prompt

### Acceptance Criteria
- Form submissions create correct DB records
- Attribution works
- Abuse protection exists (rate limiting + basic bot protection)

---

## Module 6 — Stewardship Engine (Tasks + Follow-ups)
**Goal:** Convert registrations into votes through a governed follow-up pipeline.

### Deliverables
- Pipeline stages (defined in STEWARDSHIP_PROTOCOL)
- Auto task generation on new registration
- Volunteer “My Voters / My Tasks” views
- Overdue + escalation rules
- Reminder generation (internal, optional outbound)

### Acceptance Criteria
- Every new registration generates the correct task chain
- Volunteers can see and work their tasks
- Overdue tasks are visible and reportable

---

## Module 7 — Pace & Reporting (50,000 by October)
**Goal:** Program-level execution visibility.

### Deliverables
- Goal progress dashboard
- Weekly pace vs required pace
- County leaderboard
- Volunteer leaderboard
- Exportable summary reports

### Acceptance Criteria
- Leadership can answer “are we on pace?” instantly
- Reports match DB truth (auditable queries)

---

## Module 8+ — Reserved OS Lanes (Future)
**Not built until explicitly authorized**
- Decisions / Risks / Cadence
- Finance
- Field operations expansions
- Advanced analytics and predictive targeting

---

## Module Packaging Standard
Every module ships with:
- `MODULE_README.md` (scope, DoD, non-goals)
- `MIGRATIONS.md` (if applicable)
- `TEST_PLAN.md`
- `RUNBOOK.md` (how to operate it)
- a zipped artifact and a git tag
