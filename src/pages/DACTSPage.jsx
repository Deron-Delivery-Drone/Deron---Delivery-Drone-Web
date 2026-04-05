import React from "react";
import DACTSHero from "../components/dacts/DACTSHero";
import DACTSSubnav from "../components/dacts/DACTSSubnav";
import DACTSOverview from "../components/dacts/DACTSOverview";
import DACTSFeatures from "../components/dacts/DACTSFeatures";
import DACTSPlatforms from "../components/dacts/DACTSPlatforms";
import DACTSSecurity from "../components/dacts/DACTSSecurity";
import DACTSInstall from "../components/dacts/DACTSInstall";
import DACTSStickyInstallBar from "../components/dacts/DACTSStickyInstallBar";

export default function DACTSPage({
  language,
  detectedPlatform,
  preferredPlatform,
  onSelectPlatform,
  onInstallClick,
  onContactClick,
}) {
  const recommendation = preferredPlatform || (detectedPlatform !== "unknown" ? detectedPlatform : "windows");

  return (
    <section
      id="dacts-page"
      className="relative border-y border-[var(--line)] bg-[var(--surface-elevated)]/60 pb-24 md:pb-10 landscape-dacts-page"
    >
      <DACTSHero detectedPlatform={detectedPlatform} onInstallClick={onInstallClick} />
      <DACTSSubnav />

      <div className="max-w-7xl mx-auto px-6 py-14 landscape-dacts-content-wrap">
        <div className="space-y-14 landscape-dacts-stack">
          <DACTSOverview />
          <DACTSFeatures />
          <DACTSPlatforms
            language={language}
            detectedPlatform={detectedPlatform}
            preferredPlatform={preferredPlatform}
            onSelectPlatform={onSelectPlatform}
            onInstallClick={onInstallClick}
          />
          <DACTSSecurity />
          <DACTSInstall onInstallClick={onInstallClick} onContactClick={onContactClick} />
        </div>
      </div>

      <DACTSStickyInstallBar recommendation={recommendation} onInstallClick={onInstallClick} />
    </section>
  );
}
