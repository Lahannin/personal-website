import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Hero from "@/components/Hero";

describe("Hero", () => {
  it("renders name heading", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText(/Lauri/)).toBeInTheDocument();
    expect(screen.getByText(/Hänninen/)).toBeInTheDocument();
  });

  it("heading has correct id", () => {
    renderWithProviders(<Hero />);
    expect(document.getElementById("hero-heading")).toBeInTheDocument();
  });

  it("renders tagline", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText(/Product Marketing Lead/)).toBeInTheDocument();
  });

  it("renders profile photo with alt text", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByAltText(/Lauri Hänninen/)).toBeInTheDocument();
  });

  it("renders About Me CTA", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders Get in Touch CTA", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
  });

  it("section has aria-labelledby", () => {
    const { container } = renderWithProviders(<Hero />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "hero-heading");
  });
});
