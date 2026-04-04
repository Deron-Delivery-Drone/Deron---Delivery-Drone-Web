import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DownloadSection } from './components/DownloadSection';
import { initTheme } from './theme/theme';
import { translations, type Lang } from './i18n/translations';

initTheme();

function detectInitialLanguage(): Lang {
  const stored = localStorage.getItem('deron.lang');
  if (stored === 'en' || stored === 'vi' || stored === 'zh') return stored;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith('vi')) return 'vi';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

function App() {
  const [lang, setLang] = useState<Lang>(detectInitialLanguage);
  const t = useMemo(() => translations[lang], [lang]);

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{t.title}</h1>
        <select
          value={lang}
          onChange={(e) => {
            const next = e.target.value as Lang;
            setLang(next);
            localStorage.setItem('deron.lang', next);
          }}
        >
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
          <option value="zh">中文</option>
        </select>
      </header>
      <nav style={{ display: 'flex', gap: 12 }}>
        <a href="/auth/login">{t.login}</a>
        <a href="/auth/signup">{t.signup}</a>
        <a href="/auth/forgot-password">{t.forgot}</a>
      </nav>
      <DownloadSection labels={t as Record<string, string>} />
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
