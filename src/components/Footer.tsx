import { memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#meetups", label: "Meetups" },
  { href: "/#products", label: "Products" },
  { href: "/#experience", label: "Experience" },
  { href: "/#articles", label: "Articles" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
  { href: "/llms.txt", label: "llms.txt", hidden: true },
];

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const nav = document.querySelector("nav");
  const navHeight = nav?.offsetHeight ?? 64;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navHeight - 16, behavior: "smooth" });
};

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleFooterClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
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

  return (
    <footer className="py-8 border-t border-border/50" role="contentinfo">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-mono text-xs text-muted-foreground text-center md:text-left tracking-wide">
              © {currentYear} Lauri Hänninen
              <br />
              <span className="text-[10px]">It's not much, but it's honest work</span>
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0 sm:gap-x-6">
              {footerLinks.map((link) => {
                if ('hidden' in link && link.hidden) {
                  return (
                    <a key={link.href} href={link.href} className="sr-only" tabIndex={-1} aria-hidden="true">
                      {link.label}
                    </a>
                  );
                }
                const sectionId = link.href.replace("/#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleFooterClick(e, sectionId)}
                    className="text-xs font-mono text-muted-foreground hover:text-highlight transition-colors py-2 min-h-[44px] flex items-center tracking-wide"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </nav>

          <p className="font-mono text-[10px] text-muted-foreground tracking-wider">
            Prague 🇨🇿 • Finland 🇫🇮
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
