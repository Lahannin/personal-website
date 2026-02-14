const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
    // Adding the AI instruction link directly to the nav
    { href: "/llms.txt", label: "AI Info" }, 
  ];

  return (
    <footer className="py-8 border-t border-border" role="contentinfo">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="mono text-sm text-muted-foreground">
              © {currentYear} Lauri Hänninen
            </p>
            {/* Fail-safe text for bots that miss the link header */}
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mono">
              Machine-Readable: /llms.txt
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <div className="flex items-center gap-4 sm:gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  // Optional: use target="_blank" if you want llms.txt to open in a new tab
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
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
