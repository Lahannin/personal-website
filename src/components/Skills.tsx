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
    <section id="skills" className="py-24 md:py-32 relative">
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
            <span className="mono text-primary text-sm tracking-wider">SKILLS</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
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
              className="border-gradient rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3">
                {skills.core.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-secondary rounded-lg text-xs md:text-sm font-medium border border-transparent hover:border-primary/30 transition-colors text-center md:text-left"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-gradient rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Technical Domains
              </h3>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3">
                {skills.technical.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-secondary rounded-lg text-xs md:text-sm font-medium border border-transparent hover:border-primary/30 transition-colors text-center md:text-left"
                  >
                    {skill}
                  </span>
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
            className="card-gradient border border-border rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Certifications
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {skills.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <p className="font-medium text-xs md:text-sm mb-1">{cert.name}</p>
                  <p className="mono text-[10px] md:text-xs text-muted-foreground">{cert.org}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="card-gradient border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" aria-hidden="true" />
              Education
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={edu.logo} 
                      alt={`${edu.institution} logo`} 
                      className="w-10 h-10 object-contain rounded"
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
