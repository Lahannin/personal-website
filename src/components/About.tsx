import { memo } from "react";
import { m } from "framer-motion";
import LazySection from "./LazySection";
import AboutGallery from "./AboutGallery";
import BitcoinWord from "./BitcoinWord";
import SectionHeader from "./SectionHeader";

const About = memo(() => {
  const highlights = [
    {
      title: "10+ years in tech",
      description: "Across B2B SaaS, B2C hardware, crypto, analytics, and startups.",
    },
    {
      title: "Founding Product Marketer",
      description: "Built and scaled Trezor's Product Marketing function from 0 → 5.",
    },
    {
      title: "PMM community builder",
      description: "Founded the first Product Marketing Alliance chapter in Prague.",
    },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="pt-10 pb-28 md:pt-20 md:pb-36 relative" data-description="About Lauri Hänninen: Product Marketing Lead with 10+ years experience across SaaS, hardware, crypto, and open-source. Open-source advocate and community builder based in Prague.">
      <div className="container px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="ABOUT" id="about-heading">
            Product marketer for things <span className="hidden md:inline"><br /></span><span className="text-gradient">that are hard to describe</span>
          </SectionHeader>

          {/* Bio */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12 md:mb-20">
            <m.div
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
            </m.div>

            {/* Partner logos */}
            <div>
              <LazySection minHeight="400px" className="max-md:!min-h-0">
                <AboutGallery />
              </LazySection>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.08 }}
                className="bg-secondary/30 rounded-2xl p-6 hover:-translate-y-1 hover:bg-secondary/50 transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
