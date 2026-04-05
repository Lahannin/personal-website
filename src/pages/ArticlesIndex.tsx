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
  (a, b) => new Date(b.date + "-01").getTime() - new Date(a.date + "-01").getTime()
);

const ArticlesIndex = () => {
  useEffect(() => {
    document.title = "Articles | Lauri Hänninen (Hanninen)";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              label="WRITING"
              id="articles-heading"
              subtitle="Thoughts on product marketing, analytics, and technical topics — with unique 2026 perspectives."
            >
              All <span className="text-gradient">Articles</span>
            </SectionHeader>

            <div className="space-y-4">
              {sorted.map((article, index) => {
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
                      delay: index * 0.05,
                      ease,
                    }}
                  >
                    <Link
                      to={`/articles/${article.slug}`}
                      className="group block bg-secondary/20 rounded-2xl overflow-hidden hover:bg-secondary/40 transition-all duration-300 hover:-translate-y-0.5 relative"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary dark:bg-highlight opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="p-6 pl-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span
                                className={`font-mono text-[10px] font-medium px-2 py-0.5 rounded-full ${CategoryColors[article.category] ?? "bg-secondary text-secondary-foreground"}`}
                              >
                                {article.category}
                              </span>
                              {article.publication !== "Medium" && (
                                <span className="text-xs text-muted-foreground">
                                  {article.publication}
                                </span>
                              )}
                              <span className="font-mono text-[10px] text-muted-foreground ml-auto">
                                {formattedDate} · {article.readMin} min read
                              </span>
                            </div>
                            <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                              {article.title}
                            </h2>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {article.description}
                            </p>
                          </div>
                          <ArrowRight
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                            aria-hidden="true"
                          />
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
