import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";

const Quote = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(217_46%_21%)_0%,hsl(217_50%_28%)_50%,hsl(217_46%_21%)_100%)]" />
      
      {/* Decorative accent elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(ellipse,hsl(12_76%_61%/0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse,hsl(172_66%_50%/0.1),transparent_70%)] pointer-events-none" />
      
      <div className="container px-6 relative z-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <QuoteIcon 
            className="hidden md:block absolute -top-2 -left-6 text-white/20 -scale-x-100" 
            size={40} 
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-xl md:text-3xl lg:text-4xl font-medium italic text-white leading-relaxed px-4 md:px-8">
            Product marketing is telling the story of what makes you different and why it matters.
          </p>
          <QuoteIcon 
            className="hidden md:block absolute -bottom-2 -right-6 text-white/20" 
            size={40} 
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </motion.blockquote>
      </div>
    </section>
  );
};

export default Quote;
