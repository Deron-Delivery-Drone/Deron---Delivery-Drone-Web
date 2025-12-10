// data/languagePack.js

// Nội dung mặc định cho CMS (dùng cho cả 3 ngôn ngữ hiện tại)
export const defaultContent = {
  hero: {
    badge: "Vietnam",
    title: "The Điện Biên Phủ of Logistics",
    subtitle:
      "We don't just deliver goods. We deliver hope, life, and knowledge.",
  },
  mission: {
    challenge: {
      title: "Vietnam's logistics costs 16-20% of GDP",
      content:
        "Nearly double that of developed countries.\n\nTraffic congestion. Extreme weather. Infrastructure limitations. Emergency response that's expensive and inflexible.\n\nWhen Typhoon Yagi isolated communes in 2025, we deployed military helicopters for aid. But helicopters can't provide continuous service.\n\nThere had to be a better way.",
    },
    solution: {
      title: "Autonomous delivery drones built for Vietnam",
      content:
        "Semi-autonomous drones that navigate narrow alleys and dense neighborhoods. AI-powered routing that adapts in real-time.\n\nNot imported technology adapted to Vietnam. Technology designed from the ground up for Vietnamese cities, Vietnamese terrain, Vietnamese people.\n\nMedical emergencies. Commercial delivery. Disaster response. Mapping. All from one platform.\n\nVietnamese-owned. Vietnamese-made. For Vietnamese people.",
    },
  },
  contact: {
    email: "contact@deron.vn",
    founder: "Nguyen Phuc Huy",
  },
};

// Text cho UI đa ngôn ngữ (nav, CTA, đoạn ngắn)
export const TEXTS = {
  vi: {
    code: "vi",
    label: "Tiếng Việt",
    flag: "🇻🇳",
    languageNote: "Thay đổi ngôn ngữ",

    nav: {
      mission: "Sứ mệnh",
      technology: "Công nghệ",
      roadmap: "Lộ trình",
      contact: "Liên hệ",
    },

    contact: {
      joinUsTitle: "Không phải ai cũng có cơ hội đi đầu",
      joinUsText:
        "Với Deron, bạn không chỉ đầu tư vào một startup, mà là góp phần mở cánh cửa cho một kỷ nguyên mới, nơi thế giới nhớ đến Việt Nam.",
      getInTouch: "Liên hệ với chúng tôi",
    },
  },

  en: {
    code: "en",
    label: "English",
    flag: "🇬🇧",
    languageNote: "Change language",

    nav: {
      mission: "Mission",
      technology: "Technology",
      roadmap: "Roadmap",
      contact: "Contact",
    },

    contact: {
      joinUsTitle: "Not everyone gets the chance to be first",
      joinUsText:
        "With Deron, you're not just investing in a startup. You're helping open the door to a new era where the world remembers Vietnam.",
      getInTouch: "Get in touch",
    },
  },

  zh: {
    code: "zh",
    label: "中文",
    flag: "🇨🇳",
    languageNote: "切换语言",

    nav: {
      mission: "使命",
      technology: "技术",
      roadmap: "路线图",
      contact: "联系",
    },

    contact: {
      joinUsTitle: "不是每个人都有机会做第一个",
      joinUsText:
        "与 Deron 一起，你不仅是在投资一家初创公司，而是在帮助开启一个新的时代，让世界重新记住越南。",
      getInTouch: "联系我们",
    },
  },
};
