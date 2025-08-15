import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia("(prefers-color-scheme : dark)").matches
    ? "dark"
    : "light";
};

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      const saved = localStorage.getItem('theme');
      if (!saved) setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener?.("change", handler) || mql.addListener(handler);
    return () => {
      mql.removeEventListener?.("change", handler) ||
        mql.removeListener(handler);
    };
  }, []);
  const value = {
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
export const useTheme = () => useContext(ThemeContext);
