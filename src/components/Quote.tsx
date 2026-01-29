import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";

const Quote = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-6">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <QuoteIcon 
            className="absolute -top-2 left-0 md:-left-6 text-primary/15 -scale-x-100" 
            size={32} 
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic text-foreground leading-relaxed px-8">
            Product marketing is telling the story of what makes you different and why it matters.
          </p>
          <QuoteIcon 
            className="absolute -bottom-2 right-0 md:-right-6 text-primary/15" 
            size={32} 
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </motion.blockquote>
      </div>
    </section>
  );
};

export default Quote;
