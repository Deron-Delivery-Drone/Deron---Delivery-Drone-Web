# 06 — Local Run Plan (Truthful)

## Scope
This run plan covers the current DATCS desktop implementation under `/datcs`.

## Prerequisites
- Node.js 20+
- npm 10+
- Rust stable toolchain (rustup)
- Linux desktop dependencies required by Tauri (WebKitGTK and related libraries)

## 1) Install desktop dependencies

```bash
cd datcs/apps/desktop
npm install
```

## 2) Run DATCS as a desktop app (Tauri)

```bash
cd datcs/apps/desktop
npm run tauri:dev
```

Expected behavior:
- Tauri compiles the Rust desktop shell in `src-tauri`.
- DATCS opens as a native desktop window.
- UI shows core sections: Overview, Fleet, Mission, Safety, Engineering, Logs.
- Rust side initializes local SQLite database in the app data directory.
- Health strip shows shell/backend/db status from Rust command `health_signal_cmd`.

## 3) Optional: run backend service standalone

```bash
cd datcs/src-backend
cargo run
```

Expected behavior:
- Creates/opens local SQLite database at `datcs/src-backend/datcs.db`.
- Applies bootstrap schema from `sql/001_init.sql`.
- Starts HTTP server on `127.0.0.1:8080` with `/health` endpoint.

## 4) Current real vs scaffolded status

Real now:
- Native Tauri desktop shell with React navigation
- Rust startup path with local SQLite bootstrap
- Rust-to-frontend health signal invoke path
- Standalone backend binary with HTTP health endpoint

Scaffolded now:
- Live telemetry transport and remote gateway adapters
- Mission command acknowledgements from real vehicles
- Safety policy engine enforcement beyond baseline guardrails

## Troubleshooting
- If `npm run tauri:dev` fails with missing system libs, install Tauri Linux prerequisites and rerun.
- If Rust build fails, run `rustup update stable` and retry.
