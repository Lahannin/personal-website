import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import ArticleDetail from "@/pages/ArticleDetail";
import { articleEntries } from "@/data/articles";

const validSlug = articleEntries[0].slug;
const validArticle = articleEntries[0];

function renderArticle(slug: string) {
  return render(
    <LazyMotion features={domAnimation}>
      <MemoryRouter initialEntries={[`/articles/${slug}`]}>
        <Routes>
          <Route path="/articles/:slug" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    </LazyMotion>
  );
}

describe("ArticleDetail page", () => {
  it("renders article title for a valid slug", () => {
    renderArticle(validSlug);
    expect(screen.getByRole("heading", { level: 1, name: validArticle.title })).toBeInTheDocument();
  });

  it("renders 404 for an invalid slug", () => {
    renderArticle("nonexistent-article");
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders intro section", () => {
    renderArticle(validSlug);
    expect(screen.getByText("Why I wrote this")).toBeInTheDocument();
    expect(screen.getByText(validArticle.intro)).toBeInTheDocument();
  });

  it("renders 2026 perspective", () => {
    renderArticle(validSlug);
    expect(screen.getByText("2026 Perspective")).toBeInTheDocument();
    expect(screen.getByText(validArticle.perspective2026)).toBeInTheDocument();
  });

  it("renders CTA linking to original URL", () => {
    renderArticle(validSlug);
    const cta = screen.getByRole("link", { name: new RegExp(`Read full article on ${validArticle.publication}`) });
    expect(cta).toHaveAttribute("href", validArticle.originalUrl);
    expect(cta).toHaveAttribute("target", "_blank");
  });

  it("renders back link to /articles", () => {
    renderArticle(validSlug);
    const backLinks = screen.getAllByRole("link", { name: /articles/i }).filter(
      (l) => l.getAttribute("href") === "/articles/"
    );
    expect(backLinks.length).toBeGreaterThanOrEqual(1);
  });
});
