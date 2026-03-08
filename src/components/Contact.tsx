import { Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Contact = () => {
  const links = [
    {
      icon: XIcon,
      value: "@Lahannin",
      href: "https://x.com/Lahannin",
      platform: "X (Twitter)",
    },
    {
      icon: Linkedin,
      value: "/in/laurihanninen",
      href: "https://linkedin.com/in/laurihanninen",
      platform: "LinkedIn",
    },
    {
      icon: Send,
      value: "@lahannin",
      href: "https://t.me/lahannin",
      platform: "Telegram",
    }
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 md:py-36 relative overflow-hidden bg-secondary/30" data-description="Contact Lauri Hänninen via X (@Lahannin), LinkedIn (/in/laurihanninen), or Telegram (@lahannin)">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-highlight text-[10px] font-bold tracking-[0.25em] uppercase">// CONTACT</span>
            <h2 id="contact-heading" className="text-4xl md:text-6xl font-black mt-4 mb-6 tracking-[-0.03em]">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Looking to collaborate on product marketing or just want to say hello? 
              I'm always happy to connect with fellow product enthusiasts.
            </p>
          </motion.div>
          
          {/* Contact links */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group p-6 min-h-[100px] border-gradient rounded-xl shadow-md border border-border/40 hover:border-highlight/50 hover:-translate-y-2 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300"
                aria-label={`Connect on ${link.platform}`}
              >
                <div className="flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <link.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <p className="mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">{link.value}</p>
              </a>
            ))}
          </motion.div>
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border"
          >
            <span className="mono text-xs text-muted-foreground">Let's build something great together</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
