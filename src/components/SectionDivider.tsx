import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "dots" | "line" | "fade";
}

const SectionDivider = ({ variant = "dots" }: SectionDividerProps) => {
  if (variant === "fade") {
    return (
      <div className="relative h-24 md:h-32 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className="flex items-center justify-center py-12 md:py-16" aria-hidden="true">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center"
        />
      </div>
    );
  }

  // dots variant
  return (
    <div className="flex items-center justify-center gap-1.5 py-12 md:py-16" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="w-1 h-1 rounded-full bg-primary/20"
        />
      ))}
    </div>
  );
};

export default SectionDivider;
