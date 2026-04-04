# DACTS Desktop Release Guide

## Versioning
- Follow SemVer: `MAJOR.MINOR.PATCH`.
- Tag release commit and publish release notes.

## Build artifacts
Target:
- Windows
- macOS
- Linux

If artifacts are unavailable, keep public-web buttons wired but in explicit `Coming soon` mode.

## Release metadata flow
1. Build binaries with Tauri pipeline.
2. Upload artifacts to GitHub Releases.
3. Update backend `/api/v1/release-metadata` env values.
4. Public web download section automatically reflects availability.

## Safety gate
Do not ship desktop release without:
- legal zone validation checks,
- blocked mission launch guard,
- explicit mock-vs-live indicator,
- audit logging paths for mission actions.
