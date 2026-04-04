import { supabase } from "./supabase";

export async function submitDownloadRequest(payload) {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase.functions.invoke("create-download-request", {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || "Unable to submit request");
  }

  return data;
}

export async function resendDownloadLink(email, platform) {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase.functions.invoke("resend-download-link", {
    body: { email, platform },
  });

  if (error) {
    throw new Error(error.message || "Unable to resend link");
  }

  return data;
}
