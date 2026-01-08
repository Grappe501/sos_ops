# SOS OPS — MODULE MECHANICS (Zip-Module Build Rails)

This document defines the mechanical rules that make SOS OPS modular.
Every zip module must comply with these mechanics so we can ship quickly without regressions.

---

## 1) Core Principle

A module is a *bolt-on capability* that:
- adds functionality without rewriting prior modules
- can be deployed safely behind feature flags if needed
- has an auditable footprint (DB, routes, jobs)

If a module cannot be cleanly bolted on, it is not a module — it is a refactor, and must be explicitly treated as such.

---

## 2) Module Packaging Standard (Required Files)

Every module zip must contain:

- `MODULE_README.md`  
  - scope
  - goals
  - non-goals
  - acceptance criteria
  - user stories

- `MODULE_MANIFEST.json`  
  - canonical machine-readable manifest (see section 3)

- `MIGRATIONS.md` (if applicable)  
  - migration list
  - apply order
  - notes

- `TEST_PLAN.md`  
  - test coverage and manual verification steps

- `RUNBOOK.md`  
  - how to operate the module
  - how to diagnose issues
  - how to rollback

- `CHANGELOG.md`  
  - brief summary of changes for this module version

- `ARTIFACTS/` (optional)
  - screenshots
  - diagrams
  - example CSV templates

---

## 3) Module Manifest (Canonical Schema)

Each module must include `MODULE_MANIFEST.json` with:

```json
{
  "module_id": "module_0_foundation",
  "module_name": "Foundation Scaffold",
  "version": "0.1.0",
  "depends_on": [],
  "adds": {
    "routes": [],
    "db_tables": [],
    "db_views": [],
    "jobs": [],
    "env_vars": [],
    "feature_flags": []
  },
  "manual_steps": [],
  "rollback_steps": [],
  "notes": []
}
