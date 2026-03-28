import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Contact from "@/components/Contact";

describe("Contact", () => {
  it("renders section with correct id", () => {
    renderWithProviders(<Contact />);
    expect(document.getElementById("contact")).toBeInTheDocument();
  });

  it("renders heading", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole("heading", { name: /talk/i })).toBeInTheDocument();
  });

  it("renders all 3 contact links", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Twitter/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Telegram/i })).toBeInTheDocument();
  });

  it("contact links have correct hrefs", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute("href", "https://www.linkedin.com/in/laurihanninen");
    expect(screen.getByRole("link", { name: /Twitter/i })).toHaveAttribute("href", "https://x.com/lahannin");
    expect(screen.getByRole("link", { name: /Telegram/i })).toHaveAttribute("href", "https://t.me/lahannin");
  });

  it("contact links open in new tab", () => {
    renderWithProviders(<Contact />);
    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
