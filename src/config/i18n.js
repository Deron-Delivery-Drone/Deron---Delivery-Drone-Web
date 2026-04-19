export const SUPPORTED_LANGUAGES = ["vi", "en", "zh"];

const STORAGE_KEY = "deron-language";

export const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      mission: "Sứ mệnh",
      contact: "Liên hệ",
    },
    heroTitle: "Hạ tầng drone nghiêm túc cho Việt Nam",
    footer: "© 2026 Deron",
  },
  en: {
    nav: {
      home: "Home",
      mission: "Mission",
      contact: "Contact",
    },
    heroTitle: "Mission-grade drone infrastructure",
    footer: "© 2026 Deron",
  },
  zh: {
    nav: {
      home: "首页",
      mission: "使命",
      contact: "联系",
    },
    heroTitle: "任务级无人机基础设施",
    footer: "© 2026 Deron",
  },
};

export function detectInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;

  const locale = (navigator.language || "en").toLowerCase();
  if (locale.startsWith("vi")) return "vi";
  if (locale.startsWith("zh")) return "zh";
  return "en";
}

export function setLanguagePreference(language) {
  if (SUPPORTED_LANGUAGES.includes(language)) {
    localStorage.setItem(STORAGE_KEY, language);
  }
}
