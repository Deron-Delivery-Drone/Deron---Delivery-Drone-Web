# Deron Public Website

Public-facing website for Deron.

## Development

- `npm start`
- `npm run build`
- `npm test -- --watchAll=false`

## Deron Web Chatbot Foundation

The repository includes a foundation-only public chatbot widget for the Deron website.

What was added:
- Floating chatbot UI loaded from `/assets/js/deron-chatbot.js` and `/assets/css/chatbot.css`.
- Shared loader in `/assets/js/main.js`; the root `index.html` loads the chatbot directly because it does not use the shared script.
- Local mock chatbot provider, local intent router, frontend client abstraction, future backend provider placeholder, and metadata-only logging interface.
- Local navigation map at `/assets/chatbot/navigation-map.json`.
- Public knowledge placeholder folders under `/ai-knowledge`.
- Supabase Edge Function scaffold under `/supabase/functions/deron-chatbot`.

Mock mode:
- The frontend does not call Gemini.
- The frontend does not require `GEMINI_API_KEY`.
- The mock provider returns predefined public-safe answers by intent and locale.
- If a future backend endpoint is configured but unavailable, the UI falls back to a safe local response.

Locale selection:
- The chatbot sends `locale` with every request.
- Locale priority is active Deron website language, saved language preference, `document.documentElement.lang`, browser language, then user message language as a final fallback.
- Supported locales are `vi`, `en`, and `zh`.

Public knowledge:
- Add only reviewed public-safe files to `/ai-knowledge/public`.
- Never place DMA, APPB, DATCS internal architecture, API keys, `.env` files, legal drafts, investor docs, or private technical files in public chatbot knowledge.
- Files in `/ai-knowledge/private-do-not-index` must never be loaded by the public chatbot or deployed as public assets.

Future Gemini connection:
- Gemini must be connected server-side only, using the Edge Function or another trusted backend.
- `GEMINI_API_KEY` must never appear in frontend code, `runtime-env.js`, public assets, or browser requests.
- The placeholder adapter is `supabase/functions/deron-chatbot/gemini-adapter.ts`.
- Add approved public knowledge retrieval before enabling real model responses.
- Add response safety filtering before returning responses to the website.

Security rules:
- Assistant responses are rendered with `textContent`; raw HTML is not rendered.
- Message length is capped at 1500 characters.
- The Edge Function scaffold rejects non-POST requests, empty messages, invalid sessions, and oversized messages.
- CORS is allowlist-based with production origins plus localhost development placeholders.
- Logging is metadata-only: session id, locale, page path, intent, message length, timestamp, response source, and security flags.

Route assumptions:
- `home` maps to `/`.
- `datcs` maps to `/datcs`.
- `datcs_install` maps to `/datcs/install`.
- `contact` maps to `/#contact` because the current public navigation uses the home-page contact section. Update `/assets/chatbot/navigation-map.json` if a dedicated `/contact` route is added.

Manual test checklist:
- Chatbot opens, minimizes, and closes.
- Widget works on mobile and does not block primary page content.
- Quick actions render in Vietnamese, English, and Chinese.
- Active website language controls chatbot language.
- DATCS download intent shows a CTA to `/datcs/install`.
- Contact intent shows a CTA to the current contact route.
- Backend unavailable fallback works when a future endpoint is configured but unreachable.
- Long messages over 1500 characters are rejected safely.
- HTML injection text is displayed as text, not executed.
- No API key is present in the frontend bundle.
- No direct Gemini call is made from frontend code.
