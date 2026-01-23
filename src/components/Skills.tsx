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
    { name: "Go-to-Market Certified | Masters", org: "PMA" },
    { name: "Product Marketing Certified | Core", org: "PMA" },
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative">
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
            <span className="mono text-primary text-sm tracking-wider">SKILLS</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Expertise & <span className="text-gradient">Education</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Core Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="border-gradient rounded-2xl p-8 card-hover"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                Core Competencies
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {skills.core.map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={tagVariants}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="skill-tag px-4 py-2 bg-secondary rounded-lg text-sm font-medium border border-transparent cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="border-gradient rounded-2xl p-8 card-hover"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                Technical Domains
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {skills.technical.map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={tagVariants}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="skill-tag px-4 py-2 bg-secondary rounded-lg text-sm font-medium border border-transparent cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="card-gradient border border-border rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              Certifications
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {skills.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 cursor-default"
                >
                  <p className="font-medium text-sm mb-1">{cert.name}</p>
                  <p className="mono text-xs text-muted-foreground">{cert.org}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="card-gradient border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="w-5 h-5 text-primary" />
              </motion.div>
              Education
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-4"
            >
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <motion.img
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="w-10 h-10 object-contain rounded"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-0.5">{edu.institution}</h4>
                      <p className="text-primary text-sm font-medium">{edu.degree}</p>
                      <p className="text-muted-foreground text-sm">{edu.field}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
