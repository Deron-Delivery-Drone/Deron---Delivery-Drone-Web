# EQUIVALENCE REPORT

## Summary

| Check | Status | Notes |
|---|---|---|
| HTML structure | PASS | All 6 sections + navbar + footer identical |
| SEO meta tags | PASS | title, description, OG, Twitter, canonical — byte-identical |
| Favicons & PWA | PASS | Same files, same paths, same manifest.json |
| robots.txt | PASS | Identical file served |
| share.html | PASS | Identical file served |
| i18n (vi/en/zh) | PASS | All translation strings byte-identical to App.js |
| Theme (dark mode) | PASS | Same localStorage key, same class toggle logic |
| Language persistence | PASS | Same localStorage key ("deron-language"), same default ("vi") |
| Navigation | PASS | Same smooth scroll behavior, same anchor IDs |
| Mobile menu | PASS | Same toggle behavior, same markup |
| News cards | PASS | Same Supabase query, same card layout, same link behavior |
| News image fallback | PASS | Same onerror handler → /Deron-logo.png |
| News date formatting | PASS | Same locale mapping (vi→vi-VN, en→en-US, zh→zh-CN) |
| Contact section | PASS | Same mailto/tel links, same founder info |
| Footer | PASS | Same copyright text, same city |
| Static assets | PASS | All images/icons copied unchanged |
| CSS classes | PASS | Same Tailwind classes on every element |

## Behavioral Changes (Intended Improvements)

| Change | Impact |
|---|---|
| Server-Side Rendering (SSR) | Content visible without JavaScript execution — SEO improvement. Existing behavior preserved: JS still handles language/theme/menu. |
| News fetched server-side | Eliminates client-side loading spinner on initial load. Empty/error states still handled client-side for consistency. |

## Not Migrated (by design)

| Component | Reason |
|---|---|
| AdminPanel.js | localStorage-based mock, not routed in production App.js |
| DeronWeb.js | Unused — never imported |
| News.jsx | Unused — never imported |
| firebase.js | localStorage wrapper — client-side only, not needed server-side |
| languagePack.js | Not used by App.js (App.js has inline translations) |
| reportWebVitals.js | CRA-specific, not applicable to Rust |
| setupTests.js | CRA-specific test setup |
| App.test.js | CRA test file |
| App.css | Styles included in style.css |

## Known Differences

| Difference | Severity | Justification |
|---|---|---|
| React hydration markers absent | None | No crawler or tool depends on React-specific DOM attributes |
| No `react-scripts` dev server | None | Replaced by Axum; same port 3000 default |
| Icons are inline SVG instead of Lucide React components | None | Visually identical SVG paths from Lucide icon set |

## Existing Behavior Preserved

- `react-router-dom` was installed but unused → no routing to preserve
- AdminPanel never rendered in production → not migrated
- firebase.js was a localStorage mock → localStorage behavior preserved in client JS
