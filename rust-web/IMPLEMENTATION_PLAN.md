# IMPLEMENTATION PLAN

## Module Order (low risk → high risk)

### Module 1: Project scaffolding + static assets
- [x] Cargo.toml with all dependencies
- [x] Copy static assets (images, manifest.json, robots.txt, share.html)
- [x] tower-http ServeDir configuration
- [x] Basic Axum server boots and serves static files

### Module 2: HTML template + SEO
- [x] Askama base template matching index.html `<head>` exactly
- [x] All meta tags, OG tags, Twitter cards, favicons, canonical
- [x] Noscript fallback

### Module 3: All sections (static content)
- [x] Navbar (desktop + mobile markup)
- [x] Hero section
- [x] Mission section (3 stat cards)
- [x] Technology section (3 tech cards)
- [x] Roadmap section (3 phases)
- [x] Contact section
- [x] Footer

### Module 4: i18n (tri-lingual)
- [x] All 3 languages embedded in HTML with data-lang attributes
- [x] JS toggles visibility based on localStorage
- [x] Language selector in navbar + mobile menu

### Module 5: Theme (dark mode)
- [x] System/dark detection via JS
- [x] Class toggle on `<html>` element
- [x] Persist in localStorage

### Module 6: News from Supabase
- [x] reqwest client to Supabase REST API
- [x] Server-side fetch at request time
- [x] News cards rendered in template
- [x] Loading/error/empty states handled
- [x] Date formatting per locale
- [x] Image fallback logic
- [x] External URL vs slug link behavior

### Module 7: Client JS interactivity
- [x] Smooth scroll navigation
- [x] Mobile hamburger menu toggle
- [x] Language switch (show/hide data-lang sections)
- [x] Theme toggle (class on html)
- [x] Image error fallback

### Module 8: Build & Deploy scripts
- [x] dev.sh (cargo watch)
- [x] build.sh (cargo build --release)
- [x] Dockerfile
- [x] GitHub Actions workflow (Rust build + deploy)

### Module 9: Tests
- [x] Unit tests for i18n structs
- [x] Integration tests for HTTP routes
- [x] Contract tests for Supabase response parsing
