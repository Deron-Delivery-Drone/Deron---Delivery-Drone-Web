import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "deron-theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || "system");

  useEffect(() => {
    const media = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : { matches: false, addEventListener: () => {}, removeEventListener: () => {} };

    const applyTheme = () => {
      const shouldUseDark = theme === "dark" || (theme === "system" && media?.matches);
      document.documentElement.classList.toggle("dark", shouldUseDark);
      document.documentElement.setAttribute("data-theme", shouldUseDark ? "dark" : "light");
    };

    applyTheme();
    media?.addEventListener?.("change", applyTheme);

    return () => media?.removeEventListener?.("change", applyTheme);
  }, [theme]);

  const updateTheme = (value) => {
    setTheme(value);
    localStorage.setItem(THEME_STORAGE_KEY, value);
  };

  return { theme, setTheme: updateTheme };
}
