import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";

const sectionIds = ["about", "meetups", "products", "experience", "skills", "articles", "contact"];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark, toggle: toggleDark } = useDarkMode();

  useEffect(() => {
    if (typeof window === "undefined") return;
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          setScrollProgress(Math.min(window.scrollY / scrollHeight, 1));
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to the top of the viewport
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const id = visible[0].target.id;
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
          {/* Scroll progress bar */}
          <m.div
            className="absolute top-0 left-0 h-[2px] bg-highlight origin-left z-10"
            style={{ scaleX: scrollProgress, width: "100%" }}
            transition={{ duration: 0 }}
          />
          <div className="container px-6">
            <div className="flex items-center justify-end h-16 md:h-20">
              <div className="hidden md:flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("/#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-highlight focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition-colors font-mono group ${
                        isActive ? "text-highlight" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-highlight rounded-full transition-transform duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                    </a>
                  );
                })}
                <button
                  onClick={toggleDark}
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
              </div>

              <div className="md:hidden flex items-center gap-1">
                <button
                  onClick={toggleDark}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-highlight rounded-lg transition-colors"
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
                      {navLinks.map((link) => {
                        const sectionId = link.href.replace("/#", "");
                        const isActive = activeSection === sectionId;
                        return (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block text-sm font-bold uppercase tracking-widest hover:text-highlight py-3 px-4 rounded-md min-h-[44px] flex items-center font-mono ${
                                isActive ? "text-highlight" : "text-muted-foreground"
                              }`}
                            >
                              {link.label}
                            </a>
                          </li>
                        );
                      })}
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
