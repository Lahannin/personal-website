import { useRef, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function useCarouselDragProtection(emblaApi: EmblaCarouselType | undefined) {
  const didDragRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onPointerDown = () => { didDragRef.current = false; };
    const onPointerUp = () => {
      didDragRef.current = emblaApi.selectedScrollSnap() !== emblaApi.previousScrollSnap();
    };
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi]);

  return didDragRef;
}
