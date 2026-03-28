import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders with contentinfo role", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders footer navigation", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
  });

  it("renders all visible nav links", () => {
    render(<Footer />);
    const labels = ["About", "Meetups", "Products", "Experience", "Skills", "Articles", "Contact"];
    for (const label of labels) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders llms.txt link as sr-only", () => {
    const { container } = render(<Footer />);
    const llmsLink = container.querySelector('a[href="/llms.txt"]');
    expect(llmsLink).toBeInTheDocument();
    expect(llmsLink).toHaveClass("sr-only");
    expect(llmsLink).toHaveAttribute("aria-hidden", "true");
  });

  it("renders current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/honest work/)).toBeInTheDocument();
  });
});
