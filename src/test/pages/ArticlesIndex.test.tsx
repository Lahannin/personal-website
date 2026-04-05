import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import ArticlesIndex from "@/pages/ArticlesIndex";
import { articleEntries } from "@/data/articles";

describe("ArticlesIndex page", () => {
  it("renders heading", () => {
    renderWithProviders(<ArticlesIndex />);
    expect(screen.getByRole("heading", { name: /All Articles/i })).toBeInTheDocument();
  });

  it("renders all articles", () => {
    renderWithProviders(<ArticlesIndex />);
    for (const article of articleEntries) {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    }
  });

  it("links to internal article pages, not external URLs", () => {
    renderWithProviders(<ArticlesIndex />);
    const links = screen.getAllByRole("link").filter((l) =>
      l.getAttribute("href")?.startsWith("/articles/")
    );
    expect(links.length).toBe(articleEntries.length);
  });

  it("sets document title", () => {
    renderWithProviders(<ArticlesIndex />);
    expect(document.title).toBe("Articles | Lauri Hänninen (Hanninen)");
  });

  it("renders Navigation", () => {
    renderWithProviders(<ArticlesIndex />);
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
  });
});
