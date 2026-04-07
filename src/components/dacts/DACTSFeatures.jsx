import React from "react";

const CAPABILITIES = [
  {
    title: "Mission Planning",
    body: "Tổ chức kế hoạch nhiệm vụ, mốc thực thi, và tiêu chí hoàn thành theo chuẩn vận hành thực địa.",
  },
  {
    title: "Live Telemetry Context",
    body: "Theo dõi trạng thái bay và tín hiệu hệ thống để duy trì nhận thức tình huống trong suốt mission lifecycle.",
  },
  {
    title: "Restricted-zone Overlays",
    body: "Hiển thị lớp vùng hạn chế/no-fly để hỗ trợ ra quyết định trước và trong lúc vận hành.",
  },
  {
    title: "Status Awareness",
    body: "Đồng bộ trạng thái đội bay, operator và tiến độ nhiệm vụ giúp giảm rủi ro điều phối.",
  },
  {
    title: "Operator Workflow",
    body: "Luồng thao tác rõ ràng từ tiếp nhận, thực hiện đến hậu kiểm, giảm phụ thuộc vào bước thủ công rời rạc.",
  },
  {
    title: "Extensible Architecture",
    body: "Kiến trúc mở rộng cho các lớp tính năng GCS/UTM kế tiếp mà không phá vỡ workflow đang hoạt động.",
  },
];

export default function DACTSFeatures() {
  return (
    <section id="dacts-capabilities" className="scroll-mt-36 landscape-dacts-section">
      <h3 className="text-2xl font-semibold landscape-dacts-section-title">Capabilities</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 landscape-feature-grid">
        {CAPABILITIES.map((card) => (
          <article key={card.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 landscape-feature-card">
            <h4 className="font-semibold landscape-card-title">{card.title}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 landscape-card-copy">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
