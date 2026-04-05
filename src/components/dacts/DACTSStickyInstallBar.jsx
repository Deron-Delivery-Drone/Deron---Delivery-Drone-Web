import React from "react";

export default function DACTSStickyInstallBar({ onInstallClick }) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-[60] p-3 bg-gradient-to-t from-[var(--surface)] to-transparent">
      <button onClick={onInstallClick} className="w-full rounded-full px-5 py-3 bg-[#c41e3a] text-white shadow-lg font-medium">
        Install DACTS
      </button>
    </div>
  );
}
