import React from "react";
import { Cpu, Navigation, Layers } from "lucide-react";

const PRODUCT_ICONS = [Cpu, Navigation, Layers];

export default function AboutSection({ t }) {
  return (
    <section id="about" className="py-24 px-6 bg-gray-50/80 dark:bg-gray-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-xs uppercase tracking-[0.25em] text-red-600 dark:text-red-400 mb-4 text-center">
          {t.about.sectionLabel}
        </p>

        {/* Story & Philosophy */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Story */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.about.storyTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about.storyContent}
            </p>
          </div>

          {/* Philosophy */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t.about.philosophyTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about.philosophyContent}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-8">
          {t.about.products.map((product, idx) => {
            const Icon = PRODUCT_ICONS[idx];
            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start gap-6 p-8 bg-white/80 dark:bg-gray-900/70 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-black/40"
              >
                <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-red-500/30">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
