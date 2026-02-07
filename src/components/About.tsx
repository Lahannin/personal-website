import { Lightbulb, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";

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
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 relative z-10 bg-background">
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
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
              I thrive on products that are hard to explain. The kind that demand real thinking before they can be understood.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
               My role is to bring structure to chaos. Drawing on experience across fast-moving startups and global agencies, I help teams align on the essentials: what the product is, who it’s for, and why anyone should care.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
               My focus is on practical outcomes. I cut through the noise to get to why the product matters to the people who use it.
              </p>
            </motion.div>

            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 80, damping: 14 }}
              className="flex items-center justify-center"
            >
              <div className="relative group">
                {/* Glow behind image */}
                <div className="absolute -inset-3 rounded-3xl bg-primary/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-secondary border-4 border-border shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/30 transition-all duration-500">
                  <img 
                    src={profilePhoto} 
                    alt="Lauri Hänninen - Product Marketing Lead at Trezor, based in Prague" 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
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
