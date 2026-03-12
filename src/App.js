// src/App.js
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Mail, Phone, Globe, Menu, X, ChevronRight, Languages } from "lucide-react";
import { fetchPublishedContent } from "./lib/supabase";

/**
 * Detect system language from browser settings.
 * Maps to supported languages: vi, en, zh. Defaults to vi.
 */
function detectSystemLanguage() {
  const langs = navigator.languages || [navigator.language || "vi"];
  for (const lang of langs) {
    const code = lang.toLowerCase();
    if (code.startsWith("zh")) return "zh";
    if (code.startsWith("en")) return "en";
    if (code.startsWith("vi")) return "vi";
  }
  return "vi";
}

const translations = {
  vi: {
    languageName: "Việt Nam",
    nav: {
      home: "Trang chủ",
      mission: "Sứ mệnh",
      technology: "Công nghệ",
      roadmap: "Lộ trình",
      news: "Tin tức",
      contact: "Liên hệ",
    },
    hero: {
      badge: "Tương lai logistics của Việt Nam",
      title: "Kỷ nguyên vươn mình của dân tộc",
      subtitle: "Deron xây dựng nền tảng công nghệ drone của người Việt — mở ra một lớp hạ tầng mới trên bầu trời cho logistics, nông nghiệp, giám sát, cứu hộ và nhiều ứng dụng UAV trong tương lai.",
      cta: "Tham gia cùng Deron",
    },
    mission: {
      title: "Cách mạng hóa giao hàng chặng cuối",
      description:
        "Deron khát vọng xây dựng hạ tầng vận tải hiện đại bằng cách khai thác bầu trời, phục vụ cấp cứu y tế, cứu trợ nhân đạo và giao nhận thương mại.",
      stats: [
        { value: "40-60%", label: "Nhanh hơn" },
        { value: "30-50%", label: "Giảm chi phí" },
        { value: "95%", label: "Phủ sóng đô thị" },
      ],
    },
    technology: {
      title: "Sinh ra cho Việt Nam",
      items: [
        {
          title: "Hệ thống UAV tiên tiến",
          description: "Máy bay coaxial octocopter tải 7-15kg, tối ưu cho địa hình và đô thị Việt Nam.",
        },
        {
          title: "Định tuyến bằng AI",
          description: "Dẫn đường thông minh thích ứng thời tiết, địa hình và giao thông theo thời gian thực.",
        },
        {
          title: "Nền tảng đa nhiệm vụ",
          description: "Cấp cứu y tế, giao hàng thương mại, cứu trợ thiên tai, khảo sát bản đồ - tất cả trong một nền tảng.",
        },
      ],
    },
    roadmap: {
      title: "Chiến lược 3 giai đoạn",
      phases: [
        {
          name: "Giai đoạn 1: Mở đường Trường Sơn",
          period: "0-12 tháng",
          goals: ["Phát triển nguyên mẫu UAV", "Xây mô hình điều phối", "Xin phép bay", "Tìm nhà đầu tư thiên thần"],
        },
        {
          name: "Giai đoạn 2: Trận Điện Biên",
          period: "12-24 tháng",
          goals: ["Mở các trung tâm vận hành", "Mở rộng dịch vụ đa nhiệm", "Gọi vốn Seed", "Ký SLA thương mại"],
        },
        {
          name: "Giai đoạn 3: Xây lại hạ tầng logistics",
          period: "24-60 tháng",
          goals: ["Triển khai toàn quốc", "Nội địa hóa phần cứng", "Mở rộng khu vực", "Tích hợp thành nền tảng quốc gia"],
        },
      ],
    },
    news: {
      title: "Tin tức & Cập nhật từ Deron",
      loading: "Đang tải tin tức...",
      error: "Không tải được tin tức",
      empty: "Hiện chưa có bài viết nào được xuất bản.",
      open: "Xem chi tiết",
    },
    contact: {
      headline: "Cùng xây dựng tương lai",
      cta: "Tham gia cách mạng logistics Việt Nam",
      founder: "Nguyễn Phúc Huy (Harry / 阿辉)",
      email: "ceo.deron@gmail.com",
      phone: "+84 363 045 747",
      button: "Liên hệ ngay",
    },
    footer: {
      copyright: "© 2025 Deron. Kiến tạo tương lai Việt Nam.",
      location: "TP. Hồ Chí Minh, Việt Nam",
    },
    accessibility: {
      langLabel: "Thay đổi ngôn ngữ",
      langAuto: "Tự động",
    },
  },

  en: {
    languageName: "English",
    nav: {
      home: "Home",
      mission: "Mission",
      technology: "Technology",
      roadmap: "Roadmap",
      news: "News",
      contact: "Contact",
    },
    hero: {
      badge: "Vietnam's Future of Logistics",
      title: "An Era of National Rise",
      subtitle: "Deron is building a Vietnamese drone technology platform — opening a new layer of sky infrastructure for logistics, agriculture, inspection, emergency response, and many future UAV applications.",
      cta: "Join Our Mission",
    },
    mission: {
      title: "Revolutionizing Last-Mile Delivery",
      description:
        "Deron aims to build modern transportation infrastructure by using airspace for medical, humanitarian, and commercial delivery.",
      stats: [
        { value: "40-60%", label: "Faster Delivery" },
        { value: "30-50%", label: "Cost Reduction" },
        { value: "95%", label: "Urban Coverage" },
      ],
    },
    technology: {
      title: "Built for Vietnam",
      items: [
        {
          title: "Advanced UAV System",
          description: "Coaxial octocopter with 7-15kg payload capacity optimized for Vietnam.",
        },
        {
          title: "AI-Powered Routing",
          description: "Adaptive navigation that understands weather, terrain, and traffic in real time.",
        },
        {
          title: "Multi-Mission Platform",
          description: "Medical response, commercial delivery, disaster relief, and mapping from one platform.",
        },
      ],
    },
    roadmap: {
      title: "Three-Phase Strategy",
      phases: [
        {
          name: "Phase 1: Opening the Trường Sơn Road",
          period: "0-12 months",
          goals: ["Develop UAV prototype", "Build traffic control model", "Obtain flight permits", "Find Angel Partners"],
        },
        {
          name: "Phase 2: The Điện Biên Battle",
          period: "12-24 months",
          goals: ["Launch operational hubs", "Expand multi-mission services", "Secure Seed funding", "Sign commercial SLAs"],
        },
        {
          name: "Phase 3: Rebuilding Vietnam's Logistics",
          period: "24-60 months",
          goals: ["National deployment", "Hardware localization", "Regional expansion", "Integrated national platform"],
        },
      ],
    },
    news: {
      title: "News & Updates from Deron",
      loading: "Loading news...",
      error: "Unable to load news",
      empty: "No published articles yet.",
      open: "Open story",
    },
    contact: {
      headline: "Let's Build the Future Together",
      cta: "Join us in revolutionizing Vietnam's logistics infrastructure",
      founder: "Nguyễn Phúc Huy (Harry / 阿辉)",
      email: "ceo.deron@gmail.com",
      phone: "+84 363 045 747",
      button: "Get in Touch",
    },
    footer: {
      copyright: "© 2025 Deron. Delivering Vietnam's future.",
      location: "Ho Chi Minh City, Vietnam",
    },
    accessibility: {
      langLabel: "Change language",
      langAuto: "Auto",
    },
  },

  zh: {
    languageName: "中国",
    nav: {
      home: "首页",
      mission: "使命",
      technology: "技术",
      roadmap: "路线图",
      news: "新闻",
      contact: "联系",
    },
    hero: {
      badge: "越南物流的未来",
      title: "民族腾飞的新纪元",
      subtitle: "Deron 正在打造属于越南人的无人机技术平台——为物流、农业、巡检、救援以及未来更多无人机应用，开启一层全新的空中基础设施。",
      cta: "加入 Deron",
    },
    mission: {
      title: "革新末端配送",
      description: "Deron 通过利用空域打造现代交通基础设施，服务医疗救援、人道救助与商业配送。",
      stats: [
        { value: "40-60%", label: "配送更快" },
        { value: "30-50%", label: "成本降低" },
        { value: "95%", label: "覆盖城市" },
      ],
    },
    technology: {
      title: "为越南而生",
      items: [
        {
          title: "先进无人机系统",
          description: "7-15kg 载荷的同轴八旋翼，针对越南地形与城市优化。",
        },
        {
          title: "AI 智能路线",
          description: "实时理解天气、地形与交通的智能导航。",
        },
        {
          title: "多场景平台",
          description: "医疗急救、商业配送、灾害救援、测绘勘探，一站式平台。",
        },
      ],
    },
    roadmap: {
      title: "三阶段战略",
      phases: [
        {
          name: "阶段一：开启长山路",
          period: "0-12 个月",
          goals: ["开发 UAV 原型", "建设调度模型", "获取飞行许可", "寻找天使投资"],
        },
        {
          name: "阶段二：奠边之战",
          period: "12-24 个月",
          goals: ["启动运营中心", "扩展多场景服务", "完成种子轮融资", "签订商业 SLA"],
        },
        {
          name: "阶段三：重塑物流基础设施",
          period: "24-60 个月",
          goals: ["全国落地", "硬件本地化", "区域拓展", "打造国家级平台"],
        },
      ],
    },
    news: {
      title: "Deron 新闻与更新",
      loading: "加载新闻中...",
      error: "无法获取新闻",
      empty: "尚未有发布的文章。",
      open: "查看详情",
    },
    contact: {
      headline: "一起构建未来",
      cta: "加入我们，共同革新越南物流基础设施",
      founder: "Nguyễn Phúc Huy (Harry / 阿辉)",
      email: "ceo.deron@gmail.com",
      phone: "+84 363 045 747",
      button: "立即联系",
    },
    footer: {
      copyright: "© 2025 Deron. 构建越南的未来。",
      location: "胡志明市，越南",
    },
    accessibility: {
      langLabel: "切换语言",
      langAuto: "自动",
    },
  },
};

function App() {
  // Language: check localStorage first, then auto-detect from system
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("deron-language") || detectSystemLanguage();
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // NEWS from Supabase
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(false);

  const t = useMemo(() => translations[language] || translations.vi, [language]);

  // Handle language change and persist
  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem("deron-language", lang);
  }, []);

  // Theme: always follow system (light/dark). No manual toggle.
  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const contrastQuery = window.matchMedia("(prefers-contrast: more)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", darkQuery.matches);
      document.documentElement.classList.toggle("high-contrast", contrastQuery.matches);
      document.documentElement.classList.toggle("reduce-motion", motionQuery.matches);
    };

    applyTheme();

    darkQuery.addEventListener("change", applyTheme);
    contrastQuery.addEventListener("change", applyTheme);
    motionQuery.addEventListener("change", applyTheme);
    return () => {
      darkQuery.removeEventListener("change", applyTheme);
      contrastQuery.removeEventListener("change", applyTheme);
      motionQuery.removeEventListener("change", applyTheme);
    };
  }, []);

  // Listen for system language changes (e.g. user changes OS language)
  useEffect(() => {
    const handleLanguageChange = () => {
      if (!localStorage.getItem("deron-language")) {
        setLanguage(detectSystemLanguage());
      }
    };
    window.addEventListener("languagechange", handleLanguageChange);
    return () => window.removeEventListener("languagechange", handleLanguageChange);
  }, []);

  // Load news once on mount
  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        setLoadingNews(true);
        setNewsError(false);

        // content_type bạn dùng bên Admin là gì thì thay ở đây: "post" hoặc "news"
        const posts = await fetchPublishedContent("post", 6);
        if (!mounted) return;

        setNews(Array.isArray(posts) ? posts : []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setNewsError(true);
      } finally {
        if (mounted) setLoadingNews(false);
      }
    }

    loadNews();
    return () => {
      mounted = false;
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const localeDate = (date) => {
    if (!date) return "";
    const locale = language === "en" ? "en-US" : language === "zh" ? "zh-CN" : "vi-VN";
    return new Date(date).toLocaleDateString(locale);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <div className="flex items-center space-x-3">
              <img src="/Deron-logo.png" alt="Deron logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DERON</span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection("mission")}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {t.nav.mission}
              </button>
              <button
                onClick={() => scrollToSection("technology")}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {t.nav.technology}
              </button>
              <button
                onClick={() => scrollToSection("roadmap")}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {t.nav.roadmap}
              </button>
              <button
                onClick={() => scrollToSection("news")}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {t.nav.news}
              </button>

              {/* Contact (only once) */}
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors shadow-sm"
              >
                {t.nav.contact}
              </button>

              {/* Language (only here; ribbon removed) */}
              <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                <Languages className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  aria-label={t.accessibility.langLabel}
                  className="ml-2 border border-gray-200/80 dark:border-gray-700/80 rounded-full pl-3 pr-6 py-2 text-sm bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="vi">🇻🇳 Việt Nam</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="zh">🇨🇳 中国</option>
                </select>
              </div>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-800 dark:text-gray-200">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="px-6 py-4 space-y-3">
              {["home", "mission", "technology", "roadmap", "news", "contact"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left py-2 text-gray-800 dark:text-gray-100"
                >
                  {t.nav[id]}
                </button>
              ))}

              {/* Mobile language */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">
                  {t.accessibility.langLabel}
                </label>
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="vi">🇻🇳 Việt Nam</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="zh">🇨🇳 中国</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 border border-red-500/50 text-red-600 dark:text-red-300 text-xs uppercase tracking-[0.25em] rounded-full bg-white/70 dark:bg-gray-900/60 shadow-sm">
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold mb-6 leading-tight text-gray-900 dark:text-white">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
            {t.hero.subtitle}
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-red-500/10"
          >
            {t.hero.cta}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-24 px-6 bg-gray-50/80 dark:bg-gray-900/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.mission.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {t.mission.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.mission.stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-4xl font-semibold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-14 text-center text-gray-900 dark:text-white">
            {t.technology.title}
          </h2>
          <div className="space-y-10">
            {t.technology.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start gap-8 p-8 bg-white/80 dark:bg-gray-900/70 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-black/40"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-24 px-6 bg-gray-50/80 dark:bg-gray-900/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-14 text-center text-gray-900 dark:text-white">
            {t.roadmap.title}
          </h2>
          <div className="space-y-8">
            {t.roadmap.phases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-red-500/30">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{phase.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{phase.period}</p>
                    <ul className="space-y-2">
                      {phase.goals.map((goal, gIdx) => (
                        <li key={gIdx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                          <ChevronRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">{t.news.title}</h2>
            <div className="h-0.5 flex-1 ml-4 bg-gradient-to-r from-red-500/70 to-transparent rounded-full" />
          </div>

          {loadingNews && <p className="text-gray-600 dark:text-gray-300">{t.news.loading}</p>}
          {!loadingNews && newsError && <p className="text-red-600 dark:text-red-400">{t.news.error}</p>}
          {!loadingNews && !newsError && news.length === 0 && (
            <p className="text-gray-600 dark:text-gray-300">{t.news.empty}</p>
          )}

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {news.map((post) => {
              const targetUrl = post.external_url || (post.slug ? `/news/${post.slug}` : null);
              const imageSrc = post.featured_image || "/Deron-logo.png";
              const isClickable = Boolean(targetUrl);

              const cardBody = (
                <div className="h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg shadow-black/5 dark:shadow-black/40 flex flex-col">
                  <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                    <img
                      src={imageSrc}
                      alt={post.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/Deron-logo.png";
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col p-6 gap-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
                      {localeDate(post.published_at)}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h3>

                    {post.meta_description && (
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
                        {post.meta_description}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="text-sm text-red-600 dark:text-red-400 font-medium">{t.news.open}</span>
                      <ChevronRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                </div>
              );

              if (!isClickable) {
                return (
                  <div key={post.id} className="cursor-default">
                    {cardBody}
                  </div>
                );
              }

              return (
                <a
                  key={post.id}
                  href={targetUrl}
                  target={post.external_url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-red-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
                >
                  <div className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                    {cardBody}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-900 dark:text-white">{t.contact.headline}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">{t.contact.cta}</p>

          <div className="bg-gray-50 dark:bg-gray-900/70 rounded-3xl p-8 md:p-10 mb-10 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-black/40">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t.contact.founder}</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                <Mail className="h-5 w-5" />
                <span>{t.contact.email}</span>
              </a>
              <a
                href={`tel:${t.contact.phone}`}
                className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                <Phone className="h-5 w-5" />
                <span>{t.contact.phone}</span>
              </a>
              <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200">
                <Globe className="h-5 w-5" />
                <span>deron.vn</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = `mailto:${t.contact.email}`)}
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-red-500/10"
          >
            {t.contact.button}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-300">
          <p className="mb-2">{t.footer.copyright}</p>
          <p className="text-sm">{t.footer.location}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
