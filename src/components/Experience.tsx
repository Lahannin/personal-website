import { motion } from "framer-motion";

interface Role {
  title: string;
  period: string;
  description: string;
  highlights: string[];
  current?: boolean;
}

interface Company {
  name: string;
  location: string;
  description?: string;
  logo: string;
  roles: Role[];
}

const companies: Company[] = [
  {
    name: "Trezor Company",
    location: "Prague, Czechia",
    description:
      "The original hardware wallet company. Pioneering secure, open-source self-custody for Bitcoin and crypto since 2014.",
    logo: "https://i.ibb.co/k6c7pGgx/trezor-logo.jpg",
    roles: [
      {
        title: "Product Marketing Lead",
        period: "07/2024 – Present",
        description:
          "Lead product marketing initiatives including go-to-market strategy, positioning, messaging, and global launches.",
        highlights: [
          "Build and scale a team covering product marketing, technical writing, and copywriting",
          "Partner cross-functionally with Marketing, Product, Design, and Research teams",
          "Identify customer segments and growth opportunities through market and competitive insights",
        ],
        current: true,
      },
      {
        title: "Senior Product Marketing Manager",
        period: "09/2023 – 06/2024",
        description: "Founded the product marketing function as the first Product Marketer.",
        highlights: [
          "Built positioning, messaging, and go-to-market frameworks",
          "Led global launches including two Tier 1 hardware and software launches",
        ],
      },
    ],
  },
  {
    name: "Product Marketing Alliance",
    location: "Prague, Czechia",
    description:
      "The world's largest product marketing community, empowering PMMs through certifications, resources, and events.",
    logo: "https://i.ibb.co/bjq1Hx0P/product-marketing-alliance-logo.jpg",
    roles: [
      {
        title: "Chapter Lead",
        period: "11/2023 – Present",
        description: "Founded the first PMA chapter in the Czech Republic.",
        highlights: ["Built and grew a local product marketing community"],
        current: true,
      },
      {
        title: "Brand Ambassador",
        period: "03/2023 – 11/2023",
        description: "Represented PMA globally, driving engagement and community growth.",
        highlights: [],
      },
    ],
  },
  {
    name: "GoodData",
    location: "Prague, Czechia",
    description:
      "A leading analytics platform enabling businesses to build and embed customizable BI dashboards at scale.",
    logo: "https://i.ibb.co/gFz2sFSs/gooddata-logo.jpg",
    roles: [
      {
        title: "Senior Technical Product Marketing Manager",
        period: "09/2022 – 09/2023",
        description: "Defined positioning and messaging for the analytics platform.",
        highlights: [
          "Increased trial adoption through product and UX collaboration",
          "Coordinated global launches and improved inbound leads",
          "Created technical content including demos, webinars, and articles",
        ],
      },
      {
        title: "Product Marketing Manager",
        period: "01/2021 – 08/2022",
        description: "Led marketing for a cloud-native analytics platform across AWS, GCP, Azure, and on-prem.",
        highlights: [
          "Produced demos, eBooks, videos, and articles",
          "Executed go-to-market campaigns for features and upgrades",
          "Led analyst relations with Gartner, Forrester, and others",
        ],
      },
    ],
  },
  {
    name: "Wunderman Thompson",
    location: "Prague, Czechia",
    description:
      "A global creative agency combining creativity and technology to deliver marketing solutions for top brands.",
    logo: "https://i.ibb.co/5gCqRQr2/wunderman-thompson-logo.jpg",
    roles: [
      {
        title: "Web Tagging Team Lead",
        period: "10/2019 – 12/2020",
        description: "Managed a web tagging team and improved QA processes.",
        highlights: [
          "Oversaw analytics tagging across Ford's global web properties",
          "Liaised between Ford of Europe and national sales companies",
        ],
      },
      {
        title: "Lead Management Specialist",
        period: "02/2019 – 10/2019",
        description: "Led lead management across five Ford of Europe markets.",
        highlights: [
          "Improved lead performance with some markets exceeding 105% growth",
          "Supported rollout of Microsoft Dynamics to 1,200+ users",
        ],
      },
      {
        title: "Implementation Project Manager",
        period: "05/2017 – 02/2019",
        description: "Led onboarding in 12 markets.",
        highlights: ["Reduced reporting time by over 90% through automation", "Maintained high customer satisfaction"],
      },
    ],
  },
  {
    name: "SQN (Sinequanon)",
    location: "Prague, Czechia",
    description: "Swiss-based PeopleTech startup transforming workplace culture with AI- and data-powered solutions.",
    logo: "https://i.ibb.co/yF0gRHpn/new-sqn-logo.png",
    roles: [
      {
        title: "Client Delivery Specialist",
        period: "04/2016 – 05/2017",
        description: "Managed delivery of client programs.",
        highlights: ["Improved implementation speed and efficiency"],
      },
    ],
  },
];

const Experience = () => {
  const hasCurrent = (company: Company) => company.roles.some((role) => role.current);

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-secondary/20">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="mono text-primary text-sm tracking-wider">EXPERIENCE</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Career <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1 md:-translate-x-1.5 mt-6 z-10">
                  {hasCurrent(company) && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:shadow-lg">
                    {/* Company header */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold">{company.name}</h3>
                          {hasCurrent(company) && (
                            <span className="text-xs text-green-600 bg-green-500/10 px-2 py-1 rounded">Current</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{company.location}</p>
                      </div>
                    </div>

                    {/* Company description - only show for last role context */}
                    {company.description && (
                      <p className="text-sm text-muted-foreground italic mb-5 pb-5 border-b border-border/50">
                        {company.description}
                      </p>
                    )}

                    {/* Roles */}
                    <div className="space-y-5">
                      {company.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className={`${roleIndex > 0 ? "pt-5 border-t border-border/50" : ""}`}>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                              {role.period}
                            </span>
                          </div>
                          <p className="text-primary font-semibold mb-2">{role.title}</p>
                          <ul className="space-y-1.5 mb-3">
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              {role.description}
                            </li>
                          </ul>
                          {role.highlights.length > 0 && (
                            <ul className="space-y-1.5">
                              {role.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-0.5">•</span>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
