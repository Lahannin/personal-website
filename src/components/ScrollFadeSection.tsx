import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollFadeSectionProps {
  children: ReactNode;
}

const ScrollFadeSection = ({ children }: ScrollFadeSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollFadeSection;
