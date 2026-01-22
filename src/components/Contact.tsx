import { Linkedin, Send, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Contact = () => {
  const links = [
    {
      icon: Send,
      label: "Telegram",
      value: "@lahannin",
      href: "https://t.me/lahannin"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/laurihanninen",
      href: "https://linkedin.com/in/laurihanninen"
    },
    {
      icon: XIcon,
      label: "X",
      value: "@Lahannin",
      href: "https://x.com/Lahannin"
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="mono text-primary text-sm tracking-wider">CONTACT</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Looking to collaborate on product marketing or just want to say hello? 
              I'm always happy to connect with fellow product enthusiasts.
            </p>
          </motion.div>
          
          {/* Contact links */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-6 border-gradient rounded-xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <link.icon className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="mono text-sm text-muted-foreground">{link.value}</p>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
