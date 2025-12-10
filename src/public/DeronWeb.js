// public/DeronWeb.js
import React, { useEffect, useState } from "react";
import { Plane, Heart, Shield, Target, Mail, Sun, Moon, Menu, X } from "lucide-react";
import { TEXTS } from "../data/languagePack";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function DeronWeb({
  publishedContent,
  language,
  setLanguage,
  darkMode,
  toggleDarkMode,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TEXTS[language] || TEXTS.vi;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const wrapperClass = darkMode
    ? "min-h-screen bg-slate-950 text-slate-50"
    : "min-h-screen bg-white text-gray-900";

  const cardBorder = darkMode ? "border-slate-700" : "border-gray-200";
  const subtleText = darkMode ? "text-slate-300" : "text-gray-600";
  const mutedText = darkMode ? "text-slate-400" : "text-gray-500";

  return (
    <div className={wrapperClass}>
      {/* ===== NAVBAR ===== */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? darkMode
              ? "bg-slate-950/90 backdrop-blur shadow-md"
              : "bg-white/90 backdrop-blur shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <img
                src="/Deron-logo-NonBackground.png"
                alt="Deron logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight">DERON</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10 text-sm uppercase tracking-wider">
              {["mission", "technology", "roadmap", "contact"].map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="hover:text-red-500 transition-colors"
                >
                  {t.nav[key]}
                </button>
              ))}
            </div>

            {/* Right: Language + Dark mode + Mobile button */}
            <div className="flex items-center space-x-3">
              {/* Language */}
              <div className="hidden md:flex items-center space-x-1 text-xs">
                <span className="mr-1 opacity-70">{t.languageNote}</span>
                {[
                  { code: "vi", label: "VN 🇻🇳" },
                  { code: "en", label: "EN 🇺🇸" },
                  { code: "zh", label: "中文 🇨🇳" },
                ].map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className={`px-2 py-1 rounded border text-xs ${
                      language === opt.code
                        ? "bg-gray-900 text-white border-gray-900"
                        : "border-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full border border-gray-400/60 hover:bg-gray-200/40 dark:hover:bg-slate-800"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen((o) => !o)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={darkMode ? "md:hidden bg-slate-950 border-t border-slate-800" : "md:hidden bg-white border-t"}>
            <div className="px-6 py-4 space-y-2">
              {["mission", "technology", "roadmap", "contact"].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    scrollToSection(key);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left uppercase tracking-wider py-2 text-sm"
                >
                  {t.nav[key]}
                </button>
              ))}

              <div className="flex space-x-3 pt-3">
                {[
                  { code: "vi", label: "VN 🇻🇳" },
                  { code: "en", label: "EN 🇺🇸" },
                  { code: "zh", label: "中文 🇨🇳" },
                ].map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className="px-3 py-1 border rounded text-xs"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-6 pt-32"
      >
        <div className="max-w-4xl text-center">
          <div className="mb-10">
            <div className="inline-block mb-4 px-4 py-1 border border-red-600 text-red-600 text-xs uppercase tracking-widest">
              {publishedContent.hero.badge}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight whitespace-pre-line">
            {publishedContent.hero.title}
          </h1>
          <p className={`mt-6 text-lg ${subtleText} whitespace-pre-line`}>
            {publishedContent.hero.subtitle}
          </p>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section
        id="mission"
        className={darkMode ? "py-32 px-6 bg-slate-900" : "py-32 px-6 bg-gray-50"}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="text-xs uppercase tracking-widest text-red-500 mb-6">
                The Challenge
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {publishedContent.mission.challenge.title}
              </h2>
              <div
                className={`${subtleText} leading-relaxed whitespace-pre-line space-y-4`}
              >
                {publishedContent.mission.challenge.content}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-red-500 mb-6">
                Our Solution
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {publishedContent.mission.solution.title}
              </h2>
              <div
                className={`${subtleText} leading-relaxed whitespace-pre-line space-y-4`}
              >
                {publishedContent.mission.solution.content}
              </div>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-10 w-10 mx-auto mb-4 stroke-1" />
              <div className="text-sm font-medium uppercase tracking-wider mb-2">
                Authenticity
              </div>
              <p className={`text-xs ${mutedText}`}>Real technology for real needs</p>
            </div>
            <div className="text-center">
              <Heart className="h-10 w-10 mx-auto mb-4 stroke-1" />
              <div className="text-sm font-medium uppercase tracking-wider mb-2">
                Compassion
              </div>
              <p className={`text-xs ${mutedText}`}>People-centered service</p>
            </div>
            <div className="text-center">
              <Target className="h-10 w-10 mx-auto mb-4 stroke-1" />
              <div className="text-sm font-medium uppercase tracking-wider mb-2">
                Improvement
              </div>
              <p className={`text-xs ${mutedText}`}>Continuous innovation</p>
            </div>
            <div className="text-center">
              <Plane className="h-10 w-10 mx-auto mb-4 stroke-1" />
              <div className="text-sm font-medium uppercase tracking-wider mb-2">
                Service
              </div>
              <p className={`text-xs ${mutedText}`}>With heart and duty</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY ===== */}
      <section id="technology" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-widest text-red-600 mb-4">
              Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built for Vietnam&apos;s challenges
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className={`border-t-2 pt-6 ${darkMode ? "border-slate-200" : "border-gray-900"}`}>
              <h3 className="text-xl font-bold mb-4">Hardware</h3>
              <p className={`text-sm ${subtleText} mb-4`}>
                Coaxial Octocopter with 7-15kg payload capacity. Carbon composite frame.
                12-18% energy reduction.
              </p>
              <ul className={`text-xs ${mutedText} space-y-2`}>
                <li>360° LiDAR & radar</li>
                <li>AI vision (RGB + thermal)</li>
                <li>GPS RTK ±2cm precision</li>
              </ul>
            </div>

            <div className={`border-t-2 pt-6 ${darkMode ? "border-slate-200" : "border-gray-900"}`}>
              <h3 className="text-xl font-bold mb-4">Software</h3>
              <p className={`text-sm ${subtleText} mb-4`}>
                AI Routing Engine optimized for terrain, weather, and signal density.
                15-25% time reduction.
              </p>
              <ul className={`text-xs ${mutedText} space-y-2`}>
                <li>PX4/Pixhawk autopilot</li>
                <li>Real-time obstacle avoidance</li>
                <li>Intelligent fail-safe systems</li>
              </ul>
            </div>

            <div className={`border-t-2 pt-6 ${darkMode ? "border-slate-200" : "border-gray-900"}`}>
              <h3 className="text-xl font-bold mb-4">Platform</h3>
              <p className={`text-sm ${subtleText} mb-4`}>
                Cloud-based fleet management with real-time monitoring and predictive
                maintenance.
              </p>
              <ul className={`text-xs ${mutedText} space-y-2`}>
                <li>Partner API integration</li>
                <li>Performance analytics</li>
                <li>UTM compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section
        id="roadmap"
        className={darkMode ? "py-32 px-6 bg-slate-900" : "py-32 px-6 bg-gray-50"}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-widest text-red-600 mb-4">
              Roadmap
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Three phases to national infrastructure
            </h2>
          </div>

          <div className="space-y-16">
            {/* Phase 1 */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="text-xs uppercase tracking-widest text-red-600 mb-2">
                  Phase 1
                </div>
                <h3 className="text-2xl font-bold mb-2">Trường Sơn Trail</h3>
                <p className={`text-sm ${mutedText}`}>0-12 months</p>
              </div>
              <div className="md:col-span-2">
                <p className={`${subtleText} mb-4`}>
                  Laying the groundwork with prototype development and regulatory
                  compliance.
                </p>
                <ul className={`space-y-2 text-sm ${subtleText}`}>
                  <li>→ Develop UAV prototype (MVP)</li>
                  <li>→ Build drone traffic control model</li>
                  <li>→ Obtain flight testing permits</li>
                  <li>→ Find Angel Partners for pilots</li>
                  <li>→ Raise Pre-Seed funding (~$600K)</li>
                </ul>
              </div>
            </div>

            <div className={darkMode ? "border-t border-slate-700" : "border-t border-gray-300"} />

            {/* Phase 2 */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="text-xs uppercase tracking-widest text-red-600 mb-2">
                  Phase 2
                </div>
                <h3 className="text-2xl font-bold mb-2">The Điện Biên Battle</h3>
                <p className={`text-sm ${mutedText}`}>12-24 months</p>
              </div>
              <div className="md:col-span-2">
                <p className={`${subtleText} mb-4`}>
                  Establishing operations and expanding service network.
                </p>
                <ul className={`space-y-2 text-sm ${subtleText}`}>
                  <li>→ Launch flight stations in pilot urban areas</li>
                  <li>→ Expand multi-mission services</li>
                  <li>→ Upgrade system capabilities</li>
                  <li>→ Build partnerships across sectors</li>
                  <li>→ Secure Seed funding</li>
                </ul>
              </div>
            </div>

            <div className={darkMode ? "border-t border-slate-700" : "border-t border-gray-300"} />

            {/* Phase 3 */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="text-xs uppercase tracking-widest text-red-600 mb-2">
                  Phase 3
                </div>
                <h3 className="text-2xl font-bold mb-2">Rebuilding Vietnam</h3>
                <p className={`text-sm ${mutedText}`}>24-60 months</p>
              </div>
              <div className="md:col-span-2">
                <p className={`${subtleText} mb-4`}>
                  National expansion and regional leadership.
                </p>
                <ul className={`space-y-2 text-sm ${subtleText}`}>
                  <li>→ Expand to 8-12 major hubs</li>
                  <li>→ Achieve 95% urban coverage</li>
                  <li>→ High localization in manufacturing</li>
                  <li>→ Integrate as national infrastructure</li>
                  <li>→ Expand to Southeast Asia</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-8 border-t border-gray-300 pt-12">
            <div>
              <div className="text-3xl font-bold mb-2">$147B</div>
              <p className={`text-xs uppercase tracking-wider ${mutedText}`}>
                Global market by 2035
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$1.62B</div>
              <p className={`text-xs uppercase tracking-wider ${mutedText}`}>
                Vietnam market by 2031
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5-10%</div>
              <p className={`text-xs uppercase tracking-wider ${mutedText}`}>
                Our target share
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-red-600 mb-6">
            Join Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {t.contact.joinUsTitle}
          </h2>
          <p className={`text-xl ${subtleText} leading-relaxed mb-12`}>
            {t.contact.joinUsText}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            <div className={`border ${cardBorder} p-6 rounded-lg`}>
              <h4 className="font-bold mb-2 uppercase tracking-wider text-sm">
                Investors
              </h4>
              <p className={`text-sm ${subtleText}`}>
                Pre-Seed: $600K for prototype, permits, and pilot operations.
              </p>
            </div>
            <div className={`border ${cardBorder} p-6 rounded-lg`}>
              <h4 className="font-bold mb-2 uppercase tracking-wider text-sm">
                Angel Partners
              </h4>
              <p className={`text-sm ${subtleText}`}>
                Organizations ready to pilot drone delivery services.
              </p>
            </div>
            <div className={`border ${cardBorder} p-6 rounded-lg`}>
              <h4 className="font-bold mb-2 uppercase tracking-wider text-sm">
                Talent
              </h4>
              <p className={`text-sm ${subtleText}`}>
                Engineers, AI specialists, operations experts.
              </p>
            </div>
            <div className={`border ${cardBorder} p-6 rounded-lg`}>
              <h4 className="font-bold mb-2 uppercase tracking-wider text-sm">
                Advisors
              </h4>
              <p className={`text-sm ${subtleText}`}>
                Regulatory and logistics professionals.
              </p>
            </div>
          </div>

          <a
            href={`mailto:${publishedContent.contact.email}`}
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-medium uppercase tracking-wider text-sm hover:bg-red-700 transition-all rounded"
          >
            <Mail className="mr-2 h-5 w-5" />
            {t.contact.getInTouch}
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="/Deron-logo-NonBackground.png"
                alt="Deron logo"
                className="h-8 w-auto"
              />
              <span className="font-bold">DERON</span>
            </div>
            <div className={`${mutedText} text-center md:text-left mb-4 md:mb-0`}>
              <p>Founder: {publishedContent.contact.founder}</p>
              <p className="text-xs mt-1">
                © 2025 Deron. Delivering Vietnam&apos;s future.
              </p>
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-400">
              Ho Chi Minh City, Vietnam
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
