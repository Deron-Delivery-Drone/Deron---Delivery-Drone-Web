export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const FROM_EMAIL = Deno.env.get("FROM_EMAIL");
  if (!RESEND_API_KEY || !FROM_EMAIL) {
    throw new Error("Missing RESEND_API_KEY or FROM_EMAIL");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend error: ${text}`);
  }
}

export function renderDownloadEmail({ fullName, platform, downloadUrl }: { fullName: string; platform: string; downloadUrl: string }) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:0 auto;padding:20px;color:#0f172a;">
    <h2 style="margin:0 0 12px;">Deron DACTS Download Access</h2>
    <p>Hi ${fullName},</p>
    <p>Your requested build for <strong>${platform}</strong> is ready.</p>
    <p style="margin:24px 0;">
      <a href="${downloadUrl}" style="background:#0f172a;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;display:inline-block;">Download DACTS</a>
    </p>
    <p>This link expires in <strong>72 hours</strong>.</p>
    <p>If you need a new link later, use the resend flow from our public website.</p>
    <p>— Deron Team</p>
  </div>`;
}
