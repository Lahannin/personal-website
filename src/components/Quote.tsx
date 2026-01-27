import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Quote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Start visible, fade out as About slides over
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky quote that pins while scrolling through the container */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-secondary/30 z-0">
        <div className="container px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ opacity, y, scale }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic text-foreground leading-relaxed">
              Product marketing is telling the story of what makes you different and why it matters.
            </p>
          </motion.blockquote>
        </div>
      </div>
    </div>
  );
};

export default Quote;
