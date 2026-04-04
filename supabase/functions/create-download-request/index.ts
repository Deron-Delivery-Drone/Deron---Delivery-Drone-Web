import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PLATFORM_URLS, isPlatform } from "../_shared/platforms.ts";
import { renderDownloadEmail, sendEmail } from "../_shared/email.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const payload = await req.json();
    if (!payload?.email || !payload?.full_name || !payload?.selected_platform) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isPlatform(payload.selected_platform)) {
      return Response.json({ error: "Invalid platform" }, { status: 400 });
    }

    const requestRow = {
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
      company_name: payload.company_name,
      industry: payload.industry,
      purpose_of_use: payload.purpose_of_use,
      role_category: payload.role_category,
      detected_platform: payload.detected_platform,
      selected_platform: payload.selected_platform,
      user_agent: payload.user_agent,
      locale: payload.locale,
      referrer: payload.referrer,
      status: "pending",
    };

    const { data: requestData, error: requestError } = await admin
      .from("download_requests")
      .insert(requestRow)
      .select("id, full_name, email, selected_platform")
      .single();

    if (requestError || !requestData) {
      throw new Error(requestError?.message || "Unable to store request");
    }

    const token = crypto.randomUUID().replace(/-/g, "");
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

    const { error: tokenError } = await admin.from("download_tokens").insert({
      request_id: requestData.id,
      token,
      platform: requestData.selected_platform,
      expires_at: expiresAt,
    });

    if (tokenError) {
      throw new Error(tokenError.message);
    }

    const downloadUrl = `${SITE_URL}/download?t=${token}`;
    const emailHtml = renderDownloadEmail({
      fullName: requestData.full_name,
      platform: requestData.selected_platform,
      downloadUrl,
    });

    await sendEmail({
      to: requestData.email,
      subject: `Your DACTS ${requestData.selected_platform} download link`,
      html: emailHtml,
    });

    await admin
      .from("download_requests")
      .update({ status: "sent", email_sent_at: new Date().toISOString() })
      .eq("id", requestData.id);

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
});
