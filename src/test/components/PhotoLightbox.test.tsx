import { render, screen, fireEvent } from "@testing-library/react";
import PhotoLightbox from "@/components/PhotoLightbox";

const testPhotos = [
  { src: "/test1.jpg", mobileSrc: "/test1-m.jpg", alt: "Test photo 1" },
  { src: "/test2.jpg", mobileSrc: "/test2-m.jpg", alt: "Test photo 2" },
  { src: "/test3.jpg", mobileSrc: "/test3-m.jpg", alt: "Test photo 3" },
];

const defaultProps = {
  photos: testPhotos,
  swipeDirection: 0,
  onClose: vi.fn(),
  onNext: vi.fn(),
  onPrev: vi.fn(),
};

describe("PhotoLightbox", () => {
  beforeEach(() => {
    defaultProps.onClose.mockClear();
    defaultProps.onNext.mockClear();
    defaultProps.onPrev.mockClear();
  });

  it("renders nothing when selectedIndex is null", () => {
    render(<PhotoLightbox {...defaultProps} selectedIndex={null} />);
    expect(screen.queryByLabelText("Close lightbox")).not.toBeInTheDocument();
  });

  it("renders overlay with controls when selectedIndex is set", () => {
    render(<PhotoLightbox {...defaultProps} selectedIndex={0} />);
    expect(screen.getByLabelText("Close lightbox")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous photo")).toBeInTheDocument();
    expect(screen.getByLabelText("Next photo")).toBeInTheDocument();
  });

  it("renders photo with alt text", () => {
    render(<PhotoLightbox {...defaultProps} selectedIndex={1} />);
    expect(screen.getByAltText("Test photo 2")).toBeInTheDocument();
  });

  it("shows photo counter", () => {
    render(<PhotoLightbox {...defaultProps} selectedIndex={0} />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    render(<PhotoLightbox {...defaultProps} selectedIndex={0} />);
    fireEvent.click(screen.getByLabelText("Close lightbox"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onPrev when prev button clicked", () => {
    render(<PhotoLightbox {...defaultProps} selectedIndex={1} />);
    fireEvent.click(screen.getByLabelText("Previous photo"));
    expect(defaultProps.onPrev).toHaveBeenCalled();
  });

  it("calls onNext when next button clicked", () => {
    render(<PhotoLightbox {...defaultProps} selectedIndex={1} />);
    fireEvent.click(screen.getByLabelText("Next photo"));
    expect(defaultProps.onNext).toHaveBeenCalled();
  });
});
