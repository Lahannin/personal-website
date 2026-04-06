import { memo } from "react";
import SectionHeader from "./SectionHeader";

const contactLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/laurihanninen" },
  { label: "Twitter", href: "https://x.com/lahannin" },
  { label: "Telegram", href: "https://t.me/lahannin" },
];

const Contact = memo(() => {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-10 pb-28 md:pt-20 md:pb-36 relative overflow-hidden" data-description="Contact Lauri Hänninen via LinkedIn (/in/laurihanninen), X (@lahannin), or Telegram (@lahannin).">
      <div className="container px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            label="CONTACT"
            id="contact-heading"
            subtitle="Happy to chat about product marketing, self-custody, open source, or any products that could use a better story."
          >
            Let's <span className="text-gradient">talk</span>
          </SectionHeader>
          <div className="flex flex-wrap justify-center gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-wide text-foreground px-5 py-3 rounded-full border border-border/40 hover:text-highlight hover:border-highlight/40 hover:bg-highlight/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
                aria-label={`Connect on ${link.label}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
