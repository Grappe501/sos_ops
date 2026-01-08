# SOS OPS — MAPPING & NORMALIZATION RULES

This document defines how raw data (imports, forms, messages) is normalized into
canonical fields so all modules behave consistently and predictably.

If data is not normalized here, it is not trusted.

---

## 1) Canonical Mapping Philosophy

- Raw data is preserved
- Canonical fields are normalized
- Derived fields are deterministic
- Conflicts resolve via documented precedence
- No silent overwrites

---

## 2) Canonical Identity Normalization

### 2.1 Email
- trim whitespace
- lowercase
- validate format
- store:
  - `email_raw`
  - `email_normalized`

Email is primary dedupe key.

---

### 2.2 Phone Numbers
- strip non-numeric
- normalize to E.164
- store:
  - `phone_raw`
  - `phone_normalized`

Phone is primary dedupe key.

---

### 2.3 Names
- store raw first/last
- derive display name
- preserve capitalization
- never auto-correct spelling

---

## 3) Geographic Normalization (Arkansas)

### 3.1 County
- canonical county list for Arkansas
- stored as enum or reference table
- case-insensitive matching on import
- unknown counties flagged, not auto-mapped

County is critical for:
- reporting
- volunteer assignment
- stewardship coverage

---

## 4) Consent Normalization

### 4.1 Consent Sources
Consent must record:
- channel (sms/email)
- source (form/import/verbal)
- timestamp
- actor (if applicable)

### 4.2 Consent Precedence Rules
- explicit opt-out always wins
- user-entered consent overrides imported consent
- imported consent never overwrites existing opt-in silently

---

## 5) Import Mapping Profiles

### 5.1 Mapping Profiles
- mapping profiles are versioned
- tied to import type
- reusable across imports
- store unmapped columns as `raw_payload`

### 5.2 Field Conflicts
When an import field conflicts with existing data:
- newer timestamp wins (except consent)
- conflict logged
- previous value preserved in audit_log

---

## 6) Form Submissions

### 6.1 Public Forms
- minimal required fields
- server-side normalization
- raw submission preserved
- canonical fields populated

### 6.2 Abuse Controls
- rate limiting
- basic validation
- anomaly logging

---

## 7) Messaging Data Normalization

### 7.1 Inbound Messages
- normalize sender phone/email
- associate with canonical person
- preserve raw message body
- parse STOP/HELP keywords

### 7.2 Outbound Messages
- snapshot recipient identity at send time
- do not retroactively modify sent message records

---

## 8) Derived Fields (Allowed)

Derived fields may include:
- last_contacted_at
- engagement_score (future)
- pipeline_stage_duration

Derived fields must:
- be reproducible
- have source logic documented
- not overwrite raw data

---

## 9) Normalization Failures

When normalization fails:
- raw data preserved
- canonical fields left null
- issue flagged for review
- never block unrelated valid records

---

## 10) Change Management

Any change to normalization rules requires:
- documentation update
- migration if needed
- test coverage
- decision log entry if behavior changes

---
