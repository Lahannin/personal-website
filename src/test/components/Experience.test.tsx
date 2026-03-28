import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Experience from "@/components/Experience";

describe("Experience", () => {
  it("renders section with correct id", () => {
    renderWithProviders(<Experience />);
    expect(document.getElementById("experience")).toBeInTheDocument();
  });

  it("renders section heading", () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText(/Career/i)).toBeInTheDocument();
  });

  it("renders Trezor", () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText("Trezor")).toBeInTheDocument();
  });

  it("renders GoodData", () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText("GoodData")).toBeInTheDocument();
  });

  it("renders company buttons with aria-expanded", () => {
    renderWithProviders(<Experience />);
    const buttons = screen.getAllByRole("button");
    const companyButtons = buttons.filter((b) => b.hasAttribute("aria-expanded"));
    expect(companyButtons.length).toBeGreaterThanOrEqual(1);
  });
});
