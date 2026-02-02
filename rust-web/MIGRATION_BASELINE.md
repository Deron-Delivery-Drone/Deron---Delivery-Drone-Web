# MIGRATION BASELINE — Deron Delivery Drone Web

## 1. As-Is System Summary

| Property | Value |
|---|---|
| **Framework** | React 19.2.0 (Create React App) |
| **CSS** | Tailwind CSS 3.4.13, dark mode via `class` strategy |
| **Icons** | Lucide React 0.555.0 (Mail, Phone, Globe, Menu, X, ChevronRight, Languages) |
| **Backend** | Supabase (PostgreSQL) — read-only public access |
| **Auth** | None in production; localStorage-based mock in AdminPanel |
| **i18n** | Inline translations (vi/en/zh) in App.js, persisted in `localStorage("deron-language")` |
| **Theme** | System/dark/light, persisted in `localStorage("deron-theme")`, class toggled on `<html>` |
| **Hosting** | cPanel via FTP (GitHub Actions deploy) |
| **Domain** | deron.vn |

## 2. Repo Structure (Original)

```
public/
  index.html          — SPA shell, SEO meta, OG tags
  share.html          — Static sharing fallback page
  manifest.json       — PWA manifest
  robots.txt          — Allow all
  Deron-logo.png, og-image.jpg, favicons...
src/
  App.js              — Main SPA component (all sections)
  App.css             — Legacy CRA styles + marquee animation
  index.js            — React root
  index.css           — Tailwind directives + global styles
  lib/supabase.js     — Supabase client + fetchPublishedContent + fetchSiteSettings
  firebase.js         — localStorage wrapper (mock storage)
  data/languagePack.js — Default CMS content + UI text translations
  admin/AdminPanel.js — Admin CMS panel (localStorage-based)
  public/DeronWeb.js  — Legacy/alternate component (unused)
  public/News.jsx     — Legacy standalone news component (unused)
```

## 3. Pages / Sections (SPA scroll anchors)

| Anchor | Section |
|---|---|
| `#home` | Hero (badge, title, subtitle, CTA) |
| `#mission` | Stats cards (3 items) |
| `#technology` | Technology cards (3 items) |
| `#roadmap` | 3-phase roadmap timeline |
| `#news` | News grid from Supabase (max 6 posts) |
| `#contact` | Founder contact card + CTA button |
| (footer) | Copyright + location |

## 4. External Integrations

| Service | Usage | Auth |
|---|---|---|
| **Supabase** | `content` table (published posts), `site_settings` table | Anonymous key (env var) |
| **FTP/cPanel** | Deployment target | FTP credentials in GitHub Secrets |

## 5. Environment Variables

| Variable | Context |
|---|---|
| `REACT_APP_SUPABASE_URL` | Build-time, Supabase project URL |
| `REACT_APP_SUPABASE_ANON_KEY` | Build-time, Supabase anonymous key |

## 6. SEO Metadata (Ground Truth)

- `<title>DERON</title>`
- `<meta name="description" content="chiến dịch Điện Biên Phủ trong lĩnh vực logistics">`
- `<link rel="canonical" href="https://deron.vn/">`
- OpenGraph: title=DERON, image=https://deron.vn/og-image.jpg (1200x630)
- Twitter: summary_large_image
- `robots.txt`: Allow all
- `manifest.json`: PWA standalone, theme #000000

## 7. Assumptions

- **AdminPanel is NOT deployed to production** — it requires props that are never passed from App.js. Preserved in Rust codebase as separate module but not routed by default.
- **DeronWeb.js and News.jsx are unused** — not imported anywhere. Will not be migrated.
- **react-router-dom is installed but unused** — no URL routing exists, only scroll anchors.
- **firebase.js is a localStorage mock** — no actual Firebase integration.
