import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

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
      "id, title, slug, content, content_type, category, tags, featured_image, meta_title, meta_description, published_at, view_count"
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
