import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Cpu, Headset, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import gooddataLogo from "@/assets/gooddata-logo.jpg";
import trezorLogo from "@/assets/trezor-logo.jpg";

interface Product {
  name: string;
  description: string;
  url?: string;
  logo?: string;
  category: "software" | "hardware" | "services";
}

const products: Product[] = [
  {
    name: "GoodData Cloud",
    description: "A fully managed, API-first analytics platform combining BI, AI, and Analytics Lake. Enables businesses to build custom data applications with AI-assisted analytics.",
    url: "https://www.gooddata.com/",
    logo: gooddataLogo,
    category: "software",
  },
  {
    name: "GoodData.CN",
    description: "Self-hosted version of GoodData Cloud. Scalable microservices architecture deployable in containers alongside data in public/private cloud or on-premises.",
    url: "https://www.gooddata.com/",
    logo: gooddataLogo,
    category: "software",
  },
  {
    name: "Trezor Safe 5",
    description: "Hardware wallet with vibrant color touchscreen and haptic feedback for everyday crypto security.",
    url: "https://trezor.io/trezor-safe-5",
    logo: trezorLogo,
    category: "hardware",
  },
  {
    name: "Trezor Safe 7",
    description: "The hardware wallet that redefines crypto security forever — radically transparent, fully wireless, and quantum-ready.",
    url: "https://trezor.io/trezor-safe-7",
    logo: trezorLogo,
    category: "hardware",
  },
  {
    name: "Trezor Expert",
    description: "Personalized onboarding service with one-on-one video guidance for setting up your hardware wallet and learning security best practices.",
    url: "https://trezor.io/trezor-expert",
    logo: trezorLogo,
    category: "services",
  },
];

const categoryConfig = {
  software: { icon: Monitor, label: "Software", color: "from-blue-500/20 to-cyan-500/20" },
  hardware: { icon: Cpu, label: "Hardware", color: "from-orange-500/20 to-amber-500/20" },
  services: { icon: Headset, label: "Services", color: "from-purple-500/20 to-pink-500/20" },
};

const Products = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

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

  // Auto-play
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();
  const resetAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => emblaApi?.scrollNext(), 5000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    resetAutoplay();
    emblaApi.on("pointerDown", () => clearInterval(autoplayRef.current));
    emblaApi.on("pointerUp", resetAutoplay);
    return () => clearInterval(autoplayRef.current);
  }, [emblaApi, resetAutoplay]);

  return (
    <section id="products" aria-labelledby="products-heading" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">PRODUCT LAUNCHES</span>
            <h2 id="products-heading" className="text-3xl md:text-5xl font-bold mt-4">
              Products I've <span className="text-gradient">Launched</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Key products and features I've brought to market through strategic positioning, messaging, and go-to-market execution.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Navigation arrows */}
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

            {/* Carousel viewport */}
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
                      <AnimatePresence mode="wait">
                        <motion.a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0.5, scale: 0.95 }}
                          animate={{ 
                            opacity: isActive ? 1 : 0.5, 
                            scale: isActive ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`group block relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                            isActive 
                              ? "border-primary/30 shadow-2xl shadow-primary/10" 
                              : "border-border/50"
                          }`}
                        >
                          {/* Category gradient background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${categoryConfig[product.category].color} opacity-50`} />
                          
                          {/* Content */}
                          <div className="relative p-8 md:p-10">
                            {/* Category badge */}
                            <div className="flex items-center gap-2 mb-6">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <CategoryIcon className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {categoryConfig[product.category].label}
                              </span>
                            </div>

                            {/* Product info */}
                            <div className="flex items-start gap-5">
                              {product.logo && (
                                <motion.div
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: isActive ? 1 : 0.9 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex-shrink-0"
                                >
                                  <img
                                    src={product.logo}
                                    alt={`${product.name} logo`}
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-contain bg-white p-2 shadow-lg"
                                    width={80}
                                    height={80}
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </motion.div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                                  {product.name}
                                  <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                                    ↗
                                  </span>
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dot indicators with progress */}
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
                  {index === selectedIndex && (
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

          {/* Additional launches callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary/5 border border-primary/20">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">
                Plus <span className="font-semibold text-foreground">20+ other feature launches</span> across software, hardware, and services
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Products;
