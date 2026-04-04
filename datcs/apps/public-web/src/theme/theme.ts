export const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function initTheme() {
  const saved = localStorage.getItem('deron.theme') ?? defaultTheme;
  document.documentElement.dataset.theme = saved;
  return saved;
}
