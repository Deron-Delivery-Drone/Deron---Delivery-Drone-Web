import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isPlatform } from "../_shared/platforms.ts";
import { renderDownloadEmail, sendEmail } from "../_shared/email.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL")!;
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const { email, platform } = await req.json();
    if (!email || !isPlatform(platform)) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { data: requestRow, error } = await admin
      .from("download_requests")
      .select("id, full_name, email")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !requestRow) return Response.json({ error: "Request not found" }, { status: 404 });

    await admin.from("download_tokens").update({ revoked_at: new Date().toISOString() }).eq("request_id", requestRow.id).is("revoked_at", null);

    const token = crypto.randomUUID().replace(/-/g, "");
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

    await admin.from("download_tokens").insert({
      request_id: requestRow.id,
      token,
      platform,
      expires_at: expiresAt,
    });

    const downloadUrl = `${SITE_URL}/download?t=${token}`;
    await sendEmail({
      to: requestRow.email,
      subject: `Your new DACTS ${platform} download link`,
      html: renderDownloadEmail({ fullName: requestRow.full_name, platform, downloadUrl }),
    });

    await admin.from("download_requests").update({ status: "resent", email_sent_at: new Date().toISOString() }).eq("id", requestRow.id);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
});
