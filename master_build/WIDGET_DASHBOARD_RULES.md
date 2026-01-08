“Widget + Dashboard Rules” (so every module UI feels unified)
A1. Dashboard shell contract

All dashboards must share:

left nav (module + subpages)

top bar (global search, quick actions, user menu)

consistent page layouts:

Index pages = table + filters + saved views

Profile pages = header card + tabs + activity feed

Program pages = KPI cards + trend charts + drilldowns

A2. Widget spec (standard interface)

Every widget must declare:

id, title, description

query source (view or metric function)

refresh behavior (manual / interval / realtime later)

permissions (who can see it)

drilldown target (where clicking takes you)

A3. Saved Views (filters are product)

Rules:

all list pages support:

server-side filtering

saved filter presets per user

shareable view (staff/admin only)

view definitions are stored in DB:

saved_views table (name, entity, filters json, columns json, owner)

A4. Table UI rules (keeps it fast)

default: server-side pagination + sorting

row actions menu pattern standardized

bulk actions always async-capable (queue ready)

export is role-gated + logged

B) “Mapping Rules” (imports + forms map to canonical fields)
B1. Canonical normalization rules

Emails: lowercase, trim, remove invalid

Phones: normalize to E.164 (store raw + normalized)

Names: store raw + derived display name

Counties: canonical county enum list for Arkansas

Addresses: normalized fields (optional early)

B2. Import mapping profiles

mapping profiles are first-class:

“Volunteer Sheet v1”

“Contacts Sheet v1”

mapping profiles are versioned

unmapped columns stored under raw_payload

B3. Field precedence rules (when conflicts happen)

Define what wins:

“user-entered” overrides “imported”

“latest timestamp” overrides “older import”

consent fields are never overwritten silently (must be explicit)

C) “Vercel Rules” (so deploys are boring and consistent)
C1. Vercel project conventions

Preview deploys for PRs: ON

Staging env: main

Prod env: prod

Environment variables:

set in Vercel only (except local)

no secret fallbacks in code

C2. Runtime and route conventions

API routes:

only for webhooks + public ingestion

Server actions:

all authenticated writes

Use edge runtime only where justified (mostly not needed)

Maximum payload limits documented (imports handled via upload storage, not request body)

C3. Webhook hardening

all webhook routes:

verify signature

log raw body checksum

write webhook_events table for replay

C4. Cron jobs

all crons defined in one file and documented in RUNBOOKS.md

crons must be environment-scoped (staging/prod only)

D) “Zip Module Mechanical Rules” (so modules plug in instantly)
D1. Module manifest format (required)

Each module ships a MODULE_MANIFEST.json:

module name / version

migrations included? (yes/no)

routes added

new tables/views

env vars required

jobs added

manual steps

rollback steps

D2. UI registration pattern

New pages must register in a single nav config:

packages/core/nav.ts (or similar)
No scattered nav updates.

D3. DB “capability flags”

We define a feature_flags table so modules can:

hide UI until migrations applied

allow incremental rollout

What to add to master_build (recommended)

Before Module 0, add these docs:

master_build/UI_WIDGET_RULES.md

master_build/MAPPING_NORMALIZATION.md

master_build/VERCEL_OPERATIONS.md

master_build/MODULE_MECHANICS.md

That gives you “rails” so we can basically run a checklist per module and ship.