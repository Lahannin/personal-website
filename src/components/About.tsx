import { Lightbulb, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";

const About = () => {
  const highlights = [
    {
      icon: Lightbulb,
      title: "Strategic Thinker",
      description: "Passionate about technology and helping companies communicate their value clearly."
    },
    {
      icon: Target,
      title: "Product Marketing Expert",
      description: "10+ years crafting go-to-market strategies for SaaS, hardware, and tech companies."
    },
    {
      icon: Zap,
      title: "Community Builder",
      description: "Founded the first Product Marketing Alliance chapter in Czech Republic."
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header with photo */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">ABOUT</span>
            
            {/* Profile Photo */}
            <div className="my-8 flex justify-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-secondary border-4 border-primary/20 shadow-2xl overflow-hidden">
                <img 
                  src={profilePhoto} 
                  alt="Lauri Hänninen" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold">
              Product Storyteller & <span className="text-gradient">Tech Enthusiast</span>
            </h2>
          </motion.div>
          
          {/* Bio Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-center space-y-6 mb-20"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a product marketing leader with a decade of experience helping startups, agencies, and tech companies grow through compelling product stories. Currently leading product marketing at <span className="text-primary font-semibold">Trezor</span>, a pioneer in hardware security solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Originally from Finland, I've called Prague home since 2016. I'm passionate about technology, security, and the power of clear communication to drive product adoption.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <a 
                href="https://twitter.com/Lahannin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mono text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                @Lahannin
              </a>
              <span className="text-border">•</span>
              <a 
                href="https://linkedin.com/in/laurihanninen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mono text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
          
          {/* Stats card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="border-gradient rounded-2xl p-8 mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground mt-1">Certifications</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground mt-1">Languages</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Product Launches</div>
              </div>
            </div>
          </motion.div>
          
          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
