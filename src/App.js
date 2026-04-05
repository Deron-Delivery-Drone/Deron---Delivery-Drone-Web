import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import DownloadRequestModal from "./components/download/DownloadRequestModal";
import { detectInitialLanguage, setLanguagePreference, translations } from "./config/i18n";
import { useTheme } from "./hooks/useTheme";
import { detectPlatform } from "./utils/platform";
import { PLATFORM_OPTIONS } from "./constants/platforms";

function App() {
  const [language, setLanguage] = useState(detectInitialLanguage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const detectedPlatform = useMemo(() => detectPlatform(), []);
  const [preferredPlatform, setPreferredPlatform] = useState(detectedPlatform === "unknown" ? "" : detectedPlatform);
  const [dactsActive, setDactsActive] = useState(false);
  const { theme, setTheme } = useTheme();

  const dactsSectionRef = useRef(null);

  const t = translations[language] || translations.en;

  useEffect(() => {
    const node = dactsSectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setDactsActive(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const updateLanguage = (value) => {
    setLanguage(value);
    setLanguagePreference(value);
  };

  const navigateToDactsIntro = () => {
    setMobileOpen(false);
    document.getElementById("dacts-intro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToDactsSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openInstallModal = () => {
    setDownloadOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] transition-colors">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--line)] bg-[var(--surface-elevated)]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/Deron-logo-dark.png" alt="Deron" className="h-8 w-8 dark:hidden" />
            <img src="/Deron-logo-light.png" alt="Deron" className="h-8 w-8 hidden dark:block" />
            <span className="font-semibold tracking-wide">DERON</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#home" className="text-sm">{t.nav.home}</a>
            <a href="#mission" className="text-sm">{t.nav.mission}</a>
            <a href="#contact" className="text-sm">{t.nav.contact}</a>

            <select value={language} onChange={(e) => updateLanguage(e.target.value)} className="rounded-full px-3 py-1.5 bg-transparent border border-[var(--line)] text-sm">
              <option value="vi">VI</option>
              <option value="en">EN</option>
              <option value="zh">ZH</option>
            </select>

            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="rounded-full px-3 py-1.5 bg-transparent border border-[var(--line)] text-sm">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <a href="#dacts-intro" onClick={navigateToDactsIntro} className="text-sm">{t.nav.download}</a>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen((prev) => !prev)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--line)] p-4 flex flex-col gap-3 bg-[var(--surface-elevated)]">
            <a href="#home">{t.nav.home}</a>
            <a href="#mission">{t.nav.mission}</a>
            <a href="#contact">{t.nav.contact}</a>
            <a href="#dacts-intro" onClick={navigateToDactsIntro} className="text-left text-sm">{t.nav.download}</a>
          </div>
        )}
      </nav>

      <main className="pt-20">
        <section id="home" className="max-w-7xl mx-auto px-6 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">DACTS Entry Flow</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold max-w-4xl leading-tight">{t.heroTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300">{t.heroBody}</p>
          <button onClick={navigateToDactsIntro} className="mt-10 rounded-full px-6 py-3 bg-[#c41e3a] text-white font-medium">{t.nav.download}</button>
        </section>

        <section id="mission" className="max-w-7xl mx-auto px-6 pb-24">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)] p-8 md:p-12">
            <h2 className="text-2xl font-semibold">Platform-aware secure distribution</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Detected platform: <strong>{detectedPlatform}</strong>. The request flow stores lead information, generates 72-hour temporary tokens, and sends transactional download email via Supabase Edge Functions.</p>
          </div>
        </section>

        <section ref={dactsSectionRef} id="dacts-intro" className="relative border-y border-[var(--line)] bg-[var(--surface-elevated)]/70">
          <div className="sticky top-16 z-40 border-b border-[var(--line)] bg-[var(--surface-elevated)]/95 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 overflow-x-auto">
              <button onClick={() => scrollToDactsSection("dacts-overview")} className="shrink-0 text-sm px-3 py-1.5 rounded-full border border-[var(--line)]">{t.dacts.subnav.overview}</button>
              <button onClick={() => scrollToDactsSection("dacts-features")} className="shrink-0 text-sm px-3 py-1.5 rounded-full border border-[var(--line)]">{t.dacts.subnav.features}</button>
              <button onClick={() => scrollToDactsSection("dacts-platforms")} className="shrink-0 text-sm px-3 py-1.5 rounded-full border border-[var(--line)]">{t.dacts.subnav.platforms}</button>
              <button onClick={() => scrollToDactsSection("dacts-security")} className="shrink-0 text-sm px-3 py-1.5 rounded-full border border-[var(--line)]">{t.dacts.subnav.security}</button>
              <button onClick={openInstallModal} className="ml-auto shrink-0 text-sm px-4 py-1.5 rounded-full bg-[#c41e3a] text-white font-medium">{t.dacts.subnav.install}</button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-14 md:grid md:grid-cols-[minmax(0,1fr)_300px] md:gap-8">
            <div className="space-y-14">
            <section id="dacts-overview" className="scroll-mt-36">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">DACTS</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold max-w-4xl leading-tight">{t.dacts.title}</h2>
              <p className="mt-5 max-w-4xl text-base md:text-lg text-slate-600 dark:text-slate-300">{t.dacts.subtitle}</p>
              <ul className="mt-8 grid gap-3 md:grid-cols-2">
                {t.dacts.highlights.map((item) => (
                  <li key={item} className="rounded-2xl border border-[var(--line)] px-4 py-3 text-sm md:text-base bg-[var(--surface)]">{item}</li>
                ))}
              </ul>
            </section>

            <section id="dacts-features" className="scroll-mt-36">
              <h3 className="text-2xl font-semibold">{t.dacts.featuresTitle}</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {t.dacts.featureCards.map((card) => (
                  <article key={card.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                    <h4 className="font-semibold">{card.title}</h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="dacts-platforms" className="scroll-mt-36">
              <h3 className="text-2xl font-semibold">{t.dacts.platformsTitle}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t.dacts.detectedLabel}: <strong>{detectedPlatform}</strong></p>
              <div className="mt-5 flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((platform) => (
                  <button
                    key={platform.key}
                    onClick={() => setPreferredPlatform(platform.key)}
                    className={`rounded-full px-3 py-1.5 text-sm border transition ${preferredPlatform === platform.key ? "bg-[#c41e3a] text-white border-[#c41e3a]" : "border-[var(--line)]"}`}
                  >
                    {platform.label[language]}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t.dacts.selectedLabel}: <strong>{preferredPlatform || t.dacts.noneSelected}</strong></p>
            </section>

            <section id="dacts-security" className="scroll-mt-36">
              <h3 className="text-2xl font-semibold">{t.dacts.securityTitle}</h3>
              <ul className="mt-5 space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
                {t.dacts.securityPoints.map((point) => (
                  <li key={point} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3">{point}</li>
                ))}
              </ul>
            </section>

            <section id="dacts-install" className="scroll-mt-36 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
              <h3 className="text-2xl font-semibold">{t.dacts.finalCtaTitle}</h3>
              <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{t.dacts.finalCtaBody}</p>
              <button onClick={openInstallModal} className="mt-6 rounded-full px-6 py-3 bg-[#c41e3a] text-white font-medium">{t.dacts.subnav.install}</button>
            </section>
            </div>
            <aside className="hidden md:block">
              <div className="sticky top-32 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.dacts.stickyLabel}</p>
                <h4 className="mt-2 font-semibold">{t.dacts.stickyTitle}</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t.dacts.stickyBody}</p>
                <button onClick={openInstallModal} className="mt-5 w-full rounded-full px-5 py-2.5 bg-[#c41e3a] text-white font-medium">
                  {t.dacts.subnav.install}
                </button>
              </div>
            </aside>
          </div>
        </section>

        <section id="contact" className="max-w-7xl mx-auto px-6 pt-16 pb-32 md:pb-20">
          <p className="text-sm text-slate-500">{t.footer}</p>
        </section>
      </main>

      {dactsActive && (
        <>
          <div className="md:hidden fixed inset-x-0 bottom-0 z-[60] p-3 bg-gradient-to-t from-[var(--surface)] to-transparent">
            <button onClick={openInstallModal} className="w-full rounded-full px-5 py-3 bg-[#c41e3a] text-white shadow-lg font-medium">
              {t.dacts.mobileStickyInstall}
            </button>
          </div>
        </>
      )}

      <DownloadRequestModal
        open={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        language={language}
        t={t}
        detectedPlatform={detectedPlatform}
        preselectedPlatform={preferredPlatform}
      />
    </div>
  );
}

export default App;
