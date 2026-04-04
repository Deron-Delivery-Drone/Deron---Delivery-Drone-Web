# DATCS Overview

## Purpose
DATCS (Deron Air Traffic Control Station) is Deron's internal mission-control layer for low-altitude drone operations. It provides a coherent control-tower view of airspace, fleet state, mission state, authority constraints, and safety posture.

## What DATCS solves
- Operator uncertainty during live operations
- Fragmented mission lifecycle management
- Weak traceability of who changed what and why
- Lack of draft/active separation for safety-sensitive edits
- Missing command acknowledgement and replay architecture

## Core operating principles
1. Human safety first.
2. Authority boundaries are explicit and enforced.
3. Desktop is the supreme operator surface.
4. Every meaningful object is draftable, versioned, and auditable.
5. Real-time state must degrade gracefully under link loss.

## Core modules
- Overview
- Fleet
- Mission
- Safety
- Engineering
- Logs

## Runtime model (current foundation)
- Tauri desktop shell + React UI for operators and engineers.
- Rust desktop runtime command layer with health command.
- Shared Rust backend foundation crate for SQLite bootstrapping.
- SQLite for local-first persistence and resumability.

## Next evolution
- Stream transport channels (WS + telemetry gateway adapters).
- Policy-driven trust and capability gating.
- Gradual progression from local-first supervision to multi-node coordination.
