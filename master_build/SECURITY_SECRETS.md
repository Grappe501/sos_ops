# SOS OPS — SECURITY & SECRETS PROTOCOL

This document defines how SOS OPS protects data, credentials, and operational integrity.
No build step, module, or deploy is allowed to violate this protocol.

---

## 1) Security Posture (Campaign Reality)

SOS OPS is assumed to operate under:
- high turnover
- time pressure
- volunteer access
- sensitive voter and volunteer data
- legal and reputational risk

Security is therefore **structural**, not optional or trust-based.

---

## 2) Secrets Management (Hard Rules)

### 2.1 What is a secret
Any value that grants access, authority, or impersonation:
- database URLs
- API keys
- tokens
- auth secrets
- webhook signing secrets
- encryption keys
- provider credentials

### 2.2 Absolute prohibitions
- No secrets in git
- No secrets in screenshots
- No secrets pasted into chat or docs
- No secrets in `.env.example`
- No secrets shared across environments

Violations require immediate key rotation.

---

## 3) Secret Storage by Environment

### 3.1 Local
- `.env.local` only
- ignored by git
- developer-specific
- never reused elsewhere

### 3.2 Dev / Staging / Prod
- stored in Vercel environment variables
- set explicitly per environment
- access restricted to authorized staff only

---

## 4) Secret Rotation Policy

### 4.1 Required rotation events
- quarterly scheduled rotation
- staff or vendor offboarding
- suspected compromise
- accidental exposure

### 4.2 Rotation procedure
1. generate new secret
2. deploy new secret
3. verify functionality
4. revoke old secret
5. document rotation in runbook

---

## 5) Authentication Security

### 5.1 Auth baseline
- server-side auth enforcement
- secure session handling
- CSRF protection enabled
- cookies set with:
  - httpOnly
  - secure (prod)
  - sameSite=strict

### 5.2 Password policy (if passwords used)
- minimum length enforced
- hashing with modern algorithm
- no plaintext storage
- rate-limited login attempts

(If using magic links or OAuth, document provider details here.)

---

## 6) Authorization (RBAC Enforcement)

### 6.1 Role-based checks
- enforced on server
- never trusted to client
- documented per action

### 6.2 Row-level access
- enforced via database views
- never filtered only in UI
- volunteer visibility strictly limited

---

## 7) Webhook Security

### 7.1 Signature verification
- verify Twilio signatures
- verify email provider signatures
- reject unsigned or invalid payloads

### 7.2 Replay protection
- timestamp validation
- idempotency checks
- request logging

---

## 8) Data Protection & PII Handling

### 8.1 Data minimization
- collect only what is required
- public forms collect minimal PII
- sensitive notes discouraged unless necessary

### 8.2 Encryption
- encryption in transit (TLS)
- encryption at rest via provider
- application-level encryption reserved for:
  - sensitive notes
  - credentials (if ever stored)

---

## 9) Export & Access Controls

### 9.1 Export rules
- only Admin can export full datasets
- Staff exports are scoped
- Volunteers cannot export bulk data

### 9.2 Access logging
- access to sensitive lists logged
- future module may expand to read-access audit

---

## 10) Incident Response Protocol

### 10.1 Incident levels
- P0: active breach or data exposure
- P1: high risk vulnerability
- P2: limited impact issue
- P3: minor issue

### 10.2 Response steps
1. contain
2. rotate secrets
3. assess blast radius
4. document incident
5. remediate
6. notify leadership if required

---

## 11) Third-Party Risk

### 11.1 Approved providers (initial)
- Vercel
- Postgres provider (Neon or Supabase)
- Twilio
- SendGrid or Postmark
- Upstash

No new provider added without documentation.

---

## 12) Security Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Required fields:
- description
- reason
- duration
- risk acceptance authority
- mitigation plan

---
