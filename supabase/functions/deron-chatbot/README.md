# deron-chatbot Edge Function Scaffold

This is a foundation-only Supabase Edge Function scaffold for the future Deron Web Chatbot.

Current behavior:
- Accepts `POST` requests only.
- Accepts `message`, `sessionId`, `locale`, and `pagePath`.
- Validates message length and supported locale.
- Applies a CORS allowlist placeholder.
- Returns a safe mock response.

Future work:
- Connect approved public knowledge retrieval.
- Add Gemini server-side integration.
- Add persistent rate limiting and security event logging.
- Keep all secrets server-side. Never expose `GEMINI_API_KEY` or service role keys to frontend code.

Local development will require a Supabase CLI setup. This scaffold intentionally does not require a real Gemini key.
