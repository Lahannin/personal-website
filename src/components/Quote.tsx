import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";

const Quote = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Diagonal background slice */}
      <div 
        className="absolute inset-0 bg-secondary/30" 
        style={{ clipPath: "polygon(0 15%, 100% 0, 100% 85%, 0 100%)" }} 
      />
      
      <div className="container px-6 relative z-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto md:ml-[10%] text-center md:text-left relative py-8"
        >
          <QuoteIcon 
            className="hidden md:block absolute -top-4 -left-12 text-primary/20 -scale-x-100" 
            size={48} 
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-xl md:text-2xl lg:text-3xl font-medium italic text-foreground leading-relaxed">
            Product marketing is telling the story of what makes you different and why it matters.
          </p>
          <QuoteIcon 
            className="hidden md:block absolute -bottom-4 right-0 text-primary/20" 
            size={48} 
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </motion.blockquote>
      </div>
    </section>
  );
};

export default Quote;
