export interface Article {
  title: string;
  description: string;
  url: string;
  date: string;
  publication?: string;
  readMin: number;
}

export const articles: Article[] = [
  {
    title: "Building Product Marketing from Scratch at Trezor",
    description: "I joined Trezor as their first product marketer. No positioning, no messaging, no process. Here's what I did in year one.",
    url: "https://lahannin.medium.com/building-product-marketing-from-scratch-at-trezor-0a7a8e190b96",
    date: "2026-04",
    readMin: 7,
  },
  {
    title: "ABC of Product Marketing: Positioning, Messaging, and Copy Explained",
    description: "Looking to deep dive into product marketing but finding the concepts of positioning, messaging, and copy confusing? Look no further!",
    url: "https://lahannin.medium.com/abc-of-product-marketing-positioning-messaging-and-copy-explained-2b2099b535a4",
    date: "2023-04",
    readMin: 8,
  },
  {
    title: "What Is Analytics as Code?",
    description: "Use software engineering best practices for agile, efficient, and scalable analytics processes with analytics as code.",
    url: "https://lahannin.medium.com/what-is-analytics-as-code-d321b9d42a49",
    date: "2023-08",
    publication: "GoodData Developers",
    readMin: 6,
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
    readMin: 5,
  },
  {
    title: "Danger Zone: Inconsistent Metrics at Work",
    description: "If we can't trust our metrics, we can't trust our data. Metric standardization ensures we avoid the danger zone of inconsistent metrics.",
    url: "https://lahannin.medium.com/danger-zone-inconsistent-metrics-at-work-306f09051a4",
    date: "2022-02",
    readMin: 4,
  },
  {
    title: "Headless BI x Data Lakehouse",
    description: "Replace cumbersome data pipelines and decouple analytics from the presentation layer to provide consistent metrics to all data consumers.",
    url: "https://lahannin.medium.com/headless-bi-x-data-lakehouse-ce7388ba5159",
    date: "2022-01",
    publication: "GoodData Developers",
    readMin: 6,
  },
];
