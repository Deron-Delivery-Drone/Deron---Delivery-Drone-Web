# TEST PLAN

## Smoke Tests

- [ ] `GET /` returns 200 with HTML containing `<title>DERON</title>`
- [ ] `GET /` HTML contains all OG meta tags (og:title, og:description, og:image, og:url)
- [ ] `GET /` HTML contains canonical link `https://deron.vn/`
- [ ] `GET /` HTML contains all 6 section anchors: home, mission, technology, roadmap, news, contact
- [ ] `GET /robots.txt` returns 200 with `User-agent: *`
- [ ] `GET /manifest.json` returns valid JSON with `"name": "DERON"`
- [ ] `GET /share.html` returns 200 with OG tags
- [ ] `GET /Deron-logo.png` returns 200 with image content
- [ ] `GET /og-image.jpg` returns 200
- [ ] `GET /nonexistent` returns 404

## i18n Tests

- [ ] Default language (vi) renders Vietnamese text in all sections
- [ ] Language switch to "en" renders English text
- [ ] Language switch to "zh" renders Chinese text
- [ ] Language persisted in localStorage survives page reload

## Theme Tests

- [ ] Default theme "system" respects `prefers-color-scheme`
- [ ] Dark class toggled on `<html>` element
- [ ] Theme persisted in localStorage

## News Section Tests

- [ ] With Supabase configured: news cards render with title, date, image
- [ ] Without Supabase: shows loading then empty state
- [ ] News card with `external_url` opens in `_blank`
- [ ] News card without URL is not clickable
- [ ] Image fallback to `/Deron-logo.png` on error

## Contract Tests

- [ ] Supabase query matches exact column selection
- [ ] Response maps to expected struct fields
- [ ] Date formatting matches locale contract (vi-VN, en-US, zh-CN)

## Performance Smoke

- [ ] TTFB < 200ms for `GET /` (without Supabase latency)
- [ ] Total HTML size < 50KB (excluding assets)
- [ ] All static assets served with correct MIME types
