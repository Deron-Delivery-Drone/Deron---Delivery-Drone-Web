# ROUTES & CONTRACTS

## HTTP Routes

| Method | Path | Response | Notes |
|---|---|---|---|
| GET | `/` | HTML (full page SSR) | Main SPA page, all sections rendered server-side |
| GET | `/share.html` | HTML (static) | OG sharing fallback |
| GET | `/manifest.json` | JSON | PWA manifest |
| GET | `/robots.txt` | Text | SEO robots |
| GET | `/Deron-logo.png` | Image | Static asset |
| GET | `/og-image.jpg` | Image | OG image |
| GET | `/favicon.ico` | Image | Favicon |
| GET | `/favicon-*.png` | Image | Favicon variants |
| GET | `/apple-touch-icon.png` | Image | iOS icon |
| GET | `/logo192.png` | Image | PWA icon |
| GET | `/logo512.png` | Image | PWA icon |
| GET | `/static/*` | CSS/JS | Compiled static assets |

## Supabase API Contract (read-only)

### fetchPublishedContent("post", 6)

```
SELECT id, title, slug, content, content_type, category, tags,
       featured_image, meta_title, meta_description,
       published_at, view_count, external_url
FROM content
WHERE status = 'published' AND content_type = 'post'
ORDER BY published_at DESC
LIMIT 6
```

**Response schema:**
```json
[
  {
    "id": "uuid",
    "title": "string",
    "slug": "string|null",
    "content": "string|null",
    "content_type": "string",
    "category": "string|null",
    "tags": "string[]|null",
    "featured_image": "string|null",
    "meta_title": "string|null",
    "meta_description": "string|null",
    "published_at": "ISO8601 datetime",
    "view_count": "integer|null",
    "external_url": "string|null"
  }
]
```

## Client-Side Behavior Contract

| Behavior | Implementation |
|---|---|
| Language selection | `localStorage("deron-language")`, default "vi", options: vi/en/zh |
| Theme | `localStorage("deron-theme")`, default "system", class toggled on `<html>` |
| Navigation | Smooth scroll via `scrollIntoView({ behavior: "smooth" })` |
| Mobile menu | Toggle hamburger, closes on nav click |
| News image fallback | `onError → src="/Deron-logo.png"` |
| News link behavior | `external_url` → `target="_blank"`, slug → `target="_self"`, neither → no link |
| Date formatting | `toLocaleDateString(locale)` where vi→"vi-VN", en→"en-US", zh→"zh-CN" |
| Contact CTA | `window.location.href = mailto:...` |

## Headers / Caching

- No custom cache headers set by application (CRA defaults)
- No CORS configuration (same-origin)
- No CSRF (no forms that POST)
- No cookies set by application
