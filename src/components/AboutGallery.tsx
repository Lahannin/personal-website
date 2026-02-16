import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/about-gallery/podcast-trezor.avif", alt: "Lauri Hänninen podcast about Trezor and hardware wallets" },
  { src: "/about-gallery/trezor-safe-7-quiz.avif", alt: "Lauri Hänninen at Trezor Safe 7 quiz" },
  { src: "/about-gallery/btc-prague-panel.avif", alt: "Lauri Hänninen panel discussion at BTC Prague" },
  { src: "/about-gallery/ethcc-conference.avif", alt: "Lauri Hänninen showcasing products at ETHCC conference" },
  { src: "/about-gallery/gooddata.avif", alt: "Lauri Hänninen at GoodData" },
  { src: "/about-gallery/ethcc-8.avif", alt: "Lauri Hänninen at ETHCC 8 conference" },
  { src: "/about-gallery/btc-prague-satoshilabs.avif", alt: "Lauri Hänninen with SatoshiLabs at BTC Prague" },
  { src: "/about-gallery/trezor-safe-7-launch.avif", alt: "Lauri Hänninen at Trezor Safe 7 launch event" },
  { src: "/about-gallery/eth-milan.avif", alt: "Lauri Hänninen at ETH Milan conference" },
  
  
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

  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2.5">
            {col.map(({ photoIdx, aspect }, i) => (
              <motion.div
                key={photoIdx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: (colIdx * 0.06) + (i * 0.08) }}
                className="rounded-xl overflow-hidden border border-border cursor-pointer hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => setSelectedPhoto(photoIdx)}
              >
                <img
                  src={photos[photoIdx].src}
                  alt={photos[photoIdx].alt}
                  className={`w-full ${aspect} object-cover group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-background hover:text-primary transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 hover:bg-background/40 text-background transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 hover:bg-background/40 text-background transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.img
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              className="max-w-full max-h-[90vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutGallery;
