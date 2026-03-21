import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const isClient = typeof window !== "undefined";

const photos = [
  { src: "/about-gallery/desktop/podcast-trezor.avif", mobileSrc: "/about-gallery/mobile/podcast-trezor.avif", alt: "Lauri Hänninen podcast about Trezor and hardware wallets" },
  { src: "/about-gallery/desktop/trezor-safe-7-quiz.avif", mobileSrc: "/about-gallery/mobile/trezor-safe-7-quiz.avif", alt: "Lauri Hänninen at Trezor Safe 7 quiz" },
  { src: "/about-gallery/desktop/btc-prague-panel.avif", mobileSrc: "/about-gallery/mobile/btc-prague-panel.avif", alt: "Lauri Hänninen panel discussion at BTC Prague" },
  { src: "/about-gallery/desktop/ethcc-conference.avif", mobileSrc: "/about-gallery/mobile/ethcc-conference.avif", alt: "Lauri Hänninen showcasing products at ETHCC conference" },
  { src: "/about-gallery/desktop/gooddata.avif", mobileSrc: "/about-gallery/mobile/gooddata.avif", alt: "Lauri Hänninen at GoodData" },
  { src: "/about-gallery/desktop/ethcc-8.avif", mobileSrc: "/about-gallery/mobile/ethcc-8.avif", alt: "Lauri Hänninen at ETHCC 8 conference" },
  { src: "/about-gallery/desktop/btc-prague-satoshilabs.avif", mobileSrc: "/about-gallery/mobile/btc-prague-satoshilabs.avif", alt: "Lauri Hänninen with SatoshiLabs at BTC Prague" },
  { src: "/about-gallery/desktop/trezor-safe-7-launch.avif", mobileSrc: "/about-gallery/mobile/trezor-safe-7-launch.avif", alt: "Lauri Hänninen at Trezor Safe 7 launch event" },
  { src: "/about-gallery/desktop/eth-milan.avif", mobileSrc: "/about-gallery/mobile/eth-milan.avif", alt: "Lauri Hänninen at ETH Milan conference" },
];

// Balanced masonry: each column sums to ~same height ratio
// Col 1: 4/5 + 1/1 + 3/4 ≈ 2.55   Col 2: 1/1 + 4/5 + 1/1 ≈ 2.8   Col 3: 3/4 + 1/1 + 4/5 ≈ 2.55
const columns: { photoIdx: number; aspect: string }[][] = [
  [
    { photoIdx: 0, aspect: "aspect-[5/4]" },
    { photoIdx: 3, aspect: "aspect-square" },
    { photoIdx: 6, aspect: "aspect-[4/3]" },
  ],
  [
    { photoIdx: 1, aspect: "aspect-square" },
    { photoIdx: 4, aspect: "aspect-[5/4]" },
    { photoIdx: 7, aspect: "aspect-square" },
  ],
  [
    { photoIdx: 2, aspect: "aspect-[4/3]" },
    { photoIdx: 5, aspect: "aspect-square" },
    { photoIdx: 8, aspect: "aspect-[5/4]" },
  ],
];

const AboutGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const goNext = useCallback(() => setSelectedPhoto((p) => p !== null ? (p + 1) % photos.length : null), []);
  const goPrev = useCallback(() => setSelectedPhoto((p) => p !== null ? (p - 1 + photos.length) % photos.length : null), []);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPhoto, goNext, goPrev]);

  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2.5">
            {col.map(({ photoIdx, aspect }, i) => (
              <div
                key={photoIdx}
                className="rounded-xl overflow-hidden border border-border cursor-pointer hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => setSelectedPhoto(photoIdx)}
              >
                <picture>
                  <source media="(max-width: 767px)" srcSet={photos[photoIdx].mobileSrc} />
                  <img
                    src={photos[photoIdx].src}
                    alt={photos[photoIdx].alt}
                    className={`w-full ${aspect} object-cover group-hover:scale-105 transition-transform duration-500`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                    sizes="(max-width: 768px) 33vw, 256px"
                  />
                </picture>
              </div>
            ))}
          </div>
        ))}
      </div>

      {isClient && createPortal(
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <motion.picture
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPhoto(null)}
              >
                <source media="(max-width: 767px)" srcSet={photos[selectedPhoto].mobileSrc} />
                <img
                  src={photos[selectedPhoto].src}
                  alt={photos[selectedPhoto].alt}
                  className="max-w-full max-h-[90vh] rounded-xl object-contain"
                />
              </motion.picture>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default AboutGallery;
