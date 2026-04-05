import { useEffect } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { articleEntries } from "@/data/articles";

const ease = [0.22, 0.61, 0.36, 1] as const;

const CategoryColors: Record<string, string> = {
  "Product Marketing": "bg-highlight/15 text-highlight",
  Data: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Hardware: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
};

const sorted = [...articleEntries].sort(
  (a, b) =>
    new Date(b.date + "-01").getTime() - new Date(a.date + "-01").getTime()
);

const ArticlesIndex = () => {
  useEffect(() => {
    document.title = "Articles | Lauri Hänninen (Hanninen)";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "Professional articles by Lauri Hänninen on product marketing, analytics as code, headless BI, and data architecture.";
    document.head.appendChild(meta);

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = "https://laurihanninen.com/articles";
    document.head.appendChild(canonical);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(canonical);
    };
  }, []);

  const featured = sorted[0];
  const rest = sorted.slice(1);

  const featuredDate = new Date(featured.date + "-01").toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              label="WRITING"
              id="articles-heading"
              subtitle="Every article includes a summary, key takeaways, and a 2026 perspective on how the ideas have held up."
            >
              All <span className="text-gradient">Articles</span>
            </SectionHeader>

            {/* Featured article — full width */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mb-8"
            >
              <Link
                to={`/articles/${featured.slug}`}
                className="group block bg-secondary/20 rounded-2xl overflow-hidden hover:bg-secondary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="md:flex">
                  {featured.coverImage && (
                    <div className="md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img
                        src={featured.coverImage}
                        alt={`${featured.title} cover`}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        loading="eager"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`font-mono text-[10px] font-medium px-2 py-0.5 rounded-full ${CategoryColors[featured.category] ?? "bg-secondary text-secondary-foreground"}`}
                      >
                        {featured.category}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {featuredDate} · {featured.readMin} min read
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {featured.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </m.div>

            {/* Remaining articles — 2-column grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map((article, index) => {
                const formattedDate = new Date(
                  article.date + "-01"
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });

                return (
                  <m.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 + index * 0.05,
                      ease,
                    }}
                  >
                    <Link
                      to={`/articles/${article.slug}`}
                      className="group block bg-secondary/20 rounded-2xl overflow-hidden hover:bg-secondary/40 transition-all duration-300 hover:-translate-y-1 h-full"
                    >
                      {article.coverImage && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={article.coverImage}
                            alt={`${article.title} cover`}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`font-mono text-[10px] font-medium px-2 py-0.5 rounded-full ${CategoryColors[article.category] ?? "bg-secondary text-secondary-foreground"}`}
                          >
                            {article.category}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {formattedDate} · {article.readMin} min
                          </span>
                        </div>
                        <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {article.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[9px] text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </m.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlesIndex;
