import { render, screen, fireEvent } from "@testing-library/react";
import CarouselNavButtons from "@/components/CarouselNavButtons";

describe("CarouselNavButtons", () => {
  const defaultProps = {
    onPrev: vi.fn(),
    onNext: vi.fn(),
    canScrollPrev: true,
    canScrollNext: true,
  };

  beforeEach(() => {
    defaultProps.onPrev.mockClear();
    defaultProps.onNext.mockClear();
  });

  it("renders prev and next buttons with default labels", () => {
    render(<CarouselNavButtons {...defaultProps} />);
    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
    expect(screen.getByLabelText("Next")).toBeInTheDocument();
  });

  it("renders custom labels", () => {
    render(<CarouselNavButtons {...defaultProps} prevLabel="Go back" nextLabel="Go forward" />);
    expect(screen.getByLabelText("Go back")).toBeInTheDocument();
    expect(screen.getByLabelText("Go forward")).toBeInTheDocument();
  });

  it("calls onPrev when prev button clicked", () => {
    render(<CarouselNavButtons {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Previous"));
    expect(defaultProps.onPrev).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when next button clicked", () => {
    render(<CarouselNavButtons {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Next"));
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  it("disables prev button when canScrollPrev is false", () => {
    render(<CarouselNavButtons {...defaultProps} canScrollPrev={false} />);
    expect(screen.getByLabelText("Previous")).toBeDisabled();
  });

  it("disables next button when canScrollNext is false", () => {
    render(<CarouselNavButtons {...defaultProps} canScrollNext={false} />);
    expect(screen.getByLabelText("Next")).toBeDisabled();
  });
});
