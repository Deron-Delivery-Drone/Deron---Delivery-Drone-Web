# DACTS — Deron Autonomous Command & Traffic System

DACTS is Deron's internal mission operating system, integrating GCS, UTM, mission planning/execution, realtime telemetry, legal airspace enforcement, and engineering diagnostics.

## Product architecture (v1 foundation)

```text
A) Public Web Layer (apps/public-web)
   - Platform information
   - Auth entry points (login/signup/forgot)
   - Desktop download distribution section

B) DACTS Application Layer (apps/desktop)
   - Desktop-first mission control shell
   - GCS + UTM + mission + fleet + safety + logs domains
   - Explicit MOCK telemetry mode for development

C) Backend/Data/Realtime Layer (apps/backend)
   - Typed API domains (auth/profile/mission/vehicle/telemetry/legal/release)
   - WebSocket realtime channel
   - Legal zone + mission validation baseline
```

## Repository structure

```text
datcs/
├── apps/
│   ├── backend/          # Fastify + TypeScript API and WebSocket mock telemetry
│   ├── desktop/          # Tauri + React desktop shell (serious mission UX)
│   └── public-web/       # Public site + auth entry + download wiring
├── packages/
│   ├── map-core/         # map/legal engine package placeholder
│   └── shared-types/     # shared mission/zone/domain model package placeholder
├── docs/
│   ├── 07-setup-guide.md
│   ├── 08-deployment-guide.md
│   ├── 09-release-guide-desktop.md
│   ├── 10-api-docs.md
│   ├── 11-placeholder-subsystems.md
│   └── 13-dma-communication-credential-api-architecture.md
└── .env.example
```

## Safety + legal invariants

1. Human safety > legal compliance > system safety > mission success.
2. Legal airspace layer is top operational gate.
3. BLOCKED mission validation status disables default arm/launch controls.
4. DACTS never bypasses DMA onboard authority boundaries.
5. MOCK telemetry mode is explicitly labeled as MOCK.

## Quick start

See:
- `docs/07-setup-guide.md`
- `docs/06-local-run-plan.md`
- `docs/10-api-docs.md`

## Security notes

- Do **not** place service-role secrets in frontend code.
- Use `.env.example` as template; real secrets must stay local or in secret managers.
- Backend routes use schema validation and bounded request handling patterns.

## Current status

This branch delivers a production-minded v1 foundation, including:
- legal zone model + route legality engine,
- desktop mission control shell with map layering and safety overlays,
- backend typed API skeleton + realtime channel,
- public-web download/auth entry and i18n/theme baseline,
- release/deployment/placeholder documentation.
