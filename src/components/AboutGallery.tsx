import { memo, useState, useCallback } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useLightboxKeyboard } from "@/hooks/use-lightbox-keyboard";
import PhotoLightbox from "./PhotoLightbox";

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
// w/h hints match CSS aspect ratio to prevent CLS and avoid distortion warnings
const columns: { photoIdx: number; aspect: string; imgW: number; imgH: number }[][] = [
  [
    { photoIdx: 0, aspect: "aspect-[5/4]", imgW: 400, imgH: 320 },
    { photoIdx: 3, aspect: "aspect-square", imgW: 400, imgH: 400 },
    { photoIdx: 6, aspect: "aspect-[4/3]", imgW: 400, imgH: 300 },
  ],
  [
    { photoIdx: 1, aspect: "aspect-square", imgW: 400, imgH: 400 },
    { photoIdx: 4, aspect: "aspect-[5/4]", imgW: 400, imgH: 320 },
    { photoIdx: 7, aspect: "aspect-square", imgW: 400, imgH: 400 },
  ],
  [
    { photoIdx: 2, aspect: "aspect-[4/3]", imgW: 400, imgH: 300 },
    { photoIdx: 5, aspect: "aspect-square", imgW: 400, imgH: 400 },
    { photoIdx: 8, aspect: "aspect-[5/4]", imgW: 400, imgH: 320 },
  ],
];

const AboutGallery = memo(() => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const goNext = useCallback(() => { setSwipeDirection(1); setSelectedPhoto((p) => p !== null ? (p + 1) % photos.length : null); }, []);
  const goPrev = useCallback(() => { setSwipeDirection(-1); setSelectedPhoto((p) => p !== null ? (p - 1 + photos.length) % photos.length : null); }, []);

  useScrollLock(selectedPhoto !== null);
  useLightboxKeyboard(selectedPhoto !== null, goNext, goPrev, () => setSelectedPhoto(null));

  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2.5">
            {col.map(({ photoIdx, aspect, imgW, imgH }) => (
              <div
                key={photoIdx}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photos[photoIdx].alt}`}
                className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => setSelectedPhoto(photoIdx)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedPhoto(photoIdx); } }}
              >
                <picture>
                  <source media="(max-width: 767px)" srcSet={photos[photoIdx].mobileSrc} />
                  <img
                    src={photos[photoIdx].src}
                    alt={photos[photoIdx].alt}
                    className={`w-full ${aspect} object-cover group-hover:scale-105 transition-transform duration-500`}
                    loading={photoIdx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    width={imgW}
                    height={imgH}
                    sizes="(max-width: 768px) 33vw, 256px"
                  />
                </picture>
              </div>
            ))}
          </div>
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        selectedIndex={selectedPhoto}
        swipeDirection={swipeDirection}
        onClose={() => setSelectedPhoto(null)}
        onNext={goNext}
        onPrev={goPrev}
      />
    </>
  );
});

AboutGallery.displayName = "AboutGallery";

export default AboutGallery;
