import { useState, useRef, useCallback, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";

interface UseCarouselAutoplayOptions {
  duration: number;
  isInView: boolean;
}

export function useCarouselAutoplay(
  emblaApi: EmblaCarouselType | undefined,
  { duration, isInView }: UseCarouselAutoplayOptions,
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const autoplayRef = useRef<ReturnType<typeof setInterval>>();
  const initialDelayRef = useRef<ReturnType<typeof setTimeout>>();

  const resetAutoplay = useCallback(() => {
    clearTimeout(initialDelayRef.current);
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, duration);
  }, [emblaApi, duration]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgressKey((k) => k + 1);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Sync with embla select events
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // View-triggered autoplay with pointer pause
  useEffect(() => {
    if (!emblaApi) return;

    if (!isInView) {
      clearTimeout(initialDelayRef.current);
      clearInterval(autoplayRef.current);
      return;
    }

    initialDelayRef.current = setTimeout(() => {
      emblaApi.scrollNext();
      resetAutoplay();
    }, duration);

    const onPointerDown = () => {
      clearTimeout(initialDelayRef.current);
      clearInterval(autoplayRef.current);
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", resetAutoplay);

    return () => {
      clearTimeout(initialDelayRef.current);
      clearInterval(autoplayRef.current);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", resetAutoplay);
    };
  }, [emblaApi, resetAutoplay, isInView, duration]);

  return {
    selectedIndex,
    progressKey,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
