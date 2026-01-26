import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface QuoteProps {
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
}

const Quote = ({ onAnimationComplete, onAnimationStart }: QuoteProps) => {
  const words = "Product marketing is telling the story of what makes you different and why it matters.".split(" ");
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40%" });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      onAnimationStart?.();
      
      // Calculate total animation time: delayChildren + (staggerChildren * words.length) + word animation duration
      const totalTime = 0.2 + (0.08 * words.length) + 0.5;
      const timeout = setTimeout(() => {
        onAnimationComplete?.();
      }, totalTime * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasStarted, onAnimationStart, onAnimationComplete, words.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section ref={ref} className="h-screen flex items-center justify-center bg-secondary/30 snap-start">
      <div className="container px-6">
        <motion.blockquote
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium italic text-foreground leading-relaxed">
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default Quote;