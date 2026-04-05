import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import ThemeToggle from "./ThemeToggle";

const sectionIds = ["about", "meetups", "products", "experience", "articles", "skills", "contact"];

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#meetups", label: "Meetups" },
  { href: "/#products", label: "Products" },
  { href: "/#experience", label: "Experience" },
  { href: "/#articles", label: "Articles" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const nav = document.querySelector("nav");
  const navHeight = nav?.offsetHeight ?? 64;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navHeight - 16, behavior: "smooth" });
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark, toggle: toggleDark } = useDarkMode();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  useFocusTrap(mobileMenuRef, isMobileMenuOpen);
  useScrollLock(isMobileMenuOpen);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      // Wait for homepage to render, then scroll
      const poll = (attempts = 0) => {
        const el = document.getElementById(sectionId);
        if (el) {
          scrollToSection(sectionId);
        } else if (attempts < 30) {
          setTimeout(() => poll(attempts + 1), 100);
        }
      };
      setTimeout(() => poll(), 50);
    }
  }, [location.pathname, navigate]);

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

  // Persist the last visible section so the secret page can return here
  useEffect(() => {
    if (activeSection) sessionStorage.setItem('secretReturnSection', activeSection);
  }, [activeSection]);

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

  const getIsActive = (link: { href: string }) => {
    const sectionId = link.href.replace("/#", "");
    return activeSection === sectionId;
  };

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
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
                  const isActive = getIsActive(link);
                  const className = `relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] hover:text-highlight focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition-colors font-mono group ${
                    isActive ? "text-highlight" : "text-muted-foreground"
                  }`;
                  const underline = (
                    <span className={`absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-highlight rounded-full transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                  );

                  const sectionId = link.href.replace("/#", "");
                  return (
                    <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, sectionId)} className={className}>
                      {link.label}
                      {underline}
                    </a>
                  );
                })}
                <ThemeToggle isDark={isDark} onToggle={toggleDark} />
              </div>

              <div className="md:hidden flex items-center gap-1">
                <ThemeToggle isDark={isDark} onToggle={toggleDark} mobile />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-3 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
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
                  ref={mobileMenuRef}
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
                        const isActive = getIsActive(link);
                        const className = `block text-sm font-bold uppercase tracking-widest hover:text-highlight py-3 px-4 rounded-md min-h-[44px] flex items-center font-mono ${
                          isActive ? "text-highlight" : "text-muted-foreground"
                        }`;

                        const sectionId = link.href.replace("/#", "");
                        return (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, sectionId); }}
                              className={className}
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
    </header>
  );
};

export default Navigation;
