import { useEffect } from "react";

/**
 * Handles keyboard navigation for photo lightboxes.
 * ArrowRight → next, ArrowLeft → prev, Escape → close.
 */
export function useLightboxKeyboard(
  isOpen: boolean,
  onNext: () => void,
  onPrev: () => void,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onNext, onPrev, onClose]);
}
