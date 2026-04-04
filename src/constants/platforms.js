export const PLATFORM_OPTIONS = [
  { key: "windows", label: { vi: "Windows", en: "Windows", zh: "Windows" } },
  { key: "macos", label: { vi: "macOS", en: "macOS", zh: "macOS" } },
  { key: "linux", label: { vi: "Linux", en: "Linux", zh: "Linux" } },
  { key: "ipad", label: { vi: "iPad", en: "iPad", zh: "iPad" } },
  { key: "iphone", label: { vi: "iPhone", en: "iPhone", zh: "iPhone" } },
  { key: "android_phone", label: { vi: "Android Phone", en: "Android Phone", zh: "安卓手机" } },
  { key: "android_tablet", label: { vi: "Android Tablet", en: "Android Tablet", zh: "安卓平板" } },
];

export const PLATFORM_KEYS = new Set(["windows", "macos", "linux", "ipad", "iphone", "android_phone", "android_tablet", "unknown"]);
