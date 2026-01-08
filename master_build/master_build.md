SOS OPS — MASTER BUILD CONSTITUTION

Kelly Grappe for Arkansas Secretary of State
Vercel-first Campaign Operating System

0. Canonical Rule

This file (master_build.md) is the single source of truth for:

architecture

build order

rules

protocols

module definitions

quality gates

If it is not reflected here, it is not real.

1. Build Philosophy (Non-Negotiable)
1.1 Database-First Operating System

All meaningful state lives in Postgres

UI is a projection of database views

No business logic lives only in the frontend

No “magic” state without an audit trail

1.2 Zip Module Doctrine

Work is delivered in zip modules

Each module is:

independently deployable

additive (never destructive)

documented

tagged

No module rewrites a previous module without an explicit migration plan

1.3 Campaign Reality Principle

This system must survive:

staff turnover

volunteer churn

deadline pressure

data imports from chaos

scale from dozens → thousands of users

Convenience never outranks durability.

2. Environment Architecture
2.1 Environments

Four environments exist from day one:

local

dev

staging

prod

Each environment has:

separate database

separate Twilio configuration

separate email configuration

separate secrets

separate webhook URLs

No environment shares credentials.

3. Hosting & Core Infrastructure
3.1 Frontend / API

Next.js (App Router)

Deployed on Vercel

Server Actions preferred

API Routes only when required (webhooks, external callbacks)

3.2 Database

Postgres (Neon or Supabase Postgres)

Migrations required for every schema change

Views are the default read interface

Raw tables are write-only unless explicitly approved

3.3 Background Jobs

Upstash Redis (queues)

Vercel Cron (scheduled execution)

All jobs must be:

idempotent

logged

retry-safe

4. Repository Structure (Monorepo)
/apps
  /web            # Next.js app (Vercel deploy)
/packages
  /db             # schema, migrations, views, seed
  /core           # permissions, validation, audit
  /messaging      # Twilio + email providers
  /ui             # shared UI components
/docs
  /runbooks
  /data_dictionary
  /onboarding


Rules:

TypeScript everywhere

No cross-package circular dependencies

DB access only through packages/db

5. Security & Secrets Protocol
5.1 Absolute Rules

Secrets are never committed

.env.local is local-only

Vercel env vars for dev/staging/prod

Separate API keys per environment

5.2 Secret Categories

Database URLs

Auth secrets

Twilio keys & Messaging Service SIDs

Email provider keys

Webhook signing secrets

Secrets rotate quarterly or on staff exit.

6. Auth, Roles, and Permissions (RBAC)
6.1 Roles

Admin — full access

Staff — operational access

Organizer — scoped access (county/team)

Volunteer — minimal, assigned data only

Read-only — analytics only

6.2 Permission Enforcement

Reads come from database views

Writes go through validated server actions

Every write creates an audit record

6.3 Row-Level Visibility

Volunteers can only see:

voters they registered or steward

their assigned tasks

messages they sent or received

7. Audit & Observability
7.1 Audit Log

Every mutation logs:

who

what

before

after

timestamp

source (UI, import, job, API)

No exceptions.

7.2 Logging & Monitoring

Structured logs

Error tracking (Sentry recommended)

Webhook failure alerts

Queue depth monitoring

8. Database Governance
8.1 Schema Discipline

snake_case naming

explicit foreign keys

indexes defined intentionally

migrations required for all changes

8.2 Views

All dashboard tables read from v_* views

Views enforce:

permission scoping

join logic

derived fields

9. Import Pipeline Rules (Spreadsheets → DB)
9.1 Import Stages

Upload CSV/XLSX

Column mapping

Validation + preview

Commit with dedupe

Permanent audit record

9.2 Deduplication Rules

email exact match

phone normalized exact match

fallback: name + county heuristic (flag only)

No silent merges.

10. Messaging Infrastructure
10.1 SMS (Twilio)

Messaging Service (preferred)

STOP/HELP handling required

Opt-out suppression enforced

Quiet hours respected

Rate limiting active

10.2 Email

Domain authenticated (SPF/DKIM/DMARC)

Unsubscribe + bounce handling

Suppression lists enforced

10.3 Message Logging

Every send logs:

campaign (if bulk)

recipient

provider message ID

delivery status

replies

11. Voter Registration Stewardship Engine
11.1 Required Pipeline Stages

Registration logged

Registration confirmed

Education class invited

Polling info delivered

Vote plan created

Ballot questions addressed

Vote confirmed

11.2 Automation Rules

Tasks auto-generated per stage

Due dates enforced

Overdue surfaced

Volunteer accountability visible

12. UX Standards

Single dashboard shell

Saved views

Server-side filtering

Accessible defaults

Fast table interactions

13. Build Order (Locked)

Module 0 — Scaffold, Auth, RBAC, Audit

Module 1 — Core DB Schema + Views

Module 2 — Import Center

Module 3 — Volunteer CRM

Module 4 — Messaging (SMS + Email)

Module 5 — Public Registration Logging

Module 6 — Stewardship Tasks Engine

Module 7 — Pace & Reporting

Future OS Lanes

No skipping.

14. Module Protocol
14.1 Module Start Checklist

scope defined

endpoints listed

tables/views listed

test plan written

rollback plan written

14.2 Module End Checklist

migrations applied

tests pass

docs updated

zip created

tag applied

deploy verified

synopsis written

15. Definition of “Done”

A module is done only when:

it ships

it runs

it logs

it survives handoff

it can be explained to a new staffer in under 10 minutes

16. Authority

During build phase:

The pilot (ChatGPT) controls build order

Deviations require explicit approval and documentation

End of Master Build Constitution