import { useState, useEffect, useCallback } from "react";

export function useDarkMode() {
  // Initialize from the DOM class set by the blocking script in index.html,
  // so there's no flash of wrong theme.
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  // Apply dark mode class whenever isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((prev) => !prev), []);

  return { isDark, toggle };
}
