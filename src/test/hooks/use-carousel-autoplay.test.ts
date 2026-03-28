import { renderHook, act } from "@testing-library/react";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";

function createMockEmblaApi() {
  return {
    scrollNext: vi.fn(),
    scrollPrev: vi.fn(),
    scrollTo: vi.fn(),
    selectedScrollSnap: vi.fn(() => 0),
    canScrollPrev: vi.fn(() => false),
    canScrollNext: vi.fn(() => true),
    on: vi.fn(),
    off: vi.fn(),
  } as any;
}

describe("useCarouselAutoplay", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns initial state without emblaApi", () => {
    const { result } = renderHook(() =>
      useCarouselAutoplay(undefined, { duration: 5000, isInView: false }),
    );
    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.canScrollPrev).toBe(false);
    expect(result.current.canScrollNext).toBe(false);
  });

  it("syncs state from emblaApi on mount", () => {
    const api = createMockEmblaApi();
    api.selectedScrollSnap.mockReturnValue(2);
    api.canScrollPrev.mockReturnValue(true);
    api.canScrollNext.mockReturnValue(false);

    const { result } = renderHook(() =>
      useCarouselAutoplay(api, { duration: 5000, isInView: false }),
    );
    expect(result.current.selectedIndex).toBe(2);
    expect(result.current.canScrollPrev).toBe(true);
    expect(result.current.canScrollNext).toBe(false);
  });

  it("scrollPrev calls emblaApi.scrollPrev", () => {
    const api = createMockEmblaApi();
    const { result } = renderHook(() =>
      useCarouselAutoplay(api, { duration: 5000, isInView: false }),
    );
    act(() => result.current.scrollPrev());
    expect(api.scrollPrev).toHaveBeenCalled();
  });

  it("scrollNext calls emblaApi.scrollNext", () => {
    const api = createMockEmblaApi();
    const { result } = renderHook(() =>
      useCarouselAutoplay(api, { duration: 5000, isInView: false }),
    );
    act(() => result.current.scrollNext());
    expect(api.scrollNext).toHaveBeenCalled();
  });

  it("scrollTo calls emblaApi.scrollTo with index", () => {
    const api = createMockEmblaApi();
    const { result } = renderHook(() =>
      useCarouselAutoplay(api, { duration: 5000, isInView: false }),
    );
    act(() => result.current.scrollTo(3));
    expect(api.scrollTo).toHaveBeenCalledWith(3);
  });

  it("does not autoplay when not in view", () => {
    const api = createMockEmblaApi();
    renderHook(() =>
      useCarouselAutoplay(api, { duration: 5000, isInView: false }),
    );
    act(() => vi.advanceTimersByTime(10000));
    // scrollNext is not called by autoplay (only by onSelect sync)
    expect(api.scrollNext).not.toHaveBeenCalled();
  });

  it("autoplays when in view after initial delay", () => {
    const api = createMockEmblaApi();
    renderHook(() =>
      useCarouselAutoplay(api, { duration: 5000, isInView: true }),
    );
    // Initial delay fires scrollNext
    act(() => vi.advanceTimersByTime(5000));
    expect(api.scrollNext).toHaveBeenCalled();
  });
});
