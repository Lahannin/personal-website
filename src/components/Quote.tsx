import { motion } from "framer-motion";

const Quote = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-6">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed">
            "Product marketing is telling the story of what makes you different and why it matters."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default Quote;
