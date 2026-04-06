import React from "react";

const POINTS = [
  "DACTS được thiết kế cho bối cảnh vận hành UAV nghiêm túc với ưu tiên an toàn và kiểm soát.",
  "Kiến trúc sản phẩm nhấn mạnh tính nhất quán của dữ liệu mission, fleet và trạng thái vận hành.",
  "Định hướng mở rộng để tương thích nhu cầu điều phối nhiều đội bay và không phận trong tương lai.",
  "Mục tiêu là hỗ trợ triển khai thực địa có tiêu chuẩn, không phải workflow tiêu dùng đại trà.",
];

export default function DACTSSecurity() {
  return (
    <section id="dacts-security" className="scroll-mt-36 landscape-dacts-section">
      <h3 className="text-2xl font-semibold landscape-dacts-section-title">Operational Principles</h3>
      <ul className="mt-5 space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-300 landscape-security-list">
        {POINTS.map((point) => (
          <li key={point} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 landscape-security-item">
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
