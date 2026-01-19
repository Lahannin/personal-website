import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    institution: "Oulu Business School, University of Oulu",
    degree: "Master of Science (M.Sc.)",
    field: "Economics and Business Administration",
  },
  {
    institution: "University of Helsinki",
    degree: "Non-Degree Studies",
    field: "Computer Science",
  },
  {
    institution: "University of Eastern Finland",
    degree: "Non-Degree Studies",
    field: "Work and Organizational Psychology",
  },
  {
    institution: "Oulu Business School, University of Oulu",
    degree: "Bachelor of Science (B.Sc.)",
    field: "Economics and Business Administration",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-12 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Education</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-background border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
              >
                <h3 className="text-sm font-semibold text-foreground mb-0.5">
                  {edu.institution}
                </h3>
                <p className="text-primary text-sm font-medium">{edu.degree}</p>
                <p className="text-muted-foreground text-sm">{edu.field}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
