import React from "react";

const CAPABILITIES = [
  { title: "Mission Control", body: "theo dõi nhiệm vụ, trạng thái, điều hành vận hành" },
  { title: "Fleet Management", body: "quản lý nhiều UAV, operator, release, deployment context" },
  { title: "Platform-aware Distribution", body: "tự nhận diện hệ điều hành để gợi ý bản cài phù hợp" },
  { title: "Secure Request Flow", body: "request-based access, email delivery, 72h token" },
  { title: "Future GCS Layer", body: "telemetry, route ops, supervision, mission control" },
  { title: "Future UTM Layer", body: "no-fly overlays, low-altitude coordination, future airspace logic" },
];

export default function DACTSFeatures() {
  return (
    <section id="dacts-capabilities" className="scroll-mt-36">
      <h3 className="text-2xl font-semibold">Core Capabilities</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((card) => (
          <article key={card.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
            <h4 className="font-semibold">{card.title}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
