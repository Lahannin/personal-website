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
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 relative z-10 overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_20%_97%)_0%,hsl(0_0%_100%)_50%,hsl(220_25%_96%)_100%)]" />
      
      {/* Decorative accent blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-[radial-gradient(ellipse_at_top_right,hsl(12_76%_61%/0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-96 bg-[radial-gradient(ellipse_at_bottom_left,hsl(172_66%_50%/0.05),transparent_60%)] pointer-events-none" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="mono text-[hsl(12_76%_61%)] text-sm tracking-wider font-medium">ABOUT</span>
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

            {/* Profile photo with accent border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-2xl bg-[linear-gradient(135deg,hsl(12_76%_61%/0.2),hsl(172_66%_50%/0.2))] blur-xl" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-white border-4 border-white shadow-2xl overflow-hidden">
                  <img 
                    src={profilePhoto} 
                    alt="Lauri Hänninen - Product Marketing Lead at Trezor, based in Prague" 
                    className="w-full h-full object-cover"
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Highlights with colorful icons */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const colors = [
                "bg-[hsl(12_76%_61%/0.1)] text-[hsl(12_76%_61%)]",
                "bg-[hsl(217_46%_21%/0.1)] text-primary",
                "bg-[hsl(172_66%_50%/0.1)] text-[hsl(172_66%_50%)]"
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-border/50 hover:border-primary/20 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl ${colors[index]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
