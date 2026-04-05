import { memo } from "react";
import { m } from "framer-motion";

interface CarouselProgressDotsProps {
  count: number;
  selectedIndex: number;
  progressKey: number;
  isInView: boolean;
  autoplayDurationMs: number;
  onDotClick: (index: number) => void;
  itemLabel: string;
}

const CarouselProgressDots = memo(({
  count,
  selectedIndex,
  progressKey,
  isInView,
  autoplayDurationMs,
  onDotClick,
  itemLabel,
}: CarouselProgressDotsProps) => (
  <div className="flex justify-center items-center gap-2 mt-8">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={`dot-${index}`}
        onClick={() => onDotClick(index)}
        className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden focus-ring ${
          index === selectedIndex
            ? "w-8 bg-primary/20"
            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
        }`}
        aria-label={`Go to ${itemLabel} ${index + 1}`}
      >
        {index === selectedIndex && isInView && (
          <m.div
            key={progressKey}
            className="absolute inset-y-0 left-0 right-0 bg-primary rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: autoplayDurationMs / 1000, ease: "linear" }}
            style={{ willChange: "transform" }}
          />
        )}
      </button>
    ))}
  </div>
));

CarouselProgressDots.displayName = "CarouselProgressDots";

export default CarouselProgressDots;
