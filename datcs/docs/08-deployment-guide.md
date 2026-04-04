# DACTS Deployment Guide

## Environments
- dev
- staging
- production

## Backend deployment
1. Build `apps/backend` with `npm run build`.
2. Deploy as container/process with env injection from secret manager.
3. Enable TLS termination, IP allowlists, and audit logging.
4. Configure WebSocket sticky/session behavior if horizontally scaled.

## Public web deployment
1. Build static bundle from `apps/public-web`.
2. Publish via CDN with immutable assets.
3. Inject release download URLs by environment.

## Desktop distribution linkage
Public-web consumes environment release URLs (`VITE_DACTS_DOWNLOAD_*`) and displays `Coming soon` when absent.

## Production security checklist
- Rotate server credentials periodically.
- Enforce HTTPS and HSTS.
- Validate CORS domain allowlist.
- Keep service-role keys backend-only.
