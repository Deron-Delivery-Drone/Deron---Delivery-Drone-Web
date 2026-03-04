import React from "react";
import {
  ChevronRight,
  Package,
  Handshake,
  Heart,
  Map,
} from "lucide-react";

const REVENUE_ICONS = {
  package: Package,
  handshake: Handshake,
  heart: Heart,
  map: Map,
};

export default function InvestorSection({ t, scrollToSection }) {
  return (
    <section id="investor" className="py-24 px-6 bg-gray-50/80 dark:bg-gray-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-xs uppercase tracking-[0.25em] text-red-600 dark:text-red-400 mb-2 text-center">
          {t.investor.sectionLabel}
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold mb-16 text-center text-gray-900 dark:text-white">
          {t.investor.title}
        </h2>

        {/* Market overview */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t.investor.marketTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl">
            {t.investor.marketDesc}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {t.investor.marketStats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl font-semibold text-red-600 dark:text-red-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive edge */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.investor.edgeTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {t.investor.edges.map((edge, idx) => (
              <div
                key={idx}
                className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
              >
                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  {edge.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {edge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue model */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.investor.revenueTitle}
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {t.investor.revenueStreams.map((stream, idx) => {
              const Icon = REVENUE_ICONS[stream.icon] || Package;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-md shadow-red-500/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {stream.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Funding stages */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.investor.fundingTitle}
          </h3>
          <div className="space-y-6">
            {t.investor.phases.map((phase, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-red-500/30">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {phase.name}
                    </h4>
                    <p className="text-red-600 dark:text-red-400 font-semibold text-lg mt-1">
                      {phase.amount}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {phase.goals.map((goal, gIdx) => (
                        <li
                          key={gIdx}
                          className="flex items-start gap-2 text-gray-700 dark:text-gray-200"
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

        {/* CTA */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-3xl p-10 md:p-14 shadow-xl shadow-black/5 dark:shadow-black/40 border border-gray-100 dark:border-gray-700">
          <h3 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t.investor.ctaTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            {t.investor.ctaDesc}
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
          >
            {t.investor.ctaButton}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
