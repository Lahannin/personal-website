import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import About from "@/components/About";

describe("About", () => {
  it("renders section with correct id", () => {
    renderWithProviders(<About />);
    expect(document.getElementById("about")).toBeInTheDocument();
  });

  it("renders section heading", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/that are hard to describe/)).toBeInTheDocument();
  });

  it("renders all 3 highlight cards", () => {
    renderWithProviders(<About />);
    expect(screen.getByText("10+ years in tech")).toBeInTheDocument();
    expect(screen.getByText("Founding Product Marketer")).toBeInTheDocument();
    expect(screen.getByText("PMM community builder")).toBeInTheDocument();
  });

  it("renders highlight descriptions", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/B2B SaaS, B2C hardware/)).toBeInTheDocument();
    expect(screen.getByText(/Product Marketing function from 0/)).toBeInTheDocument();
    expect(screen.getByText(/Product Marketing Alliance chapter/)).toBeInTheDocument();
  });

  it("renders bio text", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/products that are difficult to explain/)).toBeInTheDocument();
    expect(screen.getByText(/open-source code is how we take back control/)).toBeInTheDocument();
  });

  it("does not render any lucide-react icons in highlight cards", () => {
    const { container } = renderWithProviders(<About />);
    // Lucide icons render as SVGs inside the icon container div.
    // The old icon container had class "w-12 h-12". It should not exist.
    const iconContainers = container.querySelectorAll(".w-12.h-12.rounded-lg");
    expect(iconContainers).toHaveLength(0);
  });
});
