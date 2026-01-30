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
    <section id="about" className="py-24 md:py-32 relative z-10 bg-background">
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
               I’m a product marketer who believes clarity is the ultimate competitive advantage. I love figuring out how things work and helping people have that “AHA” moment when complex ideas click.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My background in business and technology lets me connect with both the product and the people using it. I see product marketing as a form of teaching, helping people realize why a product truly matters.
              </p>
            </motion.div>

            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-secondary border-4 border-border shadow-lg overflow-hidden">
                <img 
                  src={profilePhoto} 
                  alt="Lauri Hänninen" 
                  className="w-full h-full object-cover"
                  width={320}
                  height={320}
                  loading="lazy"
                />
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
