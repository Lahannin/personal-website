import { Lightbulb, Zap, Target, Shield, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const highlights = [
    {
      icon: Lightbulb,
      title: "Open-Source Advocate",
      description: "Passionate about open-source technology and building tools that give people freedom.",
    },
    {
      icon: Target,
      title: "Product & Marketing Expert",
      description: "10+ years of experience across SaaS, hardware, marketing agency, and startup sectors.",
    },
    {
      icon: Zap,
      title: "Community Builder",
      description: "Founded and led the first Product Marketing Alliance chapter in the Czech Republic.",
    },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 relative z-10 bg-background" data-description="About Lauri Hänninen: Product Marketing Lead with 10+ years experience across SaaS, hardware, crypto, and open-source. Open-source advocate and community builder based in Prague.">
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
            <h2 id="about-heading" className="text-3xl md:text-5xl font-bold mt-4">
              Bridging the gap between<br /><span className="text-gradient">Product and Marketing</span>
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6 mb-20 text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I thrive on products that are hard to explain. The kind that demand real thinking before they can be understood.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My role is to bring structure to chaos. Drawing on experience across fast-moving startups and global agencies, I help teams align on the essentials: what the product is, who it's for, and why anyone should care.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My focus is on practical outcomes. I cut through the noise to get to why the product matters to the people who use it.
            </p>
          </motion.div>

          {/* Did You Know? - Military background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-gradient border border-border rounded-xl p-8 mb-20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Did you know?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Before tech, Lauri served as a <span className="text-foreground font-medium">Mortar Platoon Commander</span> in Finland's Jaeger Brigade, directly supervising 25+ personnel. Commissioned as a <span className="text-foreground font-medium">Second Lieutenant</span> upon completion of service.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Award className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">Top 5% graduate of the Finnish Reserve Officer School</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Star className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">Ranked 1st among 700+ conscripts in tactical exams</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">Honorary Mortar Officer, Class II/08 for outstanding leadership</p>
                </div>
              </div>
            </div>
          </motion.div>

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
