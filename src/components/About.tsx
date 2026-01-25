import { Lightbulb, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const highlights = [
    {
      icon: Lightbulb,
      title: "Strategic Thinker",
      description: "Passionate about technology and helping companies communicate their value clearly.",
    },
    {
      icon: Target,
      title: "Product & Marketing Expert",
      description: "10+ years of experience across SaaS, hardware, marketing, tech, and startup sectors",
    },
    {
      icon: Zap,
      title: "Community Builder",
      description: "Founded and led the first Product Marketing Alliance chapter in the Czech Republic.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">ABOUT</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Product Storyteller & <span className="text-gradient">Tech Enthusiast</span>
            </h2>
          </motion.div>

          {/* Bio */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a product marketing leader with a decade of experience helping startups, agencies, and tech
                companies grow through compelling product stories. Currently leading product marketing at{" "}
                <span className="text-primary font-semibold">Trezor</span>, a pioneer in hardware security solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Originally from Finland, I've called Prague home since 2016. I'm passionate about technology, security,
                and the power of clear communication to drive product adoption.
              </p>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-gradient rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "25+", label: "Product Launches" },    
                  { value: "10+", label: "Years Experience" },
                  { value: "5+", label: "Years in Management" },
                  { value: "5", label: "Industries Expertise" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="text-4xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
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
