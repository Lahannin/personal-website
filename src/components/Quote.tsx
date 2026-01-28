import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Quote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Phase 1 (0-0.2): Quote reveals quickly
  // Phase 2 (0.2-0.55): Quote stays fully visible (extended)
  // Phase 3 (0.55-0.75): Quote fades out completely
  // Phase 4 (0.75-1): Empty space before About arrives
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.55, 0.75], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.75], [60, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.75], [0.9, 1, 0.92]);
  
  // Background transition: secondary/30 → background
  const bgOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);

  return (
    <div ref={sectionRef} className="relative h-[250vh]">
      {/* Sticky quote that pins while scrolling through the container */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-secondary/30 z-0">
        {/* Gradient overlay that fades in as quote disappears */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background/80 to-background"
        />
        
        <div className="container px-6 relative z-10">
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
