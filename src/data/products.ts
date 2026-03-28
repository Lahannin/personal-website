export interface Product {
  name: string;
  description: string;
  url?: string;
  logo?: string;
  category: "software" | "hardware" | "services";
  badge?: string;
}

export const products: Product[] = [
  {
    name: "GoodData Cloud Platform",
    description: "A fully managed, API-first analytics platform combining BI, AI, and Analytics Lake. Enables businesses to build custom data applications with AI-assisted analytics.",
    url: "https://www.gooddata.com/",
    logo: "/gooddata-logo.webp",
    category: "software",
  },
  {
    name: "GoodData Cloud Native",
    description: "Self-hosted version of GoodData Cloud. Scalable microservices architecture deployable in containers alongside data in public/private cloud or on-premises.",
    url: "https://www.gooddata.com/",
    logo: "/gooddata-logo.webp",
    category: "software",
  },
  {
    name: "Trezor Safe 7",
    description: "The world's first hardware wallet with auditable secure element and quantum-ready architecture, built to redefine how users protect their crypto.",
    url: "https://trezor.io/trezor-safe-7",
    logo: "/trezor-logo.webp",
    category: "hardware",
  },
  {
    name: "Trezor Safe 5",
    description: "Hardware wallet with an intuitive touchscreen, haptic feedback, and vibrant colors, designed to make everyday crypto management simple and secure.",
    url: "https://trezor.io/trezor-safe-5",
    logo: "/trezor-logo.webp",
    category: "hardware",
  },
  {
    name: "Trezor Safe 5 Freedom Edition",
    description: "Limited Edition with 2,100 individually serialized units, created for those who value freedom, independence, and true ownership.",
    url: "https://satoshilabs.com/news/trezor-launches-limited-freedom-edition-wallet-as-part-of-its-financial-sovereignty-campaign",
    logo: "/trezor-logo.webp",
    category: "hardware",
  },
  {
    name: "Trezor Expert Onboarding",
    description: "Personalized, one-on-one onboarding that gives users expert guidance and confidence setting up their crypto hardware wallets.",
    url: "https://trezor.io/trezor-expert-session",
    logo: "/trezor-logo.webp",
    category: "services",
  },
  {
    name: "Trezor Expert Consultation",
    description: "Premium one-on-one support to help customers navigate Trezor, learn every feature, and manage their crypto securely.",
    url: "https://trezor.io/trezor-expert-consultation",
    logo: "/trezor-logo.webp",
    category: "services",
  },
];
