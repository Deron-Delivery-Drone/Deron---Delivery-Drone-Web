import { PLATFORM_KEYS } from "../constants/platforms";

export function detectPlatform(userAgent = navigator.userAgent, maxTouchPoints = navigator.maxTouchPoints || 0) {
  const ua = userAgent.toLowerCase();

  const isAndroid = /android/.test(ua);
  if (isAndroid) {
    return /mobile/.test(ua) ? "android_phone" : "android_tablet";
  }

  const isIPad = /ipad/.test(ua) || (ua.includes("macintosh") && maxTouchPoints > 1);
  if (isIPad) return "ipad";

  if (/iphone|ipod/.test(ua)) return "iphone";
  if (/windows nt|win64|win32/.test(ua)) return "windows";
  if (/mac os x|macintosh/.test(ua)) return "macos";
  if (/linux|x11/.test(ua)) return "linux";

  return "unknown";
}

export function normalizePlatform(value) {
  return PLATFORM_KEYS.has(value) ? value : "unknown";
}
