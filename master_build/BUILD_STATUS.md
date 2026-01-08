# SOS OPS — BUILD STATUS (Living Master Checklist)

This document is the single, living source of truth for **where the build is**, **what’s locked**, and **what comes next**.
It is updated at the end of every module and reviewed before starting any new work.

---

## 0) Canonical Rule
If it is not reflected here, it is not considered done, in progress, or approved.

---

## 1) Planning Readiness (Rails)

| Rail | Status | Notes |
|---|---|---|
| Build Constitution | ✅ Complete | Locked |
| Module Index | ✅ Complete | Locked |
| Architecture | ✅ Complete | Locked |
| Environments | ✅ Complete | Locked |
| Security & Secrets | ✅ Complete | Locked |
| Data Governance | ✅ Complete | Locked |
| Imports Protocol | ✅ Complete | Locked |
| Messaging Protocol | ✅ Complete | Locked |
| Stewardship Protocol | ✅ Complete | Locked |
| QA & Release Protocol | ✅ Complete | Locked |
| Runbooks | ✅ Complete | Locked |
| Risks & Decisions | ✅ Initialized | DR-001 active |
| Module Mechanics | ✅ Complete | Locked |
| Vercel Operations | ✅ Complete | Locked |
| Mapping & Normalization | ✅ Complete | Locked |
| UI & Widget Rules | ✅ Complete | Locked |

**Planning Readiness Verdict:**  
🟢 **READY FOR EXECUTION**

---

## 2) Module Progress Tracker

| Module | Name | Status | Owner | Started | Completed | Notes |
|---|---|---|---|---|---|---|
| 0 | Foundation Scaffold | ⏳ Not Started | Pilot | — | — | Awaiting kickoff |
| 1 | Database Core | ⏳ Not Started | Pilot | — | — |  |
| 2 | Import Center | ⏳ Not Started | Pilot | — | — |  |
| 3 | Volunteer CRM | ⏳ Not Started | Pilot | — | — |  |
| 4 | Messaging v1 | ⏳ Not Started | Pilot | — | — |  |
| 5 | Registration Logging | ⏳ Not Started | Pilot | — | — |  |
| 6 | Stewardship Engine | ⏳ Not Started | Pilot | — | — |  |
| 7 | Pace & Reporting | ⏳ Not Started | Pilot | — | — |  |

**Legend:**  
- ⏳ Not Started  
- 🚧 In Progress  
- 🟡 Blocked  
- ✅ Complete  
- 🔒 Locked (post-freeze)

---

## 3) Current Build Focus

**Active Focus:**  
> *Pre-Module-0 final readiness*

**Do not start any module unless this section explicitly names it.**

---

## 4) Next 5 Actions (Always Kept Fresh)

1. Finalize pre-flight rails (permissions + metrics)
2. Lock master plan
3. Initialize repository skeleton
4. Configure Vercel project (staging + prod)
5. Begin Module 0

---

## 5) Frozen vs Mutable Areas

### 5.1 Frozen (Require Decision Log to Change)
- Module order
- Architecture
- Security model
- Data governance rules
- Messaging compliance rules
- Stewardship pipeline stages

### 5.2 Mutable (Within Protocol)
- UI copy
- widget layout (within rules)
- default cadences (configurable)
- feature flag rollout timing

---

## 6) Active Risks & Decisions

| ID | Title | Status | Review Date |
|---|---|---|---|
| DR-001 | Vercel-first architecture | Active | Post-election |

---

## 7) Blockers

_None._

(If this section is non-empty, no new work begins.)

---

## 8) Build Health Check (Quick Scan)

- Planning completeness: 🟢
- Scope clarity: 🟢
- Dependency order: 🟢
- Risk awareness: 🟡 (normal)
- Execution readiness: 🟢

---

## 9) Update Protocol

This file must be updated:
- at the end of every module
- when focus changes
- when a blocker appears or clears
- when a decision materially alters scope or sequence

Failure to update this file pauses the build.

---
