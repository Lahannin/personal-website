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
    <section id="education" className="py-20 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
          </div>

          <div className="grid gap-6">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {edu.institution}
                </h3>
                <p className="text-primary font-medium">{edu.degree}</p>
                <p className="text-muted-foreground">{edu.field}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
