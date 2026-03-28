import { memo, useRef } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface Photo {
  src: string;
  mobileSrc: string;
  alt: string;
}

interface PhotoLightboxProps {
  photos: Photo[];
  selectedIndex: number | null;
  swipeDirection: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const DRAG_OFFSET_THRESHOLD = 50;
const DRAG_VELOCITY_THRESHOLD = 300;

const focusRing = "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50";

const PhotoLightbox = memo(({
  photos,
  selectedIndex,
  swipeDirection,
  onClose,
  onNext,
  onPrev,
}: PhotoLightboxProps) => {
  const lightboxRef = useRef<HTMLDivElement>(null);
  useFocusTrap(lightboxRef, selectedIndex !== null);

  if (typeof document === "undefined") return null;

  const content = (
    <AnimatePresence>
      {selectedIndex !== null && (
        <m.div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 text-white hover:text-highlight transition-colors z-10 rounded-full ${focusRing}`}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10 ${focusRing}`}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10 ${focusRing}`}
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <m.picture
            key={selectedIndex}
            initial={{ opacity: 0, x: swipeDirection * 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: swipeDirection * -100, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
              if (info.offset.x < -DRAG_OFFSET_THRESHOLD || info.velocity.x < -DRAG_VELOCITY_THRESHOLD) onNext();
              else if (info.offset.x > DRAG_OFFSET_THRESHOLD || info.velocity.x > DRAG_VELOCITY_THRESHOLD) onPrev();
            }}
            style={{ touchAction: "pan-y" }}
          >
            <source media="(max-width: 767px)" srcSet={photos[selectedIndex].mobileSrc} />
            <img
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt}
              className="max-w-full max-h-[90vh] rounded-xl object-contain select-none"
              draggable={false}
            />
          </m.picture>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60 tracking-wider z-10" aria-live="polite">
            {selectedIndex + 1} / {photos.length}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
});

PhotoLightbox.displayName = "PhotoLightbox";

export default PhotoLightbox;
