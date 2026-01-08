# SOS OPS — DATA GOVERNANCE & MODEL CONSTITUTION

This document defines how data is modeled, written, read, audited, and evolved in SOS OPS.
All schema and query decisions must comply with this document.

---

## 1) Data Philosophy

### 1.1 Database is the source of truth
- No parallel “truth” in spreadsheets
- No business logic hidden in UI state
- No derived data without lineage

### 1.2 Write once, read many
- Tables are authoritative write targets
- Views are authoritative read interfaces
- Reports and dashboards consume views, not tables

---

## 2) Canonical Entity Model

### 2.1 Identity & Access
- `users`
- `roles`
- `user_roles`

Users represent authenticated actors (staff, organizers, volunteers with login).

---

### 2.2 Audit & Governance
- `audit_log`
- `job_runs` (when jobs are introduced)

Every mutation must be traceable.

---

### 2.3 People Model (Critical)
**`people` is the canonical human record.**

All other human-related tables reference `people.id`.

Tables:
- `people`
  - name fields
  - normalized email/phone
  - created_at, source
- `volunteers`
  - people_id (FK)
  - status, onboarding_stage
  - county, availability
- `consent`
  - people_id (FK)
  - sms_opt_in
  - email_opt_in
  - consent_source, timestamp

**Rule:**  
There is never more than one `people` record for the same human unless explicitly flagged as unresolved duplicate.

---

### 2.4 Voter Registration Model
- `voters`
  - people_id (FK, nullable if minimal data)
  - county
  - registration_status
- `registrations`
  - voter_id
  - registered_by_volunteer_id
  - date, method, location
- `voter_pipeline_state`
  - voter_id
  - current_stage
  - last_advanced_at
- `tasks`
  - related_entity_type/id
  - assigned_to_user_id
  - due_date
  - status

---

### 2.5 Messaging Model
- `message_templates`
- `message_campaigns`
- `message_recipients`
- `message_events`
- `opt_outs`

Messages are immutable once sent.

---

### 2.6 Imports & Provenance
- `imports`
- `import_mappings`
- `import_rows`
- `import_commits`

Every imported row must be traceable to:
- source file
- uploader
- timestamp
- mapping profile

---

## 3) Naming & Conventions

### 3.1 Tables
- snake_case
- plural nouns

### 3.2 Views
- prefixed with `v_`
- describe intent, not implementation
  - `v_volunteers_list`
  - `v_voter_pipeline`

### 3.3 Columns
- clear, explicit names
- avoid abbreviations
- timestamps always UTC

---

## 4) Views as Permission Gates

### 4.1 View responsibilities
Views may:
- join tables
- derive fields
- enforce row-level security
- filter based on role or ownership

Views must not:
- mutate data
- hide side effects
- embed non-deterministic logic

---

## 5) Audit Requirements

### 5.1 What must be audited
- all creates
- all updates
- all deletes
- all message sends
- all imports
- all job actions

### 5.2 Audit fields (minimum)
- actor_id
- entity_type
- entity_id
- action
- before_state
- after_state
- source
- request_id
- timestamp

---

## 6) Deduplication & Identity Resolution

### 6.1 Automatic dedupe rules
- email exact match (normalized)
- phone exact match (E.164)

### 6.2 Soft matching
- name + county
- name + last_contacted

Soft matches must:
- be flagged
- never auto-merged

### 6.3 Merge protocol (future)
- explicit user action
- audit logged
- reversible

---

## 7) Data Retention & Deletion

### 7.1 Retention
- campaign data retained for campaign duration
- post-campaign archival plan required
- deletion rules documented later

### 7.2 Deletion rules
- prefer soft delete
- hard deletes only for:
  - erroneous test data
  - legal compliance

---

## 8) Data Quality Checks

### 8.1 Required checks
- missing consent flags
- invalid email/phone formats
- orphaned foreign keys
- overdue tasks

### 8.2 Reporting
- surfaced in admin dashboard
- logged for follow-up

---

## 9) Schema Evolution

### 9.1 Migration discipline
- every schema change via migration
- migrations reviewed
- migrations tested in staging before prod

### 9.2 Breaking changes
- require migration plan
- require rollback strategy
- require leadership sign-off

---

## 10) Data Governance Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Include:
- reason
- scope
- mitigation
- timebox

---
