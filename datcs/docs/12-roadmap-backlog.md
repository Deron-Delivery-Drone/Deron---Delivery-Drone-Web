# 12 — Roadmap & Backlog (Mission-Critical)

## Phase 1 — Foundation correction (Complete)
- Replaced incorrect delivery/e-commerce framing with DATCS command-center definition.
- Rewrote architecture and run documents around safety/authority boundaries.

## Phase 2 — Desktop-first baseline (In progress)
- Desktop IA shell implemented.
- Rust runtime and SQLite scaffolding implemented.

## Phase 3 — Real-time core (Planned)
- Telemetry ingest channel and event bus.
- Command acknowledgement lifecycle store.
- Alert routing and operator escalation policies.

## Phase 4 — Mission rigor (Planned)
- Mission validation engine.
- Corridor/geofence conflict checks.
- Draft/active promotion workflow with approvals.

## Phase 5 — Trust and capability enforcement (Planned)
- Device registration lifecycle.
- Session trust scoring.
- Capability policy matrix by role x trust x state.

## Phase 6 — Replay, audit, continuity (Planned)
- Event replay timeline.
- Rollback workflows for versioned objects.
- Cross-device continuation with conflict resolution.

## Phase 7 — Desktop packaging (Planned)
- Tauri wrapper and signed desktop builds for macOS/Linux/Windows.

## High-priority backlog
1. Flight corridor editor and validator
2. Safety incident playbooks
3. Fleet health scoring and predictive maintenance hints
4. Role-based action approvals
5. Transport hardening and message signing
6. Vietnam regulatory workflow templates

## Explicit risks
- Telemetry protocol integration complexity.
- Human factors under high alert density.
- Sync conflict policy correctness for safety-relevant objects.
