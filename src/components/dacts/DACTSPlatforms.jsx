import React from "react";

const PLATFORM_CARDS = [
  { key: "windows", label: "Windows", icon: "🪟" },
  { key: "macos", label: "macOS", icon: "" },
  { key: "linux", label: "Linux", icon: "🐧" },
  { key: "iphone", label: "iPhone", icon: "📱" },
  { key: "ipad", label: "iPad", icon: "📲" },
  { key: "android_phone", label: "Android Phone", icon: "🤖" },
  { key: "android_tablet", label: "Android Tablet", icon: "📟" },
];

export default function DACTSPlatforms({ detectedPlatform }) {
  return (
    <section id="dacts-platforms" className="scroll-mt-36 landscape-dacts-section">
      <h3 className="text-2xl font-semibold landscape-dacts-section-title">Platform Support</h3>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 landscape-dacts-meta">
        Platform context: <strong>{detectedPlatform}</strong>
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 landscape-platform-grid">
        {PLATFORM_CARDS.map((platform) => {
          const isDetected = platform.key === detectedPlatform;

          return (
            <article key={platform.key} className="rounded-2xl border p-5 bg-[var(--surface)] transition landscape-platform-card border-[var(--line)]">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-lg">
                  <span className="mr-2">{platform.icon}</span>
                  {platform.label}
                </h4>
                {isDetected && <span className="text-xs rounded-full px-2 py-1 bg-[#c41e3a]/15 text-[#ff4f6b]">Detected</span>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
