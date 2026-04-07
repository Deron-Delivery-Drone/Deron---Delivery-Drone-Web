import React from "react";

const STEPS = [
  "Khám phá tổng quan sản phẩm DACTS",
  "Đối chiếu bối cảnh vận hành tại Việt Nam",
  "Đánh giá năng lực mission/fleet/safety",
  "Làm việc với Deron để xác định hướng triển khai phù hợp",
];

export default function DACTSInstall({ onContactClick }) {
  return (
    <section
      id="dacts-engage"
      className="scroll-mt-36 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10 landscape-install-shell"
    >
      <h3 className="text-2xl font-semibold landscape-dacts-section-title">Public Engagement Flow</h3>
      <div className="mt-6 grid gap-3 md:grid-cols-4 landscape-install-grid">
        {STEPS.map((step, index) => (
          <div key={step} className="rounded-xl border border-[var(--line)] p-3 landscape-install-step">
            <p className="text-xs uppercase tracking-wide text-slate-500">Step {index + 1}</p>
            <p className="mt-1 text-sm landscape-card-copy">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 landscape-install-actions">
        <button onClick={onContactClick} className="rounded-full px-7 py-3 bg-[#c41e3a] text-white font-medium landscape-primary-cta">
          Liên hệ Deron
        </button>
      </div>
    </section>
  );
}
