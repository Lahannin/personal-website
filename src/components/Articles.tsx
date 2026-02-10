import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Article {
  title: string;
  description: string;
  url: string;
  date: string;
  publication?: string;
}

const articles: Article[] = [
  {
    title: "ABC of Product Marketing: Positioning, Messaging, and Copy Explained",
    description: "Looking to deep dive into product marketing but finding the concepts of positioning, messaging, and copy confusing? Look no further!",
    url: "https://lahannin.medium.com/abc-of-product-marketing-positioning-messaging-and-copy-explained-2b2099b535a4",
    date: "Apr 2023",
  },
  {
    title: "What Is Analytics as Code?",
    description: "Use software engineering best practices for agile, efficient, and scalable analytics processes with analytics as code.",
    url: "https://lahannin.medium.com/what-is-analytics-as-code-d321b9d42a49",
    date: "Aug 2023",
    publication: "GoodData Developers",
  },
  {
    title: "Headless BI: Metric Standardization in Action",
    description: "Read how various data tools can access a headless BI platform, consume the same metrics, and achieve consistent results.",
    url: "https://lahannin.medium.com/headless-bi-metric-standardization-in-action-afb2ac7e89b6",
    date: "Mar 2022",
    publication: "Better Programming",
  },
  {
    title: "Analytics as Code: Managing Analytics Solutions Like Any Other Software",
    description: "It's time to turn our analytics into an easy-to-manage, reusable piece of code while leveraging software development best practices.",
    url: "https://lahannin.medium.com/analytics-as-code-managing-analytics-solutions-like-any-other-software-504372ba6a61",
    date: "Feb 2022",
    publication: "GoodData Developers",
  },
  {
    title: "Danger Zone: Inconsistent Metrics at Work",
    description: "If we can't trust our metrics, we can't trust our data. Metric standardization ensures we avoid the danger zone of inconsistent metrics.",
    url: "https://lahannin.medium.com/danger-zone-inconsistent-metrics-at-work-306f09051a4",
    date: "Feb 2022",
  },
  {
    title: "Headless BI x Data Lakehouse",
    description: "Replace cumbersome data pipelines and decouple analytics from the presentation layer to provide consistent metrics to all data consumers.",
    url: "https://lahannin.medium.com/headless-bi-x-data-lakehouse-ce7388ba5159",
    date: "Jan 2022",
    publication: "GoodData Developers",
  },
];

const Articles = () => {
  return (
    <section id="articles" aria-labelledby="articles-heading" className="py-28 md:py-36 bg-background">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">WRITING</span>
            <h2 id="articles-heading" className="text-3xl md:text-5xl font-bold mt-4">
              Featured <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Thoughts on product marketing, analytics, and technical topics published on Medium.
            </p>
          </motion.div>

          {/* Articles grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5, scale: 1.01 }}
                data-description={`Article by Lauri Hänninen: ${article.title} — ${article.description}`}
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block card-gradient border border-border rounded-xl p-6 shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <time className="mono text-xs text-primary bg-primary/10 px-2 py-1 rounded" dateTime={article.date}>
                          {article.date}
                        </time>
                        {article.publication && (
                          <span className="text-xs text-muted-foreground">
                            {article.publication}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                    <motion.div
                      className="flex-shrink-0 mt-1"
                      whileHover={{ rotate: -45 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ExternalLink 
                        className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" 
                        aria-hidden="true" 
                      />
                    </motion.div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>

          {/* View all link */}
          <motion.div
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
