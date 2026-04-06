import React, { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { detectInitialLanguage, setLanguagePreference, translations } from "./config/i18n";
import { useTheme } from "./hooks/useTheme";
import { detectPlatform } from "./utils/platform";
import DACTSPage from "./pages/DACTSPage";

function App() {
  const [language, setLanguage] = useState(detectInitialLanguage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const detectedPlatform = useMemo(() => detectPlatform(), []);
  const [activeView, setActiveView] = useState("home");
  const { theme, setTheme } = useTheme();

  const t = translations[language] || translations.en;

  const updateLanguage = (value) => {
    setLanguage(value);
    setLanguagePreference(value);
  };

  const navigateToView = (view) => {
    setMobileOpen(false);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactFromDacts = () => {
    setActiveView("home");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] transition-colors">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--line)] bg-[var(--surface-elevated)]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 landscape-nav-height flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/Deron-logo-dark.png" alt="Deron" className="h-8 w-8 dark:hidden" />
            <img src="/Deron-logo-light.png" alt="Deron" className="h-8 w-8 hidden dark:block" />
            <span className="font-semibold tracking-wide landscape-wordmark">DERON</span>
          </div>

          <div className="hidden md:flex items-center gap-4 landscape-desktop-nav">
            <button onClick={() => navigateToView("home")} className="text-sm">
              {t.nav.home}
            </button>
            <a href="#mission" className="text-sm">
              {t.nav.mission}
            </a>
            <a href="#contact" className="text-sm">
              {t.nav.contact}
            </a>

            <select
              value={language}
              onChange={(e) => updateLanguage(e.target.value)}
              className="rounded-full px-3 py-1.5 bg-transparent border border-[var(--line)] text-sm"
            >
              <option value="vi">VI</option>
              <option value="en">EN</option>
              <option value="zh">ZH</option>
            </select>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-full px-3 py-1.5 bg-transparent border border-[var(--line)] text-sm"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <button onClick={() => navigateToView("dacts")} className="text-sm">
              {t.nav.dacts}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden landscape-mobile-actions">
            <select
              value={language}
              onChange={(e) => updateLanguage(e.target.value)}
              className="rounded-full px-2.5 py-1.5 bg-transparent border border-[var(--line)] text-xs font-medium uppercase tracking-wide"
              aria-label="Language switch"
            >
              <option value="vi">VI</option>
              <option value="en">EN</option>
              <option value="zh">ZH</option>
            </select>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)]"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden landscape-mobile-menu border-t border-[var(--line)] p-4 flex flex-col gap-2.5 bg-[var(--surface-elevated)]">
            <button onClick={() => navigateToView("home")} className="text-left">
              {t.nav.home}
            </button>
            <a href="#mission" onClick={() => setMobileOpen(false)}>
              {t.nav.mission}
            </a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              {t.nav.contact}
            </a>
            <button onClick={() => navigateToView("dacts")} className="text-left text-sm">
              {t.nav.dacts}
            </button>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {activeView === "home" ? (
          <>
            <section id="home" className="max-w-7xl mx-auto px-6 py-24 landscape-home-hero">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">DACTS Product Overview</p>
              <h1 className="mt-4 text-4xl md:text-6xl font-semibold max-w-4xl leading-tight landscape-home-title">{t.heroTitle}</h1>
              <p className="mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300 landscape-home-body">{t.heroBody}</p>
              <button
                onClick={() => navigateToView("dacts")}
                className="mt-10 rounded-full px-6 py-3 bg-[#c41e3a] text-white font-medium landscape-primary-cta"
              >
                {t.nav.dacts}
              </button>
            </section>

            <section id="mission" className="max-w-7xl mx-auto px-6 pb-24 landscape-home-section">
              <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)] p-8 md:p-12 landscape-home-card">
                <h2 className="text-2xl font-semibold landscape-home-section-title">Mission-ready low-altitude operations</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300 landscape-home-section-copy">
                  Detected platform: <strong>{detectedPlatform}</strong>. Deron builds public-facing UAV product and
                  infrastructure narratives for logistics, emergency healthcare, and disaster response in Vietnam.
                </p>
              </div>
            </section>
          </>
        ) : (
          <DACTSPage detectedPlatform={detectedPlatform} onContactClick={contactFromDacts} />
        )}

        <section id="contact" className="max-w-7xl mx-auto px-6 pt-16 pb-32 md:pb-20">
          <p className="text-sm text-slate-500">{t.footer}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
