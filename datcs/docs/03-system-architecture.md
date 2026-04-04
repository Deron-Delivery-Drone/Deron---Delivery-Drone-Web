# 03 — System Architecture

## Layered architecture

### A. Client layer (desktop-first)
- React desktop UI shell (future Tauri packaging)
- Authority-aware controls
- Local cache for crash resume

### B. DATCS runtime layer (Rust)
Services scaffolded:
- telemetry_service
- command_service
- mission_service
- safety_service
- audit_service
- device_session_service

### C. Persistence layer
- SQLite local database
- schema includes missions, versions, audit logs, devices, sessions, safety events

### D. Integration boundaries
- Future secure telemetry gateways (e.g., MAVLink/UDP adapters)
- Future policy enforcement and transport hardening

## Trust and authority inputs
Effective capability is derived from:
- user role
- device registration status
- session trust grade
- vehicle mode/state
- environmental hazard constraints

## Command model
- Command intent created in DATCS
- Command validated against trust + safety + mission context
- Command dispatched to integration boundary
- Acknowledgement recorded
- Operator sees pending/acked/failed state

## Fault tolerance / continuity
- Local-first saves for drafts
- retryable sync tasks
- version history for rollback
- event log for replay
- resumable UI state

## Explicit non-goals
- No direct actuator command path from DATCS UI
- No bypass of Safety MCU or IO MCU authority
