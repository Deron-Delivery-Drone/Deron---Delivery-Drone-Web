# MAPPING TABLE — 1:1 Component Mapping

## Routes

| Original (React SPA) | Rust (Axum) | Notes |
|---|---|---|
| `GET /` (CRA index.html → React render) | `GET /` → Axum handler → Askama template | SSR replaces CSR; identical HTML output |
| `GET /share.html` | `GET /share.html` → static file | Unchanged |
| `GET /robots.txt` | `GET /robots.txt` → static file | Unchanged |
| `GET /manifest.json` | `GET /manifest.json` → static file | Unchanged |
| `GET /static/*` | `GET /static/*` → tower-http ServeDir | CSS/JS assets |
| `GET /*.png, *.jpg, *.ico` | Static file serving | Unchanged |

## Components → Rust Modules

| React Component | Rust Equivalent | File |
|---|---|---|
| `App.js` (full SPA) | `templates/index.html` (Askama) | Single template with all sections |
| `translations` object in App.js | `src/i18n.rs` | Identical struct with vi/en/zh |
| `fetchPublishedContent()` | `src/supabase.rs::fetch_published_content()` | reqwest to Supabase REST API |
| `fetchSiteSettings()` | `src/supabase.rs::fetch_site_settings()` | reqwest to Supabase REST API |
| `firebase.js` (localStorage) | Not migrated (client-side only) | localStorage logic stays in client JS |
| `AdminPanel.js` | Not migrated | localStorage-based, non-production |
| `languagePack.js` | Not migrated | Unused by App.js (App.js has own translations) |
| `DeronWeb.js` | Not migrated | Unused |
| `News.jsx` | Not migrated | Unused |

## Client-Side Behavior → Vanilla JS

| React Behavior | Vanilla JS Implementation |
|---|---|
| `useState(language)` + `localStorage` | `let language = localStorage.getItem("deron-language") \|\| "vi"` |
| `useState(theme)` + `localStorage` + mediaQuery | Same logic in vanilla JS |
| `useState(mobileMenuOpen)` | `menuBtn.addEventListener("click", toggle)` |
| `scrollToSection(id)` | `document.getElementById(id).scrollIntoView({behavior:"smooth"})` |
| `localeDate()` | `new Date(d).toLocaleDateString(locale)` |
| Image onError fallback | `img.addEventListener("error", ...)` |

## Middleware

| Original | Rust |
|---|---|
| None (static SPA) | `tower-http::services::ServeDir` for static files |
| No auth middleware | No auth middleware |
| No CORS | No CORS (same-origin) |

## Data Flow

```
Original:  Browser → CRA static HTML → React JS → Supabase JS SDK → Render
Rust:      Browser → Axum → reqwest(Supabase REST) → Askama template → HTML response
           Browser → Vanilla JS (language/theme/menu only, no data fetching)
```

**Assumption**: News data is fetched server-side at request time. Client JS handles only UI interactivity (language switch re-renders via showing/hiding pre-rendered content for all 3 languages, OR re-fetches page with query param).

**Decision**: To maintain exact behavior (client-side language switch without page reload), all 3 language versions are embedded in the HTML with `data-lang` attributes, and JS toggles visibility. This is the closest behavioral equivalent to the React `useState` approach.
