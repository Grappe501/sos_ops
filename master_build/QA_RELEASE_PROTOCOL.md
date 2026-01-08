# SOS OPS — QA & RELEASE PROTOCOL

This document defines how SOS OPS ensures quality, stability, and safe delivery.
No module ships without passing these gates.

---

## 1) Quality Philosophy

- Fast is good; **correct is required**
- Production incidents cost more than delayed features
- Every module must survive handoff to a new staffer

---

## 2) Test Layers (Minimum Required)

### 2.1 Unit Tests
Required for:
- permission logic
- deduplication logic
- task generation rules
- messaging suppression rules

### 2.2 Integration Tests
Required for:
- import pipeline (happy path + failures)
- messaging provider adapters (stubbed)
- webhook handlers (signature verification)

### 2.3 End-to-End Smoke Tests
Required scenarios:
- login
- import a spreadsheet
- send SMS to test number
- submit public registration form
- verify task creation

---

## 3) Environment Gatekeeping

### 3.1 Local
- tests encouraged, not required

### 3.2 Dev
- core tests must pass
- used for active development

### 3.3 Staging
- full test suite required
- migrations verified
- messaging tested against allowlist

### 3.4 Prod
- staging sign-off required
- tagged release required
- rollback plan confirmed

---

## 4) Release Process (Per Module)

### 4.1 Pre-Release Checklist
- scope complete
- tests passing
- migrations reviewed
- documentation updated
- secrets verified
- rollback plan ready

### 4.2 Release Steps
1. merge to staging branch
2. deploy to staging
3. run smoke tests
4. approve release
5. tag release
6. deploy to prod

---

## 5) Rollback Strategy

### 5.1 Code rollback
- revert to previous tag
- redeploy

### 5.2 Data rollback
- logical rollback via import_commits or audit
- restore from backup if required

Rollback decision logged.

---

## 6) Post-Release Verification

- login works
- critical dashboards load
- messaging test send succeeds
- no error spike observed

---

## 7) Incident Handling During Release

- pause deployment
- assess impact
- rollback if needed
- document incident

---

## 8) QA Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Include:
- reason
- scope
- mitigation
- timebox

---
