import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import BitcoinWord from "./BitcoinWord";

const allSkills = [
  "Product Marketing",
  "Go-to-Market Strategy",
  "Product Positioning",
  "Messaging Frameworks",
  "Product Launches",
  "Product-Led Growth",
  "SaaS & Cloud Platforms",
  "Hardware Products",
  "Analytics & Data",
  "B2B & B2C",
  "AI/ML Applications",
  "Security & Privacy",
  "Bitcoin & Crypto",
];

const certifications = [
  { name: "Go-to-Market Certified | Masters", org: "Product Marketing Alliance", logo: "/product-marketing-alliance-logo.webp" },
  { name: "Product Marketing Certified | Core", org: "Product Marketing Alliance", logo: "/product-marketing-alliance-logo.webp" },
  { name: "Product-Led Growth", org: "ProductLed", logo: "/productled-logo.png" },
  { name: "B2B Messaging", org: "Wynter", logo: "/wynter-logo.webp" },
  { name: "Product Management Certified", org: "Pendo", logo: "/pendo-logo.webp" },
  { name: "Product-Led Certified", org: "Pendo", logo: "/pendo-logo.webp" },
  { name: "Elements of AI", org: "University of Helsinki", logo: "/university-of-helsinki-logo.jpg" },
  { name: "PRINCE2", org: "TAYLLOR & COX", logo: "/tayllorcox-logo.avif" },
];

const educationData = [
  {
    institution: "University of Oulu",
    degree: "Master of Science (M.Sc.)",
    field: "Economics and Business Administration",
    logo: "/university-of-oulu-logo.jpg",
  },
  {
    institution: "University of Helsinki",
    degree: "Non-Degree Studies",
    field: "Computer Science",
    logo: "/university-of-helsinki-logo.jpg",
  },
  {
    institution: "University of Eastern Finland",
    degree: "Non-Degree Studies",
    field: "Work and Organizational Psychology",
    logo: "/university-of-eastern-finland-logo.jpg",
  },
];

const Skills = () => {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-28 md:py-36 relative bg-secondary/30" data-description="Lauri Hänninen's professional skills, certifications from Product Marketing Alliance and others, and education from University of Oulu and University of Helsinki">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
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
            <span className="font-mono text-highlight text-[10px] font-bold tracking-[0.25em] uppercase">// SKILLS</span>
            <h2 id="skills-heading" className="text-3xl md:text-6xl font-black mt-4 tracking-[-0.03em]">
              Expertise & <span className="text-gradient">Education</span>
            </h2>
          </motion.div>

          {/* Skills as flowing inline text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="mb-16 text-center"
          >
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {allSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="inline"
                >
                  <span className="text-foreground font-medium hover:text-primary transition-colors cursor-default">
                    {skill === "Bitcoin & Crypto" ? (
                      <><BitcoinWord>Bitcoin</BitcoinWord> &amp; Crypto</>
                    ) : skill}
                  </span>
                  {index < allSkills.length - 1 && (
                    <span className="text-primary/40 mx-2 md:mx-3">·</span>
                  )}
                </motion.span>
              ))}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="w-12 h-px bg-border mx-auto mb-16" />

          {/* Certifications as a clean list */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <h3 className="mono text-xs tracking-wider text-muted-foreground text-center mb-8">
              CERTIFICATIONS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 max-w-3xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="group cursor-default hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    {cert.name}
                  </p>
                  <p className="mono text-[10px] md:text-xs text-muted-foreground mt-0.5">
                    {cert.org}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-12 h-px bg-border mx-auto mb-16" />

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="mono text-xs tracking-wider text-muted-foreground text-center mb-8 flex items-center justify-center gap-2">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              EDUCATION
            </h3>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="text-center group"
                >
                  <img
                    src={edu.logo}
                    alt={`${edu.institution} logo — Lauri Hänninen's ${edu.degree} in ${edu.field}`}
                    className="w-10 h-10 object-contain rounded mx-auto mb-3 grayscale group-hover:grayscale-0 transition-all duration-300"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                  />
                  <h4 className="text-sm font-semibold text-foreground mb-0.5 leading-snug">
                    {edu.institution}
                  </h4>
                  <p className="text-primary text-sm font-medium">{edu.degree}</p>
                  <p className="text-muted-foreground text-xs">{edu.field}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
