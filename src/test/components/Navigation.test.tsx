import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Navigation from "@/components/Navigation";

describe("Navigation", () => {
  it("renders nav with aria-label", () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
  });

  it("renders all 7 nav links (desktop)", () => {
    renderWithProviders(<Navigation />);
    const labels = ["About", "Meetups", "Products", "Experience", "Skills", "Articles", "Contact"];
    for (const label of labels) {
      // Multiple links may exist (desktop + mobile), just check at least one
      const links = screen.getAllByText(label);
      expect(links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders dark mode toggle", () => {
    renderWithProviders(<Navigation />);
    const toggles = screen.getAllByLabelText(/Switch to/);
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it("renders mobile menu button", () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("mobile menu button has aria-expanded false initially", () => {
    renderWithProviders(<Navigation />);
    const menuBtn = screen.getByLabelText("Open menu");
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles mobile menu on button click", () => {
    renderWithProviders(<Navigation />);
    const menuBtn = screen.getByLabelText("Open menu");
    fireEvent.click(menuBtn);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });
});
