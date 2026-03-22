import { memo } from "react";
import { m } from "framer-motion";

const Contact = memo(() => {
  const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laurihanninen" },
    { label: "Twitter", href: "https://x.com/lahannin" },
    { label: "Telegram", href: "https://t.me/lahannin" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 md:py-36 relative overflow-hidden" data-description="Contact Lauri Hänninen via LinkedIn (/in/laurihanninen), X (@lahannin), or Telegram (@lahannin).">
      <div className="container px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-highlight text-[10px] font-bold tracking-[0.25em] uppercase">// CONTACT</span>
            <h2 id="contact-heading" className="text-3xl md:text-6xl font-black mt-4 tracking-[-0.03em] mb-4">
              Let's <span className="text-gradient">talk</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
              Happy to chat about product marketing, self-custody, open source, or any products that could use a better story.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {links.map((link) => (
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
          </m.div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
