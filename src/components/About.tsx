import { Lightbulb, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import logo1 from "@/assets/logo-1.avif";
import logo2 from "@/assets/logo-2.avif";
import logo3 from "@/assets/logo-3.avif";
import logo4 from "@/assets/logo-4.avif";

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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">ABOUT</span>
            <h2 id="about-heading" className="text-2xl md:text-5xl font-bold mt-4">
              Product marketing for things <span className="hidden md:inline"><br /></span><span className="text-gradient">that are hard to describe</span>
            </h2>
          </motion.div>

          {/* Bio */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
              I like products that are difficult to explain, the kind that require a bit of thinking before they click. My job is to take that complexity and make it something people actually understand.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
               Currently, I lead product marketing at Trezor, working across hardware and crypto security. Before that, I spent years in the analytics space at GoodData and building the product marketing community in Prague.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
               I’m a tech enthusiast at heart and a firm believer in open-source code that gives people their freedom back.
              </p>
            </motion.div>

            {/* Partner logos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center justify-center"
              role="img"
              aria-label="Logos of companies I've worked with"
            >
              <div className="card-gradient border border-border rounded-2xl p-8 shadow-md">
                <div className="grid grid-cols-2 gap-10 items-center justify-items-center">
                  <img src={logo1} alt="Trezor logo — Lauri Hänninen led product marketing and global hardware wallet launches" className="h-20 md:h-24 w-auto object-contain" width={96} height={96} loading="lazy" />
                  <img src={logo2} alt="GoodData logo — Lauri Hänninen drove analytics platform positioning and SaaS go-to-market" className="h-20 md:h-24 w-auto object-contain" width={96} height={96} loading="lazy" />
                  <img src={logo3} alt="Product Marketing Alliance logo — Lauri Hänninen founded the Czech Republic chapter" className="h-20 md:h-24 w-auto object-contain" width={96} height={96} loading="lazy" />
                  <img src={logo4} alt="Wunderman Thompson logo — Lauri Hänninen managed Ford of Europe web analytics and lead management" className="h-20 md:h-24 w-auto object-contain" width={96} height={96} loading="lazy" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="card-gradient border border-border rounded-xl p-6 shadow-md hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
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
