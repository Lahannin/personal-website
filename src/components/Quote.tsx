import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Quote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Fade out and slight parallax as About covers
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <div ref={containerRef} className="relative h-[70vh] md:h-[80vh]">
      {/* Sticky container that pins the quote */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-secondary/30">
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
      </div>
    </div>
  );
};

export default Quote;
