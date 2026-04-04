# 06 — Local Run Plan (Truthful)

## Scope
This run plan covers the current DATCS foundation implemented under `/datcs`.

## Prerequisites
- Node.js 20+
- npm 10+
- Rust stable toolchain (rustup)
- Cargo

## 1) Run backend (Rust)

```bash
cd datcs/src-backend
cargo run
```

Expected behavior:
- Creates/opens local SQLite database at `datcs/src-backend/datcs.db`.
- Applies bootstrap schema from `sql/001_init.sql` if needed.
- Starts HTTP server on `127.0.0.1:8080`.

Health check:
```bash
curl http://127.0.0.1:8080/health
```

Expected JSON includes service name (`datcs-backend`) and status (`ok`).

## 2) Run desktop UI shell (React)

```bash
cd datcs/apps/desktop
npm install
npm run dev
```

Expected behavior:
- Vite dev server starts on `http://127.0.0.1:5173` (or next available port).
- Desktop IA modules render: Overview, Fleet, Mission, Safety, Engineering, Logs.

## 3) Current real vs mock status

Real now:
- Backend process and health endpoint
- SQLite initialization and core table scaffolding
- Desktop module layout and command-center information architecture

Mock/scaffold now:
- Live telemetry streams
- Real vehicle gateway integration
- Bidirectional command acknowledgement pipeline with external systems

## Troubleshooting
- If `cargo run` fails due to missing toolchain, run `rustup update stable`.
- If port `8080` is occupied, set `DATCS_BIND=127.0.0.1:8090`.
- If Vite chooses another port, use the URL printed in terminal.
