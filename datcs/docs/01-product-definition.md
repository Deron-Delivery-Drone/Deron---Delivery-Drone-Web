# 01 — Product Definition (Corrected)

## Product identity
DATCS is an internal Deron command platform for airspace supervision, fleet command, mission execution oversight, and safety governance.

It is explicitly **not**:
- a customer-facing delivery app
- an e-commerce workflow
- a generic logistics SaaS dashboard

## Constitutional priorities
1. Human safety
2. System safety
3. Mission success
4. Asset protection
5. Convenience
6. Performance

## Primary users
- Duty Operator (Level 1)
- Safety Supervisor (Level 1/2)
- Maintainer (Level 2)
- Systems Engineer / Architect (Level 3)
- Observer roles (Level 0)

## Capability levels
- Level 0 Observer: monitor, replay, alerts.
- Level 1 Operator: dispatch, checklists, mission control actions.
- Level 2 Maintainer: diagnostics, calibration workflows, service operations.
- Level 3 Engineer/Architect: deep diagnostics, profile/version management, analysis.

## Operational domains
- Airspace / ATC / UTM
- Fleet management
- Mission lifecycle
- Vehicle health and avionics visibility
- Safety and authority state
- Engineering diagnostics
- Identity / sync / audit

## Safety constraints
DATCS must never bypass DMA authority boundaries. Mission commands are high-level intents with acknowledgement semantics; no direct raw motor authority is granted from UI clients.

## Vietnam-first operating context
- Compliance-aware workflow structure
- Conservative safety defaults in dense urban environments
- Community impact awareness (noise, risk, contingency)
- Operational realism for local infrastructure constraints
