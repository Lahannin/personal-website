import { renderHook } from "@testing-library/react";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { useRef } from "react";

describe("useInViewOnce", () => {
  it("adds 'visible' class when element intersects", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);

    renderHook(() => {
      const ref = useRef(el);
      useInViewOnce(ref);
    });

    const instances = (globalThis as any).__intersectionObserverInstances;
    expect(instances.length).toBeGreaterThan(0);

    // Trigger intersection
    const observer = instances[instances.length - 1];
    observer.trigger(true);

    expect(el.classList.contains("visible")).toBe(true);

    document.body.removeChild(el);
  });

  it("disconnects observer after first intersection", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);

    renderHook(() => {
      const ref = useRef(el);
      useInViewOnce(ref);
    });

    const instances = (globalThis as any).__intersectionObserverInstances;
    const observer = instances[instances.length - 1];
    observer.trigger(true);

    expect(observer.disconnect).toHaveBeenCalled();

    document.body.removeChild(el);
  });

  it("does not add 'visible' class when not intersecting", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);

    renderHook(() => {
      const ref = useRef(el);
      useInViewOnce(ref);
    });

    const instances = (globalThis as any).__intersectionObserverInstances;
    const observer = instances[instances.length - 1];
    observer.trigger(false);

    expect(el.classList.contains("visible")).toBe(false);

    document.body.removeChild(el);
  });
});
