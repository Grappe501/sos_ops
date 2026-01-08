# SOS OPS — UI, WIDGET, & DASHBOARD RULES

This document defines the UI contracts that keep SOS OPS fast, consistent, and scalable
as zip modules are added. No module may invent its own UI paradigms.

---

## 1) UI Philosophy

- UI is a projection of system state
- Clarity outranks cleverness
- Speed matters (server-first)
- Consistency enables velocity

---

## 2) Dashboard Shell Contract

All dashboards must use the same shell:

### 2.1 Required Elements
- Left navigation (modules + subpages)
- Top bar:
  - global search
  - quick actions
  - user menu
- Content area:
  - page title
  - optional subtitle
  - primary content

### 2.2 Page Types
- **Index Pages:** tables + filters + bulk actions
- **Profile Pages:** header card + tabs + activity feed
- **Program Pages:** KPI widgets + trend charts + drilldowns

---

## 3) Widget Contract (Canonical)

Every widget must declare:

- `widget_id`
- `title`
- `description`
- `data_source` (view or metric function)
- `refresh_policy` (manual | interval | event)
- `permissions` (roles)
- `drilldown_route` (optional)

Widgets are read-only.

---

## 4) KPI Widget Standards

- show value + delta
- define time window explicitly
- link to underlying records
- cached if expensive

Examples:
- registrations this week
- tasks overdue
- volunteers onboarded

---

## 5) Table Rules (Index Pages)

### 5.1 Data Source
- tables read from DB views only
- server-side pagination
- server-side filtering

### 5.2 Columns
- configurable per user
- saved with saved views
- stable column keys

### 5.3 Bulk Actions
- always explicit
- preview affected count
- async execution
- progress visible

---

## 6) Saved Views

### 6.1 Definition
Saved views represent:
- filters
- sort order
- visible columns

Saved views are stored in DB and scoped to:
- user (default)
- shared (staff/admin only)

---

## 7) Profile Pages

Profile pages must include:
- identity header
- status indicators
- tabbed sections
- activity feed (audit + messages)

---

## 8) Activity Feed Rules

Activity feeds display:
- audit events
- message events
- task events

Rules:
- reverse chronological
- filterable by type
- human-readable descriptions

---

## 9) Forms

### 9.1 Form Behavior
- server-side validation
- optimistic UI only when safe
- clear error messages

### 9.2 Public Forms
- minimal fields
- abuse protection
- no admin-only logic exposed

---

## 10) Loading, Empty, and Error States

### 10.1 Loading
- skeletons preferred
- avoid spinners for table rows

### 10.2 Empty States
- explain why empty
- show next action
- avoid dead ends

### 10.3 Errors
- actionable messages
- no stack traces in UI
- logged with request id

---

## 11) Accessibility Baseline

- semantic HTML
- label all inputs
- keyboard navigation where feasible
- sufficient color contrast

---

## 12) UI Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Include:
- rationale
- scope
- mitigation
- timebox

---
