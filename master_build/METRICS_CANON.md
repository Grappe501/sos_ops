# SOS OPS — METRICS CANON (Definitions of Success)

This document defines the **canonical metrics** used across SOS OPS.
If a number appears on a dashboard, report, or decision memo, it must be defined here.

This prevents metric drift, argument-by-dashboard, and last-minute rewrites.

---

## 1) Metric Philosophy

- Metrics describe **program execution**, not vanity
- Every metric has:
  - a definition
  - a source
  - an owner
- Metrics are consistent across environments
- Dashboards visualize metrics; they do not redefine them

---

## 2) Metric Taxonomy

Metrics fall into four classes:

1. **Input Metrics** — capacity and activity
2. **Process Metrics** — follow-through quality
3. **Outcome Metrics** — results achieved
4. **Health Metrics** — system and program integrity

---

## 3) Volunteer Program Metrics (Canonical)

### 3.1 Volunteer Count
**Definition:**  
Number of unique `volunteers` with status ≠ inactive.

**Source:**  
`volunteers` table

---

### 3.2 Active Volunteers
**Definition:**  
Volunteers who have completed at least one task or message in the last 30 days.

**Source:**  
`tasks`, `message_events`

---

### 3.3 Volunteer Onboarding Rate
**Definition:**  
% of new volunteers who reach “Onboarded” within 14 days.

**Source:**  
`volunteers.onboarding_stage`

---

### 3.4 Volunteer Retention
**Definition:**  
% of volunteers active this month who were also active last month.

**Source:**  
Derived from activity timestamps

---

## 4) Voter Registration Metrics (Primary Program)

### 4.1 Total Registrations
**Definition:**  
Count of `registrations` records with valid county and date.

**Source:**  
`registrations` table

---

### 4.2 Weekly Registration Pace
**Definition:**  
Registrations logged in the last 7 days.

**Source:**  
`registrations.created_at`

---

### 4.3 Required Weekly Pace
**Definition:**  
Remaining registrations needed ÷ remaining weeks until deadline.

**Source:**  
Config value + current date

---

### 4.4 On-Pace Indicator
**Definition:**  
Green if weekly pace ≥ required pace, yellow if within 10%, red otherwise.

**Source:**  
Derived metric

---

## 5) Stewardship Pipeline Metrics

### 5.1 Stage Completion Rate
**Definition:**  
% of voters who advance from one stage to the next.

**Source:**  
`voter_pipeline_state` history

---

### 5.2 Task Completion Rate
**Definition:**  
% of tasks completed by due date.

**Source:**  
`tasks`

---

### 5.3 Overdue Tasks
**Definition:**  
Count of tasks past due with status ≠ completed.

**Source:**  
`tasks`

---

### 5.4 Vote Confirmation Rate
**Definition:**  
% of registered voters marked as “Vote Confirmed”.

**Source:**  
`voter_pipeline_state`

---

## 6) Messaging Metrics

### 6.1 Messages Sent
**Definition:**  
Count of outbound message events.

**Source:**  
`message_events`

---

### 6.2 Delivery Rate
**Definition:**  
Delivered ÷ sent.

**Source:**  
`message_events.status`

---

### 6.3 Reply Rate
**Definition:**  
Replies ÷ delivered.

**Source:**  
Inbound `message_events`

---

### 6.4 Opt-Out Rate
**Definition:**  
Opt-outs ÷ messages delivered.

**Source:**  
`opt_outs`, `message_events`

---

## 7) Data Quality Metrics

### 7.1 Duplicate Rate
**Definition:**  
% of imports that trigger soft-duplicate flags.

**Source:**  
`import_commits`

---

### 7.2 Missing Consent
**Definition:**  
Count of people with contact info but no consent record.

**Source:**  
`people` + `consent`

---

## 8) System Health Metrics

### 8.1 Import Failure Rate
**Definition:**  
Failed imports ÷ total imports.

---

### 8.2 Messaging Failure Rate
**Definition:**  
Failed sends ÷ total sends.

---

### 8.3 Job Failure Rate
**Definition:**  
Failed job runs ÷ total job runs.

---

## 9) Metric Ownership

- Volunteer metrics → Volunteer Ops Lead
- Registration metrics → Program Director
- Messaging metrics → Comms Lead
- System health → Technical Lead

Ownership means:
- definition approval
- alert thresholds
- interpretation

---

## 10) Metric Change Rules

Any change to:
- metric definition
- calculation logic
- thresholds

requires:
- update to this document
- version note
- decision log entry if behavior changes materially

---

## 11) What Is Explicitly NOT a Metric

- raw page views
- clicks without outcome
- anecdotal counts
- manually edited numbers

These may exist in logs, but never on dashboards.

---
