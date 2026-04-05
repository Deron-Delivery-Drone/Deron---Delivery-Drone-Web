import React from "react";

const POINTS = [
  "User gửi yêu cầu cài đặt.",
  "Yêu cầu được ghi nhận trong hệ thống.",
  "Nền tảng phù hợp được xác định hoặc đề xuất.",
  "Email được gửi tới người yêu cầu.",
  "Link tải có hiệu lực trong 72 giờ.",
  "Phân phối có kiểm soát là chủ đích để bảo đảm vận hành nghiêm túc.",
];

export default function DACTSSecurity() {
  return (
    <section id="dacts-security" className="scroll-mt-36">
      <h3 className="text-2xl font-semibold">Phân phối có kiểm soát, không public file trực tiếp</h3>
      <ul className="mt-5 space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
        {POINTS.map((point) => (
          <li key={point} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3">
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border border-[#c41e3a]/40 bg-[#c41e3a]/10 p-4 text-sm md:text-base">
        <p>“Link tải sẽ được gửi tới email của bạn”</p>
        <p className="mt-1">“Liên kết có hiệu lực trong 72 giờ”</p>
      </div>
    </section>
  );
}
