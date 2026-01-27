import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Quote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative h-[50vh] md:h-[60vh]">
      <section className="sticky top-0 h-[50vh] md:h-[60vh] flex items-center bg-secondary/30 overflow-hidden">
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
    </div>
  );
};

export default Quote;
