import React from 'react';

interface Props {
  labels: Record<string, string>;
}

const links = {
  windows: import.meta.env.VITE_DACTS_DOWNLOAD_WINDOWS || '',
  macos: import.meta.env.VITE_DACTS_DOWNLOAD_MACOS || '',
  linux: import.meta.env.VITE_DACTS_DOWNLOAD_LINUX || ''
};

export function DownloadSection({ labels }: Props) {
  return (
    <section>
      <h2>{labels.cta}</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        {Object.entries(links).map(([os, url]) => (
          <a key={os} href={url || '#'} aria-disabled={!url}>
            {labels[os]} {url ? '' : `(${labels.comingSoon})`}
          </a>
        ))}
      </div>
    </section>
  );
}
