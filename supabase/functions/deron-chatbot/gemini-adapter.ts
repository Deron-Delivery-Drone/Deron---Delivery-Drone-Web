const GEMINI_API_KEY_ENV = "GEMINI_API_KEY";

export type GeminiAdapterRequest = {
  message: string;
  sessionId: string;
  locale: "vi" | "en" | "zh";
  pagePath: string;
};

export type GeminiAdapterResponse = {
  message: string;
  source: "future_gemini";
  safetyFlags: string[];
};

export async function callGeminiPlaceholder(_request: GeminiAdapterRequest): Promise<GeminiAdapterResponse> {
  // SERVER-SIDE ONLY:
  // GEMINI_API_KEY must only be read inside a trusted backend runtime.
  // Never expose this value in frontend JavaScript, runtime-env.js, or public assets.
  const _expectedSecretName = GEMINI_API_KEY_ENV;

  // TODO: Select the approved Gemini model for public Deron chatbot responses.
  // TODO: Retrieve only approved public knowledge from ai-knowledge/public or a reviewed RAG store.
  // TODO: Apply response safety filtering before returning text to the website.
  // TODO: Add observability that records metadata only, not sensitive raw user input.
  throw new Error("Gemini adapter is intentionally disabled in foundation mode.");
}

export { GEMINI_API_KEY_ENV };
