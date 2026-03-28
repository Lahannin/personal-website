import { useEffect, type RefObject } from "react";

/**
 * Adds the "visible" class to the referenced element when it enters the viewport.
 * Disconnects after first intersection (once-only).
 */
export function useInViewOnce(ref: RefObject<HTMLElement | null>, rootMargin = "-50px") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
}
