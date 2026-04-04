export type PlatformKey =
  | "windows"
  | "macos"
  | "linux"
  | "ipad"
  | "iphone"
  | "android_phone"
  | "android_tablet";

export const PLATFORM_URLS: Record<PlatformKey, string | null> = {
  windows: Deno.env.get("DOWNLOAD_WINDOWS_URL") ?? null,
  macos: Deno.env.get("DOWNLOAD_MAC_URL") ?? null,
  linux: Deno.env.get("DOWNLOAD_LINUX_URL") ?? null,
  ipad: Deno.env.get("DOWNLOAD_IPAD_URL") ?? null,
  iphone: Deno.env.get("DOWNLOAD_IPHONE_URL") ?? null,
  android_phone: Deno.env.get("DOWNLOAD_ANDROID_PHONE_URL") ?? null,
  android_tablet: Deno.env.get("DOWNLOAD_ANDROID_TABLET_URL") ?? null,
};

export function isPlatform(value: string): value is PlatformKey {
  return value in PLATFORM_URLS;
}
