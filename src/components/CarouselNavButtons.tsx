import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  prevLabel?: string;
  nextLabel?: string;
}

const CarouselNavButtons = memo(({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
  prevLabel = "Previous",
  nextLabel = "Next",
}: CarouselNavButtonsProps) => (
  <>
    <button
      onClick={onPrev}
      disabled={!canScrollPrev}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed -translate-x-1/2 md:translate-x-0"
      aria-label={prevLabel}
    >
      <ChevronLeft className="w-5 h-5 text-foreground" />
    </button>
    <button
      onClick={onNext}
      disabled={!canScrollNext}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed translate-x-1/2 md:translate-x-0"
      aria-label={nextLabel}
    >
      <ChevronRight className="w-5 h-5 text-foreground" />
    </button>
  </>
));

CarouselNavButtons.displayName = "CarouselNavButtons";

export default CarouselNavButtons;
