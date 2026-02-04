import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const skills = {
  core: [
    "Product Marketing",
    "Go-to-Market Strategy",
    "Product Positioning",
    "Messaging Frameworks",
    "Product Launches",
    "Product-Led Growth",
  ],
  technical: [
    "SaaS & Cloud Platforms",
    "Hardware Products",
    "Analytics & Data",
    "B2B & B2C",
    "AI/ML Applications",
    "Security & Privacy",
  ],
  certifications: [
    { name: "Go-to-Market Certified | Masters", org: "Product Marketing Alliance" },
    { name: "Product Marketing Certified | Core", org: "Product Marketing Alliance" },
    { name: "Product-Led Growth", org: "ProductLed" },
    { name: "B2B Messaging", org: "Wynter" },
    { name: "Product Management Certified", org: "Pendo" },
    { name: "Product-Led Certified", org: "Pendo" },
    { name: "Elements of AI", org: "University of Helsinki" },
    { name: "PRINCE2", org: "TAYLLOR & COX" },
  ],
};

const educationData = [
  {
    institution: "Oulu Business School, University of Oulu",
    degree: "Master of Science (M.Sc.)",
    field: "Economics and Business Administration",
    logo: "https://i.ibb.co/XxGphrgW/university-of-oulu-logo.jpg",
  },
  {
    institution: "University of Helsinki",
    degree: "Non-Degree Studies",
    field: "Computer Science",
    logo: "https://i.ibb.co/gMdN7mnq/1631300517673.jpg",
  },
  {
    institution: "University of Eastern Finland",
    degree: "Non-Degree Studies",
    field: "Work and Organizational Psychology",
    logo: "https://i.ibb.co/398GD7x2/university-of-eastern-finland-logo.jpg",
  },
];

const Skills = () => {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 md:py-32 relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_25%_95%)_0%,hsl(0_0%_100%)_50%,hsl(220_25%_96%)_100%)]" />
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse,hsl(172_66%_50%/0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[radial-gradient(ellipse,hsl(12_76%_61%/0.04),transparent_70%)] pointer-events-none" />
      
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
            <span className="mono text-[hsl(172_66%_50%)] text-sm tracking-wider font-medium">SKILLS</span>
            <h2 id="skills-heading" className="text-3xl md:text-5xl font-bold mt-4">
              Expertise & <span className="text-gradient">Education</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Core Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-border/50"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[hsl(12_76%_61%)]" />
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3">
                {skills.core.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(220_25%_96%)] rounded-lg text-xs md:text-sm font-medium border border-transparent hover:border-[hsl(12_76%_61%/0.3)] hover:bg-[hsl(12_76%_61%/0.08)] transition-all text-center md:text-left cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-border/50"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[hsl(172_66%_50%)]" />
                Technical Domains
              </h3>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3">
                {skills.technical.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(220_25%_96%)] rounded-lg text-xs md:text-sm font-medium border border-transparent hover:border-[hsl(172_66%_50%/0.3)] hover:bg-[hsl(172_66%_50%/0.08)] transition-all text-center md:text-left cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-border/50 rounded-2xl p-8 mb-8 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              Certifications
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {skills.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 30px -10px hsl(217 46% 21% / 0.15)" }}
                  className="p-3 md:p-4 bg-[hsl(220_25%_97%)] rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-default"
                >
                  <p className="font-semibold text-xs md:text-sm mb-1">{cert.name}</p>
                  <p className="mono text-[10px] md:text-xs text-muted-foreground">{cert.org}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-border/50 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[hsl(12_76%_61%)]" aria-hidden="true" />
              Education
            </h3>
            <div className="grid gap-4">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-[hsl(220_25%_97%)] rounded-xl border border-border/50 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={edu.logo} 
                      alt="" 
                      className="w-10 h-10 object-contain rounded flex-shrink-0"
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-0.5">{edu.institution}</h4>
                      <p className="text-primary text-sm font-medium">{edu.degree}</p>
                      <p className="text-muted-foreground text-sm">{edu.field}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
