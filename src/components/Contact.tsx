import { motion } from "framer-motion";

const Contact = () => {
  const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/laurihanninen" },
    { label: "X / Twitter", href: "https://x.com/Lahannin" },
    { label: "Telegram", href: "https://t.me/lahannin" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 md:py-36 relative overflow-hidden" data-description="Contact Lauri Hänninen via LinkedIn (/in/laurihanninen), X (@Lahannin), Telegram (@lahannin), or Medium.">
      <div className="container px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="bg-secondary/30 rounded-2xl p-10 md:p-14 text-center"
          >
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-black tracking-[-0.03em] mb-4">
              Let's <span className="text-gradient italic font-bold">talk</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Open to conversations about product marketing, open source, and products that need better stories.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-wide text-foreground px-5 py-2.5 rounded-full bg-background/60 hover:text-highlight hover:bg-highlight/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
                  aria-label={`Connect on ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
