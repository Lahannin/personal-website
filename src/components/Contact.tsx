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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group p-6 border-gradient rounded-xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <span className="font-semibold">{link.label}</span>
                  <motion.div
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                </div>
                <p className="mono text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{link.value}</p>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border cursor-default"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="mono text-xs text-muted-foreground">Let's build something great together</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
