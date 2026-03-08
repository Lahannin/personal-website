import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Cpu, Headset, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface Product {
  name: string;
  description: string;
  url?: string;
  logo?: string;
  category: "software" | "hardware" | "services";
  badge?: string;
}

const products: Product[] = [
  {
    name: "GoodData Cloud Platform",
    description: "A fully managed, API-first analytics platform combining BI, AI, and Analytics Lake. Enables businesses to build custom data applications with AI-assisted analytics.",
    url: "https://www.gooddata.com/",
    logo: "/gooddata-logo.webp",
    category: "software",
  },
  {
    name: "GoodData Cloud Native",
    description: "Self-hosted version of GoodData Cloud. Scalable microservices architecture deployable in containers alongside data in public/private cloud or on-premises.",
    url: "https://www.gooddata.com/",
    logo: "/gooddata-logo.webp",
    category: "software",
  },
  {
    name: "Trezor Safe 7",
    description: "The world's first hardware wallet with auditable secure element and quantum-ready architecture, built to redefine how users protect their crypto.",
    url: "https://trezor.io/trezor-safe-7",
    logo: "/trezor-logo.webp",
    category: "hardware",
  },
  {
    name: "Trezor Safe 5",
    description: "Hardware wallet with an intuitive touchscreen, haptic feedback, and vibrant colors, designed to make everyday crypto management simple and secure.",
    url: "https://trezor.io/trezor-safe-5",
    logo: "/trezor-logo.webp",
    category: "hardware",
  },
  {
    name: "Trezor Safe 5 Freedom Edition",
    description: "Limited Edition with 2,100 individually serialized units, created for those who value freedom, independence, and true ownership.",
    url: "https://satoshilabs.com/news/trezor-launches-limited-freedom-edition-wallet-as-part-of-its-financial-sovereignty-campaign",
    logo: "/trezor-logo.webp",
    category: "hardware",
  },
  {
    name: "Trezor Expert Onboarding",
    description: "Personalized, one-on-one onboarding that gives users expert guidance and confidence setting up their crypto hardware wallets.",
    url: "https://trezor.io/trezor-expert-session",
    logo: "/trezor-logo.webp",
    category: "services",
  },
  {
    name: "Trezor Expert Consultation",
    description: "Premium one-on-one support to help customers navigate Trezor, learn every feature, and manage their crypto securely.",
    url: "https://trezor.io/trezor-expert-consultation",
    logo: "/trezor-logo.webp",
    category: "services",
  },
];

const categoryConfig = {
  software: { icon: Monitor, label: "Software", accent: "hsl(var(--primary))" },
  hardware: { icon: Cpu, label: "Hardware", accent: "hsl(var(--highlight))" },
  services: { icon: Headset, label: "Services", accent: "hsl(var(--primary))" },
};

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
    startIndex: 0,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // --- AUTOPLAY LOGIC (UPDATED TO 7S) ---
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();
  const initialDelayRef = useRef<ReturnType<typeof setTimeout>>();

  const resetAutoplay = useCallback(() => {
    clearTimeout(initialDelayRef.current);
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 7000);
  }, [emblaApi]);

  // --- NAVIGATION WRAPPERS ---
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

  // --- TRIGGER AUTOPLAY ONLY WHEN IN VIEW ---
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
    }, 7000);

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
      id="products" 
      aria-labelledby="products-heading" 
      className="py-28 md:py-36 relative overflow-hidden bg-background"
    >
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
            <span className="font-mono text-highlight text-[10px] font-bold tracking-[0.25em] uppercase">// PRODUCT LAUNCHES</span>
            <h2 id="products-heading" className="text-3xl md:text-6xl font-black mt-4 tracking-[-0.03em]">
              Products I've <span className="text-gradient">Launched</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Key products I’ve helped bring to market through strategic positioning, messaging, and go-to-market execution.
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
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed translate-x-1/2 md:translate-x-0"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div ref={emblaRef} className="overflow-hidden mx-8 md:mx-16">
              <div className="flex">
                {products.map((product, index) => {
                  const CategoryIcon = categoryConfig[product.category].icon;
                  const isActive = index === selectedIndex;

                  return (
                    <div
                      key={product.name}
                      className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] lg:flex-[0_0_60%] px-4"
                    >
                      <motion.a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0.4, scale: 0.88, y: 10 }}
                        animate={{
                          opacity: isActive ? 1 : 0.4,
                          scale: isActive ? 1 : 0.88,
                          y: isActive ? 0 : 10,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="group block relative overflow-hidden will-change-transform rounded-2xl"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 group-hover:border-primary/30 group-hover:bg-card/80 transition-colors duration-500" />

                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{ background: `linear-gradient(135deg, transparent 40%, ${categoryConfig[product.category].accent}08 60%, transparent 80%)` }}
                        />

                        <div className="relative p-8 md:p-10">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${categoryConfig[product.category].accent}15` }}
                              >
                                <CategoryIcon className="w-4 h-4 transition-colors duration-300" style={{ color: categoryConfig[product.category].accent }} />
                              </div>
                              <span className="mono text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] group-hover:text-foreground transition-colors duration-300">
                                {categoryConfig[product.category].label}
                              </span>
                              {product.badge && (
                                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md bg-highlight/15 text-highlight border border-highlight/25 animate-pulse">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            {product.logo && (
                              <img
                                src={product.logo}
                                alt={`${product.name} logo`}
                                className="w-9 h-9 rounded-xl object-contain bg-background/80 p-1.5 ring-1 ring-border/50 opacity-50 group-hover:opacity-100 group-hover:ring-primary/20 transition-all duration-300"
                                width={36}
                                height={36}
                                loading="lazy"
                                decoding="async"
                              />
                            )}
                          </div>

                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-5 leading-[1.05] group-hover:translate-x-1 transition-transform duration-500 ease-out">
                            {product.name}
                            <span
                              className="inline-block ml-3 text-xl opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-500 ease-out"
                              style={{ color: categoryConfig[product.category].accent }}
                            >
                              ↗
                            </span>
                          </h3>

                          <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-lg">
                            {product.description}
                          </p>

                          <div className="mt-8 h-[2px] rounded-full bg-border/50 relative overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 w-0 group-hover:w-full rounded-full transition-all duration-700 ease-out"
                              style={{ background: `linear-gradient(90deg, ${categoryConfig[product.category].accent}, ${categoryConfig[product.category].accent}60)` }}
                            />
                          </div>
                        </div>
                      </motion.a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SYNCED DOTS (UPDATED TO 7S) */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                    index === selectedIndex
                      ? "w-8 bg-primary/20"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                >
                  {index === selectedIndex && isInView && (
                    <motion.div
                      key={progressKey}
                      className="absolute inset-y-0 left-0 right-0 bg-primary rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 7, ease: "linear" }}
                      style={{ willChange: 'transform' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary/5 border border-primary/20">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">
                Plus <span className="font-semibold text-foreground">countless other feature launches</span> across software and hardware
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Products;
