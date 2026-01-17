const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="mono text-sm text-muted-foreground">
            © {currentYear} Lauri Hänninen
          </p>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Experience</a>
            <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="mono text-xs text-muted-foreground">
            Prague 🇨🇿 • Finland 🇫🇮
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
