const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: "#about", label: "About" },
    { href: "#meetups", label: "Meetups" },
    { href: "#products", label: "Products" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#articles", label: "Articles" },
    { href: "#contact", label: "Contact" },
    { href: "/llms.txt", label: "llms.txt", hidden: true },
  ];

  return (
    <footer className="py-8 border-t border-border" role="contentinfo">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="mono text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Lauri Hänninen
              <br /> {/* <--- This must be self-closing in React */}
              <span className="opacity-70 text-xs">It's not much, but it's honest work</span>
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-4 gap-x-2 gap-y-0 text-center sm:flex sm:items-center sm:gap-6 sm:flex-wrap sm:justify-center">
              {links.map((link) =>
                'hidden' in link && link.hidden ? (
                  <a key={link.href} href={link.href} className="sr-only" tabIndex={-1} aria-hidden="true">
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </nav>

          <p className="mono text-xs text-muted-foreground">
            Prague 🇨🇿 • Finland 🇫🇮
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
