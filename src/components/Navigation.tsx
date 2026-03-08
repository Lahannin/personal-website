import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggle: toggleDark } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIX: All hrefs now start with "/" to ensure they resolve from the root
  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#meetups", label: "Meetups" },
    { href: "/#products", label: "Products" },
    { href: "/#experience", label: "Experience" },
    { href: "/#skills", label: "Skills" },
    { href: "/#articles", label: "Articles" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header>
      <LazyMotion features={domAnimation}>
        <nav
          aria-label="Main navigation"
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled || isMobileMenuOpen ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent"
          }`}
        >
          <div className="container px-6">
            <div className="flex items-center justify-end h-16 md:h-20">
              <div className="hidden md:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-highlight focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition-colors font-mono"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={toggleDark}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  className="ml-2 p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md text-muted-foreground hover:text-highlight border border-border/50 hover:border-highlight/40 transition-all duration-300 font-mono"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              <div className="md:hidden flex items-center gap-1">
                <button
                  onClick={toggleDark}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-highlight rounded-lg transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-3 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg transition-colors"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <m.div
                  id="mobile-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden border-t border-border"
                >
                  <div className="py-4" role="group" aria-label="Mobile navigation">
                    <ul className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-highlight py-3 px-4 rounded-md min-h-[44px] flex items-center font-mono"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </LazyMotion>
    </header>
  );
};

export default Navigation;
