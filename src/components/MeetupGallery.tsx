import { useState, useCallback, useEffect, useRef } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButtons from "./CarouselNavButtons";
import CarouselProgressDots from "./CarouselProgressDots";
import PhotoLightbox from "./PhotoLightbox";

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

const MeetupGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const goNextPhoto = useCallback(() => { setSwipeDirection(1); setSelectedPhoto((p) => p !== null ? (p + 1) % photos.length : null); }, []);
  const goPrevPhoto = useCallback(() => { setSwipeDirection(-1); setSelectedPhoto((p) => p !== null ? (p - 1 + photos.length) % photos.length : null); }, []);

  useScrollLock(selectedPhoto !== null);

  // --- AUTOPLAY LOGIC ---
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();
  const initialDelayRef = useRef<ReturnType<typeof setTimeout>>();

  const resetAutoplay = useCallback(() => {
    clearTimeout(initialDelayRef.current);
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, AUTOPLAY_DURATION_MS);
  }, [emblaApi]);

  // --- NAVIGATION ---
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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgressKey((k) => k + 1);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

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

  // --- SYNCED VIEW-TRIGGERED AUTOPLAY ---
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
    }, AUTOPLAY_DURATION_MS);

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
  }, [emblaApi, resetAutoplay, isInView]);

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
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-highlight text-[10px] font-bold tracking-[0.25em] uppercase">// COMMUNITY</span>
            <h2 id="meetups-heading" className="text-3xl md:text-6xl font-black mt-4 tracking-[-0.03em]">
              Meetups I've <span className="text-gradient">Organized</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Building the product marketing community in Prague, one meetup at a time.
            </p>
          </motion.div>

          <motion.div
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
                        className={`rounded-2xl overflow-hidden border cursor-pointer will-change-[transform,opacity] transition-all duration-300 ease-in-out ${
                          isActive
                            ? "border-primary/30 shadow-2xl shadow-primary/10"
                            : "border-border/50 shadow-md"
                        }`}
                        style={{
                          opacity: isActive ? 1 : 0.5,
                          transform: isActive ? 'scale(1)' : 'scale(0.95)',
                        }}
                        onClick={() => setSelectedPhoto(index)}
                      >
                        <picture>
                          <source media="(max-width: 767px)" srcSet={photo.mobileSrc} />
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full aspect-[4/3] object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
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
          </motion.div>
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
};

export default MeetupGallery;
