import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { articleEntries } from "@/data/articles";

const sorted = [...articleEntries].sort(
  (a, b) => new Date(b.date + "-01").getTime() - new Date(a.date + "-01").getTime()
);

const Articles = memo(() => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="articles" aria-labelledby="articles-heading" className="py-28 md:py-36 bg-background" data-description="Featured articles by Lauri Hänninen on Product Marketing, Analytics as Code, Headless BI, and metric standardization. Published on Medium and GoodData Blog.">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            label="WRITING"
            id="articles-heading"
            subtitle="Thoughts on product marketing, analytics, and technical topics published on Medium."
          >
            Featured <span className="text-gradient">Articles</span>
          </SectionHeader>

          {/* Articles grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {sorted.map((article, index) => (
              <m.article
                key={article.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={index >= 4 && !showAll ? "hidden md:block" : ""}
                data-description={`Article by Lauri Hänninen: ${article.title} — ${article.description}`}
              >
                <Link
                  to={`/articles/${article.slug}`}
                  className="group block bg-secondary/20 rounded-2xl overflow-hidden hover:bg-secondary/40 transition-all duration-300 hover:-translate-y-1 h-full relative"
                >
                  {/* Category accent bar */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full bg-primary dark:bg-highlight opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="p-6 pl-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {article.publication !== "Medium" && (
                            <span className="text-xs text-muted-foreground">
                              {article.publication}
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-muted-foreground ml-auto">
                            {new Date(article.date + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })} · {article.readMin} min read
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                      <m.div
                        className="flex-shrink-0 mt-1"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <ArrowRight
                          className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                          aria-hidden="true"
                        />
                      </m.div>
                    </div>
                  </div>
                </Link>
              </m.article>
            ))}
          </div>

          {!showAll && (
            <div className="md:hidden text-center mt-6">
              <button
                onClick={() => setShowAll(true)}
                className="font-mono text-xs tracking-wide text-primary hover:text-primary/80 transition-colors"
              >
                Show {sorted.length - 4} more
              </button>
            </div>
          )}

          {/* View all link */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View all articles
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  );
});

Articles.displayName = "Articles";

export default Articles;
