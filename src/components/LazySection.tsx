import { memo, useRef, useState, useEffect, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  minHeight?: string;
}

const isServer = typeof window === "undefined";

const LazySection = memo(({ children, rootMargin = "200px", className, minHeight = "200px" }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // On server: always render children so crawlers get content
  const [isVisible, setIsVisible] = useState(isServer);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {isVisible ? children : null}
    </div>
  );
});

LazySection.displayName = "LazySection";

export default LazySection;
