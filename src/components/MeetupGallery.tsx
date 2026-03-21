import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

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
  const dragStartX = useRef(0);

  const goNextPhoto = useCallback(() => { setSwipeDirection(1); setSelectedPhoto((p) => p !== null ? (p + 1) % photos.length : null); }, []);
  const goPrevPhoto = useCallback(() => { setSwipeDirection(-1); setSelectedPhoto((p) => p !== null ? (p - 1 + photos.length) % photos.length : null); }, []);

  const scrollYRef = useRef(0);
  const isLockedRef = useRef(false);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedPhoto !== null && !isLockedRef.current) {
      scrollYRef.current = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      isLockedRef.current = true;
    } else if (selectedPhoto === null && isLockedRef.current) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      isLockedRef.current = false;
    }

    return () => {
      if (isLockedRef.current) {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        isLockedRef.current = false;
      }
    };
  }, [selectedPhoto]);

  // --- AUTOPLAY LOGIC ---
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();
  const initialDelayRef = useRef<ReturnType<typeof setTimeout>>();

  const resetAutoplay = useCallback(() => {
    clearTimeout(initialDelayRef.current);
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);
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
    }, 5000);

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
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed -translate-x-1/2 md:translate-x-0"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed translate-x-1/2 md:translate-x-0"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div ref={emblaRef} className="overflow-hidden mx-8 md:mx-16">
              <div className="flex">
                {photos.map((photo, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <div
                      key={index}
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

            <div className="flex justify-center items-center gap-2 mt-8">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                    index === selectedIndex
                      ? "w-8 bg-primary/20"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                >
                  {index === selectedIndex && isInView && (
                    <motion.div
                      key={progressKey}
                      className="absolute inset-y-0 left-0 w-full bg-primary rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      style={{ willChange: 'transform' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

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
              onClick={(e) => { e.stopPropagation(); goPrevPhoto(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNextPhoto(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.picture
              key={selectedPhoto}
              initial={{ opacity: 0, x: swipeDirection * 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: swipeDirection * -100, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={(_e, info) => { dragStartX.current = info.point.x; }}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -50 || info.velocity.x < -300) goNextPhoto();
                else if (info.offset.x > 50 || info.velocity.x > 300) goPrevPhoto();
              }}
              style={{ touchAction: "pan-y" }}
            >
              <source media="(max-width: 767px)" srcSet={photos[selectedPhoto].mobileSrc} />
              <img
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].alt}
                className="max-w-full max-h-[90vh] rounded-xl object-contain select-none"
                draggable={false}
              />
            </motion.picture>
            {/* Photo counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60 tracking-wider z-10">
              {selectedPhoto + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MeetupGallery;
