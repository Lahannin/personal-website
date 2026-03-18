import { motion } from "framer-motion";
import LazySection from "./LazySection";
import AboutGallery from "./AboutGallery";
import BitcoinWord from "./BitcoinWord";

const About = () => {
  const highlights = [
     {
      title: "10+ years experience",
      description: "Product marketer across SaaS, hardware, crypto, and startups."
    },
    {
      title: "Built & scaled PMM",
      description: "The founding PMM at Trezor, growing the team from 0 → 5."
    },
    {
      title: "Leads product launches",
      description: "Drives positioning, messaging, and GTM for software, hardware, and services."
    },
    {
      title: "5+ years in leadership",
      description: "Managed teams in tech and led 25+ soldiers in the Finnish army."
    },
    {
      title: "Career pivot into tech",
      description: "Completed 2 years of CS studies while working full-time to break into tech."
    },
    {
      title: "Builds PMM community",
      description: "Founded and leads the first Product Marketing Alliance chapter in Prague."
    }
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32 relative bg-secondary/30" data-description="About Lauri Hänninen: Product Marketing Lead with 10+ years experience across SaaS, hardware, crypto, and open-source. Open-source advocate and community builder based in Prague.">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="container px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-highlight text-[10px] font-bold tracking-[0.25em] uppercase">// ABOUT</span>
            <h2 id="about-heading" className="text-3xl md:text-6xl font-black mt-4 tracking-[-0.03em]">
              Product marketer for things <span className="hidden md:inline"><br /></span><span className="text-gradient">that are hard to describe</span>
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
                I love products that are difficult to explain, the kind that require a bit of thinking before they click. My skill is taking that complexity and turning it into something people actually understand.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently, I lead product marketing at Trezor, the original <BitcoinWord /> hardware wallet company, focusing on the intersection of hardware and crypto security. Before Trezor, I spent years in the analytics space at GoodData, the leading AI-powered cloud analytics platform, and helped build the product marketing community here in Prague, one of Europe's rising tech hubs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At my core, I'm a tech enthusiast who firmly believes that open-source code is how we take back control.
              </p>
            </motion.div>

            {/* Partner logos */}
            <div>
              <LazySection minHeight="400px">
                <AboutGallery />
              </LazySection>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="border-l-2 border-highlight/50 pl-4 py-1 animate-fade-in"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
              >
                <h3 className="text-sm md:text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
