import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders with contentinfo role", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders footer navigation", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>);
    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
  });

  it("renders all visible nav links", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>);
    const labels = ["About", "Meetups", "Products", "Experience", "Skills", "Articles", "Contact"];
    for (const label of labels) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders llms.txt link as sr-only", () => {
    const { container } = render(<MemoryRouter><Footer /></MemoryRouter>);
    const llmsLink = container.querySelector('a[href="/llms.txt"]');
    expect(llmsLink).toBeInTheDocument();
    expect(llmsLink).toHaveClass("sr-only");
    expect(llmsLink).toHaveAttribute("aria-hidden", "true");
  });

  it("renders current year in copyright", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders tagline", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>);
    expect(screen.getByText(/honest work/)).toBeInTheDocument();
  });
});
