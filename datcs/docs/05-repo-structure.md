# 05 — Repo Structure (DATCS)

```text
datcs/
├── README.md
├── overview.md
├── docs/
├── apps/
│   └── desktop/
│       ├── package.json
│       ├── index.html
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── modules/
│       │   └── styles/
└── src-backend/
    ├── Cargo.toml
    ├── sql/
    │   └── 001_init.sql
    └── src/
        ├── main.rs
        ├── api/
        ├── db/
        ├── domain/
        ├── services/
        ├── state/
        └── devices/
```

## Ownership boundaries
- `apps/desktop`: operator-facing desktop UI.
- `src-backend`: local runtime, service scaffolding, persistence.
- `docs`: architecture, doctrine alignment, execution plans.

## Evolution path
- Add `apps/desktop/src-tauri` for native packaging.
- Add shared model crate under `src-backend` workspace when contracts stabilize.
