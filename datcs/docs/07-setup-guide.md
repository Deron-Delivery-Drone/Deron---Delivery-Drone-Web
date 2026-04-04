# DACTS Setup Guide

## Prerequisites
- Node.js 20+
- npm 10+
- Rust toolchain (for Tauri desktop runtime)

## 1) Environment
Copy templates:
- `datcs/.env.example` -> local secure env storage
- `datcs/apps/backend/.env.example` -> `datcs/apps/backend/.env`
- `datcs/apps/public-web/.env.example` -> `datcs/apps/public-web/.env`

Never commit real secrets.

## 2) Backend
```bash
cd datcs/apps/backend
npm install
npm run dev
```
Backend default endpoint: `http://localhost:4300/api/v1/health`

## 3) Public web
```bash
cd datcs/apps/public-web
npm install
npm run dev
```

## 4) Desktop app
```bash
cd datcs/apps/desktop
npm install
npm run dev
```
(If Tauri CLI is configured, run Tauri dev as your platform toolchain allows.)

## 5) Verification checklist
- Health API responds.
- `/api/v1/legal-zones` returns zone metadata.
- `/api/v1/missions` accepts typed mission payload.
- Desktop overview shows MOCK telemetry and legal validation badge.
