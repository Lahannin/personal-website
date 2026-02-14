import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#meetups", label: "Meetups" },
    { href: "#products", label: "Products" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#articles", label: "Articles" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm" : "bg-background/80 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none"
        }`}
      >
      <div className="container px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Spacer for layout balance */}
          <div className="w-8 md:w-9" />

          {/* Desktop nav — uppercase, tighter, bolder */}
          <div className="hidden md:flex items-center gap-0.5" role="navigation" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-highlight focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <nav className="py-4" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1" role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-highlight focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors py-3 px-4 rounded-lg hover:bg-secondary/50 min-h-[44px] flex items-center"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </nav>
    </header>
  );
};

export default Navigation;
