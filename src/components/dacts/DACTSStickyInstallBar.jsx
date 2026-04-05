import React from "react";

export default function DACTSStickyInstallBar({ recommendation, onInstallClick }) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-[60] p-3 border-t border-[var(--line)] bg-[var(--surface-elevated)]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Recommended platform</p>
          <p className="truncate text-sm font-medium">{recommendation}</p>
        </div>
        <button onClick={onInstallClick} className="shrink-0 rounded-full px-5 py-2.5 bg-[#c41e3a] text-white shadow-lg font-medium">
          Install
        </button>
      </div>
    </div>
  );
}
