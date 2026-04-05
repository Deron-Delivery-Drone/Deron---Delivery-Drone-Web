import React from "react";

export default function DACTSHero({ detectedPlatform, onInstallClick }) {
  const scrollToOverview = () => {
    document.getElementById("dacts-overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-14 md:pt-20 md:pb-20">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">DACTS ENTRY FLOW</p>
      <h1 className="mt-4 text-4xl md:text-6xl font-semibold max-w-5xl leading-tight">
        DACTS: Nền tảng vận hành GCS + UTM cho điều phối UAV tại Việt Nam
      </h1>
      <p className="mt-6 max-w-4xl text-lg text-slate-600 dark:text-slate-300">
        DACTS là lớp hạ tầng điều hành dành cho vận hành thực địa, kết nối lập kế hoạch nhiệm vụ, giám sát telemetry,
        nhận thức vùng hạn chế và quy trình operator thành một trải nghiệm sản phẩm nhất quán. Đây là hướng tiếp cận
        product-grade cho Ground Control Station kết hợp năng lực UTM phù hợp bối cảnh triển khai tại Việt Nam.
      </p>
      <p className="mt-5 inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-sm text-slate-600 dark:text-slate-300">
        Detected platform: <strong className="ml-1 text-[var(--text)]">{detectedPlatform}</strong>
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={scrollToOverview}
          className="rounded-full px-6 py-3 border border-[var(--line)] font-medium hover:border-[#c41e3a]/70"
        >
          Xem tổng quan
        </button>
        <button onClick={onInstallClick} className="rounded-full px-6 py-3 bg-[#c41e3a] text-white font-medium">
          Install DACTS
        </button>
      </div>
    </section>
  );
}
