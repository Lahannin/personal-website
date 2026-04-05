export interface Article {
  title: string;
  description: string;
  url: string;
  date: string;
  publication?: string;
  readMin: number;
}

export interface ArticleEntry {
  slug: string;
  title: string;
  publication: string;
  date: string;
  category: "Product Marketing" | "Data" | "Hardware";
  coverImage?: string;
  intro: string;
  summary: string;
  takeaways: string[];
  perspective2026: string;
  originalUrl: string;
  tags: string[];
  description: string;
  readMin: number;
}

export const articleEntries: ArticleEntry[] = [
  {
    slug: "what-is-analytics-as-code",
    title: "What Is Analytics as Code?",
    publication: "GoodData Developers",
    date: "2023-08",
    category: "Data",
    intro:
      "I wrote this piece to distill the emerging 'as Code' movement for data teams who were still stuck in drag-and-drop BI tools. The idea that analytics pipelines deserve the same engineering rigor as application code was still controversial in 2023 — but the industry has since moved decisively in that direction.",
    summary:
      "Analytics as Code applies software engineering best practices — version control, CI/CD, code review, and modularity — to analytics workflows. Instead of clicking through a BI tool's UI, teams define dashboards, metrics, and transformations as declarative code that can be tested, versioned, and deployed like any other software artifact.",
    takeaways: [
      "Version control for analytics: track every change to dashboards and metrics in Git, enabling rollback and audit trails.",
      "CI/CD pipelines for BI: automate testing and deployment of analytics changes to catch breaking metric definitions before they reach production.",
      "Reusability over duplication: modular, code-defined metrics eliminate the copy-paste problem that causes metric drift across teams.",
    ],
    perspective2026:
      "In 2026, Analytics as Code has become the default expectation rather than the exception. With AI-assisted data engineering tools now generating SQL and transformation logic, having analytics defined as code is no longer just about engineering discipline — it's the instruction manual that LLMs need to interpret business data without hallucinating metric definitions. The companies that adopted this approach early now have a compounding advantage: their AI tools understand their data because their data is self-documenting.",
    originalUrl:
      "https://lahannin.medium.com/what-is-analytics-as-code-d321b9d42a49",
    tags: ["Analytics as Code", "DataOps", "BI Engineering"],
    description:
      "Use software engineering best practices for agile, efficient, and scalable analytics processes with analytics as code.",
    readMin: 6,
  },
  {
    slug: "abc-product-marketing",
    title:
      "ABC of Product Marketing: Positioning, Messaging, and Copy Explained",
    publication: "Medium",
    date: "2023-04",
    category: "Product Marketing",
    intro:
      "I kept seeing the terms 'positioning', 'messaging', and 'copy' used interchangeably — even by experienced marketers. This article was my attempt to create a definitive, practical guide that shows how these three layers build on each other. It remains my most-shared piece because the confusion it addresses is still everywhere.",
    summary:
      "Product marketing rests on three distinct but interconnected pillars: positioning (your market context and differentiation), messaging (the strategic narrative that communicates your value), and copy (the specific words that bring messaging to life). Most marketing failures happen when teams skip straight to copy without establishing positioning and messaging first.",
    takeaways: [
      "Positioning comes first: define who you're for, what category you compete in, and why you're different before writing a single word of copy.",
      "Messaging is the strategic bridge: it translates positioning into audience-specific value propositions that copy can then express.",
      "Copy is execution, not strategy: great copy fails without strong positioning, but strong positioning makes even average copy more effective.",
    ],
    perspective2026:
      "The rise of AI copywriting tools in 2025-2026 has made this framework more critical, not less. Teams that feed ChatGPT or Claude a brief without clear positioning get fluent but undifferentiated output. The companies winning with AI-assisted marketing are those who invested in rigorous positioning and messaging frameworks first — giving AI the strategic constraints it needs to produce copy that actually differentiates. The ABC hierarchy isn't threatened by AI; it's the missing input that explains why most AI-generated marketing sounds the same.",
    originalUrl:
      "https://lahannin.medium.com/abc-of-product-marketing-positioning-messaging-and-copy-explained-2b2099b535a4",
    tags: ["Product Marketing", "Positioning", "Messaging"],
    description:
      "Looking to deep dive into product marketing but finding the concepts of positioning, messaging, and copy confusing? Look no further!",
    readMin: 8,
  },
  {
    slug: "headless-bi-metric-standardization",
    title: "Headless BI: Metric Standardization in Action",
    publication: "Better Programming",
    date: "2022-03",
    category: "Data",
    intro:
      "This was the practical follow-up to the theoretical case for headless BI. I wanted to show, with concrete examples, how decoupling the metric layer from visualization tools solves the 'same question, different answers' problem that plagues every data-driven organization. Better Programming gave it a wide technical audience.",
    summary:
      "Headless BI separates metric definitions from presentation tools, creating a single source of truth that any downstream consumer — dashboards, notebooks, embedded analytics, or APIs — can query consistently. This article demonstrates how multiple data tools accessing a shared headless BI platform produce identical results, eliminating the metric inconsistency that erodes trust in data.",
    takeaways: [
      "One metric, many consumers: define metrics once in a semantic layer and serve them to any visualization tool without re-implementing business logic.",
      "Consistency builds trust: when every team sees the same numbers regardless of their tool of choice, data-driven decision-making actually works.",
      "The metric layer is infrastructure: treat it like an API contract — versioned, documented, and tested — not a feature of your BI tool.",
    ],
    perspective2026:
      "The headless BI thesis has been vindicated by 2026. The semantic/metric layer has become a standard component of the modern data stack, with tools like dbt Metrics, Cube, and Google's Looker modeling layer all converging on this pattern. What's new is that AI agents are now the fastest-growing 'consumer' of headless BI — they query metric APIs directly instead of scraping dashboards, making standardized metric definitions essential infrastructure for enterprise AI adoption.",
    originalUrl:
      "https://lahannin.medium.com/headless-bi-metric-standardization-in-action-afb2ac7e89b6",
    tags: ["Headless BI", "Metrics", "Data Architecture"],
    description:
      "Read how various data tools can access a headless BI platform, consume the same metrics, and achieve consistent results.",
    readMin: 7,
  },
  {
    slug: "analytics-as-code",
    title:
      "Analytics as Code: Managing Analytics Solutions Like Any Other Software",
    publication: "GoodData Developers",
    date: "2022-02",
    category: "Data",
    intro:
      "I wrote this piece for GoodData to bridge the gap between DevOps and Data Analytics. At the time, the concept of treating analytics artifacts as manageable code was still emerging. Since publishing, 'Data as Code' has exploded, but the fundamental principles — versioning, CI/CD, and reusability — remain the core of any scalable data stack.",
    summary:
      "Traditionally, analytics has been a manual, 'drag-and-drop' process trapped within vendor platforms. This article explores how treating analytics objects — dashboards, metrics, visualizations — as manageable code transforms the data stack from fragile and manual to robust and automated, using the same engineering practices that revolutionized software development.",
    takeaways: [
      "Version control for data: applying Git-like workflows to visualizations and metric definitions enables collaboration, rollback, and audit trails.",
      "CI/CD for analytics: automating the deployment of analytics changes to production environments catches errors early and reduces manual toil.",
      "Modular architecture: platform-agnostic, code-defined analytics are portable and reusable, freeing teams from vendor lock-in.",
    ],
    perspective2026:
      "In the era of AI-driven data engineering, 'Analytics as Code' has become the instruction manual that LLMs need to interpret data without hallucinating business logic. The organizations that adopted code-defined analytics early now find their AI copilots are dramatically more accurate — because the analytics logic is explicit, version-controlled, and machine-readable rather than hidden behind GUI configurations that only humans can navigate.",
    originalUrl:
      "https://lahannin.medium.com/analytics-as-code-managing-analytics-solutions-like-any-other-software-504372ba6a61",
    tags: ["DataOps", "Analytics", "DevOps"],
    description:
      "It's time to turn our analytics into an easy-to-manage, reusable piece of code while leveraging software development best practices.",
    readMin: 5,
  },
  {
    slug: "danger-zone-inconsistent-metrics",
    title: "Danger Zone: Inconsistent Metrics at Work",
    publication: "Medium",
    date: "2022-02",
    category: "Data",
    intro:
      "This was a short, punchy piece born from frustration. I'd seen too many meetings derailed by people arguing over numbers that should have been identical. The 'danger zone' framing was deliberate — inconsistent metrics aren't just an inconvenience, they're a threat to organizational decision-making that compounds over time.",
    summary:
      "When the same metric produces different numbers depending on who queries it, which tool they use, or which dashboard they check, organizations enter a 'danger zone' where data-driven decisions become impossible. This article examines the root causes of metric inconsistency — duplicated logic, undocumented calculations, and siloed tooling — and makes the case for metric standardization as critical infrastructure.",
    takeaways: [
      "Inconsistent metrics erode trust: once stakeholders see different numbers for the same question, they stop trusting data entirely and revert to gut decisions.",
      "The root cause is duplication: every time a metric is re-implemented in a new tool or query, it creates an opportunity for divergence.",
      "Standardization is a prerequisite: before investing in better dashboards or more data tools, establish a single source of truth for metric definitions.",
    ],
    perspective2026:
      "Four years later, the 'danger zone' I described has only gotten more dangerous with the proliferation of AI-generated analyses. When an LLM generates a SQL query to answer a business question, it can easily produce a plausible but wrong metric calculation if there's no authoritative metric layer to reference. The companies that standardized their metrics are now the ones whose AI tools produce trustworthy answers — the rest are in a new danger zone where AI confidently presents inconsistent numbers at machine speed.",
    originalUrl:
      "https://lahannin.medium.com/danger-zone-inconsistent-metrics-at-work-306f09051a4",
    tags: ["Metrics", "Data Quality", "Decision Making"],
    description:
      "If we can't trust our metrics, we can't trust our data. Metric standardization ensures we avoid the danger zone of inconsistent metrics.",
    readMin: 4,
  },
  {
    slug: "headless-bi-data-lakehouse",
    title: "Headless BI x Data Lakehouse",
    publication: "GoodData Developers",
    date: "2022-01",
    category: "Data",
    intro:
      "This was my earliest published piece on headless BI, written when the data lakehouse architecture was gaining momentum. I wanted to explore what happens when you combine the decoupled analytics layer (headless BI) with the unified storage layer (data lakehouse) — the result is a stack that's both flexible and consistent, which was a rare combination at the time.",
    summary:
      "The data lakehouse combines the flexibility of data lakes with the structure of data warehouses. Headless BI adds a decoupled semantic layer on top, enabling consistent metrics across any consumption tool. Together, they replace cumbersome ETL pipelines and tightly-coupled BI platforms with a modern, modular architecture where storage, computation, and presentation are independent layers.",
    takeaways: [
      "Decoupled layers beat monolithic stacks: separating storage (lakehouse), semantics (headless BI), and presentation (any tool) creates flexibility without sacrificing consistency.",
      "The lakehouse eliminates data duplication: no more copying data between lakes and warehouses, reducing cost and complexity.",
      "Headless BI completes the picture: a lakehouse without a semantic layer still leaves metric definitions scattered across tools — headless BI provides the missing 'meaning' layer.",
    ],
    perspective2026:
      "The lakehouse + headless BI architecture I described in 2022 has essentially become the reference architecture for modern data platforms in 2026. Databricks, Snowflake, and Google BigQuery have all moved toward this pattern. The unexpected development is that this architecture also turned out to be ideal for AI/ML workloads — the unified storage layer feeds training pipelines while the semantic layer provides the business context that makes AI outputs interpretable. What was a forward-looking combination in 2022 is now table stakes.",
    originalUrl:
      "https://lahannin.medium.com/headless-bi-x-data-lakehouse-ce7388ba5159",
    tags: ["Headless BI", "Data Lakehouse", "Architecture"],
    description:
      "Replace cumbersome data pipelines and decouple analytics from the presentation layer to provide consistent metrics to all data consumers.",
    readMin: 6,
  },
];

export const articles: Article[] = articleEntries.map((e) => ({
  title: e.title,
  description: e.description,
  url: e.originalUrl,
  date: e.date,
  publication: e.publication === "Medium" ? undefined : e.publication,
  readMin: e.readMin,
}));

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return articleEntries.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articleEntries.map((a) => a.slug);
}
