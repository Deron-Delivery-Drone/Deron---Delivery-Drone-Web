import React from "react";

const CONCEPTS = ["Mission Control", "Fleet Coordination", "Airspace-aware Operations"];

export default function DACTSOverview() {
  return (
    <section id="dacts-overview" className="scroll-mt-36">
      <h2 className="text-3xl md:text-5xl font-semibold max-w-4xl leading-tight">Không chỉ là một ứng dụng điều khiển</h2>
      <p className="mt-5 max-w-4xl text-base md:text-lg text-slate-600 dark:text-slate-300">
        DACTS là lớp phần mềm điều phối để kết nối operator, mission, platform và quyền truy cập phân phối. Nó được
        xây dựng để phục vụ vận hành thật, không chỉ demo hiển thị bản đồ.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {CONCEPTS.map((item) => (
          <article key={item} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-lg">{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
