import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Articles from "@/components/Articles";

describe("Articles", () => {
  it("renders section with correct id", () => {
    renderWithProviders(<Articles />);
    expect(document.getElementById("articles")).toBeInTheDocument();
  });

  it("renders heading", () => {
    renderWithProviders(<Articles />);
    expect(screen.getByRole("heading", { name: /Featured Articles/i })).toBeInTheDocument();
  });

  it("renders article links", () => {
    renderWithProviders(<Articles />);
    const links = screen.getAllByRole("link");
    // At least the articles + "View all" link
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it("renders 'View all articles on Medium' link", () => {
    renderWithProviders(<Articles />);
    expect(screen.getByText(/View all articles on Medium/)).toBeInTheDocument();
  });

  it("article links open in new tab", () => {
    renderWithProviders(<Articles />);
    const mediumLink = screen.getByText(/View all articles on Medium/).closest("a");
    expect(mediumLink).toHaveAttribute("target", "_blank");
    expect(mediumLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
