import { renderHook, act } from "@testing-library/react";
import { useLightbox } from "@/hooks/use-lightbox";

describe("useLightbox", () => {
  it("starts with no photo selected", () => {
    const { result } = renderHook(() => useLightbox(5));
    expect(result.current.selectedPhoto).toBeNull();
  });

  it("opens to a specific index", () => {
    const { result } = renderHook(() => useLightbox(5));
    act(() => result.current.open(2));
    expect(result.current.selectedPhoto).toBe(2);
  });

  it("closes the lightbox", () => {
    const { result } = renderHook(() => useLightbox(5));
    act(() => result.current.open(2));
    act(() => result.current.close());
    expect(result.current.selectedPhoto).toBeNull();
  });

  it("navigates to next photo with wrapping", () => {
    const { result } = renderHook(() => useLightbox(3));
    act(() => result.current.open(2));
    act(() => result.current.goNext());
    expect(result.current.selectedPhoto).toBe(0); // wraps
    expect(result.current.swipeDirection).toBe(1);
  });

  it("navigates to previous photo with wrapping", () => {
    const { result } = renderHook(() => useLightbox(3));
    act(() => result.current.open(0));
    act(() => result.current.goPrev());
    expect(result.current.selectedPhoto).toBe(2); // wraps
    expect(result.current.swipeDirection).toBe(-1);
  });

  it("responds to ArrowRight keyboard event", () => {
    const { result } = renderHook(() => useLightbox(5));
    act(() => result.current.open(0));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
    expect(result.current.selectedPhoto).toBe(1);
  });

  it("responds to ArrowLeft keyboard event", () => {
    const { result } = renderHook(() => useLightbox(5));
    act(() => result.current.open(2));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    });
    expect(result.current.selectedPhoto).toBe(1);
  });

  it("responds to Escape keyboard event", () => {
    const { result } = renderHook(() => useLightbox(5));
    act(() => result.current.open(2));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(result.current.selectedPhoto).toBeNull();
  });

  it("does not add keyboard listener when closed", () => {
    const { result } = renderHook(() => useLightbox(5));
    // selectedPhoto is null, so no listener

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
    expect(result.current.selectedPhoto).toBeNull();
  });
});
