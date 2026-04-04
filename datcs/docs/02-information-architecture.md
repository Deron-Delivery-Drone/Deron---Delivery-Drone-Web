# 02 — Information Architecture

## Top-level desktop navigation
1. Overview
2. Fleet
3. Mission
4. Safety
5. Engineering
6. Logs

## Shared global bars
- Top status bar: connection trust, authority mode, sync state, active alerts, operator identity.
- Left rail: module navigation + quick mission actions.
- Right inspector: selected object details, lock state, draft/active state, audit trail excerpt.

## Object model conventions
Every key object follows:
- `draft` state (editable)
- `active` state (authoritative/live)
- `version_id`
- `changed_by`, `changed_at`, `changed_device`, `change_reason`

## Core entities
- Mission
- Fleet policy
- Corridor
- Geofence
- Safety rule
- Checklist
- Alert rule
- Engineering note

## Key user questions answered by IA
- What is live vs draft?
- What is safe to do right now?
- What is locked and why?
- Who changed this?
- Did command execution acknowledge?
- What needs attention first?
