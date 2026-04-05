import React from "react";

const PLATFORM_CARDS = [
  { key: "windows", label: { vi: "Windows", en: "Windows", zh: "Windows" }, icon: "🪟" },
  { key: "macos", label: { vi: "macOS", en: "macOS", zh: "macOS" }, icon: "" },
  { key: "linux", label: { vi: "Linux", en: "Linux", zh: "Linux" }, icon: "🐧" },
  { key: "iphone", label: { vi: "iPhone", en: "iPhone", zh: "iPhone" }, icon: "📱" },
  { key: "ipad", label: { vi: "iPad", en: "iPad", zh: "iPad" }, icon: "📲" },
];

export default function DACTSPlatforms({ language, detectedPlatform, preferredPlatform, onSelectPlatform, onInstallClick }) {
  const supportedDetected = PLATFORM_CARDS.some((platform) => platform.key === detectedPlatform);
  const recommendation = preferredPlatform || (supportedDetected ? detectedPlatform : "windows");

  return (
    <section id="dacts-platforms" className="scroll-mt-36">
      <h3 className="text-2xl font-semibold">Platforms</h3>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Detected platform: <strong>{detectedPlatform}</strong>
      </p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Recommended install target: <strong>{recommendation}</strong>
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_CARDS.map((platform) => {
          const isDetected = platform.key === detectedPlatform;
          const isRecommended = platform.key === recommendation;
          const isSelected = platform.key === preferredPlatform;

          return (
            <article
              key={platform.key}
              className={`rounded-2xl border p-5 bg-[var(--surface)] transition ${
                isRecommended || isSelected ? "border-[#c41e3a]" : "border-[var(--line)]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-lg">
                  <span className="mr-2">{platform.icon}</span>
                  {platform.label[language] || platform.label.en}
                </h4>
                {isRecommended && (
                  <span className="text-xs rounded-full px-2 py-1 bg-[#c41e3a]/15 text-[#ff4f6b]">Recommended</span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {isDetected && <span className="rounded-full border border-[var(--line)] px-2 py-1">Detected</span>}
                {isSelected && <span className="rounded-full border border-[#c41e3a]/50 px-2 py-1">Selected</span>}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectPlatform(platform.key)}
                  className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm"
                >
                  Chọn nền tảng
                </button>
                <button
                  onClick={() => {
                    onSelectPlatform(platform.key);
                    onInstallClick();
                  }}
                  className="rounded-full bg-[#c41e3a] text-white px-3 py-1.5 text-sm"
                >
                  Install
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
