import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import CarouselProgressDots from "@/components/CarouselProgressDots";

describe("CarouselProgressDots", () => {
  const defaultProps = {
    count: 5,
    selectedIndex: 0,
    progressKey: 0,
    isInView: true,
    autoplayDurationMs: 5000,
    onDotClick: vi.fn(),
    itemLabel: "slide",
  };

  beforeEach(() => defaultProps.onDotClick.mockClear());

  it("renders correct number of dots", () => {
    renderWithProviders(<CarouselProgressDots {...defaultProps} />);
    const dots = screen.getAllByRole("button");
    expect(dots).toHaveLength(5);
  });

  it("each dot has descriptive aria-label", () => {
    renderWithProviders(<CarouselProgressDots {...defaultProps} />);
    expect(screen.getByLabelText("Go to slide 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 5")).toBeInTheDocument();
  });

  it("calls onDotClick with correct index when clicked", () => {
    renderWithProviders(<CarouselProgressDots {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Go to slide 3"));
    expect(defaultProps.onDotClick).toHaveBeenCalledWith(2);
  });
});
