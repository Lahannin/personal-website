import { memo, type ReactNode } from "react";
import { m } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  id: string;
  children: ReactNode;
  subtitle?: string;
}

const SectionHeader = memo(({ label, id, children, subtitle }: SectionHeaderProps) => (
  <m.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4 }}
    className="text-center mb-16"
  >
    <span className="font-mono text-highlight text-[10px] font-bold tracking-[0.25em] uppercase">
      // {label}
    </span>
    <h2 id={id} className="text-3xl md:text-6xl font-black mt-4 tracking-[-0.03em]">
      {children}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </m.div>
));

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
