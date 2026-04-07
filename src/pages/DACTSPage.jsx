import React from "react";
import DACTSHero from "../components/dacts/DACTSHero";
import DACTSSubnav from "../components/dacts/DACTSSubnav";
import DACTSOverview from "../components/dacts/DACTSOverview";
import DACTSFeatures from "../components/dacts/DACTSFeatures";
import DACTSPlatforms from "../components/dacts/DACTSPlatforms";
import DACTSSecurity from "../components/dacts/DACTSSecurity";
import DACTSInstall from "../components/dacts/DACTSInstall";

export default function DACTSPage({ detectedPlatform, onContactClick }) {
  return (
    <section
      id="dacts-page"
      className="relative border-y border-[var(--line)] bg-[var(--surface-elevated)]/60 pb-24 md:pb-10 landscape-dacts-page"
    >
      <DACTSHero detectedPlatform={detectedPlatform} onContactClick={onContactClick} />
      <DACTSSubnav />

      <div className="max-w-7xl mx-auto px-6 py-14 landscape-dacts-content-wrap">
        <div className="space-y-14 landscape-dacts-stack">
          <DACTSOverview />
          <DACTSFeatures />
          <DACTSPlatforms detectedPlatform={detectedPlatform} />
          <DACTSSecurity />
          <DACTSInstall onContactClick={onContactClick} />
        </div>
      </div>
    </section>
  );
}
