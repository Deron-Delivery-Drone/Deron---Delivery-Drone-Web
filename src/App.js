// src/App.js
import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Globe,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { fetchPublishedContent } from "./lib/supabase";

// ===== Default content =====
const defaultContent = {
  hero: {
    badge: "Vietnam's Future of Logistics",
    title: "The Điện Biên Phủ of Logistics",
    subtitle:
      "We don't just deliver goods. We deliver hope, life, and knowledge.",
    videoUrl: "",
  },
  mission: {
    title: "Revolutionizing Last-Mile Delivery",
    description:
      "Deron embodies the ambition to build modern transportation infrastructure through innovative use of airspace, serving medical support, humanitarian rescue, and commercial delivery.",
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
        description:
          "Coaxial Octocopter with 7-15kg payload capacity, optimized for Vietnamese terrain and urban environments.",
      },
      {
        title: "AI-Powered Routing",
        description:
          "Smart navigation system that adapts to weather, terrain, and traffic patterns in real-time.",
      },
      {
        title: "Multi-Mission Platform",
        description:
          "Medical emergencies, commercial delivery, disaster response, and mapping - all from one system.",
      },
    ],
  },
  roadmap: {
    title: "Three-Phase Strategy",
    phases: [
      {
        name: "Phase 1: Opening the Trường Sơn Road",
        period: "0-12 months",
        goals: [
          "Develop UAV prototype",
          "Build traffic control model",
          "Obtain flight permits",
          "Find Angel Partners",
        ],
      },
      {
        name: "Phase 2: The Điện Biên Battle",
        period: "12-24 months",
        goals: [
          "Launch operational hubs",
          "Expand multi-mission services",
          "Secure Seed funding",
          "Sign commercial SLAs",
        ],
      },
      {
        name: "Phase 3: Rebuilding Vietnam's Logistics",
        period: "24-60 months",
        goals: [
          "National scale deployment",
          "Hardware localization",
          "Regional expansion",
          "Integrated national platform",
        ],
      },
    ],
  },
  contact: {
    founder: "Nguyễn Phúc Huy (Harry / 阿辉)",
    email: "ceo.deron@gmail.com",
    phone: "+84 363 045 747",
    cta: "Join us in revolutionizing Vietnam's logistics infrastructure",
  },
};

function App() {
  const [content] = useState(defaultContent);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // NEWS từ Supabase
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  // Load news khi mở trang
  useEffect(() => {
    async function loadNews() {
      try {
        setLoadingNews(true);
        // content_type bạn dùng bên Admin là gì thì thay ở đây: "post" hoặc "news"
        const posts = await fetchPublishedContent("post", 6);
        setNews(posts);
        setNewsError(null);
      } catch (err) {
        console.error(err);
        setNewsError("Không tải được tin tức");
      } finally {
        setLoadingNews(false);
      }
    }

    loadNews();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // ---------- PUBLIC VIEW ----------
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/Deron-logo.png"
                alt="Deron logo"
                className="h-10 w-auto"
              />
              <span className="text-2x1 font-bold tracking-tight">DERON</span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-sm hover:text-red-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("mission")}
                className="text-sm hover:text-red-600 transition-colors"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToSection("technology")}
                className="text-sm hover:text-red-600 transition-colors"
              >
                Technology
              </button>
              <button
                onClick={() => scrollToSection("roadmap")}
                className="text-sm hover:text-red-600 transition-colors"
              >
                Roadmap
              </button>
              <button
                onClick={() => scrollToSection("news")}
                className="text-sm hover:text-red-600 transition-colors"
              >
                News
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-3">
              {["home", "mission", "technology", "roadmap", "news", "contact"].map(
                (id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="block w-full text-left py-2"
                  >
                    {id[0].toUpperCase() + id.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-16"
      >
        <div className="max-w-4xl text-center">
          <div className="inline-block mb-4 px-4 py-1 border border-red-600 text-red-600 text-xs uppercase tracking-wider rounded-full">
            {content.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {content.hero.subtitle}
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Join Our Mission
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {content.mission.title}
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            {content.mission.description}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {content.mission.stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-8 bg-white rounded-2xl shadow-sm"
              >
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {content.technology.title}
          </h2>
          <div className="space-y-12">
            {content.technology.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start gap-8 p-8 bg-gray-50 rounded-2xl"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {content.roadmap.title}
          </h2>
          <div className="space-y-8">
            {content.roadmap.phases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{phase.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {phase.period}
                    </p>
                    <ul className="space-y-2">
                      {phase.goals.map((goal, gIdx) => (
                        <li
                          key={gIdx}
                          className="flex items-start gap-2 text-gray-700"
                        >
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

      {/* NEWS từ Supabase */}
      <section id="news" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Tin tức & Cập nhật từ Deron
          </h2>

          {loadingNews && <p>Đang tải tin tức...</p>}
          {newsError && <p className="text-red-600">{newsError}</p>}

          {!loadingNews && !newsError && news.length === 0 && (
            <p>Hiện chưa có bài viết nào được xuất bản.</p>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {news.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                {post.meta_description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.meta_description}
                  </p>
                )}
                <p className="text-sm text-gray-400">
                  {post.published_at &&
                    new Date(post.published_at).toLocaleDateString("vi-VN")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build the Future Together
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            {content.contact.cta}
          </p>

          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">
              {content.contact.founder}
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center justify-center gap-3 text-gray-700 hover:text-red-600"
              >
                <Mail className="h-5 w-5" />
                <span>{content.contact.email}</span>
              </a>
              <a
                href={`tel:${content.contact.phone}`}
                className="flex items-center justify-center gap-3 text-gray-700 hover:text-red-600"
              >
                <Phone className="h-5 w-5" />
                <span>{content.contact.phone}</span>
              </a>
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <Globe className="h-5 w-5" />
                <span>deron.vn</span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              (window.location.href = `mailto:${content.contact.email}`)
            }
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Get in Touch
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p className="mb-2">
            © 2025 Deron. Delivering Vietnam&apos;s future.
          </p>
          <p className="text-sm">Ho Chi Minh City, Vietnam</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
