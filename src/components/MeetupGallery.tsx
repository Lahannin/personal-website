import { memo, useState, useCallback, useEffect, useRef } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { m, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButtons from "./CarouselNavButtons";
import CarouselProgressDots from "./CarouselProgressDots";
import PhotoLightbox from "./PhotoLightbox";
import SectionHeader from "./SectionHeader";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";

const AUTOPLAY_DURATION_MS = 5000;

const photos = [
  { src: "/meetup-gallery/desktop/product-marketing-meetup-1.avif", mobileSrc: "/meetup-gallery/mobile/product-marketing-meetup-1.avif", alt: "Lauri Hänninen at Product Marketing Alliance Prague meetup dinner" },
  { src: "/meetup-gallery/desktop/product-marketing-meetup-6.avif", mobileSrc: "/meetup-gallery/mobile/product-marketing-meetup-6.avif", alt: "Lauri Hänninen's PMA Prague community dinner event" },
  { src: "/meetup-gallery/desktop/product-marketing-meetup-2.avif", mobileSrc: "/meetup-gallery/mobile/product-marketing-meetup-2.avif", alt: "Lauri Hänninen hosting PMA Prague Christmas meetup" },
  { src: "/meetup-gallery/desktop/product-marketing-meetup-3.avif", mobileSrc: "/meetup-gallery/mobile/product-marketing-meetup-3.avif", alt: "Lauri Hänninen at product marketing community gathering in Prague" },
  { src: "/meetup-gallery/desktop/product-marketing-meetup-4.avif", mobileSrc: "/meetup-gallery/mobile/product-marketing-meetup-4.avif", alt: "Lauri Hänninen's Product Marketing Alliance Prague meetup group photo" },
  { src: "/meetup-gallery/desktop/product-marketing-meetup-5.avif", mobileSrc: "/meetup-gallery/mobile/product-marketing-meetup-5.avif", alt: "Lauri Hänninen at product marketing dinner meetup in Prague" },
  { src: "/meetup-gallery/desktop/product-marketing-meetup-7.avif", mobileSrc: "/meetup-gallery/mobile/product-marketing-meetup-7.avif", alt: "Lauri Hänninen's Product Marketing Prague meetup at a café" },
];

const MeetupGallery = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const {
    selectedIndex, progressKey, canScrollPrev, canScrollNext,
    scrollPrev, scrollNext, scrollTo,
  } = useCarouselAutoplay(emblaApi, { duration: AUTOPLAY_DURATION_MS, isInView });

  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const goNextPhoto = useCallback(() => { setSwipeDirection(1); setSelectedPhoto((p) => p !== null ? (p + 1) % photos.length : null); }, []);
  const goPrevPhoto = useCallback(() => { setSwipeDirection(-1); setSelectedPhoto((p) => p !== null ? (p - 1 + photos.length) % photos.length : null); }, []);

  useScrollLock(selectedPhoto !== null);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNextPhoto();
      else if (e.key === "ArrowLeft") goPrevPhoto();
      else if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPhoto, goNextPhoto, goPrevPhoto]);

  return (
    <section
      ref={sectionRef}
      id="meetups"
      aria-labelledby="meetups-heading"
      className="py-28 md:py-36 relative overflow-hidden"
      data-description="Product marketing meetups organized by Lauri Hänninen in Prague as Chapter Lead of Product Marketing Alliance Czech Republic."
    >

      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="COMMUNITY"
            id="meetups-heading"
            subtitle="Building the product marketing community in Prague, one meetup at a time."
          >
            Meetups I've <span className="text-gradient">Organized</span>
          </SectionHeader>

          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            <CarouselNavButtons
              onPrev={scrollPrev}
              onNext={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
              prevLabel="Previous photo"
              nextLabel="Next photo"
            />

            <div ref={emblaRef} className="overflow-hidden mx-8 md:mx-16">
              <div className="flex">
                {photos.map((photo, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <div
                      key={photo.src}
                      className="flex-[0_0_100%] min-w-0 md:flex-[0_0_70%] lg:flex-[0_0_55%] px-4"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={`View photo: ${photo.alt}`}
                        className={`rounded-2xl overflow-hidden border cursor-pointer transition-[opacity,transform,border-color,box-shadow] duration-300 ease-in-out ${
                          isActive
                            ? "border-primary/30 shadow-2xl shadow-primary/10"
                            : "border-border/50 shadow-md"
                        }`}
                        style={{
                          opacity: isActive ? 1 : 0.5,
                          transform: isActive ? 'scale(1)' : 'scale(0.95)',
                        }}
                        onClick={() => setSelectedPhoto(index)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedPhoto(index); } }}
                      >
                        <picture>
                          <source media="(max-width: 767px)" srcSet={photo.mobileSrc} />
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full aspect-[4/3] object-cover"
                            loading="lazy"
                            decoding="async"
                            width={967}
                            height={725}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 55vw"
                          />
                        </picture>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <CarouselProgressDots
              count={photos.length}
              selectedIndex={selectedIndex}
              progressKey={progressKey}
              isInView={isInView}
              autoplayDurationMs={AUTOPLAY_DURATION_MS}
              onDotClick={scrollTo}
              itemLabel="photo"
            />

            <div className="sr-only" aria-live="polite" aria-atomic="true">
              Photo {selectedIndex + 1} of {photos.length}: {photos[selectedIndex]?.alt}
            </div>
          </m.div>
        </div>
      </div>

      <PhotoLightbox
        photos={photos}
        selectedIndex={selectedPhoto}
        swipeDirection={swipeDirection}
        onClose={() => setSelectedPhoto(null)}
        onNext={goNextPhoto}
        onPrev={goPrevPhoto}
      />
    </section>
  );
});

MeetupGallery.displayName = "MeetupGallery";

export default MeetupGallery;
