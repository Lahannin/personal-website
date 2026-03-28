import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Products from "@/components/Products";

vi.mock("embla-carousel-react", () => import("../__mocks__/embla-carousel-react"));

describe("Products", () => {
  it("renders section with correct id", () => {
    renderWithProviders(<Products />);
    expect(document.getElementById("products")).toBeInTheDocument();
  });

  it("renders heading", () => {
    renderWithProviders(<Products />);
    expect(screen.getByText(/Products/)).toBeInTheDocument();
  });
});
