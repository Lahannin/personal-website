import { memo, useState } from "react";
import { m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Article {
  title: string;
  description: string;
  url: string;
  date: string;
  publication?: string;
  readMin: number;
}

const articles: Article[] = [
  {
    title: "Building Trezor’s Product Marketing Function from the Ground Up",
    description: "What it was like to build Trezor's product marketing function from scratch with positioning, messaging, and launch frameworks.",
    url: "https://medium.com/@lahannin/building-trezors-product-marketing-function-from-the-ground-up-441031c020ed",
    date: "2026-04",
    readMin: 8,
  },
  {
    title: "Positioning, Messaging, and Copy: What They Are and How They Work Together",
    description: "Positioning, messaging, and copy do different jobs. Here's what each one is, how they connect, and why the order matters.",
    url: "https://lahannin.medium.com/abc-of-product-marketing-positioning-messaging-and-copy-explained-2b2099b535a4",
    date: "2023-04",
    readMin: 5,
  },
  {
    title: "What Is Analytics as Code?",
    description: "Use software engineering best practices for agile, efficient, and scalable analytics processes with analytics as code.",
    url: "https://lahannin.medium.com/what-is-analytics-as-code-d321b9d42a49",
    date: "2023-08",
    publication: "GoodData Developers",
    readMin: 8,
  },
  {
    title: "Headless BI: Metric Standardization in Action",
    description: "Read how various data tools can access a headless BI platform, consume the same metrics, and achieve consistent results.",
    url: "https://lahannin.medium.com/headless-bi-metric-standardization-in-action-afb2ac7e89b6",
    date: "2022-03",
    publication: "Better Programming",
    readMin: 7,
  },
  {
    title: "Analytics as Code: Managing Analytics Solutions Like Any Other Software",
    description: "It's time to turn our analytics into an easy-to-manage, reusable piece of code while leveraging software development best practices.",
    url: "https://lahannin.medium.com/analytics-as-code-managing-analytics-solutions-like-any-other-software-504372ba6a61",
    date: "2022-02",
    publication: "GoodData Developers",
    readMin: 6,
  },
  {
    title: "Danger Zone: Inconsistent Metrics at Work",
    description: "If we can't trust our metrics, we can't trust our data. Metric standardization ensures we avoid the danger zone of inconsistent metrics.",
    url: "https://lahannin.medium.com/danger-zone-inconsistent-metrics-at-work-306f09051a4",
    date: "2022-02",
    readMin: 4,
  },
];

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
            {articles.map((article, index) => (
              <m.article
                key={article.url}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={index >= 4 && !showAll ? "hidden md:block" : ""}
                data-description={`Article by Lauri Hänninen: ${article.title} — ${article.description}`}
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
                          {article.publication && (
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
                        <p className="text-sm text-muted-foreground">
                          {article.description.length > 140
                            ? article.description.slice(0, 140) + "…"
                            : article.description}
                        </p>
                      </div>
                      <m.div
                        className="flex-shrink-0 mt-1"
                        whileHover={{ rotate: -45 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <ExternalLink 
                          className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" 
                          aria-hidden="true" 
                        />
                      </m.div>
                    </div>
                  </div>
                </a>
              </m.article>
            ))}
          </div>

          {!showAll && (
            <div className="md:hidden text-center mt-6">
              <button
                onClick={() => setShowAll(true)}
                className="font-mono text-xs tracking-wide text-primary hover:text-primary/80 transition-colors"
              >
                Show {articles.length - 4} more
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
            <a
              href="https://lahannin.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View all articles on Medium
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </m.div>
        </div>
      </div>
    </section>
  );
});

Articles.displayName = "Articles";

export default Articles;
