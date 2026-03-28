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
      className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-highlight/50 hover:bg-highlight/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2"
      aria-label={prevLabel}
    >
      <ChevronLeft className="w-5 h-5 text-foreground" />
    </button>
    <button
      onClick={onNext}
      disabled={!canScrollNext}
      className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-highlight/50 hover:bg-highlight/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2"
      aria-label={nextLabel}
    >
      <ChevronRight className="w-5 h-5 text-foreground" />
    </button>
  </>
));

CarouselNavButtons.displayName = "CarouselNavButtons";

export default CarouselNavButtons;
