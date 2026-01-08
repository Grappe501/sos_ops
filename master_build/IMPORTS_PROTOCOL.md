# SOS OPS — IMPORTS & INGESTION PROTOCOL

This document defines how external data (spreadsheets, uploads, forms) enter SOS OPS.
All ingestion paths must follow this protocol to protect data integrity and provenance.

---

## 1) Import Philosophy

- Imports are **first-class events**, not one-off utilities
- Every import is auditable, replayable, and inspectable
- No “direct insert” imports are allowed
- Provenance is never discarded

---

## 2) Supported Import Types (Initial)

### 2.1 Spreadsheet Imports
- CSV
- XLSX

Used for:
- volunteers
- contacts
- legacy voter outreach lists (if authorized)

### 2.2 Programmatic Imports
- public registration logging
- future partner APIs

All programmatic imports still pass through validation and audit.

---

## 3) Import Lifecycle (Mandatory)

Every import follows these stages:

1. **Upload**
   - file stored with checksum
   - uploader identified
   - timestamp recorded

2. **Column Mapping**
   - user maps file columns → canonical fields
   - mappings can be saved and reused
   - unmapped columns preserved as raw JSON

3. **Validation**
   - format validation (email/phone)
   - required fields check
   - consent flags validation
   - duplicate detection

4. **Preview**
   - row counts
   - insert vs update counts
   - error rows
   - flagged duplicates

5. **Commit**
   - writes executed inside transaction
   - audit records written
   - commit summary persisted

No step may be skipped.

---

## 4) Deduplication Rules

### 4.1 Automatic merges (allowed)
- exact email match (normalized)
- exact phone match (E.164)

### 4.2 Soft matches (flag only)
- name + county
- name + email domain

Soft matches:
- must be surfaced to user
- never auto-merged

---

## 5) Import Data Model

Required tables:
- `imports`
- `import_mappings`
- `import_rows`
- `import_commits`

Each imported row must be traceable to:
- import_id
- source file
- original row JSON
- resulting entity ids

---

## 6) Error Handling

### 6.1 Row-level errors
- invalid email/phone
- missing required fields
- consent conflicts

Errors:
- logged
- surfaced in preview
- do not block valid rows unless critical

### 6.2 Import-level failures
- transaction rollback
- failure logged
- no partial commits without audit

---

## 7) Rollback Strategy

### 7.1 Logical rollback
- identify import_commit
- reverse inserted rows
- restore previous state for updates

Rollback actions:
- require admin role
- logged in audit_log

---

## 8) Performance Constraints

- large imports processed in batches
- progress visible to user
- timeouts handled gracefully
- resumable where possible

---

## 9) Security Controls

- file type validation
- file size limits
- virus scanning (if provider supports)
- rate limiting on uploads

---

## 10) Import UX Standards

- clear progress indicators
- human-readable error messages
- downloadable error report
- confirmation summary

---

## 11) Import Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Include:
- rationale
- scope
- mitigation
- timebox

---
