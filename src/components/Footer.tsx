import { memo } from "react";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#meetups", label: "Meetups" },
  { href: "#products", label: "Products" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "/articles", label: "Articles" },
  { href: "#contact", label: "Contact" },
  { href: "/llms.txt", label: "llms.txt", hidden: true },
];

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

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
              {footerLinks.map((link) =>
                'hidden' in link && link.hidden ? (
                  <a key={link.href} href={link.href} className="sr-only" tabIndex={-1} aria-hidden="true">
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-xs font-mono text-muted-foreground hover:text-highlight transition-colors py-2 min-h-[44px] flex items-center tracking-wide"
                  >
                    {link.label}
                  </a>
                )
              )}
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
