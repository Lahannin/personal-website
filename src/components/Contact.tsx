import { Mail, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const links = [
    {
      icon: Mail,
      label: "Email",
      value: "lahannin@gmail.com",
      href: "mailto:lahannin@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/laurihanninen",
      href: "https://linkedin.com/in/laurihanninen"
    },
    {
      icon: Twitter,
      label: "X (Twitter)",
      value: "@Lahannin",
      href: "https://twitter.com/Lahannin"
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <span className="mono text-primary text-sm tracking-wider">CONTACT</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Looking to collaborate on product marketing, share Bitcoin ideas, or just say hello? 
            I'm always happy to connect with fellow product enthusiasts and bitcoiners.
          </p>
          
          {/* Contact links */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group p-6 border-gradient rounded-xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <link.icon className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="mono text-sm text-muted-foreground">{link.value}</p>
              </a>
            ))}
          </div>
          
          {/* Bitcoin address (optional fun element) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <span className="text-primary font-bold">₿</span>
            <span className="mono text-xs text-muted-foreground">Not your keys, not your coins</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
