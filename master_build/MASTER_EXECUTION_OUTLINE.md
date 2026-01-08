# SOS OPS — MASTER EXECUTION OUTLINE
(5-Level Zip Module Build Plan)

This document defines the **full execution outline** for SOS OPS.
It decomposes every zip module into phases with explicit exit criteria.

This is the authoritative build flight plan.

---

# MODULE 0 — FOUNDATION SCAFFOLD

## 0.1 Module Objective
Establish the non-negotiable system shell that every future module snaps into.

---

## 0.2 Phase 0 — Repository & Project Initialization
### Deliverables
- monorepo folder structure
- package boundaries established
- git initialized
- baseline README

### Exit Criteria
- repo builds
- lint/typecheck runs
- no app logic present

---

## 0.3 Phase 1 — Next.js App Shell
### Deliverables
- Next.js App Router scaffold
- dashboard shell layout
- placeholder routes
- error boundary

### Exit Criteria
- app runs locally
- app deploys to Vercel preview
- no runtime errors

---

## 0.4 Phase 2 — Auth & Session Scaffold
### Deliverables
- authentication flow
- protected routes
- session handling
- login/logout

### Exit Criteria
- staff user can log in
- protected routes enforced
- unauthenticated access blocked

---

## 0.5 Phase 3 — RBAC Skeleton
### Deliverables
- role definitions
- permission helpers
- role-based guards

### Exit Criteria
- role checks enforced server-side
- permission denial verified

---

## 0.6 Phase 4 — Audit Infrastructure
### Deliverables
- audit_log table
- audit helper utilities
- audit write on mutations

### Exit Criteria
- every write logs audit record
- audit visible in admin view

---

## 0.7 Phase 5 — Navigation & Feature Flag Rails
### Deliverables
- nav registry
- feature_flags table
- flag helpers

### Exit Criteria
- nav driven from single config
- flags can hide/show features

---

# MODULE 1 — DATABASE CORE

## 1.1 Module Objective
Create the canonical data model and safe read views.

---

## 1.2 Phase 0 — Migration Framework
### Deliverables
- migration tooling
- apply/rollback flow
- seed support

### Exit Criteria
- migrations apply cleanly in dev/staging

---

## 1.3 Phase 1 — Core Identity Tables
### Deliverables
- users
- roles
- user_roles
- audit_log

### Exit Criteria
- auth + RBAC backed by DB

---

## 1.4 Phase 2 — People & Volunteer Model
### Deliverables
- people
- volunteers
- consent

### Exit Criteria
- canonical person resolution works
- dedupe keys validated

---

## 1.5 Phase 3 — Voter Registration Model
### Deliverables
- voters
- registrations
- voter_pipeline_state
- tasks

### Exit Criteria
- registration records persist
- tasks can be created manually

---

## 1.6 Phase 4 — Read Views
### Deliverables
- v_volunteers_list
- v_volunteer_profile
- v_registrations_list
- v_voter_profile
- v_tasks_due

### Exit Criteria
- UI reads exclusively from views
- permissions enforced via views

---

# MODULE 2 — IMPORT CENTER

## 2.1 Module Objective
Safely ingest spreadsheets into canonical records.

---

## 2.2 Phase 0 — Upload & Storage
### Deliverables
- file upload
- blob storage integration
- checksum capture

### Exit Criteria
- files persist reliably
- size/type validation enforced

---

## 2.3 Phase 1 — Mapping Engine
### Deliverables
- column mapper UI
- mapping profile storage
- raw_payload preservation

### Exit Criteria
- mappings reusable
- unmapped data preserved

---

## 2.4 Phase 2 — Validation & Dedupe
### Deliverables
- email/phone normalization
- duplicate detection
- error reporting

### Exit Criteria
- duplicates flagged
- invalid rows reported

---

## 2.5 Phase 3 — Commit & Rollback
### Deliverables
- transactional commit
- import_commits
- logical rollback

### Exit Criteria
- imports auditable
- rollback succeeds

---

# MODULE 3 — VOLUNTEER MANAGEMENT (CRM)

## 3.1 Module Objective
Operate volunteer lifecycle from one cockpit.

---

## 3.2 Phase 0 — Volunteer Index
### Deliverables
- volunteer list
- filters
- saved views

### Exit Criteria
- fast list rendering
- filters persist

---

## 3.3 Phase 1 — Volunteer Profile
### Deliverables
- profile header
- notes
- assignments
- activity feed

### Exit Criteria
- full volunteer context visible

---

## 3.4 Phase 2 — Onboarding & Status
### Deliverables
- onboarding stages
- status transitions
- basic automation hooks

### Exit Criteria
- stage changes audited
- status reflected in lists

---

# MODULE 4 — MESSAGING V1

## 4.1 Module Objective
Send compliant SMS and email from the database.

---

## 4.2 Phase 0 — Provider Integration
### Deliverables
- Twilio adapter
- email adapter
- webhook handlers

### Exit Criteria
- test sends succeed
- webhooks verified

---

## 4.3 Phase 1 — Templates
### Deliverables
- template CRUD
- versioning
- previews

### Exit Criteria
- templates reusable
- edits audited

---

## 4.4 Phase 2 — 1:1 Messaging
### Deliverables
- profile composer
- message logging
- reply threading

### Exit Criteria
- replies captured
- opt-outs enforced

---

## 4.5 Phase 3 — Bulk Campaigns
### Deliverables
- segment builder
- throttling
- progress tracking

### Exit Criteria
- bulk sends safe
- failures handled

---

# MODULE 5 — VOTER REGISTRATION LOGGING

## 5.1 Module Objective
Capture statewide voter registrations at scale.

---

## 5.2 Phase 0 — Public Form
### Deliverables
- mobile-first form
- minimal fields
- abuse protection

### Exit Criteria
- submissions reliable
- spam controlled

---

## 5.3 Phase 1 — Attribution & Confirmation
### Deliverables
- volunteer attribution
- confirmation UI

### Exit Criteria
- attribution accurate

---

# MODULE 6 — STEWARDSHIP ENGINE

## 6.1 Module Objective
Turn registrations into votes.

---

## 6.2 Phase 0 — Pipeline Engine
### Deliverables
- pipeline state machine
- stage transitions

### Exit Criteria
- stages advance deterministically

---

## 6.3 Phase 1 — Task Automation
### Deliverables
- task generation
- due dates
- reassignment

### Exit Criteria
- tasks generated correctly

---

## 6.4 Phase 2 — Volunteer Steward View
### Deliverables
- my voters
- my tasks
- reminders

### Exit Criteria
- volunteers can operate independently

---

# MODULE 7 — PACE & REPORTING

## 7.1 Module Objective
Provide leadership-level execution visibility.

---

## 7.2 Phase 0 — Core Metrics
### Deliverables
- registration counts
- pace calculations

### Exit Criteria
- metrics match canon

---

## 7.3 Phase 1 — Dashboards
### Deliverables
- progress widgets
- leaderboards

### Exit Criteria
- leadership answers “are we on pace?”

---

# END OF MASTER EXECUTION OUTLINE
