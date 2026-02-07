import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";

const Quote = () => {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container px-6">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <QuoteIcon 
            className="hidden md:block absolute -top-2 -left-6 text-primary/15 -scale-x-100" 
            size={32} 
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-xl md:text-3xl lg:text-4xl font-medium italic text-foreground leading-relaxed px-4 md:px-8">
            Product marketing is telling the story of what makes you different and why it matters.
          </p>
          <QuoteIcon 
            className="hidden md:block absolute -bottom-2 -right-6 text-primary/15" 
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
