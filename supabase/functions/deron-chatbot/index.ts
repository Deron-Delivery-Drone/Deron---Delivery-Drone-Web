import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type Locale = "vi" | "en" | "zh";

type ChatbotRequest = {
  message?: unknown;
  sessionId?: unknown;
  locale?: unknown;
  pagePath?: unknown;
};

type ChatbotResponse = {
  message: string;
  intent: string;
  source: "mock" | "fallback";
  ctas: Array<{ label: string; href: string }>;
  securityFlags: string[];
};

const MAX_MESSAGE_LENGTH = 1500;
const DEFAULT_ALLOWED_ORIGINS = [
  "https://deron.vn",
  "https://www.deron.vn",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

const COPY: Record<Locale, Record<string, string>> = {
  vi: {
    unknown: "Tôi chưa có thông tin đã xác nhận cho câu hỏi này. Vui lòng dùng kênh liên hệ chính thức nếu bạn cần xác nhận.",
    security: "Tôi không thể hỗ trợ truy cập trái phép, tiết lộ khóa hệ thống hoặc bỏ qua quy trình bảo mật. Nếu bạn cần tải DATCS, tôi có thể hướng dẫn bạn đến trang tải chính thức của Deron.",
    download: "DATCS không phải phần mềm tải công khai. Bạn có thể gửi yêu cầu quyền tải tại trang DATCS install chính thức của Deron.",
    contact: "Bạn có thể liên hệ Deron qua khu vực liên hệ chính thức trên website.",
    troubleshooting: "Vui lòng bắt đầu từ trang tải/yêu cầu quyền DATCS hoặc liên hệ Deron. Không bỏ qua các bước bảo mật."
  },
  en: {
    unknown: "I do not have confirmed public information for that question yet. Please use the official contact channel if you need confirmation.",
    security: "I can't help with unauthorized access, secret disclosure, or bypassing security flows. If you need DATCS, I can guide you to Deron's official download page.",
    download: "DATCS is not a public direct-download product. You can request access through Deron’s official DATCS install page.",
    contact: "You can contact Deron through the official website contact area.",
    troubleshooting: "Please start from the DATCS download/request page or contact Deron. Do not bypass security steps."
  },
  zh: {
    unknown: "我还没有该问题的已确认公开信息。如需确认，请使用官方联系渠道。",
    security: "我不能协助未经授权的访问、泄露系统密钥或绕过安全流程。如果你需要 DATCS，我可以引导你前往 Deron 官方下载页面。",
    download: "DATCS 不是公开直接下载的软件。你可以通过 Deron 官方 DATCS 安装页面申请权限。",
    contact: "你可以通过官网的官方联系区域联系 Deron。",
    troubleshooting: "请从 DATCS 下载/申请页面开始，或联系 Deron。不要绕过安全步骤。"
  }
};

function allowedOrigins(): string[] {
  const configured = Deno.env.get("DERON_CHATBOT_ALLOWED_ORIGINS");
  if (!configured) return DEFAULT_ALLOWED_ORIGINS;
  return configured.split(",").map((origin) => origin.trim()).filter(Boolean);
}

function corsHeaders(origin: string | null): HeadersInit {
  const allowed = origin && allowedOrigins().includes(origin) ? origin : "https://deron.vn";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization, apikey",
    "Vary": "Origin"
  };
}

function json(status: number, body: unknown, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function normalizeLocale(value: unknown): Locale {
  const locale = String(value || "").toLowerCase();
  if (locale.startsWith("zh")) return "zh";
  if (locale.startsWith("vi")) return "vi";
  return "en";
}

function removeAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

function securityFlags(message: string): string[] {
  const normalized = removeAccents(message).toLowerCase();
  const flags: string[] = [];
  if (/(api key|apikey|secret|service role|service_role|\.env|private key|mat khau|khoa he thong|system prompt)/.test(normalized)) {
    flags.push("secret_request");
  }
  if (/(bypass|hack|crack|unauthorized|trai phep|bo qua bao mat|vuot bao mat|token gia|signed url|signed_url)/.test(normalized)) {
    flags.push("security_bypass");
  }
  return flags;
}

function routeIntent(message: string): { intent: string; securityFlags: string[] } {
  const normalized = removeAccents(message).toLowerCase();
  const raw = message.toLowerCase();
  const flags = securityFlags(message);
  if (flags.length) return { intent: "security_refusal", securityFlags: flags };
  if (/(download|install|installer|tai datcs|tai ve|cai dat|datcs download)/.test(normalized) || /下载 datcs|安装 datcs/.test(raw)) {
    return { intent: "datcs_download", securityFlags: [] };
  }
  if (/(troubleshoot|trouble|error|bug|loi|khac phuc)/.test(normalized) || /故障|排查|错误/.test(raw)) {
    return { intent: "troubleshooting", securityFlags: [] };
  }
  if (/(contact|support|partnership|partner|lien he|hop tac|tu van)/.test(normalized) || /联系|合作|支持/.test(raw)) {
    return { intent: "contact", securityFlags: [] };
  }
  return { intent: "unknown", securityFlags: [] };
}

function mockResponse(message: string, locale: Locale): ChatbotResponse {
  const routed = routeIntent(message);
  const c = COPY[locale];
  if (routed.intent === "security_refusal") {
    return {
      message: c.security,
      intent: "unknown",
      source: "mock",
      ctas: [{ label: locale === "zh" ? "前往 DATCS 下载页" : locale === "vi" ? "Tới trang tải DATCS" : "Go to DATCS download", href: "/datcs/install" }],
      securityFlags: routed.securityFlags
    };
  }
  if (routed.intent === "datcs_download") {
    return {
      message: c.download,
      intent: routed.intent,
      source: "mock",
      ctas: [{ label: locale === "zh" ? "前往 DATCS 下载页" : locale === "vi" ? "Tới trang tải DATCS" : "Go to DATCS download", href: "/datcs/install" }],
      securityFlags: []
    };
  }
  if (routed.intent === "contact") {
    return {
      message: c.contact,
      intent: routed.intent,
      source: "mock",
      ctas: [{ label: locale === "zh" ? "联系 Deron" : locale === "vi" ? "Liên hệ Deron" : "Contact Deron", href: "/#contact" }],
      securityFlags: []
    };
  }
  if (routed.intent === "troubleshooting") {
    return {
      message: c.troubleshooting,
      intent: routed.intent,
      source: "mock",
      ctas: [{ label: locale === "zh" ? "前往 DATCS 下载页" : locale === "vi" ? "Tới trang tải DATCS" : "Go to DATCS download", href: "/datcs/install" }],
      securityFlags: []
    };
  }
  return { message: c.unknown, intent: "unknown", source: "mock", ctas: [], securityFlags: [] };
}

serve(async (request: Request) => {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return json(405, { error: "method_not_allowed" }, origin);
  }

  // TODO: Replace this placeholder with durable per-session/IP rate limiting.
  // TODO: Add security event logging for abuse patterns without storing secrets or raw sensitive data.

  let body: ChatbotRequest;
  try {
    body = await request.json();
  } catch (_) {
    return json(400, { error: "invalid_json" }, origin);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  const pagePath = typeof body.pagePath === "string" ? body.pagePath.trim().slice(0, 300) : "/";
  const locale = normalizeLocale(body.locale);

  if (!message) return json(400, { error: "empty_message" }, origin);
  if (message.length > MAX_MESSAGE_LENGTH) return json(413, { error: "message_too_long" }, origin);
  if (!sessionId || sessionId.length > 120) return json(400, { error: "invalid_session" }, origin);

  const response = mockResponse(message, locale);

  // TODO: Retrieve approved public knowledge for RAG from ai-knowledge/public or a reviewed store.
  // TODO: Call Gemini through a server-side adapter only after GEMINI_API_KEY is configured.
  // TODO: Apply response safety filtering before returning the final answer.
  void pagePath;

  return json(200, response, origin);
});
