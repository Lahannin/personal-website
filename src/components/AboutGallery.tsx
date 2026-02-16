import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const photos = [
  { src: "/about-gallery/trezor-safe-7-launch.avif", alt: "Lauri Hänninen at Trezor Safe 7 launch event" },
  { src: "/about-gallery/podcast-trezor.avif", alt: "Lauri Hänninen podcast about Trezor and hardware wallets" },
  { src: "/about-gallery/btc-prague-panel.avif", alt: "Lauri Hänninen panel discussion at BTC Prague" },
  { src: "/about-gallery/eth-milan.avif", alt: "Lauri Hänninen at ETH Milan conference" },
  { src: "/about-gallery/btc-prague-satoshilabs.avif", alt: "Lauri Hänninen with SatoshiLabs at BTC Prague" },
  { src: "/about-gallery/trezor-safe-7-quiz.avif", alt: "Lauri Hänninen at Trezor Safe 7 quiz" },
  { src: "/about-gallery/ethcc-8.avif", alt: "Lauri Hänninen at ETHCC 8 conference" },
  { src: "/about-gallery/tbd-interview.avif", alt: "Lauri Hänninen interview at TBD event" },
  { src: "/about-gallery/gooddata.avif", alt: "Lauri Hänninen at GoodData" },
];

// Masonry layout: 3 columns with varying aspect ratios for visual interest
const colAssignments: [number[], number[], number[]] = [
  [0, 3, 6],  // col 1
  [1, 4, 7],  // col 2
  [2, 5, 8],  // col 3
];

const aspectRatios = [
  "aspect-[3/4]", "aspect-square", "aspect-[4/3]",
  "aspect-square", "aspect-[3/4]", "aspect-square",
  "aspect-[4/3]", "aspect-square", "aspect-[3/4]",
];

const AboutGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        {colAssignments.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2.5">
            {col.map((photoIdx, i) => (
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
                  className={`w-full ${aspectRatios[photoIdx]} object-cover group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

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
            className="absolute top-6 right-6 text-background hover:text-primary transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={photos[selectedPhoto].src}
            alt={photos[selectedPhoto].alt}
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
};

export default AboutGallery;
