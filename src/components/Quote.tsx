import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Quote = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Reveal on scroll down, then fade out as About covers
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 1], [40, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.95, 1, 0.97]);

  return (
    <section 
      ref={sectionRef}
      className="sticky top-0 z-0 h-screen flex items-center justify-center bg-secondary/30"
    >
      <div className="container px-6">
        <motion.blockquote
          style={{ opacity, y, scale }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic text-foreground leading-relaxed">
            Product marketing is telling the story of what makes you different and why it matters.
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default Quote;
