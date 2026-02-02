# STACK DECISION

## Current System

- React 19 SPA (Create React App)
- Tailwind CSS (build-time)
- Client-side rendering only
- Supabase JS SDK for news fetching
- Deployed as static files to cPanel via FTP

## Options Evaluated

### Option A: Rust Backend (Axum) + SSR (Askama) + Client JS

- **Server**: Axum web framework
- **Templates**: Askama (compile-time Jinja2-like templates)
- **CSS**: Pre-built Tailwind CSS (same output as current)
- **Interactivity**: Vanilla JS for language switch, theme toggle, mobile menu, smooth scroll
- **Supabase**: `postgrest-rs` or direct HTTP via `reqwest` at server-side

### Option B: Fullstack Rust + WASM (Leptos/Yew/Dioxus)

- **Framework**: Leptos or Dioxus with SSR + hydration
- **CSS**: Tailwind via build pipeline
- **Interactivity**: WASM-based component reactivity

## Decision: **Option A (Axum + Askama + Client JS)**

### Justification

1. **Zero Behavior Change guarantee**: The current site is a static marketing page with minimal interactivity (language switch, theme toggle, hamburger menu, smooth scroll). These behaviors are trivially replicated with <100 lines of vanilla JS. WASM adds no value here.

2. **SEO improvement**: SSR means all content is in the initial HTML response. The current React SPA requires JS execution to render any content — the Rust version will be strictly better for SEO.

3. **Deploy compatibility**: Axum produces a single binary. Can deploy to the same cPanel VPS, Docker, or any Linux host. No WASM compilation complexity.

4. **Risk**: Near-zero. Askama templates compile at build time — type-safe, fast, no runtime template errors. The site has no forms, no POST endpoints, no complex state management.

5. **WASM cost/risk**: Leptos/Dioxus would require a WASM build pipeline, hydration debugging, larger bundle size, and more complex deploy. For a marketing site with 0 forms and 0 client-side state mutations (beyond localStorage), this is over-engineering.

### Tradeoff Acknowledged

- AdminPanel (CMS editor) is localStorage-based and currently non-functional in production. It is **not migrated** as a live route. If needed later, it can be added as a separate Axum route with Askama forms.

## Final Stack

| Layer | Technology |
|---|---|
| Web server | Axum 0.8 |
| Templates | Askama 0.13 |
| HTTP client | reqwest 0.12 (for Supabase REST API) |
| Serialization | serde + serde_json |
| Config | Environment variables (dotenvy) |
| Logging | tracing + tracing-subscriber |
| Error handling | thiserror + anyhow |
| CSS | Pre-built Tailwind CSS (same output) |
| Client JS | Vanilla JS (~80 lines) |
| Static assets | Served by Axum via tower-http ServeDir |
