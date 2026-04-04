# Deron Public Web + DACTS Download Entry

Production-minded public website with a secure download request flow backed by Supabase.

## Core capabilities

- Header CTA (`Download DACTS` / `Tải DACTS`) on desktop + mobile.
- Unified i18n (vi/en/zh) with browser detection + localStorage persistence.
- Theme system (system/light/dark) with persisted preference.
- Smart platform detection + manual override.
- Lead capture form before access.
- Supabase-backed request + token model.
- Supabase Edge Functions for token generation, email send, token validation redirect, and resend.

## Environment

Copy `.env.example` and fill frontend-safe values only in React.

### Frontend-safe

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- download URLs (`REACT_APP_DOWNLOAD_*`)

### Edge Function-only secrets

Set these in Supabase project secrets only:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `SITE_URL`
- `FROM_EMAIL`
- `DOWNLOAD_*_URL` (function-side mapping)

## Supabase resources

- Migration: `supabase/migrations/20260404143000_download_distribution.sql`
- Functions:
  - `create-download-request`
  - `download-redirect`
  - `resend-download-link`

## Development

- `npm start`
- `npm run build`
- `npm test -- --watchAll=false`
