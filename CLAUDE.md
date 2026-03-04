# CLAUDE.md — Deron Delivery Drone Web

This file provides context for AI assistants working on this codebase.

---

## Project Overview

Marketing website for **DERON**, a Vietnamese drone logistics startup. The site is multilingual (Vietnamese, English, Chinese) and fetches dynamic news from Supabase.

The repository contains **two parallel implementations**:
1. **React SPA** (`/src`) — Current production deployment (Create React App + Tailwind CSS)
2. **Rust SSR Backend** (`/rust-web`) — Alternative in development (Axum + Tailwind CSS)

Both produce identical visual output; the Rust version improves SEO via server-side rendering.

---

## Repository Structure

```
/
├── .github/workflows/deploy.yml   # GitHub Actions CI/CD (FTP to cPanel)
├── public/                        # CRA static assets (logo, favicon, manifest)
├── src/
│   ├── App.js                     # Main React component (680 lines)
│   ├── App.test.js                # Jest tests for App
│   ├── App.css
│   ├── index.js                   # React entry point
│   ├── index.css                  # Tailwind @tailwind directives
│   ├── firebase.js                # localStorage abstraction (legacy name, not Firebase)
│   ├── setupTests.js              # jest-dom setup
│   ├── lib/
│   │   └── supabase.js            # Supabase client + fetchPublishedContent()
│   └── admin/
│       └── AdminPanel.js          # Non-functional CMS editor (do not integrate)
├── rust-web/
│   ├── src/
│   │   ├── main.rs                # Axum server + HTML SSR (568 lines)
│   │   ├── config.rs              # Environment config struct
│   │   ├── error.rs               # AppError enum (thiserror)
│   │   ├── i18n.rs                # Hardcoded translations (Vi/En/Zh)
│   │   └── supabase.rs            # Supabase REST client + Post struct
│   ├── public/                    # Static assets mirrored from /public
│   ├── scripts/
│   │   ├── dev.sh                 # Tailwind watch + cargo-watch
│   │   ├── build.sh               # Production build
│   │   ├── deploy.sh              # Package binary + public/
│   │   └── test.sh                # cargo test
│   ├── Cargo.toml
│   ├── Dockerfile                 # Multi-stage: rust:1.83-slim → debian:bookworm-slim
│   ├── input.css                  # Tailwind CSS input
│   ├── tailwind.config.js
│   └── *.md                       # Architecture docs (STACK_DECISION, ROUTES_AND_CONTRACTS, etc.)
├── package.json
├── tailwind.config.js
└── README.md                      # Default CRA README (not project-specific)
```

---

## Technology Stack

### React SPA (Production)
| Concern | Tool |
|---|---|
| Framework | React 19.2 (functional components, hooks) |
| Build | Create React App 5.0.1 |
| Styling | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| Routing | React Router DOM 7.10 |
| Icons | Lucide React |
| Backend | Supabase JS SDK 2.87 |
| Testing | Jest + React Testing Library |

### Rust SSR (In Development)
| Concern | Tool |
|---|---|
| Framework | Axum 0.8 |
| Runtime | Tokio 1.x |
| HTTP Client | reqwest 0.12 |
| Serialization | serde + serde_json |
| Config | dotenvy |
| Logging | tracing + tracing-subscriber |
| Error Handling | thiserror + anyhow |
| Static Files | tower-http ServeDir |
| CSS | Pre-built Tailwind CSS (identical output) |
| Client JS | Vanilla JS (~130 lines embedded in HTML) |

### Shared Services
- **Database**: Supabase (PostgreSQL), accessed via REST API only
- **Hosting**: cPanel shared hosting (React) / Docker or VPS binary (Rust)
- **CI/CD**: GitHub Actions with manual deploy code gate

---

## Development Commands

### React SPA
```bash
npm install          # Install dependencies
npm start            # Dev server at http://localhost:3000
npm test             # Run Jest (watch mode)
npm run build        # Production build → build/
```

### Rust Backend
```bash
cd rust-web
cp .env.example .env  # Fill in SUPABASE_URL and SUPABASE_ANON_KEY

# Development (requires cargo-watch and npx)
./scripts/dev.sh

# Production build
./scripts/build.sh    # Output: target/release/deron-web + public/

# Run binary
./target/release/deron-web

# Docker
docker build -t deron-web .
docker run -p 3000:3000 -e SUPABASE_URL=... -e SUPABASE_ANON_KEY=... deron-web

# Tests
cargo test
```

---

## Environment Variables

### React SPA (`.env.local`)
```
REACT_APP_SUPABASE_URL=https://[project].supabase.co
REACT_APP_SUPABASE_ANON_KEY=[anon-key]
```

### Rust Backend (`.env`)
```
SUPABASE_URL=https://[project].supabase.co
SUPABASE_ANON_KEY=[anon-key]
HOST=0.0.0.0
PORT=3000
RUST_LOG=deron_web=info,tower_http=info
```

The Rust app also reads `REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_ANON_KEY` as fallbacks.

---

## Database Schema (Supabase)

### `content` table
```sql
id              UUID PRIMARY KEY
title           VARCHAR
slug            VARCHAR UNIQUE
content         TEXT
content_type    VARCHAR   -- "post"
status          VARCHAR   -- "published" | "draft"
category        VARCHAR
tags            VARCHAR[]
featured_image  VARCHAR   -- URL
meta_title      VARCHAR
meta_description VARCHAR
published_at    TIMESTAMPTZ
view_count      INTEGER
external_url    VARCHAR
```

### `site_settings` table (optional)
```sql
key   VARCHAR PRIMARY KEY
value VARCHAR
```

All reads use the public `anon` key — no authentication. Only `status='published'` rows are visible to the frontend.

---

## Key Source Files

### `src/App.js`
- Single-component React app (~680 lines)
- Sections: Hero, Mission, Technology, Roadmap, News, Contact
- **Translations**: Hardcoded object `{ vi: {...}, en: {...}, zh: {...} }`
- **Language**: Stored in `localStorage` under key `deron-lang`
- **Theme**: Detected via `window.matchMedia('(prefers-color-scheme: dark)')`; class-based dark mode
- **News**: Fetched once on mount via `fetchPublishedContent("post", 6)`
- **Mobile menu**: Toggle via `menuOpen` state

### `src/lib/supabase.js`
- Creates Supabase client only when env vars are present (graceful degradation)
- `fetchPublishedContent(contentType, limit)` — main data fetch
- `fetchSiteSettings()` — optional settings fetch

### `src/firebase.js`
- Despite the name, uses **localStorage only** (no Firebase dependency)
- Legacy abstraction; not actively used in current App.js

### `rust-web/src/main.rs`
- Axum router with shared `AppState` (reqwest client + config)
- Route `/` renders full HTML by string-formatting translations + embedded news JSON
- Client-side JS handles: language switching (`data-lang`), theme, mobile menu, news card rendering, smooth scroll, HTML escaping

### `rust-web/src/i18n.rs`
- Translation structs for `vi`, `en`, `zh`
- Must stay in sync with `src/App.js` translations object

---

## CI/CD Pipeline

**File**: `.github/workflows/deploy.yml`

- **Trigger**: Manual `workflow_dispatch` with a 6-digit deploy code input
- **Node**: 18
- **Build env**: `CI=false` (suppresses warnings-as-errors), Supabase secrets injected
- **Guard**: Deployment only runs if actor == `NpHarry-Tech` AND deploy code matches `DEPLOY_CODE` secret
- **Deploy**: FTP upload of `build/` to cPanel

**Secrets required**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PORT`, `REMOTE_DIR`, `DEPLOY_CODE`

---

## Code Conventions

### React
- **Components**: Functional only, hooks for state/effects
- **Styling**: Tailwind utility classes directly in JSX — no CSS Modules, no `styled-components`
- **Dark mode**: `dark:` Tailwind prefix with class-based toggle
- **Naming**: `camelCase` for variables/functions, `PascalCase` for components
- **Async**: `async/await` with try/catch; optional chaining for nullable values
- **No global state**: All state is local to `App.js` via hooks; no Redux/Zustand

### Rust
- **Error handling**: `Result<T, AppError>` everywhere; `AppError` variants via `thiserror`
- **State**: `Arc<AppState>` passed via Axum `State` extractor
- **HTML generation**: `format!()` strings (no template engine)
- **Async**: Tokio-based; all handlers are `async fn`
- **Logging**: `tracing::info!/warn!/error!` macros

### Shared
- **Translations**: Vi/En/Zh must be kept identical in `App.js` and `rust-web/src/i18n.rs`
- **Supabase query**: Same fields selected in both JS SDK and Rust REST calls
- **CSS**: Build Tailwind from `input.css` using `tailwind.config.js`; output to `public/static/style.css` for Rust; CRA handles it automatically for React

---

## What NOT to Do

- **Do not use Firebase** — `firebase.js` is a localStorage abstraction despite its name
- **Do not integrate `AdminPanel.js`** — it is non-functional in production and intentionally excluded from deployment
- **Do not add user authentication** — the site is fully public read-only
- **Do not add form submissions** — contact section is display-only (no backend)
- **Do not eject from CRA** — the build uses react-scripts; avoid `npm run eject`
- **Do not push directly to `master`** — use feature branches and CI/CD

---

## Architecture Decisions

See `rust-web/STACK_DECISION.md` for rationale on choosing Axum over Leptos/Yew.

Key principle: **zero behavior change** during React → Rust migration. The Rust SSR version must produce identical visual output and client-side behavior.

The migration's primary motivation is **SEO**: news content and page text appear in the initial HTML response rather than being JS-rendered client-side.

---

## Testing

### React
```bash
npm test                    # Interactive watch mode
CI=true npm test            # Single run (for CI)
```

The single test (`App.test.js`) mocks `fetchPublishedContent` and verifies the hero text and language selector render correctly.

### Rust
```bash
cd rust-web && cargo test
```

Dev dependencies: `tokio-test`, `tower`, `http-body-util`

---

## Deployment Targets

| Version | Host | Method |
|---|---|---|
| React SPA | cPanel shared hosting | GitHub Actions FTP upload |
| Rust SSR | Docker / VPS | Binary + `public/` directory |
| Rust SSR | Docker | `docker build` + `docker run` |

For the React SPA, the deployment produces a static site from `build/`. No server-side rendering occurs — the initial HTML is a shell and content is JS-rendered.
