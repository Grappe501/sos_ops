# Module 0 Test Plan

Local:
- pnpm install
- set .env.local (bcrypt required)
- pnpm dev
- login at /login
- go to /app
- click "Create sample audit event"
- verify var/audit.log updated

Vercel:
- set env vars
- deploy
- repeat login and audit
