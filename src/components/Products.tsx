import { memo, useRef, useCallback } from "react";
import { m, useInView } from "framer-motion";
import { Monitor, Cpu, Headset, Rocket } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButtons from "./CarouselNavButtons";
import CarouselProgressDots from "./CarouselProgressDots";
import SectionHeader from "./SectionHeader";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import { useCarouselDragProtection } from "@/hooks/use-carousel-drag-protection";

const AUTOPLAY_DURATION_MS = 7000;

const isServer = typeof window === "undefined";

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

const Products = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  // On server, treat as in-view so content renders for crawlers
  const isInViewRaw = useInView(sectionRef, { once: false, amount: 0.2 });
  const isInView = isServer ? true : isInViewRaw;

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
    startIndex: 0,
  });

  const {
    selectedIndex, progressKey, canScrollPrev, canScrollNext,
    scrollPrev, scrollNext, scrollTo,
  } = useCarouselAutoplay(emblaApi, { duration: AUTOPLAY_DURATION_MS, isInView });

  const didDragRef = useCarouselDragProtection(emblaApi);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (didDragRef.current) { e.preventDefault(); didDragRef.current = false; }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="products" 
      aria-labelledby="products-heading" 
      className="py-28 md:py-36 relative overflow-hidden bg-background"
      data-description="Products launched by Lauri Hänninen: Trezor Safe 7, Trezor Safe 5, Trezor Safe 5 Freedom Edition, Trezor Expert Onboarding, Trezor Expert Consultation, GoodData Cloud Platform, and GoodData Cloud Native."
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="PRODUCT LAUNCHES"
            id="products-heading"
            subtitle="Key products I’ve helped bring to market through strategic positioning, messaging, and go-to-market execution."
          >
            Products I’ve <span className="text-gradient">Launched</span>
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
              prevLabel="Previous product"
              nextLabel="Next product"
            />

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
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCardClick}
                        className="group block relative overflow-hidden rounded-2xl transition-[opacity,transform] duration-500 ease-out"
                        style={{
                          opacity: isActive ? 1 : 0.6,
                          transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(10px)',
                        }}
                      >
                        <div className="absolute inset-0 rounded-2xl bg-secondary/30 backdrop-blur-xl group-hover:bg-secondary/50 transition-colors duration-500" />

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
                              <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] group-hover:text-foreground transition-colors duration-300">
                                {categoryConfig[product.category].label}
                              </span>
                              {product.badge && (
                                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md bg-highlight/15 text-highlight border border-highlight/25">
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
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <CarouselProgressDots
              count={products.length}
              selectedIndex={selectedIndex}
              progressKey={progressKey}
              isInView={isInView}
              autoplayDurationMs={AUTOPLAY_DURATION_MS}
              onDotClick={scrollTo}
              itemLabel="product"
            />

            <div className="sr-only" aria-live="polite" aria-atomic="true">
              Product {selectedIndex + 1} of {products.length}: {products[selectedIndex]?.name}
            </div>
          </m.div>

          <m.div
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
          </m.div>
        </div>
      </div>
    </section>
  );
});

Products.displayName = "Products";

export default Products;
