import { motion } from "framer-motion";

const Quote = () => {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden" aria-label="Quote by Lauri Hänninen on product marketing">
      {/* Dramatic background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-highlight/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-highlight/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-6 relative z-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight tracking-tight">
            <span className="md:hidden">"</span>Product marketing is telling the story of what makes you <span className="text-highlight">different</span> and why it <span className="text-highlight">matters</span>.<span className="md:hidden">"</span>
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default Quote;
