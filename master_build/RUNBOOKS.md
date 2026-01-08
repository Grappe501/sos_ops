# SOS OPS — RUNBOOKS (Operations & Continuity)

This document defines how SOS OPS is operated day-to-day and how continuity is preserved
during staff turnover, incidents, or high-pressure campaign moments.

---

## 1) Purpose of Runbooks

Runbooks exist so that:
- no single person is a point of failure
- operations continue under stress
- new staff can onboard quickly
- incidents are handled consistently

Every critical workflow must have a runbook entry.

---

## 2) Core Operational Runbooks

### 2.1 Daily Operations (Staff)
- review dashboards
- check overdue tasks
- review failed messages
- monitor new registrations
- address data quality alerts

### 2.2 Volunteer Operations
- onboarding new volunteers
- assigning counties/programs
- monitoring volunteer task completion
- reassignment when volunteers go inactive

### 2.3 Voter Registration Program Ops
- daily registration counts
- stewardship pipeline health
- stalled registrations
- volunteer follow-up compliance

---

## 3) Messaging Operations Runbooks

### 3.1 SMS Campaign Launch
Steps:
1. verify segment
2. verify consent
3. send test message
4. confirm throttle
5. launch campaign
6. monitor delivery and replies

### 3.2 SMS Incident (STOP surge, failures)
Steps:
1. pause campaign
2. review inbound replies
3. verify suppression rules
4. communicate with leadership if needed
5. resume or terminate campaign

### 3.3 Email Campaign Launch
Steps:
1. verify template
2. verify unsubscribe link
3. test send
4. launch
5. monitor bounces/unsubs

---

## 4) Import Operations Runbooks

### 4.1 Spreadsheet Import
Steps:
1. validate file structure
2. map columns
3. preview results
4. review dedupe flags
5. commit import
6. verify counts and spot-check

### 4.2 Import Failure
Steps:
1. stop import
2. review error log
3. correct mapping or data
4. retry or rollback

---

## 5) Incident Response Runbooks

### 5.1 Messaging Failure
- pause outbound sends
- verify provider status
- inspect logs
- retry or escalate

### 5.2 Data Issue
- identify affected records
- stop further writes if needed
- apply logical rollback
- document incident

### 5.3 Security Incident
- rotate affected secrets
- revoke access
- assess data exposure
- document and notify leadership

---

## 6) Staff Turnover Runbook

When staff leaves:
1. revoke access
2. rotate relevant secrets
3. reassign owned tasks
4. transfer documentation
5. audit recent activity

---

## 7) Election-Critical Period Runbooks

### 7.1 GOTV Final Weeks
- lock schema changes
- freeze non-essential deploys
- increase monitoring
- daily leadership reporting

### 7.2 Election Day
- pause non-essential messaging
- focus on vote confirmation tasks
- monitor inbound voter questions
- log issues for post-mortem

---

## 8) Post-Election Runbook (Reserved)
- archive data
- export required reports
- shut down messaging
- credential rotation
- system snapshot

---

## 9) Runbook Governance

- runbooks updated as system evolves
- changes reviewed
- runbooks referenced in training

---
