import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Secret from "@/pages/Secret";

describe("Secret page", () => {
  it("renders Buy Bitcoin heading", () => {
    renderWithProviders(<Secret />);
    expect(screen.getByText("Buy")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  it("renders Back button", () => {
    renderWithProviders(<Secret />);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders Bitcoin tagline", () => {
    renderWithProviders(<Secret />);
    expect(screen.getByText(/best money ever created/)).toBeInTheDocument();
  });

  it("clears background color on mount", () => {
    document.documentElement.style.backgroundColor = "#F7931A";
    renderWithProviders(<Secret />);
    expect(document.documentElement.style.backgroundColor).toBe("");
  });

  it("scrolls to top on mount", () => {
    renderWithProviders(<Secret />);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
