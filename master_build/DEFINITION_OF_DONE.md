# SOS OPS — DEFINITION OF DONE & MODULE LANDING STRIP

This document defines what “DONE” means in SOS OPS and establishes the landing-strip
rules that prevent circular builds, infinite polish, and scope drift.

If a module meets this Definition of Done, we move on. Period.

---

## 1) Core Principle

A module is **done when it is stable, usable, auditable, and survivable** —  
not when it is perfect, comprehensive, or future-proof.

Progress beats perfection. Discipline beats indecision.

---

## 2) System-Level Definition of Done (Global)

A module is considered **DONE** only when **all** of the following are true:

### 2.1 Functional Completeness
- All items listed in the module’s Deliverables are implemented
- All Non-Goals are respected (nothing extra slipped in)
- Acceptance Criteria are verifiably met

### 2.2 Operational Viability
- Module works in **staging**
- Core user flows can be executed end-to-end
- No P0 or P1 bugs remain

### 2.3 Governance & Safety
- All writes are audited
- Permissions enforced per `PERMISSIONS_EDGE_CASES.md`
- Compliance rules respected (messaging, consent, PII)

### 2.4 Documentation
- `MODULE_README.md` complete
- `RUNBOOK.md` complete
- Any new env vars documented
- Any new cron/jobs documented

### 2.5 Integration Integrity
- Module does not break previous modules
- Navigation registration complete
- Feature flags correctly set (default OFF unless approved)

---

## 3) Module-Level Definition of Done (Required Checklist)

Before a module can be marked **Complete**, the following checklist must be satisfied:

- ☐ Scope matches `MODULE_INDEX.md`
- ☐ All deliverables implemented
- ☐ Tests pass (per QA protocol)
- ☐ Migrations applied cleanly (if any)
- ☐ Feature flags verified
- ☐ Runbook written
- ☐ Rollback steps validated
- ☐ Zip artifact created
- ☐ Git tag created
- ☐ `BUILD_STATUS.md` updated

No checkbox = not done.

---

## 4) The Module Landing Strip (Anti-Circular Mechanism)

Every module enters a **Landing Strip Phase** immediately after build completion.

### 4.1 Landing Strip Rules
- Time-boxed (default: 3–5 days, or explicitly defined)
- Allowed work:
  - critical bug fixes
  - integration fixes
  - performance regressions
- Explicitly forbidden:
  - new features
  - UX polish
  - scope expansion
  - “while we’re here” ideas

### 4.2 Landing Strip Exit Criteria
- No P0/P1 bugs
- Known issues logged
- Module tagged and zipped
- Status updated to **Complete**

Once exited, the module is closed.

---

## 5) Forced Closure & Reopen Policy

### 5.1 Closure Rule
Once a module is marked **Complete**:
- It is frozen
- All new ideas go into:
  - a future module, or
  - `RISKS_DECISIONS.md` as deferred work

### 5.2 Reopening a Module
Reopening requires:
- documented justification
- explicit scope definition
- entry in `RISKS_DECISIONS.md`
- leadership approval

Reopening is the exception, not the norm.

---

## 6) Bug Severity Definitions

### P0 — Blocker
- system unusable
- data corruption
- compliance violation  
→ Must be fixed before release

### P1 — Critical
- core workflow broken
- incorrect data written  
→ Must be fixed before module completion

### P2 — Major
- workaround exists  
→ Logged, may ship

### P3 — Minor
- cosmetic or low impact  
→ Logged, deferred

---

## 7) Deferred Work Protocol

Deferred items must:
- be written down
- be scoped
- be assigned to a future module
- not block current module completion

Deferred ≠ forgotten.

---

## 8) Anti-Circular Safeguards (Hard Rules)

- No “just one more tweak” after Landing Strip starts
- No expanding acceptance criteria mid-build
- No reopening closed scope without decision log
- No perfection-driven delay

When in doubt: **ship and move forward**.

---

## 9) Authority

The Pilot (Build Director) has final authority to:
- declare a module DONE
- enforce closure
- deny scope expansion
- advance the build

Disputes are logged, not litigated mid-build.

---

## 10) Final Test

If someone new joined the campaign tomorrow, could they:
- understand what this module does?
- use it without explanation?
- operate it with the runbook?

If yes → it’s done.

If no → fix *that*, not something else.

---
