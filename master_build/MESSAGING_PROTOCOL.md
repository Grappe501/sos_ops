# SOS OPS — MESSAGING PROTOCOL (SMS + Email)

This document defines how SOS OPS sends, receives, tracks, and governs all outbound and inbound messaging.
Messaging is a regulated, auditable system — not a convenience feature.

---

## 1) Messaging Principles

- Messaging is always **person-centric**, not list-centric
- Compliance outranks convenience
- Every send is traceable
- Suppression is immediate and global
- Bulk messaging is deliberate and rate-limited

---

## 2) Supported Channels

### 2.1 SMS (Twilio)
- Primary channel for volunteers and voters
- Twilio Messaging Service required
- Supports:
  - 1:1 messages
  - bulk campaigns
  - replies
  - STOP / HELP keywords

### 2.2 Email
- Used for longer-form content, confirmations, and education
- Provider: SendGrid or Postmark
- Supports:
  - 1:1 email
  - bulk campaigns
  - templates
  - unsubscribe handling

---

## 3) Canonical Messaging Objects

### 3.1 Message Templates
- channel: sms | email
- purpose: onboarding | reminder | education | GOTV | admin
- versioned
- editable only by Admin/Staff
- immutable once used in a campaign (copy to edit)

### 3.2 Message Campaigns
- channel
- segment definition snapshot
- template reference
- sender identity
- schedule
- throttle rules
- approval metadata (future-ready)

### 3.3 Message Events
Every send produces:
- message_event record
- provider message id
- delivery status updates
- reply events (if inbound)

---

## 4) Consent & Suppression (Hard Rules)

### 4.1 SMS Consent
- sms_opt_in must be true
- consent source recorded
- timestamp recorded
- STOP immediately revokes consent

### 4.2 Email Consent
- email_opt_in respected
- unsubscribe immediately suppresses
- bounce suppression enforced

### 4.3 Global Suppression
- opt_outs apply across all modules
- suppression is checked before every send
- no override without Admin + audit

---

## 5) Sending Rules

### 5.1 1:1 Messages
- allowed from person profile
- logged immediately
- replies linked to person

### 5.2 Bulk Messages
- segment must be previewed
- estimated count shown
- test send recommended
- throttled delivery
- async execution

### 5.3 Quiet Hours
- default quiet hours enforced
- configurable by timezone
- emergency override requires Admin + audit

---

## 6) Rate Limiting & Throttling

- provider rate limits respected
- internal throttle per campaign
- burst protection
- failure backoff

---

## 7) Inbound Message Handling

### 7.1 SMS Replies
- captured via webhook
- stored in message_events
- surfaced in UI timeline

### 7.2 STOP / HELP Keywords
- STOP:
  - suppress immediately
  - confirmation reply sent
- HELP:
  - auto-reply with support message

---

## 8) Error Handling

### 8.1 Send Failures
- logged with provider error code
- retried if transient
- surfaced in campaign report

### 8.2 Provider Outages
- pause campaigns
- alert staff
- resume manually

---

## 9) Compliance & Legal Considerations

- TCPA compliance respected
- CAN-SPAM respected
- audit trail retained
- no cold SMS to voters without consent

---

## 10) Messaging UX Standards

- clear confirmation before bulk sends
- visible delivery progress
- per-recipient status visibility
- reply threading per person

---

## 11) Messaging Exceptions
Any exception must be documented in:
- `master_build/RISKS_DECISIONS.md`

Include:
- reason
- scope
- mitigation
- timebox

---
