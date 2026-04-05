import React from "react";

const STEPS = [
  "Chọn Install",
  "Điền thông tin",
  "Hệ thống xác định nền tảng phù hợp",
  "Nhận link qua email",
  "Cài đặt trong thời hạn 72 giờ",
];

export default function DACTSInstall({ onInstallClick, onContactClick }) {
  return (
    <>
      <section id="dacts-install" className="scroll-mt-36 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
        <h3 className="text-2xl font-semibold">Install Flow</h3>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          {STEPS.map((step, index) => (
            <div key={step} className="rounded-xl border border-[var(--line)] p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Step {index + 1}</p>
              <p className="mt-1 text-sm">{step}</p>
            </div>
          ))}
        </div>
        <button onClick={onInstallClick} className="mt-8 rounded-full px-7 py-3 bg-[#c41e3a] text-white font-medium">
          Install DACTS
        </button>
      </section>

      <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)] p-6 md:p-10">
        <h3 className="text-2xl font-semibold">Sẵn sàng trải nghiệm lớp điều hành UAV tiếp theo của Deron?</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={onInstallClick} className="rounded-full px-6 py-3 bg-[#c41e3a] text-white font-medium">
            Install DACTS
          </button>
          <button onClick={onContactClick} className="rounded-full px-6 py-3 border border-[var(--line)] font-medium">
            Liên hệ Deron
          </button>
        </div>
      </section>
    </>
  );
}
