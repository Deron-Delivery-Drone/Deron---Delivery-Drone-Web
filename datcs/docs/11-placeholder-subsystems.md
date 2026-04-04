# Placeholder Subsystems and External Dependencies

This file explicitly marks components that are scaffolds awaiting authoritative integrations.

## 1) Vietnam legal airspace feed
- Current: placeholder dev zones in local code.
- Needed: official ingest pipeline (GeoJSON/vector service) with signed provenance.

## 2) Weather API
- Current: architecture reserved only.
- Needed: selected provider contract and alert thresholds.

## 3) Real UAV telemetry bridge
- Current: WebSocket mock telemetry publisher.
- Needed: MAVLink/companion bridge adapter and signed command path.

## 4) Auth provider hardening
- Current: auth entry points + role model structure.
- Needed: production Supabase/Auth provider policies, MFA, and audit sink.

## 5) Desktop binary distribution
- Current: release URL wiring and metadata path.
- Needed: signed CI release pipeline and notarization/codesigning per OS.
