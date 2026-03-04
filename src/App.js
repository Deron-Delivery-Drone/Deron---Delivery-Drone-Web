// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import { fetchPublishedContent } from "./lib/supabase";
import translations from "./data/translations";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import NewsSection from "./components/NewsSection";
import InvestorSection from "./components/InvestorSection";
import ContactSection from "./components/ContactSection";

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("deron-language") || "vi"
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("deron-theme") || "system"
  );

  // NEWS from Supabase
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(false);

  const t = useMemo(
    () => translations[language] || translations.vi,
    [language]
  );

  // Persist language
  useEffect(() => {
    localStorage.setItem("deron-language", language);
  }, [language]);

  // Apply theme
  useEffect(() => {
    localStorage.setItem("deron-theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark =
        theme === "dark" || (theme === "system" && mediaQuery.matches);
      document.documentElement.classList.toggle("dark", isDark);
      document.body.dataset.theme = theme;
    };

    applyTheme();

    const handleChange = () => {
      if (theme === "system") applyTheme();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Load news once on mount
  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        setLoadingNews(true);
        setNewsError(false);
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
  };

  const localeDate = (date) => {
    if (!date) return "";
    const locale =
      language === "en" ? "en-US" : language === "zh" ? "zh-CN" : "vi-VN";
    return new Date(date).toLocaleDateString(locale);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      <Navbar
        t={t}
        language={language}
        setLanguage={setLanguage}
        scrollToSection={scrollToSection}
      />

      <HeroSection t={t} scrollToSection={scrollToSection} />
      <AboutSection t={t} />
      <NewsSection
        t={t}
        news={news}
        loadingNews={loadingNews}
        newsError={newsError}
        localeDate={localeDate}
      />
      <InvestorSection t={t} scrollToSection={scrollToSection} />
      <ContactSection t={t} />

      {/* Footer */}
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
