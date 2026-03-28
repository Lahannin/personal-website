import { memo } from "react";
import { Sun, Moon } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  /** Render the larger mobile variant */
  mobile?: boolean;
}

const ThemeToggle = memo(({ isDark, onToggle, mobile }: ThemeToggleProps) => {
  if (mobile) {
    return (
      <button
        onClick={onToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-highlight rounded-lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={isDark ? "m-sun" : "m-moon"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </m.span>
        </AnimatePresence>
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="ml-2 p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md text-muted-foreground hover:text-highlight border border-border/50 hover:border-highlight/40 transition-all duration-300 font-mono"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
