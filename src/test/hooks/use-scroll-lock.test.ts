import { renderHook } from "@testing-library/react";
import { useScrollLock } from "@/hooks/use-scroll-lock";

describe("useScrollLock", () => {
  it("locks body and html overflow when isLocked is true", () => {
    renderHook(() => useScrollLock(true));
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.touchAction).toBe("none");
  });

  it("does not lock when isLocked is false", () => {
    renderHook(() => useScrollLock(false));
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });

  it("unlocks when isLocked changes to false", () => {
    const { rerender } = renderHook(({ locked }) => useScrollLock(locked), {
      initialProps: { locked: true },
    });
    expect(document.body.style.overflow).toBe("hidden");

    rerender({ locked: false });
    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("restores overflow on unmount while locked", () => {
    const { unmount } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
  });
});
