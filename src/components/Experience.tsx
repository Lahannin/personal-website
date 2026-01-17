import { motion } from "framer-motion";

const experiences = [
  {
    company: "Trezor",
    role: "Product Marketing Lead",
    period: "2023 - Present",
    description: "Leading product marketing function, go-to-market strategy, and global launches for the world's first hardware wallet company.",
    highlights: [
      "Founded and established product marketing function as first PMM",
      "Led 2x Tier 1 global product launches (hardware and software)",
      "Designed core positioning, messaging, and GTM frameworks"
    ],
    current: true
  },
  {
    company: "Product Marketing Alliance",
    role: "Chapter Lead",
    period: "2023 - Present",
    description: "Founded the first PMA chapter in Czech Republic, building a community for local product marketers.",
    highlights: [
      "Growing an active network through events and knowledge sharing",
      "Professional development initiatives for PMM community"
    ],
    current: true
  },
  {
    company: "GoodData",
    role: "Senior Technical Product Marketing Manager",
    period: "2021 - 2023",
    description: "Led product marketing for cloud-native analytics platform across AWS, GCP, Azure, and on-premises.",
    highlights: [
      "Defined positioning and messaging strategies for analytics platform",
      "Coordinated global product launches improving brand awareness",
      "Partnered with C-level on Gartner and Forrester analyst relations"
    ],
    current: false
  },
  {
    company: "Wunderman Thompson",
    role: "Web Tagging Team Lead",
    period: "2017 - 2020",
    description: "Managed analytics implementation across Ford's global web properties and 22 national portals.",
    highlights: [
      "Led team of web tagging specialists with process improvements",
      "Supported Microsoft Dynamics rollout, training 1,200+ users",
      "Drove 105%+ lead performance growth in top markets"
    ],
    current: false
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 relative bg-secondary/20">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">EXPERIENCE</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Career <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1 md:-translate-x-1.5 mt-6 z-10">
                  {exp.current && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                  )}
                </div>
                
                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:shadow-lg">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{exp.company}</h3>
                    <p className="text-primary font-medium mb-3">{exp.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">→</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
