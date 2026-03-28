import { renderHook } from "@testing-library/react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useRef } from "react";

function setupContainer() {
  const container = document.createElement("div");
  const btn1 = document.createElement("button");
  btn1.textContent = "First";
  const btn2 = document.createElement("button");
  btn2.textContent = "Second";
  const btn3 = document.createElement("button");
  btn3.textContent = "Third";
  container.append(btn1, btn2, btn3);
  document.body.appendChild(container);
  return { container, btn1, btn2, btn3 };
}

describe("useFocusTrap", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("focuses first focusable element when activated", () => {
    const { container, btn1 } = setupContainer();

    renderHook(() => {
      const ref = useRef(container);
      useFocusTrap(ref, true);
    });

    expect(document.activeElement).toBe(btn1);
  });

  it("does nothing when inactive", () => {
    const { container } = setupContainer();
    const focusBefore = document.activeElement;

    renderHook(() => {
      const ref = useRef(container);
      useFocusTrap(ref, false);
    });

    expect(document.activeElement).toBe(focusBefore);
  });

  it("restores focus on deactivation", () => {
    const { container } = setupContainer();
    const externalButton = document.createElement("button");
    externalButton.textContent = "External";
    document.body.appendChild(externalButton);
    externalButton.focus();

    const { unmount } = renderHook(() => {
      const ref = useRef(container);
      useFocusTrap(ref, true);
    });

    unmount();
    expect(document.activeElement).toBe(externalButton);
  });
});
