import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Quote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Phase 1 (0-0.25): Quote reveals - starts hidden, becomes visible
  // Phase 2 (0.25-0.45): Quote stays fully visible
  // Phase 3 (0.45-0.65): Quote fades out completely
  // Phase 4 (0.65-1): Empty space before About arrives
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.65], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.65], [60, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.65], [0.9, 1, 0.92]);

  return (
    <div ref={sectionRef} className="relative h-[250vh]">
      {/* Sticky quote that pins while scrolling through the container */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-secondary/30 z-0">
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
