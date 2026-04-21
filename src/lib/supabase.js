import { createClient } from "@supabase/supabase-js";

const runtimeEnv =
  (typeof process !== "undefined" && process.env) ||
  (typeof window !== "undefined" && window.__DERON_ENV__) ||
  {};

const supabaseUrl = runtimeEnv.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = runtimeEnv.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables!");
}

// Only create the client when credentials are provided to prevent tests from crashing.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Lấy bài viết đã publish
export async function fetchPublishedContent(contentType = "post", limit = 6) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content") // LƯU Ý: bảng là "content" số ít
    .select(
      "id, title, slug, content, content_type, category, tags, featured_image, meta_title, meta_description, published_at, view_count, external_url"
    )
    .eq("status", "published")
    .eq("content_type", contentType)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Lấy site_settings (lúc nãy đã mở SELECT cho public)
export async function fetchSiteSettings() {
  if (!supabase) return {};

  const { data, error } = await supabase.from("site_settings").select("*");
  if (error) throw error;

  return (data || []).reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}

// DATCS controlled download request
export function detectDatcsPlatform() {
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("windows")) return "windows";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macos";
  if (ua.includes("linux")) return "linux";

  return "unknown";
}

export async function submitDatcsDownloadRequest({
  fullName,
  email,
  phone,
  organization,
  industry,
  jobPosition,
  country = "Vietnam",
  reason,
  language = "vi",
  selectedPlatform,
}) {
  if (!supabase) {
    throw new Error("Supabase chưa được cấu hình. Vui lòng kiểm tra biến môi trường.");
  }

  const detectedPlatform = detectDatcsPlatform();

  const payload = {
    full_name: String(fullName || "").trim(),
    email: String(email || "").trim().toLowerCase(),
    phone: String(phone || "").trim(),
    organization: String(organization || "").trim(),
    industry: String(industry || "").trim(),
    job_position: String(jobPosition || "").trim(),
    country: String(country || "Vietnam").trim(),
    reason: String(reason || "").trim(),
    language,
    status: "pending",
    selected_platform: selectedPlatform || detectedPlatform,
    detected_platform: detectedPlatform,
    user_agent: navigator.userAgent,
    referrer: document.referrer || window.location.href,
  };

  const requiredFields = [
    "full_name",
    "email",
    "phone",
    "organization",
    "industry",
    "job_position",
    "country",
    "reason",
  ];

  for (const field of requiredFields) {
    if (!payload[field]) {
      throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc.");
    }
  }

  const { data, error } = await supabase
    .from("download_requests")
    .insert(payload)
    .select("id, status, email")
    .single();

  if (error) {
    console.error("DATCS download request failed:", error);
    throw new Error("Không thể gửi yêu cầu tải DATCS. Vui lòng thử lại.");
  }

  return data;
}
