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

const AboutGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Show 4 photos in a 2x2 grid, cycle through on hover for delight
  const displayPhotos = photos.slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {displayPhotos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="rounded-xl overflow-hidden border border-border cursor-pointer hover:border-primary/40 hover:shadow-xl transition-all duration-300 group"
            onClick={() => setSelectedPhoto(index)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              width={300}
              height={300}
            />
          </motion.div>
        ))}
      </div>

      {/* Additional photos row */}
      <div className="grid grid-cols-5 gap-2 mt-3">
        {photos.slice(4).map((photo, index) => (
          <motion.div
            key={index + 4}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="rounded-lg overflow-hidden border border-border cursor-pointer hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            onClick={() => setSelectedPhoto(index + 4)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              width={120}
              height={120}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
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
