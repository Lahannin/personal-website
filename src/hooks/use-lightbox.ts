import { useState, useCallback, useEffect } from "react";
import { useScrollLock } from "./use-scroll-lock";

export function useLightbox(photoCount: number) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState(0);

  const goNext = useCallback(() => {
    setSwipeDirection(1);
    setSelectedPhoto((p) => (p !== null ? (p + 1) % photoCount : null));
  }, [photoCount]);

  const goPrev = useCallback(() => {
    setSwipeDirection(-1);
    setSelectedPhoto((p) => (p !== null ? (p - 1 + photoCount) % photoCount : null));
  }, [photoCount]);

  const close = useCallback(() => setSelectedPhoto(null), []);
  const open = useCallback((index: number) => setSelectedPhoto(index), []);

  useScrollLock(selectedPhoto !== null);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPhoto, goNext, goPrev, close]);

  return { selectedPhoto, swipeDirection, goNext, goPrev, close, open };
}
