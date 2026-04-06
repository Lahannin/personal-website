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

  it("renders article links pointing to internal pages", () => {
    renderWithProviders(<Articles />);
    const internalLinks = screen.getAllByRole("link").filter((l) =>
      l.getAttribute("href")?.startsWith("/articles/")
    );
    expect(internalLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'View all articles' link pointing to /articles", () => {
    renderWithProviders(<Articles />);
    const viewAll = screen.getByText(/View all articles/);
    expect(viewAll.closest("a")).toHaveAttribute("href", "/articles/");
  });
});
