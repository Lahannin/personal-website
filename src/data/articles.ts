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
    title: "Building Trezor's Product Marketing Function from the Ground Up",
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
