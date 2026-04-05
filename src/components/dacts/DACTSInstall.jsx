import React from "react";

const STEPS = [
  "Chọn nền tảng và nhấn Install",
  "Điền thông tin yêu cầu cài đặt",
  "Hệ thống xác thực và chuẩn bị bản phân phối",
  "Nhận link tải qua email",
  "Hoàn tất cài đặt trong thời hạn 72 giờ",
];

export default function DACTSInstall({ onInstallClick, onContactClick }) {
  return (
    <section
      id="dacts-install"
      className="scroll-mt-36 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10 landscape-install-shell"
    >
      <h3 className="text-2xl font-semibold landscape-dacts-section-title">Install Flow</h3>
      <div className="mt-6 grid gap-3 md:grid-cols-5 landscape-install-grid">
        {STEPS.map((step, index) => (
          <div key={step} className="rounded-xl border border-[var(--line)] p-3 landscape-install-step">
            <p className="text-xs uppercase tracking-wide text-slate-500">Step {index + 1}</p>
            <p className="mt-1 text-sm landscape-card-copy">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 landscape-install-actions">
        <button onClick={onInstallClick} className="rounded-full px-7 py-3 bg-[#c41e3a] text-white font-medium landscape-primary-cta">
          Install DACTS
        </button>
        <button
          onClick={onContactClick}
          className="rounded-full px-6 py-3 border border-[var(--line)] font-medium landscape-secondary-cta"
        >
          Liên hệ Deron
        </button>
      </div>
    </section>
  );
}
