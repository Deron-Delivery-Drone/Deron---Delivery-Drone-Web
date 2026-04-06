import React from "react";

const ITEMS = [
  { id: "dacts-overview", label: "Overview" },
  { id: "dacts-capabilities", label: "Capabilities" },
  { id: "dacts-platforms", label: "Platforms" },
  { id: "dacts-security", label: "Security" },
  { id: "dacts-engage", label: "Engage" },
];

export default function DACTSSubnav() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-16 z-40 border-b border-[var(--line)] bg-[var(--surface-elevated)]/95 backdrop-blur landscape-subnav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 overflow-x-auto landscape-subnav-scroll">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="shrink-0 text-sm px-3 py-1.5 rounded-full border border-[var(--line)] hover:border-[#c41e3a]/70 landscape-subnav-pill"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
