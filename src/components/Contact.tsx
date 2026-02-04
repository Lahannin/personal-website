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
    <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32 relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_20%_97%)_0%,hsl(220_25%_96%)_50%,hsl(220_20%_98%)_100%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(ellipse,hsl(172_66%_50%/0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[radial-gradient(ellipse,hsl(12_76%_61%/0.05),transparent_70%)] pointer-events-none" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="mono text-[hsl(12_76%_61%)] text-sm tracking-wider font-medium">CONTACT</span>
            <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Looking to collaborate on product marketing or just want to say hello? 
              I'm always happy to connect with fellow product enthusiasts.
            </p>
          </motion.div>
          
          {/* Contact links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-6 min-h-[100px] bg-white rounded-2xl shadow-lg border border-border/50 hover:border-primary/30 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                aria-label={`Connect on ${link.value}`}
              >
                <motion.div 
                  className="flex items-center justify-center gap-2 mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <link.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="font-semibold">{link.label}</span>
                </motion.div>
                <p className="mono text-sm text-muted-foreground group-hover:text-primary transition-colors">{link.value}</p>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white shadow-lg border border-border/50"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(172_66%_50%)] animate-pulse" />
            <span className="mono text-xs text-muted-foreground font-medium">Let's build something great together</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
