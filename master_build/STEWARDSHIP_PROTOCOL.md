# SOS OPS — VOTER REGISTRATION STEWARDSHIP PROTOCOL

This document defines how SOS OPS converts voter registrations into *successful votes*.
This is a governed program, not an ad-hoc follow-up system.

---

## 1) Stewardship Philosophy

- Registration is the **beginning**, not the win
- Every registered voter deserves follow-through
- Volunteers are accountable, but supported
- The system generates discipline automatically

---

## 2) Canonical Stewardship Pipeline

Every registered voter moves through the following stages:

1. **Registration Logged**
2. **Registration Confirmed**
3. **Education Class Invited**
4. **Polling Location & Voting Method Confirmed**
5. **Vote Plan Created**
6. **Ballot Questions Addressed**
7. **Vote Confirmed**

Stages are sequential and stateful.

---

## 3) Voter Pipeline State

### 3.1 Single source of truth
- Stored in `voter_pipeline_state`
- One active state per voter
- Stage changes are audited

### 3.2 State fields
- voter_id
- current_stage
- last_advanced_at
- stalled_reason (optional)

---

## 4) Task Generation Rules

### 4.1 Automatic task creation
When a registration is logged:
- Task 1 is created immediately
- Subsequent tasks are generated as stages advance

### 4.2 Task fields
- related_entity (voter)
- stage
- assigned_to_user_id (volunteer or staff)
- due_date
- status (open, completed, overdue, canceled)

---

## 5) Default Task Cadence (Initial)

| Stage | Task | Default Due |
|-----|------|-------------|
| Registration Logged | Confirm registration processed | +7 days |
| Registration Confirmed | Invite to education class | +3 days |
| Education Invited | Confirm attendance | +7 days |
| Polling Info | Send polling location | +14 days |
| Vote Plan | Build vote plan | +21 days |
| Ballot Questions | Address questions | As needed |
| Vote Confirmed | Confirm vote | Election Day +1 |

Cadence is configurable but defaults are enforced.

---

## 6) Assignment Rules

- Default assignee is the registering volunteer
- Staff may reassign
- Volunteers see only their assigned voters
- Reassignment is audited

---

## 7) Reminders & Escalation

### 7.1 Reminders
- internal reminders surfaced in dashboard
- optional outbound reminders (SMS/email templates)

### 7.2 Escalation
- overdue tasks flagged
- optional escalation to staff after threshold
- chronic overdue surfaced in reporting

---

## 8) Volunteer Steward Dashboard

Volunteers must be able to see:
- “My Registered Voters”
- “Tasks Due Today”
- “Overdue Tasks”
- Stage status for each voter

This dashboard is minimal and focused.

---

## 9) Reporting & Accountability

Required reporting:
- registrations by stage
- drop-off between stages
- task completion rates
- volunteer stewardship performance

---

## 10) Edge Cases

### 10.1 Registration failure
- voter marked as invalid
- reason recorded
- pipeline halted

### 10.2 Voter unreachable
- contact attempts logged
- status flagged
- staff notified if necessary

---

## 11) Stewardship UX Standards

- clear stage indicators
- explicit “next action”
- no hidden state
- minimal data entry burden on volunteers

---

## 12) Stewardship Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Include:
- description
- rationale
- mitigation
- timebox

---
