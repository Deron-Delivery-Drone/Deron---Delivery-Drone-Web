# DATCS — Deron Air Traffic Control Station

DATCS is Deron's **internal-only command platform** for low-altitude fleet operations. It is the ground-layer command brain for mission planning, supervision, dispatch, safety oversight, replay, and engineering visibility.

## Constitutional definition

DATCS is **not** an e-commerce product and **not** a customer delivery app.

It is a command-center-grade platform that combines:
- Airspace supervision (corridors, geofences, hazards, conflict awareness)
- Fleet command + mission orchestration
- Safety and authority-aware operator workflows
- Diagnostics, logs, and maintenance visibility
- Versioned and auditable operational state

## Authority boundaries (DMA-aligned)

- IO MCU: sole actuator authority
- Safety MCU: sole kill authority
- FMU-A / FMU-B: compute + proposal domains
- Companion/Pi: advisory domain
- DATCS: mission/supervision/coordination layer only

DATCS never assumes raw motor authority.

## Product family strategy

- **Desktop app (supreme internal interface):** full workflows and all trust levels.
- **Tablet app:** operationally strong but constrained authority.
- **Mobile app:** monitor/alert/approve-first for on-the-move usage.
- **Tablet/phone web:** derivative surfaces, lower authority than desktop.

## Repository map (DATCS scope)

```text
datcs/
├── README.md
├── overview.md
├── docs/
│   ├── 01-product-definition.md
│   ├── 02-information-architecture.md
│   ├── 03-system-architecture.md
│   ├── 04-design-system.md
│   ├── 05-repo-structure.md
│   ├── 06-local-run-plan.md
│   └── 12-roadmap-backlog.md
├── apps/
│   └── desktop/                     # desktop-first UI shell and module foundations
└── src-backend/                     # Rust runtime foundation (health, state, sqlite scaffolding)
```

## Current implementation status

Implemented in this revision:
- Desktop-first React shell with command-center IA and module routes.
- Rust backend foundation with:
  - health endpoint
  - SQLite bootstrap
  - core service scaffolds (telemetry, command, mission, safety, audit, device/session)
  - draft vs active model placeholders
- Initial schema for versioning, audit, devices, sessions, missions, safety events.

See `datcs/docs/06-local-run-plan.md` for exact local commands.
