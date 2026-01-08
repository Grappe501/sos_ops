# SOS OPS — PERMISSIONS & EDGE CASES

This document defines the gray areas, boundary cases, and explicit permission decisions
that prevent RBAC rewrites mid-build. If a question comes up about “who can do what,”
the answer must be found here or added here.

---

## 1) Permission Philosophy

- Default is **least privilege**
- Visibility is earned, not assumed
- Volunteers operate on *their universe*, not the whole system
- Staff can act, but actions are auditable
- Ambiguity is resolved conservatively

---

## 2) Role Definitions (Behavioral)

### 2.1 Admin
- Full system access
- Can override feature flags
- Can export full datasets
- Can reassign any record
- Can approve exceptions

### 2.2 Staff
- Can manage volunteers and voters
- Can send bulk messaging
- Can reassign tasks and voters
- Can view statewide metrics
- Cannot bypass compliance rules

### 2.3 Organizer
- Scoped to assigned counties or programs
- Can view and manage volunteers in scope
- Can view voters registered by those volunteers
- Limited export (scope-bound)
- Cannot send statewide bulk messaging

### 2.4 Volunteer
- Can view:
  - voters they registered
  - voters assigned to steward
  - their own tasks
- Can send messages only to:
  - voters they steward (if consent exists)
- Cannot export data
- Cannot see other volunteers’ data

### 2.5 Read-only
- View dashboards and reports only
- No writes of any kind

---

## 3) Canonical Permission Matrix (Initial)

| Action | Admin | Staff | Organizer | Volunteer | Read-only |
|---|---|---|---|---|---|
| Login | ✅ | ✅ | ✅ | ✅ | ✅ |
| View dashboard | ✅ | ✅ | ✅ (scoped) | ✅ (limited) | ✅ |
| Import data | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit volunteer | ✅ | ✅ | ✅ (scoped) | ❌ | ❌ |
| Reassign voter | ✅ | ✅ | ✅ (scoped) | ❌ | ❌ |
| Send 1:1 SMS | ✅ | ✅ | ✅ (scoped) | ✅ (assigned only) | ❌ |
| Send bulk SMS | ✅ | ✅ | ❌ | ❌ | ❌ |
| Export data | ✅ | ⚠️ (scoped) | ⚠️ (scoped) | ❌ | ❌ |

⚠️ = logged + scope-limited

---

## 4) Edge Case Decisions (Locked Unless Updated)

### 4.1 Can volunteers see voter contact info?
**Decision:** YES, but only for voters they registered or steward.  
**Reason:** Required to complete stewardship tasks.

---

### 4.2 Can volunteers message voters directly?
**Decision:** YES, if:
- voter is assigned to them
- consent exists
- templates are used or message is logged

---

### 4.3 Can organizers export lists?
**Decision:** YES, but:
- county-scoped only
- export logged
- fields limited (no raw notes)

---

### 4.4 Can staff override consent?
**Decision:** NO.  
Consent suppression cannot be overridden without Admin approval and audit entry.

---

### 4.5 Can staff reassign voters from inactive volunteers?
**Decision:** YES.  
Reassignment must be audited and visible in activity feed.

---

### 4.6 Can volunteers see analytics?
**Decision:** LIMITED.  
Volunteers see:
- their own counts
- their own task completion
No statewide metrics.

---

## 5) Visibility Rules (Implementation Guidance)

- Enforce via DB views, not UI filters
- Avoid “if role === X” logic in frontend
- Views must take `current_user_id` into account

---

## 6) Temporary Permissions
Temporary permission grants:
- must be timeboxed
- must be logged
- must expire automatically

---

## 7) Permission Changes

Any change to:
- role powers
- visibility scope
- export rights

must be recorded in:
- `master_build/RISKS_DECISIONS.md`

Include:
- reason
- impact
- mitigation

---
