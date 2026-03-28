import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import LazySection from "@/components/LazySection";

describe("LazySection", () => {
  it("does not render children before intersection", () => {
    render(
      <LazySection>
        <p>Lazy content</p>
      </LazySection>,
    );
    expect(screen.queryByText("Lazy content")).not.toBeInTheDocument();
  });

  it("renders children after intersection", () => {
    render(
      <LazySection>
        <p>Lazy content</p>
      </LazySection>,
    );

    const instances = globalThis.__intersectionObserverInstances;
    const observer = instances[instances.length - 1];

    act(() => observer.trigger(true));

    expect(screen.getByText("Lazy content")).toBeInTheDocument();
  });

  it("disconnects observer after intersection", () => {
    render(
      <LazySection>
        <p>Content</p>
      </LazySection>,
    );

    const instances = globalThis.__intersectionObserverInstances;
    const observer = instances[instances.length - 1];

    act(() => observer.trigger(true));

    expect(observer.disconnect).toHaveBeenCalled();
  });

  it("applies minHeight style", () => {
    const { container } = render(
      <LazySection minHeight="500px">
        <p>Content</p>
      </LazySection>,
    );
    expect(container.firstChild).toHaveStyle({ minHeight: "500px" });
  });
});
