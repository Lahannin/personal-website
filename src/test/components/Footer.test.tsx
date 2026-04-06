import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/Footer";

const renderFooter = () => render(<MemoryRouter><Footer /></MemoryRouter>);

describe("Footer", () => {
  it("renders with contentinfo role", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders footer navigation", () => {
    renderFooter();
    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
  });

  it("renders all visible nav links", () => {
    renderFooter();
    const labels = ["About", "Meetups", "Products", "Experience", "Skills", "Articles", "Contact"];
    for (const label of labels) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders llms.txt link as sr-only", () => {
    const { container } = renderFooter();
    const llmsLink = container.querySelector('a[href="/llms.txt"]');
    expect(llmsLink).toBeInTheDocument();
    expect(llmsLink).toHaveClass("sr-only");
    expect(llmsLink).toHaveAttribute("aria-hidden", "true");
  });

  it("renders current year in copyright", () => {
    renderFooter();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders tagline", () => {
    renderFooter();
    expect(screen.getByText(/honest work/)).toBeInTheDocument();
  });
});
