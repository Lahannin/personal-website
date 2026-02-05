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
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 relative z-10 bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-20 -left-32 w-64 h-64 bg-primary/5 rounded-[40%_60%_55%_45%/55%_45%_50%_50%] blur-3xl pointer-events-none" />
      
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 md:text-left"
          >
            <span className="mono text-primary text-sm tracking-wider block text-center md:text-left">ABOUT</span>
            <h2 id="about-heading" className="text-3xl md:text-5xl font-bold mt-4 text-center md:text-left">
              Bridging the gap between<br /><span className="text-gradient">Product and Marketing</span>
            </h2>
          </motion.div>

          {/* Bio */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-6 md:col-span-3 order-2 md:order-1"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start justify-center md:justify-end md:col-span-2 order-1 md:order-2"
            >
              <div className="relative">
                {/* Decorative frame offset */}
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-primary/20" />
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-secondary border border-border shadow-lg overflow-hidden relative z-10">
                <img 
                  src={profilePhoto} 
                  alt="Lauri Hänninen - Product Marketing Lead at Trezor, based in Prague" 
                  className="w-full h-full object-cover"
                  width={256}
                  height={256}
                  loading="lazy"
                  decoding="async"
                />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 md:-mx-4">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, rotate: index === 1 ? 0 : (index === 0 ? -1 : 1) }}
                className={`card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group ${
                  index === 1 ? "md:-mt-4" : ""
                }`}
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
