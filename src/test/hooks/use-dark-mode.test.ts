import { renderHook, act } from "@testing-library/react";
import { useDarkMode } from "@/hooks/use-dark-mode";

describe("useDarkMode", () => {
  it("defaults to light mode", () => {
    const { result } = renderHook(() => useDarkMode());
    // Initial useState is false, then effect syncs
    expect(result.current.isDark).toBe(false);
  });

  it("reads dark from localStorage", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("reads light from localStorage", () => {
    localStorage.setItem("theme", "light");
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(false);
  });

  it("toggle switches from light to dark", () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggle switches back from dark to light", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
