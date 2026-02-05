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
      label: "",
      value: "@Lahannin",
      href: "https://x.com/Lahannin"
    },
    {
      icon: Linkedin,
      label: "",
      value: "/in/laurihanninen",
      href: "https://linkedin.com/in/laurihanninen"
    },
    {
      icon: Send,
      label: "",
      value: "@lahannin",
      href: "https://t.me/lahannin"
    }
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-[350px] h-[350px] bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-accent/5 rounded-[40%_60%_55%_45%/55%_45%_50%_50%] blur-3xl" />
      </div>
      
      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left md:flex md:items-end md:justify-between md:gap-8 mb-12"
          >
            <div>
              <span className="mono text-primary text-sm tracking-wider">CONTACT</span>
              <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mt-4">
                Let's <span className="text-gradient">Connect</span>
              </h2>
            </div>
            <p className="text-muted-foreground mt-4 md:mt-0 max-w-sm text-center md:text-right">
              Looking to collaborate or just want to say hello?
            </p>
          </motion.div>
          
          {/* Contact links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
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
                whileHover={{ y: -5, scale: 1.02, rotate: index === 1 ? 0 : (index === 0 ? -1 : 1) }}
                className={`group flex-1 p-6 border-gradient rounded-2xl hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all ${
                  index === 1 ? "sm:-mt-2" : ""
                }`}
                aria-label={`Connect on ${link.value}`}
              >
                <motion.div 
                  className="flex items-center justify-center gap-2 mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <link.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  <span className="font-semibold">{link.label}</span>
                </motion.div>
                <p className="mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">{link.value}</p>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="mono text-xs text-muted-foreground">Let's build something great together</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
