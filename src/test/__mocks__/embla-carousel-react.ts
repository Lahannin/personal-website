import { vi } from "vitest";
import { useRef } from "react";

const createMockEmblaApi = () => ({
  scrollNext: vi.fn(),
  scrollPrev: vi.fn(),
  scrollTo: vi.fn(),
  selectedScrollSnap: vi.fn(() => 0),
  canScrollPrev: vi.fn(() => false),
  canScrollNext: vi.fn(() => true),
  scrollSnapList: vi.fn(() => [0, 1, 2]),
  on: vi.fn(),
  off: vi.fn(),
});

export const mockEmblaApi = createMockEmblaApi();

const useEmblaCarousel = (_options?: Record<string, unknown>) => {
  const ref = useRef<HTMLDivElement>(null);
  return [ref, mockEmblaApi] as const;
};

export default useEmblaCarousel;
