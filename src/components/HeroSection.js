import React from "react";
import { ChevronRight } from "lucide-react";

export default function HeroSection({ t, scrollToSection }) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16"
    >
      <div className="max-w-5xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 border border-red-500/50 text-red-600 dark:text-red-300 text-xs uppercase tracking-[0.25em] rounded-full bg-white/70 dark:bg-gray-900/60 shadow-sm">
          {t.hero.badge}
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-semibold mb-6 leading-tight text-gray-900 dark:text-white">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12">
          {t.hero.subtitle}
        </p>

        {/* CTA */}
        <button
          onClick={() => scrollToSection("about")}
          className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-red-500/10 mb-16"
        >
          {t.hero.cta}
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>

        {/* 3 Golden Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.hero.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-4xl font-semibold text-red-600 dark:text-red-400 mb-2">
                {metric.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
