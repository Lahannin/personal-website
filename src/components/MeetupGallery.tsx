import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const photos = [
  { src: "/product-marketing-meetup-1.avif", alt: "Lauri Hänninen at Product Marketing Alliance Prague meetup dinner" },
  { src: "/product-marketing-meetup-2.avif", alt: "Lauri Hänninen hosting PMA Prague Christmas meetup" },
  { src: "/product-marketing-meetup-3.avif", alt: "Lauri Hänninen at product marketing community gathering in Prague" },
  { src: "/product-marketing-meetup-4.avif", alt: "Lauri Hänninen's Product Marketing Alliance Prague meetup group photo" },
  { src: "/product-marketing-meetup-5.avif", alt: "Lauri Hänninen at product marketing dinner meetup in Prague" },
  { src: "/product-marketing-meetup-6.avif", alt: "Lauri Hänninen's PMA Prague community dinner event" },
  { src: "/product-marketing-meetup-7.avif", alt: "Lauri Hänninen's Product Marketing Prague meetup at a café" },
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

  // --- AUTOPLAY LOGIC ---
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();
  const initialDelayRef = useRef<ReturnType<typeof setTimeout>>();

  const resetAutoplay = useCallback(() => {
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

  const goNextPhoto = useCallback(() => setSelectedPhoto((p) => p !== null ? (p + 1) % photos.length : null), []);
  const goPrevPhoto = useCallback(() => setSelectedPhoto((p) => p !== null ? (p - 1 + photos.length) % photos.length : null), []);

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
      className="py-28 md:py-36 relative overflow-hidden bg-secondary/30"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

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
                      <motion.div
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{
                          opacity: isActive ? 1 : 0.5,
                          scale: isActive ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`rounded-2xl overflow-hidden border cursor-pointer will-change-transform ${
                          isActive
                            ? "border-primary/30 shadow-2xl shadow-primary/10"
                            : "border-border/50 shadow-md"
                        }`}
                        onClick={() => setSelectedPhoto(index)}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full aspect-[4/3] object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </motion.div>
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
                      className="absolute inset-y-0 left-0 bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
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
              onClick={(e) => { e.stopPropagation(); goPrevPhoto(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/20 hover:bg-background/40 text-background transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNextPhoto(); }}
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
              onClick={() => setSelectedPhoto(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MeetupGallery;
