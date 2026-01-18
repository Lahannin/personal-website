import { motion } from "framer-motion";

const experiences = [
  {
    company: "Trezor",
    role: "Product Marketing Lead",
    period: "July 2024 – Present",
    location: "Prague, Czechia",
    description: "Lead product marketing initiatives including go-to-market strategy, positioning, messaging, and global launches.",
    highlights: [
      "Build and scale a team covering product marketing, technical writing, and copywriting",
      "Partner cross-functionally with Marketing, Product, Design, and Research teams",
      "Identify customer segments and growth opportunities through market and competitive insights"
    ],
    current: true
  },
  {
    company: "Trezor",
    role: "Senior Product Marketing Manager",
    period: "September 2023 – June 2024",
    location: "Prague, Czechia",
    description: "Founded the product marketing function as the first Product Marketer.",
    highlights: [
      "Built positioning, messaging, and go-to-market frameworks",
      "Led global launches including two Tier 1 hardware and software launches"
    ],
    current: false
  },
  {
    company: "Product Marketing Alliance",
    role: "Chapter Lead",
    period: "November 2023 – Present",
    location: "Prague, Czechia",
    description: "Founded the first PMA chapter in the Czech Republic.",
    highlights: [
      "Built and grew a local product marketing community",
      "Previously Brand Ambassador (March–November 2023), representing PMA globally"
    ],
    current: true
  },
  {
    company: "GoodData",
    role: "Senior Technical Product Marketing Manager",
    period: "September 2022 – September 2023",
    location: "Prague, Czechia",
    description: "Defined positioning and messaging for the analytics platform.",
    highlights: [
      "Increased trial adoption through product and UX collaboration",
      "Coordinated global launches and improved inbound leads",
      "Created technical content including demos, webinars, and articles"
    ],
    current: false
  },
  {
    company: "GoodData",
    role: "Product Marketing Manager",
    period: "January 2021 – August 2022",
    location: "Prague, Czechia",
    description: "Led marketing for a cloud-native analytics platform across AWS, GCP, Azure, and on-prem.",
    highlights: [
      "Produced demos, eBooks, videos, and articles",
      "Executed go-to-market campaigns for features and upgrades",
      "Led analyst relations with Gartner, Forrester, and others"
    ],
    current: false
  },
  {
    company: "Wunderman Thompson",
    role: "Web Tagging Team Lead",
    period: "October 2019 – December 2020",
    location: "Prague, Czechia",
    description: "Managed a web tagging team and improved QA processes.",
    highlights: [
      "Oversaw analytics tagging across Ford's global web properties",
      "Liaised between Ford of Europe and national sales companies"
    ],
    current: false
  },
  {
    company: "Wunderman Thompson",
    role: "Lead Management Specialist",
    period: "March 2019 – October 2019",
    location: "Prague, Czechia",
    description: "Led lead management across five Ford of Europe markets.",
    highlights: [
      "Improved lead performance with some markets exceeding 105% growth",
      "Supported rollout of Microsoft Dynamics to 1,200+ users"
    ],
    current: false
  },
  {
    company: "Wunderman Thompson",
    role: "Implementation Project Manager",
    period: "May 2017 – February 2019",
    location: "Prague, Czechia",
    description: "Led onboarding in 12 markets.",
    highlights: [
      "Reduced reporting time by over 90% through automation",
      "Maintained high customer satisfaction"
    ],
    current: false
  },
  {
    company: "SQN (Sinequanon)",
    role: "Client Delivery Specialist",
    period: "April 2016 – May 2017",
    location: "Prague, Czechia",
    description: "Managed delivery of client programs.",
    highlights: [
      "Improved implementation speed and efficiency"
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
