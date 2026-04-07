import React from "react";

const CONCEPTS = [
  {
    title: "Operational Infrastructure",
    body: "DACTS được thiết kế như lớp hạ tầng điều hành UAV có tiêu chuẩn vận hành, không phải ứng dụng tiêu dùng thông thường.",
  },
  {
    title: "Cross-Team Command Context",
    body: "Nhiệm vụ, operator, thiết bị và trạng thái đội bay được gom trong cùng một ngữ cảnh để giảm đứt gãy quy trình.",
  },
  {
    title: "National-scale Readiness",
    body: "Kiến trúc hướng tới điều phối an toàn, tương thích mở rộng với yêu cầu phối hợp không phận trong tương lai tại Việt Nam.",
  },
];

export default function DACTSOverview() {
  return (
    <section id="dacts-overview" className="scroll-mt-36 landscape-dacts-section">
      <h2 className="text-3xl md:text-5xl font-semibold max-w-4xl leading-tight landscape-dacts-overview-title">Overview</h2>
      <p className="mt-5 max-w-4xl text-base md:text-lg text-slate-600 dark:text-slate-300 landscape-dacts-overview-copy">
        DACTS là hệ thống điều hành cho môi trường bay thật: có chuẩn kiểm soát, luồng vận hành, và quản trị phân phối.
        Đây là nền tảng operational-grade phục vụ tổ chức vận hành UAV nghiêm túc.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3 landscape-overview-grid">
        {CONCEPTS.map((item) => (
          <article key={item.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 landscape-overview-card">
            <h3 className="font-semibold text-lg landscape-card-title">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 landscape-card-copy">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
