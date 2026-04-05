import React from "react";

const POINTS = [
  "DACTS được phân phối theo cơ chế kiểm soát để đảm bảo đúng operator, đúng ngữ cảnh triển khai.",
  "Không dùng mô hình public direct-download cho luồng cài đặt vận hành.",
  "Mỗi yêu cầu cài đặt được ghi nhận và xử lý qua hệ thống phân phối có kiểm chứng.",
  "Liên kết tải được gửi qua email và chỉ có hiệu lực trong 72 giờ.",
];

export default function DACTSSecurity() {
  return (
    <section id="dacts-security" className="scroll-mt-36 landscape-dacts-section">
      <h3 className="text-2xl font-semibold landscape-dacts-section-title">Security &amp; Distribution</h3>
      <ul className="mt-5 space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-300 landscape-security-list">
        {POINTS.map((point) => (
          <li key={point} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 landscape-security-item">
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border border-[#c41e3a]/40 bg-[#c41e3a]/10 p-4 text-sm md:text-base landscape-security-highlight">
        <p>Email delivery: Link tải gửi trực tiếp đến email người yêu cầu.</p>
        <p className="mt-1">Link validity: 72 giờ kể từ lúc phát hành.</p>
      </div>
    </section>
  );
}
