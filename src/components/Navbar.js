import React, { useState } from "react";
import { Menu, X, Languages } from "lucide-react";

const NAV_ITEMS = ["home", "about", "news", "investor"];

export default function Navbar({ t, language, setLanguage, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/Deron-logo.png" alt="Deron logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              DERON
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((id) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {t.nav[id]}
              </button>
            ))}

            {/* Contact CTA */}
            <button
              onClick={() => handleNav("contact")}
              className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors shadow-sm"
            >
              {t.nav.contact}
            </button>

            {/* Language selector */}
            <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
              <Languages className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Change language"
                className="ml-2 border border-gray-200/80 dark:border-gray-700/80 rounded-full pl-3 pr-6 py-2 text-sm bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="vi">Việt Nam</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-800 dark:text-gray-200"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4 space-y-3">
            {[...NAV_ITEMS, "contact"].map((id) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className="block w-full text-left py-2 text-gray-800 dark:text-gray-100"
              >
                {t.nav[id]}
              </button>
            ))}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="vi">Việt Nam</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
