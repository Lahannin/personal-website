export const allSkills = [
  "Product Marketing",
  "Go-to-Market Strategy",
  "Product Positioning",
  "Messaging Frameworks",
  "Product Launches",
  "Product-Led Growth",
  "SaaS & Cloud Platforms",
  "Hardware Products",
  "Analytics & Data",
  "B2B & B2C",
  "AI/ML Applications",
  "Security & Privacy",
  "Bitcoin & Crypto",
];

export interface Certification {
  name: string;
  org: string;
  logo: string;
  invertInDark?: boolean;
}

export const certifications: Certification[] = [
  { name: "Go-to-Market Certified | Masters", org: "Product Marketing Alliance", logo: "/product-marketing-alliance-logo.avif" },
  { name: "Product Marketing Certified | Core", org: "Product Marketing Alliance", logo: "/product-marketing-alliance-logo.avif" },
  { name: "Product-Led Growth", org: "ProductLed", logo: "/productled-logo.avif" },
  { name: "B2B Messaging", org: "Wynter", logo: "/wynter-logo.avif", invertInDark: true },
  { name: "Product Management Certified", org: "Pendo", logo: "/pendo-logo.avif" },
  { name: "Product-Led Certified", org: "Pendo", logo: "/pendo-logo.avif" },
  { name: "Elements of AI", org: "University of Helsinki", logo: "/university-of-helsinki-logo.avif" },
  { name: "PRINCE2", org: "TAYLLOR & COX", logo: "/tayllorcox-logo.avif" },
];

export interface Education {
  institution: string;
  degree: string;
  field: string;
  logo: string;
  invertInDark?: boolean;
}

export const educationData: Education[] = [
  {
    institution: "University of Oulu",
    degree: "Master of Science (M.Sc.)",
    field: "Economics and Business Administration",
    logo: "/university-of-oulu-logo.jpg",
    invertInDark: true,
  },
  {
    institution: "University of Helsinki",
    degree: "Non-Degree Studies",
    field: "Computer Science",
    logo: "/university-of-helsinki-logo.avif",
  },
  {
    institution: "University of Eastern Finland",
    degree: "Non-Degree Studies",
    field: "Work and Organizational Psychology",
    logo: "/university-of-eastern-finland-logo.jpg",
  },
];
