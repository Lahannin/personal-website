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
      description: "10+ years of professional experience across SaaS, hardware, marketing, tech, and startup sectors",
    },
    {
      icon: Zap,
      title: "Community Builder",
      description: "Founded the first Product Marketing Alliance chapter in Czech Republic.",
    },
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="border-gradient rounded-2xl p-8 card-hover"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { value: "10+", label: "Years Experience" },
                  { value: "5+", label: "Years in Management" },
                  { value: "50+", label: "Product Launches" },
                  { value: "5", label: "Industries Expertise" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={statVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
                  >
                    <div className="text-4xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Highlights */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
