import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PLATFORM_URLS, isPlatform } from "../_shared/platforms.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("t");
  if (!token) return new Response("Missing token", { status: 400 });

  const { data, error } = await admin
    .from("download_tokens")
    .select("id, platform, expires_at, revoked_at, download_count")
    .eq("token", token)
    .single();

  if (error || !data) {
    return new Response("Invalid token", { status: 404 });
  }

  if (data.revoked_at) {
    return new Response("Token revoked", { status: 410 });
  }

  if (new Date(data.expires_at).getTime() < Date.now()) {
    return new Response("Token expired. Request a new link.", { status: 410 });
  }

  if (!isPlatform(data.platform) || !PLATFORM_URLS[data.platform]) {
    return new Response("Platform build unavailable", { status: 409 });
  }

  await admin
    .from("download_tokens")
    .update({
      last_download_at: new Date().toISOString(),
      download_count: (data.download_count || 0) + 1,
    })
    .eq("id", data.id);

  return Response.redirect(PLATFORM_URLS[data.platform]!, 302);
});
