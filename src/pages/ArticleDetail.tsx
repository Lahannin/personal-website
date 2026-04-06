import { useParams, Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Lightbulb, BookOpen, List } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleHead from "@/components/ArticleHead";
import { getArticleBySlug, getAdjacentArticles } from "@/data/articles";

const ease = [0.22, 0.61, 0.36, 1] as const;

const CategoryColors: Record<string, string> = {
  "Product Marketing": "bg-highlight/15 text-highlight",
  Data: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Hardware: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-6">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="text-center max-w-md"
          >
            <h1 className="text-[6rem] font-bold leading-none text-gradient">
              404
            </h1>
            <p className="text-lg text-muted-foreground mt-2 mb-8">
              This article doesn't exist.
            </p>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to articles
            </Link>
          </m.div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(article.date + "-01").toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );

  const { prev, next } = getAdjacentArticles(article.slug);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <ArticleHead article={article} />

      <main className="flex-1 pt-28 md:pt-36 pb-20 md:pb-28">
        <article className="container px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <m.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <Link
                to="/articles"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                All articles
              </Link>
            </m.div>

            {/* Cover image */}
            {article.coverImage && (
              <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="mb-8 rounded-2xl overflow-hidden"
              >
                <img
                  src={article.coverImage}
                  alt={`${article.title} cover by Lauri Hänninen (Lauri Hanninen)`}
                  className="w-full h-auto"
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                />
              </m.div>
            )}

            {/* Header */}
            <m.header
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease }}
            >
              {/* Category + metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`font-mono text-[11px] font-medium px-2.5 py-1 rounded-full ${CategoryColors[article.category] ?? "bg-secondary text-secondary-foreground"}`}
                >
                  {article.category}
                </span>
                <a
                  href="/#about"
                  rel="author"
                  className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lauri Hänninen
                </a>
                <span className="text-border">·</span>
                <time
                  dateTime={article.date + "-01"}
                  className="font-mono text-xs text-muted-foreground"
                >
                  {formattedDate}
                </time>
                <span className="text-border">·</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {article.publication}
                </span>
                <span className="text-border">·</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {article.readMin} min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight text-foreground mb-4">
                {article.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </m.header>

            {/* Intro — "Why I wrote this" */}
            <m.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="mb-10"
              aria-labelledby="intro-heading"
            >
              <div className="border-l-2 border-highlight/40 pl-5 py-1">
                <h2
                  id="intro-heading"
                  className="font-mono text-xs text-highlight font-medium tracking-wide uppercase mb-3"
                >
                  Why I wrote this
                </h2>
                <p className="text-muted-foreground leading-relaxed italic">
                  {article.intro}
                </p>
              </div>
            </m.section>

            {/* Summary */}
            <m.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease }}
              className="mb-10"
              aria-labelledby="summary-heading"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                <h2
                  id="summary-heading"
                  className="text-lg font-semibold text-foreground"
                >
                  Summary
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            </m.section>

            {/* Key Takeaways */}
            <m.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease }}
              className="mb-10"
              aria-labelledby="takeaways-heading"
            >
              <div className="flex items-center gap-2 mb-3">
                <List className="w-4 h-4 text-primary" aria-hidden="true" />
                <h2
                  id="takeaways-heading"
                  className="text-lg font-semibold text-foreground"
                >
                  Key Takeaways
                </h2>
              </div>
              <ul className="space-y-3">
                {article.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="font-mono text-xs text-highlight font-medium mt-1.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </m.section>

            {/* 2026 Perspective */}
            <m.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease }}
              className="mb-12"
              aria-labelledby="perspective-heading"
            >
              <div className="bg-secondary/30 rounded-2xl p-6 md:p-8 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb
                    className="w-5 h-5 text-highlight"
                    aria-hidden="true"
                  />
                  <h2
                    id="perspective-heading"
                    className="text-lg font-semibold text-foreground"
                  >
                    2026 Perspective
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {article.perspective2026}
                </p>
              </div>
            </m.section>

            {/* Prev / Next article navigation */}
            {(prev || next) && (
              <m.nav
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28, ease }}
                aria-label="Article navigation"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 pt-8 border-t border-border/50"
              >
                {prev ? (
                  <Link
                    to={`/articles/${prev.slug}`}
                    rel="prev"
                    className="group block bg-secondary/20 hover:bg-secondary/40 rounded-2xl p-5 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
                      <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                      Previous
                    </div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <div aria-hidden="true" />
                )}
                {next ? (
                  <Link
                    to={`/articles/${next.slug}`}
                    rel="next"
                    className="group block bg-secondary/20 hover:bg-secondary/40 rounded-2xl p-5 transition-colors sm:text-right"
                  >
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground mb-2 sm:justify-end">
                      Next
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <div aria-hidden="true" />
                )}
              </m.nav>
            )}

            {/* CTA */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Read full article on {article.publication}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                to="/articles"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse all articles
              </Link>
            </m.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
