import React from "react";

export default function DACTSHero({ onInstallClick }) {
  const scrollToOverview = () => {
    document.getElementById("dacts-overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-14 md:pt-20 md:pb-20">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">DACTS ENTRY FLOW</p>
      <h1 className="mt-4 text-4xl md:text-6xl font-semibold max-w-5xl leading-tight">
        DACTS — Hệ thống điều phối UAV nghiêm túc cho Việt Nam
      </h1>
      <p className="mt-6 max-w-4xl text-lg text-slate-600 dark:text-slate-300">
        DACTS là nền tảng điều hành UAV của Deron, được thiết kế cho vận hành thực địa, quản lý đội bay,
        kiểm soát nhiệm vụ, và mở rộng theo lộ trình thành một lớp GCS + UTM phù hợp với bối cảnh Việt Nam.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={scrollToOverview}
          className="rounded-full px-6 py-3 border border-[var(--line)] font-medium hover:border-[#c41e3a]/70"
        >
          Khám phá DACTS
        </button>
        <button onClick={onInstallClick} className="rounded-full px-6 py-3 bg-[#c41e3a] text-white font-medium">
          Install DACTS
        </button>
      </div>
    </section>
  );
}
